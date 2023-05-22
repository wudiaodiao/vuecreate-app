<!--  -->
<template>
  <div class="left-main2">
    <div class="left-main2-top"></div>
    <div class="left-main2-bottom">
      <div class="left-main2-bottom_top">
        <div class="state_left">
          <div class="state_left_top">
            <span class="wancheng">32</span><span class="weiwancheng">58</span>
          </div>
          <div class="state_left_center">
            <div class="blli">
              <div class="bili_left"></div>
              <div class="bili_right"></div>
              <div class="sanjiao"></div>
            </div>
          </div>
          <div class="state_left_bottom">
            <div class="kuai">
              <div class="wanchengkuai">

              </div>
              已完成
            </div>
            <div class="kuai">
              未完成 <div class="weiwanchengkuai">

              </div>
            </div>
          </div>
        </div>
        <div class="state_right">
          <div class="state_right_top wanchenglv">
            41.5%
          </div>
          <div class="state_right_bottom">
            完成率
          </div>
        </div>
      </div>
      <div class="left-main2-bottom_bottom">
        <div class="state_left">
            <div class="state_left_top">
              <span class="zhunshi">50</span><span class="chaoshi">9</span>
            </div>
            <div class="state_left_center">
              <div class="blli">
                <div class="bili_left2" style="background: #03D5F8;"></div>
                <div class="bili_right" style="background: #FE898B;"></div>
                <div class="sanjiao sanjiao2"></div>
              </div>
            </div>
            <div class="state_left_bottom">
              <div class="kuai">
                <div class="zhunshikuai">

                </div>
                准时
              </div>
              <div class="kuai">
                超时 <div class="chaoshikuai">

                </div>
              </div>
            </div>
          </div>
          <div class="state_right">
            <div class="state_right_top zhunshilv" style="color: #03D5F8;">
              41.5%
            </div>
            <div class="state_right_bottom">
              准时率
            </div>
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
      equipmentOk: 650,
      equipmentNotOk: 100,
      interval:'',
      leftMain2: {
        series: [
          {
            hoverAnimation: false,
            itemStyle: {
              borderWidth: 2, //设置border的宽度有多大
              borderColor: '#29383E',
            },
            type: 'pie',
            radius: ['50%', '60%'],
            center: ['50%', '44%'],
            avoidLabelOverlap: false,
            label: {
              position: 'center',
              show: true,
              formatter: () => {
                return `750` + '\n' + '设备总数'
              },
              color: 'white',
              lineHeight: 16,
              fontSize: 14,
            },
            labelLine: {
              show: false,
            },
            color: ['#DCFF3B', '#3BFFC5'],
            data: [100, 650],
          },
          {
            itemStyle: {
              borderWidth: 2, //设置border的宽度有多大
              borderColor: '#29383E',
            },
            hoverAnimation: false,

            type: 'pie',
            radius: ['60%', '82%'],
            center: ['50%', '44%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            labelLine: {
              show: false,
            },

            data: [
              {
                value: 100,
                itemStyle: { normal: { color: 'rgba(220,255,59,0.6)' } },
              },
              {
                value: 650,
                itemStyle: { normal: { color: 'rgba(62,241,189,0.6)' } },
              },
            ],
          },
        ],
      },
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    initLeftMain2() {
      this.$api.MMS.Home.GetWorkOrderStateStatistics().then((res)=>{
        let result=res.data
        $('.wancheng').text(result.finished)
        $('.weiwancheng').text(result.notFinished)
        let wanchenglv= (result.finished + result.notFinished)==0?'0%':(result.finished/ (result.finished+ result.notFinished)*100).toFixed(0)+'%'
         $('.sanjiao').css('left', wanchenglv)
        $('.bili_left').css('width', wanchenglv)
         $('.wanchenglv').text(wanchenglv)
           $('.zhunshi').text(result.onTime)
        $('.chaoshi').text(result.overtime)
        let zhunshilv = (result.onTime + result.overtime) == 0 ? '0%' : (result.onTime / (result.onTime + result.overtime) * 100).toFixed(0) + '%'
         $('.sanjiao2').css('left', zhunshilv)
        $('.bili_left2').css('width', zhunshilv)



        $('.zhunshilv').text(zhunshilv)
      })
   
     
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    
    this.initLeftMain2()
     this.interval = setInterval(() => {
      this.initLeftMain2()
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