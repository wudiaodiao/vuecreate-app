<template>
  <div class="right_center_ov">

    <right_main1></right_main1>
    <right_main2></right_main2>
    <right_main3></right_main3>
    <right_main4></right_main4>
  </div>
</template>
<script lang="ts">
import right_main1 from '../echarts/right_main1.vue'
import right_main2 from '../echarts/right_main2.vue'
import right_main3 from '../echarts/right_main3.vue'
import right_main4 from '../echarts/right_main4.vue'
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
