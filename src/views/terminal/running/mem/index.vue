<template>
  <mix-chart
    :id="id"
    :update-data="updateData"
    :basic-data="basicData"
    :width="width"
    :height="height"
    :name="'内存运行状态'"
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
      this.updateData = [newData['data']['mem_running'], dayjs().format('HH:mm:ss')]
    }
  }
}
</script>

<style scoped>

</style>
