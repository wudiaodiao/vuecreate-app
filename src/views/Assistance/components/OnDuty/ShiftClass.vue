<template>
  <div class="ShiftClass">
    <div class="shiftClass_right_margin">
      <!--班次管理直接用了 值班日志本的样式 -->
      <div class="watchBook">
        <div
          class="watchBook_top"
          v-if="
            $Tools.accessControl(
              this.$store.state.userGetUserRole.resList,
              'EditShiftClass'
            )
          "
        >
          <span @click="shiftManagementTcShowAdd()">添加</span>
        </div>
        <div class="watchBook_center">
          <el-table
            :data="shiftManagementData"
            style="width: 100%"
            :row-class-name="tableRowClassName"
          >
            <el-table-column
              prop="name"
              label="班次名称"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="beginTime"
              label="开始时间"
            ></el-table-column>
            <el-table-column
              prop="endTime"
              label="结束时间"
            ></el-table-column>
            <el-table-column
              label="编辑"
              width="80px"
              v-if="
                $Tools.accessControl(
                  this.$store.state.userGetUserRole.resList,
                  'EditShiftClass'
                )
              "
            >
              <template v-slot="scope">
                <span
                  class="green"
                  @click="shiftManagementTcShowbian(scope.row, 'Editing')"
                >编辑</span>
              </template>
            </el-table-column>
            <el-table-column
              label="删除"
              width="80px"
              v-if="
                $Tools.accessControl(
                  this.$store.state.userGetUserRole.resList,
                  'EditShiftClass'
                )
              "
            >
              <template v-slot="scope">
                <el-popconfirm
                  title="确定删除吗"
                  @onConfirm="ShiftClassDelete(scope.row.no)"
                  @confirm="ShiftClassDelete(scope.row.no)"
                >
                  <span
                    class="red"
                    slot="reference"
                  >删除</span>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="watchBook_bootom"></div>
      </div>
    </div>
    <div
      class="ShiftClass_tanchuang_ying"
      v-if="shiftManagementTcShow"
    >
      <div class="tanchuang">
        <div class="tanchuang_bg">
          <div class="tanchuang_top">
            <img
              :src="require('~@/assets/image/index/partial_left.png')"
              alt
            />
            <span class="top_title">{{
              shiftManagementTcType == 'add' ? '添加班次' : '编辑班次'
            }}</span>

            <img
              :src="require('@/assets/image/index/partial_right.png')"
              alt
            />
          </div>
          <div class="tanchuang_center">
            <div class="tanchuang_center_cen">
              <div class="shiftManagement_tanchuang_center_cen_top">
                <ul class="shiftManagement_list formValidator">
                  <el-form
                    :model="formValidatorMode"
                    ref="formValidatorMode"
                    class="demo-dynamic"
                    :rules="rulesMode"
                  >
                    <li style="display:flex" class="time_input">
                      <el-form-item prop="shiftManagementInputName">
                        <span>班次名称：</span>
                        <input
                          type="text"
                          v-model="formValidatorMode.shiftManagementInputName"
                        /><i style="color:#00f0ff;float: right;">*</i>
                        
                      </el-form-item>
                    </li>
                    <li class="time_input">
                      <span>时间：</span>
                      <el-time-select
                        v-model="formValidatorMode.BeginTime"
                        :picker-options="{
                          start: '00:00',
                          step: '00:15',
                          end: '24:00'
                        }"
                        placeholder="选择时间"
                      ></el-time-select>
                      <i>至</i>
                      <el-time-select
                        v-model="formValidatorMode.EndTime"
                        :picker-options="{
                          start: '00:00',
                          step: '00:15',
                          end: '24:00'
                        }"
                        placeholder="选择时间"
                      ></el-time-select>
                      <i style="color:#00f0ff">*</i>

                    </li>
                  </el-form>
                </ul>
              </div>
              <div class="tanchuang_center_cen_bottom">
                <button
                  @click="
                    shiftManagementTcType == 'add'
                      ? ShiftClassAdd('formValidatorMode')
                      : ShiftClassUpdate('formValidatorMode')
                  "
                  v-preventReClick="2000"
                >
                  确认
                </button>
                <button @click="shiftManagementTcShow = false">取消</button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="cancel"
          @click="shiftManagementTcShow = false"
        >
          <img
            :src="require('@/assets/image/index/cancel.png')"
            alt
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shiftManagementData: [], //班次管理控制器--获取列表
      shiftManagementTcShow: false,
      shiftManagementTcType: 'add',
      shiftManagementInputName: '',
      shiftManagementItem: {},
      BeginTime: '',
      EndTime: '',
      formValidatorMode: {
        shiftManagementInputName: '',
        BeginTime: '',
        EndTime: '',
      },
      rulesMode: {
        shiftManagementInputName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
      },
    }
  },

  created() {},
  mounted() {
    this.ShiftClassGetList() //班次管理控制器--获取列表
  },
  unmounted() {},
  computed: {},
  methods: {
    async ShiftClassAdd(formName) {
      //添加班次
      this.$refs[formName].validate(async (valid) => {
        if (
          valid &&
          this.formValidatorMode.EndTime &&
          this.formValidatorMode.BeginTime
        ) {
          const res = await this.$api.MMS.ShiftClass.Add({
            Name: this.formValidatorMode.shiftManagementInputName,
            BeginTime: this.formValidatorMode.BeginTime,
            EndTime: this.formValidatorMode.EndTime,
          })
          if (res.ok) {
            this.$Tools.LayerMsgInfo('添加成功')
            this.ShiftClassGetList() //添加成功更新列表
            this.shiftManagementTcShow = false
          }
        } else {
          if (
            this.formValidatorMode.BeginTime &&
            this.formValidatorMode.EndTime
          ) {
          } else {
            this.$Tools.LayerMsgErr('请选择时间')
          }
          return false
        }
      })
    },
    shiftManagementTcShowAdd() {
      //添加
      this.shiftManagementTcShow = true
      this.shiftManagementTcType = 'add'
      this.formValidatorMode.shiftManagementInputName = ''
      this.formValidatorMode.BeginTime = ''
      this.formValidatorMode.EndTime = ''
    },
    //编辑完成
    async ShiftClassUpdate(formName) {
      //编辑
      this.$refs[formName].validate(async (valid) => {
        if (
          valid &&
          this.formValidatorMode.EndTime &&
          this.formValidatorMode.BeginTime
        ) {
          const res = await this.$api.MMS.ShiftClass.Update({
            No: this.shiftManagementItem.no,
            Name: this.formValidatorMode.shiftManagementInputName,
            BeginTime: this.formValidatorMode.BeginTime,
            EndTime: this.formValidatorMode.EndTime,
          })
          if (res.ok) {
            this.$Tools.LayerMsgInfo('编辑成功')
            this.ShiftClassGetList() //编辑成功更新列表
            this.shiftManagementTcShow = false
          }
        } else {
          if (
            this.formValidatorMode.BeginTime &&
            this.formValidatorMode.EndTime
          ) {
          } else {
            this.$Tools.LayerMsgErr('请选择时间')
          }
          return false
        }
      })
    },
    shiftManagementTcShowbian(item, type) {
      this.shiftManagementTcShow = true
      this.shiftManagementTcType = type
      this.formValidatorMode.shiftManagementInputName = item.name
      this.formValidatorMode.BeginTime = item.beginTime
      this.formValidatorMode.EndTime = item.endTime
      this.shiftManagementItem = item
    },
    async ShiftClassDelete(no) {
      const res = await this.$api.MMS.ShiftClass.Delete({ no })
      if (res.ok) {
        this.$Tools.LayerMsgInfo('删除成功')
        this.ShiftClassGetList() //删除成功更新列表
      }
    },
    async ShiftClassGetList() {
      //班次管理控制器--获取列表
      const res = await this.$api.MMS.ShiftClass.GetList({})
      if (res.ok) {
        this.shiftManagementData = res.data //
      }
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
@import './styles/ShiftClass.scss';
</style>
<style lang="scss" scoped>
.ShiftClass_tanchuang_ying {
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
          //值班管理、值班日志本
          .watchBook_tanchuang_center_cen_top {
            .watchBook_list {
              margin-top: 8vh;

              > li {
                opacity: 0.8;
                span {
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #ffffff;
                  color: #00f0ff;
                }
                > i {
                  margin-left: 5px;
                  color: #00f0ff;
                }
                input {
                  width: 8.5vw;
                  height: 3vh;
                  background-color: rgba(0, 0, 0, 0);
                  border: 1px solid #00f0ff;
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #ffffff;
                  padding-left: 10px;
                  padding-right: 10px;
                }
              }
            }
          }
          //值班管理、值班日志
          .logbook_tanchuang_center_cen_top {
            .logbook_list {
              .tc_textarea {
                display: flex;
                justify-content: start;
              }
              li {
                display: flex;
                justify-content: center;
                align-items: center;
                span {
                  width: 100px;
                  color: #00f0ff;
                }
                > i {
                  margin-left: 5px;
                  color: #00f0ff;
                }
              }
              > :nth-child(2) {
                margin-top: 20px;
              }
            }
          }
          //班次管理
          .shiftManagement_tanchuang_center_cen_top {
            .shiftManagement_list {
              margin-top: 6vh;
              .time_input {
                display: flex;
                color: #fff;
                i {
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
              li {
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
                  width: 8.5vw;
                  height: 3vh;
                  background-color: rgba(0, 0, 0, 0);
                  border: 1px solid #00f0ff;
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #ffffff;
                  padding-left: 10px;
                  padding-right: 10px;
                }
              }
            }
          }
          //排班管理
          .scheduling_tanchuang_center_cen_top {
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
