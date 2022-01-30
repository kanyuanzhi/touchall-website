<template>
  <div>
    <el-button type="warning" icon="el-icon-circle-plus" style="width: 100%;border-radius: 0;font-weight: bold;" @click="dialogVisible=true">添加新终端
    </el-button>

    <el-dialog
      title="添加新终端"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form label-position="right" :model="newTerminalForm">
        <el-form-item label="自定义名称" label-width="90px">
          <el-input v-model="newTerminalForm['name']" />
        </el-form-item>
        <el-form-item label="管理人" label-width="90px">
          <el-input v-model="newTerminalForm['manager']" />
        </el-form-item>
        <el-form-item label="Mac" label-width="90px">
          <el-input v-model="newTerminalForm['mac']" />
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
        <el-table-column label="终端ID" width="70" align="center">
          <template slot-scope="scope">
            {{ scope.row['id'] }}
          </template>
        </el-table-column>
        <el-table-column label="自定义名称" width="" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row['show_update']">
              <span>{{ scope.row['name'] }}</span>
            </template>
            <template v-else>
              <el-input v-model="scope.row['edited_name']" size="small" />
            </template>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="manager" label="管理人" width="150">
          <template slot-scope="scope">
            <template v-if="scope.row['show_update']">
              <span>{{ scope.row['manager'] }}</span>
            </template>
            <template v-else>
              <el-input v-model="scope.row['edited_manager']" size="small" />
            </template>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="mac" label="Mac" width="200">
          <template slot-scope="scope">
            <template v-if="scope.row['show_update']">
              <span>{{ scope.row['net_basic']['mac'] }}</span>
            </template>
            <template v-else>
              <el-input v-model="scope.row['edited_mac']" size="small" />
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
import { getList, del, create, update } from '@/api/terminal'
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

      newTerminalForm: {
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
          this.$set(v, 'edited_mac', v['net_basic']['mac'])
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
        name: this.newTerminalForm['name'].trim(),
        manager: this.newTerminalForm['manager'].trim(),
        mac: this.newTerminalForm['mac'].trim()
      }).then(res => {
        const { data } = res
        data['edited_name'] = data['name']
        data['edited_manager'] = data['manager']
        data['edited_mac'] = data['net_basic']['mac']
        data['show_delete'] = true
        data['show_update'] = true
        data['created_at'] = dayjs(data['created_at']).format('YYYY-MM-DD HH:mm:ss')
        data['updated_at'] = dayjs(data['updated_at']).format('YYYY-MM-DD HH:mm:ss')
        this.list.unshift(data)
        this.$message.success('添加新终端成功')
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
        mac: row['edited_mac']
      }).then(res => {
        const { name, manager, net_basic, updated_at } = res.data
        row['name'] = name
        row['manager'] = manager
        row['net_basic']['mac'] = net_basic['mac']
        row['updated_at'] = dayjs(updated_at).format('YYYY-MM-DD HH:mm:ss')
        row['show_update'] = true
      }).catch(error => {
        this.$message.error(error)
      })
    },
    cancelUpdate(row) {
      row['edited_name'] = row['name']
      row['edited_manager'] = row['manager']
      row['edited_mac'] = row['net_basic']['mac']
      row['show_update'] = true
    }
  }
}
</script>
