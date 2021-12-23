<template>
  <div class="app-container">
    <el-row>
      <el-col :span="18" :offset="3">
        <el-card shadow="always">

          <table class="overview-table">
            <tr class="overview-subtitle">
              <td colspan="4">基本信息</td>
            </tr>
            <tr>
              <td width="20%" class="overview-name">自定义名称</td>
              <td width="30%">{{ name }}</td>
              <td width="20%" class="overview-name">管理人</td>
              <td width="30%">{{ manager }}</td>
            </tr>
            <tr>
              <td class="overview-name">IP</td>
              <td>{{ ip }}</td>
              <td class="overview-name">Mac</td>
              <td>{{ mac }}</td>
            </tr>
            <tr class="overview-subtitle">
              <td colspan="4">运行实时信息</td>
            </tr>
            <tr>
              <td class="overview-name">运行时间</td>
              <td>{{ uptime }}</td>
              <td class="overview-name">运行进程数</td>
              <td>{{ procs }}</td>
            </tr>
            <tr class="overview-subtitle">
              <td colspan="4">CPU实时信息</td>
            </tr>
            <tr>
              <td class="overview-name">平均占用率（%）</td>
              <td>{{ cpuTotalPercent }}</td>
              <td colspan="2" />
            </tr>
            <tr>
              <td class="overview-name">单核占用率（%）</td>
              <td colspan="3">{{ cpuPerPercent }}</td>
            </tr>
            <tr class="overview-subtitle">
              <td colspan="4">内存实时信息</td>
            </tr>
            <tr>
              <td class="overview-name">可用大小（GB）</td>
              <td>{{ memAvailable }}</td>
              <td class="overview-name">占用大小（GB）</td>
              <td>{{ memUsed }}</td>
            </tr>
            <tr>
              <td class="overview-name">占用率（%）</td>
              <td>{{ memUsedPercent }}</td>
              <td colspan="2" />

            </tr>
            <tr class="overview-subtitle">
              <td colspan="4">硬盘实时信息</td>
            </tr>
            <tr>
              <td class="overview-name">可用大小（GB）</td>
              <td>{{ diskFree }}</td>
              <td class="overview-name">占用大小（GB）</td>
              <td>{{ diskUsed }}</td>
            </tr>
            <tr>
              <td class="overview-name">占用率（%）</td>
              <td>{{ diskUsedPercent }}</td>
              <td colspan="2" />

            </tr>
            <tr class="overview-subtitle">
              <td colspan="4">网络实时信息</td>
            </tr>
            <tr>
              <td class="overview-name">发送字节数</td>
              <td>{{ netBytesSent }}</td>
              <td class="overview-name">接收字节数</td>
              <td>{{ netBytesRecv }}</td>
            </tr>
            <tr>
              <td class="overview-name">发送数据包数</td>
              <td>{{ netPacketsSent }}</td>
              <td class="overview-name">接收数据包数</td>
              <td>{{ netPacketsRecv }}</td>
            </tr>
            <tr>
              <td class="overview-name">发送错误包数</td>
              <td>{{ netErrout }}</td>
              <td class="overview-name">接收错误包数</td>
              <td>{{ netErrin }}</td>
            </tr>
            <tr>
              <td class="overview-name">发送丢包数</td>
              <td>{{ netDropout }}</td>
              <td class="overview-name">接收丢包数</td>
              <td>{{ netDropin }}</td>
            </tr>
          </table>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>

import * as dayjs from 'dayjs'
import { BToGB } from '@/utils/common'

const duration = require('dayjs/plugin/duration')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(duration)
dayjs.extend(relativeTime)

export default {
  components: {},
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
      uptime: 0,
      procs: 0,

      name: '--',
      manager: '--',
      ip: '--',
      mac: '--',

      cpuTotalPercent: 0,
      cpuPerPercent: 0,
      memAvailable: 0,
      memUsed: 0,
      memUsedPercent: 0,
      diskFree: 0,
      diskUsed: 0,
      diskUsedPercent: 0,
      netBytesSent: 0,
      netBytesRecv: 0,
      netPacketsSent: 0,
      netPacketsRecv: 0,
      netErrin: 0,
      netErrout: 0,
      netDropin: 0,
      netDropout: 0
    }
  },
  watch: {
    runningData(newData, oldData) {
      // this.uptime = newData['data']['host_running']['uptime']
      this.uptime = dayjs.duration(newData['data']['host_running']['uptime'] * 1000).format('DD天 HH时mm分ss秒')
      this.procs = newData['data']['host_running']['procs']
      this.cpuTotalPercent = newData['data']['cpu_running']['total_percent'][0].toFixed(2)
      this.cpuPerPercent = newData['data']['cpu_running']['per_percent'].map(v => {
        return v.toFixed(2)
      }).join(', ')
      this.memAvailable = BToGB(newData['data']['mem_running']['available'])
      this.memUsed = BToGB(newData['data']['mem_running']['used'])
      this.memUsedPercent = newData['data']['mem_running']['used_percent'].toFixed(2)
      this.diskFree = BToGB(newData['data']['disk_running']['free'])
      this.diskUsed = BToGB(newData['data']['disk_running']['used'])
      this.diskUsedPercent = newData['data']['disk_running']['used_percent'].toFixed(2)
      this.netBytesSent = newData['data']['net_running']['bytes_sent']
      this.netBytesRecv = newData['data']['net_running']['bytes_recv']
      this.netPacketsSent = newData['data']['net_running']['packets_sent']
      this.netPacketsRecv = newData['data']['net_running']['packets_recv']
      this.netErrin = newData['data']['net_running']['errin']
      this.netErrout = newData['data']['net_running']['errout']
      this.netDropin = newData['data']['net_running']['dropin']
      this.netDropout = newData['data']['net_running']['dropout']
    },
    basicData(newData, oldData) {
      this.name = newData['name']
      this.manager = newData['manager']

      this.ip = newData['net_basic']['ip']
      this.mac = newData['net_basic']['mac']
    }
  },
  created() {
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
