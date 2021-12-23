<template>
  <keyboard
    :id="id"
    :update-data="updateData"
    :basic-data="basicData"
    :width="width"
    :height="height"
  />
</template>

<script>
import Keyboard from '@/components/Chart/Keyboard'
import * as dayjs from 'dayjs'

export default {
  name: 'CPUTotal',
  components: { Keyboard },
  props: {
    runningData: {
      type: Object,
      default: null
    },
    basicData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      id: 'cpu-total',
      updateData: null,
      width: '100%',
      height: '100%'
    }
  },
  watch: {
    runningData(newData, oldData) {
      this.updateData = [newData['data']['cpu_running']['total_percent'], dayjs().format('HH:mm:ss')]
    }
  }
}
</script>

<style scoped>

</style>
