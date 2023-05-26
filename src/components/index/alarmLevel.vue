<template>
  <div class="alarmLevel">
    <el-radio-group
      @change="redioChange"
      v-model="type"
    >
      <el-radio
        label="1"
        border
      >日</el-radio>
      <el-radio
        label="2"
        border
      >周</el-radio>
      <el-radio
        label="3"
        border
      >月</el-radio>
      <el-radio
        label="4"
        border
      >季度</el-radio>
      <el-radio
        label="5"
        border
      >年</el-radio>
      <el-radio
        label="6"
        border
      >历史总数</el-radio>
    </el-radio-group>
    <potting-tab
      :tabData="addEvent"
      v-on:pottingTabClick="pottingTabClick"
    >
    </potting-tab>

    <div v-show="addSheId == 0">
      <div class="alarmLeveljb">
        <div
          class="zzalarmLeveljb_chart"
          id="zzalarmLeveljb_chart"
        ></div>
        <div
          id="annualContrastChart"
          class="alarmLeveljb_chart"
        ></div>
      </div>
      <div class="tongji">
        <div style="width: 100%; height: 100%">
          <div
            id="quarterPassengerFlowChart"
            style="width: 100%; height: 95%"
          ></div>
        </div>
      </div>
    </div>

    <div v-show="addSheId == 1">
      <div class="baojin_center_zhong">
        <div class="baojin_center_zhong_list">
          <el-table
            :data="subList"
            style="width: 100%"
            :row-class-name="tableRowClassName"
            v-loading="searchLoding"
          >
            <el-table-column
              prop="subSystemName"
              label="子系统"
            >
              <template v-slot="scope">
                <el-popover
                  placement="top"
                  trigger="click"
                  :content="scope.row.subSystemName"
                >
                  <a
                    slot="reference"
                    href="#"
                  >
                    {{ scope.row.subSystemName }}
                  </a>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="tip"
              label="提示"
            > </el-table-column>

            <el-table-column
              prop="common"
              label="一般"
            > </el-table-column>

            <el-table-column
              prop="important"
              label="重要"
            > </el-table-column>
            <el-table-column
              prop="urgent"
              label="紧急"
            >
              <template v-slot="scope">
                <a
                  href="#"
                  :title="scope.row.urgent"
                >
                  {{ scope.row.urgent }}
                </a>
              </template>
            </el-table-column>

            <el-table-column
              prop="total"
              label="报警数量"
            >
              <template v-slot="scope">
                <a
                  href="#"
                  :title="scope.row.total"
                >
                  {{ scope.row.total }}
                </a>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pottingTab from './potting-tab.vue'
