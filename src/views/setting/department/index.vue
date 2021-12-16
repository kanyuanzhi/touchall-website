<template>
  <div class="app-container">
    <el-button type="success" plain style="width: 100%; margin-bottom: 20px" @click="dialogVisible=true">添加新部门
    </el-button>

    <el-dialog
      title="添加新部门"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form label-position="right" :model="newDepartmentForm">
        <el-form-item label="部门名称" label-width="90px">
          <el-input v-model="newDepartmentForm.name" />
        </el-form-item>
        <el-form-item label="部门介绍" label-width="90px">
          <el-input v-model="newDepartmentForm.introduction" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createDepartment">确定</el-button>
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
      <el-table-column type="index" :index="indexMethod" align="center" label="序号" width="70" />
      <el-table-column label="部门ID" width="70" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="部门名称" width="150" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.show_update">
            <span>{{ scope.row.name }}</span>
          </template>
          <template v-else>
            <el-input v-model="scope.row.edited_name" size="small" />
          </template>
        </template>
      </el-table-column>
      <el-table-column align="" prop="introduction" label="部门介绍" width="">
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
                  @click="deleteDepartment(scope.$index, scope.row)"
                >确认删除</el-button>
                <el-button type="primary" size="small" @click="scope.row.show_delete=true">取消</el-button>
              </span>
            </template>
            <template v-else>
              <span>
                <el-button type="warning" size="small" @click="updateDepartment(scope.row)">确认修改</el-button>
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
import { getList, del, create, update } from '@/api/department'
import * as dayjs from 'dayjs'

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
    return {
      list: null,
      listLoading: true,

      newDepartmentForm: {
        name: '',
        introduction: ''
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
    fetchData() {
      this.listLoading = true
      getList().then(res => {
        const { data } = res
        this.list = data.map(v => {
          this.$set(v, 'edited_name', v.name)
          this.$set(v, 'edited_introduction', v.introduction)
          this.$set(v, 'show_delete', true)
          this.$set(v, 'show_update', true)
          v.created_at = dayjs(v.created_at).format('YYYY-MM-DD HH:mm:ss')
          v.updated_at = dayjs(v.updated_at).format('YYYY-MM-DD HH:mm:ss')
          return v
        })
        this.listLoading = false
      }).catch(error => {
        this.$message.error(error)
      })
    },
    createDepartment() {
      create({
        name: this.newDepartmentForm.name.trim(),
        introduction: this.newDepartmentForm.introduction.trim()
      }).then(res => {
        const { data } = res
        data.edited_name = data.name
        data.edited_introduction = data.introduction
        data.show_delete = true
        data.show_update = true
        data.created_at = dayjs(data.created_at).format('YYYY-MM-DD HH:mm:ss')
        data.updated_at = dayjs(data.updated_at).format('YYYY-MM-DD HH:mm:ss')
        this.list.unshift(data)
        this.$message.success('添加新部门成功')
        this.dialogVisible = false
      }).catch(error => {
        this.$message.error(error)
      })
    },
    deleteDepartment(index, row) {
      this.listLoading = true
      del(row.id).then(res => {
        this.list.splice(index, 1)
        this.listLoading = false
      }).catch(error => {
        this.$message.error(error)
      })
    },
    updateDepartment(row) {
      update({ id: row.id, name: row.edited_name, introduction: row.edited_introduction }).then(res => {
        const { name, introduction, updated_at } = res.data
        row.name = name
        row.introduction = introduction
        row.updated_at = dayjs(updated_at).format('YYYY-MM-DD HH:mm:ss')
        row.show_update = true
      }).catch(error => {
        this.$message.error(error)
      })
    },
    cancelUpdate(row) {
      row.edited_name = row.name
      row.edited_introduction = row.introduction
      row.show_update = true
    }
  }
}
</script>
