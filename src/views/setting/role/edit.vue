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
      <el-table-column type="index" :index="indexMethod" align="center" label="序号" width="70" />
      <el-table-column label="权限ID" width="70" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="权限名称" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="" prop="introduction" label="权限介绍" width="">
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
          <template v-if="scope.row.show_update">
            <span>
              <el-button type="primary" size="small" @click="scope.row.show_update=false">修改</el-button>
            </span>
          </template>
          <template v-else>
            <span>
              <el-button type="warning" size="small" @click="update(scope.row)">确认修改</el-button>
              <el-button type="primary" size="small" @click="cancelUpdate(scope.row)">取消</el-button>
            </span>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList, update } from '@/api/role'
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
      listLoading: true
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
          this.$set(v, 'edited_introduction', v.introduction)
          this.$set(v, 'show_delete', true)
          this.$set(v, 'show_update', true)
          v.created_at = dayjs(v.created_at).format('YYYY-MM-DD hh:mm:ss')
          v.updated_at = dayjs(v.updated_at).format('YYYY-MM-DD hh:mm:ss')
          return v
        })
        this.listLoading = false
      }).catch(error => {
        this.$message.error(error)
      })
    },
    update(row) {
      update({ id: row.id, introduction: row.edited_introduction }).then(res => {
        const { introduction } = res.data
        row.introduction = introduction
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
