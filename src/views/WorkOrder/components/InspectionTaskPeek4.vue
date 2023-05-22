<!--
 * @Author: your name
 * @Date: 2020-12-07 16:30:03
 * @LastEditTime: 2021-11-17 16:29:13
 * @LastEditors: Please set LastEditors
 * @Description: 查看巡检项
 * @FilePath: \IBMS\ibms\src\views\WorkOrder\components\InspectionTaskPeek.vue
-->
<template>
  <div class="editEquipment">
    <div class="editEquipment_center">
      <div class="MaintainPlan_main_list">
        <el-table
          :data="chakanList"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            prop="itemName"
            label="巡检项"
          ></el-table-column>
          <el-table-column
            prop="value"
            label="结果"
          ></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    InspectionTaskNo: '',
  },
  data() {
    return {
      
      chakanList: [],
    
      
    }
  },
  mounted() {
    // console.log(this.chakanList);
    // this.InspectionTaskPeek()
  },
  computed: {},
  watch: {
    InspectionTaskNo(newVal, old) {
    console.log(123,newVal);

      this.chakanList = newVal.no
      // this.InspectionTaskPeek()
    },

    immediate: true,
    deep: true,
  },
  methods: {
   
   

    tableRowClassName({ row, rowIndex }) {
      //list背景色
      if (rowIndex % 2 == 1) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
      return ''
    },
  },
}
</script>
<style lang="scss" scoped>
.editEquipment {
  margin: 0 40px;
  .editEquipment_top {
    height: 3vh;

    .editEquipment_top_right {
      float: right;
      > span {
        display: inline-block;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #ffffff;
        width: 40px;
        height: 26px;
        text-align: center;
        line-height: 26px;
        background: #007edd;
        border-radius: 2px;
      }
    }
  }
  .editEquipment_center {
    .red {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: #ff3c00;
      cursor: pointer;
    }
  }
}
</style>
