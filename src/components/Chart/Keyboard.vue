<template>
  <div :id="id" :style="{width:width,height:height}" />
</template>

<script>
import * as echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    updateData: {
      type: Array,
      default: null
    },
    basicData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      opt: null,
      chart: null
    }
  },
  watch: {
    updateData(newData) {
      this.opt.series[0].data.push(newData[0][0])
      this.opt.series[0].data.shift()
      this.opt.xAxis[0].data.push(newData[1])
      this.opt.xAxis[0].data.shift()

      this.chart.setOption(this.opt)
    },
    basicData(newData) {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.opt = this.initOpt()
      this.opt.title[1].text = newData['name'] + ' ' + newData['index']
      this.initChart()
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
      const xArray = []
      const yArray = []
      for (let i = 0; i < 120; i++) {
        xArray.push('')
        yArray.push('-')
      }
      const axisColor = 'rgba(190,190,190,0.71)'

      return {
        backgroundColor: '#08263a',
        title: [{
          text: 'CPU平均占用率',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 18,
            color: 'rgba(190, 190, 190)'
          },
          left: 20,
          top: 20,
          textVerticalAlign: 'center'
        }, {
          text: '',
          textStyle: {
            fontSize: 15,
            color: 'rgba(190, 190, 190)'
          },
          left: 200,
          top: 20,
          textVerticalAlign: 'center'
        }],
        grid: {
          top: 80,
          left: '5%',
          right: '5%'
        },
        xAxis: [{
          show: true,
          name: '时间',
          nameTextStyle: {
            color: axisColor
          },
          data: xArray,
          axisLine: {
            show: true,
            lineStyle: {
              color: axisColor
            }
          },
          axisTick: {
            show: true,
            interval: 11,
            alignWithLabel: true,
            lineStyle: {
              color: axisColor
            }
          },
          axisLabel: {
            interval: 11,
            showMaxLabel: true,
            textStyle: {
              color: axisColor
            },
            hideOverlap: true
          }
        }],
        visualMap: {
          show: false,
          min: 0,
          max: 120,
          dimension: 0,
          inRange: {
            color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055']
          }
        },
        yAxis: {
          name: '占用率（%）',
          nameTextStyle: {
            color: axisColor
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: axisColor
            }
          },
          axisLabel: {
            textStyle: {
              color: axisColor
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: axisColor
            }
          },
          axisTick: {
            show: true
          }
        },
        series: [{
          name: 'front',
          type: 'bar',
          data: yArray,
          xAxisIndex: 0,
          z: 2,
          itemStyle: {
            normal: {
              borderRadius: 5
            }
          },
          showSymbol: false
          // animationDelay: 0,
          // animationEasing: 'linear',
          // animationDuration: 1200
        }],
        animationEasing: 'elasticOut',
        animationEasingUpdate: 'elasticOut',
        animationDelay(idx) {
          return idx * 3
          // if (idx < 20) {
          //   return idx * 20
          // } else {
          //   return 400
          // }
        },
        animationDelayUpdate(idx) {
          return idx * 3
          // if (idx < 20) {
          //   return idx * 20
          // } else {
          //   return 400
          // }
        }
        // animationDurationUpdate: 300
      }
    }
  }
}
</script>
