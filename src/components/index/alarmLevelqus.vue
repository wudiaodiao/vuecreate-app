<template>
  <div>
    <div class="alarmLevelqus">
      <div class="alarmLevelqus_chart" id="alarmLevelqus_chart"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dayList:[]
    }
  },
  mounted() {
    this.dayList = this.$store.state.InfolistData.dayList

    this.alarmLevelqus() //报警趋势
  },
  watch: {
    '$store.state.InfolistData': function(newVal, oldVal) {
      //数据一变化更新数值
      this.dayList = newVal.dayList //newVal即是chartData
      this.alarmLevelqus() //报警趋势
    }
  },
  methods: {
    alarmLevelqus() {
      var _self = this
      let resdata = this.dayList

      var xData = (function() {
        let count = []
        let data = []
        for (var i = 0; i < resdata.length; i++) {
          data.push(resdata[i].alarmTime.slice(0, 10))
          count.push(resdata[i].total)
        }
        return { data, count }
      })()
      var option = {
        backgroundColor: 'rgba(0,0,0,0)',

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            textStyle: {
              color: '#fff'
            }
          }
        },
        grid: {
          borderWidth: 0,
          top: 110,
          bottom: 170,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          x: '46%',
          top: '0%',
          selectedMode: 'single',
          textStyle: {
            fontSize: 16,
            color: '#90979c'
          },
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 50
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(204,187,225,0.5)',
                fontSize: 12
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            data: xData.data
          }
        ],

        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(204,187,225,0.5)'
              }
            }
          }
        ],
        dataZoom: [
          {
            show: true,
            height: 25,
            xAxisIndex: [0],
            bottom: 50,
            start: 0,
            end: 100,
            handleIcon:
              'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
              color: '#5B3AAE'
            },
            textStyle: {
              color: 'rgba(204,187,225,0.5)'
            },
            fillerColor: 'rgba(67,55,160,0.7)',
            borderColor: 'rgba(204,187,225,0.5)'
          },
          {
            type: 'inside',
            show: true,
            height: 15,
            start: 1,
            end: 35
          }
        ],
        series: [
          {
            type: 'line',
            symbolSize: 14,
            symbol: 'circle',
            itemStyle: {
              color: '#6f7de3'
            },
            markPoint: {
              label: {
                normal: {
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              data: [
                {
                  type: 'max',
                  name: '最大值'
                },
                {
                  type: 'min',
                  name: '最小值'
                }
              ]
            },
            data: xData.count
          },

        ]
      }

      var alarmLevelqus_chart = this.$echarts.init(
        document.getElementById('alarmLevelqus_chart')
      )
      alarmLevelqus_chart.on('legendselectchanged', function(obj) {
        var name = obj.name
        var option = alarmLevelqus_chart.getOption()
          option.xAxis[0].data = xData.data

        alarmLevelqus_chart.setOption(option, true)
      })

      alarmLevelqus_chart.setOption(option)
    }
  }
}
</script>

<style lang="scss">
.alarmLevelqus {
  .alarmLevelqus_chart {
    width: 70vw;
    height: 64vh;
  }
}
</style>
