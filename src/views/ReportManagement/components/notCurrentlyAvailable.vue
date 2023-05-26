<!--
 * @Author: your name
 * @Date: 2020-12-10 14:45:38
 * @LastEditTime: 2021-03-18 16:09:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \IBMS\ibms\src\views\ReportManagement\components\notCurrentlyAvailable.vue
-->
<template>
  <div class="notCurrentlyAvailable">
    <p>二、当前不可用设备列表</p>
    <div class="WorkOrder_list">
      <el-table
        :data="notCurrentlyAvailable"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="areaName" label="地点"></el-table-column>
        <el-table-column prop="typeName" label="类别"></el-table-column>
        <el-table-column prop="model" label="型号"></el-table-column>
        <el-table-column prop="manufactor" label="厂商"></el-table-column>
        <el-table-column prop="state" label="状态">
          <template v-slot="scope">
            <span>{{
              $Convert.Equipment.getEquipmentState(scope.row.state)
            }}</span>
          </template></el-table-column
        >
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  props: ['notCurrentlyAvailable'],
  data() {
    return {}
  },
  mounted() {},
  methods: {
    tableRowClassName({ row, rowIndex }) {
      //list背景色
      if (rowIndex % 2 == 1) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
      return ''
    }
  }
}
</script>
<style lang="scss" scoped>
.notCurrentlyAvailable {
  margin: 0 20px;
}
</style>