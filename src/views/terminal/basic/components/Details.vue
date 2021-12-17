<template>
  <el-card shadow="always">
    <div slot="header" class="clearfix">
      <span>{{ '详细信息（序号 ' + terminal.index + '）' }}</span>
      <el-button class="details-btn" icon="el-icon-delete" type="danger" round />
      <el-button class="details-btn" icon="el-icon-edit" type="primary" round />
    </div>
    <el-descriptions column="1" size="medium">
      <el-descriptions-item label="终端ID">{{ terminal.id }}</el-descriptions-item>
      <el-descriptions-item label="自定义名称">{{ terminal.name }}</el-descriptions-item>
      <el-descriptions-item label="管理人">{{ terminal.manager }}</el-descriptions-item>

      <el-descriptions-item label="终端名称">{{ terminal.host_basic.hostname }}</el-descriptions-item>
      <el-descriptions-item label="开机时间">{{ terminal.host_basic.boot_time }}</el-descriptions-item>
      <el-descriptions-item label="操作系统">{{ terminal.host_basic.os }}</el-descriptions-item>
      <el-descriptions-item label="操作平台">{{ terminal.host_basic.platform }}</el-descriptions-item>
      <el-descriptions-item label="操作平台系列">{{ terminal.host_basic.platform_family }}</el-descriptions-item>
      <el-descriptions-item label="操作平台版本">{{ terminal.host_basic.platform_version }}</el-descriptions-item>
      <el-descriptions-item label="内核版本">{{ terminal.host_basic.kernel_version }}</el-descriptions-item>
      <el-descriptions-item label="内核架构">{{ terminal.host_basic.kernel_arch }}</el-descriptions-item>
      <el-descriptions-item label="CPU型号">{{ terminal.cpu_basic.model_name }}</el-descriptions-item>
      <el-descriptions-item label="CPU物理核心数">{{ terminal.cpu_basic.physical_cores }}</el-descriptions-item>
      <el-descriptions-item label="CPU逻辑核心数">{{ terminal.cpu_basic.logical_cores }}</el-descriptions-item>
      <el-descriptions-item label="内存大小（GB）">{{ terminal.mem_basic.total }}</el-descriptions-item>

      <el-descriptions-item label="磁盘大小（GB）">{{ terminal.disk_basic.total }}</el-descriptions-item>
      <el-descriptions-item label="磁盘大小计算根路径" :span="2">{{ terminal.disk_basic.path }}</el-descriptions-item>

      <el-descriptions-item label="磁盘文件类型">{{ terminal.disk_basic.total }}</el-descriptions-item>
      <el-descriptions-item label="网络连接名称">{{ terminal.net_basic.name }}</el-descriptions-item>
      <el-descriptions-item label="网络IP地址">{{ terminal.net_basic.ip }}</el-descriptions-item>
      <el-descriptions-item label="网络Mac地址">{{ terminal.net_basic.mac }}</el-descriptions-item>
      <el-descriptions-item label="创建时间">{{ terminal.created_at }}</el-descriptions-item>
      <el-descriptions-item label="更新时间">{{ terminal.updated_at }}</el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script>
export default {
  name: 'TerminalDetails',
  props: ['terminal']
}
</script>

<style scoped>
.details-btn {
  float: right;
  padding: 2px 8px;
  margin-right: 10px;
  font-size: 12px;
}
</style>
