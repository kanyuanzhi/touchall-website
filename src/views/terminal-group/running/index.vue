<template>
  <div>
    <el-button style="width: 100%" type="success" @click="drawer=true">选择终端组（当前选择终端组：{{
      terminalGroupSelected
    }}）
    </el-button>
    <div class="app-container">
      <el-table label-position="right" highlight-current-row fit :data="runningData">
        <el-table-column type="index" :index="indexMethod" align="center" label="序号" width="70" />
        <el-table-column prop="name" label="自定义名称" label-width="100px" align="center" />
        <el-table-column prop="ip" label="IP" label-width="90px" align="center" />
        <el-table-column prop="mac" label="Mac" label-width="90px" align="center" />
        <el-table-column prop="uptime" label="启动时间" label-width="" align="center" />
        <el-table-column prop="procs" label="运行进程数" label-width="90px" align="center" />
        <el-table-column prop="cpuTotalPercent" label="CPU平均占用率（%）" label-width="90px" align="center" />
        <el-table-column prop="memUsedPercent" label="内存占用率（%）" label-width="90px" align="center" />
        <el-table-column prop="diskUsedPercent" label="硬盘占用率（%）" label-width="90px" align="center" />
      </el-table>
    </div>
    <terminal-group-list-drawer :drawer="drawer" @row-click="onRowClick" @drawer-close="v=>{this.drawer=v}" />
  </div>
</template>

<script>
import TerminalGroupListDrawer from '@/components/Drawer/TerminalGroupListDrawer'
import { getList } from '@/api/terminal'
import * as dayjs from 'dayjs'

const duration = require('dayjs/plugin/duration')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(duration)
dayjs.extend(relativeTime)

export default {
  components: {
    TerminalGroupListDrawer
  },
  data() {
    return {
      drawer: false,

      terminalGroupSelected: '未选择',

      AllTerminals: [],

      ws: null,
      runningData: [],
      runningDataIndex: {},
      reqData: []
    }
  },
  created() {
    this.fetchData()
  },
  beforeDestroy() {
    if (this.ws !== null) {
      this.ws.close()
    }
  },
  methods: {
    indexMethod(index) {
      return index + 1
    },
    onRowClick(row) {
      this.runningData = []
      this.runningDataIndex = {}
      this.reqData = []
      if (this.ws !== null) {
        this.ws.close()
      }
      this.terminalGroupSelected = [row['index'], row['name'], row['manager']].join(' ')
      for (let i = 0; i < row['members'].length; i++) {
        const id = row['members'][i]
        this.reqData.push(this.AllTerminals[id]['net_basic']['mac'])
        this.runningData.push({
          name: this.AllTerminals[id]['name'],
          ip: this.AllTerminals[id]['net_basic']['ip'],
          mac: this.AllTerminals[id]['net_basic']['mac'],
          uptime: '--',
          procs: '--',
          cpuTotalPercent: '--',
          memUsedPercent: '--',
          diskUsedPercent: '--'
        })
        this.runningDataIndex[this.AllTerminals[id]['net_basic']['mac']] = i
      }
      console.log(this.runningData)
      this.initWebsocket()
    },
    fetchData() {
      getList().then(res => {
        const { data } = res
        for (let i = 0; i < data.length; i++) {
          this.AllTerminals[data[i]['id']] = data[i]
        }
        const row = this.$store.getters.terminalGroupSelected
        if (row !== null) {
          this.onRowClick(row)
        }
      }).catch(error => {
        this.$message.error(error)
      })
    },
    initWebsocket() {
      this.ws = new WebSocket('ws://127.0.0.1:10000/touch')
      this.ws.onopen = this.onOpen
      this.ws.onmessage = this.onMessage
      this.ws.onerror = this.onError
    },
    onOpen() {
      const msgID = 102
      const req = { 'msg_id': msgID, 'data': this.reqData }
      this.ws.send(JSON.stringify(req))
    },
    onMessage(evt) {
      const runningData = JSON.parse(evt.data)
      const mac = runningData['key']
      const index = this.runningDataIndex[mac]
      this.runningData[index]['uptime'] = dayjs.duration(runningData['data']['host_running']['uptime'] * 1000).format('DD天 HH时mm分ss秒')
      this.runningData[index]['procs'] = runningData['data']['host_running']['procs']
      this.runningData[index]['cpuTotalPercent'] = runningData['data']['cpu_running']['total_percent'][0].toFixed(2)
      this.runningData[index]['memUsedPercent'] = runningData['data']['mem_running']['used_percent'].toFixed(2)
      this.runningData[index]['diskUsedPercent'] = runningData['data']['disk_running']['used_percent'].toFixed(2)
    },
    onError() {
      this.$message.error({
        message: 'error in websocket connection establishment',
        duration: 5000
      })
    }
  }
}

</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px - 40px);
}

.el-button {
  border-radius: 0;
  font-weight: bold;
}
</style>
