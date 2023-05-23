<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-02-18 16:39:44
 * @LastEditors: Please set LastEditors
 * @Description: 出入库查询
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->
<template>
  <div class="PartInOut public_body">
    <div class="PartInOut_cneter">
      <div :class="['public_page','PartInOutlist', $store.state.dtab ? 'index_off' : 'index_no']">
        <div class="PartInOutlist_main">
          <div class="PartInOutlist_main_top">
            <div class="baojin_center_top">
              <ul class="inOut_ul">
                <li class="baojin_center_top_riqishij">
                  <span
                    class="baojin_center_top_baojin_Time"
                    style="font-size:16px;width:100px"
                  >批准时间：</span>
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
                <!-- <li>
                  <span class="span">类别：</span>
                  <el-cascader
                    :show-all-levels="false"
                    v-model="inputPartType"
                    :options="PartTypeGetListData"
                    :props="{
                      expandTrigger: 'hover',
                      value: 'model',
                      checkStrictly: true
                    }"
                    @change="PartTypeChane(inputPartType)"
                    :placeholder="inputPartType"
                    clearable
                  >
                    <template slot-scope="{ node, data }">
                      <span>{{ data.model.name }}</span>
                      <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                    </template>
                  </el-cascader>
                </li> -->
                <li>
                  <span
                    class="span"
                    style="font-size:16px;width:50px"
                  >物资：</span>
                  <span class="selectFile_sub" style="font-size:16px">{{
                            partName != ''
                              ? partName
                              : ''
                          }}</span>
                  <a
                    href="javascript:;"
                    class="smallbluebutton one_a"
                    v-show="
                              partName != undefined &&
                                partName != ''
                            "
                    @click="
                              partName = ''
                              partId = ''
                            "
                  >X</a>
                  <a
                    href="javascript:;"
                    @click="
                              previous(
                                PartInOutGetSearchType = 'Part'
                              )
                            "
                    class="smallbluebutton"
                  >...</a>
                  <!-- <el-select
                    v-model="partName"
                    placeholder="所有"
                    @change="partNameChane"
                  >
                    <el-option
                      v-for="item in partNameData"
                      :key="item.no"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select> -->
                </li>

                <li style="z-index: 0;">
                  操作：
                  <span class="vertical">
                    <el-checkbox v-model="putchecked">入库</el-checkbox>
                  </span>
                  <span class="vertical">
                    <el-checkbox v-model="outchecked">出库</el-checkbox>
                  </span>
                </li>
                <li>
                  <el-button
                    type="success"
                    size="mini"
                    @click="PartInOutGetSearchList(1)"
                  >查询</el-button>
                </li>
              </ul>
              <ul class="importExport">

                <li>
                  <el-button
                    v-if="PartInOutGetSearchListData.total>0"
                    type="primary"
                    size="mini"
                    @click="ExportSearchList()"
                  >导出</el-button>
                </li>
              </ul>
            </div>
          </div>
          <div class="PartInOutlist_main_zhon">
            <div class="Partlist_list">
              <el-table
                :data="PartInOutGetSearchListData.list"
                style="width: 100%"
                :row-class-name="tableRowClassName"
              >
                <!-- <el-table-column
                  prop="partName"
                  width="130px"
                  label="名称"
                  show-overflow-tooltip
                > </el-table-column>
                <el-table-column
                  prop="partTypeName"
                  label="类别"
                  show-overflow-tooltip
                > </el-table-column>
                1111
                <el-table-column
                  prop="partManufactor"
                  label="厂商"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="partSpecification"
                  label="规格"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="partModel"
                  label="型号"
                  show-overflow-tooltip
                > </el-table-column>
                1111
                <el-table-column
                  prop="partCode"
                  label="编码"
                  show-overflow-tooltip
                > </el-table-column>
                <el-table-column
                  prop="partUnit"
                  label="单位"
                  show-overflow-tooltip
                > </el-table-column>
                <el-table-column
                  prop="count"
                  label="入库数量"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span>
                      <a
                        href="#"
                        :title="scope.row.count"
                      >{{
                        numberTrue(scope.row.count > 0 ? scope.row.count : '')
                      }}</a>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="count"
                  label="出库数量"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span>
                      {{
                        numberTrue(scope.row.count > 0 ? '' : scope.row.count)
                      }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="orderSubject"
                  label="关联工单"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span @click="
                        addTc('chakanLog', PartInOutGetSearchItem.orderNo)
                      ">
                      {{
                        scope.row.orderSubject
                      }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="applyUserName"
                  label="申请人"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="applyTime"
                  label="申请时间"
                  width="170px"
                >
                  <template slot-scope="scope">
                    <span>
                      {{ $Convert.getTime(scope.row.applyTime) }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="approveResult"
                  label="审批结果"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span>
                      {{
                        scope.row.approveResult ? '批准' : '驳回'
                      }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="approveUserName"
                  label="审批人"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span>
                      {{
                        scope.row.approveUserName
                      }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="approveTime"
                  label="审批时间"
                  width="170px"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span>
                      {{ $Convert.getTime(scope.row.approveTime)}}
                    </span>
                  </template>
                </el-table-column> -->
                <el-table-column
                  prop="partStandardCode"
                  label="标准编码"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="partCode"
                  label="物资编码"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="partName"
                  label="物资名称"
                  show-overflow-tooltip
                ></el-table-column>

                <el-table-column
                  prop="partUnit"
                  label="单位"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="partSpecification"
                  label="规格型号"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="partBookName"
                  label="账簿类别"
                  show-overflow-tooltip
                ></el-table-column>

                <el-table-column
                  prop="departmentName"
                  label="领用科室"
                show-overflow-tooltip
              ></el-table-column>
               <el-table-column
                  prop="type"
                  label="领用类型"
                  show-overflow-tooltip
                >
                 <template slot-scope="scope">
                      <span>
                        {{ gettype(scope.row.type) }}
                      </span>
                    </template>
              </el-table-column>
                <el-table-column
                  prop="partPrice"
                  label="单价"
                  show-overflow-tooltip
                ></el-table-column>
                <!-- <el-table-column
                  prop="partCount"
                  label="库存数量"
                  show-overflow-tooltip
                ></el-table-column> -->
                <el-table-column
                    prop="count"
                    label="入库数量"
                    show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      <span>
                         {{ scope.row.isInDb ==true ? Math.abs(scope.row.count) : '' }}
                      </span>
                    </template>
                  </el-table-column>
                <el-table-column
                  prop="count"
                  label="出库数量"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span>
                     {{
                     scope.row.isInDb != true ? Math.abs(scope.row.count) : ''
                     }}
                    </span>
                  </template>
                </el-table-column>

                <!-- <el-table-column
                prop="partBrand"
                label="品牌"
                show-overflow-tooltip
              ></el-table-column> -->
                <!-- <el-table-column
                prop="partStandardCode"
                label="账簿类别"
                show-overflow-tooltip
              ></el-table-column> -->

                <!-- <el-table-column
                prop="partCalcName"
                label="核算类别"
                show-overflow-tooltip
              ></el-table-column> -->
                <el-table-column
                  prop="applyUserName"
                  label="申请人"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="applyTime"
                  label="申请时间"
                  show-overflow-tooltip
                >
                  <template scope="scope">
                    <span>
                      {{ $Convert.getTime(scope.row.applyTime) }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="approveUserName"
                  label="审批人"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="approveTime"
                  label="批准时间"
                  show-overflow-tooltip
                >
                  <template scope="scope">
                    <span>
                      {{ $Convert.getTime(scope.row.approveTime) }}
                    </span>
                  </template>
                </el-table-column>

                <el-table-column
                  label="查看"
                  width="50px"
                >
                  <template slot-scope="scope">
                    <span
                      class="editing_green"
                      @click="addTc('PartGetModelOutIn', scope.row)"
                    >查看</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="PartInOutlist_main_botom">
            <div class="fenye">
              <el-pagination
                hide-on-single-page
                @current-change="Current"
                :page-size="pageSize"
                :current-page="pageIndex"
                :pager-count="11"
                layout="prev, pager, next"
                :total="PartInOutGetSearchListData.total"
              ></el-pagination>
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
                PartInOutGetSearchType == 'PartGetModelOutIn'
                  ? '查看物资详情'
                  : PartInOutGetSearchType == 'applyUser'
                  ? '查看申请人'
                  : PartInOutGetSearchType == 'approve'
                  ? '查看批准人'
                  : PartInOutGetSearchType == 'PartGetModel'
                  ? '查看物资'
                  : PartInOutGetSearchType == 'chakanLog'
                  ? '查看工单'
                  : PartInOutGetSearchType == 'chakan'
                  ? '查看设备'
                  : PartInOutGetSearchType == 'bdUser'
                  ? '查看报单人'
                  : PartInOutGetSearchType == 'clUser'
                  ? '查看处理人'
                  :PartInOutGetSearchType == 'Part'
                  ? '选择物资'
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
                  v-if="PartInOutGetSearchType == 'PartGetModelOutIn'"
                  class="PartGetModelOutIn_tc"
                >
                  <div class="PartOut_tccenter">
                    <div class="PartOut_tccenter_top">
                      <ul class="left">
                        <li>
                          <span class="bianji">名称：</span>
                          <i
                            class="user"
                            @click="
                              addTc(
                                'PartGetModel',
                                PartInOutGetSearchItem.partNo
                              )
                            "
                          >{{ PartInOutGetSearchItem.partName }}</i>
                        </li>
                        <!-- <li>
                          <span class="bianji">规格：</span>
                          <i>{{ PartInOutGetSearchItem.partSpecification }}</i>
                        </li>
                        <li>
                          <span class="bianji">单位：</span>
                          <i>{{ PartInOutGetSearchItem.partUnit }}</i>
                        </li> -->
                        <li>
                          <span class="bianji">关联工单：</span>
                          <i
                            class="user"
                            @click="
                              addTc('chakanLog', PartInOutGetSearchItem.orderNo)
                            "
                          >{{ PartInOutGetSearchItem.orderId }}</i>
                        </li>

                        <!-- <li>
                          <span class="bianji">厂商：</span>
                          <i>{{ PartInOutGetSearchItem.partManufactor }}</i>
                        </li> -->
                        <!-- <li>
                          <span class="bianji">型号：</span>
                          <i>{{ PartInOutGetSearchItem.partSpecification }}</i>
                        </li> -->
                        <li>
                          <span class="bianji">申请数量：</span>

                          <i>{{ Math.abs(PartInOutGetSearchItem.count) }}</i>
                        </li>
                        <li>
                          <span class="bianji">批准说明：</span>
                          <i
                            class="min_hei"
                            style="width:88%"
                          >{{
                            PartInOutGetSearchItem.content
                          }}</i>
                        </li>
                        <li>
                          <span class="bianji">申请人：</span>
                          <i
                            class="user"
                            @click="
                              addTc(
                                'applyUser',
                                PartInOutGetSearchItem.applyUserNo
                              )
                            "
                          >{{ PartInOutGetSearchItem.applyUserName }}</i>
                        </li>
                        <li>
                          <span class="bianji">申请时间：</span>
                          <i>{{
                            $Tools.timeFormat(PartInOutGetSearchItem.applyTime)
                          }}</i>
                        </li>
                        <li>
                          <span class="bianji">审批人：</span>
                          <i
                            class="user"
                            @click="
                              addTc(
                                'approve',
                                PartInOutGetSearchItem.approveUserNo
                              )
                            "
                          >{{ PartInOutGetSearchItem.approveUserName }}</i>
                        </li>
                        <li>
                          <span class="bianji">审批结果：</span>
                          <i>{{
                            PartInOutGetSearchItem.approveResult
                              ? '批准'
                              : '驳回'
                          }}</i>
                        </li>

                        <li>
                          <span class="bianji">审批时间：</span>
                          <i>{{
                            $Tools.timeFormat(
                              PartInOutGetSearchItem.approveTime
                            )
                          }}</i>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  v-else-if="
                    PartInOutGetSearchType == 'applyUser' ||
                      PartInOutGetSearchType == 'approve' ||
                      PartInOutGetSearchType == 'bdUser' ||
                      PartInOutGetSearchType == 'clUser'
                  "
                  class="applyUser"
                >
                  <userGetModel :applyUserNo="userNo"></userGetModel>
                </div>
                <div
                  v-else-if="PartInOutGetSearchType == 'PartGetModel'"
                  class="PartGetModel"
                >
                  <PartGetModel :partNo="partNo"></PartGetModel>
                </div>

                <div
                  v-else-if="PartInOutGetSearchType == 'chakanLog'"
                  class="chakanLog"
                >
                  <chakanLog
                    :no="orderNo"
                    v-on:addTc="addTc"
                  ></chakanLog>
                </div>
                <div v-else-if="PartInOutGetSearchType == 'chakan'">
                  <EquipmentGetModelList
                    v-if="PartInOutGetSearchType == 'chakan'"
                    :EquipmentGetModelNo="EquipmentGetModelNo"
                    v-on:addTc="addTc"
                  ></EquipmentGetModelList>
                </div>
                <div
                  class="PartTc"
                  v-else-if="PartInOutGetSearchType == 'Part'"
                >
                  <PartTc2
                    :partType="partType"
                    v-on:addTc="addTc1"
                  ></PartTc2>
                </div>
              </div>
            </div>
          </div>
          <div class="cancel">
            <img
              :src="require('@/assets/image/index/withdrawal.png')"
              @click="
                previous(
                  PartInOutGetSearchType == 'applyUser'
                    ? 'PartGetModelOutIn'
                    : PartInOutGetSearchType == 'approve'
                    ? 'PartGetModelOutIn'
                    : PartInOutGetSearchType == 'PartGetModel'
                    ? 'PartGetModelOutIn'
                    : PartInOutGetSearchType == 'chakanLog'
                    ? 'PartGetModelOutIn'
                    : PartInOutGetSearchType == 'chakan'
                    ? 'chakanLog'
                    : PartInOutGetSearchType == 'clUser'
                    ? 'chakanLog'
                    : PartInOutGetSearchType == 'bdUser'
                    ? 'chakanLog'
                    :  PartInOutGetSearchType == 'Part'?'log123': ''
                    
                )
              "
              v-show="PartInOutGetSearchType != 'PartGetModelOutIn'&&PartInOutGetSearchType != 'Part'"
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
export default {
  data() {
    return {
      partType: '',
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
      PartTypeGetListData: [],
      inputPartType: '所有',
      pageSize: 13, //一页多少条
      pageIndex: 1, //实时页码
      PartTypeType: '', //设备类型id
      partName: '', //名称
      partId: '', //名称id
      putchecked: false, //入库
      outchecked: true, //出库
      PartInOutGetSearchListData: {
        list: [],
        total: 0,
      }, //出入库数据
      partNameData: [], //名称数据
      EquipmentData: {},
      PartInOutGetSearchShow: false,
      PartInOutGetSearchType: '',
      PartInOutGetSearchItem: {}, //查看项
      userNo: 0, //申请人或者批准人
      PartGetModel: {}, //单个物资
      partNo: 0, //名称号
      EquipmentGetModelListLog: {}, //获取记录详情
      workFlow: [], //流程
      partInOut: [], //物资
      EquipmentGetModelNo: '', //查看设备详情
      orderNo: '', //设备号
    }
  },
  mounted() {
    this.PartInOutGetSearchList(1)
    this.PartTypeGetList() //物资类别
  },
  computed: {
    numberTrue: function () {
      //通过回调函数给计算属性传参
      return function (num) {
        if (num > 0) {
          return num == 0 ? '' : num
        } else {
          return Math.abs(num) == 0 ? '' : Math.abs(num) //负数变成整数
        }
      }
    },
  },
  methods: {
    addTc1(type, item) {
      // console.log(item);
      this.PartInOutGetSearchShow = false
      this.partId = item.no
      this.partName = item.name
    },
    async ExportSearchList() {
      //导出
      const res = await this.$api.MMS.PartInOutZW.ExportSearchList({
        start: this.Start,
        end: this.End,
        typeId: this.PartTypeType,
        partId: this.partId,
        inDb: this.putchecked,
        outDb: this.outchecked,
      })
      if (res) {
        var blob = new Blob([res])
        var a = document.createElement('a')
        a.download = '出入库查询.xlsx'
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

      this.PartInOutGetSearchShow = true
      this.PartInOutGetSearchType = type
    },
    async addTc(type, item) {
      //弹窗
      if (type == 'PartGetModelOutIn') {
        this.PartInOutGetSearchItem = item
      } else if (
        type == 'approve' ||
        type == 'applyUser' ||
        type == 'clUser' ||
        type == 'bdUser'
      ) {
        this.userNo = item
      } else if (type == 'PartGetModel') {
        this.partNo = item
      } else if (type == 'chakanLog') {
        this.orderNo = item
      } else if (type == 'chakan') {
        this.EquipmentGetModelNo = item
      } else if (type == 'log123') {
      }
      //添加节点显示弹窗
      this.PartInOutGetSearchShow = true
      this.PartInOutGetSearchType = type
    },
    gettype(val){
      let str=''
      switch (val) {
      case 1:str='租借'
        
        break;
      case 2: str = '报废领用'

          break;
           case 3:  str = '其他'

          break;
      default:''
        break;
     }
     return str
    },
    Current(e) {
      //分页响应事件

      this.PartInOutGetSearchList(e)
    },
    partNameChane(name) {
      console.log(name)
      //根据名字获取id
      for (var i = 0; i < this.partNameData.length; i++) {
        if (this.partNameData[i].name == name) {
          this.partId = this.partNameData[i].typeId
          console.log(this.partId)
        }
      }
    },
    async PartInOutGetSearchList(pageIndex) {
      this.pageIndex = pageIndex
      //出入库查询
      const res = await this.$api.MMS.PartInOutZW.GetSearchList({
        pageSize: this.pageSize, //一页多少条
        pageIndex: pageIndex, //实时页码
        start: this.Start,
        end: this.End,
        typeId: this.PartTypeType,
        partId: this.partId,
        inDb: this.putchecked,
        outDb: this.outchecked,
      })
      if (res.ok) {
        if (res.data.total > 0) {
          this.PartInOutGetSearchListData = res.data //获取查询数据
        } else {
          this.$Tools.LayerMsgErr('没有数据')
          this.PartInOutGetSearchListData = {
            list: [],
            total: 0,
          }
        }
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    async PartTypeGetList() {
      const res = await this.$api.MMS.PartType.GetList({})
      if (res.ok) {
        this.PartTypeGetListData = this.getTreeData(res.data)
        this.PartTypeGetListData.unshift({
          children: undefined,
          model: {
            id: '',
            name: '所有',
          },
        })
      }
    },
    async PartTypeChane(name) {
      this.partName = '' //筛选前清空子选择
      this.partId = '' //清空id
      //分项拼接
      let res = ''
      for (var i = 0; i < name.length; i++) {
        res = name[i].name
        this.PartTypeType = name[i].id
      }
      this.inputPartType = res
      const partName = await this.$api.MMS.Part.GetListForType({
        Id: this.PartTypeType,
      })
      if (partName.ok) {
        this.partNameData = partName.data //根据类别获取名称
      }
    },
    getTreeData(data) {
      // 递归
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
    tableRowClassName({ row, rowIndex }) {
      //list背景色
      if (rowIndex % 2 == 1) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
      return ''
    },
  },
}
</script>
<style lang="scss" scoped>
@import './styles/PartInOut.scss';
.bianji {
  display: inline-block;
  width: 80px;
  text-align: left;
}
</style>
<style lang="scss">
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
          //添加
          .PartGetModelOutIn_tc {
            .PartOut_tccenter {
              .PartOut_tccenter_top {
                display: flex;
                justify-content: start;
                height: 44vh;
                overflow-y: scroll;

                .left {
                  margin-left: 80px;
                  // margin: auto;
                  text-align: left;
                  flex: 1;
                  > li {
                    min-height: 2.8vh;
                    font-size: 16px;
                    margin-bottom: 10px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
                    color: #00f0ff;
                    display: flex;
                    align-items: center;

                    .user {
                      cursor: pointer;
                      text-decoration: underline;
                    }
                    span {
                      display: inline-block;
                      // min-width: 60px;
                    }
                  }
                  .tc_textarea {
                    // display: flex;
                    // align-items: center;
                    height: 18vh;
                    > span {
                      height: 18vh;
                      line-height: 18vh;

                      display: inline-block;
                      width: 75px;
                      text-align: center;
                      // line-height: 18vh;
                    }
                    .chakan {
                      width: 75%;
                      color: #00f0ff;
                    }
                  }
                }
              }
            }
          }

          //查看工单
          .chakanLog {
            // text-align: left;
            overflow: auto;
            height: 50vh;

            .chakanLog_center {
              margin: 12px 24px;

              .chakanLog_top {
                display: flex;
                // height: 200px;
                .chakanLog_left {
                  flex: 1;
                  > ul {
                    margin: 0 50px;
                    li {
                      display: flex;
                      justify-content: space-between;
                      height: 3vh;
                      line-height: 3vh;
                      a,
                      span {
                        font-size: 14px;
                        font-family: MicrosoftYaHei;
                        font-weight: 400;
                        color: #00f0ff;
                        // width: 80px;

                        word-break: keep-all;
                        /* 不换行 */
                        white-space: nowrap;
                        /* 不换行 */
                        overflow: hidden;
                        /* 内容超出宽度时隐藏超出部分的内容 */
                        text-overflow: ellipsis;
                      }
                    }
                  }
                }
                .chakanLog_right {
                  flex: 1;
                  > ul {
                    margin: 0 50px;
                    li {
                      display: flex;
                      justify-content: space-between;
                      height: 3vh;
                      line-height: 3vh;
                      .user {
                        cursor: pointer;
                        text-decoration: underline;
                      }
                      a,
                      span {
                        font-size: 14px;
                        font-family: MicrosoftYaHei;
                        font-weight: 400;
                        color: #00f0ff;
                        // width: 80px;

                        word-break: keep-all;
                        /* 不换行 */
                        white-space: nowrap;
                        /* 不换行 */
                        overflow: hidden;
                        /* 内容超出宽度时隐藏超出部分的内容 */
                        text-overflow: ellipsis;
                      }
                    }
                  }
                }
              }
              .chakanLog_zhong {
                width: 100%;
                // height: 500px;

                // display: flex;
                text-align: left;
                > ul {
                  margin: 0 50px;
                  .line_hei3 {
                    height: 3vh;
                    line-height: 3vh;
                  }
                  li {
                    .baoy {
                      font-size: 14px;
                      font-family: MicrosoftYaHei;
                      font-weight: 400;
                      color: #00f0ff;
                    }
                    .zt {
                      margin-left: 75px;
                    }
                    .bao_M {
                      margin-left: 120px;
                    }
                    a,
                    span {
                      font-size: 14px;
                      font-family: MicrosoftYaHei;
                      font-weight: 400;
                      color: #00f0ff;
                      // width: 80px;

                      word-break: keep-all;
                      /* 不换行 */
                      white-space: nowrap;
                      /* 不换行 */
                      overflow: hidden;
                      /* 内容超出宽度时隐藏超出部分的内容 */
                      text-overflow: ellipsis;
                    }
                  }
                }
              }
              .chakanLog_bottom {
                text-align: left;
                .legend_bor {
                  border: 1px solid #00f0ff;
                  color: #00f0ff;
                  margin-top: 10px;
                }
                .div_table {
                  .white {
                    color: #fff;
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
</style>
