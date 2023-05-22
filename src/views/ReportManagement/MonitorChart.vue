<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-02-18 16:39:50
 * @LastEditors: Please set LastEditors
 * @Description: 设备运行曲线
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->
<template>
  <div class="public_body">
    <div class="WorkOrderQuery_cneter">
      <div :class="[
          'public_page ',
          $store.state.dtab ? 'index_off' : 'index_no'
        ]">
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
                    value-format="yyyy-MM-dd"
                    :clearable="false"
                  ></el-date-picker>
                    <!-- :picker-options="pickerOptions" -->

                </li>

                <li>
                  <span class="span">子系统：</span>
                  <el-select
                    v-model="SubSysName"
                    :placeholder="SubSysName + ''"
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
                  <span class="span">信号：</span>
                  <el-select
                    v-model="SignalName"
                    :placeholder="SignalName + ''"
                    @change="SignalNameChane(SignalName)"
                  >
                    <el-option
                      v-for="itemSt in SignalData"
                      :key="itemSt.no"
                      :label="itemSt.name"
                      :value="itemSt.id"
                    ></el-option>
                  </el-select>
                </li>

                <li>
                  <span
                    class="chaxun"
                    @click="ReportMonitorChart()"
                  >查询</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="WorkOrderQuery_main_zhon">
            <div
              class="WorkOrderQuery_main_list"
              v-show="ReportMonitorChartData.list.length>0"
            >
              <Chart :ReportMonitorChartData="ReportMonitorChartData"></Chart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from './components/MonitorChartChart'
export default {
  components: {
    Chart,
  },
  data() {
    return {
      pickerOptions: {
        disabledDate: (time) => {
          // 如果函数里处理的数据比较麻烦,也可以单独放在一个函数里,避免data数据太臃肿
          return this.dealDisabledDate(time)
        },
      },
      piliancelect: [
        // new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 6),
        // new Date(),
        new Date(new Date(new Date().toLocaleDateString()).getTime()), //今天
        new Date(
          new Date(new Date().toLocaleDateString()).getTime() +
            1000 * 60 * 60 * 24
        ), //明天
      ], //日期

      SubSysdata: [], //子系统
      SubSysName: '',
      SubSysNo: '',
      DeviceListData: [], //设备
      DeviceListName: '',
      DeviceListNo: '',
      SignalData: [], //信号
      SignalName: '',
      SignalId: '',
      fullscreenLoading:'',
      ReportMonitorChartData: { list: [] }, //设备运行曲线数据
    }
  },
  mounted() {
    this.ReportMonitorSubSystem() //获取子系统
    setTimeout(() => {
    this.ReportMonitorChart()
    }, 2000);
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
    ReportMonitorChart() {
      this.openFullScreen()
      //设备运行曲线
      let one = 0
      let two = 1
      const startTime = this.piliancelect[one]
      const endTime = this.piliancelect[two]
      const res = this.$api.MMS.Report.MonitorChart({
        startTime: startTime,
        endTime: endTime,
        deviceId: this.DeviceListNo,
        signalId: this.SignalId,
      }).then((res) => {
             this.fullscreenLoading.close()

        if (res && res.ok) {
          if (res.data.list.length > 0) {
            console.log(res);
            this.ReportMonitorChartData = res.data
          } else {
            this.ReportMonitorChartData = { list: [] }
            this.$Tools.LayerMsgErr('没有数据')
          }
        } else {
          this.$Tools.LayerMsgErr(res.message)
        }
      })
    },
    async ReportMonitorSubSystem() {
      //获取子系统列表
      const res = await this.$api.MMS.Report.MonitorSubSystem({})
      if (res.ok) {
        this.SubSysdata = res.data
        this.SubSysName = this.SubSysdata[0].name
        this.SubSysNo = this.SubSysdata[0].no
        this.SubSysNameChane(this.SubSysNo)
        this.ReportMonitorChart()
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

        //默认获取报表管理第一项
        this.DeviceListName = this.DeviceListData[0].name
        this.DeviceListNo = this.DeviceListData[0].id

        this.DeviceListNameChane(this.DeviceListNo)
      }
    },
    async DeviceListNameChane(id) {
      this.DeviceListNo = id
      //返回不同的类型
      //设备运行曲线-信号列表
      const res = await this.$api.MMS.Signal.GetList({ code: id })
      if (res.ok) {
        this.SignalData = res.data
        for (let i in this.SignalData) {
          //默认获取报表管理第一项
          this.SignalName = this.SignalData[0].name
          this.SignalId = this.SignalData[0].id
        }
      }
    },
    SignalNameChane(e) {
      this.SignalId = e
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
  },
}
</script>
<style lang="scss" scoped>
@import './styles/MonitorChart.scss';
</style>
