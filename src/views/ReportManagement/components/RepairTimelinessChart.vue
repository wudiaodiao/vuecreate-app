<!--
 * @Author: your name
 * @Date: 2020-12-14 11:44:29
 * @LastEditTime: 2021-11-23 15:26:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \IBMS\ibms\src\views\ReportManagement\components\RepairTimelinessChart.vue
-->
<template>
  <div>
    <div class="alarmLevelqus">
      <h3>一. 维修及时率</h3>
      <div class="alarmLevelqus_chart" id="alarmLevelqus_chart"></div>
      <div class="alarmLevelqus_table">
        <el-table
          :data="ReportRepairTimelinessData.list"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column prop="name" label="处理人"></el-table-column>
          <el-table-column
            prop="recordCount"
            label="维修数量（单）"
          ></el-table-column>
          <el-table-column prop="recordSum" label="维修总时长（小时）">
            <template v-slot="scope">
              <span>{{ scope.row.recordSum.toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="recordAverage" label="维修平均时长（小时）">
            <template v-slot="scope">
              <span>{{ scope.row.recordAverage.toFixed(2) }}</span>
            </template>
          </el-table-column>
        </el-table>
        <p>1.维修及时率=当日接单量/当日需维修总量</p>
        <p>
          2.分析说明：维修效率最高的是{{
            listMinAverage.listMinAverageName
          }}平均维修及时率为{{
            listMinAverage.recordAverage
          }}小时；处理单数最多的是{{
            listMaxCount.listMaxCountName
          }}处理单数为{{ listMaxCount.recordCount }}单。
        </p>
      </div>
      <h3 class="margin_t">二. 最快的十单维修</h3>
      <div class="alarmLevelqus_table">
        <el-table
          :data="ReportRepairTimelinessData.queryFast"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column prop="reportTime" label="时间">
            <template v-slot="scope">
              <span>{{ $Convert.getTime(scope.row.reportTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="dealUserName" label="处理人"></el-table-column>
          <el-table-column prop="content" label="内容">
            <template v-slot="scope">
              <span :title="scope.row.content">{{ scope.row.content }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="finishTimeSpan" label="处理时长（小时）">
            <template v-slot="scope">
              <span>{{ scope.row.finishTimeSpan.toFixed(2) }}</span>
            </template>
          </el-table-column>
        </el-table>
        <p>
          分析说明：最快的十单设备维修单处理及时率平均值为{{
            queryFastfinishTimeSpan
          }}小时。
        </p>
      </div>
      <h3 class="margin_t">三. 最慢的十单维修</h3>
      <div class="alarmLevelqus_table">
        <el-table
          :data="ReportRepairTimelinessData.querySlow"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column prop="reportTime" label="时间">
            <template v-slot="scope">
              <span>{{ $Convert.getTime(scope.row.reportTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="dealUserName" label="处理人"></el-table-column>
          <el-table-column prop="content" label="内容">
            <template v-slot="scope">
              <span :title="scope.row.content">{{ scope.row.content }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="finishTimeSpan" label="处理时长（小时）">
            <template v-slot="scope">
              <span>{{ scope.row.finishTimeSpan.toFixed(2) }}</span>
            </template>
          </el-table-column>
        </el-table>
        <p>
          分析说明：最慢的十单设备维修单处理及时率平均值为{{
            querySlowfinishTimeSpan
          }}小时。
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['ReportRepairTimelinessData'],
  data() {
    return {
      listMinAverage: {},
      listMaxCount: {},
      queryFastfinishTimeSpan: '', //快
      querySlowfinishTimeSpan: ''
    }
  },
  mounted() {
    
      this.alarmLevelqus() //报警趋势
   
  },
  computed: {},
  watch: {
    ReportRepairTimelinessData(newold, lod) {
      //数据一传递触发更新函数
      this.ReportlistMinAverage()
      this.ReportlistMaxCount()
      this.queryFastquerySlowfinishTimeSpan()
      return this.alarmLevelqus()
    }
  },
  methods: {
    queryFastquerySlowfinishTimeSpan() {
      //最慢最快十单维修
      let recordAverage = 0
      let slowRecordAverage = 0
      //快
      for (let i in this.ReportRepairTimelinessData.queryFast) {
        recordAverage +=
          this.ReportRepairTimelinessData.queryFast[i].finishTimeSpan.toFixed(
            2
          ) - 0
      }
      this.queryFastfinishTimeSpan = (
        recordAverage / this.ReportRepairTimelinessData.queryFast.length -
        0
      ).toFixed(2)

      //慢
      for (let i in this.ReportRepairTimelinessData.querySlow) {
        slowRecordAverage +=
          this.ReportRepairTimelinessData.querySlow[i].finishTimeSpan.toFixed(
            2
          ) - 0
      }
      this.querySlowfinishTimeSpan = (
        slowRecordAverage / this.ReportRepairTimelinessData.querySlow.length -
        0
      ).toFixed(2)
    },

    //维修及时率分析说明
    ReportlistMinAverage() {
      let listMinAverageName = ''
      let recordAverage = ''

      for (let i in this.ReportRepairTimelinessData.listMinAverage) {
        listMinAverageName +=
          this.ReportRepairTimelinessData.listMinAverage[i].name + ','
        recordAverage = this.ReportRepairTimelinessData.listMinAverage[
          i
        ].recordAverage.toFixed(2)
      }
      this.listMinAverage = {
        listMinAverageName: listMinAverageName,
        recordAverage: recordAverage
      }
    },
    ReportlistMaxCount() {
      //维修及时率分析说明
      let listMaxCountName = ''
      let recordCount = ''
      for (let i in this.ReportRepairTimelinessData.listMaxCount) {
        listMaxCountName +=
          this.ReportRepairTimelinessData.listMaxCount[i].name + ','
        recordCount = this.ReportRepairTimelinessData.listMaxCount[i]
          .recordCount
      }
      this.listMaxCount = {
        listMaxCountName: listMaxCountName,
        recordCount: recordCount
      }
    },

    tableRowClassName({ row, rowIndex }) {
      //list背景色
      if (rowIndex % 2 == 1) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
      return ''
    },
    alarmLevelqus() {
        
      let resdata = this.ReportRepairTimelinessData.list || 0
      let pictorialBarList = []
      var xData = (function() {
        let count = []
        let dataName = []
        for (var i = 0; i < resdata.length; i++) {
          pictorialBarList.push(1)
          dataName.push(resdata[i].name)
          count.push(resdata[i].recordAverage.toFixed(2))
        }
        return { dataName, count }
      })()
      var colors = [
        {
          type: 'linear',
          x: 0,
          x2: 1,
          y: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(0, 240, 255, 1)'
            },
            {
              offset: 0.5,
              color: 'rgba(0, 195, 207, 0.2)'
            },
            {
              offset: 0.5,
              color: 'rgba(0, 216, 229, 1)'
            },
            {
              offset: 1,
              color: 'rgba(0, 216, 229, 1)'
            }
          ]
        },
        {
          type: 'linear',
          x: 0,
          x2: 1,
          y: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(0, 240, 255, 1)'
            },
            {
              offset: 0.5,
              color: 'rgba(0, 195, 207, 0.9)'
            },
            {
              offset: 0.5,
              color: 'rgba(0, 216, 229, 1)'
            },
            {
              offset: 1,
              color: 'rgba(0, 216, 229, 1)'
            }
          ]
        }
      ]

      var barWidth = 30

      let option = {
        backgroundColor: 'rgba(0,0,0,0)',
        tooltip: {
          trigger: 'item',

          formatter: '{b} : {c}小时',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
         grid: {
          top: '15%',
          left: '10%',
          right: '10%',
          bottom: '8%',
          containLabel: true
        },
        title: {
          text: '设备维修及时率统计',
          left: 'center',
          top: 0,
          bottom: 30,
          textStyle: {
            color: '#ccc'
          }
        },
        xAxis: {
          data: xData.dataName,
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)',
              width: 1 //这里是为了突出显示加上的
            }
          },
          axisLabel: {
            interval: 0,
           
          }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)',
              width: 1 //这里是为了突出显示加上的
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)' //分割线
            }
          }
        },
        series: [
          {
            z: 1,
            type: 'bar',
            barWidth: barWidth,
            data: xData.count,
            itemStyle: {
              normal: {
                color: colors[1]
              }
            },
            label: {
              show: true, //开启显示
              position: 'top', //在上方显示
              textStyle: {
                //数值样式
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: 14,
                fontWeight: 600
              }
            }
          },
          {
            z: 2,
            name: '底部',
            type: 'pictorialBar',
            data: pictorialBarList,
            symbol: 'diamond',
            symbolOffset: [0, '50%'],
            symbolSize: [barWidth, 10],
            itemStyle: {
              normal: {
                color: 'rgba(0, 216, 229, 1)'
              }
            }
          },
          {
            z: 3,
            name: '上部1',
            type: 'pictorialBar',
            symbolPosition: 'end',
            data: xData.count,
            symbol: 'diamond',
            symbolOffset: [0, '-52%'],
            // symbolSize: [barWidth - 4, 10 * (barWidth - 3) / barWidth],
            symbolSize: [barWidth, 14],
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 195, 207, 0.5)',
                borderWidth: 1,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(0, 226, 240, 1)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(0, 240, 255, 1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 195, 207, 1)'
                  }
                ])
              }
            }
          }
        ]
      }

      var alarmLevelqus_chart = this.$echarts.init(
        document.getElementById('alarmLevelqus_chart')
      )
    alarmLevelqus_chart.clear()
        window.addEventListener('resize', () => {
        alarmLevelqus_chart.resize()
      })

      alarmLevelqus_chart.setOption(option)
    }
  }
}
</script>

<style lang="scss">
.alarmLevelqus {
  .alarmLevelqus_chart {
    width: 70vw !important;
    height: 40vh;
  }
  .alarmLevelqus_table {
    margin: 0 40px;
  }
  .margin_t {
    margin-top: 40px;
  }
}
</style>
