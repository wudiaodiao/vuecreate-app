<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2021-01-18 15:11:58
 * @LastEditors: Please set LastEditors
 * @Description:运行监控配置
 * @FilePath: \ibms\src\views\Event\components\MonitorEdit.vue
-->
<template>
<div class='public_body'>
  <div :class="['public_page','MonitorEdit',$store.state.dtab?'index_off':'index_no']">
    <div class="box">
      <a class="iconbutton" href="designer.html?Type=1" target="_blank">
        <i class="el-icon-monitor"></i>
        <br />
        <span>Web版</span>
      </a>
      <a class="iconbutton space" href="designer.html?Type=2" target="_blank">
        <i class="el-icon-mobile"></i>
        <br />
        <span>App版</span>
      </a>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
@import './styles/MonitorEdit.scss';
</style>
