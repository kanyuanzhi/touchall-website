<template>
  <div :id="id" :style="{width:width,height:height}" />
</template>

<script>
import * as echarts from 'echarts'
import resize from './mixins/resize'

export default {
  name: 'ChartCpuRadar',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '400px'
    },
    height: {
      type: String,
      default: '400px'
    },
    updateData: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      chart: null,
      opt: null
    }
  },
  watch: {
    updateData(newData, oldData) {
      this.opt.series[0].data = [newData]
      this.chart.setOption(this.opt)
    }
  },
  mounted() {
    this.opt = this.initOpt()
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id), 'dark', { renderer: 'canvas' })
      this.chart.setOption(this.opt)
    },

    initOpt() {
      const dataBJ = [
        [55, 9, 56, 0.46, 18, 6, 1]
      ]
      return {
        backgroundColor: '#08263a',
        title: {
          show: false,
          text: 'CPU单核利用率',
          left: 'center',
          textStyle: {
            color: '#eee'
          }
        },
        // legend: {
        //   bottom: 5,
        //   data: ['Beijing', 'Shanghai', 'Guangzhou'],
        //   itemGap: 20,
        //   textStyle: {
        //     color: '#fff',
        //     fontSize: 14
        //   },
        //   selectedMode: 'single'
        // },
        radar: {
          indicator: [
            { name: '1', max: 100 },
            { name: '2', max: 100 },
            { name: '3', max: 100 },
            { name: '4', max: 100 },
            { name: '5', max: 100 },
            { name: '6', max: 100 },
            { name: '7', max: 100 },
            { name: '8', max: 100 },
            { name: '9', max: 100 },
            { name: '10', max: 100 },
            { name: '11', max: 100 },
            { name: '12', max: 100 },
            { name: '13', max: 100 },
            { name: '14', max: 100 },
            { name: '15', max: 100 },
            { name: '16', max: 100 }
          ],
          shape: 'circle',
          splitNumber: 5,
          axisName: {
            color: 'rgb(238, 197, 102)'
          },
          splitLine: {
            lineStyle: {
              color: [
                'rgba(238, 197, 102, 0.1)',
                'rgba(238, 197, 102, 0.2)',
                'rgba(238, 197, 102, 0.4)',
                'rgba(238, 197, 102, 0.6)',
                'rgba(238, 197, 102, 0.8)',
                'rgba(238, 197, 102, 1)'
              ].reverse()
            }
          },
          splitArea: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(238, 197, 102, 0.5)'
            }
          }
        },
        series: [
          {
            name: '',
            type: 'radar',
            lineStyle: {
              width: 1,
              opacity: 1
            },
            data: 0,
            symbol: 'none',
            itemStyle: {
              color: '#F9713C'
            },
            areaStyle: {
              opacity: 0.6
            }
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
