<!--
 * @Author: your name
 * @Date: 2020-11-09 11:31:29
 * @LastEditTime: 2021-12-02 10:53:23
 * @LastEditors: Please set LastEditors
 * @Description: 访客记录查询
 * @FilePath: \IBMS\ibms\src\views\Assistance\components\Visit\VisitRecord.vue
-->
<template>
  <div class="page">
    <table class="filtertable">
      <tr>
        <td class="title4">预约日期：</td>
        <td class="content2">
          <el-date-picker
            v-model="beginDate"
            type="date"
            value-format="yyyy-MM-dd"
            style="width:140px"
          />
          -
          <el-date-picker
            v-model="endDate"
            type="date"
            value-format="yyyy-MM-dd"
            style="width:140px"
          />
        </td>
        <td class="title2">状态：</td>
        <td class="content">
          <el-select v-model="state" placeholder="所有">
            <el-option
              v-for="item in states"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </td>
        <td>
          <a href="javascript:void(0)" class="button" @click="onQueryClick()"
            >查询</a
          >
        </td>
        <td class="tool">
          <a :href="exportUrl" v-if="showExport" class="toolbutton">导出</a>
        </td>
      </tr>
    </table>

    <el-table :data="pagedData.list" :row-class-name="onRowClassName">
      <el-table-column label="预约时间">
        <template slot-scope="scope">
          {{ DateTime.parse(scope.row.beginTime).format('yyyy-MM-dd hh:mm') }}
        </template>
      </el-table-column>
      <el-table-column prop="visitedUserName" label="被访人" show-overflow-tooltip />
      <el-table-column prop="visitorCompany" label="访客单位" show-overflow-tooltip />
      <el-table-column
        prop="visitorReason"
        label="来访事由"
        show-overflow-tooltip
      />
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ $Convert.Visit.State(scope.row.state) }}
        </template>
      </el-table-column>
      <el-table-column label="查看">
        <template slot-scope="scope">
          <a
            href="javascript:void(0)"
            class="greenbutton"
            @click="onViewClick(scope.row.no)"
            >查看</a
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
        <div class="title">查看访客记录</div>
        <a
          href="javascript:void(0)"
          class="close"
          @click="showDialog = false"
        ></a>
        <div class="box">
          <div class="caption">基本信息</div>
          <table class="filtertable">
            <tr>
              <td class="title4">开始时间：</td>
              <td>
                {{ DateTime.parse(model.beginTime).format('yyyy-MM-dd hh:mm') }}
              </td>
              <td class="title4">结束时间：</td>
              <td>
                {{ DateTime.parse(model.beginTime).format('yyyy-MM-dd hh:mm') }}
              </td>
            </tr>
            <tr>
              <td class="title4">被访人：</td>
              <td>{{ model.visitedUserName }}</td>
              <td class="title4">访客单位：</td>
              <td>{{ model.visitorCompany }}</td>
            </tr>
            <tr>
              <td class="title4">来访事由：</td>
              <td colspan="3">{{ model.visitorReason }}</td>
            </tr>
          </table>

          <div class="caption">访客信息</div>
          <table class="filtertable">
            <tr>
              <td>序号</td>
              <td>姓名</td>
              <td>手机</td>
              <td>到访时间</td>
            </tr>
            <tr :key="index" v-for="(visitor, index) in visitors">
              <td>{{ index + 1 }}</td>
              <td>{{ visitor.name }}</td>
              <td>{{ visitor.mobile }}</td>
              <td>
                {{
                  visitor.visitTime
                    ? DateTime.parse(visitor.visitTime).format(
                        'yyyy-MM-dd hh:mm'
                      )
                    : '-'
                }}
              </td>
            </tr>
          </table>

          <div class="caption">流程信息</div>
          <div>
            <el-steps direction="vertical">
              <el-step
                :key="index"
                v-for="(flow, index) in flows"
                :title="
                  DateTime.parse(flow.time).format('yyyy-MM-dd hh:mm:ss') +
                    ' ' +
                    $Convert.Visit.Action(flow.action) +
                    ' ' +
                    (flow.userName || '')
                "
                :description="flow.description"
              />
            </el-steps>
          </div>
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

      states: [
        { value: null, name: '<--所有-->' },
        { value: 1, name: '已申请' },
        { value: 2, name: '已批准' },
        { value: 3, name: '已驳回' },
        { value: 4, name: '已到访' },
        { value: 5, name: '已关闭' }
      ],
      beginDate: DateTime.today()
        .addDate(0, -1, 0)
        .format('yyyy-MM-dd'),
      endDate: DateTime.today()
        .addDate(0, 0, 1)
        .format('yyyy-MM-dd'),
      visitedUserNo: null,
      state: null,
      pagedData: {},
      pageSize: 12,
      pageIndex: 1,
      exportUrl: '',
      showExport: false,
      showDialog: false,
      model: {},
      visitors: [],
      flows: []
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
    onViewClick(no) {
      this.$api.MMS.VisitRecord.GetModel({
        no: no
      }).then(res => {
        if (res.ok) {
          this.model = res.data
          this.showDialog = true
        }
      })
      this.$api.MMS.Visitor.GetListByRecord({
        recordNo: no
      }).then(res => {
        if (res.ok) this.visitors = res.data
      })
      this.$api.MMS.VisitFlow.GetListByRecord({
        recordNo: no
      }).then(res => {
        if (res.ok) this.flows = res.data
      })
    },
    onCurrentChange(e) {
      this.pageIndex = e
      this.queryData()
    },
    async queryData() {
      const res = await this.$api.MMS.VisitRecord.GetPagedList({
        beginTime: DateTime.parse(this.beginDate).toString(),
        endTime: DateTime.parse(this.endDate).toString(),
        visitedUserNo: this.visitedUserNo,
        state: this.state,
        pageIndex: this.pageIndex - 1,
        pageSize: this.pageSize
      })
      if (res.ok) {
        this.pagedData = res.data
        if (this.pagedData.total > 0) {
          this.exportUrl = this.$api.MMS.VisitRecord.ExportList({
            beginTime: DateTime.parse(this.beginDate).toString(),
            endTime: DateTime.parse(this.endDate).toString(),
            visitedUserNo: this.visitedUserNo,
            state: this.state
          })
          this.showExport = true
        } else {
          this.exportUrl = ''
          this.showExport = false
        }
      }
    },
    onRowClassName({ row, rowIndex }) {
      return rowIndex % 2 == 0 ? 'even-row' : 'odd-row'
    }
  }
}
</script>
