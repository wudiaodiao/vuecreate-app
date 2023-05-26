<!--  -->
<template>
  <div class='right-main4'>
    <div class="main4-left" id="main-right4">

    </div>
    <div class="main4-right">
      <div class="main4-right-top">
        <div class="div">
          <div class="kuai" style="background: #00FF96;"></div> <span>已完成</span>
        </div>
        <span class="weight">{{complete}}</span><soan class="weight" style="color: #00FF96;">{{ completelv }}</soan>
      </div>
      <div class="main4-right-bottom">
         <div class="div">
            <div class="kuai" style="background: #8FEBFF;"></div> <span>未完成</span>
          </div>
          <span class="weight">{{uncomplete }}</span><soan class="weight" style="color: #8FEBFF;">{{ uncompletelv }}</soan>
        </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  name: 'ComponentName',
  //name必须是大驼峰规范,和文件名保持一致
  data() {
    //这里存放数据
    return {
      complete:312,
      uncomplete: 57,
      completelv:'85%',
     uncompletelv:'15%',
     optionrightMain4: {

        title: {//圆环中间显示文本
          text: 178,
          left: "center",
          top: "36%",
          padding: [0, 0],
          textStyle: {//自己的字的样式
            color: "#fff",
            fontSize: 22,
            letterSpacing: "18px",
            align: "center",
          },
          itemGap: 3,
          subtext: "{a|保养总数}",
          subtextStyle: {//数据的样式
            rich: {
              a: {
                color: "#ccc",
                // lineHeight: 40,
                fontSize: 12
              },

            },
          },
        },
        series: [
          {
            hoverAnimation: false,//取消 echart 环形图鼠标放置放大的效果
            type: 'pie',//类型为圆环
            radius: ['70%', '85%'],//圆环大小
            center: ['50%', '50%'],//圆环位置
            avoidLabelOverlap: true,//是否启用防止标签重叠策略 防止标签多了重叠在一起
            label: {//每个环旁边自带的文字叙述
              show: false,

            },
            emphasis: {
              disabled: true,//放上去的高亮及其他动画全部停止
              scale: true,//允许放上去放大
              scaleSize: 10, //移动上去后的放大比例
              focus: 'none',//self移上去后其他消失 series显示同系列的
            },






            data: [
              {
                value: 142,
                name: '已完成',
                itemStyle: { normal: { color: '#00FF96' } }
              },
              {
                value: 36,
                name: '未完成',
                itemStyle: { normal: { color: '#8FEBFF' } },
              },

            ]
          }
        ]
      },
      interval:''
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    initrightMain4() {
      this.$api.MMS.Home.GetMaintainOrderStatistics().then((res) => {
        if(res.ok){
              var rightMain4 = this.$echarts.init(
            document.getElementById('main-right4')
          )
          rightMain4.clear()
          this.complete = res.data.finished,
            this.uncomplete = res.data.notFinished,
            this.completelv = (res.data.finished/res.data.total*100).toFixed(0)+'%',
            this.uncompletelv = (res.data.notFinished / res.data.total * 100).toFixed(0) + '%',
            this.optionrightMain4.title.text = res.data.total
          this.optionrightMain4.series[0].data = [
            {
              value: this.complete,
              name: '已完成',
              itemStyle: { normal: { color: '#00FF96' } }
            },
            {
              value: this.uncomplete,
              name: '未完成',
              itemStyle: { normal: { color: '#8FEBFF' } },
            },

          ]
          rightMain4.setOption(this.optionrightMain4)
          window.addEventListener('resize', () => {
            rightMain3.resize()
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
    this.initrightMain4()
    this.interval=setInterval(() => {
      this.initrightMain4()
    }, 10000);
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeUnmount() {
    clearInterval(this.interval)
  }, //生命周期 - 销毁之前
  unmounted() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  deactivated() {}, //如果页面有keep-alive缓存功能，当组件移除时候，这个函数会触发
}
</script>
<style>
</style>