import DateTime from '@/js/datetime.js'
export default {
  components: { pottingTab },
  data() {
    return {
      DateTime: DateTime,
      ringChart: [],
      levelList: [],
      sameChart: [],
      subList: [],
      type: '1',
      addSheId: '0',
      searchLoding: false,
      addEvent: [
        { name: '统计分析', id: '0' },
        { name: '子系统', id: '1' },
      ],
      loading: '',
    }
  },
  mounted() {
    this.GetLevelChartTable()
  },
  computed: {
    levels: function () {
      //返回当前时间的上一个月
      //通过回调函数给计算属性传参
      return function (type) {
        switch (type) {
          case 1:
            return '提示'
            break
          case 2:
            return '一般'
            break
          case 3:
            return '重要'
            break
          case 4:
            return '紧急'
            break
          default:
            return '其他'
        }
      }
    },
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      //背景色
      if (rowIndex % 2 == 1) {
        return 'warning-row' //基数
      } else {
        return 'success-row' //偶数
      }
      return ''
    },
    pottingTabClick(id) {
      this.addSheId = id
    },
    redioChange(e) {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      this.GetLevelChartTable()
    },
    async GetLevelChartTable() {
      const res = await this.$api.MMS.Event.GetLevelChartTable({
        type: this.type,
      })
      setTimeout(() => {
        this.loading.close()
      }, 500)
      if (res.ok) {
        this.levelList = res.data.levelList || []
        this.ringChart = res.data.ringChart || {}
        this.sameChart = res.data.sameChart || {}
        this.subList = res.data.subList || []

        this.zzalarmLeveljb()
        this.annualContrastInit()
        this.quarterPassengerFlowInit()
      }
    },
    quarterPassengerFlowInit() {
      var huanbi = this.ringChart
      let dateTong = []
      let dataValue = []
      if (huanbi.before) {
        dateTong = [
          `${DateTime.parse(huanbi.before.startTime).format(
            'yyyy-MM-dd hh:mm'
          )}\n${DateTime.parse(huanbi.before.endTime).format(
            'yyyy-MM-dd hh:mm'
          )}`,
          `${DateTime.parse(huanbi.current.startTime).format(
            'yyyy-MM-dd hh:mm'
          )}\n${DateTime.parse(huanbi.current.endTime).format(
            'yyyy-MM-dd hh:mm'
          )}`,
        ]
        dataValue = [huanbi.before.total || 0, huanbi.current.total || 0]
      } else {
        dateTong = []
        dataValue = []
      }
      let myChart = this.$echarts.init(
        document.getElementById('quarterPassengerFlowChart')
      )
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow',
          },
        },
        title: {
          text: '报警环比分析',
          x: 'center',
          y: '7px',
          textStyle: {
            color: 'rgba(255,255,255,1)',
            fontSize: 16,
          },
          textAlign: 'left',
        },
        xAxis: {
          type: 'category',
          axisTick: { show: false },
          data: dateTong,
          axisLine: {
            //这是x轴文字颜色
            lineStyle: {
              color: 'rgba(255,255,255,0.8)',
            },
          },
        },
        yAxis: {
          type: 'value',
          name: '单位：(次数)',
          splitLine: { show: false },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.8)',
            },
          },
        },
        series: [
          {
            data: dataValue,
            type: 'line',
            symbolSize: 12,
            animation: false,
            itemStyle: {
              //圆圈样式
              borderWidth: 2,
              color: '#FF8F4F',
            },
            lineStyle: {
              //线条样式
              width: 3,
              color: '#FF8F4F',
            },
            smooth: true,
          },
        ],
      })
    },
    annualContrastInit() {
      var tongbi = this.sameChart
      let dateTong = []
      let dataValue = []

      if (tongbi.before) {
        dateTong = [
          `${DateTime.parse(tongbi.before.startTime).format(
            'yyyy-MM-dd hh:mm'
          )}\n${DateTime.parse(tongbi.before.endTime).format(
            'yyyy-MM-dd hh:mm'
          )}`,
          `${DateTime.parse(tongbi.current.startTime).format(
            'yyyy-MM-dd hh:mm'
          )}\n${DateTime.parse(tongbi.current.endTime).format(
            'yyyy-MM-dd hh:mm'
          )}`,
        ]
        dataValue = [tongbi.before.total || 0, tongbi.current.total || 0]
      } else {
        dateTong = []
        dataValue = []
      }
      let myChart = this.$echarts.init(
        document.getElementById('annualContrastChart')
      )
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow',
          },
        },
        title: {
          text: '报警同比分析',
          x: 'center',
          y: '7px',
          textStyle: {
            color: 'rgba(255,255,255,1)',
            fontSize: 16,
          },
          textAlign: 'left',
        },
        xAxis: {
          type: 'category',
          axisTick: { show: false },
          axisLine: {
            //这是x轴文字颜色
            lineStyle: {
              color: 'rgba(255,255,255,0.8)',
            },
          },
          data: dateTong,
        },
        yAxis: {
          name: '单位：(次数)',
          type: 'value',
          splitLine: { show: false },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.8)',
            },
          },
        },
        series: [
          {
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  1,
                  0,
                  0,
                  [
                    {
                      offset: 1,
                      color: '#FF8E4F', // 0% 处的颜色
                    },
                    {
                      offset: 0,
                      color: '#FFD470', // 100% 处的颜色
                    },
                  ],
                  false
                ),
              },
            },
            barWidth: 70,
            data: dataValue,
            type: 'bar',
          },
        ],
      })
    },

    zzalarmLeveljb() {
      var self = this
      var zhudata = this.levelList

      var xData = (function () {
        let count = []
        let data = []
        for (var i = 0; i < zhudata.length; i++) {
          data.push(self.levels(zhudata[i].level))

          count.push(zhudata[i].total)
        }

        return { data, count }
      })()
      let option = {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        grid: {
          top: '14%',
          bottom: '15%',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true,
            },
          },
        },
        xAxis: {
          data: xData.data,
          offset: 12,
          axisLine: {
            show: true,
            lineStyle: {
              // color: '#fff'
            },
          },
          axisLabel: {
            textStyle: {
              color: '#fff',
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: [
          {
            type: 'value',
            name: '单位：(次数)',
            min: 0,

            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#fff',
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#fff',
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#262b35',
              },
            },
          },

          {
            type: 'value',
            gridIndex: 0,
            min: 50,
            max: 100,
            splitNumber: 8,
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)'],
              },
            },
          },
        ],
        series: [
          {
            type: 'bar',
            name: '报警次数',
            barWidth: 40,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: {
                    //数值样式
                    color: '#fff',
                    fontSize: 16,
                  },
                },
                color: function (params) {
                  var colorList = ['#4f9aff', '#b250ff', '#ffa800', 'red']
                  return colorList[params.dataIndex]
                },
              },
            },
            data: xData.count,
          },
        ],
      }
      var zzalarmLeveljb_chart = this.$echarts.init(
        document.getElementById('zzalarmLeveljb_chart')
      )
      zzalarmLeveljb_chart.setOption(option)
    },
  },
}
</script>

<style lang="scss">
.alarmLevel {
  overflow: scroll;
  width: 100%;
  height: 60vh;
}
.alarmLeveljb {
  // width: 50vw;
  height: 50vh;
  display: flex;
  justify-content: center;
  .zzalarmLeveljb_chart {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  .alarmLeveljb_chart {
    flex: 1;
    flex: auto;
    display: flex;
    justify-content: center;
  }
}
.tongji {
  height: 500px;
  width: 100%;
}
</style>
