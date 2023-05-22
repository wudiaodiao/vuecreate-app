<!--
 * @Author: your name
 * @Date: 2022-03-16 17:43:13
 * @LastEditTime: 2022-03-16 18:21:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /IBMSV3_YZJ/IBMS_Web/src/views/Index/components/Iotvisible/Iotvisible.vue
-->
<template>
  <div
    v-if="$store.state.modelMode === '2D' && $route.name == '2d'||$store.state.modelMode === '3D' && $route.name == '3d'"
    @click="IOTVisible = !IOTVisible"
    style="position: absolute; bottom: 100px; right: 0px; z-index: 999"
  >
    <img style="cursor: pointer" src="@/assets/image/index/IOT_Btn.png" />
    <div
      v-show="IOTVisible"
      style="position: absolute; bottom: -24px; left: -90px"
    >
      <img src="@/assets/image/index/IOT_Message.png" />
      <span
        @mouseenter="lightgreen = 1"
        @mouseover="lightgreen = 0"
        :class="lightgreen == 1 ? 'lightgreen' : ''"
        style="
                  cursor: pointer;
                  font-size: 16px;
                  top: 13px;
                  position: absolute;
                  left: 14px;
                "
        @click="runIOT"
        >运行</span
      >
      <span
        @mouseenter="lightgreen = 2"
        @mouseover="lightgreen = 0"
        :class="lightgreen == 2 ? 'lightgreen' : ''"
        style="
                  cursor: pointer;
                  font-size: 16px;
                  top: 51px;
                  position: absolute;
                  left: 14px;
                "
        @click="download"
        >下载</span
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      IOTVisible: false,
      lightgreen: 0
    }
  },
    methods: {
      download() {
        window.open(
          window.ApiBaseURL + 'Template/IOT运维管理平台安装包.exe',
          '_self'
        )
      },
      runIOT() {
        window.open('IOTOM://exe/', '_self')
      }
    }
}
</script>

<style></style>
