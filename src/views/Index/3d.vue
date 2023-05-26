<template>
  <div
    :class="[
      'index',
      authStore.modelMode === '3D' && $route.name == '3d'
        ? 'index_qita'
        : '',
    ]"
  >
    <div class="index_box">
      <!-- <div
        :class="[
          'index_left',
          $store.state.indexItemShow ? 'index_left_l_de' : 'index_left_l',
        ]"
        v-if="$store.state.modelMode === '3D' && $route.name == '3d'"
      >
        <indexLeft></indexLeft>
      </div> -->
      <div  class="index_center" v-if="authStore.modelMode === '3D'">
        <threeModel></threeModel>
      </div>
      <!-- <div
        :class="[
                'index_right',
                $store.state.indexItemShow ? 'index_left_l_de' : 'index_left_l',
              ]"
              v-if="$store.state.modelMode === '3D' && $route.name == '3d'"
            >

        <indexRight></indexRight>
      </div> -->
      <iotvisible />
      <div
        :class="[
          meunlength % 2 == 0 && meunlength < 10
            ? 'index_bottom' + meunlength
            : 'index_bottom50',
          'index_bottom',
        ]"
      >
        <indexBottom
          v-on:indexItemShow="getValue"
          v-on:meunLength="getMeunLength"
        ></indexBottom>
      </div>
    </div>
    <div class="Sub_route">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/index'
const authStore = useAuthStore()
</script>

<script lang="ts">
import iotvisible from './components/Iotvisible/index.vue'

export default {
    components: {
    iotvisible
  },
  data() {
    return {
      faval: true,
      informationShow: false,
      meunlength: 0 as number,
    }
  },
  mounted() {},
  methods: {
    getValue(data: boolean) {
      this.faval = data
    },
    getMeunLength(data: number) {
      this.meunlength = data
    }
  },
}
</script>

<style lang="scss" scoped>
.lightgreen {
  color: lightgreen;
}
.index_shouye {
  background: url(~@/assets/image/login_bg.jpeg);
  background-size: 100% 100%;
}
.index_qita {
  background: url(~@/assets/image/index/indexk_bg@2x.png);
  background-size: 100% 100%;
}
.index {
  height: 100vh;
  width: 100vw;
  // background: url(~@/assets/image/login_bg.jpg) no-repeat;
  // background: url(~@/assets/image/index/indexk_bg@2x.png) no-repeat;
  background-repeat: no-repeat;

  background-position-x: center;
  .index_box {
    user-select: none;
    .index_left_l {
      top: 50%;
      transform: translateY(-50%);
      transition: 1.5s all;
    }
    .index_left_l_de {
      top: 20px;
      transition: 2s all;
    }
    .index_left {
      width: 420px;
      height: 87.5vh;
      // background-image: url(~@/assets/image/index/index_left_right.png);
      // background-size: 100% 100%;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 40px;
      overflow: hidden;
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
      width: 420px;
      height: 87.5vh;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      right: 40px;
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

    .index_bottom8 {
      transform: translateX(-56%) !important;
    }
    .index_bottom6 {
      transform: translateX(-57.8%) !important;
    }
    .index_bottom4 {
      transform: translateX(-61%) !important;
    }

    .index_bottom50 {
      transform: translateX(-50%) !important;
    }
    .index_bottom {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 37px;
      z-index: 9999;
      // width: 1232px;
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
