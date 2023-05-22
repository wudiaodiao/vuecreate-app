<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-03-09 15:55:05
 * @LastEditors: Please set LastEditors
 * @Description: 设备类别
 * @FilePath: \ibms\src\views\Event\components\attendanceStatistics.vue
-->
<template>
  <div class="Equipment  public_body">
    <div class="Equipment_cneter">
      <div
        :class="[
          'EquipmentType',
          'public_page',
          $store.state.dtab ? 'index_off' : 'index_no'
        ]"
      >
        <div class="content">
          <div
            class="EquipmentType_top"
            v-if="
              $Tools.accessControl(
                this.$store.state.userGetUserRole.resList,
                'EditWorkOrderSubType'
              )
            "
          >
            <ul>
              <li
                v-if="
                  equipmentActiveId == $store.state.equipmentActiveId &&
                    !activeItem.no
                "
                @click="addNode('addChildrenNode')"
              >
                <span>添加子节点</span>
              </li>
              <li v-if="activeItem.no" @click="addNode('edChildrenNode')">
                <span>编辑子节点</span>
              </li>
              <li class="del_red" @click="addNodeDel()" v-if="activeItem.no">
                <span class="del_red">删除子节点</span>
              </li>


            </ul>
          </div>
          <div class="EquipmentType_center">
            <div class="EquipmentType_center_list">
              <div class="tree_center">
                <el-tree
                  :data="workSubTypeData"
                  :props="defaultProps"
                  @node-click="onNodeClick"
                >
                  <template
                    class="custom-tree-node"
                    slot-scope="{ node, data }"
                  >
                    <span
                      :class="[
                        equipmentActiveId == data.model.name ? 'aqua' : ''
                      ]"
                      >{{ data.model.name }}</span
                    >
                  </template>
                </el-tree>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="EquipmentType_tanchuang_ying" v-if="nodeShow">
        <div class="tanchuang">
          <div class="tanchuang_bg">
            <div class="tanchuang_top">
              <img
                :src="require('@/assets/image/index/partial_left.png')"
                alt
              />
              <span class="top_title margin_tc">{{
                nodeShowType == 'addChildrenNode'
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
                        <el-form-item prop="departmentId">
                          <span>部门：</span>
                          <el-cascader
                            :show-all-levels="false"
                            v-model="formValidator.departmentIds"
                            :options="departmentData"
                            :props="{
                              expandTrigger: 'hover',
                              checkStrictly: true
                            }"
                            @change="onDepartmentChange()"
                            placeholder="请选择"
                          >
                            <template slot-scope="{ node, data }">
                              <span disabled>{{ data.label }}</span>
                              <span v-if="data.children">({{ data.children.length }})</span>
                            </template>
                          </el-cascader>
                        </el-form-item>
                      </el-form>
                    </div>
                  </div>
                </div>
                <div class="tanchuang_center_cen_bottom">
                  <button
                    @click="
                      nodeShowType == 'addChildrenNode'
                        ? EquipmentTypeAdd('formValidator')
                        : nodeShowType == 'edChildrenNode'
                        ? EquipmentTypeUpdate('formValidator')
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
          <div class="cancel" @click="nodeShow = false">
            <img :src="require('@/assets/image/index/cancel.png')" alt />
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
      clickHeadShow: false,
      workSubTypeData: [], //知识库列表,
      equipmentActiveName: '',
      equipmentActiveId: '.',
      nodeShow: false, //节点弹窗
      nodeShowType: '', //节点类型
      defaultProps: {
        children: 'children',
        label: 'model'
      },
      formValidator: {
        inputNodeName: '',
        departmentId: '',
        departmentIds: []
      },
      rules: {
        inputNodeName: [
          { required: true, message: '请输入名称', trigger: ['blur','change'] }
        ],
        departmentId: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ]
      },
      lastValue: '',
      activeItem: {},
      departmentData: [], //所属部门数据：
    }
  },
  mounted() {
    this.WorkSubTypeGet()
    this.DepartmentGetAllList() //获取所属部门
  },
  methods: {
    async onDepartmentChange() {
        if (this.formValidator.departmentIds.length > 0)
          this.formValidator.departmentId = this.formValidator.departmentIds[this.formValidator.departmentIds.length - 1];
    },
    async DepartmentGetAllList() {
      const GetDepartment = await this.$api.MMS.Department.Get({})
      //获取所有部门
      if (GetDepartment.ok) {
        let departmentData = GetDepartment.data;
        this.handleDepartmentData(departmentData);
        this.departmentData = departmentData;
      }
    },
    handleDepartmentData(children) {
      for (let i = 0; i < children.length; i++) {
        let node = children[i];
        if (node.children && node.children.length == 0)
          node.children = undefined;
        else
          this.handleDepartmentData(node.children);
      }
    },
    getDepartmentIds(children, value, values) {
      for (let i = 0; children && i < children.length; i++) {
        let node = children[i];
        if (node.value == value) {
          values.splice(0, 0, node.value);
          return true;
        }
        
        if (this.getDepartmentIds(node.children, value, values)) {
          values.splice(0, 0, node.value);
          return true;
        }
      }
      return false;
    },
    async addNodeDel() {
      const that = this
      //删除节点
      this.$confirm('此操作将删除该工单子类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await that.$api.MMS.WorkSubType.Delete({
            no: that.activeItem.no
          })
          if (res.ok) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            that.WorkSubTypeGet() //设备列表
          } else {
            that.$notify({
              title: '警告',
              message: res.message,
              type: 'warning'
            })
          }
        })
    },
    async EquipmentTypeUpdate(formName) {
      //更新
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.$api.MMS.WorkSubType.Update({
            Name: this.formValidator.inputNodeName,
            Type: this.activeItem.type,
            DepartmentId: this.formValidator.departmentId,
            No:this.activeItem.no
          })
          if (res.ok) {
            this.nodeShow = false
            this.WorkSubTypeGet() //设备列表
            this.$Tools.LayerMsgInfo('成功')
            this.formValidator.inputNodeName=''

          } else {
            this.$Tools.LayerMsgErr(res.message)
          }
        } else {
          return false
        }
      })
    },
    async EquipmentTypeAdd(formName) {
      //设备类别添加
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.$api.MMS.WorkSubType.Add({
            Name: this.formValidator.inputNodeName,
            Type: this.activeItem.type,
            DepartmentId: this.formValidator.departmentId
          })
          if (res.ok) {
            this.nodeShow = false
            this.WorkSubTypeGet() //设备类别列表
            this.$Tools.LayerMsgInfo('成功')
            this.formValidator.inputNodeName=''
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

      //添加节点显示弹窗
      this.nodeShow = true
      this.nodeShowType = type
    },
    onNodeClick(data) {
      //点击树节点
      this.equipmentActiveName = data.model.name
      this.formValidator.inputNodeName = data.model.name //编辑操作
      this.formValidator.departmentId = data.model.departmentId //编辑操作
      let departmentIds = [];
      this.getDepartmentIds(this.departmentData, this.formValidator.departmentId, departmentIds);
      this.formValidator.departmentIds = departmentIds;

      this.$store.commit('setequipmentActiveId', data.model.name)
      this.equipmentActiveId = data.model.name
      this.lastValue = data.model.name
      this.activeItem = data.model
    },
    async WorkSubTypeGet() {
      let arr = [
        {
          model: {
            name: '保养工单',
            type: 1
          },
          children: []
        },
        {
          model: {
            name: '报修工单',
            type: 2
          },
          children: []
        },
        {
          model: {
            name: '报事工单',
            type: 3
          },
          children: []
        }
      ]

      const res = await this.$api.MMS.WorkSubType.Get({})
      if (res.ok) {
        let data = res.data
        for (let i in data) {
          arr.map(p => {
            if (p.model.type == data[i].type)
              p.children.push({ model: data[i], children: [] })
          })
        }
        this.workSubTypeData = arr
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../Equipment/styles/EquipmentType.scss';
.tree_center > .el-tree {
    background: unset;
    font-size: 0.9375rem;
    color: #fff;
    width: 100%;
}
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
                display: flex;
                justify-content: center;
                .el-input {
                  width: unset !important;
                }
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
