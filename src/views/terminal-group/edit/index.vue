<template>
  <div>
    <el-button type="warning" icon="el-icon-circle-plus" style="width: 100%;border-radius: 0;font-weight: bold;" @click="dialogVisible=true">添加新终端组
    </el-button>
    <el-dialog
      title="添加新终端组"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form label-position="right" :model="newTerminalGroupForm">
        <el-form-item label="名称" label-width="90px">
          <el-input v-model="newTerminalGroupForm['name']" />
        </el-form-item>
        <el-form-item label="管理人" label-width="90px">
          <el-input v-model="newTerminalGroupForm['manager']" />
        </el-form-item>
        <el-form-item label="介绍" label-width="90px">
          <el-input v-model="newTerminalGroupForm['introduction']" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createTerminal">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </div>
    </el-dialog>
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
        <el-table-column label="终端组ID" width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row['id'] }}
          </template>
        </el-table-column>
        <el-table-column label="名称" width="200" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row['show_update']">
              <span>{{ scope.row['name'] }}</span>
            </template>
            <template v-else>
              <el-input v-model="scope.row['edited_name']" size="small" />
            </template>
          </template>
        </el-table-column>
        <el-table-column align="" prop="manager" label="管理人" width="150">
          <template slot-scope="scope">
            <template v-if="scope.row['show_update']">
              <span>{{ scope.row['manager'] }}</span>
            </template>
            <template v-else>
              <el-input v-model="scope.row['edited_manager']" size="small" />
            </template>
          </template>
        </el-table-column>
        <el-table-column align="" prop="introduction" label="介绍" width="">
          <template slot-scope="scope">
            <template v-if="scope.row['show_update']">
              <span>{{ scope.row['introduction'] }}</span>
            </template>
            <template v-else>
              <el-input v-model="scope.row['edited_introduction']" size="small" />
            </template>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="注册时间" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row['created_at'] }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updated_at" label="更新时间" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row['updated_at'] }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="operate" label="操作" width="200 ">
          <template slot-scope="scope">
            <template v-if="scope.row['show_delete'] && scope.row['show_update']">
            <span>
              <el-button type="primary" size="mini" @click="scope.row['show_update']=false">修改</el-button>
              <el-button type="danger" size="mini" @click="scope.row['show_delete']=false">删除</el-button>
            </span>
            </template>
            <template v-else>
              <template v-if="!scope.row['show_delete']&&scope.row['show_update']">
              <span>
                <el-button
                  type="warning"
                  size="mini"
                  @click="deleteTerminal(scope.$index, scope.row)"
                >确认删除</el-button>
                <el-button type="primary" size="mini" @click="scope.row['show_delete']=true">取消</el-button>
              </span>
              </template>
              <template v-else>
              <span>
                <el-button type="warning" size="mini" @click="updateTerminal(scope.row)">确认修改</el-button>
                <el-button type="primary" size="mini" @click="cancelUpdate(scope.row)">取消</el-button>
              </span>
              </template>
            </template>

          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getList, del, create, update } from '@/api/terminalGroup'
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

      newTerminalGroupForm: {
        name: '',
        manager: '',
        mac: ''
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
          this.$set(v, 'edited_name', v['name'])
          this.$set(v, 'edited_manager', v['manager'])
          this.$set(v, 'edited_introduction', v['introduction'])
          this.$set(v, 'show_delete', true)
          this.$set(v, 'show_update', true)
          v['created_at'] = dayjs(v['created_at']).format('YYYY-MM-DD HH:mm:ss')
          v['updated_at'] = dayjs(v['updated_at']).format('YYYY-MM-DD HH:mm:ss')
          return v
        })
        this.listLoading = false
      }).catch(error => {
        this.$message.error(error)
      })
    },
    createTerminal() {
      create({
        name: this.newTerminalGroupForm['name'].trim(),
        manager: this.newTerminalGroupForm['manager'].trim(),
        introduction: this.newTerminalGroupForm['introduction'].trim()
      }).then(res => {
        const { data } = res
        data['edited_name'] = data['name']
        data['edited_manager'] = data['manager']
        data['edited_introduction'] = data['introduction']
        data['show_delete'] = true
        data['show_update'] = true
        data['created_at'] = dayjs(data['created_at']).format('YYYY-MM-DD HH:mm:ss')
        data['updated_at'] = dayjs(data['updated_at']).format('YYYY-MM-DD HH:mm:ss')
        this.list.unshift(data)
        this.$message.success('添加新终端组成功')
        this.dialogVisible = false
      }).catch(error => {
        this.$message.error(error)
      })
    },
    deleteTerminal(index, row) {
      this.listLoading = true
      del(row['id']).then(res => {
        this.list.splice(index, 1)
        this.listLoading = false
      }).catch(error => {
        this.$message.error(error)
      })
    },
    updateTerminal(row) {
      update({
        id: row['id'],
        name: row['edited_name'],
        manager: row['edited_manager'],
        introduction: row['edited_introduction']
      }).then(res => {
        const { name, manager, introduction, updated_at } = res.data
        row['name'] = name
        row['manager'] = manager
        row['introduction'] = introduction
        row['updated_at'] = dayjs(updated_at).format('YYYY-MM-DD HH:mm:ss')
        row['show_update'] = true
      }).catch(error => {
        this.$message.error(error)
      })
    },
    cancelUpdate(row) {
      row['edited_name'] = row['name']
      row['edited_manager'] = row['manager']
      row['edited_introduction'] = row['introduction']
      row['show_update'] = true
    }
  }
}
</script>
