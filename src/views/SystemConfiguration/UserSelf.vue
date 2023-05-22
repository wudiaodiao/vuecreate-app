<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-02-18 16:44:09
 * @LastEditors: Please set LastEditors
 * @Description:个人信息
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->
<template>
  <div class="UserSelf">
    <div :class="['UserSelf_center',$store.state.dtab?'index_off':'index_no']">
      <div class="Self">
        <div class="Self_top">
          <span>个人信息</span>
        </div>
        <div class="Self_center">
          <div class="center_left">
            <ul>
              <li>
                <span class="one">账号:</span>
                <span>{{UserMdel.userAccount}}</span>
              </li>
              <li>
                <span class="one">工号：</span>
                <span>{{UserMdel.jobNumber}}</span>
              </li>
              <li>
                <span class="one">姓名:</span>
                <span>{{UserMdel.name}}</span>
              </li>
              <li>
                <span class="one">性别:</span>
                <span>{{UserMdel.sdSex==true?'男':'女'}}</span>
              </li>
              <li>
                <span class="one">部门</span>
                <span>{{UserMdel.departmentName}}</span>
              </li>
              <li>
                <span class="one">职位</span>
                <span>{{UserMdel.post}}</span>
              </li>
              <li>
                <span class="one">手机号码:</span>
                <span>{{UserMdel.mobile}}</span>
              </li>
              <li>
                <span class="one">电子邮件:</span>
                <span>{{UserMdel.email}}</span>
              </li>
            </ul>
          </div>
          <div class="center_right">
            <div class="center_right_ptot">
              <img
                :src="xxphotoIdImg"
                alt="头像"
                v-if="xxphotoIdImg!=''"
              />
            </div>
          </div>
        </div>
        <div class="Self_bottom">
          <div class="bottom_butt">
            <span @click="addTc('EditInformation','')">编辑</span>
            <span @click="addTc('edPassWord','')">修改密码</span>
            <span @click="Logout()">注销登陆</span>
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
              :src="require('@/assets/image/index/partial_left.png')"
              alt
            />
            <span class="top_title margin_tc">{{PartTcType=='edPassWord'?'修改密码':PartTcType=='EditInformation'?'修改个人信息':PartTcType=='edselectFile'?'选择图片':PartTcType=='uploading'?'上传图片':''}}</span>

            <img
              :src="require('@/assets/image/index/partial_right.png')"
              alt
            />
          </div>
          <div class="tanchuang_center">
            <div class="tanchuang_center_cen">
              <div
                class="edPassWord"
                v-if="PartTcType=='edPassWord'"
              >
                <ul class="tanchuang_center_cen_top formValidator">
                  <el-form
                    :model="formValidatorPs"
                    ref="formValidatorPs"
                    label-width="100px"
                    class="demo-dynamic"
                    :rules="rulesPs"
                  >
                    <li>
                      <el-form-item prop="oldPassword">
                        <span>旧密码：</span>
                        <el-input
                          type="password"
                          v-model="formValidatorPs.oldPassword"
                        />
                        <i>*</i>
                      </el-form-item>
                    </li>

                    <li>
                      <el-form-item prop="newPassword">
                        <span>新密码：</span>
                        <el-input
                          type="password"
                          v-model="formValidatorPs.newPassword"
                        />
                        <i>*</i>
                      </el-form-item>
                    </li>
                    <li>
                      <el-form-item prop="verifyNewPassword">
                        <span>重复输入：</span>
                        <el-input
                          type="password"
                          v-model="formValidatorPs.verifyNewPassword"
                        />
                        <i>*</i>
                      </el-form-item>
                    </li>
                  </el-form>
                </ul>
              </div>
              <div
                class="EditInformation"
                v-else-if="PartTcType=='EditInformation'"
              >
                <div class="tanchuang_center_cen_top_w">
                  <ul class="tanchuang_center_cen_top formValidator">
                    <el-form
                      :model="formValidator"
                      ref="formValidator"
                      label-width="100px"
                      class="demo-dynamic"
                      :rules="rules"
                    >
                      <li>
                        <el-form-item prop="account">
                          <span>账号：</span>
                          <el-input
                            type="text"
                            v-model="formValidator.account"
                          />
                          <i>*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item prop="workNumber">
                          <span>工号：</span>
                          <el-input
                            type="text"
                            v-model="formValidator.workNumber"
                          />
                          <i>*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item prop="name">
                          <span>姓名：</span>
                          <el-input
                            type="text"
                            v-model="formValidator.name"
                          />
                          <i>*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <span>性别：</span>
                        <div class="checkboxList">
                          <div class="information_bootom">
                            <div class="readio_information">
                              <label
                                v-for="(item,i) in InspectionPlanGetInspectionsData"
                                :key="i"
                                class="check"
                              >
                                <input
                                  type="radio"
                                  :value="item.value"
                                  v-model="authority"
                                  :id="item.value"
                                  class="radio_type"
                                />
                                <div class="name">{{item.name}}</div>
                              </label>
                            </div>
                          </div>
                        </div>
                        <i>*</i>
                      </li>
                      <li>
                        <el-form-item prop="schedulingDepartment">
                          <span>部门：</span>
                          <el-cascader
                            :show-all-levels="false"
                            v-model="formValidator.schedulingDepartment"
                            :options="sDepartmentData"
                            :props="{ expandTrigger: 'hover', value : 'model',checkStrictly: true  }"
                            @change="sDepartmentChane(formValidator.schedulingDepartment)"
                            :placeholder="formValidator.schedulingDepartment||'请选择'"
                          >
                            <template slot-scope="{ node, data }">
                              <span v-if="data.children.length==0">({{ data.model.code}})</span>
                              <span disabled>{{ data.model.name }}</span>
                              <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                            </template>
                          </el-cascader>
                          <i>*</i>
                        </el-form-item>
                      </li>

                      <li>
                        <el-form-item prop="position">
                          <span>职位：</span>
                          <el-input
                            type="text"
                            v-model="formValidator.position"
                          />
                          <i>*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item prop="mobile">
                          <span>手机号码：</span>
                          <el-input
                            type="text"
                            v-model="formValidator.mobile"
                          />
                          <i>*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item prop="email">
                          <span>电子邮箱：</span>
                          <el-input
                            type="text"
                            v-model="formValidator.email"
                          />

                          <i>*</i>
                        </el-form-item>
                      </li>
                    </el-form>
                  </ul>
                  <div class="tanchuang_center_cen_tow">
                    <div class="photo">
                      <ul>
                        <li>
                          <div class="photo_img">
                            <img
                              :src="photoIdImg"
                              alt
                            />
                            <i>无图片</i>
                          </div>
                          <div :class="['photo_bottom']">
                            <span @click="addTc('uploading','')">上传</span>
                            <span @click="addTc('edselectFile','')">选择</span>
                            <span @click="empty()">清空</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-else-if="PartTcType=='edselectFile'"
                class="edselectFile"
              >
                <selectImage
                  v-on:previousUp="previousUp"
                  :partType="PartTcType"
                ></selectImage>
              </div>
              <uploadPictures
                :EquipmentTcType="PartTcType "
                v-on:addTc="addTc"
                v-if="PartTcType=='uploading'"
              ></uploadPictures>
              <div
                class="tanchuang_center_cen_bottom"
                v-if="PartTcType!='edselectFile'"
              >
                <button
                  @click="PartTcType=='edPassWord'?UserUpdatePwd('formValidatorPs'):PartTcType=='EditInformation'?UserUpdate('formValidator'):PartTcType=='uploading'?FileSystemSave():''"
                  v-preventReClick="2000"
                >确认</button>
                <button @click="PartTcShow=false">取消</button>
              </div>
            </div>
          </div>
        </div>
        <div class="cancel">
          <img
            v-show="PartTcType=='edselectFile'||PartTcType=='uploading'"
            :src="require('@/assets/image/index/withdrawal.png')"
            @click="previous(PartTcType=='edselectFile'?'EditInformation':PartTcType=='uploading'?'EditInformation':'')"
            alt
          />
          <img
            @click="PartTcShow=false"
            :src="require('@/assets/image/index/cancel.png')"
            alt
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import uploadPictures from '../../components/index/uploadPictures'
import selectImage from '../../components/index/selectImage'
export default {
  components: {
    selectImage,
    uploadPictures,
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formValidatorPs.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      formValidatorPs: {
        oldPassword: '',
        newPassword: '',
        verifyNewPassword: '',
      },
      rulesPs: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { min: 6, max: 16, message: '请输入6~16位的密码', trigger: 'blur' },
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 16, message: '请输入6~16位的新密码', trigger: 'blur' },
        ],
        verifyNewPassword: [{ validator: validatePass2, trigger: 'blur' }],
      },

      formValidator: {
        account: '',
        workNumber: '',
        name: '',
        schedulingDepartment: '',
        position: '',
        mobile: '',
        email: '',
      },
      rules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        workNumber: [
          { required: true, message: '请输入工号', trigger: 'blur' },
        ],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        schedulingDepartment: [
          { required: true, message: '请选择部门', trigger: 'change' },
        ],
        position: [
          { required: true, message: '请输入职位', trigger: 'change' },
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/,
            message: '手机号不正确',
            trigger: ['blur', 'change'],
          },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            type: 'email',
            message: '邮箱地址不正确',
            trigger: ['blur', 'change'],
          },
        ],
      },
      UserMdel: {},
      PartTcShow: false,
      PartTcType: '',

      gender: '', //性别

      sDepartmentData: [], //所属部门数据：
      sDepartmentId: 0,

      xxphotoIdImg: '',
      photoIdImg: '', //图片
      photoId: '',

      InspectionPlanGetInspectionsData: [
        {
          value: 1,
          name: '男',
        },
        {
          value: 0,
          name: '女',
        },
      ],
      authority: '', //单选按钮
      scussFile: {},
    }
  },
  async mounted() {
    await this.UserGetModel(this.$store.state.user.no)
    await this.DepartmentGetAllList() //获取所属部门
  },
  methods: {
    async FileSystemSave() {
      //确认按钮
      const res = await this.$api.MMS.File.GetThumbnailImg({
        Id: this.scussFile.id,
      })
      this.photoIdImg = window.URL.createObjectURL(res)
      this.PartTcType = 'EditInformation'
    },
    empty() {
      //清空
      this.photoIdImg = ''
    },
    async FileGetThumbnailImg(id) {
      const res = await this.$api.MMS.File.GetThumbnailImg({ Id: id })
      this.photoIdImg = window.URL.createObjectURL(res)
    },
    async UserUpdate(formName) {
      //编辑关联信号
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.MMS.User.Update({
            No: this.UserMdel.no,
            PhotoId: this.scussFile.id,
            UserAccount: this.formValidator.account,
            Password: this.UserMdel.password,
            JobNumber: this.formValidator.workNumber,
            Name: this.formValidator.name,
            Gender: this.authority == 0 ? false : true,
            Mobile: this.formValidator.mobile,
            Email: this.formValidator.email,
            Post: this.formValidator.position,
            DepartmentId: this.sDepartmentId,
            Enable: this.UserMdel.enable,
            EasemobId: this.UserMdel.easemobId,
            EasemobPassword: this.UserMdel.easemobPassword,
            ExpirationDate: this.UserMdel.expirationDate,
            CarNumber: this.UserMdel.carNumber,
            TenantName: this.UserMdel.tenantName,
            UserRole: this.UserMdel.userRole,
          })
          if (res.ok) {
            this.PartTcShow = false
            this.xxphotoIdImg = this.photoIdImg
            this.UserGetModel(this.$store.state.user.no)

            this.$Tools.LayerMsgInfo('成功')
          } else {
            this.$Tools.LayerMsgErr(res.message)
          }
        } else {
          return false
        }
      })
    },
    async sDepartmentChane(name) {
      //所属部门change事件
      let res = ''
      for (var i = 0; i < name.length; i++) {
        res = name[i].name
        this.sDepartmentId = name[i].id
      }
      if (res == this.formValidator.schedulingDepartment) {
        return
      }
      this.formValidator.schedulingDepartment = res
    },
    async DepartmentGetAllList() {
      const GetDepartment = await this.$api.MMS.Department.Get({})
      //获取所有部门
      if (GetDepartment.ok) {
        this.sDepartmentData = this.getTreeData(GetDepartment.data)
      }
    },
    getTreeData(data) {
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
    //修改密码
    async UserUpdatePwd(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          var passwordAuthentication = new RegExp(/^.{6,16}$/)

          if (
            passwordAuthentication.test(this.formValidatorPs.newPassword) &&
            passwordAuthentication.test(this.formValidatorPs.verifyNewPassword)
          ) {
            const res = await this.$api.MMS.User.UpdatePwd({
              no: this.$store.state.user.no, //用户唯一标识
              oldPwd: this.formValidatorPs.oldPassword,
              newPwd: this.formValidatorPs.newPassword,
              againPwd: this.formValidatorPs.verifyNewPassword,
            })
            if (res.ok) {
              this.PartTcShow = false

              this.$Tools.LayerMsgInfo('成功')
            } else {
              this.$Tools.LayerMsgInfo(res.message)
            }
          } else {
            this.$Tools.LayerMsgInfo('请输入6~16位的密码')

            this.resetPasswords = ''
          }
        } else {
          return false
        }
      })
    },
    async previousUp(type, item) {
      if (item != '') {
        this.photoId = item
        await this.FileGetThumbnailImg(item)
      }

      this.PartTcType = 'EditInformation'
    },
    async addTc(type, item) {
      //弹窗
      if (type == 'edPassWord') {
        //编辑前先清空
        this.formValidatorPs.oldPassword = ''
        this.formValidatorPs.newPassword = ''
        this.formValidatorPs.verifyNewPassword = ''
      } else if (type == 'EditInformation') {
        //编辑
        this.formValidator.email = this.UserMdel.email //邮箱
        this.formValidator.mobile = this.UserMdel.mobile //手机
        this.formValidator.position = this.UserMdel.post //职位
        //  this.gender= this.UserMdel.gender, //性别
        this.authority = this.UserMdel.gender == true ? '1' : '0' //性别
        this.formValidator.name = this.UserMdel.name //姓名
        this.formValidator.workNumber = this.UserMdel.jobNumber //工号
        this.formValidator.account = this.UserMdel.userAccount //账号
        this.sDepartmentId = this.UserMdel.departmentId
        this.photoId = this.UserMdel.photoId
        this.formValidator.schedulingDepartment = this.UserMdel.departmentName //所属部门：
        if (item != '') {
          this.photoId = item
          await this.FileGetThumbnailImg(item)
        }
      } else if (type == 'edselectFile') {
        //选择图片
      } else if (type == 'uploading') {
        this.scussFile = item
      }
      //添加节点显示弹窗
      this.PartTcShow = true
      this.PartTcType = type
    },
    //选择文件
    previous(type) {
      //返回上一步按钮
      this.PartTcShow = true
      this.PartTcType = type
    },
    //根据no获取用户信息
    async UserGetModel(no) {
      const res = await this.$api.MMS.User.GetModel({ no })
      if (res.ok) {
        this.UserMdel = res.data

        if (res.data.PhotoId) {
          this.FileGetThumbnailImg(res.data.PhotoId)
        }
      }
    },
    async Logout() {
      const res = await this.$api.MMS.Auth.Logout({}) //退出登录
      // if (res.ok) {
      //   return this.$router.push('/')
      // }
    },
  },
}
</script>
<style lang="scss" scoped>
@import './styles/UserSelf.scss';
</style>
<style lang="scss" >
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
          //修改密码
          .edPassWord {
            .tanchuang_center_cen_top {
              margin-top: 10vh;
              li {
                margin-top: 1vh;
                display: flex;
                justify-content: center;
                align-items: center;
                //请选择
                .el-input {
                  width: unset !important;
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
                  color: #ffffff;
                  padding-left: 0.7vw;
                }
                span {
                  text-align: left;
                  display: inline-block;
                  font-size: 16px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #00f0ff;
                  width: 80px;
                }
                i {
                  //**** */
                  font-size: 20px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #00f0ff;
                  vertical-align: bottom;
                  margin-left: 5px;
                }
              }
            }
          }
          //编辑
          .EditInformation {
            .tanchuang_center_cen_top_w {
              // margin-top: 6vh;
              width: 100%;
              display: flex;
              justify-content: space-around;
              // height: 40vh;
              overflow: auto;

              .tanchuang_center_cen_top {
                li {
                  margin-top: 1vh;
                  display: flex;
                  justify-content: start;
                  align-items: center;
                  //请选择
                  .el-input {
                    width: unset !important;
                  }
                  .checkboxList {
                    // width: 8.5vw;
                    // height: 20vh;
                    width: 8.5vw;
                    height: 2.5vh;
                    line-height: 2.5vh;

                    .information_bootom {
                      background-color: rgba(0, 0, 0, 0) !important;
                      opacity: 1;

                      .readio_information {
                        display: flex;
                        justify-content: center;
                        flex-direction: row;
                        flex-wrap: wrap;
                        .name {
                          // width: 40px;
                          margin-left: 10px;
                        }

                        .radio_type {
                          margin-right: 6px;
                          width: 0px;
                          height: 0px;
                          appearance: none;
                          position: relative;

                          outline: none;
                        }
                        .radio_type:before {
                          content: '';
                          width: 10px;
                          height: 10px;
                          border: 1px solid #00f0ff;
                          display: inline-block;
                          border-radius: 10%;
                          vertical-align: middle;
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                        }
                        .radio_type:checked:before {
                          content: '';
                          width: 10px;
                          height: 10px;
                          border: 1px solid #00f0ff;
                          display: inline-block;
                          border-radius: 10%;
                          vertical-align: middle;
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                        }
                        .radio_type:checked:after {
                          content: '';
                          width: 6px;
                          height: 6px;
                          text-align: center;
                          background: #00f0ff;
                          border-radius: 10%;
                          display: block;
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                        }

                        label {
                          // height: 2vh;
                          // line-height: 2vh;
                          font-size: 14px;
                          font-family: MicrosoftYaHei;
                          font-weight: 400;
                          color: #00f0ff;
                          margin: 0 0.8vw;
                          display: flex;
                          align-items: center;
                          cursor: pointer;

                          input {
                            line-height: 2vh;
                          }
                          span {
                            margin: 0.3vw;
                          }
                        }
                      }
                    }
                  }
                  .one_a {
                    margin-left: 5px;
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
                  .selectFile_sub {
                    text-decoration: underline;

                    overflow: hidden; //超出的文本隐藏
                    text-overflow: ellipsis; //溢出用省略号显示
                    white-space: nowrap; //溢出不换行
                    cursor: pointer;
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
                    color: #ffffff;
                    padding-left: 0.7vw;
                  }
                  span {
                    font-size: 16px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
                    color: #00f0ff;
                  }
                  i {
                    //**** */
                    font-size: 20px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
                    color: #00f0ff;
                    vertical-align: bottom;
                    margin-left: 5px;
                  }
                }
                .shuxing_li {
                  display: flex;
                  flex-direction: column;
                  justify-content: start;
                  //扩展属性
                  .shuxing_top {
                    display: flex;
                    width: 100%;
                    .shuxing_sub {
                      text-decoration: underline;
                      cursor: pointer;
                    }
                  }
                  .shuxing_center {
                    display: inline-block;
                    // display: flex;
                    // justify-content: flex-end;
                    // margin-left: 60%;

                    width: 100%;
                    // margin-left: 50px;
                    .shuxing_center_dian {
                      margin: 0 3px;
                    }
                    .shuxing_center_key {
                      width: 80px;
                    }
                    .shuxing_center_value {
                      width: 120px;
                      margin-right: 8px;
                    }
                    .del {
                      cursor: pointer;
                    }
                  }
                }
              }
              .tanchuang_center_cen_tow {
                .photo {
                  > ul {
                    display: flex;

                    > li {
                      display: flex;
                      flex-direction: column;

                      .photo_img {
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 12vh;
                        width: 6.5vw;
                        cursor: pointer;
                        border: 1px solid #00f0ff;

                        > i {
                          position: absolute;
                          text-align: center;
                          left: 50%;
                          top: 50%;
                          transform: translate(-50%, -50%);
                          font-size: 14px;
                          margin-left: 0;
                        }

                        img {
                          height: 11vh;
                          width: 6vw;
                        }
                      }

                      .photo_bottom {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        > span {
                          margin-top: 6px;
                          font-size: 14px;
                          cursor: pointer;
                        }
                      }
                    }

                    > :nth-child(2) {
                      margin-left: 0.5vw;
                    }
                  }
                }
              }
            }
          }
          //选择图片
          .edselectFile {
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
