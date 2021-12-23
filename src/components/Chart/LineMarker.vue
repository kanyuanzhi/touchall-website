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
      const perPercents = newData[0]
      for (let i = 0; i < perPercents.length; i++) {
        this.opt.series[i].data.push(perPercents[i].toFixed(2))
        this.opt.series[i].data.shift()
      }
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

      const legendData = []
      const series = []
      let coresNum = 0
      if (this.basicData != null) {
        coresNum = this.basicData['cpu_basic']['logical_cores']
      }
      for (let i = 0; i < coresNum; i++) {
        legendData.push(String(i + 1))
        series.push(this.initSeries(String(i + 1), yArray.slice(0)))
      }

      return {
        backgroundColor: '#08263a',
        title: [{
          text: 'CPU单核占用率',
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
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: legendData,
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
          }
        },
        grid: {
          top: 80,
          left: '5%',
          right: '5%'
          // bottom: '2%',
          // containLabel: true
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
        yAxis: [{
          type: 'value',
          name: '占用率（%）',
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
        series: series,
        animationEasingUpdate: 'elasticOut'
      }
    },

    initSeries(name, data) {
      return {
        name: name,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 1
          }
        },
        data: data
      }
    }
  }
}
</script>
