<!--  -->
<template>
  <div class='right-main1'>
    <div class="right-main1-top">
      
    </div>
    <div class="right-main1-center">
      <div class="right-main1-center-left">
        <div class="rm1_top">{{normal}}</div>
        <div class="mr1_bottom">正常</div>
      </div>
      <div class="right-main1-center-center" id="right-main1">

      </div>
      <div class="right-main1-center-right">
          <div class="rm1_top">{{sum}}</div>
          <div class="mr1_bottom">设备总数</div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import * as echarts from 'echarts'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  name: 'ComponentName',
  //name必须是大驼峰规范,和文件名保持一致
  data() {
    //这里存放数据
    return {
      normal: 650,
      sum: 750,
      
      optionrightMain1: {
       title: {
         
          text: '88%',
          textStyle: {
            color: '#fff',
            fontSize: 22
          },
         
          itemGap: -10, // 主副标题距离
          left: 'center',
          top: 'center'
        },
        angleAxis: {
          max: 100, // 满分
          clockwise: false, // 逆时针
          // 隐藏刻度线
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        radiusAxis: {
          type: 'category',
          // 隐藏刻度线
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        polar: {
          center: ['50%', '50%'],
          radius: '150%' //图形大小
        },
        
        series: [{
          type: 'bar',
          data: [{
            name: '作文得分',
            value: 88,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                  offset: 0,
                  color: 'RGBa(111,96,100,0.1)'
                }, {
                  offset: 1,
                  color: '#F1C4A6'
                }])
              }
            },
          },
        ],
          coordinateSystem: 'polar',
          roundCap: true,
          barWidth: 10,
          // barGap: '-100%', // 两环重叠
          z: 2,
        },
       { // 灰色环
          type: 'bar',
          data: [{
            value: 0.5,
            itemStyle: {
              color: '#fff',
             
            }
          }],
          coordinateSystem: 'polar',
          roundCap: true,
          barWidth: 10,
          barGap: '-100%', // 两环重叠
          z: 1
        }
      ]
      },
      interval:'',
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    initRightMain1() {
           this.$api.MMS.Home.GetEquipmentAvailability().then((res) => {
        if (res.ok) {
          this.sum = res.data.total
          this.normal = res.data.normal
           var rightMain1 = this.$echarts.init(
            document.getElementById('right-main1')
          )
          rightMain1.clear()
          // this.normal=''
          // this.sum=''
          let abc= (this.normal / this.sum * 100).toFixed(0)
           this.optionrightMain1.title.text =abc + '%'
          this.optionrightMain1.series[0].data[0].value = abc
          rightMain1.setOption(this.optionrightMain1)
          window.addEventListener('resize', () => {
            rightMain1.resize()
          })
        }
      })
    
    
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initRightMain1()
     this.interval = setInterval(() => {
      this.initRightMain1()
    }, 10000);
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {
      clearInterval(this.interval)
  }, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  deactivated() {}, //如果页面有keep-alive缓存功能，当组件移除时候，这个函数会触发
}
</script>
<style lang="scss">
@import '../index/css/indexRight.scss';
</style>