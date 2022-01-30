<template>
  <div>
    <el-button style="width: 100%" type="success" @click="drawer=true">选择终端（当前选择终端：{{ terminalSelected }}）</el-button>
    <div class="app-container">
      <el-row>
        <el-col :span="18" :offset="3">
          <el-card shadow="always">
            <table class="overview-table">
              <tr class="overview-subtitle">
                <td colspan="4">基本信息</td>
              </tr>
              <tr>
                <td width="20%" class="overview-name">列表序号</td>
                <td width="30%">{{ index }}</td>
                <td width="20%" class="overview-name">数据库编号</td>
                <td width="30%">{{ id }}</td>
              </tr>
              <tr>
                <td class="overview-name">自定义名称</td>
                <td>{{ name }}</td>
                <td class="overview-name">管理人</td>
                <td>{{ manager }}</td>
              </tr>
              <tr>
                <td class="overview-name">终端名称</td>
                <td>{{ hostname }}</td>
                <td class="overview-name">开机时间</td>
                <td>{{ hostBootTime }}</td>
              </tr>
              <tr>
                <td class="overview-name">创建时间</td>
                <td>{{ createdAt }}</td>
                <td class="overview-name">更新时间</td>
                <td>{{ updatedAt }}</td>
              </tr>
              <tr class="overview-subtitle">
                <td colspan="4">系统信息</td>
              </tr>
              <tr>
                <td class="overview-name">操作系统</td>
                <td>{{ hostOS }}</td>
                <td class="overview-name">操作平台</td>
                <td>{{ hostPlatform }}</td>
              </tr>
              <tr>
                <td class="overview-name">操作平台系列</td>
                <td>{{ hostPlatformFamily }}</td>
                <td class="overview-name">操作平台版本</td>
                <td>{{ hostPlatformVersion }}</td>
              </tr>
              <tr>
                <td class="overview-name">内核版本</td>
                <td>{{ hostKernelVersion }}</td>
                <td class="overview-name">内核架构</td>
                <td>{{ hostKernelArch }}</td>
              </tr>
              <tr class="overview-subtitle">
                <td colspan="4">CPU信息</td>
              </tr>
              <tr>
                <td class="overview-name">逻辑核心数</td>
                <td>{{ cpuLogical_cores }}</td>
                <td class="overview-name">物理核心数</td>
                <td>{{ cpuPhysicalCores }}</td>
              </tr>
              <tr>
                <td class="overview-name">型号</td>
                <td colspan="3">{{ cpuModelName }}</td>
              </tr>
              <tr class="overview-subtitle">
                <td colspan="4">内存信息</td>
              </tr>
              <tr>
                <td class="overview-name">总容量（GB）</td>
                <td>{{ memTotal }}</td>
                <td colspan="2" />
              </tr>
              <tr class="overview-subtitle">
                <td colspan="4">硬盘信息</td>
              </tr>
              <tr>
                <td class="overview-name">总容量（GB）</td>
                <td>{{ diskTotal }}</td>
                <td class="overview-name">计算根路径</td>
                <td>{{ diskPath }}</td>
              </tr>
              <tr>
                <td class="overview-name">文件类型</td>
                <td>{{ diskFtype }}</td>
                <td colspan="2" />
              </tr>
              <tr class="overview-subtitle">
                <td colspan="4">网络信息</td>
              </tr>
              <tr>
                <td class="overview-name">IP</td>
                <td>{{ ip }}</td>
                <td class="overview-name">Mac</td>
                <td>{{ mac }}</td>
              </tr>
              <tr>
                <td class="overview-name">连接名称</td>
                <td>{{ netName }}</td>
                <td colspan="2" />
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

      index: '--',
      id: '--',
      name: '--',
      manager: '--',

      hostname: '--',
      hostBootTime: '--',
      hostOS: '--',
      hostPlatform: '--',
      hostPlatformFamily: '--',
      hostPlatformVersion: '--',
      hostKernelVersion: '--',
      hostKernelArch: '--',
      cpuModelName: '--',
      cpuPhysicalCores: '--',
      cpuLogical_cores: '--',
      memTotal: '--',
      diskTotal: '--',
      diskPath: '--',
      diskFtype: '--',
      netName: '--',
      ip: '--',
      mac: '--',

      createdAt: '--',
      updatedAt: '--'
    }
  },
  mounted() {
    const row = this.$store.getters.terminalSelected
    if (row !== null) {
      this.onRowClick(row)
    }
  },
  methods: {
    onRowClick(row) {
      this.terminalSelected = [row['index'], row['name'], row['manager'], row['net_basic']['ip']].join(' ')

      this.index = row.index
      this.id = row.id
      this.name = row['name']
      this.manager = row['manager']

      this.hostname = row['host_basic']['hostname']
      this.hostBootTime = row['host_basic']['boot_time']
      this.hostOS = row['host_basic']['os']
      this.hostPlatform = row['host_basic']['platform']
      this.hostPlatformFamily = row['host_basic']['platform_family']
      this.hostPlatformVersion = row['host_basic']['platform_version']
      this.hostKernelVersion = row['host_basic']['kernel_version']
      this.hostKernelArch = row['host_basic']['kernel_arch']
      this.cpuModelName = row['cpu_basic']['model_name']
      this.cpuPhysicalCores = row['cpu_basic']['physical_cores']
      this.cpuLogical_cores = row['cpu_basic']['logical_cores']
      this.memTotal = row['mem_basic']['total']
      this.diskTotal = row['disk_basic']['total']
      this.diskPath = row['disk_basic']['path']
      this.diskFtype = row['disk_basic']['ftype']
      this.netName = row['net_basic']['name']
      this.ip = row['net_basic']['ip']
      this.mac = row['net_basic']['mac']

      this.createdAt = row['created_at']
      this.updatedAt = row['updated_at']
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

.el-button {
  border-radius: 0;
  font-weight: bold;
}
</style>
