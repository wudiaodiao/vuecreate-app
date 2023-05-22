<!--
 * @Author: your name
 * @Date: 2020-12-10 17:40:48
 * @LastEditTime: 2020-12-17 16:51:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \IBMS\ibms\src\components\Model\ThreeFiles\subView\ModalHome.vue
-->
<template>
  <div class="monitor_center" v-if="show">
    <div class="monitor_center_title">{{title}}</div>
    <div class="monitor_shebei">
      <slot></slot>
    </div>
    <div class="oncel" @click="cancel()"></div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'show',
    event: 'change'
  },
  props: ['title', 'showRecovery', 'show'],
  data() {
    return {}
  },
  methods: {
    cancel: function(val) {
      this.$emit('cancel')
    },
    cancelHandle: function(val) {
      this.$emit('change', false)
    }
  },
  mounted: function() {}
}
</script>

<style lang="scss" scoped>
//中间
.monitor_center {
  text-align: center;
  position: absolute;
  left: 25.1vw;
  top: 8.89vh;
  background: url('../../../../assets/image/index/modal_bg.png');
  background-size: 100% 100%;
  width: 54.64vw;
  height: 70vh;
  z-index: 111;

  .monitor_center_title {
    font-size: 18px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #00f0ff;
    height: 5.2vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .monitor_shebei {
    width: 100%;
    height: 95%;
    transform: scale(0.84, 0.85);

    > img {
      width: 100%;
      height: 95%;
      border-radius: 20px;
    }
  }

  .oncel {
    margin: auto;
    background: url('../../../../assets/image/index/cancel.png');
    background-size: 100% 100%;
    width: 42px;
    height: 42px;
    cursor: pointer;
  }
}
</style>