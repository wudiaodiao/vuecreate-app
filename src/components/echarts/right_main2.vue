<!--  -->
<template>
  <div class='right-main2'>
    <div class="right-main2-top">
     
    </div>
    <div class="right-main2_center">
      <div class="zong">
        <span>出库</span>
        <p style="color: aqua;">{{ out }}</p>
      </div>
      <div class="chu">
         <span>总物资</span>
          <p >{{ sum }}</p>
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
      sum: 36068,
      out: 576,
    interval:'',
    
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    initRightMain2() {
   
      this.$api.MMS.Home.GetPartStatistics().then((res) => {
        if (res.ok) {
          let result=res.data
          this.sum= result.total
          this.out=result.outDb
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
    this.initRightMain2()
    this.interval = setInterval(() => {
      this.initRightMain2()
    }, 10000);
    // this.initRightMain3()
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