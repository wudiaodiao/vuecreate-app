<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2021-11-23 15:16:45
 * @LastEditors: Please set LastEditors
 * @Description: 人员绩效报表
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->
<template>
  <div class="Part public_body">
    <div class="WorkOrderQuery_cneter">
      <div :class="[
          'WorkOrderQuery public_page',
          $store.state.dtab ? 'index_off' : 'index_no'
        ]">
        <div class="WorkOrderQuery_main">
          <div class="WorkOrderQuery_main_top">
            <div class="MonitorReport_center_top">
              <ul>
                <li>
                  <span>月份：</span>
                  <el-date-picker
                    class="EqTime"
                    v-model="EqTime"
                    type="month"
                    placeholder="选择日期"
                    value-format="yyyy-MM"
                  ></el-date-picker>
                </li>

                <li>
                  <span
                    class="chaxun"
                    @click="ReportPerformance()"
                  >查询</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="daochu">
            <span
              @click="ReportExportPerformance()"
              v-show="ReportPerformanceData.list"
            >导出</span>
          </div>
          <div
            class="WorkOrderQuery_main_zhon"
            v-if="ReportPerformanceData.list"
          >
            <div class="WorkOrderQuery_main_list">
              <PerformanceChart :ReportPerformanceData="ReportPerformanceData"></PerformanceChart>
            </div>
          </div>
          <div
            v-else
            style=" text-align: center !important;width: 100%;"
          >暂无绩效</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PerformanceChart from './components/PerformanceChart'
export default {
  components: {
    PerformanceChart,
  },
  data() {
    return {
      EqTime: new Date().getFullYear() + '-' + (new Date().getMonth() + 1), //当前年月
      ReportPerformanceData: {},
       fullscreenLoading:''
    }
  },
  mounted() {
    this.ReportPerformance() //人员效绩报表
  },
  methods: {
     openFullScreen() {
            let that = this
            that.fullscreenLoading = that.$loading({
              lock: true,
              text: '加载中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)',
            })
          },
    async ReportExportPerformance() {
      var image = await this.getChartImg('#alarmLevelqus_chart')
      // this.previewChartImg(image) // 预览
      let formData = new FormData()
      formData.append('file', image)

      //导出人员绩效报表
      const res = await this.$api.MMS.Report.ExportPerformance(
        {
          month: this.EqTime,
        },
        formData
      )
      if (res) {
        var blob = new Blob([res])
        var a = document.createElement('a')
        a.download = '人员绩效报表.xlsx'
        a.style.display = 'none'
        a.href = URL.createObjectURL(blob)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        this.$Tools.LayerMsgInfo('成功')
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    //人员效绩报表
    async ReportPerformance() {
      this.openFullScreen()
      this.ReportPerformanceData = {}
      const res = await this.$api.MMS.Report.Performance({
        month: this.EqTime,
      })
       if (res) { 
        this.fullscreenLoading.close()
      }
      if (res.ok) {
        if (res.data.list.length > 0) {
          this.ReportPerformanceData = res.data //查询
        } else {
          this.$Tools.LayerMsgErr('没有数据')
        }
      } else {
        this.$Tools.LayerMsgErr(res.message)
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
@import './styles/Performance.scss';
</style>
