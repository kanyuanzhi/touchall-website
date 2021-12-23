<template>
  <mix-chart
    :id="id"
    :update-data="updateData"
    :basic-data="basicData"
    :width="width"
    :height="height"
    :name="'硬盘运行状态'"
  />
</template>

<script>
import MixChart from '@/components/Chart/MixChart'
import * as dayjs from 'dayjs'

export default {
  name: 'Mem',
  components: { MixChart },
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
      id: 'mem',
      updateData: null,
      width: '100%',
      height: '100%'
    }
  },
  watch: {
    runningData(newData, oldData) {
      newData['data']['disk_running']['available'] = newData['data']['disk_running']['free']
      this.updateData = [newData['data']['disk_running'], dayjs().format('HH:mm:ss')]
    }
  }
}
</script>

<style scoped>

</style>
