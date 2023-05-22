<!--
 * @Author: your name
 * @Date: 2020-11-07 13:28:34
 * @LastEditTime: 2020-11-10 19:02:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \IBMS\ibms\src\views\Assistance\components\ShiftCheck.vue
-->
<template>
  <div class="craftingassistance">
    <attendanceStatistics></attendanceStatistics>
  </div>
</template>
<script>
//导入考勤统计
import attendanceStatistics from '@/views/Assistance/components/attendanceStatistics.vue'
export default {
  components: {
    attendanceStatistics
  },
  data() {
    return {}
  },

  created() {},
  mounted() {},
  destroyed() {},
  computed: {},
  methods: {}
}
</script>
<style  lang="scss" scoped>
</style>
