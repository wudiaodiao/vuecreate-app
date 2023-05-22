<template>
  <div
    :class="['index',$route.name == 'index'&&$store.state.modelMode === '2D'?'index_shouye' : 'index_qita']"
  >
  
    <div class="index_box">
      <div class="index_left" v-show="$route.name == 'index'">
        <indexLeft></indexLeft>
      </div>
      <div class="index_center" @click="cneterClick()">
        <div v-if="$store.state.modelMode === '3D'" class="model3d">
          <threeModel></threeModel>
        </div>
      </div>
      <div class="index_right" v-show="$route.name == 'index'">
        <indexRight></indexRight>
      </div>

      <div
        :class="['index_bottom',meunlength%2==0&&meunlength<'10'?'index_bottom56':'index_bottom50',  faval == false ? 'visibility_hidden' : 'tr']"
      >
        <indexBottom v-on:indexItemShow="getValue" v-on:meunLength="getMeunLength"></indexBottom>
      </div>
    </div>
    <div class="Sub_route">
      
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      faval: true,
      informationShow: false,
      meunlength: ''
    }
  },
  mounted() {
  },
  methods: {
    getMeunLength(data) {
      this.meunlength = data
    },
    getValue(data) {
      this.faval = data
    },
    cneterClick() {
      // alert('我是中间的模型')
      this.informationShow = true
      this.$store.commit('setInformationShow', this.informationShow)
    }
  },
  computed: {},

  destroyed() {}
}
</script>

<style lang="scss" scoped>
.index_shouye {
  background: url(~@/assets/image/index/shouye_bg.jpeg);
  background-size: 100% 100%;

}
.index_qita {
   background: url(~@/assets/image/index/shouye_qita.png);
  background-size: 100% 100%;

}
.index {
  height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position-x: center;
  .index_box {
    user-select: none;
    .index_left {
      height: 87.5vh;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 40px;
      top: 20px;
      border-radius: 7px;
      z-index: 100;
    }
    .index_center {
      float: left;
      height: 100vh;
      width: 100vw;
      // opacity: 0.9;
      // background-color: slategrey;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
      color: skyblue;
      .model3d {
        height: 100%;
        width: 100%;
      }
    }
    .index_right {
      // width: 420px;
      height: 87.5vh;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      right: 40px;
      top: 20px;
      border-radius: 7px;
      z-index: 100;
    }
    .tr {
      transition: 0.5s linear, border 0.3s linear;
    }
    .visibility_hidden {
      background-color: unset !important;
      transition: 0.3s linear, border 0.3s linear;
    }

    .index_bottom56 {
      transform: translateX(-56%);
    }
    .index_bottom50 {
      transform: translateX(-50%);
    }
    .index_bottom {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 37px;
      z-index: 9999;
      // width: 1232px;
      // width: 65vw;
      height: 4.54vh !important;
      background: rgba(0, 0, 0, 0.6);
      // opacity: 0.6;
      border-radius: 12px;
      color: #fff;
    }
  }

  //子路由
  .Sub_route {
    position: absolute;
    z-index: 100;
  }
}
</style>
