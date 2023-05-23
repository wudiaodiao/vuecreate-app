<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-02-18 16:22:11
 * @LastEditors: Please set LastEditors
 * @Description: 角色管理
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->
<template>
  <div class="ControlMode">
    <div class="schematicRestraint public_body">
      <div :class="['schematicRestraint_center public_page',$store.state.dtab?'index_off':'index_no']">
        <div class="list_margin">
          <div class="cneter_list">
            <div class="lists">
              <div class="kongz_list">
                <el-table
                  :data="roles"
                  style="width: 100%"
                  :row-class-name="tableRowClassName"
                >
                  <el-table-column prop="name" label="名称"></el-table-column>
                  <el-table-column
                    label="编辑"
                    width="100px"
                  >
                    <template slot-scope="scope">
                      <span class="editing_green" @click="onEditClick(scope.row)">编辑</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="Equipment_tanchuang_ying" v-if="showDialog">
        <div class="tanchuang">
          <div class="tanchuang_bg">
            <div class="tanchuang_top">
              <img :src="require('~@/assets/image/index/partial_left.png')" alt />
              <span
                class="top_title margin_tc"
              >编辑</span>
              <img :src="require('@/assets/image/index/partial_right.png')" alt />
            </div>
            <div class="tanchuang_center">
              <div class="tanchuang_center_cen">
                <div class="tanchuang_center_cen_top">
                  <span>子系统权限</span>
                  <div class="tanchuang_center_cen_addbottom">
                    <el-tree ref="monitorTree" :data="monitorNodes" node-key="id" show-checkbox default-expand-all :default-checked-keys="monitorNos"></el-tree>
                  </div>
                </div>
                <div class="tanchuang_center_cen_bottom">
                  <button @click="onConfirmClick" v-preventReClick="2000">确认</button>
                  <button @click="showDialog = false">取消</button>
                </div>
              </div>
            </div>
          </div>
          <div class="cancel">
            <img
              @click="showDialog = false"
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
      roles: [],
      role: null,
      monitorNodes: [],
      monitorNos: [],
      showDialog: false
    }
  },
  mounted() {
      this.$api.MMS.Role.GetList().then(res => {
        this.roles = res.data;
      });

      this.$api.MMS.RoleMonitor.GetTree().then(res => {
        this.monitorNodes = res.data;
      });
  },
  computed: {},
  watch: {},
  methods: {
    onEditClick(role) {
      this.role = role;
      this.$api.MMS.RoleMonitor.GetMonitorNos({
        roleNo: role.no
      }).then(res => {
        this.monitorNos = res.data;
        this.showDialog = true;
      });
    },
    onConfirmClick() {
      var monitorNos = this.$refs.monitorTree.getCheckedKeys();
      this.showDialog = false;
      this.$api.MMS.RoleMonitor.Update({
        roleNo: this.role.no
      }, monitorNos);
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
@import './styles/Role.scss';
</style>
<style  lang="scss" scoped >
.Equipment_tanchuang_ying {
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
      transform: translateZ(0);

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
          text-align: left;
          margin: 0 40px;
          .tanchuang_center_cen_top {
            transform: translateZ(0);

            .tanchuang_center_cen_addbottom {
              height: 45vh;
              width: 100%;
              overflow: auto;
              border: 1px solid rgba(0, 240, 255, 0.6);
            }
          }
          .tanchuang_center_cen_bottom {
            margin-top: 0.7vh;
            text-align: center;

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
        // width: 44px;
        // height: 44px;
      }
    }
  }
}
</style>

