<template>
  <div :id="id" :style="{width:width,height:height}" />
</template>

<script>
import * as echarts from 'echarts'
import resize from './mixins/resize'
import { BToGB } from '@/utils/common'

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
      this.opt.series[0].data.push(BToGB(newData[0]['used']))
      this.opt.series[0].data.shift()
      this.opt.series[1].data.push(BToGB(newData[0]['available']))
      this.opt.series[1].data.shift()
      this.opt.series[2].data.push(newData[0]['used_percent'].toFixed(2))
      this.opt.series[2].data.shift()
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
          text: this.name,
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        grid: {
          top: 80,
          left: '5%',
          right: '5%',
          // borderWidth: 0,
          // bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          // x: '5%',
          top: 20,
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
          },
          data: ['可用', '占用', '占用率']
        },
        calculable: true,
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
              color: axisColor,
              type: 'dashed'
            }
          },
          axisTick: {
            show: true
          }
        }, {
          type: 'value',
          name: '大小（GB）',
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
          yAxisIndex: 1,
          name: '占用',
          type: 'bar',
          stack: 'total',
          // barMaxWidth: 10,
          // barGap: '100%',
          itemStyle: {
            normal: {
              color: 'rgba(255,144,128,0.8)'
              // label: {
              //   show: true,
              //   textStyle: {
              //     color: '#fff'
              //   },
              //   position: 'insideTop',
              //   formatter(p) {
              //     return p.value > 0 ? p.value : ''
              //   }
              // }
            }
          },
          data: yArray.slice(0)
        },{
          yAxisIndex: 1,
          name: '可用',
          type: 'bar',
          stack: 'total',
          itemStyle: {
            normal: {
              color: 'rgba(0,191,183,0.8)'
              // label: {
              //   show: true,
              //   position: 'top',
              //   formatter(p) {
              //     return p.value > 0 ? p.value : ''
              //   }
              // }
            }
          },
          data: yArray.slice(0)
        },  {
          yAxisIndex: 0,
          name: '占用率',
          type: 'line',
          // stack: 'total',
          // symbolSize: 10,
          // symbol: 'circle',
          itemStyle: {
            normal: {
              color: 'rgba(252,230,48,1)',
              barBorderRadius: 0
              // label: {
              //   show: true,
              //   position: 'top',
              //   formatter(p) {
              //     return p.value > 0 ? p.value : ''
              //   }
              // }
            }
          },
          data: yArray.slice(0)
        }],
        animationEasing: 'cubicOut',
        animationEasingUpdate: 'elasticOut'
      }
    }
  }
}
</script>
