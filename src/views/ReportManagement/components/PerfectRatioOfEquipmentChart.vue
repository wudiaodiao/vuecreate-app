<!--
 * @Author: your name
 * @Date: 2020-12-10 10:24:36
 * @LastEditTime: 2021-01-12 17:04:16
 * @LastEditors: Please set LastEditors
 * @Description: 设备完好率与可用率
 * @FilePath: \IBMS\ibms\src\views\ReportManagement\components\PerfectRatioOfEquipmentChart.vue
-->
<template>
  <div class="PerfectRatioOfEquipmentChart">
    <div class="EquipmentAvailability">
      <div class="alarmLevelqus">
        <p>一、当前{{deviceType}}</p>
        <div class="alarmLevelqus_chart" id="alarmLevelqus_chart"></div>
      </div>
      <div class="font_center">
        分析说明：
        <br />
        1. {{deviceType=='设备完好率'?' 设备完好率=完好设备总台数/生产设备总台数。':' 设备可用率=可用设备总台数/生产设备总台数。'}}生产设备总台数应包括医院在用的、备用的、停用的以及正在检修的全部生产设备，也包括尚未安装，使用以及由基建部门或物资部门代管的设备，考核设备时必须按完好标准逐台衡量，不能采取抽查推算的办法。{{deviceType}}一般考核主要生产设备。
        <br />
        2.当前设备类别的{{deviceType}}为{{(ReportPerfectRatioOfEquipmentData.availability*100)+'%'}}、{{(ReportPerfectRatioOfEquipmentData.availability*100)>90?'高':'低'}}于标准{{deviceType}}90%。
        <template
          v-if="(ReportPerfectRatioOfEquipmentData.availability*100)<90"
        >请设备部抓紧设备故障排除和设备保养维护工作！</template>
        <template
          v-if="(ReportPerfectRatioOfEquipmentData.availability*100)<90&&deviceType=='设备可用率'"
        >或者申请采购增加库存！</template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['ReportPerfectRatioOfEquipmentData', 'deviceType'],
  data() {
    return {}
  },
  mounted() {
    this.PerfectRatioOfEquipmentChart() //报警趋势
  },
  computed: {
    returnEquipmentData: function() {
      return function(type) {
        //计算属性传参
        //根据不同的类型返回不同的值
        switch (parseInt(type)) {
          case 0:
            return '使用中，'
            break
          case 1:
            return '维修中，'
            break
          case 2:
            return '保养中，'
            break
          case 3:
            return '库存，'
            break
            break
          default:
            return '未知'
        }
      }
    }
  },
  watch: {
    ReportPerfectRatioOfEquipmentData() {
      //数据一传递触发更新函数
      return this.PerfectRatioOfEquipmentChart()
    }
  },
  methods: {
    PerfectRatioOfEquipmentChart() {
      let arrdata = []
      for (let i in this.ReportPerfectRatioOfEquipmentData.arr) {
        //插入图表数据
        let obj = {}
        obj.name =
          this.returnEquipmentData(i) +
          this.ReportPerfectRatioOfEquipmentData.arr[i] +
          '台'
        obj.value = this.ReportPerfectRatioOfEquipmentData.arr[i]
        arrdata.push(obj)
      }

      var option = {
        backgroundColor: 'rgba(0,0,0,0)',

        title: {
          text: this.deviceType,
          left: 'center',
          bottom: 10,
          textStyle: {
            color: '#ccc'
          }
        },

        tooltip: {
          trigger: 'item'
          //   formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: [
          new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#9D4DF7' },
            { offset: 0.5, color: '#9D4DF7' },
            { offset: 1, color: '#6323EC' }
          ]),
          new this.$echarts.graphic.LinearGradient(
            0,
            0,
            0,
            0.4,
            [
              { offset: 0, color: '#1FC1D8' },
              { offset: 0.5, color: '#1FC1D8' },
              { offset: 1, color: '#1FC1D8' }
            ] //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
          ),
          new this.$echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              { offset: 0, color: '#377DFF' },
              { offset: 0.5, color: '#377DFF' },
              { offset: 1, color: '#112CE2' }
            ] //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
          ),
          new this.$echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              { offset: 0, color: '#377DFF' },
              { offset: 0.5, color: '#377DFF' },
              { offset: 1, color: '#112CE2' }
            ] //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
          )
        ],

        series: [
          {
            name: '设备',
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],

            data: arrdata.sort(function(a, b) {
              return a.value - b.value
            }),
            // roseType: 'radius',
            label: {
              color: '#FFFFFF',
              formatter: ' {b} :  ({d}%)'
            },
            labelLine: {
              lineStyle: {
                color: '#FFFFFF'
              },
              smooth: 0.2,
              length: 25,
              length2: 15
            },
            itemStyle: {
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function(idx) {
              return Math.random() * 200
            }
          },
          {
            name: '',
            avoidLabelOverlap: true,
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            data: arrdata.sort(function(a, b) {
              return a.value - b.value
            }),
            // roseType: 'radius',
            label: {
              position: 'inner',
              color: '#FFFFFF',
              // formatter: '{d}%'
              formatter: ''
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.9)'
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function(idx) {
              return Math.random() * 200
            }
          }
        ]
      }

      var PerfectRatioOfEquipmentChart_Chart = this.$echarts.init(
        document.getElementById('alarmLevelqus_chart')
      )
      PerfectRatioOfEquipmentChart_Chart.setOption(option, true)
    }
  }
}
</script>

<style lang="scss">
.PerfectRatioOfEquipmentChart {
  margin: 0 20px;

  .EquipmentAvailability {
    display: flex;

    .alarmLevelqus {
      flex: 1;
      margin-top: 4px;
      .alarmLevelqus_chart {
        width: 100%;
        height: 40vh;
      }
    }
    .font_center {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
