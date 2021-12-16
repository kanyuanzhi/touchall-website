<template>
  <div class="app-container">
    <el-button type="success" plain style="width: 100%; margin-bottom: 20px" @click="dialogVisible=true">添加新用户
    </el-button>

    <el-dialog
      title="添加新用户"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="createUserForm" label-position="right" :model="createUserForm" :rules="rules" label-width="90px">
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="createUserForm.username"
            name="username"
            tabindex="1"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="createUserForm.password"
            name="password"
            tabindex="2"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input
            v-model="createUserForm.checkPassword"
            name="checkPassword"
            tabindex="3"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createUser">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </div>
    </el-dialog>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="70" type="index" :index="indexMethod" />
      <el-table-column label="用户ID" width="70" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="120" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.show_update">
            <span>{{ scope.row.name }}</span>
          </template>
          <template v-else>
            <el-input v-model="scope.row.edited_name" size="small" />
          </template>
        </template>
      </el-table-column>
      <el-table-column label="部门" width="200" align="center">
        <template slot-scope="scope">

          <template v-if="scope.row.show_update">
            {{
              departmentIDtoName(scope.row.departments)
            }}
          </template>
          <template v-else>
            <el-select v-model="scope.row.edited_departments" multiple placeholder="请选择" size="small">
              <el-option
                v-for="item in $store.getters.departmentOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </template>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" prop="contact" label="联系方式" width="120" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.show_update">
            <span>{{ scope.row.contact }}</span>
          </template>
          <template v-else>
            <el-input v-model="scope.row.edited_contact" size="small" />
          </template>
        </template>
      </el-table-column>
      <el-table-column align="" prop="introduction" label="个人简介" width="">
        <template slot-scope="scope">
          <template v-if="scope.row.show_update">
            <span>{{ scope.row.introduction }}</span>
          </template>
          <template v-else>
            <el-input v-model="scope.row.edited_introduction" size="small" />
          </template>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="注册时间" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updated_at" label="更新时间" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.updated_at }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="operate" label="操作" width="200 ">
        <template slot-scope="scope">
          <template v-if="scope.row.show_delete && scope.row.show_update">
            <span>
              <el-button type="primary" size="small" @click="scope.row.show_update=false">修改</el-button>
              <el-button type="danger" size="small" @click="scope.row.show_delete=false">删除</el-button>
            </span>
          </template>
          <template v-else>
            <template v-if="!scope.row.show_delete&&scope.row.show_update">
              <span>
                <el-button
                  type="warning"
                  size="small"
                  @click="deleteUser(scope.$index, scope.row)"
                >确认删除</el-button>
                <el-button type="primary" size="small" @click="scope.row.show_delete=true">取消</el-button>
              </span>
            </template>
            <template v-else>
              <span>
                <el-button type="warning" size="small" @click="updateUser(scope.row)">确认修改</el-button>
                <el-button type="primary" size="small" @click="cancelUpdate(scope.row)">取消</el-button>
              </span>
            </template>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList, deleteUser, register, updateAccount, getInfo } from '@/api/user'

import * as dayjs from 'dayjs'
import { validUsername } from '@/utils/validate'
import { Message } from 'element-ui'
import { departmentIDtoName } from '@/utils/common'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码位数不能少于6位'))
      } else {
        callback()
      }
    }
    const validateCheckPassword = (rule, value, callback) => {
      if (value !== this.createUserForm.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      list: null,
      listLoading: true,

      departmentDict: null,
      departmentOptions: null,

      createUserForm: {
        username: '',
        password: '',
        checkPassword: ''
      },
      rules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        checkPassword: [{ required: true, trigger: 'blur', validator: validateCheckPassword }]
      },

      dialogVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    indexMethod(index) {
      return index + 1
    },
    departmentIDtoName(idList, dict) {
      return departmentIDtoName(idList, dict)
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        const { data } = response
        this.list = data.map(v => {
          this.$set(v, 'edited_name', v.name)
          this.$set(v, 'edited_departments', v.departments)
          this.$set(v, 'edited_contact', v.contact)
          this.$set(v, 'edited_introduction', v.introduction)
          this.$set(v, 'show_delete', true)
          this.$set(v, 'show_update', true)
          v.created_at = dayjs(v.created_at).format('YYYY-MM-DD HH:mm:ss')
          v.updated_at = dayjs(v.updated_at).format('YYYY-MM-DD HH:mm:ss')
          return v
        })
        this.listLoading = false
      })
    },
    deleteUser(index, row) {
      this.listLoading = true
      deleteUser(row.token).then(response => {
        this.list.splice(index, 1)
        this.listLoading = false
      })
    },
    createUser() {
      this.$refs.createUserForm.validate(valid => {
        if (valid) {
          register(this.createUserForm).then(res => {
            const { data } = res
            getInfo(data.token).then(res => {
              const { data } = res
              data.edited_name = data.name
              data.edited_departments = data.departments
              data.edited_contact = data.contact
              data.edited_introduction = data.introduction
              data.show_delete = true
              data.show_update = true
              data.created_at = dayjs(data.created_at).format('YYYY-MM-DD HH:mm:ss')
              data.updated_at = dayjs(data.updated_at).format('YYYY-MM-DD HH:mm:ss')
              this.list.unshift(data)
              this.$message.success('添加新用户成功')
              this.dialogVisible = false
            })
          }).catch(error => {
            this.$message.error(error)
          })
        } else {
          Message.warning('请按提示输入正确的用户名和密码！')
          return false
        }
      })
    },
    updateUser(row) {
      updateAccount({
        id: row.id,
        name: row.edited_name,
        departments: row.edited_departments,
        contact: row.edited_contact,
        introduction: row.edited_introduction
      }).then(res => {
        const { name, introduction, departments, contact, updated_at } = res.data
        row.name = name
        row.departments = departments
        row.contact = contact
        row.introduction = introduction
        row.updated_at = dayjs(updated_at).format('YYYY-MM-DD HH:mm:ss')
        row.show_update = true
      }).catch(error => {
        this.$message.error(error)
      })
    },
    cancelUpdate(row) {
      row.edited_name = row.name
      row.edited_departments = row.departments
      row.edited_contact = row.contact
      row.edited_introduction = row.introduction
      row.show_update = true
    }
  }
}
</script>
