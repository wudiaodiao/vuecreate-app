
<!--
 * @Author: your name
 * @Date: 2021-03-01 14:51:04
 * @LastEditTime: 2021-03-19 15:37:53
 * @LastEditors: Please set LastEditors
 * @Description: 背景
 * @FilePath: \IBMS\ibms\src\components\index\background.vue
-->

<template>
  <div>
    <!--  -->
    <div :class="['planet',meunLength%2==0&&meunLength<'10'?'planet50':'planet-50']">
      <div class="texture"></div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['meunLength'],
  data() {
    return {}
  },

  watch: {},
  directives: {},
  computed: {},
  mounted() {},

  unmounted() {},
  methods: {}
}
</script>

 <style  scoped>
.planet50 {
  transform: translate(50%, -50%) !important;
}
.planet-50 {
  transform: translate(-50%, -50%);
}
.planet {
  width: 70px;
  height: 70px;
  background: #07132f;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  /* margin-left: -140px;
  margin-top: -140px; */
  transform: translate(-50%, -50%);
  overflow: hidden;
  box-shadow: 0px 0px 55px rgba(20, 100, 255, 0.7);
  border: 1px solid rgba(0, 158, 240, 0.5);
  border-right: none;
  /* -webkit-transform: rotateZ(15deg); */

  /* transform: rotateZ(15deg); */
}
.planet:after {
  content: '';
  width: 90px;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9));
  position: absolute;
  right: 0;
}
.planet:before {
  content: '';
  width: 90px;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(10, 130, 255, 0.6),
    rgba(0, 0, 0, 0)
  );
  position: absolute;
  left: 0;
  z-index: 3;
}
.texture {
  position: absolute;
  left: -360px;
  -webkit-animation: rotation 10s linear infinite;
  animation: rotation 10s linear infinite;
  content: url('./img/earth_copy.jpg');
  height: 70px;
  background-size: cover;
}
@keyframes rotation {
  0% {
    left: -150px;
  }
  100% {
    left: -4px;
  }
}
@-webkit-keyframes rotation {
  0% {
    left: -150px;
  }
  100% {
    left: -4px;
  }
}
</style>
