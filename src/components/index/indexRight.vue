<template>
  <div class="right_center_ov">

    <right_main1></right_main1>
    <right_main2></right_main2>
    <right_main3></right_main3>
    <right_main4></right_main4>
  </div>
</template>
<script>
import right_main1 from '../echarts/right_main1'
import right_main2 from '../echarts/right_main2'
import right_main3 from '../echarts/right_main3'
import right_main4 from '../echarts/right_main4'
export default {
  components: {
    right_main1,
    right_main2,
    right_main3,
    right_main4,
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>
<style lang="scss" scoped>
@import './css/indexRight.scss';
</style>
