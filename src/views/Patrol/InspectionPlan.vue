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
                  'EditPatrolPlan'
                )
              "
            >
              <button @click="addTc('InspectionPlan_add', '')">添加</button>
            </div>
          </div>
          <div class="InspectionPlan_main_center">
            <div class="InspectionPlan_main_list">
              <el-table
                :data="InspectionPlanGetListData.list"
                style="width: 100%"
                :row-class-name="tableRowClassName"
              >
                <el-table-column
                  show-overflow-tooltip
                  prop="name"
                  label="名称"
                ></el-table-column>
                <!-- <el-table-column
                  prop="departmentName"
                  label="负责部门"
                  show-overflow-tooltip
                ></el-table-column> -->
                <el-table-column
                  label="巡检频率"
                  show-overflow-tooltip
                >
                  <template scope="scope">
                    <span>{{ scope.row.period + '天' }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="nextDate"
                  label="下一周期"
                  show-overflow-tooltip
                >
                  <template scope="scope">
                    <span>
                      {{
                        DateTime.parse(scope.row.nextDate).format('yyyy-MM-dd')
                      }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="编辑时间"
                  width="100px"
                  v-if="
                    $Tools.accessControl(
                      this.$store.state.userGetUserRole.resList,
                      'EditPatrolPlan'
                    )
                  "
                >
                  <template scope="scope">
                    <span
                      class="changkan"
                      @click="addTc('editTime', scope.row.no)"
                    >编辑时间</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="巡检项目"
                  width="100px"
                  v-if="
                    $Tools.accessControl(
                      this.$store.state.userGetUserRole.resList,
                      'EditPatrolPlan'
                    )
                  "
                >
                  <template scope="scope">
                    <span
                      class="changkan"
                      @click="addTc('shezhi', scope.row.no)"
                    >巡检项目</span>
                  </template>
                </el-table-column>
                <!-- <el-table-column
                  label="编辑巡检项"
                  width="100px"
                  v-if="
                    $Tools.accessControl(
                      this.$store.state.userGetUserRole.resList,
                      'EditInspectionPlan'
                    )
                  "
                >
                  <template slot-scope="scope">
                    <span
                      class="green"
                      @click="addTc('editTheCheck', scope.row.no)"
                    >编辑巡检项</span>
                  </template>
                </el-table-column> -->
                <el-table-column
                  label="编辑"
                  width="60px"
                  v-if="
                    $Tools.accessControl(
                      this.$store.state.userGetUserRole.resList,
                      'EditPatrolPlan'
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
                      'EditPatrolPlan'
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
                  :total="InspectionPlanGetListData.total"
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
                  ? '添加巡检计划'
                  : WorkOrderTcType == 'InspectionPlan_ed'
                  ? '编辑巡检计划'
                  : WorkOrderTcType == 'editTime'
                  ? '编辑巡检时间'
                  : WorkOrderTcType == 'editTime_add'
                  ? '添加巡检时间'
                   : WorkOrderTcType == 'shezhiadd'
                  ? '添加巡检项目'
                  : WorkOrderTcType == 'shezhiedit'
                  ? '编辑巡检项目'
                  : WorkOrderTcType == 'editTheCheck'
                  ? '编辑巡检项'
                  : WorkOrderTcType == 'editTheCheck_add'
                  ? '添加巡检项'
                  : WorkOrderTcType == 'chakanLog'
                  ? '查看工单'
                  : WorkOrderTcType == 'shezhi'
                  ? '巡检项目列表'
                  
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
                        <el-form-item prop="InspecTcName">
                          <span class="span_wii">名称：</span>
                          <el-input
                            type="text"
                            v-model="formValidator.InspecTcName"
                          />
                          <i>*</i>
                        </el-form-item>
                      </li>
                      <!-- <li>
                        <el-form-item prop="projectNos">
                          <span class="span_wii">巡检项目：</span>
                          <el-select
                            v-model="formValidator.projectNos"
                            multiple
                            filterable
                            collapse-tags
                            @change="gaibian"
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="item in options"
                              :key="item.no"
                              :label="item.name"
                              :value="item.no"
                            >
                            </el-option>
                          </el-select>
                          <div style="display:inline-block;width: 240px;"><span class="shezhi" @click="WorkOrderTcType = 'shezhi'">
                              设置
                            </span></div>
                          <i>*</i>
                        </el-form-item>
                      </li> -->
                      <li>
                        <el-form-item prop="schedulingDepartment">
                          <span class="span_wii">负责部门：</span>
                          <el-cascader
                            :show-all-levels="false"
                            v-model="formValidator.schedulingDepartment"
                            :options="sDepartmentData"
                            :props="{
                              expandTrigger: 'hover',
                              checkStrictly: true
                            }"
                            ref="cascader"
                            @change="
                              sDepartmentChane(
                                formValidator.schedulingDepartment
                              )
                            "
                            :placeholder="formValidator.schedulingDepartment?formValidator.schedulingDepartment:'请选择'"
                          >
                            <template slot-scope="{ node, data }">
                              <span disabled>{{ data.label }}</span>
                              <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                            </template>
                          </el-cascader>
                          <i>*</i>
                        </el-form-item>
                      </li>
                      <!-- <li class="zixitong">
                        <el-form-item prop="floorlistName">
                          <span class="span_wii">地点：</span>
                          <el-cascader
                            :show-all-levels="false"
                            v-model="formValidator.floorlistName"
                            :options="floorlist"
                            :props="{
                            expandTrigger: 'hover',
                            value: 'model',
                            checkStrictly: true
                          }"
                            @change="floorlistChane(formValidator.floorlistName)"
                            :placeholder="formValidator.floorlistName"
                          >
                            <template slot-scope="{ node, data }">
                              <span disabled>{{ data.model.name }}</span>
                              <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                            </template>
                          </el-cascader>
                          <i>*</i>
                        </el-form-item>
                      </li> -->
                      <!-- <li>
                        <el-form-item prop="userNo">
                          <span class="span_wii">巡检人：</span>
                          <el-select
                            v-model="formValidator.userNo"
                            filterable
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="item in userlist"
                              :key="item.no"
                              :label="item.name"
                              :value="item.no"
                            >
                            </el-option>
                          </el-select>
                          <i>*</i>
                        </el-form-item>
                      </li> -->
                      <li>
                        <el-form-item prop="Period">
                          <span
                            class="span_wii"
                            style=" width: 125px !important;"
                          >巡检频率(天)：</span>
                          <el-input
                            type="text"
                            v-model.number="formValidator.Period"
                          />
                          <i>*</i>
                        </el-form-item>
                        <div class="po_witd">天</div>
                      </li>
                      <li>
                        <el-form-item prop="MaintainTime">
                          <span
                            class="span_wii"
                            style=" width: 125px !important;"
                          >开始巡检日期：</span>
                          <el-date-picker
                            class="didian padding_le"
                            v-model="formValidator.MaintainTime"
                            type="date"
                            :disabled-date="disabledDate"
                            :picker-options="{
                              disabledDate: time => {
                                return time.getTime() < new Date()
                              },

                              
                            }"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                          ></el-date-picker>
                          <!---->
                          <i>*</i>
                        </el-form-item>
                      </li>
                       <li>
                          <el-form-item prop="isWeekend">
                            <span
                              class=""
                              style=" width: 125px !important;"
                            >是否周末执行：</span>
                            <el-radio-group style="width: 240px;"
                             v-model="formValidator.isWeekend">
      <el-radio :label="true">是</el-radio>
      <el-radio :label="false">否</el-radio>
      
    </el-radio-group>
                            <i>*</i>
                          </el-form-item>
                          
                        </li>
                    </el-form>
                  </ul>
                </div>
                <div
                  v-else-if="WorkOrderTcType == 'editTime'"
                  class="editTime"
                >
                  <editTime2
                    :InspectionPlan="InspectionPlan"
                    v-on:addTc="addTc"
                  ></editTime2>
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
                  <editTheCheck2
                    :InspectionPlan="InspectionPlan"
                    v-on:addTc="addTc"
                  ></editTheCheck2>
                </div>
                <div
                  v-else-if="WorkOrderTcType == 'editTheCheck_add'"
                  class="editTheCheck_add"
                >
                  <div class="signalTc">
                    <ul class="signalTc_center">
                      <li class="zixitong">
                        <span class="span_wiidth">地点：</span>
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
                        <span
                          class="span_wiidth"
                          style=" width: 125px !important;"
                        >巡检项：</span>

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
                <div v-else-if="WorkOrderTcType == 'shezhi'">
                  <editpatroplan
                    :InspectionPlan="InspectionPlan"
                    v-on:addTc="addTc"
                    v-on:test="test"
                  ></editpatroplan>

                </div>
                <div
                  v-else-if="WorkOrderTcType == 'shezhiadd'  ||WorkOrderTcType == 'shezhiedit'"
                  class="InspectionPlan_add"
                >
                  <ul class="InspectionPlan_add_cen_top formValidator">
                    <el-form
                      :model="formitems"
                      ref="formitems"
                      label-width="100px"
                      class="demo-dynamic"
                      :rules="rules2"
                    >
                      <li>
                        <el-form-item prop="name">
                          <span class="span_wii">名称：</span>
                          <el-input
                            type="text"
                            v-model="formitems.name"
                          />
                          <i>*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item prop="projectNo">
                          <span class="span_wii">巡检项目：</span>
                          <el-select
                            v-model="formitems.projectNo"
                            multiple
                            filterable
                            collapse-tags
                            @change="gaibian(formitems.projectNo)"
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="item in options"
                              :key="item.no"
                              :label="item.name"
                              :value="item.no"
                            >
                            </el-option>
                          </el-select>

                          <i>*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item prop="type">
                          <span class="span_wii">类型：</span>
                          <el-select
                            v-model="formitems.type"
                            @change="gaibian2"
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="item in optionstype"
                              :key="item.no"
                              :label="item.name"
                              :value="item.no"
                            >
                            </el-option>
                          </el-select>

                          <i>*</i>
                        </el-form-item>
                      </li>
                      <li
                        class="zixitong"
                        v-if="positionshow==true"
                      >
                        <el-form-item :prop="positionshow==true?'ids1':''">
                          <span class="span_wii">地点：</span>
                          <el-cascader
                            key="15"
                            :show-all-levels="false"
                            v-model="formitems.ids1"
                            :options="floorlist"
                            :props="{
                            expandTrigger: 'hover',
                            value: 'id',
                            label:'name',
                            checkStrictly: true,
                             multiple: true
                          }"
                            @change="floorlistChane2(formitems.ids1)"
                          >
                            <template slot-scope="{ node, data }">
                              <span v-if="node.isLeaf">({{ data.model.code}})</span>
                              <span disabled>{{ data.name }}</span>
                              <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                            </template>
                          </el-cascader>
                          <i>*</i>
                        </el-form-item>
                      </li>
                      <!-- <li class="zixitong">
                        <el-form-item prop="floorlistName">
                          <span class="span_wii">地点：</span>
                          <el-cascader
                            :show-all-levels="false"
                            v-model="formValidator.floorlistName"
                            :options="floorlist"
                            :props="{
                            expandTrigger: 'hover',
                            value: 'model',
                            checkStrictly: true
                          }"
                            @change="floorlistChane(formValidator.floorlistName)"
                            :placeholder="formValidator.floorlistName"
                          >
                            <template slot-scope="{ node, data }">
                              <span disabled>{{ data.model.name }}</span>
                              <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                            </template>
                          </el-cascader>
                          <i>*</i>
                        </el-form-item>
                      </li> -->
                      <li v-if="positionshow==false">
                        <el-form-item :prop="positionshow==false?'ids2':''">
                          <span class="span_wii">设备：</span>
                          <el-select
                            v-model="formitems.ids2"
                            filterable
                            multiple
                            collapse-tags
                            key="123"
                            @change="shebeichange(formitems.ids2)"
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="item in equipmentlist"
                              :key="item.no"
                              :label="item.name+'--'+item.no"
                              :value="item.no"
                            >
                            </el-option>
                          </el-select>
                          <i>*</i>
                        </el-form-item>
                      </li>

                    </el-form>
                  </ul>
                </div>
                <div
                  class="tanchuang_center_cen_bottom"
                  v-if="
                    WorkOrderTcType != 'editTime' &&
                      WorkOrderTcType != 'selectEquipmentEd' &&
                      WorkOrderTcType != 'CheckTheMaintenance' &&
                      WorkOrderTcType != 'chakan' &&
                      WorkOrderTcType != 'chakanLog' &&
                      WorkOrderTcType != 'editTheCheck'&&
                      WorkOrderTcType != 'shezhi'
                  "
                >
                  <button
                    @click="
                      WorkOrderTcType == 'InspectionPlan_add'
                        ? InspectionPlanAdd('formValidator')
                        : WorkOrderTcType == 'InspectionPlan_ed'
                        ? InspectionPlanUpdate('formValidator')
                         : WorkOrderTcType == 'shezhiadd'
                        ? shezhiAdd()
                        : WorkOrderTcType == 'shezhiedit'
                        ? shezhiAdd()
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
                   <button @click="WorkOrderTcType = 'shezhi'" v-if="WorkOrderTcType == 'shezhiedit'||WorkOrderTcType == 'shezhiadd'">取消</button>
                  <button @click="WorkOrderTcShow = false" v-else>取消</button>
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
                  WorkOrderTcType != 'editTheCheck'&&
                  WorkOrderTcType != 'shezhi'
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
                    : WorkOrderTcType == 'shezhiadd'
                    ? 'shezhi'
                     : WorkOrderTcType == 'shezhiedit'
                    ? 'shezhi'
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
      disabledDate(time) {
        // return time.getTime() > Date.now(); //禁止选择今天以后的时间
        return time.getTime() < Date.now() - 8.64e7 //禁止选择今天以前的时间
      },
      formitems: {
        ids1: '',
        ids2: '',
        projectNo: '',
        id: '',
        // no: '',
        planNo: '',
        name: '',
        type: 1,
      },
      equipmentlist: [],
      optionstype: [
        {
          no: 1,
          name: '地点',
        },
        {
          no: 2,
          name: '设备',
        },
      ],
      options: [
        {
          value: '1',
          label: '文本',
        },
        {
          value: '2',
          label: '选项',
        },
      ],
      pageIndex: 1, //历史页码
      pageSize: 13, //一页多少条
      DateTime: DateTime,
      formValidator: {
        no: '',
        // userNo: '',
        floorlistId: '',
        projectNos: [],
        InspecTcName: '',
        floorlistName: '',
        schedulingDepartment: '',
        isWeekend:true,
        Period: 0, //周期
        MaintainTime: new Date() + 3600 * 1000 * 24, //下一周期
      },
      rules2: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        projectNo: [
          { required: true, message: '请选择巡检项目', trigger: 'blur' },
        ],
        ids1: [{ required: true, message: '请选择地点', trigger: 'blur' }],
        ids2: [{ required: true, message: '请选择设备', trigger: 'blur' }],
      },
      rules: {
        InspecTcName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        // floorlistName: [
        //   { required: true, message: '请选择地点', trigger: 'change' },
        // ],
        schedulingDepartment: [
          { required: true, message: '请选择部门', trigger: 'change' },
        ],
        Period: [
          { required: true, message: '请输入周期', trigger: 'blur' },
          {
            type: 'number',
            message: '必须为数字值',
            trigger: 'blur',
          },
        ],
        MaintainTime: [
          { required: true, message: '请选择下一周期', trigger: 'change' },
        ],
      },
      positionshow: true,
      InspectionPlanGetListData: '', //巡检计划
      WorkOrderTcShow: false,
      WorkOrderTcType: 'add',
      sDepartmentData: [], //所属部门数据：
      sDepartmentId: '.01.', //部门id
      InspectionPlan: '', //巡检计划项
      BeginTime: '',
      EndTime: '',
      inputEquipment: '',
      inputEquipmentType: '所有',
      userlist: [],
      floorlist: [], //楼层
      InspectionPlanGetInspectionsData: [],
      xjcheck: true, //巡检是否选择
      xjcheckboxNo: '',
      xjIdArr: [],
      floorlistId: '',
      floorlistName: '',
      test: 1,
    }
  },
  mounted() {
    this.$api.MMS.Equipment.GetAllList().then((res) => {
      if (res.ok) {
        this.equipmentlist = res.data
      }
    })
    this.$api.MMS.User.UserGetList({
      PageIndex: 1,
      PageSize: 999,
    }).then((res) => {
      console.log(res)
      this.userlist = res.data.list
    })
    this.$api.MMS.PatrolProject.Get({
      PageIndex: 1,
      PageSize: 999,
    }).then((res) => {
      // console.log(res);
      this.options = res.data.list
    })
    this.InspectionPlanGetList()
    this.DepartmentGetAllList() //获取所属部门
    this.AreaGetAllList() //获取楼层
  },
  methods: {
    shezhiAdd() {
      console.log(this.formitems)
      // if (this.formitems.ids1) {
      //   this.$refs['formitems'].clearValidate('ids1')
      // }
      //  if (this.formitems.ids2) {
      //   this.$refs['formitems'].clearValidate('ids2')
      // }
      this.$refs['formitems'].validate(async (valid) => {
        if (valid) {
          if (this.WorkOrderTcType == 'shezhiadd') {
            this.$api.MMS.PatrolPlan.AddTeam(this.formitems).then((res) => {
              if (res.ok) {
                this.$Tools.LayerMsgInfo('成功')
                this.test++
                this.WorkOrderTcType = 'shezhi'
              } else {
                this.$Tools.LayerMsgErr(res.message)
              }
            })
          } else if (this.WorkOrderTcType == 'shezhiedit') {
            let list = []
            let list2 = []
            let list3 = []
            // this.formitems.patrolProject.forEach((res) => {
            //   list.push(res.no)
            // })
            if (this.formitems.area) {
              this.formitems.area.forEach((res) => {
                list2.push(res.id)
              })
            }
            if (this.formitems.equipment) {
              this.formitems.equipment.forEach((res) => {
                list3.push(res.no)
              })
            }
            if (this.formitems.id == list2 || this.formitems.id == list3) {
              this.formitems.id = list2.length > 0 ? list2 : list3
            }
            if (!this.formitems.id) {
              this.formitems.id = list2.length > 0 ? list2 : list3
            }
            if (this.formitems.projectNo.length==0 ) {
              // console.log(123)
              this.$Tools.LayerMsgErr('巡检项目不可为空！！')
              return false
            }
            if (this.formitems.id.length == 0) {
              // console.log(123)
              this.$Tools.LayerMsgErr('设备或地点不可为空！！')
              return false
            }
            // this.formitems.projectNo = list
            // if (!this.formitems.ids1 || !this.formitems.ids2) {
            //   console.log(123)
            //   this.$Tools.LayerMsgInfo('设备或地点不可为空！！')
            //   return false
            // }
            this.$api.MMS.PatrolPlan.UpdateTeam(this.formitems).then((res) => {
              if (res.ok) {
                this.$Tools.LayerMsgInfo('成功')
                this.test++
                this.WorkOrderTcType = 'shezhi'
              } else {
                this.$Tools.LayerMsgErr(res.message)
              }
            })
          }

          console.log(this.formitems)
        } else {
        }
      })
    },
    getDepAllParentIdsWithSelfId(data, id) {
      // console.log(data, id)
      //  return
      for (let i = 0; i < data.length; i++) {
        if (data[i].children) {
          var ret = this.getDepAllParentIdsWithSelfId(data[i].children, id)
          if (ret) {
            ret.unshift(data[i].id)
            // console.log(ret);
            return ret
          }
        }

        if (data[i].id == id) {
          return [id]
        }
      }
      return null
    },
    getDepIds(data, ids) {
      console.log(data, ids)
      if (!ids) return null
      var res = []
      ids.forEach((id) => {
        var ret = this.getDepAllParentIdsWithSelfId(data, id)
        if (ret) {
          res.push(ret)
        }
      })

      return res
    },
    shebeichange(val) {
      this.$forceUpdate()
      console.log(val)
      this.formitems.ids2 = val
      this.formitems.id = val
    },
    gaibian2() {
      if (this.formitems.type == 1) {
        this.positionshow = true
      } else if (this.formitems.type == 2) {
        this.positionshow = false
      }
    },
    gaibian(val) {
      this.$forceUpdate()
      console.log(val)
      this.formitems.projectNo = val
      document
        .querySelectorAll('.el-select__input')[0]
        .setAttribute('placeholder', '快速搜索')
    },
    Current(e) {
      this.pageIndex = e
      this.InspectionPlanGetList()
    },
    async InspectionPlanAddArea() {
      //添加巡检项
      const res = await this.$api.MMS.InspectionPlan.AddArea({
        No: this.InspectionPlan,
        InspectNos: this.xjIdArr,
      })
      if (res.ok) {
        this.WorkOrderTcType = 'editTheCheck'

        this.$Tools.LayerMsgInfo('成功')
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    //复选框点击事件
    checkboxClick(item) {
      this.xjcheckboxNo = item.no
      const index = this.xjIdArr.indexOf(item.no)

      if (index == -1) {
        this.xjIdArr.push(item.no)
      } else {
        this.xjIdArr.splice(index, 1)
      }
    },
    async InspectionPlanGetInspections(id) {
      //根据地点获取巡检项
      const res = await this.$api.MMS.InspectionPlan.GetInspections({
        id: id,
        planNo: this.InspectionPlan,
      })
      if (res.ok) {
        this.InspectionPlanGetInspectionsData = res.data
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },

    async AreaGetAllList() {
      //获取楼层
      const res = await this.$api.MMS.Area.GetAllList({})
      if (res.ok) {
        console.log(res.data)
        this.floorlist = this.getTreeData(res.data)
        console.log(this.floorlist)
        // this.floorlistId = this.floorlist && this.floorlist[0].model.id //部门id
        // this.floorlistName = this.floorlist && this.floorlist[0].model.name
      }
    },

    async InspectionPlanAddTime() {
      //添加巡检时间
      if (this.BeginTime && this.EndTime) {
        let data1 = this.BeginTime.substring(0, 2) - 0
        let data2 = this.EndTime.substring(0, 2) - 0
        if (data1 >= data2) {
          return this.$Tools.LayerMsgErr('结束时间不能早于开始时间！')
        }
        const res = await this.$api.MMS.PatrolPlan.AddTime({
          No: 0,
          PlanNo: this.InspectionPlan,
          BeginTime: this.BeginTime,
          EndTime: this.EndTime,
        })
        if (res.ok) {
          this.WorkOrderTcType = 'editTime'

          this.$Tools.LayerMsgInfo('成功')
        } else {
          this.$Tools.LayerMsgErr(res.message)
        }
      } else {
        this.$Tools.LayerMsgErr('请选择时间')
      }
    },
    async InspectionPlanUpdate(formName) {
      //添加巡检计划
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.MMS.PatrolPlan.Update({
            No: this.InspectionPlan,
            Name: this.formValidator.InspecTcName,
            DepartmentId: this.sDepartmentId,
            areaId: this.formValidator.floorlistId,
            projectNos: this.formValidator.projectNos,
            Period: this.formValidator.Period,
            NextDate: this.$moment(this.formValidator.MaintainTime).format(
              'YYYY-MM-DD'
            ),
             isWeekend: this.formValidator.isWeekend
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
      //添加巡检计划
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.MMS.PatrolPlan.Add({
            DepartmentId: this.formValidator.departmentId,
            areaId: this.formValidator.floorlistId,
            Name: this.formValidator.InspecTcName,
            projectNos: this.formValidator.projectNos,
            Period: this.formValidator.Period,
            NextDate: this.$moment(this.formValidator.MaintainTime).format(
              'YYYY-MM-DD'
            ),
            isWeekend:this.formValidator.isWeekend
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
    previous(type) {
      //返回上一步按钮

      this.WorkOrderTcShow = true
      this.WorkOrderTcType = type
    },
    // findend(id, list) {
    //   for (let index = 0; index < list.length; index++) {
    //     const element = list[index];
    //      if (list[index].value == id) {
    //       console.log(element.label);
    //       return element.label
    //     }
    //    else if (list[index].children) {
    //       this.findend(id,list[index].children)
    //     }
    //   }
    // },
    // findend2(id, list) {
    //   for (let index = 0; index < list.length; index++) {
    //     const element = list[index].model;
    //      if (list[index].model.id == id) {
    //       console.log(element.name);
    //       return element.name
    //     }
    //    else if (list[index].children) {
    //       this.findend2(id,list[index].children)
    //     }
    //   }
    // },
    async addTc(type, item) {
      if (type == 'shezhiadd') {
        this.positionshow = true
        this.formitems = {
          ids1: '',
          ids2: '',
          projectNo: '',
          id: '',
          // no: '',
          planNo: item,
          name: '',
          type: 1,
        }
      }
      if (type == 'shezhiedit') {
        if (item.type == 1) {
          this.positionshow = true
        }
        if (item.type == 2) {
          this.positionshow = false
        }
        console.log(item)
        this.formitems = item
        let arr = []
        item.patrolProject.forEach((item) => {
          arr.push(item.no)
        })
        this.formitems.projectNo = arr
        console.log(this.formitems.projectNo)
        if (this.positionshow == true) {
          let list = []
          item.area.forEach((item) => {
            list.push(item.id)
          })
          this.formitems.ids1 = this.getDepIds(this.floorlist, list)
          console.log(this.formitems.ids1)
        } else {
          let list = []
          item.equipment.forEach((item) => {
            list.push(item.no)
          })
          this.formitems.ids2 = list
        }
      }
      if (type == 'shezhi') {
        this.formitems.planNo = item
        this.InspectionPlan = item
      }
      if (type == 'InspectionPlan_add') {
        ;(this.formValidator = {
          no: '',
          userNo: '',
          projectNos: [],
          floorlistName: '',
          InspecTcName: '',
          floorlistId: '',
          areaId: '',
          schedulingDepartment: '',
          isWeekend:true,
          Period: 0, //周期
          MaintainTime: new Date(), //下一周期
        }),
          (this.formValidator.InspecTcName = '')
        this.formValidator.Period = 1
        let date = new Date()
        // console.log(date.getTime());
        this.formValidator.MaintainTime = new Date(
          date.getTime() + 3600 * 1000 * 24
        )
      } else if (type == 'InspectionPlan_ed') {
        console.log(item)
        // console.log(this.floorlist);
        this.formValidator.schedulingDepartment = item.departmentName
        this.InspectionPlan = item.no
        this.formValidator.isWeekend=item.isWeekend
        this.formValidator.areaId = item.areaId
        this.formValidator.floorlistId = item.areaId
        this.formValidator.floorlistName = item.areaName
        this.formValidator.departmentId = item.departmentId
        this.formValidator.projectNos = item.projectNos
        this.formValidator.InspecTcName = item.name
        // this.formValidator.schedulingDepartment = item.departmentName
        this.sDepartmentId = item.departmentId
        this.formValidator.Period = item.period
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
      const res = await this.$api.MMS.PatrolPlan.Delete({
        no,
      })
      if (res.ok) {
        this.InspectionPlanGetList()
        this.$Tools.LayerMsgErr('删除成功')
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    async InspectionPlanGetList() {
      //获取列表
      const res = await this.$api.MMS.PatrolPlan.Get({
        PageIndex: this.pageIndex,
        PageSize: this.pageSize,
      })
      if (res.ok) {
        console.log(res)
        this.InspectionPlanGetListData = res.data
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    async DepartmentGetAllList() {
      const GetDepartment = await this.$api.MMS.Department.Get({})
      //获取所有部门
      if (GetDepartment.ok) {
        this.sDepartmentData = GetDepartment.data
        // console.log(this.sDepartmentData[0].name)
        this.formValidator.schedulingDepartment = this.sDepartmentData[0].name
        this.sDepartmentId = this.sDepartmentData[0].idDep
      }
    },
    getTreeData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].model) {
          data[i].id = data[i].model.id
          data[i].name = data[i].model.name
        }
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
      console.log(name)
      //所属部门change事件
      this.formValidator.departmentId = name[name.length - 1]
      console.log(this.formValidator.departmentId)
      // console.log(name[name.length - 1]);
      // console.log(this.$refs.cascader.getCheckedNodes()[0])
      this.formValidator.schedulingDepartment =
        this.$refs.cascader.getCheckedNodes()[0].label
      this.getvalue(
        this.sDepartmentData,
        this.$refs.cascader.getCheckedNodes()[0].label
      )
      // let res = ''
      // for (var i = 0; i < name.length; i++) {
      //   res = name[i].name

      //   this.sDepartmentId = name[i].id
      // }

      // this.formValidator.schedulingDepartment = res
    },
    getvalue(e, name) {
      let a = name
      for (var i = 0; i < e.length; i++) {
        if (e[i].children) {
          this.getvalue(e[i].children, a)
        }
        console.log(e[i].label)
        if (e[i].label == name) {
          console.log(e[i].label, name)
          console.log(e[i])
          this.sDepartmentId = e[i].value
          // console.log(this.sDepartmentId);
        }
      }
    },
    async floorlistChane2(name) {
      console.log(name)
      // if (this.positionshow == true) {
      this.formitems.ids1 = name
      let arr = []
      // console.log(name)
      name.forEach((p) => {
        arr.push(p[p.length - 1])
      })
      console.log(arr)
      this.formitems.id = arr
      //所属部门change事件
      // } else {
      // }
    },
    async floorlistChane(name) {
      console.log(name)
      //所属部门change事件
      let res = ''
      for (var i = 0; i < name.length; i++) {
        res = name[i].name
        this.formValidator.floorlistId = name[i].id
      }

      this.formValidator.floorlistName = res
      this.InspectionPlanGetInspections(this.floorlistId)
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
<style lang="scss">

.shezhi {
  cursor: pointer;
  text-align: center !important;
  line-height: 1.625rem !important;
  width: 4.375rem;
  height: 1.625rem;
  background: #30b8ff !important;
  border-radius: 0.125rem;
  font-size: 0.875rem;
  font-weight: 400;
  color: #ffffff !important;
}
.el-select__input {
  border: none !important;
}
.el-input__inner {
  &::placeholder {
    color: #fff;
  }
}
.el-select__tags > span:first-child span {
  width: 90px;
  text-align: center;
  overflow: hidden !important;

  text-overflow: ellipsis !important;

  white-space: nowrap !important;
}
.el-tag .el-icon-close {
  border-radius: 50%;
  text-align: center;
  position: relative;
  cursor: pointer;
  font-size: 0.75rem;
  height: 1rem;
  width: 1rem;
  line-height: 0rem;
}
.el-select .el-tag__close.el-icon-close {
  position: relative;
  background-color: transparent;
  top: -4px !important;
  color: #fff;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}
.EquipmentSignal_tanchuang_ying_IP
  .tanchuang
  .tanchuang_bg
  .tanchuang_center
  .tanchuang_center_cen
  .InspectionPlan_add
  .InspectionPlan_add_cen_top
  li
  input {
  border-radius: 0;
  width: 12.5vw !important;
  height: 3vh;
  line-height: 3vh;
  background-color: rgba(0, 0, 0, 0);
  border: 0.0625rem solid #00f0ff;
  font-size: 0.875rem;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #ffffff;
  padding-left: 0.7vw;
}
.el-select__input {
  border-color: transparent;
}
.el-tag.el-tag--info {
  background-color: transparent !important;
  color: #909399;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  color: #409eff;
  background-color: transparent;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected:hover {
  color: #409eff;
  background-color: transparent;
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
                .span_wii {
                  width: 125px !important;
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
                  .span_wiidth {
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
.el-cascader-node .el-checkbox .el-checkbox__input {
  /* display: none !important; */
  /* visibility: hidden; */
}
.el-tag__close {
  color: #fff !important;
  background: transparent !important;
}
.el-select__tags-text {
  color: #fff !important;
}
.update_user_info
  .tanchuang_center_cen_top_w
  .tanchuang_center_cen_top
  li
  input {
  width: 9vw;
}
.el-tag--info,
.el-tag,
.el-tag--small,
.el-tag--light {
  background: transparent !important;
}
.el-select__tags,
.el-cascader__tags {
  /* flex-wrap: nowrap; */
}
</style>
