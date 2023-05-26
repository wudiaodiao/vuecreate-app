<!--
 * @Author: your name
 * @Date: 2021-09-17 18:06:51
 * @LastEditTime: 2021-12-03 19:05:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ibms_ty/src/components/index/userFormDep.vue
-->
<template>
  <div class="selectUser">
    <div class="selectUser_main">
      <el-table
        :data="selectUserData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <!-- <el-table-column
          prop="userAccount"
          label="账号"
        ></el-table-column> -->
        <!-- <el-table-column
          prop="jobNumber"
          label="工号"
        ></el-table-column> -->
        <el-table-column
          prop="name"
          label="名称"
          width="250"
        ></el-table-column>
        <el-table-column
          prop="sdSex"
          label="性别"
          width="50"
        >
          <template v-slot="scope">
            <span>{{scope.row.sdSex?'男':'女'}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="mobile"
          label="手机号码"
        ></el-table-column> -->
        <!-- <el-table-column
          prop="email"
          label="电子邮件"
        ></el-table-column> -->
        <el-table-column
          prop="departmentName"
          label="部门"
        ></el-table-column>
        <!-- <el-table-column
          prop="post"
          label="职位"
          width="80px"
        ></el-table-column> -->
        <el-table-column
          label="选择"
          width="60px"
        >
          <template v-slot="scope">
            <span
              class="green"
              @click="addTc(type,scope.row)"
            >选择</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    eqUserId: '',
    type: '',
  },
  data() {
    return {
      selectUserData: [],
    }
  },
  mounted() {
    this.GetListByDepartmentAndPrivilege()
  },
  methods: {
    addTc(type, item) {
      this.$emit('addTc', type, item)
    },

    async GetListByDepartmentAndPrivilege() {
      const res = await this.$api.MMS.User.GetListByDepartmentAndPrivilege({
        departmentId: this.eqUserId,
        privilegeKey: 'DealWorkOrder',
      })
      if (res.ok) {
        this.selectUserData = res.data
        console.log(this.selectUserData);
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
.selectUser {
  .selectUser_main {
    margin: 5px 24px;
    .green {
      cursor: pointer;
    }
  }
}
</style>
