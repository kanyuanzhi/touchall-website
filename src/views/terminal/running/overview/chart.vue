<template>
  <div class="overview">
    <el-row>
      <el-col :span="8">
        <chart-gauge
          :id="'cpu'"
          :name="'CPU'"
          :update-data="cpuPercent"
          :width="'100%'"
          :height="'calc((100vh - 84px - 40px) / 3)'"
        />
      </el-col>
      <el-col :span="16">
        <chart-line
          :id="'cpu-line'"
          :name="'CPU'"
          :update-data="cpuPercent"
          :width="'100%'"
          :height="'calc((100vh - 84px - 40px) / 3)'"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <chart-gauge
          :id="'mem'"
          :name="'内存'"
          :update-data="memPercent"
          :width="'100%'"
          :height="'calc((100vh - 84px - 40px) / 3)'"
        />
      </el-col>
      <el-col :span="16">
        <chart-line
          :id="'mem-line'"
          :name="'内存'"
          :update-data="memPercent"
          :width="'100%'"
          :height="'calc((100vh - 84px - 40px) / 3)'"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <chart-gauge
          :id="'disk'"
          :name="'硬盘'"
          :update-data="diskPercent"
          :width="'100%'"
          :height="'calc((100vh - 84px - 40px) / 3)'"
        />
      </el-col>
      <el-col :span="16">
        <chart-line
          :id="'disk-line'"
          :name="'硬盘'"
          :update-data="diskPercent"
          :width="'100%'"
          :height="'calc((100vh - 84px - 40px) / 3)'"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChartGauge from '@/components/Chart/Gauge'
import ChartLine from '@/components/Chart/Line'
import * as dayjs from 'dayjs'

export default {
  components: { ChartGauge, ChartLine },
  props: {
    runningData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      ws: null,
      chart: null,
      cpuPercent: null,
      memPercent: null,
      diskPercent: null
    }
  },
  watch: {
    runningData(newData, oldData) {
      this.cpuPercent = [newData['data']['cpu_running']['total_percent'][0], dayjs().format('HH:mm:ss')]
      this.memPercent = [newData['data']['mem_running']['used_percent'], dayjs().format('HH:mm:ss')]
      this.diskPercent = [newData['data']['disk_running']['used_percent'], dayjs().format('HH:mm:ss')]
    }
  }
}

</script>

<style scoped>
.overview{
  background-color: #08263a;
}
</style>
