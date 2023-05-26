<!--
 * @Author: your name
 * @Date: 2020-12-05 15:03:31
 * @LastEditTime: 2021-11-17 16:29:20
 * @LastEditors: Please set LastEditors
 * @Description: //巡检计划
 * @FilePath: \IBMS\ibms\src\views\WorkOrder\components\editTime.vue
-->
<template>
  <div class="editEquipment">
    <div class="editEquipment_top">
      <div class="editEquipment_top_right">
        <span @click="addTc('editTime_add')">添加</span>
      </div>
    </div>
    <div class="editEquipment_center">
      <div class="MaintainPlan_main_list">
        <el-table
          :data="InspectionPlanGetTimeListData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            prop="name"
            label="时间段"
          >
            <template v-slot="scope">
              <span slot="reference">{{scope.row.beginTime+'-'+scope.row.endTime}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="删除"
            width="60px"
          >
            <template v-slot="scope">
              <el-popconfirm
                title="确定删除吗"
                @onConfirm="InspectionPlanRemoveTime(scope.row.no)"
                 @confirm="InspectionPlanRemoveTime(scope.row.no)"
              >
                <span
                  class="red"
                  slot="reference"
                >删除</span>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    InspectionPlan: '',
  },
  data() {
    return {
      InspectionPlanGetTimeListData: [],
    }
  },
  mounted() {
    this.InspectionPlanGetTimeList()
  },
  computed: {},
  watch: {},
  methods: {
    addTc(type, item) {
      this.$emit('addTc', type, item)
    },
    async InspectionPlanRemoveTime(no) {
      const res = await this.$api.MMS.InspectionPlan.RemoveTime({ no: no })
      if (res.ok) {
        this.InspectionPlanGetTimeList()

        this.$Tools.LayerMsgInfo('成功')
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    async InspectionPlanGetTimeList() {
      const res = await this.$api.MMS.InspectionPlan.GetTimeList({
        no: this.InspectionPlan,
      })
      if (res.ok) {
        this.InspectionPlanGetTimeListData = res.data
      }
    },

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

