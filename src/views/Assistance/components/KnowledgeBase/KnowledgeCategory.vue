<!--
 * @Author: your name
 * @Date: 2020-11-09 11:31:29
 * @LastEditTime: 2022-02-18 16:41:56
 * @LastEditors: Please set LastEditors
 * @Description: //知识库类别
 * @FilePath: \IBMS\ibms\src\views\Assistance\components\KnowledgeBase\KnowledgeCategory.vue
-->
<!--值班日志-->

<template>
  <div>
    <div class="knowledgeBase">
      <div class="knowledgeBase_top">
        <ul v-if="
            $Tools.accessControl(
              this.$store.state.userGetUserRole.resList,
              'EditKnowledgeCategory'
            )
          ">
          <li
            class="gen"
            @click="addNode('addRootNode')"
          >
            <span>添加根节点</span>
          </li>
          <li
            v-if="categoryActiveId == $store.state.categoryActiveId"
            @click="addNode('addChildrenNode')"
          >
            <span>添加子节点</span>
          </li>
          <li
            v-if="categoryActiveId == $store.state.categoryActiveId"
            @click="addNode('edChildrenNode')"
          >
            <span>编辑节点</span>
          </li>
          <li
            class="del_red"
            @click="addNodeDel()"
            v-if="categoryActiveId == $store.state.categoryActiveId"
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
      <div class="knowledgeBase_center">
        <div class="knowledgeBase_center_list">
          <div class="tree_center">
            <el-tree
              :data="categoryData"
              :props="defaultProps"
              @node-click="categoryActive"
            >
              <template
                class="custom-tree-node"
                slot-scope="{ node, data }"
              >
                <span :class="[categoryActiveId == data.model.id ? 'aqua' : '']">{{ data.model.name }}</span>
              </template>
            </el-tree>
          </div>
        </div>
      </div>
    </div>
    <div
      class="KnowledgeCategory_tanchuang_ying"
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
                  <div class="tanchuang_center_cen_top">
                    <span>名称：</span>
                    <input
                      type="text"
                      v-model="inputNodeName"
                    />
                  </div>
                </div>
              </div>
              <div class="tanchuang_center_cen_bottom">
                <button
                  @click="
                    nodeShowType == 'addRootNode' ||
                    nodeShowType == 'addChildrenNode'
                      ? KnowledgeCategoryAdd()
                      : nodeShowType == 'edChildrenNode'
                      ? KnowledgeCategoryUpdate()
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
    <import-table :table="table"></import-table>
  </div>
</template>
<script>
import importTable from '../../../../components/index/importTable.vue'

export default {
  components: { importTable },

  data() {
    return {
      clickHeadShow: false,
      categoryData: [], //知识库列表,
      categoryActiveName: '',
      categoryActiveId: '.',
      nodeShow: false, //节点弹窗
      nodeShowType: 'addRootNode', //节点类型
      inputNodeName: '', //节点名称
      open: [],
      defaultProps: {
        children: 'children',
        label: 'model',
      },
      table: {
        title: '导入知识库类别',
        url: 'KnowledgeCategory',
        controller:"KnowledgeCategory",
        methods: 'Import',
        show: false,
        position: 'positionclass',
      },
    }
  },

  created() {},
  mounted() {
    this.KnowledgeCategoryGetList() //知识库列表
  },
  destroyed() {},
  computed: {},
  watch: {
    'table.show'(newVal, oldVal) {
      if (newVal) {
      } else {
        this.KnowledgeCategoryGetList()
      }
    },
  },
  methods: {
    async KnowledgeCategoryExport() {
      //导出
      const res = await this.$api.MMS.KnowledgeCategory.Export()
      if (res) {
        var blob = new Blob([res])
        var a = document.createElement('a')
        a.download = '知识库类别.xlsx'
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
      this.table = {
        title: '导入知识库类别',
        url: 'KnowledgeCategory',
        controller:"KnowledgeCategory",
        methods: 'Import',
        show: true,
        position: 'positionclass',
      }
    },
    async KnowledgeCategoryUpdate() {
      //更新
      const res = await this.$api.MMS.KnowledgeCategory.Update({
        Id: this.categoryActiveId,
        Name: this.inputNodeName,
      })
      if (res.ok) {
        this.nodeShow = false
        this.KnowledgeCategoryGetList() //知识库列表
        this.$Tools.LayerMsgInfo('成功')
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    categoryActive(data) {
      //点击树节点

      this.categoryActiveName = data.model.name
      this.inputNodeName = data.model.name //编辑操作
      this.$store.commit('setCategoryActiveId', data.model.id)
      this.categoryActiveId = data.model.id
    },
    async addNodeDel() {
      const that = this
      //删除节点
      this.$confirm('此操作将删除该知识库类别, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const res = await that.$api.MMS.KnowledgeCategory.Delete({
            id: that.categoryActiveId,
          })

          if (res.ok) {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            that.KnowledgeCategoryGetList() //知识库列表
          } else {
            that.$notify({
              title: '警告',
              message: res.message,
              type: 'warning',
            })
          }
        })
        .catch(() => {})
    },
    addNode(type) {
      if (type != 'edChildrenNode') {
        this.inputNodeName = ''
      }
      if (type == 'addRootNode') {
        this.categoryActiveId = '.'
      }

      //添加节点显示弹窗
      this.nodeShow = true
      this.nodeShowType = type
    },
    async KnowledgeCategoryAdd() {
      //知识库类别添加
      const res = await this.$api.MMS.KnowledgeCategory.Add({
        Id: this.categoryActiveId,
        Name: this.inputNodeName,
      })
      if (res.ok) {
        this.nodeShow = false
        this.KnowledgeCategoryGetList() //知识库列表

        this.$Tools.LayerMsgInfo('成功')
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },

    async KnowledgeCategoryGetList() {
      //获取知识库列表
      const res = await this.$api.MMS.KnowledgeCategory.GetList({})
      if (res.ok) {
        this.categoryData = res.data
      }
    },

    clickHead() {
      //控制列表收缩下拉
      this.clickHeadShow = !this.clickHeadShow
    },
  },
}
</script>
<style lang="scss" scoped>
@import './styles/KnowledgeCategory.scss';
</style>
<style lang="scss">
.KnowledgeCategory_tanchuang_ying {
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
                input {
                  width: 8.5vw;
                  height: 2.5vh;
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
        // width: 44px;
        // height: 44px;
      }
    }
  }
}
</style>
