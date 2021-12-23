<template>
  <el-drawer
    title="选择终端"
    :visible.sync="drawer"
    :direction="direction"
    :before-close="handleClose"
  >
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      height="calc(100vh - 84px - 40px)"
      highlight-current-row
      @row-click="onRowClick"
    >
      <el-table-column type="index" :index="indexMethod" align="center" label="序号" width="70" />
      <el-table-column align="center" label="自定义名称" width="">
        <template slot-scope="scope">
          <span style="font-size: smaller">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="管理人" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.manager }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="IP" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.net_basic.ip }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-drawer>
</template>

<script>
import { getList } from '@/api/terminal'
import * as dayjs from 'dayjs'
import { BToGB } from '@/utils/common'

export default {
  name: 'TerminalListDrawer',
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      direction: 'rtl'
    }
  },
  watch: {
    drawer(newVal) {
      if (newVal) {
        this.fetchData()
      }
    }
  },
  methods: {
    indexMethod(index) {
      return index + 1
    },
    handleClose(done) {
      // done()
      this.$emit('drawer-close', false)
    },
    onRowClick(row) {
      this.$store.commit('terminal/SET_TERMINAL_SELECTED', row)
      this.$emit('row-click', row)
      this.$emit('drawer-close', false)
    },
    fetchData() {
      this.listLoading = true
      getList().then(res => {
        const { data } = res
        let index = 1
        this.list = data.map(v => {
          v.index = index++
          v['host_basic']['boot_time'] = dayjs(v['host_basic']['boot_time'] * 1000).format('YYYY-MM-DD HH:mm:ss')
          v['mem_basic']['total'] = BToGB(v['mem_basic']['total'])
          v['disk_basic']['total'] = BToGB(v['disk_basic']['total'])
          v['created_at'] = dayjs(v['created_at']).format('YYYY-MM-DD HH:mm:ss')
          v['updated_at'] = dayjs(v['updated_at']).format('YYYY-MM-DD HH:mm:ss')
          this.$set(v, 'edited_name', v.name)
          this.$set(v, 'edited_manager', v.manager)
          this.$set(v, 'show_delete', true)
          this.$set(v, 'show_update', true)
          return v
        })
        this.listLoading = false
      }).catch(error => {
        this.$message.error(error)
      })
    }
  }
}
</script>

<style lang="scss">
//.el-drawer{
//  background-color: rgb(48, 65, 86);
//
//  .el-table{
//    background-color: rgb(48, 65, 86);
//  }
//  .el-table td.el-table__cell{
//    background-color: rgb(48, 65, 86);
//    color: floralwhite;
//  }
//}
</style>
