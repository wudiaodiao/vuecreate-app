<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-02-18 16:44:33
 * @LastEditors: Please set LastEditors
 * @Description: 保养计划
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->
<template>
  <div class="Part">
    <div class="MaintainPlan_cneter">
      <div :class="['MaintainPlan',$store.state.dtab?'index_off':'index_no']">
        <div class="MaintainPlan_main">
          <div class="MaintainPlan_main_top">
            <div
              class="WorkOrder_add"
              v-if="$Tools.accessControl( this.$store.state.userGetUserRole.resList,'EditMaintainPlan')"
            >
              <button @click="addTc('Maint_add','')">添加</button>
            </div>
          </div>
          <div class="MaintainPlan_main_center">
            <div class="MaintainPlan_main_list">
              <el-table
                :data="MaintainPlanData.list"
                style="width: 100%"
                :row-class-name="tableRowClassName"
              >
                <el-table-column
                  prop="name"
                  label="名称"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="workSubTypeName"
                  label="工单子类"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="level"
                  label="保养级别"
                  show-overflow-tooltip
                >
                  <template scope="scope">
                    <span>{{returnLevelType(scope.row.level)}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="periodUnit"
                  label="保养周期"
                  show-overflow-tooltip
                >
                  <template scope="scope">
                    <span>{{returnTimeType(scope.row.period,scope.row.periodUnit)}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="nextDate"
                  label="下次保养日期"
                  show-overflow-tooltip
                >
                  <template scope="scope">
                    <span>
                      {{
                     DateTime.parse(scope.row.nextDate).format('yyyy-MM-dd')
                      }}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  label="查看"
                  width="60px"
                >
                  <template scope="scope">
                    <span
                      class="changkan"
                      @click="addTc('CheckTheMaintenance',scope.row)"
                    >查看</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="编辑"
                  width="60px"
                  v-if="$Tools.accessControl( this.$store.state.userGetUserRole.resList,'EditMaintainPlan')"
                >
                  <template slot-scope="scope">
                    <span
                      class="green"
                      @click="addTc('Maint_ed',scope.row)"
                    >编辑</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="编辑设备"
                  width="100px"
                  v-if="$Tools.accessControl( this.$store.state.userGetUserRole.resList,'EditMaintainPlan')"
                >
                  <template slot-scope="scope">
                    <span
                      class="green"
                      @click="addTc('editEquipment',scope.row.no)"
                    >编辑设备</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="删除"
                  width="60px"
                  v-if="$Tools.accessControl( this.$store.state.userGetUserRole.resList,'EditMaintainPlan')"
                >
                  <template slot-scope="scope">
                    <el-popconfirm
                      title="确定删除吗"
                      @onConfirm="MaintainPlanRemove(scope.row.no)"
                      @confirm="MaintainPlanRemove(scope.row.no)"
                    >
                      <span
                        class="red"
                        slot="reference"
                      >删除</span>
                    </el-popconfirm>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="MaintainPlan_main_bottom">
            <div class="fenye">
              <!--      hide-on-single-page -->
              <el-pagination
                :page-size="pageSize"
                hide-on-single-page
                @current-change="MaintainPlanGetListChangePage"
                layout="prev, pager, next"
                :total="MaintainPlanData.total"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
      <div
        class="EquipmentSignal_tanchuang_ying_MA"
        v-if="WorkOrderTcShow"
      >
        <div class="tanchuang">
          <div :class="[WorkOrderTcType=='selectEquipment'||WorkOrderTcType=='selectEquipmentEd'?'selectEq_bg': WorkOrderTcType=='chakanLog'?'gongd_tanchuang_bg':'','tanchuang_bg']">
            <div class="tanchuang_top">
              <img
                :src="require('@/assets/image/index/partial_left.png')"
                alt
              />
              <span class="top_title margin_tc">{{WorkOrderTcType=='Maint_add'?'添加保养计划':WorkOrderTcType=='Maint_ed'?'编辑保养计划':WorkOrderTcType=='editEquipment'?'编辑设备':WorkOrderTcType=='selectEquipmentEd'?'添加保养计划设备':WorkOrderTcType=='CheckTheMaintenance'?'查看保养计划':WorkOrderTcType=='chakan'?'查看设备':WorkOrderTcType=='chakanLog'?'查看工单':WorkOrderTcType=='clUser'?'查看处理人':WorkOrderTcType=='bdUser'?'查看报单人':''}}</span>

              <img
                :src="require('@/assets/image/index/partial_right.png')"
                alt
              />
            </div>
            <div class="tanchuang_center">
              <div class="tanchuang_center_cen">
                <div
                  class="Maint_add"
                  v-if="WorkOrderTcType=='Maint_add'||WorkOrderTcType=='Maint_ed'"
                >
                  <div class="add_dianh_list_center">
                    <ul class="PartInDb_tccenter_top formValidator">
                      <el-form
                        :model="formValidator"
                        ref="formValidator"
                        label-width="100px"
                        class="demo-dynamic"
                        :rules="rules"
                      >
                        <li class="Maintain_name_bum">
                          <div class="Maintain_name_bum_margin_right">
                            <el-form-item prop="MaintainName">
                              <span class="boay_time" style="width:60px;margin-left:40px;margin-right:10px">名称：</span>
                              <el-input
                                type="text"
                                v-model="formValidator.MaintainName"
                              />
                              <i>*</i>
                            </el-form-item>
                          </div>
                          <div
                            class="bumen_baoy"
                            style=""
                          >
                            <el-form-item prop="workSubTypeNo">
                              <span class="maintain_zhouqi_span">工单子类：</span>
                              <el-select
                                class="didian"
                                v-model="formValidator.workSubTypeNo"
                                placeholder="请选择"
                              >
                                <el-option
                                  v-for="item in workSubTypes"
                                  :key="item.no"
                                  :label="item.name"
                                  :value="item.no"
                                ></el-option>
                              </el-select>
                              <i>*</i>
                            </el-form-item>
                          </div>
                        </li>
                        <li class="Maintain_name_bum">
                          <div class="Maintain_name_bum_margin_right">
                            <el-form-item prop="MaintainLevelName">
                              <span class="boay_time">保养级别：</span>
                              <el-select
                                class="didian"
                                v-model="formValidator.MaintainLevelName"
                                @change="MaintainLevelChane"
                                placeholder="请选择"
                              >
                                <el-option
                                  v-for="item in MaintainLeveldata"
                                  :key="item.no"
                                  :label="item.name"
                                  :value="item.name"
                                ></el-option>
                              </el-select>
                              <i>*</i>
                            </el-form-item>
                          </div>
                          <div class="bumen_baoy">
                            <el-form-item prop="MaintainTimeinput">
                              <span>保养周期：</span>
                              <el-input
                                type="text"
                                class="maintain_zhouqi_input"
                                v-model.number="formValidator.MaintainTimeinput"
                              />
                              <el-select
                                class="maintain_zhouqi didian"
                                v-model="MaintainTimeName"
                                @change="MaintainTimeChane"
                                placeholder="月"
                              >
                                <el-option
                                  v-for="item in MaintainTimedata"
                                  :key="item.no"
                                  :label="item.name"
                                  :value="item.name"
                                ></el-option>
                              </el-select>
                              <i>*</i>
                            </el-form-item>
                          </div>
                        </li>

                        <li class="tc_textarea">
                          <span class="boay_time">保养内容：</span>
                          <!--  :disabled="announcementTcType=='chankan'?true:false" -->
                          <el-input
                            type="textarea"
                            class="chakan"
                            v-model="maintenanceContent"
                          ></el-input>
                        </li>
                        <li class="tc_textarea">
                          <span class="boay_time">保养标准：</span>
                          <!--  :disabled="announcementTcType=='chankan'?true:false" -->
                          <el-input
                            type="textarea"
                            class="chakan"
                            v-model="maintenanceStandard"
                          ></el-input>
                        </li>
                        <li class="tc_textarea">
                          <span class="boay_time">下次保养时间：</span>

                          <el-date-picker
                            class="didian padding_le"
                            v-model="MaintainTime"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptions0"
                          ></el-date-picker>
                        </li>
                      </el-form>
                    </ul>
                  </div>
                </div>
                <div
                  v-else-if="WorkOrderTcType=='editEquipment'"
                  class="editEquipment"
                >
                  <editEquipment
                    :editEquipmentNo="editEquipmentNo"
                    :MaintenanceType="MaintenanceType"
                    v-on:addTc="addTc"
                  ></editEquipment>
                </div>
                <div
                  class="selectEquipment"
                  v-else-if="WorkOrderTcType=='selectEquipmentEd'"
                >
                  <selectEquipment
                    :WorkOrderTcType="WorkOrderTcType"
                    :editEquipmentNo="editEquipmentNo"
                    v-on:addTc="addTc"
                  ></selectEquipment>
                </div>
                <div v-else-if="WorkOrderTcType=='chakanLog'">
                  <chakanLog
                    :no="orderNo"
                    v-on:addTc="addTc"
                  ></chakanLog>
                </div>
                <div v-else-if="WorkOrderTcType=='chakan'">
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
                  class="CheckTheMaintenance"
                  v-else-if="WorkOrderTcType=='CheckTheMaintenance'"
                >
                  <div class="add_dianh_list">
                    <div class="add_dianh_list_top">
                      <ul>
                        <li
                          :class="[addSheName==addshe.name?'Bborder':'']"
                          v-for="addshe in addsheb"
                          :key="addshe.id"
                        >
                          <span @click="addsheClick(addshe.name)">{{addshe.name}}</span>
                        </li>
                      </ul>
                    </div>
                    <div class="add_dianh_list_center">
                      <ul
                        class="PartInDb_tccenter_top marin_che"
                        v-if="addSheName=='基本信息'"
                      >
                        <li class="PartInDb_tccenter_top_jb">
                          <div>
                            <span>名称：</span>
                            <span>{{CheckTheMaintenanceItem.name}}</span>
                          </div>
                          <div>
                            <span>工单子类：</span>
                            <span>{{CheckTheMaintenanceItem.workSubTypeName}}</span>
                          </div>
                        </li>
                        <li class="PartInDb_tccenter_top_jb">
                          <div>
                            <span>保养级别：</span>
                            <span>{{returnLevelType(CheckTheMaintenanceItem.level)}}</span>
                          </div>
                          <div>
                            <span>保养周期：</span>
                            <span>{{returnTimeType(CheckTheMaintenanceItem.period,CheckTheMaintenanceItem.periodUnit)}}</span>
                          </div>
                        </li>
                        <li class="PartInDb_tccenter_top_jb">
                          <span>保养内容：</span>
                          <div
                            class="baoy_center"
                            v-html="returnh(CheckTheMaintenanceItem.content)"
                          ></div>
                        </li>
                        <li class="PartInDb_tccenter_top_jb">
                          <span>标准：</span>
                          <div
                            class="baoy_center"
                            v-html="returnh(CheckTheMaintenanceItem.standard)"
                          ></div>
                        </li>
                        <li class="PartInDb_tccenter_top_jb">
                          <span>下次保养日期：</span>
                          <div class="baoy_center">{{$Convert.getTime(CheckTheMaintenanceItem.nextDate,'yyyy-MM-dd')}}</div>
                        </li>
                      </ul>
                      <ul
                        class="PartInDb_tccenter_top"
                        v-else-if="addSheName=='关联设备'"
                      >
                        <div class="MaintainPlan_main_center">
                          <div class="MaintainPlan_main_list">
                            <editEquipment
                              :MaintenanceType="MaintenanceType"
                              :editEquipmentNo="editEquipmentNo"
                              v-on:addTc="addTc"
                            ></editEquipment>
                          </div>
                        </div>
                      </ul>

                    </div>
                  </div>
                </div>

                <div
                  class="tanchuang_center_cen_bottom"
                  v-if="WorkOrderTcType!='editEquipment'&&WorkOrderTcType!='selectEquipmentEd'&&WorkOrderTcType!='CheckTheMaintenance'&&WorkOrderTcType!='chakan'&&WorkOrderTcType!='chakanLog'&&WorkOrderTcType!='clUser'&&WorkOrderTcType!='bdUser'"
                >
                  <button
                    @click="WorkOrderTcType=='Maint_add'?MaintainPlanAdd('formValidator'):WorkOrderTcType=='Maint_ed'?MaintainPlanUpdate('formValidator'):WorkOrderTcType=='selectEquipmentEd'?MaintainPlanAddEquipment():''"
                    v-preventReClick="2000"
                  >确认</button>
                  <button @click="WorkOrderTcShow=false">取消</button>
                </div>
              </div>
            </div>
          </div>
          <div class="cancel">
            <img
              v-show="WorkOrderTcType!='Maint_add'&&WorkOrderTcType!='Maint_ed'&&WorkOrderTcType!='editEquipment'&&WorkOrderTcType!='CheckTheMaintenance'"
              @click="previous(WorkOrderTcType=='chakan'?'CheckTheMaintenance':WorkOrderTcType=='bdUser'?'chakanLog':WorkOrderTcType=='clUser'?'chakanLog':WorkOrderTcType=='selectEquipmentEd'?'editEquipment':WorkOrderTcType=='chakanLog'?'chakan':'')"
              :src="require('@/assets/image/index/withdrawal.png')"
              alt
            />
            <img
              @click="WorkOrderTcShow=false"
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
import DateTime from '@/js/datetime'
export default {
  data() {
    return {
      DateTime: DateTime,
      formValidator: {
        MaintainName: '',
        workSubTypeNo: null,
        MaintainLevelName: '',
        MaintainTimeinput: 1,
      },
      rules: {
        MaintainName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        workSubTypeNo: [
          { required: true, message: '请选择工单子类', trigger: 'change' },
        ],
        MaintainLevelName: [
          { required: true, message: '请选择保养级别', trigger: 'change' },
        ],
        MaintainTimeinput: [
          { required: true, message: '请输入保养周期', trigger: 'blur' },
          { type: 'number', message: '值必须为数字值', trigger: 'blur' },
        ],
      },
      MaintainPlanData: {
        list: [],
        total: 55,
      },
      pageIndex: 1,
      pageSize: 14,
      WorkOrderTcShow: false,
      WorkOrderTcType: 'Maint_add',
      MaintainTime: '', //下次保养时间
      workSubTypes: [],
      MaintainLeveldata: [
        {
          no: 1,
          name: '一级保养',
        },
        {
          no: 2,
          name: '二级保养',
        },
      ], //保养等级

      MaintainLevelNo: '1',
      MaintainTimedata: [
        {
          no: 1,
          name: '天',
        },
        {
          no: 2,
          name: '月',
        },
        {
          no: 3,
          name: '年',
        },
      ], //保养等级
      MaintainTimeName: '月',
      MaintainTimeNo: 2,

      maintenanceContent: '', //保养内容
      maintenanceStandard: '', //保养标准

      MaintainNo: '', //当前项no
      editEquipmentNo: '', //编辑设备号
      epuipments: [],
      addsheb: [
        { name: '基本信息', id: '0' },
        { name: '关联设备', id: '1' },
        // { name: '保养记录', id: '2' }
      ], //选择设备与手动输入
      addSheName: '基本信息',
      CheckTheMaintenanceItem: {}, //查看保养计划
      EquipmentSignalListData: [], //获取设备关联列表
      MaintenanceType: '', //传递类型、控制查看删除
      EquipmentGetModelNo: '', //查看设备详情
      EquipmentSignalListData: [], //保养计划
      orderNo: '', //查看设备
      bdUserNo: 0, //报单人
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7 //如果没有后面的-8.64e7就是不可以选择今天的
        },
      },
    }
  },
  mounted() {
    this.MaintainPlanGetList()
    this.GetWorkSubType() //获取所属部门
  },
  computed: {
    returnh: function () {
      return function (type) {
        //换行
        let reg = new RegExp('\n', 'g')
        let str = type.replace(reg, '<br>')
        return str
      }
    },
    returnLevelType: function () {
      return function (type) {
        //计算属性传参
        //根据不同的类型返回不同的值
        switch (type) {
          case 1:
            return '一级保养'
            break
          case 2:
            return '二级保养'
            break
          default:
            return
        }
      }
    },
    returnTimeType: function () {
      return function (item, type) {
        switch (type) {
          case 1:
            return item + '天'
            break
          case 2:
            return item + '月'
            break
          case 3:
            return item + '年'
            break
          default:
            return
        }
      }
    },
  },
  methods: {
    async MaintainPlanMaintainOrderList() {
      //保养记录
      const res = await this.$api.MMS.MaintainPlan.MaintainOrderList({
        no: this.MaintainNo,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      })
      if (res.ok) {
        this.EquipmentSignalListData = res.data
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    async EquipmentSignalList(no) {
      //获取设备关联列表
      //编辑保养计划
      const res = await this.$api.MMS.Equipment.SignalList({
        equipmentNo: no,
      })
      if (res.ok) {
        this.EquipmentSignalListData = res.data
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    addsheClick(name) {
      //选择设备与手动输入
      this.addSheName = name
      switch (name) {
        case '基本信息':
          this.MaintenanceType = ''
          return
          break
        case '关联设备':
          this.MaintenanceType = 'planEquipment'
          return (this.editEquipmentNo = this.CheckTheMaintenanceItem.no)
          break
        case '保养记录':
          this.MaintenanceType = ''
          return this.MaintainPlanMaintainOrderList()
          break
        default:
          return
      }
    },
    async MaintainPlanUpdate(formName) {
      //编辑保养计划
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.MMS.MaintainPlan.Update({
            No: this.MaintainNo,
            Name: this.formValidator.MaintainName,
            workSubTypeNo: this.formValidator.workSubTypeNo,
            Period: this.formValidator.MaintainTimeinput,
            PeriodUnit: this.MaintainTimeNo,
            Level: this.MaintainLevelNo,
            Content: this.maintenanceContent,
            Standard: this.maintenanceStandard,
            NextDate: this.MaintainTime,
          })
          if (res.ok) {
            this.WorkOrderTcShow = false
            this.MaintainPlanGetList()

            this.$Tools.LayerMsgInfo('成功')
          } else {
            this.$Tools.LayerMsgErr(res.message)
          }
        } else {
          return false
        }
      })
    },
    async MaintainPlanAdd(formName) {
      //添加保养计划
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.MMS.MaintainPlan.Add({
            No: 0,
            Name: this.formValidator.MaintainName,
            WorkSubTypeNo: this.formValidator.workSubTypeNo,
            Period: this.formValidator.MaintainTimeinput,
            PeriodUnit: this.MaintainTimeNo,
            Level: this.MaintainLevelNo,
            Content: this.maintenanceContent,
            Standard: this.maintenanceStandard,
            NextDate: this.MaintainTime
          })
          if (res.ok) {
            this.WorkOrderTcShow = false
            this.MaintainPlanGetList()

            this.$Tools.LayerMsgInfo('成功')
          } else {
            this.$Tools.LayerMsgErr(res.message)
          }
        } else {
          return false
        }
      })
    },
    async GetWorkSubType() {
      this.$api.MMS.WorkSubType.GetByType({
        type: 1
      }).then(res => {
        if (res.ok)
          this.workSubTypes = res.data;
      });
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
    MaintainTimeChane(e) {
      for (let i in this.MaintainTimedata) {
        if (e == this.MaintainTimedata[i].name) {
          this.MaintainTimeNo = this.MaintainTimedata[i].no
        }
      }
    },
    MaintainLevelChane(e) {
      for (let i in this.MaintainLeveldata) {
        if (e == this.MaintainLeveldata[i].name) {
          this.MaintainLevelNo = this.MaintainLeveldata[i].no
        }
      }
    },
    async addTc(type, item) {
      if (type == 'Maint_add') {
        this.formValidator.MaintainName = ''
        this.MaintainTime = DateTime.thisMonth().addDate(0, 1, 0).format("yyyy-MM-dd")
        this.formValidator.MaintainLevelName = '一级保养'
        this.MaintainLevelNo = 1
        this.MaintainTimeName = '月'
        this.MaintainTimeNo = 2
        this.maintenanceContent = ''
        this.maintenanceStandard = '' //保养标准
      } else if (type == 'Maint_ed') {
        this.MaintainNo = item.no

        this.formValidator.MaintainName = item.name
        this.MaintainTime = item.nextDate
        this.formValidator.MaintainLevelName = this.returnLevelType(item.level)
        this.MaintainLevelNo = item.level
        this.MaintainTimeName =
          item.periodUnit == 1
            ? '天'
            : item.periodUnit == 2
            ? '月'
            : item.periodUnit == 3
            ? '年'
            : ''
        this.MaintainTimeNo = item.periodUnit
        this.maintenanceContent = item.content
        this.maintenanceStandard = item.standard //保养标准
        this.formValidator.workSubTypeNo = item.workSubTypeNo

        // this.MaintainNo=item
      } else if (type == 'editEquipment') {
        this.MaintenanceType = ''

        this.editEquipmentNo = item
      } else if (type == 'selectEquipmentEd') {
        this.epuipments = item
      } else if (type == 'CheckTheMaintenance') {
        this.MaintenanceType = 'planEquipment'
        this.MaintainNo = item.no
        this.CheckTheMaintenanceItem = item
      } else if (type == 'chakan') {
        this.EquipmentGetModelNo = item
      } else if (type == 'chakanLog') {
        this.orderNo = item
      } else if (type == 'bdUser') {
        this.bdUserNo = item
      } else if (type == 'clUser') {
        this.bdUserNo = item
        //处理人
      }
      this.WorkOrderTcType = type
      this.WorkOrderTcShow = true
    },
    previous(type) {
      //返回上一步按钮

      this.WorkOrderTcShow = true
      this.WorkOrderTcType = type
    },
    async MaintainPlanRemove(no) {
      //删除
      const res = await this.$api.MMS.MaintainPlan.Remove({
        no: no,
      })
      if (res.ok) {
        this.$Tools.LayerMsgInfo('成功')
        this.MaintainPlanGetList()
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    MaintainPlanGetListChangePage(e) {
      this.pageIndex = e
      this.MaintainPlanGetList()
    },
    async MaintainPlanGetList() {
      const res = await this.$api.MMS.MaintainPlan.GetList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      })
      if (res.ok) {
        this.MaintainPlanData = res.data
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
@import './styles/MaintainPlan.scss';
</style>
<style lang="scss" >
.EquipmentSignal_tanchuang_ying_MA {
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: -13.3vh;
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

          //添加、编辑
          .Maint_add {
            .add_dianh_list_center {
              .PartInDb_tccenter_top {
                // margin-top: 5vh;
                margin-left: 40px;

                .Maintain_name_bum {
                  display: flex;
                  .bumen_baoy {
                    display: flex;
                    align-items: center;
                    height: 3.1vh;
                    margin-left: 40px;
                  }
                  > div {
                    .maintain_zhouqi_input {
                      width: 85px;
                      margin-right: 5px;
                    }
                    .maintain_zhouqi {
                      width: 73px;
                      input {
                        width: 73px;
                      }
                    }
                    > .maintain_zhouqi_span {
                      display: inline-block;
                      width: 75px;
                    }
                  }
                  .Maintain_name_bum_margin_right {
                    margin-right: 40px;
                    .el-input {
                      width: unset !important;
                    }
                  }
                }
                li {
                  //请选择
                  .boay_time {
                    display: inline-block;
                    width: 110px;
                    text-align: center;
                  }
                  .padding_le {
                    input {
                      padding-left: 40px;
                    }
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
                  position: relative;
                  transform: translateZ(0);
                  > span {
                    display: inline-block;
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
          //编辑设备
          .editEquipment {
            margin: 0px 18px;
          }
          .CheckTheMaintenance {
            margin: 0 20px;
            text-align: left;

            .marin_che {
              margin-left: 40px;
              margin-right: 40px;
            }
            .add_dianh_list {
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
              //查看保养工单
              .PartInDb_tccenter_top {
                // margin-top: 5vh;
                margin-left: 20px;
                .PartInDb_tccenter_top_jb {
                  display: flex;
                  > div {
                    flex: 1;
                  }
                }
                li {
                  //请选择
                  .baoy_center {
                    display: inline-block;
                    color: #00f0ff;
                  }

                  text-align: left;
                  margin-top: 1vh;
                  // display: flex;
                  // justify-content: center;
                  // align-items: center;
                  //请选择

                  span {
                    display: inline-block;
                    min-width: 100px;
                    font-size: 15px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
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

