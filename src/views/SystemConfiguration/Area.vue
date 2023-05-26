<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-03-09 15:03:50
 * @LastEditors: Please set LastEditors
 * @Description: 地点管理
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->
<template>
  <div class="PartType public_body">
    <div class="Equipment_cneter">
      <div :class="[
          'public_page',
          'EquipmentType',
          $store.state.dtab ? 'index_off' : 'index_no'
        ]">
        <div class="content">
          <div
            class="EquipmentType_top"
            v-if="
              $Tools.accessControl(
                this.$store.state.userGetUserRole.resList,
                'EditArea'
              )
            "
          >
            <ul>
              <li
                class="gen"
                @click="addNode('addRootNode')"
              >
                <span>添加根节点</span>
              </li>
              <li
                v-if="floorId == $store.state.equipmentActiveId"
                @click="addNode('addChildrenNode')"
              >
                <span>添加子节点</span>
              </li>
              <li
                v-if="floorId == $store.state.equipmentActiveId"
                @click="addNode('edChildrenNode')"
              >
                <span>编辑节点</span>
              </li>
              <!-- <li
                v-if="floorId == $store.state.equipmentActiveId"
                @click="addNode('editTheCheck')"
              >
                <span>编辑巡检项</span>
              </li> -->
              <li
                class="del_red"
                @click="addNodeDel()"
                v-if="floorId == $store.state.equipmentActiveId"
              >
                <span class="del_red">删除节点</span>
              </li>
              <li
                class="blue"
                @click="importDaor(true)"
              >
                <span>导入</span>
              </li>
              <li style="background:none">
                <div>
                  <el-button
                    type="success"
                    size="mini"
                    icon="el-icon-printer"
                    @click="exportQR()"
                  >下载</el-button>
                </div>
              </li>
            </ul>
          </div>
          <div class="EquipmentType_center">
            <div class="EquipmentType_center_list">
              <div class="tree_center">
                <el-tree
                  :data="floorlist"
                  :props="defaultProps"
                  @node-click="floorlistActive"
                >
                  <template
                    class="custom-tree-node"
                    v-slot="{ node, data }"
                  >
                    <span :class="[floorId == data.model.id ? 'aqua' : '']">{{
                      data.model.name
                    }}</span>
                  </template>
                </el-tree>
              </div>
            </div>
          </div>

          <areacard
            :url="url"
            :areaPdf="areaPdf"
          />
        </div>
      </div>
      <div
        class="EquipmentType_tanchuang_ying"
        v-if="nodeShow"
      >
        <div class="tanchuang">
          <div class="tanchuang_bg">
            <div class="tanchuang_top">
              <img
                :src="require('~@/assets/image/index/partial_left.png')"
                alt
              />
              <span class="top_title margin_tc">{{
                nodeShowType == 'addRootNode'
                  ? '添加根节点'
                  : nodeShowType == 'addChildrenNode'
                  ? '添加子节点'
                  : nodeShowType == 'edChildrenNode'
                  ? '编辑节点'
                  : nodeShowType == 'editTheCheck'
                  ? '编辑巡检节点项'
                  : nodeShowType == 'editTheCheck_add'
                  ? '添加巡检项'
                  : nodeShowType == 'EditingSb_bj'
                  ? '编辑巡检项'
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
                  class="node_tanchuang_center_cen_top"
                  v-if="
                    nodeShowType != 'editTheCheck' ||
                      nodeShowType == 'editTheCheck_add' ||
                      nodeShowType == 'EditingSb_bj'
                  "
                >
                  <div class="RootNode">
                    <div class="tanchuang_center_cen_top formValidator">
                      <el-form
                        :model="formValidator"
                        ref="formValidator"
                        label-width="100px"
                        class="demo-dynamic"
                        :rules="rules"
                      >
                        <el-form-item prop="inputNodeName">
                          <span>名称：</span>
                          <el-input
                            type="text"
                            v-model="formValidator.inputNodeName"
                          />
                        </el-form-item>
                        <el-form-item
                          prop="code"
                          style="margin-top:20px"
                          v-if="
                            nodeShowType !== 'editTheCheck_add' &&
                              nodeShowType !== 'EditingSb_bj'
                          "
                        >
                          <span>编码：</span>
                          <el-input
                            type="text"
                            v-model="formValidator.code"
                          />
                        </el-form-item>
                      </el-form>
                    </div>
                  </div>
                </div>
                <div
                  v-else
                  class="editTheCheck"
                >
                  <Check
                    v-on:importDaor="importDaor"
                    :InspectionPlan="floorId"
                    v-on:addTc="addTc"
                  ></Check>
                </div>
                <!-- <div class="editTheCheck_add" v-if="nodeShowType=='editTheCheck_add'">添加巡检项</div> -->
                <div
                  class="tanchuang_center_cen_bottom"
                  v-if="nodeShowType != 'editTheCheck'"
                >
                  <button
                    @click="
                      nodeShowType == 'addRootNode' ||
                      nodeShowType == 'addChildrenNode'
                        ? AreaAdd('formValidator')
                        : nodeShowType == 'edChildrenNode'
                        ? AreaUpdate('formValidator')
                        : nodeShowType == 'editTheCheck_add'
                        ? AreaAddInspection()
                        : nodeShowType == 'EditingSb_bj'
                        ? AreaUpdateInspection()
                        : ''
                    "
                    v-preventReClick="2000"
                  >
                    确认
                  </button>
                  <button @click="nodeShow = false">取消</button>
                </div>
              </div>
            </div>
          </div>
          <div class="cancels">
            <img
              v-show="
                nodeShowType == 'editTheCheck_add' ||
                  nodeShowType == 'EditingSb_bj'
              "
              :src="require('@/assets/image/index/withdrawal.png')"
              @click="
                previous(
                  nodeShowType == 'editTheCheck_add'
                    ? 'editTheCheck'
                    : nodeShowType == 'EditingSb_bj'
                    ? 'editTheCheck'
                    : ''
                )
              "
              alt
            />
            <img
              @click="nodeShow = false"
              :src="require('@/assets/image/index/cancel.png')"
              alt
            />
          </div>
        </div>
      </div>
      <importTable :table="table"></importTable>
    </div>
  </div>
</template>
<script>
import importTable from '../../components/index/importTable'
import Check from './components/Check'
// import areacard from './components/areacard.vue'

export default {
  components: {
    Check,
    importTable,
    // areacard
  },
  data() {
    return {
      clickHeadShow: false,
      nodeShow: false, //节点弹窗
      nodeShowType: 'addRootNode', //节点类型

      defaultProps: {
        children: 'children',
        label: 'model',
      },
      floorlist: [], //楼层
      floorCode: '.', //编码
      floorId: '.',
      checkNo: '',
      table: {
        title: '导入地点',
        url: 'Area',
        controller: 'Area',
        methods: 'ImportArea',
        show: false,
      },
      lastValue: '',
      formValidator: {
        inputNodeName: '',
        code: '',
      },
      rules: {
        code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        inputNodeName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
      },
      areaPdf: [],
      htmlTitle: '地点卡片', // 导出为 pdf 时的名称
      url: null,
    }
  },
  created() {
    this.url =
      window.ApiBaseURL + 'areacard.html?_code=' + this.$Convert.Card.area
  },
  mounted() {
    this.AreaGetAllList() //获取楼层
  },
  watch: {
    'table.show'(newVal, oldVal) {
      if (newVal) {
      } else {
        this.AreaGetAllList()
      }
    },
  },
  methods: {
    exportQR() {
      this.$api.MMS.Area.AreaQrCode().then((res) => {
        // console.log(res)
        var blob = new Blob([res])
        console.log(blob)
        var a = document.createElement('a')
        a.download = '地点二维码.pdf'
        a.style.display = 'none'
        a.href = URL.createObjectURL(blob)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        this.$message({
          message: '成功',
          type: 'success',
          duration: 2 * 1000,
        })
      })
    },
    importDaor(flag) {
      if (flag instanceof Object) {
        this.nodeShow = false

        this.table = flag
        this.table.floorId = this.floorId
      } else {
        this.table = {
          title: '导入地点',
          url: 'Area',
          controller: 'Area',
          methods: 'ImportArea',
          show: flag,
        }
      }
    },
    previous(type) {
      //返回上一步按钮

      this.nodeShow = true
      this.nodeShowType = type
    },
    async AreaUpdateInspection() {
      //添加巡检项
      const res = await this.$api.MMS.Area.UpdateInspection({
        No: this.checkNo,
        AreaId: this.floorId,
        Name: this.formValidator.inputNodeName,
      })
      if (res.ok) {
        this.nodeShowType = 'editTheCheck'
        this.$Tools.LayerMsgInfo('成功')
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    async AreaAddInspection() {
      //添加巡检项
      const res = await this.$api.MMS.Area.AddInspection({
        AreaId: this.floorId,
        Name: this.formValidator.inputNodeName,
      })
      if (res.ok) {
        this.nodeShowType = 'editTheCheck'
        this.$Tools.LayerMsgInfo('成功')
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    addTc(type, item) {
      if (type == 'editTheCheck_add') {
        this.formValidator.inputNodeName = ''
        this.floorId = item
      } else if (type == 'EditingSb_bj') {
        if (item instanceof Object) {
          this.floorId = item.areaId
          this.formValidator.inputNodeName = item.name
          this.checkNo = item.no
        }
      }

      //添加节点显示弹窗
      this.nodeShow = true
      this.nodeShowType = type
    },
    async AreaGetAllList() {
      //获取楼层
      const res = await this.$api.MMS.Area.GetAllList({})
      if (res.ok) {
        this.floorlist = res.data
        this.areaPdf = this.flatten(res.data)
      }
    },
    //节点数组专扁平化
    flatten(data) {
      return data.reduce(
        (arr, { model, children = [] }) =>
          arr.concat([model], this.flatten(children)),
        []
      )
    },

    async addNodeDel() {
      const that = this

      //删除节点
      this.$confirm('此操作将删除该地点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          console.log(that.floorId)
          const res = await that.$api.MMS.Area.Delete({
            id: that.floorId,
          })

          if (res.ok) {
            this.$Tools.LayerMsgInfo('成功')
            that.AreaGetAllList() //设备列表
          } else {
            this.$Tools.LayerMsgErr(res.message)
          }
        })
        .catch((err) => {
          console.log(err)
          this.$message({
            type: 'info',
            message: '取消了删除',
          })
        })
    },
    async AreaUpdate(formName) {
      //更新
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.MMS.Area.Update({
            Id: this.floorId,
            Code: this.formValidator.code,
            Name: this.formValidator.inputNodeName,
          })
          if (res.ok) {
            this.nodeShow = false
            this.AreaGetAllList() //设备列表
            this.$Tools.LayerMsgInfo('成功')
          } else {
            this.$Tools.LayerMsgErr(res.message)
          }
        } else {
          return false
        }
      })
    },
    async AreaAdd(formName) {
      //地点管理添加
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.MMS.Area.Add({
            Id: this.floorId,
            Code: this.formValidator.code,
            Name: this.formValidator.inputNodeName,
          })
          if (res.ok) {
            this.nodeShow = false
            this.AreaGetAllList() //设备类别列表
            this.$Tools.LayerMsgInfo('成功')
          } else {
            this.$Tools.LayerMsgErr(res.message)
          }
        } else {
          return false
        }
      })
    },
    addNode(type) {
      if (type != 'edChildrenNode') {
        this.formValidator.inputNodeName = ''
        this.formValidator.code = ''
      } else {
        this.formValidator.inputNodeName = this.lastValue
        this.formValidator.code = this.floorCode
      }

      if (type == 'addRootNode') {
        this.floorId = '.'
      } else if (type == 'editTheCheck') {
      }

      //添加节点显示弹窗
      this.nodeShow = true
      this.nodeShowType = type
    },
    floorlistActive(data) {
      //点击树节点

      this.floorCode = data.model.code
      this.formValidator.inputNodeName = data.model.name //编辑操作
      this.$store.commit('setequipmentActiveId', data.model.id)
      this.floorId = data.model.id
      this.lastValue = data.model.name
    },
  },
}
</script>
<style lang="scss" scoped>
@import './styles/Area.scss';
</style>
<style lang="scss">
.EquipmentType_tanchuang_ying {
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
        margin: 2vh 2vw;
        .tanchuang_center_cen {
          margin-top: 3vh;
          //文档管理弹窗
          .node_tanchuang_center_cen_top {
            .RootNode {
              margin-top: 16vh;
              .tanchuang_center_cen_top {
                margin-top: 20px;
                display: flex;
                justify-content: center;
                .el-input {
                  width: unset !important;
                }
                input {
                  width: 8.5vw;
                  height: 3vh;
                  line-height: 3vh;
                  background-color: rgba(0, 0, 0, 0);
                  border: 1px solid #00f0ff;
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #ffffff;
                }

                span {
                  font-size: 16px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #00f0ff;
                }
              }
            }
          }
          //添加巡检项
          .editTheCheck {
            .editTheCheck_top {
              ul {
                display: flex;
                justify-content: flex-end;
                align-items: center;

                li {
                  background: #47d235;
                  border-radius: 2px;
                  text-align: center;
                  margin-right: 20px;
                  cursor: pointer;
                  min-width: 76px;
                  height: 26px;
                  line-height: 26px;

                  span {
                    font-size: 14px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
                    color: #ffffff;
                  }
                }

                .gen {
                  min-width: 100px;
                  height: 30px;
                  line-height: 30px;
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
    .cancels {
      > img {
        cursor: pointer;

        margin: 0 7px;
      }
    }
  }
}
</style>
