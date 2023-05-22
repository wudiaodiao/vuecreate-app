<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-03-09 15:55:07
 * @LastEditors: Please set LastEditors
 * @Description:工单管理
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->
<template>
  <div class="public_body">
    <div class="Part_cneter">
      <div :class="['public_page', $store.state.dtab ? 'index_off' : 'index_no']">
        <div class="Partlist_main">
          <div class="WorkOrder_add">
            <button @click="
                pageIndex = 1
                queryData()
              ">
              刷新
            </button>
          </div>
          <div class="WorkOrder_list">
            <el-table
              :data="list"
              style="width: 100%"
              :row-class-name="tableRowClassName"
            >
              <el-table-column
                prop="id"
                label="工单号"
              ></el-table-column>
              <el-table-column
                prop="type"
                label="工单类别"
                 width="80px"
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
                show-overflow-tooltip
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
                  <span>{{
                    $Convert.getTimeSpan(scope.row.dispatchTimeSpan, '小时')
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="接单时长"
                prop="receiveTimeSpan"
                width="100px"
              >
                <template scope="scope">
                  <span>{{
                    $Convert.getTimeSpan(scope.row.receiveTimeSpan, '小时')
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="finishTimeSpan"
                label="处理时长"
                width="100px"
              >
                <template scope="scope">
                  <span>{{
                    $Convert.getTimeSpan(scope.row.finishTimeSpan, '小时')
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="state"
                label="工单状态"
                width="120px"
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
              <el-table-column
                label="操作"
                width="140px"
              >
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.state == 10 || scope.row.state == 12"
                    class="changkan"
                    @click="addTc('confirmlog', scope.row.no)"
                  >通过</span>
                  <span
                    v-if="scope.row.state == 10 || scope.row.state == 12"
                    class="changkan"
                    @click="addTc('unconfirmlog', scope.row.no)"
                  >不通过</span>
                </template>
              </el-table-column>
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
                    'urge',
                    'Dealing'
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
                  : WorkOrderTcType == 'urge'
                  ? '催办工单'
                  : WorkOrderTcType == 'Dealing'
                  ? '选择用户'
                  : WorkOrderTcType == 'abandoned'
                  ? '废弃工单'
                  : WorkOrderTcType == 'bdUser'
                  ? '查看报单人'
                  : WorkOrderTcType == 'clUser'
                  ? '查看处理人'
                  : WorkOrderTcType == 'bdWxUser'
                  ? '查看报单人'
                  : WorkOrderTcType == 'contract'
                  ? '查看报单店铺'
                  : WorkOrderTcType == 'confirmlog'
                  ? '确认通过'
                  : WorkOrderTcType == 'unconfirmlog'
                  ? '确认不通过'
                  : WorkOrderTcType == 'cancellog'
                  ? '撤回'
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
                                @click="addTc('selectEquipment', '')"
                                class="smallbluebutton"
                              >...</a>
                            </el-form-item>
                          </li>
                          <li class="onePartInputName">
                            <el-form-item>
                              <span>地点：</span>
                              <el-cascader
                                :show-all-levels="false"
                                v-model="floor"
                                :options="floorlist"
                                :props="{
                                  expandTrigger: 'hover',
                                  value: 'model',
                                  checkStrictly: true
                                }"
                                @change="floorlistChane(floor)"
                                :placeholder="floor"
                              >
                                <template slot-scope="{ node, data }">
                                  <span v-if="data.children.length==0">({{ data.model.code}})</span>
                                  <span disabled>{{ data.model.name }}</span>
                                  <!-- <span v-if="data.children.length==0">({{ data.model.id}})</span> -->

                                  <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                                </template>
                              </el-cascader>
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
                  <selectEquipment v-on:addTc="addTc"></selectEquipment>
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
                    :operType="WorkOrderTcType"
                    v-on:addTc="addTc"
                  ></chakanLog>
                </div>
                <div v-else-if="WorkOrderTcType == 'Dealing'">
                  <userFormDep
                    :eqUserId="sDepartmentId"
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
                  v-else-if="WorkOrderTcType == 'bdWxUser'"
                  class="bdUser"
                >
                  <wxUserGetModel :applyUserNo="bdWxUserNo"></wxUserGetModel>
                </div>
                <div
                  v-else-if="WorkOrderTcType == 'contract'"
                  class="bdUser"
                >
                  <contractGetModel :applyUserNo="contractNo"></contractGetModel>
                </div>
                <div
                  v-else-if="WorkOrderTcType == 'confirmlog'"
                  class="add_dianh"
                >
                  <div class="add_dianh_list">
                    <div class="add_dianh_list_center">
                      <ul class="PartInDb_tccenter_top formValidator">
                        <el-form
                          :model="confirmModel"
                          ref="confirmModel"
                          label-width="100px"
                          class="demo-dynamic"
                          :rules="confirmRules"
                        >
                          <li class="onePartInputName">
                            <el-form-item prop="score">
                              <div style="display:flex">
                                <span>评价：</span>
                                <el-rate v-model="confirmModel.score"></el-rate>
                              </div>
                            </el-form-item>
                          </li>
                          <li class="tc_textarea">

                            <span>内容：</span>
                            <!--  :disabled="announcementTcType=='chankan'?true:false" -->
                            <el-form-item :prop="WorkOrderTcType == 'confirmlog'?'':content">
                              <el-input
                                type="textarea"
                                style="width: 500px;"
                                v-model="confirmModel.content"
                              ></el-input>
                            </el-form-item>

                          </li>
                        </el-form>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  v-else-if="WorkOrderTcType == 'unconfirmlog'"
                  class="add_dianh"
                >
                  <div class="add_dianh_list">
                    <div class="add_dianh_list_center">
                      <ul class="PartInDb_tccenter_top formValidator">
                        <el-form
                          :model="unconfirmModel"
                          ref="unconfirmModel"
                          label-width="100px"
                          class="demo-dynamic"
                          :rules="unconfirmRules"
                        >
                          <li class="tc_textarea">
                            <span>内容：</span>
                            <el-form-item prop="content">
                              <el-input
                                type="textarea"
                                style="width: 500px;"
                                v-model="unconfirmModel.content"
                              ></el-input>
                            </el-form-item>
                          </li>
                        </el-form>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  v-else-if="WorkOrderTcType == 'cancellog'"
                  class="add_dianh"
                >
                  <div class="add_dianh_list">
                    <div class="add_dianh_list_center">
                      <ul class="PartInDb_tccenter_top formValidator">
                        <el-form
                          :model="cancelModel"
                          ref="cancelRules"
                          label-width="100px"
                          class="demo-dynamic"
                          :rules="cancelRules"
                        >

                          <li class="tc_textarea">
                            <span>内容：</span>
                            <!--  :disabled="announcementTcType=='chankan'?true:false" -->
                            <el-form-item prop="content">
                              <el-input
                                type="textarea"
                                style="width: 500px;"
                                v-model="cancelModel.content"
                              ></el-input>
                            </el-form-item>

                          </li>
                        </el-form>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  class="tanchuang_center_cen_bottom"
                  v-if="
                    WorkOrderTcType != 'selectEquipment' &&
                      operTypeList.indexOf(WorkOrderTcType) == -1 &&
                      WorkOrderTcType != 'chakan' &&
                      WorkOrderTcType != 'Dealing' &&
                      WorkOrderTcType != 'bdUser' &&
                      WorkOrderTcType != 'clUser' &&
                      WorkOrderTcType != 'bdWxUser' &&
                      WorkOrderTcType != 'contract'
                  "
                >
                  <button
                    v-if="WorkOrderTcType == 'add'"
                    @click="WorkOrderReport('formValidator') "
                    v-preventReClick="2000"
                  > 确认</button>
                  <button
                    v-else-if="WorkOrderTcType == 'confirmlog'"
                    @click="confirmLog('confirmModel')  "
                    v-preventReClick="2000"
                  > 确认</button>
                  <button
                    v-else-if="WorkOrderTcType == 'unconfirmlog'"
                    @click="unconfirmLog('unconfirmModel')  "
                    v-preventReClick="2000"
                  > 确认</button>
                  <button
                    v-else-if="WorkOrderTcType == 'cancellog'"
                    @click="cancelLog('cancelRules') "
                    v-preventReClick="2000"
                  > 确认</button>
                  <button v-else> 确认</button>
                  <button @click="WorkOrderTcShow = false">取消</button>
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
                  WorkOrderTcType == 'bdUser' ||
                  WorkOrderTcType == 'clUser' ||
                  WorkOrderTcType == 'bdWxUser' ||
                  WorkOrderTcType == 'contract'
              "
              :src="require('@/assets/image/index/withdrawal.png')"
              @click="
                previous(
                  WorkOrderTcType == 'selectEquipment'
                    ? 'add'
                    : operTypeList.indexOf(eqType) != -1
                    ? eqType
                    : WorkOrderTcType == 'Dealing'
                    ? 'Distribute'
                    : ''
                )
              "
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
import userFormDep from '../../components/index/userFormDep'
import wxUserGetModel from '../../components/index/wxUserGetModel.vue'
import DateTime from '@/js/datetime'
export default {
  components: {
    contractGetModel,
    userFormDep,
    wxUserGetModel,
  },
  data() {
    return {
      operTypeList: [
        'chakanLog',
        'Distribute',
        'abandoned',
        'Transfer',
        'urge',
      ],
      DateTime: DateTime,
      cancelModel: {
        no: '',
        content: '',
      },
      cancelRules: {
        content: [{ required: true, message: '请输入内容', trigger: 'change' }],
      },
      confirmModel: {
        no: '',
        score: 5,
        content: '',
      },
      confirmRules: {
        score: [{ required: true, message: '请选择评分', trigger: 'change' }],
        content: [{ required: true, message: '请输入内容', trigger: 'change' }],
      },
      unconfirmModel: {
        no: '',
        content: '',
      },
      unconfirmRules: {
        content: [{ required: true, message: '请输入内容', trigger: 'change' }],
      },
      formValidator: {
        areaId: '',
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
      WorkOrderTcShow: false,
      WorkOrderTcType: 'add',
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
          options: [],
        },
        {
          label: '报事工单',
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
      contractNo: 0,
      floorlist: [], //楼层
      floor: '<--无-->',
      eqType: '', //控制查看设备后返回
      timer: '',
      depaIdUser: [], //根据部门获取用户
    }
  },
  mounted() {
    this.WorkSubTypeGet()
    this.AreaGetAllList()
    this.queryData()
  },
  destroyed() {},
  methods: {
    async WorkSubTypeGet() {
      const res = await this.$api.MMS.WorkSubType.Get({})
      if (res.ok) {
        let data = res.data
        for (let i in data) {
          let index = data[i].type - 2
          if (index < 0 || index >= this.subTypeData.length) continue

          this.subTypeData[index].options.push({
            value: data[i].no,
            label: data[i].name,
            departmentId: data[i].departmentId,
            departmentName: data[i].departmentName,
          })
        }
      }
    },
    async AreaGetAllList() {
      //获取楼层
      const res = await this.$api.MMS.Area.GetAllList({})
      if (res.ok) {
        this.floorlist = res.data
        this.floorlist.unshift({
          children: undefined,
          model: {
            code: '',
            id: '',
            name: '<--无-->',
          },
        })
      }
    },
    async floorlistChane(name) {
      //所属部门change事件
      let res = ''
      for (var i = 0; i < name.length; i++) {
        res = name[i].name
        this.formValidator.areaId = name[i].id
      }

      this.floor = res
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
    //确认通过
    async confirmLog(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.MMS.WorkOrder.Confirm(this.confirmModel)
          if (res.ok) {
            this.WorkOrderTcShow = false
            this.queryData()
            this.$Tools.LayerMsgInfo('确认通过成功')
          } else {
            this.$Tools.LayerMsgErr(res.message)
          }
        } else {
          return false
        }
      })
    },
    //确认不通过
    async unconfirmLog(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.MMS.WorkOrder.UnConfirm(
            this.unconfirmModel
          )
          if (res.ok) {
            this.WorkOrderTcShow = false
            this.queryData()
            this.$Tools.LayerMsgInfo('确认不通过成功')
          } else {
            this.$Tools.LayerMsgErr(res.message)
          }
        } else {
          return false
        }
      })
    },
    //撤回
    async cancelLog(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.MMS.WorkOrder.Cancel(this.cancelModel)
          if (res.ok) {
            this.WorkOrderTcShow = false
            this.queryData()
            this.$Tools.LayerMsgInfo('撤回成功')
          } else {
            this.$Tools.LayerMsgErr(res.message)
          }
        } else {
          return false
        }
      })
    },

    async WorkOrderReport(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.MMS.WorkOrder.Report(this.formValidator)
          if (res.ok) {
            this.WorkOrderTcShow = false
            this.queryData()
            this.$Tools.LayerMsgInfo('成功')
          } else {
            this.$Tools.LayerMsgErr(res.message)
          }
        } else {
          return false
        }
      })
    },
    //派发工单
    async WorkOrderDispatch(item) {
      const res = await this.$api.MMS.WorkOrder.Dispatch(item)
      if (res.ok) {
        this.WorkOrderTcShow = false
        this.$Tools.LayerMsgInfo('成功')
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    async WorkOrderUrge(item) {
      const res = await this.$api.WorkOrderUrge(item)
      if (res.ok) {
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
    async addTc(type, item) {
      console.log('add', type, item)
      if (type == 'add') {
        if (item === '') {
          //清空选择的值
          this.formValidator.areaName = ''
          this.formValidator.areaId = ''
          this.formValidator.equipmentName = ''
          this.formValidator.equipmentNo = ''
          this.formValidator.level = ''
          this.formValidator.content = ''
          this.formValidator.subTypeNo = ''
          this.formValidator.source = ''
          this.DealingUserNo = ''
          this.DealingUserName = ''
        } else {
          this.formValidator.equipmentName = item.name
          this.formValidator.equipmentNo = item.no
        }
      } else if (type == 'selectArea') {
        this.formValidator.areaName = item.name
        this.formValidator.areaId = item.no
      } else if (type == 'selectEquipment') {
        this.formValidator.equipmentName = item.name
        this.formValidator.equipmentNo = item.no
      } else if (this.operTypeList.indexOf(type) != -1) {
        if (item instanceof Object) {
          switch (type) {
            case 'Transfer':
              this.WorkOrderTransfer({
                dealDepartmentId: item.sDepartmentId,
                description: item.content,
                no: this.orderNo,
              })
              return
            case 'abandoned':
              this.WorkOrderDiscard({
                content: item.content,
                no: this.orderNo,
              })
              return
            case 'Distribute':
              this.WorkOrderDispatch({
                dealUserNo: this.DealingUserNo,
                no: this.orderNo,
              })
              return
            case 'urge':
              this.WorkOrderUrge({
                no: this.orderNo,
              })
              return

            default:
              break
          }
        } else {
          this.DealingUserNo = ''
          this.DealingUserName = ''
          this.eqType = type
          this.orderNo = item
        }
      } else if (type == 'Dealing') {
        if (item instanceof Object) {
          type = 'Distribute'
          this.DealingUserName = item.name
          this.DealingUserNo = item.no
        } else {
          this.sDepartmentId = item
        }
      } else if (type == 'removeUser') {
        this.DealingUserName = ''
        this.DealingUserNo = ''
        return
      } else if (type == 'chakan') {
        this.EquipmentGetModelNo = item
      } else if (type == 'bdUser') {
        this.bdUserNo = item
      } else if (type == 'bdWxUser') {
        this.bdWxUserNo = item
      } else if (type == 'clUser') {
        this.bdUserNo = item
        //处理人
      } else if (type == 'cancel') {
        this.WorkOrderTcShow = false
        return
      } else if (type == 'contract') {
        this.contractNo = item
      } else if (type == 'confirmlog') {
        this.confirmModel.no = item
      } else if (type == 'unconfirmlog') {
        this.unconfirmModel.no = item
      } else if (type == 'cancellog') {
        this.cancelModel.no = item
      }
      this.WorkOrderTcType = type
      this.WorkOrderTcShow = true
    },
    queryData() {
      this.list = []
      this.$api.MMS.WorkOrder.GetToConfirmPagedList({
        pageIndex: this.pageIndex - 1,
        pageSize: this.pageSize,
      }).then((res) => {
        this.total = res.data.total
        this.list = res.data.list
        if (res.data.total == 0) this.$Tools.LayerMsgErr('没有数据')
      })
    },
    onPageChange(e) {
      this.pageIndex = e
      this.queryData()
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
