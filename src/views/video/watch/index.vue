<template>
  <div>
    <el-button
      style="width: 100%;border-radius: 0;font-weight: bold;"
      type="success"
      @click="drawer=true"
    >选择监控（当前选择监控：{{ videoSelected }}）
    </el-button>
    <div class="app-container">
      <el-row>
        <el-col :span="18" :offset="3">
          <el-card shadow="always" header="智能监控画面">
            <img width="100%" height="720" :src=url />
          </el-card>
        </el-col>
      </el-row>
      <video-drawer :drawer="drawer" @row-click="onRowClick" @drawer-close="v=>{this.drawer=v}" />
    </div>
  </div>

</template>

<script>
import VideoDrawer from '@/components/Drawer/VideoDrawer'

export default {
  components: {
    VideoDrawer
  },
  data() {
    return {
      videoSelected: '未选择',

      drawer: false,
      reqData: [],

      url: '',

      ws: null,

      command: '',
      result: ''
    }
  },
  mounted() {
    const row = this.$store.getters.videoSelected
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
      this.videoSelected = [row['index'], row['name'], row['ip'], row['location']].join(' ')

      this.reqData = [row['ip']]
      setTimeout( this.initWebsocket, 1000)
      this.$message.success(this.reqData)
    },
    initWebsocket() { 
      this.ws = new WebSocket('ws://127.0.0.1:10000/touch')
      this.ws.onopen = this.onOpen
      this.ws.onmessage = this.onMessage
      this.ws.onerror = this.onError
    },
    onOpen() {
      const msgID = 120
      // const data = ['84:a9:38:48:d5:e6', 'bb', 'cc', 'dd', '']
      const req = { 'msg_id': msgID, 'data': this.reqData }
      this.ws.send(JSON.stringify(req))
    },
    onMessage(evt) {
      this.url = 'data:image/jpg;base64,' + JSON.parse(evt.data)['data']
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

<style scoped lang="scss">
.image-error {
  width:100%;
  height:100%;
  vertical-align: middle;
}
</style>
