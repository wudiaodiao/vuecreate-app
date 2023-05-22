<!--
 * @Author: your name
 * @Date: 2020-12-05 16:32:38
 * @LastEditTime: 2021-11-17 16:29:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \IBMS\ibms\src\views\WorkOrder\components\editTheCheck.vue
-->

<template>
  <div class="Equipment">
    <div class="Equipment_cneter">
      <div class="content">
        <div class="EquipmentType_top">
          <ul>
            <li @click="addTc('editTheCheck_add',InspectionPlan)">
              <span>添加</span>
            </li>

            <li
              class="del_red"
              @click="addNodeDel()"
            >
              <span class="del_red">删除</span>
            </li>
          </ul>
        </div>
        <div class="EquipmentType_center">
          <div class="EquipmentType_center_list">
            <div class="tree_center_xunjianjihua">
              <el-tree
                :data="InspectionPlanGetInspectionListData"
                :props="defaultProps"
                @node-click="EquipmentActive"
              >
                <template
                  class="custom-tree-node"
                  slot-scope="{ node, data }"
                >
                  <span :class="[equipmentActiveNo== data.itemNo?'aqua':'']">{{ data.label || data.itemName }}</span>
                </template>
              </el-tree>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    InspectionPlan: '',
  },
  data() {
    return {
      clickHeadShow: false,
      equipmentActiveName: '',
      equipmentActiveNo: '',
      nodeShow: false, //节点弹窗
      nodeShowType: 'addRootNode', //节点类型
      inputNodeName: '', //节点名称
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      InspectNos: [],
      InspectionPlanGetInspectionListData: [], //知识库列表,
    }
  },
  mounted() {
    this.InspectionPlanGetInspectionList() //获取巡检项
  },
  methods: {
    addTc(type, item) {
      this.$emit('addTc', type, item)
    },
    async addNodeDel() {
      const that = this
      //删除节点
      this.$confirm('此操作将删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const res = await this.$api.MMS.InspectionPlan.Remove
          Area({
            No: this.InspectionPlan,
            InspectNos: this.InspectNos,
          })

          if (res.ok) {
            this.InspectNos = [] //清空删除数组
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            that.InspectionPlanGetInspectionList() //设备列表
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

    EquipmentActive(data) {
      //点击树节点

      this.equipmentActiveNo = data.itemNo
      this.inputNodeName = data.label //编辑操作
      let InspectionPlan = []
      if (data.itemNo === this.equipmentActiveNo) {
        if (isNaN(data.itemNo)) {
          //判断是不是非数字、返回true、false
          for (let i in data.children) {
            InspectionPlan.push(data.children[i].itemNo)
          }
          this.InspectNos = InspectionPlan
        } else {
          this.InspectNos = [data.itemNo]
        }
      }
    },
    async InspectionPlanGetInspectionList() {
      const res = await this.$api.MMS.InspectionPlan.GetInspectionList({
        no: this.InspectionPlan,
      })
      if (res.ok) {
        this.InspectionPlanGetInspectionListData = res.data
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.Equipment {
  user-select: none;

  .Equipment_cneter {
    color: #fff;

    .content {
      margin: 12px 44px;

      .EquipmentType_top {
        ul {
          display: flex;
          justify-content: start;
          align-items: center;

          li {
            background: rgba(0, 126, 221, 1);
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

          .del_red {
            background: rgba(255, 60, 0, 1);
          }

          .gen {
            min-width: 100px;
            height: 30px;
            line-height: 30px;
          }
        }
      }

      .EquipmentType_center {
        margin-top: 20px;
        width: 100%;

        .EquipmentType_center_list {
          //   height: 51vh;
          //   overflow-y: scroll;

          .aqua {
            color: #00f0ff;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss" >
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
        width: 44px;
        height: 44px;
      }
    }
  }
}
</style>
