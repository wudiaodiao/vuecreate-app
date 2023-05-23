<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-01-18 15:30:57
 * @LastEditors: Please set LastEditors
 * @Description: 设备控制报表
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->
<template>
  <div class="Part public_body">
    <div class="WorkOrderQuery_cneter">
      <div :class="[
          'public_page',
          $store.state.dtab ? 'index_off' : 'index_no'
        ]">
        <div class="WorkOrderQuery_main">
          <div class="WorkOrderQuery_main_top">
            <div class="MonitorReport_center_top">
              <ul class="ControlUl">
                <li class="baojin_center_top_riqishij">
                  <span class="baojin_center_top_baojin_Time">时间：</span>
                  <el-date-picker
                    class="sele_time"
                    v-model="piliancelect"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                  <!-- :picker-options="pickerOptions" -->

                </li>
                <li>
                  <span class="span">用户：</span>
                  <span class="selectFile_sub">{{
                    userName != '' ? userName : '所有'
                  }}</span>
                  <a
                    href="javascript:;"
                    class="smallbluebutton one_a"
                    v-show="userName != undefined && userName != ''"
                    @click="
                      userName = ''
                      userNameNo = ''
                    "
                  >X</a>
                  <a
                    href="javascript:;"
                    @click="addTc('selectUser', '')"
                    class="smallbluebutton"
                  >...</a>
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
                    v-model="signal"
                    placeholder="所有"
                    @change="SignalDataChange(signal)"
                  >
                    <el-option
                      v-for="item in SignalData"
                      :key="item.name"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </li>

                <li>
                  <span
                    class="chaxun"
                    @click="ReportControlReport()"
                  >查询</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="WorkOrderQuery_main_daochu">
            <div class="daochu_right">
              <span
                class="chu"
                @click="ReportExportControlReport()"
              >导出</span>
            </div>
          </div>
          <div class="WorkOrderQuery_main_zhon">
            <div class="WorkOrderQuery_main_list">
              <el-table
                :data="ReportControlReportData"
                style="width: 100%"
                :row-class-name="tableRowClassName"
              >
                <el-table-column
                  prop="time"
                  label="时间"
                  width="180"
                ></el-table-column>
                <el-table-column
                  prop="userName"
                  label="用户"
                  width=""
                ></el-table-column>
                <el-table-column
                  prop="subSystemName"
                  label="子系统"
                  width=""
                ></el-table-column>
                <el-table-column
                  prop="deviceName"
                  label="设备"
                  width=""
                ></el-table-column>
                <el-table-column
                  prop="signalName"
                  label="信号"
                  width=""
                ></el-table-column>
                <el-table-column
                  prop="value"
                  label="控制值"
                  width=""
                ></el-table-column>
                <el-table-column
                  prop="result"
                  label="控制结果"
                  width=""
                ></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <div
        class="PartOut_tanchuang_ying"
        v-if="PartInOutGetSearchShow"
      >
        <div class="tanchuang">
          <div :class="[
              'tanchuang_bg',
              PartInOutGetSearchType == 'chakanLog' ? 'gongd_tanchuang_bg' : ''
            ]">
            <div class="tanchuang_top">
              <img
                :src="require('~@/assets/image/index/partial_left.png')"
                alt
              />
              <span class="top_title margin_tc">{{
                PartInOutGetSearchType == 'selectUser' ? '选择用户' : ''
              }}</span>

              <img
                :src="require('@/assets/image/index/partial_right.png')"
                alt
              />
            </div>
            <div class="tanchuang_center">
              <div class="tanchuang_center_cen">
                <div
                  class="selectUser"
                  v-if="PartInOutGetSearchType == 'selectUser'"
                >
                  <selectUser
                    v-on:addTc="addTc"
                    :eqUserId="userNameNo"
                  ></selectUser>
                </div>
              </div>
            </div>
          </div>
          <div class="cancel">
            <img
              :src="require('@/assets/image/index/withdrawal.png')"
              v-show="PartInOutGetSearchType != 'selectUser'"
              alt
            />
            <img
              @click="PartInOutGetSearchShow = false"
              :src="require('@/assets/image/index/cancel.png')"
              alt
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DateTime from '@/js/datetime.js'
export default {
  data() {
    return {
      DateTime: DateTime,
      pickerOptions: {
        disabledDate: (time) => {
          // 如果函数里处理的数据比较麻烦,也可以单独放在一个函数里,避免data数据太臃肿
          return this.dealDisabledDate(time)
        },
      },
      piliancelect: [
        // new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 6),
        // new Date(), //今天
        new Date(new Date(new Date().toLocaleDateString()).getTime()), //今天
        new Date(
          new Date(new Date().toLocaleDateString()).getTime() +
            1000 * 60 * 60 * 24
        ), //明天
        //明天
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
      signal: '',
      DeviceListData: [], //设备
      DeviceListName: '',
      DeviceListNo: '',
      ReportControlReportData: {}, //设备运行报表数据
      PartInOutGetSearchShow: false,
      userNameNo: '',
      userName: '',
      SignalData: [],
      fullscreenLoading:'',
    }
  },
  mounted() {
    this.ReportMonitorSubSystem() //获取子系统

    this.ReportControlReport() //设备运行报表
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
    async addTc(type, item) {
      //弹窗
      if (type == 'selectUser') {
      } else if (type == 'Distribute') {
        this.PartInOutGetSearchShow = false
        this.userNameNo = item.no
        this.userName = item.name
        return
      }
      //添加节点显示弹窗

      this.PartInOutGetSearchShow = true
      this.PartInOutGetSearchType = type
    },
    async ReportControlReport() {
      this.openFullScreen()
      //设备运行报表
      let one = 0
      let two = 1
      const startTime = this.piliancelect[one]
      const endTime = this.piliancelect[two]
      const res = await this.$api.MMS.Report.ControlReport({
        startTime: this.$moment(startTime).format('YYYY-MM-DD'),
        endTime: this.$moment(endTime).format('YYYY-MM-DD'),
        userNo: this.userNameNo,
        subSystemNo: this.SubSysNo,
        deviceId: this.DeviceListNo,
        signalId: this.signal,
      })
      if (res) { 
        this.fullscreenLoading.close()
      }
      if (res.ok) {
        if (res.data.length > 0) {
          var batchList = res.data
          for (let i in batchList) {
            let record = batchList[i]
            console.log(record)
            record.time = DateTime.parse(record.time).format(
              'yyyy-MM-dd hh:mm:ss'
            )
          }
          this.ReportControlReportData = batchList
        } else {
          this.ReportControlReportData = []
          this.$Tools.LayerMsgErr('没有数据')
        }
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    async ReportMonitorSubSystem() {
      //获取子系统列表
      const res = await this.$api.MMS.Report.MonitorSubSystem({})
      if (res.ok) {
        this.SubSysdata = res.data
        this.SubSysdata.unshift({
          id: '',
          name: '所有',
        })
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
        this.DeviceListData.unshift({
          id: '',
          name: '所有',
        })
        if (this.DeviceListData.length > 0) {
          //默认获取报表管理第一项
          this.DeviceListName = this.DeviceListData[0].name
          this.DeviceListNo = this.DeviceListData[0].id

          const res1 = await this.$api.MMS.Signal.GetList({
            code: this.DeviceListNo || 0,
          })
          if (res1.ok) {
            this.SignalData = res1.data
            this.SignalData.unshift({
              id: '',
              name: '所有',
            })
            this.signal =
              this.SignalData.length > 0 ? this.SignalData[0].id : ''
          }
        }
      }
    },
    async DeviceListNameChane(id) {
      //返回不同的类型
      this.DeviceListNo = id

      this.signal = ''
      const res = await this.$api.MMS.Signal.GetList({ code: id || 0 })
      if (res.ok) {
        this.SignalData = res.data
        this.SignalData.unshift({
          id: '',
          name: '所有',
        })
        this.signal = this.SignalData.length > 0 ? this.SignalData[0].id : ''
      }
    },
    SignalDataChange(name) {
      this.signal = name
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
    async ReportExportControlReport() {
      let one = 0
      let two = 1
      const startTime = this.piliancelect[one]
      const endTime = this.piliancelect[two]
      //导出设备运行报表
      const res = await this.$api.MMS.Report.ExportControlReport({
        startTime: this.$moment(startTime).format('YYYY-MM-DD'),
        endTime: this.$moment(endTime).format('YYYY-MM-DD'),
        userNo: this.userNameNo,
        subSystemNo: this.SubSysNo,
        deviceId: this.DeviceListNo,
        signalId: this.signal,
      })
      if (res) {
        var blob = new Blob([res])
        var a = document.createElement('a')
        a.download = '设备控制报表.xlsx'
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
.PartOut_tanchuang_ying {
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  .tanchuang {
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .gongd_tanchuang_bg {
      width: 58vw !important;
    }

    .tanchuang_bg {
      width: 40vw;
      height: 61.85vh;
      background: url('~@/assets/image/index/tanchuan.png') no-repeat;
      background-size: 100% 100%;
      .tanchuang_top {
        .top_title {
          font-size: 22px;
          font-family: MicrosoftYaHei;
          font-weight: bold;
          color: #00f0ff;
          height: 5vh;
          line-height: 5vh;
        }
        .margin_tc {
          margin: 0 0.3vw;
        }
        > img {
          vertical-align: baseline;
          width: 22px;
          height: 12px;
        }
      }

      .tanchuang_center {
        margin: 2vh 0;
        .tanchuang_center_cen {
          .selectUser {
            height: 50vh;
            overflow: auto;
          }
          .tanchuang_center_cen_bottom {
            margin-top: 3.7vh;

            button {
              cursor: pointer;
              border: 0;
              width: 70px;
              height: 26px;
              background: #30b8ff;
              border-radius: 2px;
              outline: none;
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: #ffffff;
            }
            > :nth-child(1) {
              margin-right: 1.56vw;
            }
            > :nth-child(2) {
              margin-right: 1.56vw;
            }
          }
        }
      }
    }
    .cancel {
      > img {
        cursor: pointer;
      }
    }
  }
}
</style>
