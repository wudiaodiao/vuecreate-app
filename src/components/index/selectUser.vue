<!--
 * @Author: your name
 * @Date: 2020-12-01 20:16:20
 * @LastEditTime: 2021-03-18 15:53:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \IBMS\ibms\src\components\index\selectUser.vue
-->
<template>
  <div class="selectUser">
    <div class="selectUser_main">
      <el-table
        :data="selectUserData.list"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          prop="userAccount"
          label="账号"
        ></el-table-column>
        <el-table-column
          prop="jobNumber"
          label="工号"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="名称"
        ></el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
        >
          <template v-slot="scope">
            <span>{{scope.row.gender?'男':'女'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号码"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="电子邮件"
        ></el-table-column>
        <el-table-column
          prop="departmentName"
          label="部门"
        ></el-table-column>
        <el-table-column
          prop="post"
          label="职位"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="选择"
          width="60px"
        >
          <template v-slot="scope">
            <span
              class="green"
              @click="addTc('Distribute',scope.row)"
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
  },
  data() {
    return {
      selectUserData: {},
      params: {
        account: '',
        jobNumber: '',
        name: '',
        role: '',
        dep: '',
        pageIndex: 1,
        pageSize: 13,
      },
    }
  },
  mounted() {
    this.UserGetList()
  },
  methods: {
    addTc(type, item) {
      this.$emit('addTc', type, item)
    },
    async UserGetList() {
      const res = await this.$api.MMS.User.Get(this.params)
      if (res.ok) {
        this.selectUserData = res.data
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
  }
}
</style>