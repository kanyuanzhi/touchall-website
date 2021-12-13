<template>
  <div class="app-container">
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
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门" width="200" align="center">
        <template slot-scope="scope">
          {{
            departmentIDtoName(scope.row.department)
          }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="roles" label="权限" width="">
        <template slot-scope="scope">
          <template v-if="scope.row.show_update">
            <span>{{ scope.row.roles.join('，') }}</span>
          </template>
          <template v-else>
            <el-select v-model="scope.row.edited_roles" multiple placeholder="请选择" size="small">
              <el-option
                v-for="item in roleOptions"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
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
          <template v-if="scope.row.show_update">
            <span>
              <el-button type="primary" size="small" @click="scope.row.show_update=false">分配</el-button>
            </span>
          </template>
          <template v-else>
            <span>
              <el-button type="warning" size="small" @click="update(scope.row)">确认分配</el-button>
              <el-button type="primary" size="small" @click="cancelUpdate(scope.row)">取消</el-button>
            </span>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList, updateAccount } from '@/api/user'
import { getList as getRoleList } from '@/api/role'
import * as dayjs from 'dayjs'
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
    return {
      list: null,
      listLoading: true,

      roleOptions: []
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
      getRoleList().then(res => {
        const { data } = res
        data.map(v => {
          this.roleOptions.push({ id: v.id, name: v.name })
        })
        getList().then(res => {
          const { data } = res
          this.list = data.map(v => {
            this.$set(v, 'edited_roles', v.roles)
            this.$set(v, 'show_delete', true)
            this.$set(v, 'show_update', true)
            v.created_at = dayjs(v.created_at).format('YYYY-MM-DD hh:mm:ss')
            v.updated_at = dayjs(v.updated_at).format('YYYY-MM-DD hh:mm:ss')
            return v
          })
          this.listLoading = false
        })
      })
    },
    update(row) {
      updateAccount({
        username: row.username,
        roles: row.edited_roles
      }).then(res => {
        const { roles } = res.data
        row.roles = roles
        row.show_update = true
      }).catch(error => {
        this.$message.error(error)
      })
    },
    cancelUpdate(row) {
      row.edited_introduction = row.roles
      row.show_update = true
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>
