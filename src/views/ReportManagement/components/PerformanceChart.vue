<!--
 * @Author: your name
 * @Date: 2020-12-14 18:04:50
 * @LastEditTime: 2021-11-18 17:08:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \IBMS\ibms\src\views\ReportManagement\components\RepairTimelinessCharts.vue
-->
<template>
  <div>
    <div class="alarmLevelqus">
      <h3 class="margin_h3">一. 人员绩效比较</h3>
      <div class="alarmLevelqus_chart" id="alarmLevelqus_chart"></div>
      <div class="alarmLevelqus_table">
        <!-- <div class="xiaojifen">绩效分（满分100分）</div> -->
        <p class="p_margin">
          分析说明：绩效得分最高的是{{ listMax.userName }}分数为{{
            listMax.totalScores
          }}分；绩效得分最低的是{{ listMin.userName }} 分数为{{
            listMin.totalScores
          }}分。
        </p>
      </div>
      <h3 class="margin_t">二. 人员绩效明细</h3>
      <div class="alarmLevelqus_table">
        <el-table
          :data="ReportPerformanceData.list"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column prop="userName" label="姓名"></el-table-column>
          <el-table-column prop="checkScores" label="考勤"></el-table-column>
          <el-table-column
            prop="workOrderCountScores"
            label="工单数"
          ></el-table-column>
          <el-table-column
            prop="workOrderTimelinessScores"
            label="工单及时率"
          ></el-table-column>
          <el-table-column prop="totalScores" label="得分"></el-table-column>
        </el-table>
        <p>绩效计算说明：绩效=考勤绩效+工单处理数量绩效+工单处理及时率绩效</p>
        <p>1. 考勤占绩效30分</p>
        <p>a. 迟到或早退10分钟以下，扣2分/次</p>
        <p>b. 迟到或早退10分钟-30分钟，扣3分/次</p>
        <p>c. 迟到或早退30分钟-60分钟，扣5分/次</p>
        <p>d. 迟到或早退60分钟以上/未打卡，扣10分/次</p>
        <p>2. 工单处理单数占40分</p>
        <p>a. 最多单数为40分</p>
        <p>b. 其他单数得分=40*单数/最多单数</p>
        <p>3. 工单处理及时率占30分</p>
        <p>a. 平均用时最少的为30分</p>
        <p>b. 其他用时得分=30*最少时长/时长</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['ReportPerformanceData'],
  data() {
    return {
      listMax: {
        userName: '',
        totalScores: 0
      }, //最高分
      listMin: {
        userName: '',
        totalScores: 0
      } //最低分
    }
  },
  mounted() {
    this.PerformanceChart() //报警趋势
  },
  computed: {},
  watch: {
    ReportPerformanceData() {
      //数据一传递触发更新函数
      return this.PerformanceChart()
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      //list背景色
      if (rowIndex % 2 == 1) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
      return ''
    },
    PerformanceChart() {
      //获取最高效绩分
      let maxUserName = ''
      let maxTotalScores = ''
      for (let k in this.ReportPerformanceData.listMax) {
        maxUserName += this.ReportPerformanceData.listMax[k].userName + ','
        maxTotalScores = this.ReportPerformanceData.listMax[k].totalScores
      }
      this.listMax = {
        userName: maxUserName,
        totalScores: maxTotalScores
      }
      //最低
      let minUserName = ''
      let minTotalScores = ''
      for (let s in this.ReportPerformanceData.listMin) {
        minUserName += this.ReportPerformanceData.listMin[s].userName + ','
        minTotalScores = this.ReportPerformanceData.listMin[s].totalScores
      }
      this.listMin = {
        userName: minUserName,
        totalScores: minTotalScores
      }

      var xData = []
      var line = []
      var attr = {
        name: '效绩分'
      }
      for (let i in this.ReportPerformanceData.list) {
        xData.push(this.ReportPerformanceData.list[i].userName)
        line.push(this.ReportPerformanceData.list[i].totalScores)
      }

      var colors = []
      let option = {
        backgroundColor: 'rgba(0,0,0,0)',
        tooltip: {
          trigger: 'item',
          padding: 1,
          formatter: function(param) {
            var resultTooltip =
              "<div style='background:rgba(13,5,30,.1);border:1px solid rgba(255,255,255,.2);padding:5px;border-radius:3px;'>" +
              "<div style='text-align:center;'>" +
              param.name +
              '</div>' +
              "<div style='padding-top:5px;'>" +
              "<span style=''> " +
              attr.name +
              ': </span>' +
              "<span style=''>" +
              param.value +
              '</span><span>'
            return resultTooltip
          }
        },
        title: {
          text: '人员绩效比较',
          left: 'center',
          top: -2,
          bottom: 0,
          textStyle: {
            color: 'rgba(255, 255, 255, 0.8)'
          }
        },

        grid: {
          left: '5%',
          top: '15%',
          right: '5%',
          bottom: '12%'
        },
        legend: {
          show: true,
          icon: 'circle',
          orient: 'horizontal',
          top: '90.5%',
          right: 'center',
          itemWidth: 16.5,
          itemHeight: 6,
          // itemGap: 30,
          textStyle: {
            // color: '#FFFFFF'
            color: '#C9C8CD',
            fontSize: 14
          }
        },
        xAxis: [
          {
            data: xData,
            axisLabel: {
              textStyle: {
                color: '#aaaaaa',
                fontSize: 14
              },

              margin: 15 //刻度标签与轴线之间的距离。
            },

            axisLine: {
              // show: false, //不显示x轴
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)',
                width: 1 //这里是为了突出显示加上的
              }
            },
            axisTick: {
              show: true, //不显示刻度
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)',
                width: 1 //这里是为了突出显示加上的
              }
            },
            boundaryGap: true,
            splitLine: {
              show: false,
              width: 0.08,
              lineStyle: {
                type: 'solid',
                color: '#03202E'
              }
            }
          }
        ],
        yAxis: [
          {
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)',
                type: 'solid'
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)',
                width: 1 //这里是为了突出显示加上的
              }
            },
            axisLine: {
              // show: false
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)',
                width: 1 //这里是为了突出显示加上的
              }
            },
            axisLabel: {
              textStyle: {
                color: '#888'
              }
            }
          }
        ],
        graphic: [
          {
            type: 'text',
            z: 100,
            left: 'center',
            bottom: '0%',

            style: {
              margin: 50,
              fill: 'rgba(255, 255, 255, 0.8)',
              text: '绩效分（满分100分）',
              // text: [
              //     '横轴表示温度，单位是°C',
              //     '纵轴表示高度，单位是km',
              //     '右上角有一个图片做的水印',
              //     '这个文本块可以放在图中各',
              //     '种位置'
              // ].join('\n'),
              font: '14px Microsoft YaHei'
            }
          }
        ],
        series: [
          {
            //柱底圆片
            name: '',
            type: 'pictorialBar',
            symbolSize: [40, 22], //调整截面形状
            symbolOffset: [0, 10],
            z: 12,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(89,211,255,1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(23,237,194,1)'
                  }
                ])
              }
            },

            data: line
          },

          //柱体
          {
            name: '',
            type: 'bar',
            barWidth: 40,
            barGap: '0%',
            itemStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  type: 'linear',
                  global: false,
                  colorStops: [
                    {
                      //第一节下面
                      offset: 0,
                      color: 'rgba(0,255,245,0.5)'
                    },
                    {
                      offset: 1,
                      color: '#43bafe'
                    }
                  ]
                }
              }
            },

            data: line
          },

          //柱顶圆片
          {
            name: '',
            type: 'pictorialBar',
            symbolSize: [40, 22], //调整截面形状
            symbolOffset: [0, -10],
            z: 12,
            symbolPosition: 'end',
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(89,211,255,1)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(23,237,194,1)'
                    }
                  ],
                  false
                )
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
            },
            data: line
          }
        ]
      }

      var alarmLevelqus_chart = this.$echarts.init(
        document.getElementById('alarmLevelqus_chart')
      )
      alarmLevelqus_chart.setOption(option)
    }
  }
}
</script>

<style lang="scss">
.alarmLevelqus {
  opacity: 1;
  margin-bottom: 30px;
  .alarmLevelqus_chart {
    width: 70vw;
    height: 44vh;
  }
  .alarmLevelqus_table {
    margin: 0px 40px;
    .p_margin {
      margin-top: 10px;
    }
    .xiaojifen {
      text-align: center;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: #ffffff;
      margin-bottom: 12px;
    }
  }
  .margin_h3 {
    margin-top: 20px;
  }
  .margin_t {
    margin-top: 40px;
  }
}
</style>
