<!--  -->
<template>
  <div
    class='left-main4'
    
  >
  <div class="left_main4_left" id="left-main4">

  </div>
  <div class="left_main4_right">
    <div class="shuju">
      <div class="shuju_left">
        <div class="kuai" style="background:#FD5557 ;" ></div>
        <div class="line"></div>
        <div class="tiao"></div>
      </div>
      <div class="shuju_right">
        <div class="shu" >
          {{ jinji }}
        </div>
        <span>紧急</span>
      </div>
    </div>
   <div class="shuju">
        <div class="shuju_left">
          <div class="kuai" style="background:#FCCD27 ;"></div>
          <div class="line"></div>
          <div class="tiao"></div>
        </div>
        <div class="shuju_right">
          <div class="shu" >
            {{zhongyao}}
          </div>
          <span>重要</span>
        </div>
      </div>
      <div class="shuju">
        <div class="shuju_left">
          <div class="kuai" style="background:#0AF79E ;"></div>
          <div class="line"></div>
          <div class="tiao"></div>
        </div>
        <div class="shuju_right">
          <div class="shu" >
            {{yiban}}
          </div>
          <span>一般</span>
        </div>
      </div>
      <div class="shuju">
        <div class="shuju_left">
          <div class="kuai" style="background:#2993F4 ;"></div>
          <div class="line"></div>
          <div class="tiao"></div>
        </div>
        <div class="shuju_right">
          <div class="shu" >
            {{tishi}}
          </div>
          <span>提示</span>
        </div>
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
     jinji:78,
     zhongyao:397,
     yiban:2469,
     tishi:152,
     option_leftmain4:{
        title: {//圆环中间显示文本
          text: "2678",
          left: "center",
          top: "30%",
          padding: [0, 0],
          textStyle: {//自己的字的样式
            color: "#fff",
            fontSize: 28,
            letterSpacing: "18px",
            align: "center",
          },
          subtext: "{a|工单总数}",
          subtextStyle: {//数据的样式
            rich: {
              a: {
                color: "#FFF",
                lineHeight: 40,
                fontSize: 16,
              },
             
            },
          },
        },
        series: [
          {
            hoverAnimation: false,//取消 echart 环形图鼠标放置放大的效果
            type: 'pie',//类型为圆环
            radius: ['80%', '100%'],//圆环大小
            center: ['50%', '50%'],//圆环位置
            avoidLabelOverlap: true,//是否启用防止标签重叠策略 防止标签多了重叠在一起
          
            emphasis: {
              disabled: false,//放上去的高亮及其他动画全部停止
              scale: false,//允许放上去放大
              scaleSize: 10, //移动上去后的放大比例
              focus: 'none',//self移上去后其他消失 series显示同系列的
            },
            // itemStyle: {//用来让饼图显示间隔
            //   borderWidth: 8, //设置border的宽度有多大
            //   borderColor: 'transprant',
            // },
            label: {//每个环旁边自带的文字叙述
              show: false,
              color: '#fb5477',
             
            },
            data: [
              {
                value: 633,
                itemStyle: { normal: { color: '#FD5557' } }
              },
              {
                value: 5,
               
                itemStyle: { normal: { color: 'rgba(0,0,0,0)' } },
              },
              {
                value: 88,
               
                itemStyle: { normal: { color: '#FCCD27' } },
              },
               {
                value: 5,
             
                itemStyle: { normal: { color: 'rgba(0,0,0,0)' } },
              },
              {
                value: 88,
               
                itemStyle: { normal: { color: '#0AF79E' } },
              },
               {
                value: 5,
                itemStyle: { normal: { color: 'rgba(0,0,0,0)' } },
              },
              {
                value: 88,
              
                itemStyle: { normal: { color: '#2993F4' } },
              },
              {
                value: 5,
               
                itemStyle: { normal: { color: 'rgba(0,0,0,0)' } },
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
    initLeftMain4() {
      this.$api.MMS.Home.GetWorkOrderTypeStatistics().then((res) => {
        if (res.ok) {
         var leftMain4 = this.$echarts.init(
          document.getElementById('left-main4')
        )
        leftMain4.clear()
         this.jinji=res.data.urgent,
            this.zhongyao= res.data.important
              this.yiban= res.data.common
                this.tishi= res.data.tip
                var sum = this.jinji+ this.zhongyao+ this.yiban+ this.tishi
                this.option_leftmain4.title.text=sum
                var shuzhi=0
                if(sum>0){
                  shuzhi= sum/50
                }
      this.option_leftmain4.series[0].data=[{
            value: this.jinji,
            itemStyle: { normal: { color: '#FD5557' } }
          },
          {
            value: shuzhi,

            itemStyle: { normal: { color: 'rgba(0,0,0,0)' } },
          },
          {
            value: this.zhongyao,

            itemStyle: { normal: { color: '#FCCD27' } },
          },
          {
            value: shuzhi,

            itemStyle: { normal: { color: 'rgba(0,0,0,0)' } },
          },
          {
            value:  this.yiban,

            itemStyle: { normal: { color: '#0AF79E' } },
          },
          {
            value: shuzhi,
            itemStyle: { normal: { color: 'rgba(0,0,0,0)' } },
          },
          {
            value: this.tishi,

            itemStyle: { normal: { color: '#2993F4' } },
          },
          {
            value: shuzhi,

            itemStyle: { normal: { color: 'rgba(0,0,0,0)' } },
          },]


        leftMain4.setOption(this.option_leftmain4)
        }
       window.addEventListener('resize', () => {
          leftMain4.resize()
        })
      })
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initLeftMain4()
     this.interval = setInterval(() => {
      this.initLeftMain4()
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
@import '../index/css/indexLeft.scss';
</style>