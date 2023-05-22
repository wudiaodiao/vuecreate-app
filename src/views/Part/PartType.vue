<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-02-18 16:43:32
 * @LastEditors: Please set LastEditors
 * @Description: 物资类别
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->

<template>
  <div class="PartType public_body">
    <div class="Equipment_cneter">
      <div :class="['public_page', 'EquipmentType', $store.state.dtab ? 'index_off' : 'index_no']">
        <div class="content">
          <div
            class="EquipmentType_top"
            v-if="
              $Tools.accessControl(
                this.$store.state.userGetUserRole.resList,
                'EditPartType'
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
                v-if="equipmentActiveId == $store.state.equipmentActiveId"
                @click="addNode('addChildrenNode')"
              >
                <span>添加子节点</span>
              </li>
              <li
                v-if="equipmentActiveId == $store.state.equipmentActiveId"
                @click="addNode('edChildrenNode')"
              >
                <span>编辑节点</span>
              </li>
              <li
                class="del_red"
                @click="addNodeDel()"
                v-if="equipmentActiveId == $store.state.equipmentActiveId"
              >
                <span class="del_red">删除节点</span>
              </li>
              <li
                class="del_blue"
                @click="importDaor()"
              >
                <span>导入</span>
              </li>
              <li
                class="del_blue"
                @click="KnowledgeCategoryExport()"
              >
                <span>导出</span>
              </li>
            </ul>
          </div>
          <div class="EquipmentType_center">
            <div class="EquipmentType_center_list">
              <div class="tree_center">
                <el-tree
                  :data="equipmentTypeData"
                  :props="defaultProps"
                  @node-click="EquipmentActive"
                >
                  <template
                    class="custom-tree-node"
                    slot-scope="{ node, data }"
                  >
                    <span :class="[
                        equipmentActiveId == data.model.id ? 'aqua' : ''
                      ]">{{ data.model.name }}</span>
                  </template>
                </el-tree>
              </div>
            </div>
          </div>
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
                :src="require('@/assets/image/index/partial_left.png')"
                alt
              />
              <span class="top_title margin_tc">{{
                nodeShowType == 'addRootNode'
                  ? '添加根节点'
                  : nodeShowType == 'addChildrenNode'
                  ? '添加子节点'
                  : nodeShowType == 'edChildrenNode'
                  ? '编辑节点'
                  : ''
              }}</span>

              <img
                :src="require('@/assets/image/index/partial_right.png')"
                alt
              />
            </div>
            <div class="tanchuang_center">
              <div class="tanchuang_center_cen">
                <div class="node_tanchuang_center_cen_top">
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
                      </el-form>
                    </div>
                  </div>
                </div>
                <div class="tanchuang_center_cen_bottom">
                  <button
                    @click="
                      nodeShowType == 'addRootNode' ||
                      nodeShowType == 'addChildrenNode'
                        ? PartTypeAdd('formValidator')
                        : nodeShowType == 'edChildrenNode'
                        ? PartTypeUpdate('formValidator')
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
          <div
            class="cancel"
            @click="nodeShow = false"
          >
            <img
              :src="require('@/assets/image/index/cancel.png')"
              alt
            />
          </div>
        </div>
      </div>
    </div>
    <import-table :table="table"></import-table>
  </div>
</template>
<script>
import importTable from '../../components/index/importTable.vue'
export default {
  components: { importTable },
  data() {
    return {
      clickHeadShow: false,
      equipmentTypeData: [], //知识库列表,
      equipmentActiveName: '',
      equipmentActiveId: '.',
      nodeShow: false, //节点弹窗
      nodeShowType: 'addRootNode', //节点类型

      formValidator: {
        inputNodeName: '',
      },
      rules: {
        inputNodeName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
      },
      defaultProps: {
        children: 'children',
        label: 'model',
      },
      lastValue: '',
      table: {
        title: '导入物资类别',
        url: 'PartType',
        controller: 'PartType',
        methods: 'Import',
        show: false,
      },
    }
  },
  mounted() {
    this.PartTypeGetList()
  },
  watch: {
    'table.show'(newVal, oldVal) {
      if (newVal) {
      } else {
        this.KnowledgeCategoryGetList()
      }
    },
  },
  methods: {
    async PartTypeExport() {
      //导出
      const res = await this.$api.MMS.PartType.Export()
      if (res) {
        var blob = new Blob([res])
        var a = document.createElement('a')
        a.download = '物资类别.xlsx'
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
    importDaor() {
      this.table.show = true
    },
    async addNodeDel() {
      const that = this
      //删除节点
      this.$confirm('此操作将删除该物资类别, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const res = await that.$api.MMS.PartType.Delete({
            id: that.equipmentActiveId,
          })
          if (res.ok) {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            that.PartTypeGetList() //设备列表
          } else {
            that.$notify({
              title: '警告',
              message: res.message,
              type: 'warning',
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消了删除',
          })
        })
    },
    async PartTypeUpdate(formName) {
      //更新
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.MMS.PartType.Update({
            Id: this.equipmentActiveId,
            Name: this.formValidator.inputNodeName,
          })
          if (res.ok) {
            this.nodeShow = false
            this.PartTypeGetList() //设备列表
            this.$Tools.LayerMsgInfo('成功')
          } else {
            this.$Tools.LayerMsgErr(res.message)
          }
        } else {
          return false
        }
      })
    },
    async PartTypeAdd(formName) {
      //设备类别添加
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.MMS.PartType.Add({
            Id: this.equipmentActiveId,
            Name: this.formValidator.inputNodeName,
          })
          if (res.ok) {
            this.nodeShow = false
            this.PartTypeGetList() //设备类别列表
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
      } else {
        this.formValidator.inputNodeName = this.lastValue
      }
      if (type == 'addRootNode') {
        this.equipmentActiveId = '.'
      }

      //添加节点显示弹窗
      this.nodeShow = true
      this.nodeShowType = type
    },
    EquipmentActive(data) {
      //点击树节点
      this.equipmentActiveName = data.model.name
      this.formValidator.inputNodeName = data.model.name //编辑操作
      this.$store.commit('setequipmentActiveId', data.model.id)
      this.equipmentActiveId = data.model.id
      this.lastValue = data.model.name
    },
    async PartTypeGetList() {
      const res = await this.$api.MMS.PartType.GetList({})
      if (res.ok) {
        this.equipmentTypeData = res.data
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import './styles/PartType.scss';
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
                // margin-top: 20px;
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
      img {
        cursor: pointer;
        width: 44px;
        height: 44px;
      }
    }
  }
}
</style>
