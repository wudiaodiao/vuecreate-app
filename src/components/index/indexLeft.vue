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
<script>
import left_main1 from '../echarts/left_main1'
import left_main2 from '../echarts/left_main2'
import left_main3 from '../echarts/left_main3'
import left_main4 from '../echarts/left_main4'

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
