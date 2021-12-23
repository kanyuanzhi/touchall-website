<template>
  <line-marker
    :id="id"
    :update-data="updateData"
    :basic-data="basicData"
    :width="width"
    :height="height"
  />
</template>

<script>
import LineMarker from '@/components/Chart/LineMarker'
import * as dayjs from 'dayjs'

export default {
  name: 'CPUPer',
  components: { LineMarker },
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
      id: 'cpu-per',
      updateData: null,
      width: '100%',
      height: '100%'
    }
  },
  watch: {
    runningData(newData, oldData) {
      this.updateData = [newData['data']['cpu_running']['per_percent'], dayjs().format('HH:mm:ss')]
    }
  }
}
</script>

<style scoped>

</style>
