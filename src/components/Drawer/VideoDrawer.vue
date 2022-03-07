<template>
  <el-drawer
    title="选择监控"
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
      <el-table-column align="center" label="名称" width="">
        <template slot-scope="scope">
          <span style="font-size: smaller">{{ scope.row['name'] }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="IP" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row['ip'] }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="位置" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row['location'] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-drawer>
</template>

<script>
import { getList } from '@/api/video'

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
      this.$store.commit('video/SET_VIDEO_SELECTED', row)
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
