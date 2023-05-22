<template>
  <div>
    <div class="MonitorChartChart">
      <div
        class="MonitorChartChart_chart"
        id="MonitorChartChart_chart"
      ></div>
    </div>
    <div v-if="NameArr" class="box">
      <span v-for="item in NameArr" :key="item">{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['ReportMonitorChartData'],
  data() {
    return {
      Name: {},
      NameArr: [],
      formatter: '',
    }
  },
  mounted() {
    this.MonitorChartChart() //报警趋势
  },
  watch: {
    ReportMonitorChartData() {
      //数据一传递触发更新函数
      return this.MonitorChartChart()
    },
  },
  methods: {
    MonitorChartChart() {
      var _self = this
      let resdata = this.ReportMonitorChartData.list
      // let resdata = [
      //   {
      //     dayFlag: false,
      //     deviceId: 'b2925b5e-13e8-43f5-af19-52be5765f51d',
      //     no: 71252,
      //     signalId: '1F',
      //     time: '2022-12-02T11:00:00',
      //     value: true,
      //   },
      // ]
      this.NameArr = [] //y周数据
      this.formatter = ''//数据格式化
      if (this.ReportMonitorChartData.obj) {
        this.Name = {}//用来格式化数据时选择对应的值来显示
        let arr = this.ReportMonitorChartData.obj
          .replaceAll(';', ':')
          .split(':')
        for (let index = 0; index < arr.length; index++) {//修改Name
          if (index % 2 == 0) {
            if (arr[index]) {
              this.Name[arr[index]] = arr[index + 1]
            }
          }
        }
        for (const key in this.Name) {
          if (Object.hasOwnProperty.call(this.Name, key)) {//修改NameArr
            const element = this.Name[key]
            console.log(element)
            // this.NameArr.push(element)
            this.NameArr.push(`${key}:${element}`)

          }
        }
      }
      if (this.Name) {//修改数据轴
        this.yAxis = [
          {
            // position: 'right',
            //          axisLabel: {
            //   formatter: '{value} °C'
            // },
            // show:false,
            type: 'value',
            splitLine: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(204,187,225,0.5)',
              
              },
            },
            axisLabel: {
              //---坐标轴 标签
              show: true, //---是否显示
            },
          },
          {            
            type: 'category',
            splitLine: {
              show: false,
            },
            // boundaryGap: false,
            axisLine: {
              show: false,
              lineStyle: {
                color: 'rgba(204,187,225,0.5)',
               
              },
            },
            axisLabel: {
              //---坐标轴 标签
              show: true, //---是否显示
            },
            data: this.NameArr,
          },
        ]    
      } else {
        this.yAxis = [
          {
            //          axisLabel: {
            //   formatter: '{value} °C'
            // },          
            type: 'value',
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(204,187,225,0.5)',
              },
            },
            axisLabel: {
              //---坐标轴 标签
              show: true, //---是否显示
            },
          },
        ]
      }
      console.log(this.NameArr)
let that=this
      this.formatter = function () {
        if (that.NameArr.length > 0) {
          console.log(arguments[0][0].data)
          let a = arguments[0][0].data==true ? '1' :arguments[0][0].data==false?'0':arguments[0][0].data
          let b = that.Name[a]
          return '时间：' + arguments[0][0].name + `</br>状态：` + b
        } else {
          return  '时间：' + arguments[0][0].name + `</br>当前数值：` + arguments[0][0].data
        }
      }
      var xData = (function () {
        let count = []
        let data = []
        for (var i = 0; i < resdata.length; i++) {
          data.push(
            resdata[i].time.split('T').join(' ').substring(0, 16)
            // .slice(5, 14)
            // .replace('-', '月')
            // .slice(0, resdata[i].time.length) + '日'
          )
          count.push(resdata[i].value)
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
              color: '#fff',
            },
          },
          formatter: this.formatter,
        },
        grid: {
          borderWidth: 0,
          top: 90,
          bottom: 125,
          textStyle: {
            color: '#fff',
          },
        },
        legend: {
          x: '46%',
          top: '8%',
          textStyle: {
            fontSize: 16,
            color: '#90979c',
          },
          data: [''],
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: 'rgba(204,187,225,0.5)',
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              rotate: 45,
              fontWeight: 'bold',
            },
            data: xData.data,
          },
        ],
        yAxis: this.yAxis,
        dataZoom: [
          {
            show: true,
            height: 30,
            xAxisIndex: [0],
            bottom: 0, //底部滑动轴的距离
            start: 0,
            end: 100,
            handleIcon:
              'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
              color: '#5B3AAE',
            },
            textStyle: {
              color: 'rgba(204,187,225,-1)',
            },
            fillerColor: 'rgba(67,55,160,0.7)',
            borderColor: 'rgba(204,187,225,0.5)',
          },
          {
            type: 'inside',
            show: true,
            height: 15,
            start: 1,
            end: 35,
          },
        ],
        series: [
          {
            name: '',
            type: 'line',
            step: 'start',
            symbolSize: 10,
            symbol: 'circle',
            itemStyle: {
              color: '#6f7de3',
            },
            markPoint: {
              label: {
                normal: {
                  textStyle: {
                    color: '#fff',
                  },
                },
              },
              data: [
                {
                  type: 'max',
                  name: '最大值',
                },
                {
                  type: 'min',
                  name: '最小值',
                },
              ],
            },
            data: xData.count,
          },
        ],
      }
      var MonitorChartChart_chart = this.$echarts.init(
        document.getElementById('MonitorChartChart_chart')
      )
      MonitorChartChart_chart.setOption(option, true)
    },
  },
}
</script>

<style lang="scss" >
.box{
  position: absolute;
  left:5%;
  top: 15%;
  z-index: 999;
}
.MonitorChartChart {
  .MonitorChartChart_chart {
    width: 70vw;
    height: 56vh;
  }
}
</style>
