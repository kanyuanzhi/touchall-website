<template>
  <div :id="id" :style="{width:width,height:height}" />
</template>

<script>
import * as echarts from 'echarts'
import resize from './mixins/resize'
import per from '@/views/terminal/running/cpu/per'

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
    },
    name: {
      type: String,
      default: ''
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
      const percent = newData[0]
      this.opt.series[0].data.push(percent)
      this.opt.series[0].data.shift()
      this.opt.xAxis[0].data.push(newData[1])
      this.opt.xAxis[0].data.shift()

      if (percent <= 25) {
        this.opt.series[0].areaStyle.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(124,255,178,0.8)'
        }, {
          offset: 1,
          color: 'rgba(124,255,178,0.3)'
        }], false)
      } else if (percent <= 50) {
        this.opt.series[0].areaStyle.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(88,217,249,0.8)'
        }, {
          offset: 1,
          color: 'rgba(88,217,249,0.3)'
        }], false)
      } else if (percent <= 75) {
        this.opt.series[0].areaStyle.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(253,221,96,0.8)'
        }, {
          offset: 1,
          color: 'rgba(253,221,96,0.3)'
        }], false)
      } else {
        this.opt.series[0].areaStyle.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(255,110,118,0.8)'
        }, {
          offset: 1,
          color: 'rgba(255,110,118,0.3)'
        }], false)
      }

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
      const xArray = []
      const yArray = []
      for (let i = 0; i < 120; i++) {
        xArray.push('')
        yArray.push('')
      }
      const name = this.name

      const axisColor = 'rgba(190,190,190,0.71)'

      return {
        // visualMap: visualMap,
        // backgroundColor: '#08263a',
        // title: {
        //   top: 20,
        //   text: 'Requests',
        //   textStyle: {
        //     fontWeight: 'normal',
        //     fontSize: 16,
        //     color: '#F1F1F3'
        //   },
        //   left: '1%'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        // legend: {
        //   top: 20,
        //   icon: 'rect',
        //   itemWidth: 14,
        //   itemHeight: 5,
        //   itemGap: 13,
        //   data: ['CMCC', 'CTCC', 'CUCC'],
        //   right: '4%',
        //   textStyle: {
        //     fontSize: 12,
        //     color: '#F1F1F3'
        //   }
        // },
        grid: [{
          top: '20%',
          left: '5%',
          right: '8%',
          bottom: '20%',
          containLabel: true
        }],
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
        yAxis: [{
          type: 'value',
          name: '占用率（%）',
          max: 100,
          splitNumber: 4,
          interval: 25,
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
        }],
        series: [{
          id: 'series',
          name: name,
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 4,
          showSymbol: true,
          lineStyle: {
            color: 'rgba(0,0,0,0)',
            width: 1
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(137, 189, 27, 0.6)'
            }, {
              offset: 1,
              color: 'rgba(137, 189, 27, 0.3)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          },
          itemStyle: {
            // color: 'rgb(137,189,27)',
            color: function(params) {
              if (params.value <= 25) {
                return '#7CFFB2'
              } else if (params.value <= 50) {
                return '#58D9F9'
              } else if (params.value <= 75) {
                return '#FDDD60'
              } else {
                return '#FF6E76'
              }
            }
            // borderColor: 'rgba(137,189,2,0.27)',
            // borderWidth: 12
          },
          data: yArray
        }],
        animationEasingUpdate: 'elasticOut'
      }
    }
  }
}
</script>
