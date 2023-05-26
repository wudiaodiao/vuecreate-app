<template>
  <div class="page">
    <table class="filtertable">
      <tr>
        <td class="title2">日期：</td>
        <td class="content2">
          <el-date-picker v-model="filter.beginDay" type="date" value-format="yyyy-MM-dd" style="width:140px" />
          -
          <el-date-picker v-model="filter.endDay" type="date" value-format="yyyy-MM-dd" style="width:140px" />
        </td>
        <td class="title3">热量表：</td>
        <td>
          <el-select v-model="filter.meterNo" filterable placeholder="请选择或搜索" style="width:140px">
            <el-option v-for="item in energyMeters" :key="item.no" :label="item.name" :value="item.no" />
          </el-select>
        </td>
        <td>
          <a href="javascript:void(0)" class="button" @click="onQueryClick()">查询</a>
        </td>
        <td class="tool">
          <a :href="exportUrl" v-if="exportUrl" target="_blank" class="toolbutton">导出</a>
        </td>
      </tr>
    </table>
    <el-table :data="pagedData.list" :row-class-name="onRowClassName">
      <el-table-column label="日期">
        <template v-slot="scope">
          {{ $Convert.getDate(scope.row.day) }}
        </template>
      </el-table-column>
      <el-table-column prop="value" label="用量（吨）" >
        <template v-slot="scope">
          {{ scope.row.value.toFixed(2) }}
        </template>
        </el-table-column>
      <el-table-column prop="currentValue" label="当前读数（吨）" />
    </el-table>
    <center>
      <el-pagination @current-change="onCurrentChange" :page-size="pageSize" :current-page="pageIndex" :total="pagedData.total" layout="prev, pager, next" />
    </center>
  </div>
</template>
<script>
import DateTime from '../../../js/datetime'

export default {
  data() {
    return {
      pagedData: {
        list: [],
        total: 0
      },
      pageSize: 12,
      pageIndex: 1,
      energyMeters: [],
      exportUrl: '',
      filter: {
        beginDay: '',
        endDay: '',
        meterNo: null
      }
    }
  },
  created() {},
  mounted() {
    this.filter.beginDay = DateTime.today().addDate(0, -1, 0).format('yyyy-MM-dd');
    this.filter.endDay = DateTime.today().addDate(0, 0, 1).format('yyyy-MM-dd');
    this.queryEnergyMeters();
  },
  unmounted() {},
  computed: {},
  methods: {
    onQueryClick() {
        if (!this.filter.meterNo) {
            this.$Tools.LayerMsgErr('请选择能耗表')
            return;
        }
        this.queryData();
    },
    onCurrentChange(e) {
      this.pageIndex = e
      this.queryData()
    },
    queryEnergyMeters() {
      this.$api.MMS.EnergyMeter.GetList({
        type: 4
      }).then(res => {
        this.energyMeters = res.data;
        if (this.energyMeters.length > 0) {
          this.filter.meterNo = this.energyMeters[0].no;
          this.queryData();
        }
      })
    },
    queryData() {
        this.$api.MMS.EnergyReportDay.GetPagedList({
            beginDay: this.filter.beginDay,
            endDay: this.filter.endDay,
            meterNo: this.filter.meterNo,
            pageIndex: this.pageIndex - 1,
            pageSize: this.pageSize
        }).then(res => {
            this.pagedData = res.data;
            if (this.pagedData.count == 0)
              this.exportUrl = '';
            else
              this.exportUrl = this.$api.MMS.EnergyReportDay.GetExportUrl({
                beginDay: this.filter.beginDay,
                endDay: this.filter.endDay,
                meterNo: this.filter.meterNo
              });
              console.log('AA', this.exportUrl)
        });
    },
    onRowClassName({ row, rowIndex }) {
      return rowIndex % 2 == 0 ? 'even-row' : 'odd-row'
    }
  }
}
</script>
