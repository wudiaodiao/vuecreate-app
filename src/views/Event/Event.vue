<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-03-07 18:50:23
 * @LastEditors: Please set LastEditors
 * @Description: 历史报警
 * @FilePath: \ibms\src\views\Event\components\attendanceStatistics.vue
-->
<template>
  <div class="public_body">
    <!-- 报警管理 -->

    <div class="baojinguanli">
      <div
        class="alarmManagement_daohan"
        v-show="HistoricalData.total > 0"
      >
        <ul>
          <li
            v-for="item in baojinlist"
            :key="item.name"
          >
            <a
              :class="[baojinNameId === item.id ? 'daohanactive' : '']"
              @click="baojinclick(item.id)"
              href="javascript:;"
            >{{ item.name }}</a>
          </li>
        </ul>
      </div>
      <div :class="[
          'public_page',
          $store.state.dtab ? 'index_off' : 'index_no'
        ]">
        <div class="baojin_center">
          <alarmjb v-if="baojinNameId == '1'"></alarmjb>
          <div v-else>
            <div class="baojin_center_top">
              <ul>
                <li class="baojin_center_top_riqishij">
                  <span class="baojin_center_top_baojin_Time">报警时间：</span>
                  <el-date-picker
                    v-model="Start"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="left"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :picker-options="pickerOptions"
                    :clearable="false"
                  ></el-date-picker>
                  <span class="shunline">-</span>
                  <el-date-picker
                    v-model="End"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                    align="left"
                    :picker-options="pickerOptions"
                    :clearable="false"
                  ></el-date-picker>
                </li>
                <li class="zixitong">
                  <span>子系统：</span>
                  <el-select
                    v-model="Subsystem"
                    placeholder="所有"
                    @change="SubSystemChane(Subsystem)"
                  >
                    <el-option
                      v-for="item in SubSysdata"
                      :key="item.name"
                      :label="item.name"
                      :value="item.no"
                    ></el-option>
                  </el-select>
                </li>
                <li class="center_top_shebei">
                  <span>设备：</span>
                  <el-select
                    v-model="equipment"
                    placeholder="所有"
                    @change="DeviceListDataChange(equipment)"
                    filterable
                  >
                    <el-option
                      v-for="item in DeviceListData"
                      :key="item.name"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </li>
                <li class="center_top_xinhao">
                  <span>信号：</span>
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
                  <span class="vertical">
                    <el-checkbox v-model="zjchecked">报警</el-checkbox>
                  </span>
                  <span class="vertical">
                    <el-checkbox v-model="hfchecked">恢复</el-checkbox>
                  </span>
                </li>
                <li>
                  <el-button
                    type="success"
                    size="mini"
                    @click="
                      pageIndex = 1
                      GetList()
                    "
                  >查询</el-button>
                </li>
              </ul>
            </div>
            <potting-tab
              v-if="HistoricalData.total > 0"
              :tabData="addEvent"
              v-on:pottingTabClick="pottingTabClick"
            ></potting-tab>
            <div class="baojin_center_zhong">
              <div
                v-if="addSheId == 0"
                class="baojin_center_zhong_list"
                v-cloak
              >
                <el-table
                  :data="HistoricalData.list"
                  style="width: 100%"
                  :row-class-name="tableRowClassName"
                  v-loading="searchLoding"
                >
                  <el-table-column
                    type="index"
                    :index="(pageIndex-1)*pageSize+1"
                    show-overflow-tooltip
                    label="序号"
                  ></el-table-column>
                  <el-table-column
                    prop="status"
                    label="状态"
                    width="50px"
                  >
                    <template v-slot="scope">
                      <img :src="
                          require(`@/assets/image/index/event${scope.row.level}.png`)
                        " />
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="alarmTime"
                    label="报警时间"
                    width="195px"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <span>
                        {{ $Convert.getTime(scope.row.alarmTime) }}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="resetTime"
                    label="恢复时间"
                    width="195px"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <span>
                        {{ $Convert.getTime(scope.row.resetTime) }}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="subSystemName"
                    show-overflow-tooltip
                    label="子系统"
                  ></el-table-column>
                  <el-table-column
                    prop="deviceName"
                    show-overflow-tooltip
                    label="设备"
                  ></el-table-column>
                  <el-table-column
                    prop="signalName"
                    show-overflow-tooltip
                    label="信号"
                  ></el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    prop="equipmentAreaName"
                    label="地点"
                  ></el-table-column>
                  <el-table-column
                    width="140px"
                    show-overflow-tooltip
                    prop="content"
                    label="报警内容"
                  ></el-table-column>
                  <el-table-column
                    prop="level"
                    label="级别"
                    width="50px"
                  >
                    <template v-slot="scope">
                      <span :class="[`event${scope.row.level}`]">{{
                        level(scope.row.level)
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="workOrderState"
                    label="工单状态"
                  >
                    <template v-slot="scope">
                      <span>
                        {{$Convert.WorkOrder.State(scope.row.workOrderState)}}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="查看"
                    width="50px"
                  >
                    <template v-slot="scope">
                      <span
                        class="moshou changkan"
                        @click="chankan(scope.row)"
                      >查看</span>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="fenye">
                  <el-pagination
                    :page-size="pageSize"
                    :pager-count="13"
                    hide-on-single-page
                    @current-change="Current"
                    :current-page="pageIndex"
                    layout="prev, pager, next"
                    :total="HistoricalData.total"
                  ></el-pagination>
                </div>
              </div>
              <alarmqs v-else-if="addSheId == '1'&&HistoricalData.total > 0">报警趋势</alarmqs>

              <div
                class="daochu"
                v-show="addSheId == 0&&HistoricalData.total > 0"
              >
                <el-button
                  type="primary"
                  size="mini"
                  @click="Export()"
                >导出</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="Wales_bg"
        v-if="chankanShow"
      >
        <div class="Wales_bg_center">
          <div class="Wales">
            <div class="Wales_xinxi">
              <div class="Wales_xinxi_title">
                <span>查看事件</span>
              </div>
              <div class="Wales_xinxi_list">
                <ul>
                  <li>
                    <div>
                      <span>状态：</span>
                      <i>报警</i>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>报警时间：</span>
                      <i>
                        {{ $Tools.timeFormatAll(alarmEnergylist.alarmTime) }}
                      </i>
                    </div>
                    <div>
                      <span>恢复时间：</span>
                      <i>
                        {{ $Tools.timeFormatAll(alarmEnergylist.resetTime) }}
                      </i>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>子系统：</span>
                      <i>{{ alarmEnergylist.subSystemName }}</i>
                    </div>
                    <div>
                      <span>设备：</span>
                      <i>{{ alarmEnergylist.deviceName }}</i>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>信号：</span>
                      <i>{{ alarmEnergylist.signalName }}</i>
                      <!-- <i>东方闪电富商大贾发电公司梵蒂冈的粉红色的分公司的发给第三方感受到分公司的分公司的风格是大法官水电费广东省发给第三方公司的反攻倒算</i> -->
                    </div>
                    <div>
                      <span>地点：</span>
                      <i>{{ alarmEnergylist.equipmentAreaName }}</i>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>报警主题：</span>
                      <i>{{ alarmEnergylist.content }}</i>
                      <!-- <i>撒大大实打实大法师打算大萨达sad啊实打实大厦发生的所发生的发送到发送到发送发顺丰第三个放</i> -->
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>报警类别：</span>
                      <i>
                        {{
                          alarmEnergylist.category == 1
                            ? '上限告警'
                            : '下限报警'
                        }}
                      </i>
                    </div>
                    <div>
                      <span>报警级别：</span>
                      <i>{{ level(alarmEnergylist.level) }}</i>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>确认时间：</span>
                      <i>
                        {{ $Tools.timeFormatAll(alarmEnergylist.confirmTime) }}
                      </i>
                    </div>
                    <div>
                      <span>确认人:</span>
                      <i>{{ alarmEnergylist.confirmUserName }}</i>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>工单号：</span>
                      <i>{{ alarmEnergylist.workOrderId }}</i>
                    </div>
                    <div>
                      <span>工单状态：</span>
                      <i>{{ $Convert.WorkOrder.State(alarmEnergylist.workOrderState) }}</i>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="Wales_cancel"
              @click="cancel()"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pottingTab from '../../components/index/potting-tab.vue'
export default {
  components: { pottingTab },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        },
      },
      Subsystem: '',
      equipment: '',
      signal: '',
      Start: new Date(
        new Date(new Date().toLocaleDateString()).getTime() -
          6 * 1000 * 60 * 60 * 24
      ),
      End: new Date(
        new Date(new Date().toLocaleDateString()).getTime() +
          1000 * 60 * 60 * 24
      ),

      zjchecked: true,
      hfchecked: true,
      chakandata: '',
      chankanShow: false,
      SubSysdata: [
        {
          no: 0,
          name: '所有',
        },
      ], //子系统列表
      subSystemNo: '', //子系统号
      DeviceListData: [
        {
          id: '',
          name: '所有',
        },
      ], //设备
      DeviceListNo: '',
      SignalData: [
        {
          id: '',
          name: '所有',
        },
      ], //获取信号列表
      HistoricalData: {
        list: [],
        total: 0,
      }, //历史报警数据
      timer: '',
      pageIndex: 1, //历史页码
      pageSize: 13, //一页多少条
      baojinActive: true,
      alarmEnergylist: {}, //报警当前项
      baojinNameId: '0',
      baojinlist: [
        {
          name: '报警记录',
          id: '0',
        },
        {
          name: '报警级别',
          id: '1',
        },
      ],
      addEvent: [
        { name: '记录详情', id: '0' },
        { name: '报警趋势', id: '1' },
      ],
      addSheId: '0',
      searchLoding: false,
      fullscreenLoading: '',
    }
  },

  created() {},
  mounted() {
    //标准时间转化为年月日、时分秒
    this.Start = this.formatDate(this.Start)
    this.SubSysList()
    this.GetList()
  },
  unmounted() {},
  computed: {
    level: function () {
      //返回当前时间的上一个月
      //通过回调函数给计算属性传参
      return function (type) {
        switch (type) {
          case 1:
            return '提示'
          case 2:
            return '一般'
          case 3:
            return '重要'
          case 4:
            return '紧急'
          default:
            return '其他'
        }
      }
    },
  },
  methods: {
    pottingTabClick(id) {
      this.addSheId = id
    },
    openFullScreen() {
      this.fullscreenLoading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
    },
    formatTen(num) {
      return num > 9 ? num + '' : '0' + num
    },
    formatDate(date) {
      var date = new Date(date)
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var hour = date.getHours()
      var minute = date.getMinutes()
      var second = date.getSeconds()
      return (
        year +
        '-' +
        this.formatTen(month) +
        '-' +
        this.formatTen(day) +
        ' ' +
        this.formatTen(hour) +
        ':' +
        this.formatTen(minute) +
        ':' +
        this.formatTen(second)
      )
    },
    //历史报警切换栏
    baojinclick(name) {
      this.baojinNameId = name
    },
    async Export() {
      this.openFullScreen()
      const res = await this.$api.MMS.Event.ExportList({
        Start: this.Start,
        End: this.End,
        Alarm: this.zjchecked,
        Reset: this.hfchecked,
        SubSystemNo: this.subSystemNo || 0,
        Device: this.DeviceListNo || '',
        Signal: this.signal || '',
        PageIndex: this.pageIndex,
        PageSize: this.pageSize,
      })

      if (res) {
        console.log(res)
        setTimeout(() => {
          this.fullscreenLoading.close()
        }, 2000)
        var blob = new Blob([res])
        var a = document.createElement('a')
        a.download = '历史报警.xlsx'
        a.style.display = 'none'
        a.href = URL.createObjectURL(blob)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        this.$Tools.LayerMsgInfo('导出完成')
      } else {
        setTimeout(() => {
          this.fullscreenLoading.close()
        }, 2000)
      }
    },

    Current(e) {
      this.pageIndex = e
      this.GetList()
    },

    async GetList() {
      console.log(this.End)

      this.searchLoding = true
      const res = await this.$api.MMS.Event.GetList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        Start: this.Start,
        End: this.End,
        SubSystemNo: this.subSystemNo || 0,
        Device: this.DeviceListNo || '',
        Signal: this.signal || '',
        Alarm: this.zjchecked,
        Reset: this.hfchecked,
      })
      if (res.ok) {
        this.searchLoding = false
        if (res.data.total == 0) {
          this.$Tools.LayerMsgErr('该时间段暂无数据')
        }
        this.HistoricalData = res.data
        const Infolist = await this.$api.MMS.Event.GetChartInfo({
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          Start: this.Start,
          End: this.End,
          SubSystemNo: this.subSystemNo || 0,
          Device: this.DeviceListNo || '',
          Signal: this.signal || '',
          Alarm: this.zjchecked,
          Reset: this.hfchecked,
        })
        if (Infolist.ok) {
          this.$store.commit('setInfolistData', Infolist.data)
        }
      } else {
        this.searchLoding = false
      }
    },
    async SubSysList() {
      //获取子系统列表
      const res = await this.$api.MMS.SubSystem.SubSysList({})
      if (res.ok) {
        this.SubSysdata.push(...res.data)
      }
    },

    async SubSystemChane(systemNo) {
      if (systemNo == 0) {
        this.subSystemNo = systemNo
        this.DeviceListNo = ''
        this.equipment = ''
        this.signal = ''
      }
      this.subSystemNo = systemNo
      const res = await this.$api.MMS.Device.GetList({ systemNo: systemNo })
      if (res.ok) {
        this.DeviceListData.push(...res.data)
      } else {
        this.DeviceListData = []
        this.SignalData = []
        this.equipment = ''
        this.signal = ''
      }
    },
    async DeviceListDataChange(systemNo) {
      if (systemNo == '') {
        this.signal = ''
        this.equipment = ''
      }
      this.DeviceListNo = systemNo
      const res = await this.$api.MMS.Signal.GetList({ code: systemNo || 0 })
      if (res.ok) {
        this.SignalData.push(...res.data)
      }
    },
    SignalDataChange(name) {
      this.signal = name
    },
    chankan(item) {
      this.alarmEnergylist = item
      //查看信息
      this.chankanShow = true
    },
    cancel() {
      //关闭
      this.chankanShow = false
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
<style>
[v-cloak] {
  display: none;
}
</style>
<style lang="scss" scoped>
@import './styles/Event.scss';
.Wales_xinxi_list li div {
  // display: flex;
}
.Wales_xinxi_list li div span {
  float: left;
 width:72px !important;
}
.Wales_xinxi_list li div i {
  float: left;

 display: inline-block;
 width: calc(100% - 72px);
}
</style>
