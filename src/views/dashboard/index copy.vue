<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div>
      <video controls width="100%" height="500" id="videoElement"></video>
      <button @click="play">播放</button>
      <button @click="showCurrentTime">showCurrentTime</button>
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
      flvPlayer: null,
    };
  },
  mounted() {
    if (flvjs.isSupported()) {
      let videoElement = document.getElementById("videoElement");
      this.flvPlayer = flvjs.createPlayer({
        type: "flv",
        isLive: true,
        hasAudio: false,
        url: "http://127.0.0.1:8081/live/test.flv",
        enableWorker: true,
        enableStashBuffer: true,
        stashInitialSize: 128,
      });
      this.flvPlayer.attachMediaElement(videoElement);
      this.flvPlayer.load();
      this.flvPlayer.play();
    }
  },
  methods: {
    play() {
      this.flvPlayer.play();
    },
    showCurrentTime() {
      let videoElement = document.getElementById("videoElement");
      for (let video in videoElement) {
        let buffered = videoElement[video].buffered;
        if (buffered && buffered.length > 0) {
          debugger
          videoElement[video].currentTime = buffered.end(0) - 0.5;
        }
      }
    },
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
