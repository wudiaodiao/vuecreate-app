<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-03-09 15:55:06
 * @LastEditors: Please set LastEditors
 * @Description: 工单记录
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->
<template>
  <div class="public_body">
    <div
      class="alarmManagement_daohan"
      v-show="SeachListData.total > 0"
    >
      <ul>
        <li
          v-for="item in worklist"
          :key="item.name"
        >
          <a
            :class="[workNameId === item.id ? 'daohanactive' : '']"
            @click="workClick(item.id)"
            href="javascript:;"
          >{{ item.name }}</a>
        </li>
      </ul>
    </div>
    <div class="WorkOrderQuery_cneter">
      <div :class="['public_page', $store.state.dtab ? 'index_off' : 'index_no']">
        <div class="WorkOrderQuery_main">
          <div v-if="workNameId == '0'">
            <div class="WorkOrderQuery_main_top">
              <div class="baojin_center_top">
                <ul>
                  <li class="baojin_center_top_riqishij">
                    <span class="baojin_center_top_baojin_Time">报单时间：</span>
                    <el-date-picker
                      v-model="Start"
                      type="datetime"
                      placeholder="选择日期时间"
                      value-format='yyyy-MM-dd HH:mm:ss'
                        format="yyyy-MM-dd HH:mm:ss"
                      align="left"
                      :picker-options="pickerOptions"
                      :clearable="false"
                    ></el-date-picker>
                    <span class="shunline">-</span>
                    <el-date-picker
                      v-model="End"
                      type="datetime"
                      value-format='yyyy-MM-dd HH:mm:ss'
                        format="yyyy-MM-dd HH:mm:ss"
                      placeholder="选择日期时间"
                      align="left"
                      :picker-options="pickerOptions"
                      :clearable="false"
                    ></el-date-picker>
                  </li>
                  <li>
                    <span class="span">工单类别：</span>
                    <el-select
                      v-model="oCategoryName"
                      placeholder="所有"
                      @change="oCategoryChane"
                    >
                      <el-option
                        class="ss"
                        v-for="oCategory in orderCategory"
                        :key="oCategory.id"
                        :label="oCategory.name"
                        :value="oCategory.name"
                      ></el-option>
                    </el-select>
                  </li>
                  <li>
                    <span class="span">工单状态：</span>
                    <el-select
                      v-model="oStateName"
                      placeholder="所有"
                      @change="oStateChane"
                    >
                      <el-option
                        v-for="item in orderState"
                        :key="item.value"
                        :label="item.key"
                        :value="item.key"
                      ></el-option>
                    </el-select>
                  </li>
                  <li>
                    <span class="span">设备：</span>
                    <span class="selectFile_sub">{{
                      EquipmentInputName != '' ? EquipmentInputName : '所有'
                    }}</span>
                    <a
                      href="javascript:;"
                      class="smallbluebutton one_a"
                      v-show="
                        EquipmentInputName != undefined &&
                          EquipmentInputName != ''
                      "
                      @click="
                        EquipmentInputName = ''
                        EquipmentInputNameNo = ''
                      "
                    >X</a>
                    <a
                      href="javascript:;"
                      @click="addTc('selectEquipment', '')"
                      class="smallbluebutton"
                    >...</a>
                  </li>

                  <li>
                    <span
                      class="chaxun"
                      @click="
                       chaxun
                      "
                    >查询</span>
                  </li>
                </ul>
              </div>
            </div>

            <div
              class="WorkOrderQuery_main_daochu"
              v-if="addSheId == 0 && SeachListData.total > 0"
            >
              <div class="daochu_right">
                <span
                  class="chu"
                  @click="WorkOrderExportList()"
                >导出</span>
              </div>
            </div>
            <div>
              <potting-tab
                :tabData="addEvent"
                v-on:pottingTabClick="pottingTabClick"
              ></potting-tab>
              <div
                v-if="addSheId == 0"
                class="WorkOrderQuery_main_zhon"
              >
                <div class="WorkOrderQuery_main_list">
                  <!-- @sort-change="changeorder()" -->

                  <el-table
                    :data="SeachListData.list"
                    style="width: 100%"
                    :row-class-name="tableRowClassName"
                    v-loading="searchLoding"
                  >
                    <el-table-column
                      prop="id"
                      label="工单号"
                    ></el-table-column>
                    <el-table-column
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
                    </el-table-column>
                    <el-table-column
                      prop="level"
                      label="工单级别"
                      width="80px"
                    >
                      <template slot-scope="scope">
                        <span>{{ $Convert.WorkOrder.Level(scope.row.level) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      show-overflow-tooltip
                      alt="reportTime"
                      prop="reportTime"
                      label="报单时间"
                      width="160px"
                    >
                      <template scope="scope">
                        <span>{{ $Convert.getTime(scope.row.reportTime) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="reportUserName"
                      label="报单人"
                      width="80px"
                    ></el-table-column>
                    <el-table-column
                      prop="dealUserName"
                      label="处理人"
                      width="80px"
                    ></el-table-column>
                    <el-table-column
                      label="派单时长"
                      prop="dispatchTimeSpan"
                      width="100px"
                    >
                      <template scope="scope">
                        <span>{{ $Convert.getTimeSpan(scope.row.dispatchTimeSpan, '小时') }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="接单时长"
                      prop="receiveTimeSpan"
                      width="100px"
                    >
                      <template scope="scope">
                        <span>{{ $Convert.getTimeSpan(scope.row.receiveTimeSpan, '小时') }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="finishTimeSpan"
                      label="处理时长"
                      width="100px"
                    >
                      <template scope="scope">
                        <span :style="color12(scope.row)">{{ $Convert.getTimeSpan(scope.row.finishTimeSpan, '小时') }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                key="1"
                label="超出时长"
                
              >
              <!-- sortable -->
              <template
                        slot="header"
                        slot-scope="scope"
                        class="retort_time"
                      >
                        超出时长
                        <span style="cursor: pointer;" @click="changeorder()">
                          <i
                            class="el-icon-caret-top"
                            :class="color1 == 1 ? 'icon1' : ''"
                            style="position: relative;
                              right: 0;
                          top: -5px;"
                          ></i>
                          <i
                            class="el-icon-caret-bottom"
                            :class="color1 == 2 ? 'icon1' : ''"
                            style="position: relative;
                          left: -14px;
                          top: 2px;"
                          ></i>
                        </span>
                      </template>
                <template scope="scope">
                  <span :style="color12(scope.row)">{{ color2(scope.row.finishTimeSpan) }}</span>
                </template>
              </el-table-column>
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
                <div class="fenye">
                  <el-pagination
                    :page-size="pageSize"
                    :current-page="pageIndex"
                    hide-on-single-page
                    @current-change="SeachListDataChangePage"
                    layout="prev, pager, next"
                    :total="SeachListData.total"
                  ></el-pagination>
                </div>
              </div>
              <div v-else-if="addSheId == '1'">
                <work-trend :hartTrend="hartTrend"></work-trend>
              </div>
            </div>
          </div>

          <div v-else-if="workNameId == '1'">
            <work-level></work-level>
          </div>
          <div v-else-if="workNameId == '2'">
            <work-duration></work-duration>
          </div>
        </div>
      </div>
      <div
        class="EquipmentSignal_tanchuang_ying"
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
                  : WorkOrderTcType == 'bdWxUser'
                  ? '查看报单人'
                 : WorkOrderTcType == 'contract'
                  ? '查看报单店铺'
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
                  v-else-if=" WorkOrderTcType == 'bdWxUser'"
                  class="bdUser"
                >
                  <wxUserGetModel :applyUserNo="bdWxUserNo"></wxUserGetModel>
                </div>
                <div
                  v-else-if=" WorkOrderTcType == 'contract'"
                  class="bdUser"
                >
                  <contractGetModel :applyUserNo="contractNo"></contractGetModel>
                </div>

                <div
                  class="tanchuang_center_cen_bottom"
                  v-show="
                    WorkOrderTcType != 'selectEquipment' &&
                      WorkOrderTcType != 'chakanLog' &&
                      WorkOrderTcType != 'chakan' &&
                      WorkOrderTcType != 'bdUser' &&
                      WorkOrderTcType != 'clUser'&&
                      WorkOrderTcType != 'bdWxUser'&&
                      WorkOrderTcType != 'contract'
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
                    : WorkOrderTcType == 'bdWxUser'
                    ? 'chakanLog'
                    : WorkOrderTcType == 'contract'
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
import contractGetModel from '../../components/index/contractGetModel.vue'
import wxUserGetModel from '../../components/index/wxUserGetModel.vue'
import pottingTab from '../../components/index/potting-tab.vue'
import workLevel from './components/work-level.vue'
import workTrend from './components/work-trend.vue'
import workDuration from './components/work-duration.vue'

import DateTime from '@/js/datetime'

export default {
  components: {
    contractGetModel,
    wxUserGetModel,
    pottingTab,
    workLevel,
    workTrend,
    workDuration,
  },
  data() {
    return {
      DateTime: DateTime,
      order1:true,
      addEvent: [
        { name: '记录详情', id: '0' },
        { name: '工单趋势', id: '1' },
      ], //选择设备与手动输入
      addSheId: '0',
      workNameId: '0',
      worklist: [
        {
          name: '工单记录',
          id: '0',
        },
        {
          name: '工单级别',
          id: '1',
        },
        {
          name: '工单处理时长',
          id: '2',
        },
      ],
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
          return time.getTime() > Date.now() 
        },
      },
      End: new Date(
        new Date(new Date().toLocaleDateString()).getTime() +
          1000 * 60 * 60 * 24
      ),
      Start: new Date(
        new Date(new Date().toLocaleDateString()).getTime() -
          6 * 1000 * 60 * 60 * 24
      ),
      SeachListData: {
        list: [],
        total: 0,
      },
      orderCategory: [
        {
          id: '',
          name: '所有',
        },
        // {
        //   id: 1,
        //   name: '保养工单',
        // },
        {
          id: 2,
          name: '报修工单',
        },
        {
          id: 3,
          name: '报事工单',
        }
      ], //工单类别
      oCategoryName: '', //类别名称
      oCategoryNameId: '',
      Interval:'',
      orderState: [
        {
          value: '',
          key: '所有',
        },
        {
          value: 1,
          key: '已报单',
        },
        {
          value: 2,
          key: '已派单',
        },
        {
          value: 3,
          key: '已转单',
        },
        {
          value: 4,
          key: '已废单',
        },
        {
          value: 5,
          key: '已接单',
        },
        {
          value: 6,
          key: '已到场',
        },
        {
          value: 7,
          key: '已退单',
        },
        {
          value: 8,
          key: '已挂单',
        },
        {
          value: 9,
          key: '取消挂单',
        },
        {
          value: 10,
          key: '已完成',
        },
        {
          value: 11,
          key: '已确认',
        },
      ], //状态
      oStateName: '',
      oStateNameId: '',
      i:0,
      color1:3,
      chaoshi: '',
      pageSize: 12,
      pageIndex: 1,
      EquipmentInputName: '', //设备名
      EquipmentInputNameNo: '', //设备号
      WorkOrderTcShow: false,
      WorkOrderTcType: 'add',
      orderNo: 0, //查看设备
      EquipmentGetModelNo: '', //查看设备详情
      bdUserNo: 0, //报单人号,
      bdWxUserNo: 0,
      contractNo: 0,
      searchLoding: false, //查询加载
      hartTrend: {
        dayList: [],
        hourList: [],
      },
      
    }
  },
  mounted() {
    this.getchaoshi()
    this.WorkOrderGetSeachList()
  this.Interval = setInterval(() => {
       if (this.color1 == 1) {
        this.order1 = true
        this.WorkOrderGetSeachList2()
      }
      if (this.color1 == 2) {
        this.order1 = false
        this.WorkOrderGetSeachList2()
      }
      if (this.color1 == 3) {
        this.order1 = ''
        this.WorkOrderGetSeachList()
      }
    }, 60000);
  },
    destroyed() {
   
    clearInterval(this.Interval)
  },
  methods: {
    chaxun(){
       this.pageIndex = 1
     
       if (this.color1 == 1) {
        this.order1 = true
        this.WorkOrderGetSeachList2()
      }
      if (this.color1 == 2) {
        this.order1 = false
        this.WorkOrderGetSeachList2()
      }
      if (this.color1 == 3) {
        this.order1 = ''
        this.WorkOrderGetSeachList()
      }
    },
    changeorder(column, prop, order) {
     
     if (this.color1 == 1) {
      this.color1 = 2
        this.order1 = false
        this.WorkOrderGetSeachList2()
      }else{
        this.color1 = 1
        this.order1 = true
        this.WorkOrderGetSeachList2()
      }
     
    
 
    },
     async getchaoshi() {
      const res = await this.$api.MMS.Project.GetModel({})
      //获取所有部门
      if (res.ok) {
        // this.ProjectGetModelDataClone = JSON.parse(JSON.stringify(res.data)) //深拷贝数据给弹窗
        let obj = { ...res.data }

        this.chaoshi = obj[8].value - 0
       
      }
    },
    color12(val) {
      // console.log(val);
      if (val.type == 1) {
        return 'color:#fff;'
      }
      if (val.finishTimeSpan && val.finishTimeSpan > this.chaoshi) {
        return 'color:red;'
      } else {
        return 'color:#fff;'
      }
    },
    color2(val) {
      if (val && val > this.chaoshi) {
        let abs= (val - this.chaoshi).toFixed(2)
        return  this.$Convert.getTimeSpan(abs,'小时')
      } else {
        return ' '
      }
      
    },
    async GetChartTrend() {
      const res = await this.$api.MMS.WorkOrder.GetChartTrend({
        startTime: this.Start,
        endTime: this.End,
        type: this.oCategoryNameId,
        state: this.oStateNameId,
        equipmentNo: this.EquipmentInputNameNo,
      })
      if (res.ok) {
        this.hartTrend = res.data
      }
    },
    pottingTabClick(id) {
      this.addSheId = id
    },
    workClick(id) {
      this.workNameId = id
    },
    async WorkOrderExportList() {
      const res = await this.$api.MMS.WorkOrder.ExportList({
        startTime: this.Start,
        endTime: this.End,
        type: this.oCategoryNameId,
        state: this.oStateNameId,
        equipmentNo: this.EquipmentInputNameNo,
      })
      if (res) {
        var blob = new Blob([res])
        var a = document.createElement('a')
        a.download = '工单查询.xlsx'
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
    previous(type) {
      //返回上一步按钮
      this.WorkOrderTcShow = true
      this.WorkOrderTcType = type
    },
    async WorkOrderGetSeachList() {
      this.searchLoding = true

      const res = await this.$api.MMS.WorkOrder.GetSeachList({
       
        startTime: this.Start,
        endTime: this.End,
        type: this.oCategoryNameId,
        state: this.oStateNameId,
        equipmentNo: this.EquipmentInputNameNo,
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
        async WorkOrderGetSeachList2() {
      this.searchLoding = true

      const res = await this.$api.MMS.WorkOrder.GetSeachList({
        propertyName:  'finishTimeSpan',
        isDesc: this.order1,
        startTime: this.Start,
        endTime: this.End,
        type: this.oCategoryNameId,
        state: this.oStateNameId,
        equipmentNo: this.EquipmentInputNameNo,
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
    async addTc(type, item) {
      if (type == 'selectEquipment') {
      } else if (type == 'add') {
        if (item === '') {
          //清空选择的值
        } else {
          this.EquipmentInputName = item.name
          this.EquipmentInputNameNo = item.no
          return (this.WorkOrderTcShow = false)
        }
      } else if (type == 'chakanLog') {
        this.orderNo = item
      } else if (type == 'chakan') {
        this.EquipmentGetModelNo = item
      } else if (type == 'bdUser') {
        this.bdUserNo = item
      } else if (type == 'clUser') {
        this.bdUserNo = item
        //处理人
      } else if (type == 'bdWxUser') {
        this.bdWxUserNo = item
      } else if (type == 'contract') {
        this.contractNo = item
      }
      this.WorkOrderTcType = type
      this.WorkOrderTcShow = true
    },

    oCategoryChane(e) {
      for (let item in this.orderCategory) {
        if (e == this.orderCategory[item].name) {
          this.oCategoryNameId = this.orderCategory[item].id
        }
      }
    },
    oStateChane(e) {
      for (let item in this.orderState) {
        if (e == this.orderState[item].key) {
          this.oStateNameId = this.orderState[item].value
        }
      }
    },
    SeachListDataChangePage(e) {
      this.pageIndex = e
     if (this.color1 == 1) {
        this.order1 = true
        this.WorkOrderGetSeachList2()
      }
      if (this.color1 == 2) {
        this.order1 = false
        this.WorkOrderGetSeachList2()
      }
      if (this.color1 == 3) {
        this.order1 = ''
        this.WorkOrderGetSeachList()
      }
      // this.WorkOrderGetSeachList() //分页查询
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
@import './styles/WorkOrderQuery.scss';
</style>
<style lang="scss">
.EquipmentSignal_tanchuang_ying {
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
        margin: 2vh 0;
        .tanchuang_center_cen {
          overflow: auto;
          height: 50vh;

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
<style>
.icon1 {
  color: #0069b7;
}
</style>
