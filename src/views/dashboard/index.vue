<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    {{img_src}}
    <div>
      <img width="1280" height="720" :src=img_src />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import flvjs from "flv.js";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      img_src: 'data:image/jpg;base64,',
      ws: null,
    };
  },
  created() {
    // this.initWebsocket()
  },
  beforeDestroy() {
    if (this.ws !== null) {
      this.ws.close()
    }
  },
  methods: {
    initWebsocket() {
      this.ws = new WebSocket('ws://127.0.0.1:10000/touch')
      this.ws.onopen = this.onOpen
      this.ws.onmessage = this.onMessage
      this.ws.onerror = this.onError
    },
    onOpen() {
      const msgID = 120
      // const data = ['84:a9:38:48:d5:e6', 'bb', 'cc', 'dd', '']
      const req = { 'msg_id': msgID, 'data': ['123'] }
      this.ws.send(JSON.stringify(req))
      console.log('send success')
    },
    onMessage(evt) {
      let data = evt.data
      // console.log(data)
      this.runningData = JSON.parse(data)
      // console.log(this.runningData)
      this.img_src = 'data:image/jpg;base64,' + this.runningData['data']
    },
    onError() {
      this.$message.error({
        message: 'error in websocket connection establishment',
        duration: 5000
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
