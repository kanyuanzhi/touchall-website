<template>
  <div>
    <el-button style="width: 100%" type="success" @click="drawer=true">选择终端（当前选择终端：{{ terminalSelected }}）</el-button>
    <div class="chart-container">
      <router-view :running-data="runningData" :basic-data="basicData" />
    </div>
    <terminal-list-drawer :drawer="drawer" @row-click="onRowClick" @drawer-close="v=>{this.drawer=v}" />
  </div>
</template>

<script>
import TerminalListDrawer from '@/components/Drawer/TerminalListDrawer'

export default {
  components: {
    TerminalListDrawer
  },
  data() {
    return {
      drawer: false,

      terminalSelected: '未选择',

      ws: null,
      runningData: null,
      basicData: null,
      reqData: []
    }
  },
  mounted() {
    const row = this.$store.getters.terminalSelected
    if (row !== null) {
      this.onRowClick(row)
    }
  },
  beforeDestroy() {
    if (this.ws !== null) {
      this.ws.close()
    }
  },
  methods: {
    onRowClick(row) {
      if (this.ws !== null) {
        this.ws.close()
      }
      this.terminalSelected = [row['index'], row['name'], row['manager'], row['net_basic']['ip']].join(' ')
      this.basicData = row
      this.reqData.push(row['net_basic']['mac'])
    },
    initWebsocket() {
      this.ws = new WebSocket('ws://127.0.0.1:10000/touch')
      this.ws.onopen = this.onOpen
      this.ws.onmessage = this.onMessage
      this.ws.onerror = this.onError
    },
    onOpen() {
      const msgID = 102
      // const data = ['84:a9:38:48:d5:e6', 'bb', 'cc', 'dd', '']
      const req = { 'msg_id': msgID, 'data': this.reqData }
      this.ws.send(JSON.stringify(req))
    },
    onMessage(evt) {
      this.runningData = JSON.parse(evt.data)
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
