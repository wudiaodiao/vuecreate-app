<!--
 * @Author: your name
 * @Date: 2021-11-22 15:07:54
 * @LastEditTime: 2022-03-09 15:15:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /ibms_ty/src/components/index/qr-Code.vue
-->
<template>
  <div>
    <vue-qr
      :logoSrc="imageUrl"
      :text="
        `${url}`
      "
      :size="128"
      :margin="20"
    ></vue-qr>
  </div>
</template>
<script>
import vueQr from 'vue-qr'

export default {
  components: {
    vueQr
  },
  props: {
    // code: '',
    url: '',
  },
  data() {
    return {
      imageUrl: require('../../assets/image/index/ERBAO.png')
    }
  }
}
</script>
<style lang="scss"></style>
