<template>
  <div :id="id" :style="{width:width,height:height}" />
</template>

<script>
import * as echarts from 'echarts'
import resize from './mixins/resize'

export default {
  name: 'ChartGauge',
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
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: null,
      opt: null
    }
  },
  watch: {
    updateData(newVal, oldVal) {
      this.opt.series[0].data[0].value = newVal
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
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.opt)
    },

    initOpt() {
      const name = this.name

      return {
        // backgroundColor: '#08263a',

        series: [
          {
            type: 'gauge',
            radius: '100%',
            center: ['50%', '70%'],
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 100,
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.25, '#7CFFB2'],
                  [0.5, '#58D9F9'],
                  [0.75, '#FDDD60'],
                  [1, '#FF6E76']
                ]
              }
            },
            pointer: {
              icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              length: '12%',
              width: 10,
              offsetCenter: [0, '-50%'],
              itemStyle: {
                color: 'inherit'
              }
            },
            axisTick: {
              length: 12,
              lineStyle: {
                color: '#ffffff',
                width: 2
              }
            },
            splitLine: {
              length: 20,
              lineStyle: {
                color: '#ffffff',
                width: 3
              }
            },
            axisLabel: {
              color: 'inherit',
              fontSize: 15,
              distance: -60,
              fontWeight: 800,
              formatter: function(value) {
                if (value === 87.5) {
                  return '危险'
                } else if (value === 62.5) {
                  return '警告'
                } else if (value === 37.5) {
                  return '关注'
                } else if (value === 12.5) {
                  return '正常'
                }
                return ''
              }
            },
            title: {
              offsetCenter: [0, '-20%'],
              fontSize: 20,
              color: '#ffffff'
            },
            detail: {
              fontSize: 20,
              offsetCenter: [0, '0%'],
              valueAnimation: true,
              formatter: function(value) {
                return Math.round(value * 100) / 100 + '%'
              },
              color: 'inherit'
            },
            data: [
              {
                value: 0,
                name: name
              }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
