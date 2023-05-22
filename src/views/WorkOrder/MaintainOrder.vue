<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-02-22 18:30:49
 * @LastEditors: Please set LastEditors
 * @Description: 巡检记录
 * @FilePath: \ibms\src\views\Event\components\
-->
<template>
  <div class="Part">
    <div class="WorkOrderQuery_cneter">
      <div :class="[
          'WorkOrderQuery',
          $store.state.dtab ? 'index_off' : 'index_no'
        ]">
        <div class="WorkOrderQuery_main">
          <div class="WorkOrderQuery_main_top">
            <div class="baojin_center_top">
              <ul>
                <li class="baojin_center_top_riqishij">
                  <span class="baojin_center_top_baojin_Time">报单时间：</span>
                  <el-date-picker
                    v-model="Start"
                    type="datetime"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM-dd"
                    align="left"
                    :picker-options="pickerOptions"
                    :clearable="false"
                  ></el-date-picker>
                  <span class="shunline">-</span>
                  <el-date-picker
                    v-model="End"
                    type="datetime"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期时间"
                    align="left"
                    :picker-options="pickerOptions"
                    :clearable="false"
                  ></el-date-picker>
                </li>
                <li>
                  <span
                    class="chaxun"
                    @click="
                      pageIndex = 1
                      WorkOrderGetSeachList()
                    "
                  >查询</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="WorkOrderQuery_main_daochu">
            <div
              class="daochu_right"
              v-if="SeachListData.total > 0"
            >
              <span
                class="chu"
                @click="WorkOrderExportList()"
              >导出</span>
            </div>
          </div>
          <potting-tab
            v-if="SeachListData.total > 0"
            :tabData="tabTask"
            v-on:pottingTabClick="pottingTabClick"
          ></potting-tab>
          <div v-if="tabtaskId == '0'">
            <div
              v-if="SeachListData.total > 0"
              class="WorkOrderQuery_main_zhon"
            >
              <div class="WorkOrderQuery_main_list">
                <el-table
                  :data="SeachListData.list"
                  style="width: 100%"
                  :row-class-name="tableRowClassName"
                  v-loading="searchLoding"
                >
                  <el-table-column
                    prop="id"
                    label="工单号"
                    show-overflow-tooltip
                  ></el-table-column>
                  <!-- <el-table-column
                    prop="type"
                    label="工单类别"
                  >
                    <template slot-scope="scope">
                      <span>{{ $Convert.WorkOrder.Type(scope.row.type) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="source"
                    label="工单来源"
                  >
                    <template slot-scope="scope">
                      <span>{{ $Convert.WorkOrder.Source(scope.row.source) }}</span>
                    </template>
                  </el-table-column> -->
                  <el-table-column
                    prop="level"
                    label="工单级别"
                    width="80px"
                  >
                    <template slot-scope="scope">
                      <span>{{ $Convert.WorkOrder.Level(scope.row.level) }}</span>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column
                    alt="reportTime"
                    prop="reportTime"
                    label="报单时间"
                    width="160px"
                  >
                    <template scope="scope">
                      <span>{{ $Convert.getTime(scope.row.reportTime) }}</span>
                    </template>
                  </el-table-column> -->
                  <el-table-column
                  show-overflow-tooltip
                    prop="equipmentName"
                    label="设备"
                    width="180px"
                  ></el-table-column>
                  <el-table-column
                    prop="dealUserName"
                    label="处理人"
                    width="100px"
                  ></el-table-column>
                  <el-table-column
                    label="报单时间"
                    prop="reportTime"
                    width="170px"
                  >
                    <template scope="scope">
                      <span>{{ $Convert.getTime(scope.row.reportTime) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="完成时间"
                    prop="finishTime"
                    width="170px"
                  >
                    <template scope="scope">
                      <span>{{ $Convert.getTime(scope.row.finishTime) }}</span>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column
                    prop="finishTimeSpan"
                    label="处理时长"
                    width="100px"
                  >
                    <template scope="scope">
                      <span>{{ $Convert.getTimeSpan(scope.row.finishTimeSpan, '小时') }}</span>
                    </template>
                  </el-table-column> -->
                  <el-table-column
                    prop="state"
                    label="工单状态"
                    width="80px"
                  >
                    <template scope="scope">
                      <span>
                        {{ $Convert.WorkOrder.State(scope.row.state) }}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="查看"
                    width="60px"
                  >
                    <template scope="scope">
                      <span
                        class="changkan"
                        @click="addTc('chakanLog', scope.row.no)"
                      >查看</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="fenye">
              <el-pagination
                :page-size="pageSize"
                hide-on-single-page
                @current-change="TaskGetListDataChangePage"
                layout="prev, pager, next"
                :total="SeachListData.total"
                :current-page="pageIndex"
              ></el-pagination>
            </div>
          </div>
          <div
            v-else-if="tabtaskId == '1'"
            style="height:400px"
          >
            <work-trend :hartTrend="hartTrend"></work-trend>
          </div>
        </div>
      </div>
      <div
        class="EquipmentSignal_tanchuang_ying_IT"
        v-if="WorkOrderTcShow"
      >
        <div class="tanchuang">
          <div :class="[
              WorkOrderTcType == 'selectEquipment'
                ? 'selectEq_bg'
                : WorkOrderTcType == 'chakanLog'
                ? 'gongd_tanchuang_bg'
                : '',
              'tanchuang_bg'
            ]">
            <div class="tanchuang_top">
              <img
                :src="require('@/assets/image/index/partial_left.png')"
                alt
              />
              <span class="top_title margin_tc">{{
                WorkOrderTcType == 'selectEquipment'
                  ? '选择设备'
                  : WorkOrderTcType == 'chakanLog'
                  ? '查看工单'
                  : WorkOrderTcType == 'chakan'
                  ? '查看设备'
                  : WorkOrderTcType == 'bdUser'
                  ? '查看报单人'
                  : WorkOrderTcType == 'clUser'
                  ? '查看处理人'
                  : ''
              }}</span>

              <img
                :src="require('@/assets/image/index/partial_right.png')"
                alt
              />
            </div>
            <div class="tanchuang_center">
              <div class="tanchuang_center_cen">
                <div
                  class="selectEquipment"
                  v-if="WorkOrderTcType == 'selectEquipment'"
                >
                  <selectEquipment v-on:addTc="addTc"></selectEquipment>
                </div>
                <div v-else-if="WorkOrderTcType == 'chakanLog'">
                  <chakanLog
                    :no="orderNo"
                    v-on:addTc="addTc"
                  ></chakanLog>
                </div>
                <div v-else-if="WorkOrderTcType == 'chakan'">
                  <EquipmentGetModelList
                    v-if="WorkOrderTcType == 'chakan'"
                    :EquipmentGetModelNo="EquipmentGetModelNo"
                    v-on:addTc="addTc"
                  ></EquipmentGetModelList>
                </div>
                <div
                  v-else-if="
                    WorkOrderTcType == 'bdUser' || WorkOrderTcType == 'clUser'
                  "
                  class="bdUser"
                >
                  <userGetModel :applyUserNo="bdUserNo"></userGetModel>
                </div>

                <div
                  class="tanchuang_center_cen_bottom"
                  v-show="
                    WorkOrderTcType != 'selectEquipment' &&
                      WorkOrderTcType != 'chakanLog' &&
                      WorkOrderTcType != 'chakan' &&
                      WorkOrderTcType != 'bdUser' &&
                      WorkOrderTcType != 'clUser'
                  "
                >
                  <button
                    @click="WorkOrderTcType == 'add' ? PartAdd() : ''"
                    v-preventReClick="2000"
                  >
                    确认
                  </button>
                  <button @click="WorkOrderTcShow = false">取消</button>
                </div>
              </div>
            </div>
          </div>
          <div class="cancel">
            <img
              v-show="
                WorkOrderTcType != 'selectEquipment' &&
                  WorkOrderTcType != 'chakanLog'
              "
              @click="
                previous(
                  WorkOrderTcType == 'chakan'
                    ? 'chakanLog'
                    : WorkOrderTcType == 'bdUser'
                    ? 'chakanLog'
                    : WorkOrderTcType == 'clUser'
                    ? 'chakanLog'
                    : ''
                )
              "
              :src="require('@/assets/image/index/withdrawal.png')"
              alt
            />
            <img
              @click="WorkOrderTcShow = false"
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
import pottingTab from '../../components/index/potting-tab.vue'
import workTrend from './components/work-trend.vue'
export default {
  components: { pottingTab, workTrend },
  data() {
    return {
         bdUserNo: 0, //报单人号,
      SeachListData: {
        list: [],
        total: 0,
      },
      hartTrend: {
        dayList: [],
        hourList: [],
      },
      orderNo: 0, //查看设备
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
      End: new Date(
        new Date(new Date().toLocaleDateString()).getTime() +
          1000 * 60 * 60 * 24
      ),
      Start: new Date(
        new Date(new Date().toLocaleDateString()).getTime() -
          30 * 1000 * 60 * 60 * 24
      ),
      SeachListData: {
        list: [],
        total: 0,
      },
      InspectionPlanData: [],
      InspectionPlanName: '所有',
      InspectionPlanId: '',
      InspeStateData: [
        {
          no: '',
          name: '所有',
        },
        {
          no: 2,
          name: '待巡检',
        },
        {
          no: 3,
          name: '巡检中',
        },
        {
          no: 4,
          name: '已巡检',
        },
        {
          no: 5,
          name: '未巡检',
        },
      ],
      InspeStateId: '', //状态
      schedulingDepartment: '所有', //所属部门：
      sDepartmentData: [], //所属部门数据：
      sDepartmentId: '', //部门id
      pageIndex: 1,
      pageSize: 12,
      WorkOrderTcShow: false,
      WorkOrderTcType: 'InspectionTask_look',
      InspectionTaskNo: 0, //巡检记录号
      searchLoding: false,
      EquipmentGetModelNo: '', //查看设备详情
      tabTask: [
        { name: '记录详情', id: '0' },
        { name: '统计分析', id: '1' },
      ],
      tabtaskId: '0',
    }
  },
  mounted() {
    this.Start = this.formatDate(this.Start)
    this.End = this.formatDate(this.End)
    console.log(this.Start, this.End);
    this.WorkOrderGetSeachList()
  },
  methods: {
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
    previous(type) {
      //返回上一步按钮

      this.WorkOrderTcShow = true
      this.WorkOrderTcType = type
    },
    pottingTabClick(id) {
      this.tabtaskId = id
    },
    async addTc(type, item) {
      if (type == 'chakanLog') this.orderNo = item
      else if (type == 'chakan'){ this.EquipmentGetModelNo = item}
else if (type == 'clUser') {
        this.bdUserNo = item
        //处理人
      } 
      this.WorkOrderTcType = type
      this.WorkOrderTcShow = true
    },
    async WorkOrderExportList() {
      const res = await this.$api.MMS.WorkOrder.WorkOrderExportList({
        startTime: this.Start,
        endTime: this.End,
        // type: 1,
      })
      if (res) {
        var blob = new Blob([res])
        var a = document.createElement('a')
        a.download = '保养工单.xlsx'
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
    getTreeData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].children.length == 0) {
          // children若为空数组，则将children设为undefined
          data[i].children = undefined
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children)
        }
      }
      return data
    },
    async sDepartmentChane(name) {
      //所属部门change事件
      let res = ''
      for (var i = 0; i < name.length; i++) {
        res = name[i].name
        this.sDepartmentId = name[i].id
      }

      if (res == this.schedulingDepartment) {
        return
      }
      this.schedulingDepartment = res
    },
    InspectionTaskGetListChane(e) {
      this.InspectionPlanId = e
    },
    async GetChartTrend() {
      const res = await this.$api.MMS.WorkOrder.GetMaintainChartTrend({
        startTime: this.Start,
        endTime: this.End,
        type: 1,
      })
      if (res.ok) {
        this.hartTrend = res.data
      }
    },
    async WorkOrderGetSeachList() {
      this.searchLoding = true

      const res = await this.$api.MMS.WorkOrder.MaintainWorkOrder({
        startTime: this.Start,
        endTime: this.End,
        // type: 1,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      })
      if (res.ok) {
        this.searchLoding = false
        this.GetChartTrend()

        if (res.data.total > 0) {
          this.SeachListData = res.data
        } else {
          this.$Tools.LayerMsgErr('没有数据')
          this.SeachListData = {
            list: [],
            total: 0,
          }
        }
      } else {
        this.searchLoding = false
      }
    },
    TaskGetListDataChangePage(e) {
      this.pageIndex = e
      this.WorkOrderGetSeachList()
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
@import './styles/InspectionTask.scss';
</style>
<style lang="scss">
.EquipmentSignal_tanchuang_ying_IT {
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: -11.3vh;
  left: -26vw;
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
    .selectEq_bg {
      width: 50vw !important;
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
        margin: 12px 0px;
        .tanchuang_center_cen {
          overflow: auto;
          height: 50vh;

          //查看
          .InspectionTask {
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
            :nth-child(1) {
              margin-right: 1.56vw;
            }
          }
        }
      }
    }

    .cancel {
      > img {
        cursor: pointer;
        margin: 0 7px;
      }
    }
  }
}
</style>
