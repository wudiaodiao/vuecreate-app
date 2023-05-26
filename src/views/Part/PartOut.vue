<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2021-12-02 10:01:53
 * @LastEditors: Please set LastEditors
 * @Description: 出库审批
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->
<template>
  <div class="PartOut public_body">
    <div class="PartOut_cneter">
      <div
        :class="[
          'public_page',
          'PartOutlist',
          $store.state.dtab ? 'index_off' : 'index_no'
        ]"
      >
        <div class="PartOut_main">
          <div class="Partlist_list">
            <el-table
              :data="PartInOutGetList"
              style="width: 100%"
              :row-class-name="tableRowClassName"
            >
              <!-- <el-table-column
                prop="partName"
                label="名称"
                show-overflow-tooltip
              ></el-table-column>
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
              ></el-table-column>
              <el-table-column
                prop="code"
                label="编码"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="partUnit"
                label="单位"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="count"
                label="出库数量"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span>
                    {{ -scope.row.count }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="orderSubject"
                label="关联工单"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="applyUserName"
                label="申请人"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="applyTime"
                width="180px"
                label="申请时间"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span>
                    {{ $Convert.getTime(scope.row.applyTime) }}
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
              <!-- <el-table-column
                prop="partManufactor"
                label="厂商"
                show-overflow-tooltip
              ></el-table-column> -->
            <el-table-column
                prop="partSpecification"
                label="规格型号"
                width="380px"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="partBookName"
                label="账簿类别"
                show-overflow-tooltip
              ></el-table-column>
              
             
               <!-- <el-table-column
                prop="partCalcName"
                label="核算类别"
                show-overflow-tooltip
              ></el-table-column> -->
                <el-table-column
                prop="partPrice"
                label="单价"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="partCount"
                label="库存数量"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="count"
                label="申请数量"
                show-overflow-tooltip
              >
              <template v-slot="scope">
                    <span>
                      {{Math.abs(scope.row.count) }}
                    </span>
                  </template>
            </el-table-column>
              <!-- <el-table-column
                prop="partSupplier"
                label="供货单位"
                show-overflow-tooltip
              ></el-table-column> -->
             
               
             
               <!-- <el-table-column
                prop="partBrand"
                label="品牌"
                show-overflow-tooltip
              ></el-table-column> -->
              <el-table-column
                prop="applyUserName"
                label="申请人"
                show-overflow-tooltip
              ></el-table-column>
               <el-table-column
                prop="applyTime"
                width="180"
                label="申请时间"
              >
              <template v-slot="scope">
                      <span>
                        {{ $Convert.getTime(scope.row.applyTime) }}
                      </span>
                    </template>
            </el-table-column>
             
<!-- <el-table-column
                prop="approveUserName"
                label="批准人"
                show-overflow-tooltip
              ></el-table-column> -->
              <el-table-column
                label="审批"
                width="50px"
                v-if="
                  $Tools.accessControl(
                    this.$store.state.userGetUserRole.resList,
                    'EditPartInOut'
                  )
                "
              >
                <template v-slot="scope">
                  <span
                    class="editing_green"
                    @click="addTc('approval', scope.row)"
                    >审批</span
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="PartOut_tanchuang_ying" v-if="PartOutTcShow">
        <div class="tanchuang">
          <div
            :class="[
              'tanchuang_bg',
              PartOutTcType == 'chakanLog' ? 'gongd_tanchuang_bg' : ''
            ]"
          >
            <div class="tanchuang_top">
              <img
                :src="require('~@/assets/image/index/partial_left.png')"
                alt
              />
              <span class="top_title margin_tc">{{
                PartOutTcType == 'approval'
                  ? '批准出库'
                  : PartOutTcType == 'editor'
                  ? '编辑物资'
                  : PartOutTcType == 'applyUser'
                  ? '查看申请人'
                  : PartOutTcType == 'PartGetModel'
                  ? '查看物资'
                  : PartOutTcType == 'chakanLog'
                  ? '查看工单'
                  : PartOutTcType == 'chakan'
                  ? '查看设备'
                  : ''
              }}</span>

              <img
                :src="require('@/assets/image/index/partial_right.png')"
                alt
              />
            </div>
            <div class="tanchuang_center">
              <div class="tanchuang_center_cen">
                <div v-if="PartOutTcType == 'approval'" class="PartOut_tc">
                  <div class="PartOut_tccenter">
                    <div class="PartOut_tccenter_top">
                      <ul class="left">
                        <li>
                          <span class="bianji">名称：</span>
                          <i
                            class="user"
                            @click="addTc('PartGetModel', approvalItem.partNo)"
                            >{{ approvalItem.partName }}</i
                          >
                        </li>
                        <!-- <li>
                          <span class="bianji">规格型号：</span>
                          <i>{{ approvalItem.partSpecification }}</i>
                        </li>
                        <li>
                          <span class="bianji">单位：</span>
                          <i>{{ approvalItem.partUnit }}</i>
                        </li> -->
                        <!-- <li>
                          <span class="bianji">关联工单：</span>
                          <i
                            class="user"
                            @click="addTc('chakanLog', approvalItem.orderNo)"
                            >{{ approvalItem.orderSubject }}</i
                          >
                        </li> -->

                        <!-- <li>
                          <span class="bianji">厂商：</span>
                          <i>{{ approvalItem.partManufactor }}</i>
                        </li> -->
                        <!-- <li>
                          <span class="bianji">型号：</span>
                          <i>{{ approvalItem.partModel }}</i>
                        </li> -->
                 
                        <li>
                          <span class="bianji">申请数量：</span>
                          <i>{{ Math.abs(approvalItem.count)  }}</i>

                        </li>
                        <li>
                          <span class="bianji">申请人：</span>
                          <i
                            class="user"
                            @click="
                              addTc('applyUser', approvalItem.applyUserNo)
                            "
                            >{{ approvalItem.applyUserName }}</i
                          >
                        </li>
                         <li>
                          <span class="bianji">申请时间：</span>
                          <i>{{ $Tools.timeFormat(approvalItem.applyTime) }}</i>
                        </li>
                         <li>
                          <span class="bianji">内容：</span>
                          <i>{{ approvalItem.content}}</i>
                        </li>
                       
                        <li class="tc_textarea">
                          <span class="bianji">说明：</span>
                          <!--  :disabled="announcementTcType=='chankan'?true:false" -->
                          <el-input
                            type="textarea"
                            class="chakan"
                            v-model="inputCenter"
                          ></el-input>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div v-else-if="PartOutTcType == 'applyUser'" class="applyUser">
                  <userGetModel
                    :applyUserNo="approvalItem.applyUserNo"
                  ></userGetModel>
                </div>
                <div
                  v-else-if="PartOutTcType == 'PartGetModel'"
                  class="PartGetModel"
                >
                  <PartGetModel :partNo="partNo"></PartGetModel>
                </div>
                <div v-else-if="PartOutTcType == 'chakanLog'">
                  <chakanLog :no="orderNo" v-on:addTc="addTc"></chakanLog>
                </div>
                <div v-else-if="PartOutTcType == 'chakan'">
                  <EquipmentGetModelList
                    v-if="PartOutTcType == 'chakan'"
                    :EquipmentGetModelNo="EquipmentGetModelNo"
                    v-on:addTc="addTc"
                  ></EquipmentGetModelList>
                </div>

                <div
                  class="tanchuang_center_cen_bottom"
                  v-if="PartOutTcType == 'approval'"
                >
                  <button
                    @click="
                      PartOutTcType == 'approval'
                        ? PartInOutApprove(true)
                        : PartOutTcType == 'editor'
                        ? PartUpdate()
                        : ''
                    "
                  >
                    批准
                  </button>
                  <button @click="PartInOutApprove(false)">驳回</button>
                  <button @click="PartOutTcShow = false">取消</button>
                </div>
              </div>
            </div>
          </div>
          <div class="cancel">
            <img
              :src="require('@/assets/image/index/withdrawal.png')"
              @click="
                previous(
                  PartOutTcType == 'applyUser'
                    ? 'approval'
                    : PartOutTcType == 'PartGetModel'
                    ? 'approval'
                    : PartOutTcType == 'chakanLog'
                    ? 'approval'
                    : PartOutTcType == 'chakan'
                    ? 'chakanLog'
                    : ''
                )
              "
              v-show="PartOutTcType != 'approval'"
              alt
            />
            <img
              @click="PartOutTcShow = false"
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
      PartInOutGetList: [],
      PartOutTcShow: false,
      PartOutTcType: '',
      inputCenter: '', //输入框
      approvalItem: '', //批准当前项
      PartGetModel: {}, //单个物资
      partNo: '',
      orderNo: '', //设备号
      EquipmentGetModelNo: '' //查看设备详情
    }
  },
  mounted() {
    this.getPartInOutGetList()
  },
  methods: {
    previous(type) {
      //返回上一步按钮

      this.PartOutTcShow = true
      this.PartOutTcType = type
    },
    async PartInOutApprove(flag) {
      //批准出库
      const res = await this.$api.MMS.PartInOut.Approve({
        No: this.approvalItem.no,
        // PartNo: this.approvalItem.partNo,
        // Count: this.approvalItem.count,
        // OrderNo: this.approvalItem.orderNo,
        // ApplyUserNo: this.approvalItem.applyUserNo,
        // ApplyTime: this.approvalItem.applyTime,
        // ApproveUserNo: this.approvalItem.approveUserNo,
        // ApproveTime: this.approvalItem.approveTime,
        ApproveResult: flag,
        Content: this.inputCenter
      })
      if (res.ok) {
        this.$Tools.LayerMsgInfo('成功')
        this.PartOutTcShow = false
        this.getPartInOutGetList()
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    async addTc(type, item) {
      // console.log(item);
      //弹窗
      if (type == 'add') {
      } else if (type == 'approval') {
        this.approvalItem = item
        this.inputCenter = ''
      } else if (type == 'applyUser') {
      } else if (type == 'PartGetModel') {
        this.partNo = item
      } else if (type == 'chakanLog') {
        this.orderNo = item
      } else if (type == 'chakan') {
        this.EquipmentGetModelNo = item
      }
      //添加节点显示弹窗
      this.PartOutTcShow = true
      this.PartOutTcType = type
    },
    async getPartInOutGetList() {
      //出库审批列表
      const res = await this.$api.MMS.PartInOut.GetList({})
      if (res.ok) {
        this.PartInOutGetList = res.data
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    tableRowClassName({ row, rowIndex }) {
      //list背景色
      if (rowIndex % 2 == 1) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
      return ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import './styles/PartOut.scss';
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
          .PartOut_tc {
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
                    height: 2.8vh;
                    font-size: 16px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
                    margin-bottom: 10px;
                    color: #00f0ff;
                    .user {
                      cursor: pointer;
                      text-decoration: underline;
                    }
                    span {
                      display: inline-block;
                      // width: 60px;
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
          //查看申请人
          .applyUser {
          }
          //查看物资
          .PartGetModel {
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
</style>
