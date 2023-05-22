<!--
 * @Author: your name
 * @Date: 2020-11-09 11:31:29
 * @LastEditTime: 2021-10-14 16:51:47
 * @LastEditors: Please set LastEditors
 * @Description: 访客记录查询
 * @FilePath: \IBMS\ibms\src\views\Assistance\components\Visit\Visitor.vue
-->
<template>
  <div class="page">
    <table class="filtertable">
      <tr>
        <td class="title4">访客单位：</td>
        <td class="content">
          <el-input v-model="company" />
        </td>
        <td class="title4">访客姓名：</td>
        <td class="content">
          <el-input v-model="name" />
        </td>
        <td class="title4">访客手机：</td>
        <td class="content">
          <el-input v-model="mobile" />
        </td>
        <td>
          <a href="javascript:void(0)" class="button" @click="onQueryClick()"
            >查询</a
          >
        </td>
      </tr>
    </table>

    <el-table :data="pagedData.list" :row-class-name="onRowClassName">
      <el-table-column label="预约时间" width="300px">
        <template slot-scope="scope">
          {{ DateTime.parse(scope.row.beginTime).format('yyyy-MM-dd hh:mm') }}
        </template>
      </el-table-column>
      <el-table-column prop="visitedUserName" label="被访人" />
      <el-table-column prop="company" label="访客单位" />
      <el-table-column prop="name" label="访客姓名" />
      <el-table-column prop="mobile" label="访客手机" />
      <el-table-column label="登记">
        <template slot-scope="scope">
          <a
            href="javascript:void(0)"
            class="greenbutton"
            @click="onRegisterClick(scope.row.no)"
            >登记</a
          >
        </template>
      </el-table-column>
    </el-table>
    <center>
      <el-pagination
        @current-change="onCurrentChange"
        :page-size="pageSize"
        :current-page="pageIndex"
        :total="pagedData.total"
        layout="prev, pager, next"
      />
    </center>
    <div class="dialog_container" v-if="showDialog">
      <div class="dialog">
        <div class="title">登记访客</div>
        <a
          href="javascript:void(0)"
          class="close"
          @click="showDialog = false"
        ></a>
        <div class="box">
          <div class="caption">预约信息</div>
          <table class="filtertable">
            <tr>
              <td class="title4">开始时间：</td>
              <td>
                {{ DateTime.parse(model.beginTime).format('yyyy-MM-dd hh:mm') }}
              </td>
              <td class="title5">结束时间：</td>
              <td>
                {{ DateTime.parse(model.beginTime).format('yyyy-MM-dd hh:mm') }}
              </td>
            </tr>
            <tr>
              <td class="title4">被访人：</td>
              <td>{{ model.visitedUserName }}</td>
              <td class="title5">被访人手机：</td>
              <td>{{ model.visitedUserMobile }}</td>
            </tr>
            <tr>
              <td class="title4">访客单位：</td>
              <td>{{ model.company }}</td>
              <td class="title5">访客姓名：</td>
              <td>{{ model.name }}</td>
            </tr>
            <tr>
              <td class="title4">访客手机：</td>
              <td>{{ model.mobile }}</td>
              <td class="title5">访客验证码：</td>
              <td><el-input v-model="verificationCode" /> *</td>
            </tr>
            <tr>
              <td class="title4">来访事由：</td>
              <td colspan="3">{{ model.reason }}</td>
            </tr>
            <tr>
              <td colspan="4" align="center">
                <a href="javascript:void(0)" class="button" @click="onOkClick()"
                  >确定</a
                >
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DateTime from '@/js/datetime'

export default {
  data() {
    return {
      DateTime: DateTime,

      company: '',
      name: '',
      mobile: '',
      verificationCode: '',

      pagedData: {},
      pageSize: 12,
      pageIndex: 1,
      showDialog: false,
      model: {}
    }
  },
  created() {},
  mounted() {
    this.queryData()
  },
  destroyed() {},
  computed: {},
  methods: {
    onQueryClick() {
      this.pageIndex = 1
      this.queryData()
    },
    onRegisterClick(no) {
      this.$api.MMS.Visitor.GetModel({
        no: no
      }).then(res => {
        if (res.ok) {
          this.verificationCode = ''
          this.model = res.data
          this.showDialog = true
        }
      })
    },
    onOkClick() {
      if (!this.verificationCode)
        return this.$Tools.LayerMsgInfo('验证码不能为空')

      this.$api.MMS.Visitor.Visit({
        no: this.model.no,
        verificationCode: this.verificationCode
      }).then(res => {
        if (res.ok) {
          this.queryData()
          this.showDialog = false
        } else this.$Tools.LayerMsgInfo(res.message)
      })
    },
    onCurrentChange(e) {
      this.pageIndex = e
      this.queryData()
    },
    async queryData() {
      const res = await this.$api.MMS.Visitor.GetUnvisitedPagedList({
        company: this.company,
        name: this.name,
        mobile: this.mobile,
        pageIndex: this.pageIndex - 1,
        pageSize: this.pageSize
      })
      if (res.ok) this.pagedData = res.data
    },
    onRowClassName({ row, rowIndex }) {
      return rowIndex % 2 == 0 ? 'even-row' : 'odd-row'
    }
  }
}
</script>
