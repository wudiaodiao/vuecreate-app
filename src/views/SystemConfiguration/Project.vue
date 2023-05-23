<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-02-18 16:43:45
 * @LastEditors: Please set LastEditors
 * @Description: 项目信息
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->
<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2020-12-17 09:38:35
 * @LastEditors: Please set LastEditors
 * @Description:项目信息
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->
<template>
  <div class="UserSelf public_body">
    <div :class="['public_page','UserSelf_center', $store.state.dtab ? 'index_off' : 'index_no']">
      <div class="Self">
        <div class="Self_top">
          <span>项目信息</span>
        </div>
        <div class="Self_center">
          <div class="center_left">
            <ul>
              <li>
                <span class="one">项目名称：</span>
                <span>
                  <a
                    href="javascript:;"
                    :title="ProjectGetModelData[4].value"
                  >{{ ProjectGetModelData[4].value }}</a>
                </span>
              </li>
              <li>
                <span class="one">项目描述：</span>
                <span class="er">
                  <a
                    href="javascript:;"
                    :title="ProjectGetModelData[1].value"
                  >{{ ProjectGetModelData[1].value }}</a>
                </span>
              </li>
              <li>
                <span class="one">项目坐标：</span>
                <span>
                  <a
                    href="javascript:;"
                    :title="
                      ProjectGetModelData[3].value +
                        ',' +
                        ProjectGetModelData[2].value
                    "
                  >{{
                      ProjectGetModelData[3].value +
                        ',' +
                        ProjectGetModelData[2].value
                    }}</a>
                </span>
              </li>
              <li>
                <span class="one">有效距离：</span>
                <span>
                  <a
                    href="javascript:;"
                    :title="ProjectGetModelData[6].value + '米'"
                  >{{ ProjectGetModelData[6].value + '米' }}</a>
                </span>
              </li>
              <li>
                <span class="one">项目位置：</span>
                <span>
                  <a
                    href="javascript:;"
                    :title="ProjectGetModelData[5].value"
                  >{{ ProjectGetModelData[5].value }}</a>
                </span>
              </li>
              <li>
                <span class="one">工单处理提醒周期：</span>
                <span>
                  <a
                    href="javascript:;"
                    :title="ProjectGetModelData[7].value + '小时'"
                  >{{ ProjectGetModelData[7].value + '小时' }}</a>
                </span>
              </li>
              <li>
                <span class="one">工单超时阈值：</span>
                <span>
                  <a
                    href="javascript:;"
                    :title="ProjectGetModelData[8].value + '小时'"
                  >{{ ProjectGetModelData[8].value + '小时' }}</a>
                </span>
              </li>
              <!-- <li>
                <span class="one">年检到期预警：</span>
                <span>
                  <a
                    href="javascript:;"
                    :title="ProjectGetModelData[9].value + '天'"
                  >{{ ProjectGetModelData[9].value + '天' }}</a>
                </span>
              </li> -->

            </ul>
          </div>
          <div class="center_right">
            <div class="center_right_ptot">
              <!-- <img
                :src="qrCode"
               
              /> -->
              <qr :url="ImgFileURL"></qr>
              <div style="color: #fff; font-size: 21px;margin-top: 10px;text-indent: 1em;">浙儿后勤</div>
            </div>
          </div>
        </div>
        <div class="Self_bottom">
          <div
            class="bottom_butt"
            v-if="
              $Tools.accessControl(
                this.$store.state.userGetUserRole.resList,
                'EditProject'
              )
            "
          >
            <span @click="addTc('EdProject', '')">编辑</span>
            <!-- <a
              class="xiazai"
              href="Template/视频监控插件.exe"
            >下载视频监控插件</a> -->
          </div>
        </div>
      </div>
    </div>
    <div
      class="EquipmentSignal_tanchuang_ying"
      v-if="PartTcShow"
    >
      <div class="tanchuang">
        <div class="tanchuang_bg">
          <div class="tanchuang_top">
            <img
              :src="require('~@/assets/image/index/partial_left.png')"
              alt
            />
            <span class="top_title margin_tc">{{
              PartTcType == 'EdProject' ? '编辑项目信息' : ''
            }}</span>

            <img
              :src="require('@/assets/image/index/partial_right.png')"
              alt
            />
          </div>
          <div class="tanchuang_center">
            <div class="tanchuang_center_cen">
              <div
                class="EdProject"
                v-if="PartTcType == 'EdProject'"
              >
                <ul class="EdProject_tccenter_top formValidator">
                  <el-form
                    :model="formValidator"
                    ref="formValidator"
                    label-width="100px"
                    class="demo-dynamic"
                    :rules="rules"
                  >
                    <li class="onePartInputName">
                      <el-form-item prop="projectName">
                        <span>名称：</span>
                        <el-input
                          type="text"
                          v-model="formValidator.projectName"
                        />
                        <i>*</i>
                      </el-form-item>
                    </li>
                    <li class="tc_textarea">
                      <span>说明：</span>
                      <!--  :disabled="announcementTcType=='chankan'?true:false" -->
                      <el-input
                        type="textarea"
                        class="chakan"
                        v-model="instructions"
                      ></el-input>
                    </li>
                    <li class="onePartInputName">
                      <el-form-item prop="coordinates">
                        <span>坐标：</span>
                        <el-input
                          type="text"
                          class="location"
                          v-model="formValidator.coordinates"
                        />
                        <i>*</i>
                        <b><a
                            style="text-decoration:underline; color: #00f0ff;"
                            target="_blank"
                            href="http://api.map.baidu.com/lbsapi/getpoint/index.html"
                          >查询</a></b>
                      </el-form-item>
                    </li>
                    <li class="onePartInputName">
                      <el-form-item prop="range">
                        <span>范围：</span>
                        <el-input
                          type="text"
                          class="location"
                          v-model="formValidator.range"
                        />
                        <b>米</b>
                        <i>*</i>
                      </el-form-item>
                    </li>
                    <li class="onePartInputName">
                      <el-form-item prop="location">
                        <span>位置：</span>
                        <el-input
                          type="text"
                          class="location_w"
                          v-model="formValidator.location"
                        />
                        <i>*</i>
                      </el-form-item>
                    </li>
                    <li class="onePartInputName">
                      <el-form-item prop="cycle">
                        <span>工单处理提醒周期：</span>
                        <el-input
                          type="number"
                          maxLength="6"
                          v-model.number="formValidator.cycle"
                        />
                        <b>小时</b>
                        <i>*</i>
                      </el-form-item>
                    </li>
                    <li class="WorkOrderTimeoutThreshold">
                      <el-form-item prop="WorkOrderTimeoutThreshold">
                        <span>工单超时阈值：</span>
                        <el-input
                          type="number"
                          maxLength="6"
                          v-model.number="formValidator.WorkOrderTimeoutThreshold"
                        />
                        <b>小时</b>
                        <i>*</i>
                      </el-form-item>
                    </li>
                    <!-- <li class="EquipmentPeriodReminder">
                      <el-form-item prop="EquipmentPeriodReminder">
                        <span>年检到期预警：</span>
                        <el-input
                          type="number"
                          maxLength="6"
                          v-model.number="formValidator.EquipmentPeriodReminder"
                        />
                        <b>天</b>
                        <i>*</i>
                      </el-form-item>
                    </li> -->
                  </el-form>
                </ul>
              </div>

              <div class="tanchuang_center_cen_bottom">
                <button
                  @click="ProjectUpdate('formValidator')"
                  v-preventReClick="2000"
                >确认</button>
                <button @click="PartTcShow = false">取消</button>
              </div>
            </div>
          </div>
        </div>
        <div class="cancel">
          <img
            v-if="PartTcType != 'EdProject'"
            :src="require('@/assets/image/index/withdrawal.png')"
            alt
          />
          <img
            @click="PartTcShow = false"
            :src="require('@/assets/image/index/cancel.png')"
            alt
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qr from '../../components/index/qr-Code1.vue'
export default {
  components: {
    qr,
  },
  data() {
    return {
      url: null,
      formValidator: {
        projectName: '',
        coordinates: '',
        range: '',
        location: '',
        WorkOrderTimeoutThreshold: '',
        // EquipmentPeriodReminder:'',
        cycle: 0,
      },
      rules: {
        projectName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        coordinates: [
          { required: true, message: '请输入坐标', trigger: 'blur' },
        ],
        range: [{ required: true, message: '请输入范围', trigger: 'blur' }],
        location: [{ required: true, message: '请输入位置', trigger: 'blur' }],
        cycle: [
          { required: true, message: '请输入提醒周期', trigger: 'blur' },
          { type: 'number', message: '必须为数字值' },
        ],
        WorkOrderTimeoutThreshold: [
          { required: true, message: '请输入超时阈值', trigger: 'blur' },
          { type: 'number', message: '必须为数字值' },
        ],
        // EquipmentPeriodReminder: [
        //   { required: true, message: '请输入年检到期预警值', trigger: 'blur' },
        //   { type: 'number', message: '必须为数字值' },
        // ],
      },
      PartTcShow: false,
      PartTcType: '',
      instructions: '',
      ProjectGetModelData: [
        {
          value: '',
        },
        {
          value: '',
        },
        {
          value: '',
        },
        {
          value: '',
        },
        {
          value: '',
        },
        {
          value: '',
        },
        {
          value: '',
        },
        {
          value: '',
        },
        {
          value: '',
        },
        {
          value: '',
        },
      ], //项目信息
      ProjectGetModelDataClone: [], //克隆数据
      // qrCode: require('@/assets/image/index/ewm@2x.png'),
      qrCode: '',
      ImgFileURL: window.ImgFileURL,
    }
  },
  computed: {
    // returnProjectFont: function() {
    //   return function(type) {
    //     //计算属性传参
    //     //根据不同的类型返回不同的值
    //   }
    // }
  },
  mounted() {
    // this.$api.("api/QrCode/Get").then((res) => {
    //   if (res.ok) {
    //     this.qrCode = res.data;
    //   }
    // });

    this.ProjectGetModel()
  },
  methods: {
    async ProjectUpdate(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          var index = this.formValidator.coordinates.lastIndexOf(',')
          if (index == '-1') {
            return this.$Tools.LayerMsgErr('请填写指定的格式,————坐标轴带,号')
          }

          //获取坐标第一位
          this.ProjectGetModelDataClone[3].value =
            this.formValidator.coordinates.substring(0, index)
          //获取坐标第二位
          this.ProjectGetModelDataClone[2].value =
            this.formValidator.coordinates.substring(
              index + 1,
              this.formValidator.coordinates.length
            )

          this.ProjectGetModelDataClone[4].value =
            this.formValidator.projectName //项目名称
          this.ProjectGetModelDataClone[1].value = this.instructions //说明
          this.ProjectGetModelDataClone[6].value = this.formValidator.range //范围
          this.ProjectGetModelDataClone[5].value = this.formValidator.location //位置
          this.ProjectGetModelDataClone[7].value = this.formValidator.cycle //周期
          this.ProjectGetModelDataClone[8].value =
            this.formValidator.WorkOrderTimeoutThreshold //工单超时阈值
          // this.ProjectGetModelDataClone[9].value =
          //   this.formValidator.EquipmentPeriodReminder //年检到期预警

          //编辑关联信号
          // var arr = []
          // for (let i in this.ProjectGetModelData) {
          //   arr.push(this.ProjectGetModelData[i]) //属性
          //   //arr.push(obj[i]); //值
          // }

          const res = await this.$api.MMS.Project.Update(
            this.ProjectGetModelDataClone
          )
          if (res.ok) {
            this.PartTcShow = false
            this.ProjectGetModel() //列表
            this.$Tools.LayerMsgInfo('成功')
          } else {
            this.$Tools.LayerMsgErr(res.message)
          }
        } else {
          return false
        }
      })
    },
    addTc(type, item) {
      if (type == 'EdProject') {
        this.formValidator.projectName = this.ProjectGetModelData[4].value //项目名称
        this.instructions = this.ProjectGetModelData[1].value //说明
        this.formValidator.coordinates =
          this.ProjectGetModelData[3].value +
          ',' +
          this.ProjectGetModelData[2].value //坐标
        this.formValidator.range = this.ProjectGetModelData[6].value //范围
        this.formValidator.location = this.ProjectGetModelData[5].value //位置
        this.formValidator.cycle = this.ProjectGetModelData[7].value - 0 //周期
        this.formValidator.WorkOrderTimeoutThreshold =
          this.ProjectGetModelData[8].value - 0 //周期
        // this.formValidator.EquipmentPeriodReminder =
        //   this.ProjectGetModelData[9].value - 0 //周期
      }
      this.PartTcShow = true
      this.PartTcType = type
    },
    async ProjectGetModel() {
      const res = await this.$api.MMS.Project.GetModel({})
      //获取所有部门
      if (res.ok) {
        this.ProjectGetModelDataClone = JSON.parse(JSON.stringify(res.data)) //深拷贝数据给弹窗
        this.ProjectGetModelData = { ...res.data }
        console.log(this.ProjectGetModelData)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import './styles/Project.scss';

</style>
<style lang="scss">
.formValidator .el-form .el-form-item .el-form-item__content .el-form-item__error {
    left: 50% !important;
    width: 6.25rem;
    top: 0%;
    text-align: left;
}
.xiazai {
  display: inline-block;
  position: relative;
  right: -170px;
  top: -116px;
  text-align: center;
  width: 180px;
  height: 30px;
  line-height: 28px;
  font-size: 18px;
  border: 1px solid #fff;
  border-radius: 30px;
  text-decoration: underline;
}
.EquipmentSignal_tanchuang_ying {
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
        margin: 2vh 0;
        .tanchuang_center_cen {
          overflow: auto;
          height: 50vh;

          .EdProject {
            //编辑项目信息
            .EdProject_tccenter_top {
              // margin-top: 5vh;
              margin-left: 60px;
              .onePartInputName {
                display: flex;
              }
              li {
                text-align: left;
                margin-top: 1vh;
                position: relative;
                transform: translateZ(0);
                // display: flex;
                // justify-content: center;
                // align-items: center;
                //请选择
                .el-input {
                  width: unset !important;
                }
                .location {
                  width: 10vw;
                }
                .location_w {
                  width: 12vw;
                }

                input {
                  border-radius: 0;
                  width: 8.5vw;
                  height: 3vh;
                  line-height: 3vh;
                  background-color: rgba(0, 0, 0, 0);
                  border: 1px solid #00f0ff;
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #00f0ff;
                  padding-left: 0.7vw;
                  margin-right: 3px;
                }
                span {
                  font-size: 16px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #00f0ff;
                }
                i {
                  height: 3vh;
                  line-height: 3vh;
                  font-size: 18px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #00f0ff;
                  vertical-align: sub;
                }
                b {
                  display: inline-block;
                  font-size: 15px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #00f0ff;
                  height: 3vh;
                  line-height: 3vh;
                }
              }
              .tc_textarea {
                display: flex;
                align-items: center;
                // height: 18vh;
                > span {
                  display: inline-block;
                  // width: 80px;
                  text-align: center;
                }
                .chakan {
                  width: 75%;
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
      > img {
        cursor: pointer;
      }
    }
  }
}
</style>
