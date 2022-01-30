<template>
  <div>
    <el-button
      style="width: 100%;border-radius: 0;font-weight: bold;"
      type="success"
      @click="drawer=true"
    >选择终端（当前选择终端：{{ terminalSelected }}）
    </el-button>
    <div class="app-container">
      <el-row>
        <el-col :span="18" :offset="3">
          <el-card shadow="always" style="margin-bottom: 20px" header="在线终端">
            <el-input v-model="command" placeholder="请输入命令">
              <el-button slot="append" @click="executeCommand">执行</el-button>
            </el-input>

<!--            <div style="height: 200px;width: 100%;border-radius: 4px">-->
<!--              <span>{{result}}</span>-->
<!--            </div>-->
            <el-input
              id="textarea"
              v-model="result"
              type="textarea"
              resize="none"
              :rows="20"
              style="margin-top: 10px;"
            />
          </el-card>
          <el-card shadow="always" header="终端信息">
            <table class="overview-table">
              <tr>
                <td width="10%" class="overview-name">自定义名称</td>
                <td width="20%">{{ name }}</td>
                <td width="10%" class="overview-name">管理人</td>
                <td width="20%">{{ manager }}</td>
                <td width="10%" class="overview-name">操作系统</td>
                <td width="30%">{{ hostOS }}</td>
              </tr>
              <tr>
                <td class="overview-name">IP</td>
                <td colspan="2">{{ ip }}</td>
                <td class="overview-name">Mac</td>
                <td colspan="2">{{ mac }}</td>
              </tr>
            </table>
          </el-card>
        </el-col>
      </el-row>
      <terminal-list-drawer :drawer="drawer" @row-click="onRowClick" @drawer-close="v=>{this.drawer=v}" />
    </div>
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
      terminalSelected: '未选择',

      drawer: false,
      reqData: [],

      name: '--',
      manager: '--',
      hostOS: '--',
      ip: '--',
      mac: '--',

      ws: null,

      command: '',
      result: ''
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

      this.name = row['name']
      this.manager = row['manager']
      this.hostOS = row['host_basic']['os']
      this.ip = row['net_basic']['ip']
      this.mac = row['net_basic']['mac']

      this.reqData = [row['net_basic']['mac']]
      this.initWebsocket()
    },
    initWebsocket() {
      this.ws = new WebSocket('ws://127.0.0.1:10000/touch')
      this.ws.onopen = this.onOpen
      this.ws.onmessage = this.onMessage
      this.ws.onerror = this.onError
    },
    onOpen() {
      const msgID = 110
      // const data = ['84:a9:38:48:d5:e6', 'bb', 'cc', 'dd', '']
      const req = { 'msg_id': msgID, 'data': this.reqData }
      this.ws.send(JSON.stringify(req))
    },
    onMessage(evt) {
      this.result = this.result + JSON.parse(evt.data)['data'] + '\n'
      const textarea = document.getElementById('textarea')
      textarea.scrollTop = textarea.scrollHeight
    },
    onError() {
      this.$message.error({
        message: 'error in websocket connection establishment',
        duration: 5000
      })
    },
    executeCommand() {
      if (this.ws === null) {
        this.$message.error('please choose a terminal first!')
        return
      }
      const msgID = 111
      // const data = ['84:a9:38:48:d5:e6', 'bb', 'cc', 'dd', '']
      const req = { 'msg_id': msgID, 'data': this.reqData, 'command': this.command }
      this.ws.send(JSON.stringify(req))
      this.result = this.result +
        '\n********************************************************************\n> ' +
        this.command
    }
  }
}
</script>

<style scoped lang="scss">
.overview-table {
  width: 100%;
  border-collapse: collapse;
  line-height: 40px;
  font-size: 14px;
  color: #909399;

  td {
    border-bottom: 1px solid #e8eaed;
    border-collapse: separate;
    padding: 0 0 0 20px;
    text-align: center;
  }

  .overview-subtitle {
    text-align: center;
    font-weight: bold;
    line-height: 40px;
    font-size: 16px;
    color: #909399;
    background-color: rgba(232, 234, 237, 0.7);
  }

  .overview-name {
    color: rgba(144, 147, 153, 0.9);
    font-weight: bold;
  }
}
</style>
