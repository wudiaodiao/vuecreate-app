<template>
  <div
    id="left_center"
    class="left_center"
  >
<left_main1></left_main1>
   <left_main2></left_main2>
  <left_main3></left_main3>
    <left_main4></left_main4>
 
  </div>
</template>
<script lang="ts">
import left_main1 from '../echarts/left_main1.vue'
import left_main2 from '../echarts/left_main2.vue'
import left_main3 from '../echarts/left_main3.vue'
import left_main4 from '../echarts/left_main4.vue'


export default {
  components: {
    left_main1,
    left_main2,
    left_main3,
    left_main4,
  },
  data() {
    return {
    
      
    }
  },
  mounted: function () {

  },
  methods: {
    
  },
}
</script>
<style lang="scss" scoped>
@import '../index/css/indexLeft.scss';
</style>
