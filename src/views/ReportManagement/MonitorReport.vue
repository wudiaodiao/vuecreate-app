<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-02-18 16:39:59
 * @LastEditors: Please set LastEditors
 * @Description: 设备运行报表
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->
<template>
  <div class="Part public_body">
    <div class="WorkOrderQuery_cneter">
      <div :class="['public_page',$store.state.dtab?'index_off':'index_no']">
        <div class="WorkOrderQuery_main">
          <div class="WorkOrderQuery_main_top">
            <div class="MonitorReport_center_top">
              <ul>
                <li class="baojin_center_top_riqishij">
                  <span class="baojin_center_top_baojin_Time">日期：</span>
                  <el-date-picker
                    class="sele_time"
                    v-model="piliancelect"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  
                    :clearable="false"
                  ></el-date-picker>
                    <!-- :picker-options="pickerOptions" -->
                </li>
                <li>
                  <span class="span">报表类型：</span>
                  <el-select
                    v-model="reportTypeName"
                    :placeholder="reportTypeName"
                    @change="reportTypeDataChange"
                  >
                    <el-option
                      class="ss"
                      v-for="item in reportTypeData"
                      :key="item.no"
                      :label="item.name"
                      :value="item.no"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span class="span">子系统：</span>
                  <el-select
                    v-model="SubSysName"
                    :placeholder="SubSysName+''"
                    @change="SubSysNameChane(SubSysName)"
                  >
                    <el-option
                      v-for="itemSt in SubSysdata"
                      :key="itemSt.no"
                      :label="itemSt.name"
                      :value="itemSt.no"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span class="span">设备：</span>
                  <el-select
                    v-model="DeviceListName"
                    :placeholder="DeviceListName"
                    @change="DeviceListNameChane(DeviceListName)"
                            filterable
   
                  >
                    <el-option
                      v-for="itemd in DeviceListData"
                      :key="itemd.id"
                      :label="itemd.name"
                      :value="itemd.id"
                    ></el-option>
                  </el-select>
                </li>

                <li>
                  <span
                    class="chaxun"
                    @click="ReportMonitorReport()"
                  >查询</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="WorkOrderQuery_main_daochu">
            <div
              class="daochu_right"
              v-if="ReportMonitorReportData.tbody"
            >
              <span
                class="chu"
                @click="ReportExportMonitorReport()"
              >导出</span>
            </div>
          </div>
          <div
            class="WorkOrderQuery_main_zhon"
            v-if="ReportMonitorReportData.tbody"
          >
            <div class="WorkOrderQuery_main_list">
              <el-table
                :data="ReportMonitorReportData.tbody"
                style="width: 100%"
                :row-class-name="tableRowClassName"
                fit
                height="100%"
              >
                <el-table-column
                  v-for="(item,index) in ReportMonitorReportData.thead"
                  :key="index"
                  :label="item[0]"
                  :width="index==0?'160':''"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span>
                      {{scope.row[index]?$Tools.timeFormat(scope.row[index]+''):''}}
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate: (time) => {
          // 如果函数里处理的数据比较麻烦,也可以单独放在一个函数里,避免data数据太臃肿
          return this.dealDisabledDate(time)
        },
      },
      piliancelect: [
        //   new Date(new Date().getTime() - 24 * 60 * 60 * 1000 *6) ,
        // new Date(), 
        new Date(new Date(new Date().toLocaleDateString()).getTime()), //今天
        new Date(
          new Date(new Date().toLocaleDateString()).getTime() +
            1000 * 60 * 60 * 24
        ), //明天
      ], //日期
      reportTypeData: [
        {
          no: '1',
          name: '小时报表',
        },
        {
          no: '2',
          name: '日报表',
        },
      ],
      reportTypeName: '小时报表',
      reportTypeNo: 1, //报表类型、（小时报表、日报表）
      SubSysdata: [], //子系统
      SubSysName: '',
      SubSysNo: '',
      DeviceListData: [], //设备
      DeviceListName: '',
      DeviceListNo: '',
      fullscreenLoading:'',
      ReportMonitorReportData: {}, //设备运行报表数据
    }
  },
  mounted() {
  
  // console.log(this.$moment().format('YYYY-MM-DD'));
    // this.SubSysNameChane()
    this.ReportMonitorSubSystem() //获取子系统
    // this.SubSysNameChane()
    // this.ReportMonitorReport() //设备运行报表
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
    async ReportMonitorReport() {
      this.openFullScreen()

      this.ReportMonitorReportData = {}
      //设备运行报表
      let one = 0
      let two = 1
      const startTime = this.piliancelect[one]
      const endTime = this.piliancelect[two]
      const res = await this.$api.MMS.Report.MonitorReport({
        startTime:  this.$moment(startTime).format('YYYY-MM-DD'),
        endTime:  this.$moment(endTime).format('YYYY-MM-DD'),
        type: this.reportTypeNo,
        deviceId: this.DeviceListNo,
      })
      if (res) { 
        this.fullscreenLoading.close()
      }
      if (res.ok) {
        // console.log(res);
        if (res.data.thead.length > 0) {
          this.ReportMonitorReportData = res.data
        } else {
          this.$Tools.LayerMsgErr('没有数据')
        }
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
   
   
    // 
    async ReportMonitorSubSystem() {
      //获取子系统列表
      const res = await this.$api.MMS.Report.MonitorSubSystem({})
      
      if (res.ok) {
        this.SubSysdata = res.data
        this.SubSysName = this.SubSysdata[0].name
        this.SubSysNo = this.SubSysdata[0].no
        this.SubSysNameChane(this.SubSysNo)
      }
    },
    async SubSysNameChane(systemNo) {
      this.SubSysNo = systemNo
      //报表管理设备
      const res = await this.$api.MMS.Report.MonitorDevice({
        subNo: systemNo,
      })
      if (res.ok) {
        this.DeviceListData = res.data
        for (let i in this.DeviceListData) {
          //默认获取报表管理第一项
          this.DeviceListName = this.DeviceListData[0].name
          this.DeviceListNo = this.DeviceListData[0].id
        }
        this.ReportMonitorReport() 
      }
    },
    async DeviceListNameChane(id) {
      //返回不同的类型
      this.DeviceListNo = id
    },
    reportTypeDataChange(e) {
      this.reportTypeNo = e
    },
    dealDisabledDate(time) {
      //指定时间范围
      // time 是一个new Date数据
      if (new Date(time).getTime() > new Date().getTime()) {
        return time.getTime() >= new Date().getTime() //时间范围必须是时间戳
      } else {
        // return time.getTime() < Date.now() - 2 * 8.64e7 //8.64e7就是一天的时间戳 24*60*60*1000   两天之内 根据自己需求来定
        return time.getTime() > Date.now()
      }
    },
    async ReportExportMonitorReport() {
      //导出设备运行报表
      const res = await this.$api.MMS.Report.ExportMonitorReport({
        startTime:  this.$moment(this.piliancelect[0]).format('YYYY-MM-DD'),
        endTime:  this.$moment(this.piliancelect[1]).format('YYYY-MM-DD'),
        type: this.reportTypeNo,
        deviceId: this.DeviceListNo,
      })
      if (res) {
        var blob = new Blob([res])
        var a = document.createElement('a')
        a.download = '设备运行报表.xlsx'
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

    tableRowClassName({ row, rowIndex }) {
      //背景色
      if (rowIndex % 2 == 1) {
        return 'warning-row' //基数
      } else {
        return 'success-row' //偶数
      }
      return ''
    },
  },
}
</script>
<style lang="scss" scoped>
@import './styles/MonitorReport.scss';
</style>
