<!--  -->
<template>

  <div class="left-main1">
    <div class="left-main1-top"></div>
    <div class="left-main1-bottom">
      <div class="left-main1-bottom-left">
        <p>{{week}}</p>
        <h6>本周总数</h6>
      </div>
      <div
        class="left-main1-bottom-center"
        id="left-main1"
      >
        <p>{{day}}</p>
        <h6>今日工单数</h6>
      </div>
      <div class="left-main1-bottom-right">
        <p>{{month}}</p>
        <h6>本月总数</h6>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  name: 'ComponentName',
  data() {
    //这里存放数据
    return {
      week: 39,
      day: 26,
      month: 146,
     interval:''
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    initLeftMain1() {
      this.$api.MMS.Home.GetWorkOrderStatistics().then((res) => {
        if (res.ok) {
          this.day = res.data.today
          this.week = res.data.week
          this.month = res.data.month
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
    this.initLeftMain1()
     this.interval = setInterval(() => {
      this.initLeftMain1()
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