<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-02-22 17:40:43
 * @LastEditors: Please set LastEditors
 * @Description:工单管理
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->
<template>
  <div class="public_body">
    <div class="Part_cneter">
      <div class="Partlist_left">
        <ul>
          <li
            v-for="(tab,index) in tabs"
            :key="tab.id"
            @click="onTabClick(index)"
          >
            <el-badge
              :value="tab.count"
              class="item"
            >
              <span :class="[tabIndex == index ? 'active' : '']">{{tab.name}}</span>
            </el-badge>
            <div
              class="line1"
              v-show="index != tabs.length - 1"
            ></div>
          </li>
        </ul>
      </div>
      <div :class="['public_page', $store.state.dtab ? 'index_off' : 'index_no']">
        <div class="Partlist_main">
          <div class="WorkOrder_add">
            <button @click="queryData()">
              刷新
            </button>
          </div>
          <div class="WorkOrder_list">
            <el-table
              :data="list"
              style="width: 100%"
              @sort-change="changeorder()"
              ref="table"
              :row-class-name="tableRowClassName"
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
                width="90px"
              >
                <template scope="scope">
                  <span>{{ $Convert.getTimeSpan(scope.row.dispatchTimeSpan, '小时') }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="接单时长"
                prop="receiveTimeSpan"
                width="90px"
              >
                <template scope="scope">
                  <span>{{ $Convert.getTimeSpan(scope.row.receiveTimeSpan, '小时') }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="finishTimeSpan"
                label="处理时长"
                width="90px"
              >
                <template scope="scope">
                  <span :style="color1(scope.row.finishTimeSpan)">{{ $Convert.getTimeSpan(scope.row.finishTimeSpan, '小时') }}</span>
                </template>
              </el-table-column>
              <el-table-column
                
                label="超出时长"
                key="1"
                sortable="custom"
                v-if="tabs[tabIndex].id == 'finished'"
              >
                <template scope="scope">
                  <span style="color:red">{{ color2(scope.row.finishTimeSpan) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="state"
                label="工单状态"
                width="80px"
                :key="Math.random()"
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
                  > 查看</span>
                </template>
              </el-table-column>
              <el-table-column
                label="重新派单"
                width="100px"
                v-if="tabs.length > 0 && tabs[tabIndex].id == 'dealing'"
              >
                <template slot-scope="scope">
                  <span
                    v-if="
                      $store.state.user && scope.row.state == 2
                    "
                    class="green"
                    @click="addTc('Distribute', scope.row.no)"
                  >重新派单</span>
                </template>
              </el-table-column>
              <el-table-column
                label="派单"
                width="60px"
                v-if="tabs.length > 0 && tabs[tabIndex].id == 'undispatched'"
              >
                <template slot-scope="scope">
                  <span
                    v-if="
                      $store.state.user
                    "
                    class="green"
                    @click="addTc('Distribute', scope.row.no)"
                  >派单</span>
                </template>
              </el-table-column>
              <el-table-column
                label="转单"
                width="60px"
                v-if="tabs.length > 0 && tabs[tabIndex].id == 'undispatched'"
              >
                <template slot-scope="scope">
                  <span
                    class="green"
                    @click="addTc('Transfer', scope.row.no)"
                  >转单</span>
                </template>
              </el-table-column>
              <el-table-column
                label="废弃"
                width="60px"
                v-if="tabs.length > 0 && tabs[tabIndex].id == 'undispatched'"
              >
                <template slot-scope="scope">
                  <span
                    v-if="$store.state.user  "
                    class="red"
                    @click="addTc('abandoned', scope.row.no)"
                  >废弃</span>
                </template>
              </el-table-column>

              <!-- <el-table-column
                label="改单"
                width="60px"
                v-if="tabs.length > 0 && tabs[tabIndex].id == 'undispatched'"
              >
                <template slot-scope="scope">
                  <span
                    v-if="$store.state.user&&scope.row.type===2"
                    class="red"
                    @click="addTc('Update', scope.row.no)"
                  >改单</span>
                </template>
              </el-table-column> -->
            </el-table>
          </div>
          <div class="fenye">
            <el-pagination
              :page-size="pageSize"
              @current-change="onPageChange"
              layout="prev, pager, next"
              :total="total"
              :current-page="pageIndex"
            ></el-pagination>
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
                : [
                    'chakanLog',
                    'Distribute',
                    'abandoned',
                    'Transfer',
                    'Dealing',
                    'Update'
                  ].indexOf(WorkOrderTcType) != -1
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
                WorkOrderTcType == 'add'
                  ? '报单'
                  : WorkOrderTcType == 'selectEquipment'
                  ? '选择设备'
                  : WorkOrderTcType == 'chakanLog'
                  ? '查看工单'
                  : WorkOrderTcType == 'chakan'
                  ? '查看设备'
                  : WorkOrderTcType == 'Distribute'
                  ? '派发工单'
                  : WorkOrderTcType == 'Transfer'
                  ? '转发工单'
                  : WorkOrderTcType == 'Dealing'
                  ? '选择用户'
                  : WorkOrderTcType == 'abandoned'
                  ? '废弃工单'
                  : WorkOrderTcType == 'bdUser'
                  ? '查看报单人'
                  : WorkOrderTcType == 'clUser'
                  ? '查看处理人'
                  : WorkOrderTcType == 'bdWxUser'
                  ? '查看报单人' :
                   WorkOrderTcType == 'AddAssister'
                  ? '添加协助人' :
                   WorkOrderTcType == 'Update'
                  ? '修改工单' :''



              }}</span>

              <img
                :src="require('@/assets/image/index/partial_right.png')"
                alt
              />
            </div>
            <div class="tanchuang_center">
              <div class="tanchuang_center_cen">
                <div
                  class="add_dianh"
                  v-if="WorkOrderTcType == 'add'"
                >
                  <div class="add_dianh_list">
                    <div class="add_dianh_list_center">
                      <ul class="PartInDb_tccenter_top formValidator">
                        <el-form
                          :model="formValidator"
                          ref="formValidator"
                          label-width="100px"
                          class="demo-dynamic"
                          :rules="rules"
                        >
                          <li class="onePartInputName">
                            <el-form-item prop="source">
                              <span>来源：</span>
                              <el-select
                                class="didian"
                                v-model="formValidator.source"
                                @change="sourceChane"
                                placeholder="请选择"
                              >
                                <el-option
                                  v-for="item in sourceData"
                                  :key="item.no"
                                  :label="item.name"
                                  :value="item.no"
                                ></el-option>
                              </el-select>
                              <i>*</i>
                            </el-form-item>
                          </li>
                          <li class="onePartInputName">
                            <el-form-item prop="subTypeNo">
                              <span>类别：</span>
                              <el-select
                                v-model="formValidator.subTypeNo"
                                placeholder="请选择"
                              >
                                <el-option-group
                                  v-for="group in subTypeData"
                                  :key="group.label"
                                  :label="group.label"
                                >
                                  <el-option
                                    v-for="item in group.options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                  >
                                  </el-option>
                                </el-option-group>
                              </el-select>
                              <i>*</i>
                            </el-form-item>
                          </li>
                          <li class="onePartInputName">
                            <el-form-item>
                              <span>设备：</span>
                              <span class="selectFile_sub">{{
                                formValidator.equipmentName
                              }}</span>
                              <a
                                href="javascript:;"
                                class="smallbluebutton one_a"
                                v-show="
                                  formValidator.equipmentName != undefined &&
                                    formValidator.equipmentName != ''
                                "
                                @click="
                                  formValidator.equipmentName = ''
                                  formValidator.equipmentNo = ''
                                "
                              >X</a>
                              <a
                                href="javascript:;"
                                @click="addTc('selectEquipment', 'workUpdate')"
                                class="smallbluebutton"
                              >...</a>
                            </el-form-item>
                          </li>
                          <li class="onePartInputName">
                            <el-form-item prop="level">
                              <span>级别：</span>
                              <el-select
                                class="didian"
                                v-model="formValidator.level"
                                @change="sdlevelDataChane"
                                placeholder="请选择"
                              >
                                <el-option
                                  v-for="item in sdlevelData"
                                  :key="item.no"
                                  :label="item.name"
                                  :value="item.no"
                                ></el-option>
                              </el-select>
                              <i>*</i>
                            </el-form-item>
                          </li>
                          <li class="tc_textarea">
                            <span>内容：</span>
                            <!--  :disabled="announcementTcType=='chankan'?true:false" -->
                            <el-input
                              type="textarea"
                              class="chakan"
                              v-model="formValidator.content"
                            ></el-input>
                          </li>
                        </el-form>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  class="selectEquipment"
                  v-else-if="WorkOrderTcType == 'selectEquipment'"
                >
                  <selectEquipment
                    :equipmentTcpage="equipmentTcpage"
                    :WorkOrderTcType="WorkOrderTcType"
                    v-on:addTc="addTc"
                  ></selectEquipment>
                </div>
                <div v-else-if="WorkOrderTcType == 'chakan'">
                  <EquipmentGetModelList
                    v-if="WorkOrderTcType == 'chakan'"
                    :EquipmentGetModelNo="EquipmentGetModelNo"
                    v-on:addTc="addTc"
                  ></EquipmentGetModelList>
                </div>
                <div v-else-if="operTypeList.indexOf(WorkOrderTcType) != -1">
                  <chakanLog
                    :no="orderNo"
                    :DealingUserName="DealingUserName"
                    :dispatchGeneralAssist="dispatchGeneralAssist"
                    :dispatchAssisters="dispatchAssisters"
                    :operType="WorkOrderTcType"
                    v-on:addTc="addTc"
                  ></chakanLog>
                </div>
                <div v-else-if="WorkOrderTcType == 'Dealing' || WorkOrderTcType == 'AddAssister'">
                  <userFormDep
                    :eqUserId="sDepartmentId"
                    :type="WorkOrderTcType"
                    v-on:addTc="addTc"
                  ></userFormDep>
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

              </div>
            </div>
          </div>
          <div class="cancel">
            <img
              v-show="
                WorkOrderTcType == 'selectEquipment' ||
                  WorkOrderTcType == 'chakan' ||
                  WorkOrderTcType == 'Dealing' ||
                  WorkOrderTcType == 'AddAssister' ||
                  WorkOrderTcType == 'bdUser' ||
                  WorkOrderTcType == 'clUser'||
                  WorkOrderTcType == 'bdWxUser'
              "
              :src="require('@/assets/image/index/withdrawal.png')"
              @click="
                previous(
                  WorkOrderTcType == 'selectEquipment'
                    ? 'Update'
                    : operTypeList.indexOf(eqType) != -1
                    ? eqType
                    : (WorkOrderTcType == 'Dealing'  || WorkOrderTcType == 'AddAssister')
                    ? 'Distribute'
                    : ''
                )
              "
              alt
            />
            <img
              @click="WorkOrderTcShow = false;updateEquipment={}"
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
import wxUserGetModel from '../../components/index/wxUserGetModel.vue'
import userFormDep from '../../components/index/userFormDep'
import DateTime from '@/js/datetime'
export default {
  components: {
    userFormDep,
    wxUserGetModel,
  },
  data() {
    return {
      order1:true,
      operTypeList: [
        'chakanLog',
        'Distribute',
        'abandoned',
        'Transfer',
        'Update',
      ],
      DateTime: DateTime,
      formValidator: {
        equipmentName: '',
        equipmentNo: '',
        subTypeNo: '',
        source: '',
        level: '',
        content: '',
      },
      rules: {
        subTypeNo: [
          { required: true, message: '请选择类别', trigger: 'change' },
        ],
        level: [{ required: true, message: '请选择级别', trigger: 'change' }],
        source: [{ required: true, message: '请选择来源', trigger: 'change' }],
      },
      list: [],
      total: 0,
      pageIndex: 1,
      pageSize: 13,
      tabIndex: 0,
      tabs: [],
      WorkOrderTcShow: false,
      WorkOrderTcType: 'add',
      addsheb: [
        { name: '选择设备', id: '1' },
        { name: '手动输入', id: '2' },
      ], //选择设备与手动输入
      addSheName: '选择设备',
      sourceData: [
        {
          no: 2,
          name: '电话报单',
        },
        {
          no: 3,
          name: 'Web报单',
        },
      ],
      levelData: [
        { no: 1, name: '提示' },
        { no: 2, name: '一般' },
        { no: 3, name: '重要' },
        { no: 4, name: '紧急' },
      ], //级别
      levelNo: 1, //级别号
      sourceNameNo: '',
      categoryData: [
        { no: 11, name: '电话报修工单' },
        { no: 41, name: '电话报事工单' },
      ], //类别

      sdlevelData: [
        { no: 1, name: '提示' },
        { no: 2, name: '一般' },
        { no: 3, name: '重要' },
        { no: 4, name: '紧急' },
      ],
      subTypeData: [
        {
          label: '报修工单',
          type: 2,
          options: [],
        },
      ],
      orderNo: '', //查看设备
      EquipmentGetModelNo: '', //查看设备详情
      //派单
      workFlow: [], //流程
      EquipmentGetModelListLog: {}, //获取记录详情
      //部门
      schedulingDepartment: '', //所属部门：
      sDepartmentData: [], //所属部门数据：
      sDepartmentId: '.', //部门id
      OrderNo: 0, //派单号
      abandonedinput: '',
      bdUserNo: 0, //报单人号,
      bdWxUserNo: 0,
      eqType: '', //控制查看设备后返回
      timer: '',
      depaIdUser: [], //根据部门获取用户
      equipmentTcpage: null,
      updateEquipment: {},
      chaoshi: '',
      nianjian: '',
      dispatchAssisters: [],
      dispatchGeneralAssist: false,
      Interval:''
    }
  },
  mounted() {
         this.$nextTick(() => {
	this.$refs.table.doLayout()
})
    var tabs = [
      {
        id: 'undispatched',
        name: '待派单',
        count: 0,
        timeStamp: 0,
        privilege: 'DispatchWorkOrder',
      },
      {
        id: 'undealed',
        name: '待处理',
        count: 0,
        timeStamp: 0,
        privilege: 'DealWorkOrder',
      },
      {
        id: 'dealing',
        name: '处理中',
        count: null,
        timeStamp: 0,
        privilege: 'ViewWorkOrder',
      },
      {
        id: 'finished',
        name: '已完成',
        count: null,
        privilege: 'ViewWorkOrder',
      },
    ]
    for (var i = 0; i < tabs.length; i++) {
      var tab = tabs[i]
      if (
        this.$store.state.userGetUserRole.resList.indexOf(tab.privilege) != -1
      )
        this.tabs.push(tab)
    }
   this.getquerys()
    this.WorkSubTypeGet()
    this.queryData()
     this.Interval = setInterval(() => {
      this.queryData()
    }, 60000);
    if (this.timer) clearInterval(this.timer)
    this.checkUpdate()
    this.timer = setInterval(() => {
      this.checkUpdate()
    }, 3000)
  },

  destroyed() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
     clearInterval(this.Interval)
  },
  methods: {
    getquerys(){
      let href = window.location.href;
      // 从占位符开始截取路由（不包括占位符）
      let query = href.substring(href.indexOf("?") + 1);
   
      // 根据 & 切割字符串
    // if(query){
        let vars = query.split("&");
        // console.log(vars);
        let vars2 = vars[0].split("=")[1]
// console.log(vars2);
if(vars2!=undefined){
        this.onTabClick(vars2)
}
        // 
    // }
   
    },
    changeorder(column, prop, order) {
      console.log(column, prop, order);
        if (this.order1) {
        this.order1=false
      } else {
         this.order1=true
      }
      this.queryFinishedData(true)
    },
    color1(val) {
      if (val && val > this.chaoshi) {
        return 'color:red;'
      } else {
        return 'color:#fff;'
      }
    },
    color2(val) {
      if (val && val > this.chaoshi) {
        return (val - this.chaoshi).toFixed(2) + '小时'
      } else {
        return ' '
      }
      
    },
    async getchaoshi() {
      const res = await this.$api.MMS.Project.GetModel({})
      //获取所有部门
      if (res.ok) {
        // this.ProjectGetModelDataClone = JSON.parse(JSON.stringify(res.data)) //深拷贝数据给弹窗
        let obj = { ...res.data }

        this.chaoshi = obj[8].value - 0
        this.nianjian = obj[9].value - 0
        // console.log(this.ProjectGetModelData);
        console.log(this.chaoshi, this.nianjian)
      }
    },
    checkUpdate() {
      this.$api.MMS.WorkOrder.GetProcessingInfo().then((res) => {
        if (res.ok) {
          for (let i = 0; i < this.tabs.length; i++) {
            var tab = this.tabs[i]
            if (tab.id == 'undispatched') {
              if (
                tab.count != res.data.undispatchedCount ||
                tab.timeStamp != res.data.undispatchedTimeStamp
              ) {
                tab.count = res.data.undispatchedCount
                tab.timeStamp = res.data.undispatchedTimeStamp
                if (this.tabIndex == i) this.queryUndispatchedData()
              }
            } else if (tab.id == 'undealed') {
              if (
                tab.count != res.data.undealedCount ||
                tab.timeStamp != res.data.undealedTimeStamp
              ) {
                tab.count = res.data.undealedCount
                tab.timeStamp = res.data.undealedTimeStamp
                if (this.tabIndex == i) this.queryUndealedData()
              }
            }
          }
        }
      })
    },
    async WorkSubTypeGet() {
      const res = await this.$api.MMS.WorkSubType.Get({})
      if (res.ok) {
        let data = res.data
        for (let i in data) {
          if (data[i].type == 2) {
            this.subTypeData[0].options.push({
              value: data[i].no,
              label: data[i].name,
              departmentId: data[i].departmentId,
              departmentName: data[i].departmentName,
            })
          }
        }
      }
    },
    //废弃工单
    async WorkOrderDiscard(item) {
      const res = await this.$api.MMS.WorkOrder.Discard(item)
      if (res.ok) {
        this.WorkOrderTcShow = false
        this.$Tools.LayerMsgInfo('成功')
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    // 转单
    async WorkOrderTransfer(item) {
      const res = await this.$api.MMS.WorkOrder.Transfer(item)
      if (res.ok) {
        this.WorkOrderTcShow = false
        this.$Tools.LayerMsgInfo('成功')
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    //改单
    async UpdateProcessingUndispatched(item) {
      const res = await this.$api.MMS.WorkOrder.UpdateProcessingUndispatched(
        item
      )
      if (res.ok) {
        this.updateEquipment = {}
        this.WorkOrderTcShow = false
        this.$Tools.LayerMsgInfo('成功')
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    //派发工单
    async WorkOrderDispatch(item, assisterNos) {
      const res = await this.$api.MMS.WorkOrder.Dispatch(item, assisterNos)
      if (res.ok) {
        this.queryData()
        this.WorkOrderTcShow = false
        this.$Tools.LayerMsgInfo('成功')
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    sdlevelDataChane(e) {
      for (let item in this.sdlevelData) {
        if (e == this.sdlevelData[item].name) {
          this.levelNo = this.sdlevelData[item].no
        }
      }
    },
    sourceChane(e) {
      for (let item in this.sourceData) {
        if (e == this.sourceData[item].name) {
          this.sourceNameNo = this.categoryData[item].no
        }
      }
    },
    previous(type) {
      //返回上一步按钮
      this.WorkOrderTcShow = true
      this.WorkOrderTcType = type
    },
    addsheClick(name) {
      //选择设备与手动输入
      this.addSheName = name
    },
    async addTc(type, item) {
      if (type == 'add') {
        if (item === '') {
          //清空选择的值
          this.formValidator.equipmentName = ''
          this.formValidator.equipmentNo = ''
          this.formValidator.level = ''
          this.formValidator.content = ''
          this.formValidator.subTypeNo = ''
          this.formValidator.source = ''
          this.DealingUserNo = ''
          this.DealingUserName = ''
          this.dispatchAssisters = []
          this.dispatchGeneralAssist = false
        } else {
          this.formValidator.equipmentName = item.name
          this.formValidator.equipmentNo = item.no
        }
      } else if (type == 'selectEquipment') {
        this.equipmentTcpage = item
      } else if (this.operTypeList.indexOf(type) != -1) {
        if (item instanceof Object) {
          switch (type) {
            case 'abandoned':
              if (!item.content) return this.$Tools.LayerMsgErr('说明必填')
              this.WorkOrderDiscard({
                content: item.content,
                no: this.orderNo,
              })
              return
            case 'Transfer':
              if (!item.departmentId)
                return this.$Tools.LayerMsgErr('处理部门必填')
              if (!item.content) return this.$Tools.LayerMsgErr('说明必填')
              this.WorkOrderTransfer({
                dealDepartmentId: item.departmentId,
                description: item.content,
                no: this.orderNo,
              })
              return
            case 'Distribute':
              if (!this.DealingUserNo) this.$Tools.LayerMsgErr('处理人必填')

              this.WorkOrderDispatch(
                {
                  dealUserNo: this.DealingUserNo,
                  generalAssist: this.dispatchGeneralAssist,
                  no: this.orderNo,
                },
                this.dispatchAssisters.map((assister) => assister.userNo)
              )
              return
            case 'Update':
              console.log(item)
              let updateObj = {
                no: this.orderNo,
                equipmentNo: item.equipmentNo || null,
                subTypeNo: item.subTypeNo,
              }
              this.UpdateProcessingUndispatched(updateObj)
              return
            default:
              break
          }
        } else {
          this.DealingUserNo = ''
          this.DealingUserName = ''
          this.dispatchAssisters = []
          this.dispatchGeneralAssist = false
          this.eqType = type
          this.orderNo = item
        }
      } else if (type == 'Dealing') {
        if (item instanceof Object) {
          for (let i = 0; i < this.dispatchAssisters.length; i++) {
            let assister = this.dispatchAssisters[i]
            if (assister.userNo == item.no) {
              this.$Tools.LayerMsgErr('协助人不能与处理人重复')
              return
            }
          }

          type = 'Distribute'
          this.DealingUserName = item.name
          this.DealingUserNo = item.no
        } else {
          this.sDepartmentId = item
        }
      } else if (type == 'AddAssister') {
        if (item instanceof Object) {
          if (item.no == this.DealingUserNo) {
            this.$Tools.LayerMsgErr('协助人不能与处理人重复')
            return
          }

          for (let i = 0; i < this.dispatchAssisters.length; i++) {
            let assister = this.dispatchAssisters[i]
            if (assister.userNo == item.no) {
              this.$Tools.LayerMsgErr('协助人已存在')
              return
            }
          }

          type = 'Distribute'
          this.dispatchAssisters.push({
            userNo: item.no,
            userName: item.name,
          })
        } else {
          this.sDepartmentId = item
        }
      } else if (type == 'RemoveAssister') {
        this.dispatchAssisters.splice(item, 1)
        return
      } else if (type == 'ChangeGeneralAssist') {
        this.dispatchGeneralAssist = item
        return
      } else if (type == 'removeUser') {
        console.log('removeUser')
        this.DealingUserName = ''
        this.DealingUserNo = ''
        return
      } else if (type == 'chakan') {
        this.EquipmentGetModelNo = item
      } else if (type == 'bdUser') {
        this.bdUserNo = item
      } else if (type == 'clUser') {
        this.bdUserNo = item
        //处理人
      } else if (type == 'cancel') {
        this.WorkOrderTcShow = false
        return
      } else if (type == 'bdWxUser') {
        this.bdWxUserNo = item
      } else if (type == 'workUpdate') {
        type = 'Update'
        this.updateEquipment = item
      }

      this.WorkOrderTcType = type
      this.WorkOrderTcShow = true
    },
    onTabClick(index) {
      console.log(index)
      if (index == 3) {
        this.getchaoshi()
      }
      this.tabIndex = index
      this.pageIndex = 1
      this.queryData()
    },
    queryData() {
      this.pageIndex = 1
      this.list = []
      var tab = this.tabs[this.tabIndex]
      switch (tab.id) {
        case 'undispatched':
          this.queryUndispatchedData()
          break
        case 'undealed':
          this.queryUndealedData()
          break
        case 'dealing':
          this.queryDealingData()
          break
        case 'finished':
          this.queryFinishedData()
          break
      }
    },
    async queryUndispatchedData() {
      const res =
        await this.$api.MMS.WorkOrder.GetProcessingUndispatchedPagedList({
          pageIndex: this.pageIndex - 1,
          pageSize: this.pageSize,
        })
      if (res.ok) {
        this.total = res.data.total
        this.list = res.data.list
        if (res.data.total == 0) this.$Tools.LayerMsgErr('没有数据')
        this.$nextTick(() => {
	this.$refs.table.doLayout()
})
      }
    },
    async queryUndealedData() {
      const res = await this.$api.MMS.WorkOrder.GetProcessingUndealedPagedList({
        pageIndex: this.pageIndex - 1,
        pageSize: this.pageSize,
      })
      if (res.ok) {
        this.total = res.data.total
        this.list = res.data.list
        if (res.data.total == 0) this.$Tools.LayerMsgErr('没有数据')
        this.$nextTick(() => {
	this.$refs.table.doLayout()
})
      }
    },
    async queryDealingData() {
      const res = await this.$api.MMS.WorkOrder.GetProcessingDealingPagedList({
        pageIndex: this.pageIndex - 1,
        pageSize: this.pageSize,
      })
      if (res.ok) {
        this.total = res.data.total
        this.list = res.data.list
        if (res.data.total == 0) this.$Tools.LayerMsgErr('没有数据')
        this.$nextTick(() => {
	this.$refs.table.doLayout()
})
      }
    },
    async queryFinishedData(val) {
      const res = await this.$api.MMS.WorkOrder.GetProcessingFinishedPagedList({
        propertyName: val?'finishTimeSpan':'',
        isDesc:this.order1,
        pageIndex: this.pageIndex - 1,
        pageSize: this.pageSize,
      })
      if (res.ok) {
        this.total = res.data.total
        this.list = res.data.list
        if (res.data.total == 0) this.$Tools.LayerMsgErr('没有数据')
        this.$nextTick(() => {
	this.$refs.table.doLayout()
})
      }
    },
    onPageChange(e) {
      this.pageIndex = e
      var tab = this.tabs[this.tabIndex]
      switch (tab.id) {
        case 'undispatched':
          this.queryUndispatchedData()
          break
        case 'undealed':
          this.queryUndealedData()
          break
        case 'dealing':
          this.queryDealingData()
          break
        case 'finished':
          this.queryFinishedData()
          break
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) return 'warning-row'
      else return 'success-row'
    },
  },
}
</script>
<style lang="scss" scoped>
@import './styles/WorkOrder.scss';
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
          .add_dianh {
            margin: 0 24px;
            text-align: left;
            .add_dianh_list {
              margin-left: 40px;
              .add_dianh_list_top {
                ul {
                  display: flex;
                  li {
                    margin: 0 20px;
                    height: 40px;
                    line-height: 40px;
                    border-bottom: 2px solid transparent;
                    span {
                      font-size: 16px;
                      font-family: MicrosoftYaHei;
                      font-weight: 400;
                      color: #00f0ff;
                      line-height: 48px;
                      opacity: 0.6;
                      cursor: pointer;
                    }
                  }
                  .Bborder {
                    border-bottom: 2px solid #00f0ff;

                    > span {
                      opacity: 1;
                    }
                  }
                }
              }
            }
            .add_dianh_list_center {
              .PartInDb_tccenter_top {
                // margin-top: 5vh;
                margin-left: 20px;
                .onePartInputName {
                  display: flex;
                }
                li {
                  //请选择
                  .el-input {
                    width: unset !important;
                  }
                  .one_a {
                    margin-left: 5px;
                  }
                  .smallbluebutton {
                    margin-right: 5px;
                    display: inline-block;
                    background-color: rgba(0, 0, 0, 0);
                    border: 1px solid #00f0ff;
                    color: #00f0ff;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    text-decoration: none;
                    width: 20px;
                    font-size: 14px;
                  }

                  .selectFile_sub {
                    text-decoration: underline;

                    overflow: hidden; //超出的文本隐藏
                    text-overflow: ellipsis; //溢出用省略号显示
                    white-space: nowrap; //溢出不换行
                    cursor: pointer;
                  }
                  text-align: left;
                  margin-top: 1vh;
                  // display: flex;
                  // justify-content: center;
                  // align-items: center;
                  //请选择

                  input {
                    border-radius: 0;
                    width: 8.5vw;
                    height: 3vh;
                    line-height: 3vh;
                    background-color: rgba(0, 0, 0, 0);
                    border: 1px solid #00f0ff;
                    font-size: 14px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
                    color: #00f0ff;
                    padding-left: 0.7vw;
                  }
                  span {
                    font-size: 15px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
                    color: #00f0ff;
                  }
                  i {
                    //**** */
                    font-size: 20px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
                    color: #00f0ff;
                    vertical-align: bottom;
                    margin-left: 5px;
                  }
                }
                .tc_textarea {
                  display: flex;
                  align-items: center;
                  // height: 18vh;
                  > span {
                    display: inline-block;
                    // width: 80px;
                    text-align: center;
                  }
                  .chakan {
                    width: 75%;
                    color: #00f0ff;
                  }
                }
              }
            }
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
