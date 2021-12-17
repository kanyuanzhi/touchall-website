<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span>终端列表</span>
          </div>
          <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            fit
            highlight-current-row
            @row-click="onRowClick"
          >
            <el-table-column type="index" :index="indexMethod" align="center" label="序号" width="70" />
            <el-table-column align="center" label="自定义名称" width="">
              <template slot-scope="scope">
                <span style="font-size: smaller">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="管理人" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.manager }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="IP" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.net_basic.ip }}</span>
                {{ scope.$index }}
              </template>
            </el-table-column>

            <el-table-column align="center" label="Mac" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.net_basic.mac }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8">
        <sticky :sticky-top="10">
          <terminal-details :terminal="terminalDetails" />
        </sticky>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getList } from '@/api/terminal'
import * as dayjs from 'dayjs'
import { BToGB } from '@/utils/common'
import Sticky from '@/components/Sticky'
import TerminalDetails from './components/Details'

export default {
  components: {
    Sticky,
    TerminalDetails
  },
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

      dialogVisible: false,

      terminalDetails: null
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
        let index = 1
        this.list = data.map(v => {
          v.index = index++
          v.mem_basic.total = BToGB(v.mem_basic.total)
          v.disk_basic.total = BToGB(v.disk_basic.total)
          v.host_basic.boot_time = dayjs(v.host_basic.boot_time * 1000).format('YYYY-MM-DD HH:mm:ss')
          this.$set(v, 'edited_name', v.name)
          this.$set(v, 'edited_manager', v.manager)
          this.$set(v, 'show_delete', true)
          this.$set(v, 'show_update', true)
          v.created_at = dayjs(v.created_at).format('YYYY-MM-DD HH:mm:ss')
          v.updated_at = dayjs(v.updated_at).format('YYYY-MM-DD HH:mm:ss')
          return v
        })
        this.listLoading = false
        this.terminalDetails = this.list[0]
      }).catch(error => {
        this.$message.error(error)
      })
    },
    onRowClick(row) {
      this.terminalDetails = row
    }
  }
}
</script>
