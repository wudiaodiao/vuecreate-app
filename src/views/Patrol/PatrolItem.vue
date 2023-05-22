<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-03-09 18:38:13
 * @LastEditors: Please set LastEditors
 * @Description: 巡检计划
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->
<template>
  <div class="Part">
    <div class="InspectionPlan_cneter">
      <div :class="[
          'InspectionPlan',
          $store.state.dtab ? 'index_off' : 'index_no'
        ]">
        <div class="InspectionPlan_main">
          <div class="InspectionPlan_main_top">
            <div
              class="WorkOrder_add"
              v-if="
                $Tools.accessControl(
                  this.$store.state.userGetUserRole.resList,
                  'EditPatrolItem'
                )
              "
            >
              <button @click="addTc('InspectionPlan_add', '')">添加</button>
            </div>
          </div>
          <div class="InspectionPlan_main_center">
            <div class="InspectionPlan_main_list">
              <el-table
                :data="PatrolItemList.list"
                style="width: 100%"
                :row-class-name="tableRowClassName"
              >
                <el-table-column
                  show-overflow-tooltip
                  type="index"
                  :index="(pageIndex-1)*pageSize+1"
                  label="序号"
                ></el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="name"
                  label="名称"
                ></el-table-column>
                <el-table-column
                  prop="type"
                  label="类型"
                  show-overflow-tooltip
                >
                  <template scope="scope">
                    <span>{{ scope.row.type ==1?'文本':'单选'}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="text"
                  label="内容"
                  show-overflow-tooltip
                >

                </el-table-column>

                <el-table-column
                  label="编辑"
                  width="60px"
                  v-if="
                    $Tools.accessControl(
                      this.$store.state.userGetUserRole.resList,
                      'EditPatrolItem'
                    )
                  "
                >
                  <template slot-scope="scope">
                    <span
                      class="green"
                      @click="addTc('InspectionPlan_ed', scope.row)"
                    >编辑</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="删除"
                  width="60px"
                  v-if="
                    $Tools.accessControl(
                      this.$store.state.userGetUserRole.resList,
                      'EditPatrolItem'
                    )
                  "
                >
                  <template slot-scope="scope">
                    <el-popconfirm
                      title="确定删除吗"
                      @onConfirm="InspectionPlanRemove(scope.row.no)"
                      @confirm="InspectionPlanRemove(scope.row.no)"
                    >
                      <span
                        class="red"
                        slot="reference"
                      >删除</span>
                    </el-popconfirm>
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
                  :total="PatrolItemList.total"
                ></el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="EquipmentSignal_tanchuang_ying_IP"
        v-if="WorkOrderTcShow"
      >
        <div class="tanchuang">
          <div :class="['tanchuang_bg']">
            <div class="tanchuang_top">
              <img
                :src="require('@/assets/image/index/partial_left.png')"
                alt
              />
              <span class="top_title margin_tc">{{
                WorkOrderTcType == 'InspectionPlan_add'
                  ? '添加巡检项'
                  : WorkOrderTcType == 'InspectionPlan_ed'
                  ? '编辑巡检项'
                  : WorkOrderTcType == 'editTime'
                  ? '编辑巡检时间'
                  : WorkOrderTcType == 'editTime_add'
                  ? '添加巡检时间'
                  : WorkOrderTcType == 'editTheCheck'
                  ? '编辑巡检项'
                  : WorkOrderTcType == 'editTheCheck_add'
                  ? '添加巡检项'
                  : WorkOrderTcType == 'chakanLog'
                  ? '查看工单'
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
                  v-if="
                    WorkOrderTcType == 'InspectionPlan_add' ||
                      WorkOrderTcType == 'InspectionPlan_ed'
                  "
                  class="InspectionPlan_add"
                >
                  <ul class="InspectionPlan_add_cen_top formValidator">
                    <el-form
                      :model="formValidator"
                      ref="formValidator"
                      label-width="100px"
                      class="demo-dynamic"
                      :rules="rules"
                    >
                      <li>
                        <el-form-item prop="name">
                          <span class="span_wi">名称：</span>
                          <el-input
                            type="text"
                            v-model="formValidator.name"
                          />
                          <i>*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item prop="type">
                          <span class="span_wi">类型：</span>
                          <el-select
                            v-model="formValidator.type"
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            >
                            </el-option>
                          </el-select>
                          <i>*</i>
                        </el-form-item>
                      </li>

                      <li
                        v-if="formValidator.type==2"
                        v-for="(item, index) in formValidator.text"
                         class="err123"
                      >
                        <span class="span_wi">选项{{ index+1}}：</span>
                        <el-form-item
                       
                          style="position:relative"
                          :key="item.key"
                          :prop="formValidator.type==1?'':'text.' + index + '.value'"
                          :rules="{
      required: true, message: '选项内容不能为空', trigger: 'blur'
    }"
                        >
                          <el-input v-model="item.value"></el-input>
                          <i>*</i>
                          <button
                            style="background:#30b8ff;color: #fff; margin-left: 5px;cursor: pointer;padding: 5px;border-radius: 3px;position: absolute;width: 50px;"
                            @click.prevent="removeDomain(item)"
                          >删除</button>

                        </el-form-item>

                        <!-- <el-form-item :prop="formValidator.type==1?'':'text'">
                          <span class="span_wi">内容：</span>
                          <el-input
                            type="text"
                            v-model.number="formValidator.text"
                          />
                          <i>*</i>
                          <br>
                              
                        </el-form-item>
                        <br> -->

                      </li>
                      <li v-if="formValidator.type==2">
                        <el-form-item>

                          <el-button
                            class="btn"
                            style="background:#30b8ff;color: #fff; margin-left: 5px;cursor: pointer;padding: 8px;border-radius: 3px; border: none;"
                            @click="addDomain"
                          >新增选项</el-button>

                        </el-form-item>
                      </li>
                    </el-form>
                  </ul>
                </div>
                <div
                  v-else-if="WorkOrderTcType == 'editTime'"
                  class="editTime"
                >
                  <editTime
                    :InspectionPlan="InspectionPlan"
                    v-on:addTc="addTc"
                  ></editTime>
                </div>
                <div
                  v-else-if="WorkOrderTcType == 'editTime_add'"
                  class="editTime_add"
                >
                  <div class="editTime_center">
                    <ul class="editTime_list">
                      <li class="time_input">
                        <span>时间：</span>
                        <el-time-select
                          v-model="BeginTime"
                          :picker-options="{
                            start: '00:00',
                            step: '00:60',
                            end: '23:00'
                          }"
                          placeholder="选择时间"
                        ></el-time-select>
                        <i>至</i>
                        <el-time-select
                          v-model="EndTime"
                          :picker-options="{
                            start: '00:00',
                            step: '00:60',
                            end: '24:00'
                          }"
                          placeholder="选择时间"
                        ></el-time-select>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  v-else-if="WorkOrderTcType == 'editTheCheck'"
                  class="editTheCheck"
                >
                  <editTheCheck
                    :InspectionPlan="InspectionPlan"
                    v-on:addTc="addTc"
                  ></editTheCheck>
                </div>
                <div
                  v-else-if="WorkOrderTcType == 'editTheCheck_add'"
                  class="editTheCheck_add"
                >
                  <div class="signalTc">
                    <ul class="signalTc_center">
                      <li class="zixitong">
                        <span class="span_width">地点：</span>
                        <el-cascader
                          :show-all-levels="false"
                          v-model="floorlistName"
                          :options="floorlist"
                          :props="{
                            expandTrigger: 'hover',
                            value: 'model',
                            checkStrictly: true
                          }"
                          @change="floorlistChane(floorlistName)"
                          :placeholder="floorlistName"
                        >
                          <template slot-scope="{ node, data }">
                            <span v-if="data.children.length==0">({{ data.model.code}})</span>
                            <span disabled>{{ data.model.name }}</span>
                            <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                          </template>
                        </el-cascader>
                      </li>
                      <li class="center_top_xinhao">
                        <span class="span_width">巡检项：</span>

                        <div
                          class="checkboxList"
                          v-if="InspectionPlanGetInspectionsData.length > 0"
                        >
                          <div class="information_bootom">
                            <div class="readio_information">
                              <label
                                v-for="(item,
                                i) in InspectionPlanGetInspectionsData"
                                :key="i"
                                class="check"
                              >
                                <input
                                  @click="checkboxClick(item)"
                                  type="checkbox"
                                  :value="item.name"
                                  :id="item.no"
                                  class="radio_type"
                                  :checkbox="
                                    (xjcheck =
                                      item.no == xjcheckboxNo ? true : false)
                                  "
                                />
                                <div class="name">{{ item.name }}</div>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div
                          v-else
                          class="empty"
                        >
                          {{ '无可选项' }}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  v-else-if="WorkOrderTcType == 'editEquipment'"
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
                  v-else-if="WorkOrderTcType == 'selectEquipmentEd'"
                >
                  <selectEquipment
                    :WorkOrderTcType="WorkOrderTcType"
                    :editEquipmentNo="editEquipmentNo"
                    v-on:addTc="addTc"
                  ></selectEquipment>
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
                  class="tanchuang_center_cen_bottom"
                  v-if="
                    WorkOrderTcType != 'editTime' &&
                      WorkOrderTcType != 'selectEquipmentEd' &&
                      WorkOrderTcType != 'CheckTheMaintenance' &&
                      WorkOrderTcType != 'chakan' &&
                      WorkOrderTcType != 'chakanLog' &&
                      WorkOrderTcType != 'editTheCheck'
                  "
                >
                  <button
                    @click="
                      WorkOrderTcType == 'InspectionPlan_add'
                        ? InspectionPlanAdd('formValidator')
                        : WorkOrderTcType == 'InspectionPlan_ed'
                        ? InspectionPlanUpdate('formValidator')
                        : WorkOrderTcType == 'editTime_add'
                        ? InspectionPlanAddTime()
                        : 'editTheCheck_add'
                        ? InspectionPlanAddArea()
                        : ''
                    "
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
                WorkOrderTcType != 'InspectionPlan_add' &&
                  WorkOrderTcType != 'InspectionPlan_ed' &&
                  WorkOrderTcType != 'editTime' &&
                  WorkOrderTcType != 'editTheCheck'
              "
              @click="
                previous(
                  WorkOrderTcType == 'chakan'
                    ? 'chakanLog'
                    : WorkOrderTcType == 'bdUser'
                    ? 'chakanLog'
                    : WorkOrderTcType == 'clUser'
                    ? 'chakanLog'
                    : WorkOrderTcType == 'editTime_add'
                    ? 'editTime'
                    : WorkOrderTcType == 'editTheCheck_add'
                    ? 'editTheCheck'
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
import DateTime from '@/js/datetime'

export default {
  data() {
    return {
      options: [
        {
          value: '1',
          label: '文本',
        },
        {
          value: '2',
          label: '单选',
        },
      ],
      PatrolItemList: '',
      DateTime: DateTime,
      formValidator: {
        name: '',
        type: '',
        text: [{ value: '' }],
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择类型', trigger: 'change' }],

        text: [{ required: true, message: '请输入内容', trigger: 'change' }],
      },
      pageIndex: 1, //历史页码
      pageSize: 13, //一页多少条
      InspectionPlanGetListData: [], //巡检计划
      WorkOrderTcShow: false,
      WorkOrderTcType: 'add',
      sDepartmentData: [], //所属部门数据：
      sDepartmentId: '.01.', //部门id
      InspectionPlan: '', //巡检计划项
      BeginTime: '',
      EndTime: '',
      inputEquipment: '',
      inputEquipmentType: '所有',

      floorlist: [], //楼层
      InspectionPlanGetInspectionsData: [],
      xjcheck: true, //巡检是否选择
      xjcheckboxNo: '',
      xjIdArr: [],
      floorlistId: '',
      floorlistName: '',
    }
  },
  mounted() {
    this.InspectionPlanGetList()
  },
  methods: {
    removeDomain(item) {
      var index = this.formValidator.text.indexOf(item)
      if (index !== -1) {
        this.formValidator.text.splice(index, 1)
      }
    },
    addDomain() {
      // console.log(this.formValidator.text)
      this.$nextTick(() => {
        this.formValidator.text.push({
          value: '',
          key: Date.now(),
        })
      })
      // this.$forceUpdate()
    },
    async InspectionPlanUpdate(formName) {
      var add = ''
      for (let index = 0; index < this.formValidator.text.length; index++) {
        const element = this.formValidator.text[index]
        console.log(element)
        let b = index == this.formValidator.text.length - 1 ? '' : ';'
        add = add + element.value + b
      }
      //添加巡检计划
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.MMS.PatrolItem.Update({
            no: this.formValidator.no,
            name: this.formValidator.name,
            type: this.formValidator.type,
            text: add,
          })
          if (res.ok) {
            this.WorkOrderTcShow = false
            this.InspectionPlanGetList()

            this.$Tools.LayerMsgInfo('成功')
          } else {
            this.$Tools.LayerMsgErr(res.message)
          }
        } else {
          return false
        }
      })
    },
    async InspectionPlanAdd(formName) {
      var add = ''
      for (let index = 0; index < this.formValidator.text.length; index++) {
        const element = this.formValidator.text[index]
        console.log(element)
        let b = index == this.formValidator.text.length - 1 ? '' : ';'
        add = add + element.value + b
      }

      //添加巡检计划
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.MMS.PatrolItem.Add({
            name: this.formValidator.name,
            type: this.formValidator.type,
            text: add,
          })
          if (res.ok) {
            this.WorkOrderTcShow = false
            this.InspectionPlanGetList()

            this.$Tools.LayerMsgInfo('成功')
          } else {
            this.$Tools.LayerMsgErr(res.message)
          }
        } else {
          return false
        }
      })
    },
    // async InspectionPlanAddArea() {
    //   //添加巡检项
    //   this.$refs['formValidator'].validate(async(valid) => {
    //       if (valid) {
    //           const res = await this.$api.MMS.PatrolItem.Add({

    //         name: this.formValidator.name,
    //         type: this.formValidator.type,
    //         text: this.formValidator.text
    //   })
    //   if (res.ok) {
    //     this.WorkOrderTcType = 'editTheCheck'

    //     this.$Tools.LayerMsgInfo('成功')
    //   } else {
    //     this.$Tools.LayerMsgErr(res.message)
    //   }
    //       } else {
    //         console.log('error submit!!');
    //         return false;
    //       }
    //     });

    // },
    //复选框点击事件

    previous(type) {
      //返回上一步按钮

      this.WorkOrderTcShow = true
      this.WorkOrderTcType = type
    },
    async addTc(type, item) {
      console.log(item)
      this.formValidator = {
        no: '',
        name: '',
        type: '',
        text: [{ value: '' }],
      }
      if (type == 'InspectionPlan_add') {
        this.formValidator.InspecTcName = ''
        this.formValidator.Period = 1
        this.formValidator.MaintainTime = new Date()
      } else if (type == 'InspectionPlan_ed') {
      
         let text = []
        if (item.text) {
             let update = item.text.split(';')
         
        for (let index = 0; index < update.length; index++) {
          const element = update[index]
          text.push({
            value: element,
            key: index,
          })
        }
        }
     

        this.formValidator = {
          no: item.no,
          name: item.name,
          type: String(item.type),
          text: text,
        }
        this.formValidator.MaintainTime = item.nextDate
      } else if (type == 'editTime') {
        //编辑选举计划
        this.InspectionPlan = item //巡检计划项
      } else if (type == 'editTime_add') {
      } else if (type == 'editTheCheck') {
        this.InspectionPlan = item //巡检计划项
      } else if (type == 'editTheCheck_add') {
        this.InspectionPlan = item //巡检计划项
        this.xjIdArr = [] //进入前清空选中项
        this.InspectionPlanGetInspections(this.floorlistId)
      } else if (type == 'chakan') {
        this.EquipmentGetModelNo = item
      } else if (type == 'chakanLog') {
        this.orderNo = item
      }
      this.WorkOrderTcType = type
      this.WorkOrderTcShow = true
    },
    //删除
    async InspectionPlanRemove(no) {
      console.log(no)
      const res = await this.$api.MMS.PatrolItem.Delete({ no: no })
      if (res.ok) {
        this.$Tools.LayerMsgErr('删除成功')
        this.InspectionPlanGetList()
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    Current(e) {
      this.pageIndex = e
      this.InspectionPlanGetList()
    },
    async InspectionPlanGetList() {
      //获取列表
      const res = await this.$api.MMS.PatrolItem.Get({
        PageIndex: this.pageIndex,
        PageSize: this.pageSize,
      })
      if (res.ok) {
        this.PatrolItemList = res.data
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

    WorkOrderChangePage() {},
  },
}
</script>
<style lang="scss" scoped>
@import './styles/InspectionPlan.scss';
</style>
<style src="./styles/test.css" ></style>
<style lang="scss">
.err123  .el-form-item__error {
    left: 125% !important;
    width: 6.25rem;
    top: 8%;
    text-align: left;
}
.btn span{
  color: #fff !important;
}
.fenye {
  text-align: right;
}
.el-input__suffix {
  position: absolute;
  top: 10% !important;
  text-align: center;
}
.EquipmentSignal_tanchuang_ying_IP {
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
          //添加巡检计划
          .InspectionPlan_add {
            //添加
            .InspectionPlan_add_cen_top {
              margin-top: 5vh;
              opacity: 0.9;
              li {
                position: relative;
                margin-top: 1vh;
                display: flex;
                justify-content: center;
                align-items: center;
                transform: translateZ(0);
                .el-input {
                  width: unset !important;
                }
                //请选择
                .po_witd {
                  position: absolute;
                  top: 50%;
                  right: 36%;
                  transform: translate(-36%, -50%);
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  // color: #00f0ff;
                }

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
                  color: #ffffff;
                  padding-left: 0.7vw;
                }
                span {
                  display: inline-block;
                  text-align: left;
                  font-size: 16px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #00f0ff;
                }
                .span_wi {
                  width: 85px;
                }
                .padding_le {
                  input {
                    padding-left: 40px;
                  }
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
            }
          }

          .editTime_add {
            //添加时间
            margin: 0 3vw;

            .editTime_center {
              .editTime_list {
                margin-top: 8vh;
                .time_input {
                  display: flex;
                  color: #fff;
                  > i {
                    margin: 0 7px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                  > span {
                    min-width: 54px;
                    vertical-align: top;
                    line-height: 3vh;
                  }
                }
                > li {
                  margin-top: 3vh;
                  margin-left: 50%;
                  transform: translateX(-50%);
                  opacity: 0.8;
                  span {
                    font-size: 14px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
                    color: #ffffff;
                  }
                  input {
                    width: 6.4vw;
                    height: 3vh;
                    line-height: 3vh;
                    background-color: rgba(0, 0, 0, 0);
                    border: 1px solid #00f0ff;
                    font-size: 14px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
                    color: #ffffff;
                    padding-left: 30px;
                    padding-right: 10px;
                  }
                }
              }
            }
          }
          //添加巡检项
          .editTheCheck_add {
            //添加信号
            .signalTc {
              .signalTc_center {
                margin-top: 6vh;
                width: 100%;

                height: 33vh;
                overflow: auto;
                li {
                  margin-top: 1vh;
                  display: flex;
                  justify-content: start;
                  margin-left: 200px;
                  align-items: center;
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
                    color: #ffffff;
                    padding-left: 0.7vw;
                  }
                  span {
                    font-size: 16px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
                    color: #00f0ff;
                  }
                  .span_width {
                    width: 70px;
                  }
                  .empty {
                    font-size: 16px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
                    color: #00f0ff;
                  }
                  .checkboxList {
                    // width: 8.5vw;
                    // height: 20vh;
                    width: 20vw;
                    height: 6vh;
                    overflow: auto;
                    .information_bootom {
                      background-color: rgba(0, 0, 0, 0) !important;
                      opacity: 0.8;

                      .readio_information {
                        display: flex;
                        justify-content: start;
                        flex-direction: row;
                        flex-wrap: wrap;

                        .radio_type {
                          margin-right: 6px;
                          width: 0px;
                          height: 0px;

                          appearance: none;
                          position: relative;
                          border: none;
                          outline: none;
                        }
                        .radio_type:before {
                          content: '';
                          width: 10px;
                          height: 10px;
                          border: 1px solid #00f0ff;
                          display: inline-block;
                          border-radius: 10%;
                          vertical-align: middle;
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                        }
                        .radio_type:checked:before {
                          content: '';
                          width: 10px;
                          height: 10px;
                          border: 1px solid #00f0ff;
                          display: inline-block;
                          border-radius: 10%;
                          vertical-align: middle;
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                        }
                        .radio_type:checked:after {
                          content: '';
                          width: 6px;
                          height: 6px;
                          text-align: center;
                          background: #00f0ff;
                          border-radius: 10%;
                          display: block;
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                        }

                        label {
                          height: 2vh;
                          line-height: 2vh;
                          font-size: 14px;
                          font-family: MicrosoftYaHei;
                          font-weight: 400;
                          color: #00f0ff;
                          margin: 0 0.8vw;
                          display: flex;
                          align-items: center;
                          cursor: pointer;

                          input {
                            line-height: 2vh;
                          }
                          span {
                            margin: 0.3vw;
                          }
                        }
                      }
                    }
                  }
                  .checkboxLists {
                    // width: 8.5vw;
                    // height: 20vh;
                    // width: 20vw;
                    // height: 20vh;
                    overflow: auto;
                    .information_bootom {
                      background-color: rgba(0, 0, 0, 0) !important;
                      opacity: 0.8;

                      .readio_information {
                        display: flex;
                        justify-content: start;
                        flex-direction: row;
                        flex-wrap: wrap;

                        .radio_type {
                          margin-right: 6px;
                          width: 0px;
                          height: 0px;
                          appearance: none;
                          position: relative;
                          border: none;
                          outline: none;
                        }
                        .radio_type:before {
                          content: '';
                          width: 10px;
                          height: 10px;
                          border: 1px solid #00f0ff;
                          display: inline-block;
                          border-radius: 50%;
                          vertical-align: middle;
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                        }
                        .radio_type:checked:before {
                          content: '';
                          width: 10px;
                          height: 10px;
                          border: 1px solid #00f0ff;
                          display: inline-block;
                          border-radius: 50%;
                          vertical-align: middle;
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                        }
                        .radio_type:checked:after {
                          content: '';
                          width: 6px;
                          height: 6px;
                          text-align: center;
                          background: #00f0ff;
                          border-radius: 50%;
                          display: block;
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                        }

                        label {
                          height: 2vh;
                          line-height: 2vh;
                          font-size: 14px;
                          font-family: MicrosoftYaHei;
                          font-weight: 400;
                          color: #00f0ff;
                          margin: 0 0.8vw;
                          display: flex;
                          align-items: center;
                          cursor: pointer;

                          input {
                            line-height: 2vh;
                          }
                          span {
                            margin: 0.3vw;
                          }
                        }
                      }
                    }
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
