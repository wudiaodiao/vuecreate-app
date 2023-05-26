<!--
 * @Author: your name
 * @Date: 2020-12-03 19:22:13
 * @LastEditTime: 2021-11-17 16:29:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \IBMS\ibms\src\views\WorkOrder\components\editEquipment.vue
-->
<template>
  <div class="editEquipment">
    <div
      class="editEquipment_top"
      v-if="MaintenanceType!='planEquipment'"
    >
      <div class="editEquipment_top_right">
        <span @click="addTc('selectEquipmentEd',editEquipmentNo)">添加</span>
      </div>
    </div>
    <div class="editEquipment_center">
      <div class="MaintainPlan_main_list">
        <el-table
          :data="editEquipmentData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
        <el-table-column
            prop="code"
            label="编码"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="名称"
          ></el-table-column>
          
          <el-table-column
            prop="typeName"
            label="类别"
          ></el-table-column>
          <el-table-column
            prop="areaName"
            label="地点"
          ></el-table-column>

          <!-- <el-table-column
            prop="model"
            label="型号"
            width="60px"
          ></el-table-column>
          <el-table-column
            prop="manufactor"
            label="厂商"
            width="60px"
          ></el-table-column> -->
          <el-table-column
            prop="state"
            label="状态"
            width="100px"
          >
         <template v-slot="scope">
              <span >{{ scope.row.state==1?'正常':'维保中' }}</span>
            </template>
        </el-table-column>
          <el-table-column
            label="查看"
            width="60px"
            v-if="MaintenanceType=='planEquipment'"
          >
            <template v-slot="scope">
              <span @click="addTc('chakan',scope.row.no)">查看</span>
            </template>
          </el-table-column>
          <el-table-column
            label="删除"
            width="60px"
            v-else
          >
            <template v-slot="scope">
              <el-popconfirm
                title="确定删除吗"
                @onConfirm="MaintainPlanRemoveEquipment(scope.row.no,scope.row.id)"
                @confirm="MaintainPlanRemoveEquipment(scope.row.no,scope.row.id)"
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
    editEquipmentNo: '',
    MaintenanceType: '',
  },
  data() {
    return {
      editEquipmentData: [],
    }
  },
  mounted() {
    this.MaintainPlanGetEquipmentList()
  },
  computed: {},
  watch: {},
  methods: {
    addTc(type, item) {
      this.$emit('addTc', type, item)
    },
    async MaintainPlanRemoveEquipment(no, id) {
      const res = await this.$api.MMS.MaintainPlan.RemoveEquipment({
        planNo: this.editEquipmentNo, //计划id
        equipmentNo: no, //设备id
      })
      if (res.ok) {
        this.MaintainPlanGetEquipmentList()

        this.$Tools.LayerMsgInfo('成功')
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    async MaintainPlanGetEquipmentList() {
      const res = await this.$api.MMS.MaintainPlan.GetEquipmentList({
        no: this.editEquipmentNo,
      })
      if (res.ok) {
        this.editEquipmentData = res.data
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
