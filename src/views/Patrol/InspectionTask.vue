<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-02-18 16:40:26
 * @LastEditors: Please set LastEditors
 * @Description: 巡检记录
 * @FilePath: \ibms\src\views\Event\components\
-->
<template>
  <div class="Part">
    <el-dialog
      v-model:visible="imgdialogVisible"
      append-to-body
    >
      <img
        width="100%"
        :src="dialogImageUrl"
        alt=""
      >
    </el-dialog>
    <div class="WorkOrderQuery_cneter">
      <div :class="[
          'WorkOrderQuery',
          $store.state.dtab ? 'index_off' : 'index_no'
        ]">
        <div class="WorkOrderQuery_main">
          <div class="WorkOrderQuery_main_top ">
            <div class=" baojin_center_top">
              <ul>
                <li class="baojin_center_top_riqishij">
                  <span class="baojin_center_top_baojin_Time">巡检时间：</span>
                  <el-date-picker
                    v-model="Start"
                    placeholder="选择日期时间"
                    value-format='yyyy-MM-dd HH:mm:ss'
                    format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    align="left"
                    :clearable="false"
                  ></el-date-picker>
                  <span class="shunline">-</span>
                  <el-date-picker
                    v-model="End"
                    value-format='yyyy-MM-dd HH:mm:ss'
                    format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                    align="left"
                    type="datetime"
                    :clearable="false"
                  ></el-date-picker>
                </li>
                <li>
                  <span class="span">巡检计划：</span>
                  <el-select
                    v-model="InspectionPlanName"
                    placeholder="所有"
                    @change="InspectionTaskGetListChane"
                  >
                    <el-option
                      class="ss"
                      v-for="item in InspectionPlanData"
                      :key="item.no"
                      :label="item.name"
                      :value="item.no"
                    ></el-option>
                  </el-select>

                </li>
                <li style="width:200px">
                  <span
                    class="span"
                    style="width:50px"
                  >状态：</span>
                  <el-select
                    v-model="InspeStateName"
                    placeholder="所有"
                    @change="InspeStateChane"
                  >
                    <el-option
                      v-for="itemSt in InspeStateData"
                      :key="itemSt.no"
                      :label="itemSt.name"
                      :value="itemSt.no"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <span
                    class="chaxun"
                    @click="
                      pageIndex = 1
                      InspectionTaskGetList(),
                     gethartTrend()
                    "
                  >查询</span>
                </li>
                <!-- <li>
                  <span class="span">负责部门：</span>
                  <el-cascader
                    :show-all-levels="false"
                    v-model="schedulingDepartment"
                    :options="sDepartmentData"
                    :props="{
                      expandTrigger: 'hover',
                    
                      checkStrictly: true
                    }"
                    @change="sDepartmentChane(schedulingDepartment)"
                    :placeholder="schedulingDepartment"
                  >
                    <template slot-scope="{ node, data }">
                              <span disabled>{{ data.label }}</span>
                              <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                            </template>
                  </el-cascader>
                </li> -->

              </ul>
              <ul>

              </ul>
            </div>
          </div>
          <div class="WorkOrderQuery_main_daochu">
            <div
              class="daochu_right"
              v-if="TaskGetListData.total > 0"
            >
              <span
                class="chu"
                @click="InspectionTaskExportList()"
              >导出</span>
            </div>
          </div>
          <potting-tab
            v-if="TaskGetListData.total > 0"
            :tabData="tabTask"
            v-on:pottingTabClick="pottingTabClick"
          ></potting-tab>
          <div v-if="tabtaskId == '0'">
            <div
              v-if="TaskGetListData.total > 0"
              class="WorkOrderQuery_main_zhon"
            >
              <div class="WorkOrderQuery_main_list">
                <el-table
                  :data="TaskGetListData.list"
                  style="width: 100%"
                  :row-class-name="tableRowClassName"
                  v-loading="searchLoding"
                >
                  <el-table-column
                    prop="createTime"
                    label="巡检时间"
                    width="170px"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      {{ $Convert.getTime(scope.row.time)}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="planName"
                    label="巡检计划"
                    width="150px"
                    show-overflow-tooltip
                  > </el-table-column>
                  <!-- <el-table-column
                    prop="departmentName"
                    label="负责部门"
                    width="150px"
                    show-overflow-tooltip
                  ></el-table-column> -->
                  <el-table-column
                    prop="createUserName"
                    show-overflow-tooltip
                    label="时间段"
                  >
                    <template v-slot="scope">
                      <span>
                        {{
                     DateTime.parse(scope.row.beginTime).format('hh:mm')
                     +' - '
                    
                      }}{{  DateTime.parse(scope.row.endTime).format('hh:mm') == '00:00' ? '24:00' : DateTime.parse(scope.row.endTime).format('hh:mm') }}
                      </span>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column
                    prop="remark"
                    label="备注"
                    width="150px"
                  ></el-table-column> -->
                  <el-table-column
                    prop="userName"
                    label="巡检人"
                    width="150px"
                  ></el-table-column>
                  <!-- <el-table-column
                    label="巡检照片"
                    width="150px"
                  >
                    <template scope="scope">
                      <img
                        v-if="scope.row.imageId1"
                        style="cursor: pointer; width: 40px; height: 40px;margin-right: 10px;"
                        @click="previewChartImg(FileBaseURL + 'api/Image/GetOriginalImg/' + scope.row.imageId1)"
                        :src="FileBaseURL + 'api/Image/GetOriginalImg/' + scope.row.imageId1"
                        alt=""
                      />
                      <img
                        v-if="scope.row.imageId2"
                        style="cursor: pointer;  width: 40px; height: 40px;"
                        @click="previewChartImg(FileBaseURL + 'api/Image/GetOriginalImg/' + scope.row.imageId2)"
                        :src="FileBaseURL + 'api/Image/GetOriginalImg/' + scope.row.imageId2"
                        alt=""
                      />
                    </template>
                  </el-table-column> -->
                  <el-table-column
                    prop="state"
                    label="状态"
                    width="100px"
                  >
                    <template v-slot="scope">
                      <span :style="$Convert.InspectionTask.State(scope.row.state)=='未巡检'?'color:red':''">
                        {{ $Convert.InspectionTask.State(scope.row.state) }}
                      </span>

                    </template>
                  </el-table-column>
                    <el-table-column
                      prop="result"
                      label="预警状态"
                      width="100px"
                    >
                      <template v-slot="scope">
                        <span :style="$Convert.InspectionTask2.State(scope.row.result) == '异常' ? 'color:red' : ''">
                          {{ $Convert.InspectionTask2.State(scope.row.result) }}
                        </span>

                      </template>
                    </el-table-column>
                  <el-table-column
                    label="查看"
                    width="100px"
                  >
                    <template v-slot="scope">
                      <span
                        class="changkan"
                        @click="addTc('chakanXQ', scope.row.no),currentid=scope.row.no"
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
                :total="TaskGetListData.total"
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
          <div :class="['tanchuang_bg']">
            <div class="tanchuang_top">
              <img
                :src="require('~@/assets/image/index/partial_left.png')"
                alt
              />
              <span class="top_title margin_tc">{{
                WorkOrderTcType == 'chakanXQ' ? '查看详情' : WorkOrderTcType == 'chakanXJX' ? chakanXJ:WorkOrderTcType == 'chakanXJXM' ? '查看巡检项目' :''
              }}</span>

              <img
                :src="require('@/assets/image/index/partial_right.png')"
                alt
              />
            </div>
            <div class="tanchuang_center">
              <div class="tanchuang_center_cen">
                <div
                  class="InspectionTask"
                  v-if="WorkOrderTcType == 'chakanXQ'"
                >
                  <!-- <InspectionTaskPeek2
                    :InspectionTaskNo="InspectionTaskNo"
                    v-on:addTc="addTc"
                  ></InspectionTaskPeek2> -->
                  <InspectionTaskPeek3
                    :InspectionTaskNo="InspectionTaskNo"
                    v-on:addTc="addTc"
                  ></InspectionTaskPeek3>
                </div>
                <div
                  class="InspectionTask"
                  v-if="WorkOrderTcType=='chakanXJXM'"
                >
                  <InspectionTaskPeek2
                    :InspectionTaskNo="InspectionTaskNo2"
                    v-on:addTc="addTc"
                  ></InspectionTaskPeek2>

                </div>
                <div
                  class="InspectionTask"
                  v-show="WorkOrderTcType=='chakanXJX'"
                >
                  <InspectionTaskPeek4
                    ref="InspectionTaskPeek4"
                    :InspectionTaskNo="InspectionTaskNo3"
                    v-on:addTc="addTc"
                  ></InspectionTaskPeek4>

                </div>
                <div
                  class="tanchuang_center_cen_bottom"
                  v-if="WorkOrderTcType != 'chakanXJX'&&WorkOrderTcType != 'chakanXQ'&&WorkOrderTcType != 'chakanXJXM'"
                >
                  <button>确认</button>
                  <button @click="WorkOrderTcShow = false">取消</button>
                </div>
              </div>
            </div>
          </div>
          <div class="cancel">
            <img
              v-show="WorkOrderTcType != 'chakanXQ'||WorkOrderTcType=='chakanXJX'||WorkOrderTcType=='chakanXJXM'"
              :src="require('@/assets/image/index/withdrawal.png')"
              alt
              @click="addclick()"
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
import DateTime from '@/js/datetime'
import InspectionTaskPeek4 from '../WorkOrder/components/InspectionTaskPeek4.vue'
export default {
  components: { pottingTab, workTrend, InspectionTaskPeek4 },
  data() {
    return {
      FileBaseURL: window.ApiFileURL,
      hartTrend: {
        dayList: [
          {
            alarmTime: '2021-11-24',
            total: 0,
          },
          {
            alarmTime: '2021-11-25',
            total: 2,
          },
          {
            alarmTime: '2021-11-26',
            total: 1,
          },
          {
            alarmTime: '2021-11-27',
            total: 0,
          },
          {
            alarmTime: '2021-11-28',
            total: 0,
          },
          {
            alarmTime: '2021-11-29',
            total: 4,
          },
          {
            alarmTime: '2021-11-30',
            total: 2,
          },
        ],
        hourList: [
          {
            alarmTime: '2021-11-24 00:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-24 01:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-24 02:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-24 03:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-24 04:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-24 05:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-24 06:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-24 07:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-24 08:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-24 09:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-24 10:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-24 11:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-24 12:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-24 13:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-24 14:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-24 15:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-24 16:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-24 17:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-24 18:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-24 19:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-24 20:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-24 21:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-24 22:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-24 23:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-25 00:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-25 01:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-25 02:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-25 03:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-25 04:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-25 05:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-25 06:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-25 07:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-25 08:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-25 09:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-25 10:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-25 11:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-25 12:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-25 13:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-25 14:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-25 15:00:00',
            total: 1,
          },
          {
            alarmTime: '2021-11-25 16:00:00',
            total: 1,
          },
          {
            alarmTime: '2021-11-25 17:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-25 18:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-25 19:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-25 20:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-25 21:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-25 22:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-25 23:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-26 00:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-26 01:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-26 02:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-26 03:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-26 04:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-26 05:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-26 06:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-26 07:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-26 08:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-26 09:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-26 10:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-26 11:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-26 12:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-26 13:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-26 14:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-26 15:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-26 16:00:00',
            total: 1,
          },
          {
            alarmTime: '2021-11-26 17:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-26 18:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-26 19:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-26 20:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-26 21:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-26 22:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-26 23:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-27 00:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-27 01:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-27 02:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-27 03:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-27 04:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-27 05:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-27 06:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-27 07:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-27 08:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-27 09:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-27 10:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-27 11:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-27 12:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-27 13:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-27 14:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-27 15:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-27 16:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-27 17:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-27 18:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-27 19:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-27 20:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-27 21:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-27 22:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-27 23:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-28 00:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-28 01:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-28 02:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-28 03:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-28 04:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-28 05:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-28 06:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-28 07:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-28 08:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-28 09:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-28 10:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-28 11:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-28 12:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-28 13:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-28 14:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-28 15:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-28 16:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-28 17:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-28 18:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-28 19:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-28 20:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-28 21:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-28 22:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-28 23:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-29 00:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-29 01:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-29 02:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-29 03:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-29 04:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-29 05:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-29 06:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-29 07:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-29 08:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-29 09:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-29 10:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-29 11:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-29 12:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-29 13:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-29 14:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-29 15:00:00',
            total: 1,
          },
          {
            alarmTime: '2021-11-29 16:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-29 17:00:00',
            total: 1,
          },
          {
            alarmTime: '2021-11-29 18:00:00',
            total: 1,
          },
          {
            alarmTime: '2021-11-29 19:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-29 20:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-29 21:00:00',
            total: 1,
          },
          {
            alarmTime: '2021-11-29 22:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-29 23:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-30 00:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-30 01:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-30 02:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-30 03:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-30 04:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-30 05:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-30 06:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-30 07:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-30 08:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-30 09:00:00',
            total: 1,
          },
          {
            alarmTime: '2021-11-30 10:00:00',
            total: 1,
          },
          {
            alarmTime: '2021-11-30 11:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-30 12:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-30 13:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-30 14:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-30 15:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-30 16:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-30 17:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-30 18:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-30 19:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-30 20:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-30 21:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-30 22:00:00',
            total: 0,
          },
          {
            alarmTime: '2021-11-30 23:00:00',
            total: 0,
          },
        ],
      },
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
        // disabledDate(time) {
        //   return time.getTime() > Date.now() - 8.64e6
        // },
      },
      End: this.$moment(
        new Date(
          new Date(new Date().toLocaleDateString()).getTime() +
            1000 * 60 * 60 * 24
        )
      ).format('YYYY-MM-DD HH:mm:ss'),
      Start: this.$moment(
        new Date(
          new Date(new Date().toLocaleDateString()).getTime() -
            6 * 1000 * 60 * 60 * 24
        )
      ).format('YYYY-MM-DD HH:mm:ss'),
      DateTime: DateTime,
      TaskGetListData: {
        list: [],
        total: 0,
      },
      imgdialogVisible: false,
      dialogImageUrl: '',
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
      chakanXJ: '',
      i: 0,
      InspeStateName: '所有',
      InspeStateId: '', //状态
      schedulingDepartment: '所有', //所属部门：
      sDepartmentData: [], //所属部门数据：
      sDepartmentId: '', //部门id
      pageIndex: 1,
      pageSize: 12,
      currentid: '',
      currentid2: '',
      WorkOrderTcShow: false,
      WorkOrderTcType: 'InspectionTask_look',
      InspectionTaskNo: 0, //巡检记录号
      InspectionTaskNo2: 0, //巡检记录号
      InspectionTaskNo3: {}, //巡检记录号
      searchLoding: false,
      tabTask: [
        { name: '记录详情', id: '0' },
        { name: '统计分析', id: '1' },
      ],
      tabtaskId: '0',
    }
  },
  mounted() {
    // setInterval(() => {
    //   console.log(this.WorkOrderTcType);

    // }, 1000);
    this.gethartTrend()
    this.DepartmentGetAllList()
    this.InspectionPlanGetList() //获取巡检计划列表
    this.InspectionTaskGetList()
  },
  methods: {
   async gethartTrend(){
       const res = await this.$api.MMS.PatrolTask.GetAnalyse({
        startTime: this.Start,
        endTime: this.End,
        planNo: this.InspectionPlanId,
        // depId: this.sDepartmentId,
        state: this.InspeStateId,
       
      })
      if (res.ok) {
        this.hartTrend=res.data
      
      } else {
        this.searchLoding = false
      }
    },
    addclick() {
      console.log(this.WorkOrderTcType)
      if (this.WorkOrderTcType == 'chakanXJXM') {
        this.addTc('chakanXQ', this.currentid)
      }
      if (this.WorkOrderTcType == 'chakanXJX') {
        // this.WorkOrderTcType == 'chakanXJXM'
        this.addTc('chakanXJXM', this.currentid2)
      }
    },
    previewChartImg(e) {
      this.imgdialogVisible = true
      this.dialogImageUrl = e
    },
    pottingTabClick(id) {
      this.tabtaskId = id
    },
    async addTc(type, item) {
      console.log(type, item)
      // console.log(this.$refs)
      if (type == 'chakanXQ') {
        this.i += 1
        this.InspectionTaskNo = {
          no: item ? item : this.currentid,
          id: this.i,
        } //巡检号
      }
      if (type == 'chakanXJXM') {
        this.i += 1
        this.InspectionTaskNo2 = {
          no: item ? item : this.currentid2,
          id: this.i,
        } //巡检号
        if (item) {
          this.currentid2 = item
        }
      }
      if (type == 'chakanXJX') {
        this.i += 1
        this.chakanXJ = item[0].projectName
        this.InspectionTaskNo3 = {
          no: item,
          id: this.i,
        }
        this.$nextTick(() => {
          console.log(this.$refs.InspectionTaskPeek4)
          this.$refs.InspectionTaskPeek4.chakanList = item
        })

        console.log(item)
      }
      this.WorkOrderTcType = type
      this.WorkOrderTcShow = true
    },
    async InspectionTaskExportList() {
      const loading = this.$loading({
        lock: true,
        text: '正在导出...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      // setTimeout(() => {
      // }, 2000);
      //导出巡检记录
      const res = await this.$api.MMS.PatrolTask.ExportList({
        startTime: this.Start,
        endTime: this.End,
        planNo: this.InspectionPlanId,
        // depId: this.sDepartmentId,
        state: this.InspeStateId,
      })
      if (res) {
        loading.close();

        var blob = new Blob([res])
        var a = document.createElement('a')
        a.download = '巡检记录.xlsx'
        a.style.display = 'none'
        a.href = URL.createObjectURL(blob)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        this.$Tools.LayerMsgInfo('成功')
      } else {
        loading.close();

        this.$Tools.LayerMsgErr(res.message)
      }
    },
    async InspectionPlanGetList() {
      //获取巡检计划列表
      const res = await this.$api.MMS.PatrolPlan.Get({
        pageIndex: 1,
        pageSize: 999,
      })
      if (res.ok) {
        console.log(res)
        this.InspectionPlanData = res.data.list
        this.InspectionPlanData.unshift({
          name: '所有',
          no: '',
        })
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    async DepartmentGetAllList() {
      const GetDepartment = await this.$api.MMS.Department.Get({})
      //获取所有部门
      if (GetDepartment.ok) {
        this.sDepartmentData = this.getTreeData(GetDepartment.data)
        this.sDepartmentData.unshift({
          children: [],
          model: {
            id: '',
            name: '所有',
          },
        })
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
    InspeStateChane(e) {
      this.InspeStateId = e
    },
    InspectionTaskGetListChane(e) {
      this.InspectionPlanId = e
    },
    async InspectionTaskGetList() {
      this.searchLoding = true

      //获取巡检记录
      const res = await this.$api.MMS.PatrolTask.GetList({
        startTime: this.Start,
        endTime: this.End,
        planNo: this.InspectionPlanId,
        // depId: this.sDepartmentId,
        state: this.InspeStateId,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      })
      if (res.ok) {
        this.searchLoding = false
        if (res.data.total > 0) {
          console.log(res.data)
          this.TaskGetListData = res.data
        } else {
          this.$Tools.LayerMsgErr('没有数据')
          this.TaskGetListData = {
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
      this.InspectionTaskGetList()
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
.fenye {
  text-align: right;
}
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
