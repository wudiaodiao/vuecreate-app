<!--  -->
<template>
  <div class='right-main3'>
    <div class="right-main3-top">
      <div>
        <span>今日总数</span>
        <p>{{ day }}</p>
      </div>
      <div>
        <span>本周总数</span>
          <p>{{ week }}</p>
      </div>
      <div>
        <span>本月总数</span>
          <p>{{ month }}</p>
      </div>
    </div>
    <div class="right-main3-bottom">
      <div>
        <div >
          <div class="yuan" style="background:#75A2CC ;"></div>
          未完成
        </div>
        <span>{{ uncomplete }}</span>
      </div>
      <div id="main-right3"></div>
      <div>
        <div >
            <div class="yuan" style="background:#FFCE23;"></div>
            已完成
          </div>
          <span>{{ complete }}</span>
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
      day: 1,
      week: 7,
      month:30,
      uncomplete:36,
      complete:142,
    interval: '',
     optionrightMain3 :{
       
        title: {//圆环中间显示文本
          text: 178,
          left: "center",
          top: "42%",
          padding: [0, 0],
          textStyle: {//自己的字的样式
            color: "#fff",
            fontSize: 22,
            letterSpacing: "18px",
            align: "center",
          },
          itemGap: 2,
          subtext: "{a|本月总数}",
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
            radius: ['75%', '90%'],//圆环大小
            center: ['50%', '55%'],//圆环位置
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
                itemStyle: { normal: { color: '#FFCE23' } }
              },
              {
                value: 36,
                name: '未完成',
                itemStyle: { normal: { color: '#75A2CC' } },
              },

            ]
          }
        ]
      }
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    initMain3() {
       var rightMain3 = this.$echarts.init(
        document.getElementById('main-right3')
      )
      this.$api.MMS.Home.GetPatrolStatistics().then((res)=>{
        if(res.ok){
          let result=res.data
          this.day = result.today
          this.month = result.month
          this.week = result.week
            this.day = result.today
              this.uncomplete = result.notFinished
            this.complete = result.finished
              rightMain3.clear()



          this.optionrightMain3.title.text = this.uncomplete + this.complete
          this.optionrightMain3.series[0].data = [
            {
              value: this.complete,
              name: '已完成',
              itemStyle: { normal: { color: '#FFCE23' } }
            },
            {
              value: this.uncomplete,
              name: '未完成',
              itemStyle: { normal: { color: '#75A2CC' } },
            },

          ]
          rightMain3.setOption(this.optionrightMain3)
        }
      })
    
      window.addEventListener('resize', () => {
        rightMain3.resize()
      })
      // this.$api.MMS.Home.GetDTMonitor().then((res) => {
      //   if (res.ok) {
         
      //   }
      // })

    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initMain3()
     this.interval = setInterval(() => {
      this.initMain3()
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
<style>
</style>