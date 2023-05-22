<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-02-18 16:44:06
 * @LastEditors: Please set LastEditors
 * @Description: 用户管理
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->
<template>
  <div class="Equipment ">
    <div class="Equipment_cneter public_body">
      <div :class="[
          'EquipmentDanan public_page',
          $store.state.dtab ? 'index_off' : 'index_no'
        ]">
        <div class="content">
          <div class="Equipment_top">
            <ul>
              <li>
                <span>账号：</span>
                <input
                  type="text"
                  class="Equipment_input"
                  v-model="inputAccount"
                />
              </li>
              <li>
                <span>工号：</span>
                <input
                  type="text"
                  class="Equipment_input"
                  v-model="inputJobNumber"
                />
              </li>
              <li>
                <span>名称：</span>
                <input
                  type="text"
                  class="Equipment_input"
                  v-model="inputName"
                />
              </li>

              <li>
                <div class="Equipment_chaxun">
                  <button @click="UserGetList(1)">查询</button>
                </div>
              </li>
            </ul>
            <div class="Equipment_top_top">
              <ul v-if="
                  $Tools.accessControl(
                    this.$store.state.userGetUserRole.resList,
                    'EditUser'
                  )
                ">
                <li>
                  <button @click="addTc('add', '')">添加</button>
                </li>
                <li>
                  <button @click="importDaor(true)">导入</button>
                </li>
              </ul>
            </div>
          </div>
          <div class="Equipment_center">
            <el-table
              :data="UserGetListData.list"
              style="width: 100%"
              :row-class-name="tableRowClassName"
            >
              <el-table-column
                prop="userAccount"
                label="账号"
              >
                <template slot-scope="scope">
                  <span>
                    <a
                      href="#"
                      :title="scope.row.userAccount"
                    >{{
                      scope.row.userAccount
                    }}</a>
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="jobNumber"
                label="工号"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="名称"
              ></el-table-column>
              <el-table-column
                prop="areaName"
                label="性别"
                width="50px"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.gender == true ? '男' : '女' }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="mobile"
                label="手机号码"
              >
                <template slot-scope="scope">
                  <span>
                    <a
                      href="#"
                      :title="scope.row.mobile"
                    >{{
                      scope.row.mobile
                    }}</a>
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="email"
                label="电子邮箱"
              >
                <template slot-scope="scope">
                  <span>
                    <a
                      href="#"
                      :title="scope.row.email"
                    >{{
                      scope.row.email
                    }}</a>
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="departmentName"
                label="部门"
              ></el-table-column>
              <el-table-column
                prop="post"
                label="职位"
                width="70px"
              ></el-table-column>
              <el-table-column
                prop="stateName"
                label="启用"
                width="70px"
              >
                <template slot-scope="scope">
                  <span>
                    {{ scope.row.enable ? '是' : '否' }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="stateName"
                label="党员"
                width="70px"
              >
                <template slot-scope="scope">
                  <span>
                    {{ scope.row.partyMember ? '是' : '否' }}
                  </span>
                </template>
              </el-table-column>

              <el-table-column
                label="重置密码"
                width="80px"
                v-if="
                  $Tools.accessControl(
                    this.$store.state.userGetUserRole.resList,
                    'EditUser'
                  )
                "
              >
                <template slot-scope="scope">
                  <span
                    class="guanlian"
                    @click="addTc('resetPasswords', scope.row.no)"
                  >重置密码</span>
                </template>
              </el-table-column>
              <el-table-column
                label="编辑"
                width="50px"
                v-if="
                  $Tools.accessControl(
                    this.$store.state.userGetUserRole.resList,
                    'EditUser'
                  )
                "
              >
                <template slot-scope="scope">
                  <span
                    class="editing_green"
                    @click="addTc('editor', scope.row)"
                  >编辑</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="Equipment_footer">
            <div class="fenye">
              <el-pagination
                hide-on-single-page
                @current-change="Current"
                :page-size="pageSize"
                :current-page="pageIndex"
                :pager-count="11"
                layout="prev, pager, next"
                :total="UserGetListData.total"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
      <div
        class="Equipment_tanchuang_ying"
        v-if="EquipmentTcShow"
      >
        <div class="tanchuang">
          <div :class="[
              'tanchuang_bg',
              EquipmentTcType == 'chakanLog' ? 'gongd_tanchuang_bg' : ''
            ]">
            <div class="tanchuang_top">
              <img
                :src="require('@/assets/image/index/partial_left.png')"
                alt
              />
              <span class="top_title margin_tc">{{
                EquipmentTcType == 'add'
                  ? '添加用户'
                  : EquipmentTcType == 'resetPasswords'
                  ? '重置密码'
                  : EquipmentTcType == 'editor'
                  ? '编辑用户'
                  : EquipmentTcType == 'edselectFile' ||
                    EquipmentTcType == 'selectFile'
                  ? '选择图片'
                  : EquipmentTcType == 'addImages' ||
                    EquipmentTcType == 'edImages'
                  ? '上传图片'
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
                  class="add"
                  v-if="EquipmentTcType == 'add' || EquipmentTcType == 'editor'"
                >
                  <div class="tanchuang_center_cen_top_w">
                    <div class="tanchuang_center_cen_one">
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
                          <li v-if="EquipmentTcType == 'add'">
                            <el-form-item prop="password">
                              <span>密码：</span>
                              <el-input
                                type="password"
                                v-model="formValidator.password"
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
                            <el-form-item
                              prop="authority"
                              class="form_flex"
                            >
                              <span>性别：</span>
                              <div class="checkboxList">
                                <div class="information_bootom">
                                  <div class="readio_information">
                                    <label
                                      v-for="(item,
                                      i) in InspectionPlanGetInspectionsData"
                                      :key="i"
                                      class="check"
                                    >
                                      <input
                                        type="radio"
                                        :value="item.value"
                                        v-model="formValidator.authority"
                                        :id="item.value"
                                        class="radio_type"
                                      />
                                      <div class="name">{{ item.name }}</div>
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <i>*</i>
                            </el-form-item>
                          </li>
                          <li>
                            <el-form-item prop="schedulingDepartment">
                              <span>部门：</span>
                              <el-cascader
                                :show-all-levels="false"
                                v-model="formValidator.schedulingDepartment"
                                :options="sDepartmentData"
                                :props="{
                                  expandTrigger: 'hover',
                                  value: 'model',
                                  checkStrictly: true
                                }"
                                @change="
                                  sDepartmentChane(
                                    formValidator.schedulingDepartment
                                  )
                                "
                                :placeholder="
                                  formValidator.schedulingDepartment || '请选择'
                                "
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
                          <li>
                            <div>
                              <el-form-item prop="roleNo">
                                <span>角色：</span>
                                <el-select
                                  v-model="formValidator.roleNo"
                                  placeholder="请选择"
                                >
                                  <el-option
                                    v-for="item in RoleGetListData"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.no"
                                  ></el-option>
                                </el-select>
                              </el-form-item>
                            </div>
                          </li>
                          <li>
                            <span>启用：</span>
                            <div class="checkboxList">
                              <div class="information_bootom">
                                <div class="readio_information">
                                  <label
                                    v-for="(item, i) in enableList"
                                    :key="i"
                                    class="check"
                                  >
                                    <input
                                      type="radio"
                                      :value="item.value"
                                      v-model="formValidator.enable"
                                      :id="item.value"
                                      class="radio_type"
                                    />
                                    <div class="name">{{ item.name }}</div>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <span>党员：</span>
                            <div class="checkboxList">
                              <div class="information_bootom">
                                <div class="readio_information">
                                  <label
                                    v-for="(item, i) in partyMemberList"
                                    :key="i"
                                    class="check"
                                  >
                                    <input
                                      type="radio"
                                      :value="item.value"
                                      v-model="formValidator.partyMember"
                                      :id="item.value"
                                      class="radio_type"
                                    />
                                    <div class="name">{{ item.name }}</div>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </li>
                        </el-form>
                      </ul>
                    </div>
                    <div class="tanchuang_center_cen_tow">
                      <div class="photo">
                        <ul>
                          <li>
                            <div class="photo_img">
                              <img
                                :src="photoIdImg"
                                alt="头像"
                                v-if="photoIdImg != ''"
                              />
                              <i v-else>无图片</i>
                            </div>
                            <div :class="['photo_bottom']">
                              <span @click="
                                  previous(
                                    EquipmentTcType == 'editor'
                                      ? 'edImages'
                                      : 'addImages',
                                    ''
                                  )
                                ">上传</span>
                              <span @click="
                                  previous(
                                    EquipmentTcType == 'editor'
                                      ? 'edselectFile'
                                      : 'selectFile',
                                    ''
                                  )
                                ">选择</span>
                              <span @click="empty()">清空</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-else-if="EquipmentTcType == 'resetPasswords'"
                  class="resetPasswords"
                >
                  <ul class="resetPasswords_top">
                    <li>
                      <span>名称：</span>
                      <input
                        type="password"
                        v-model="resetPasswords"
                        placeholder="请输入6~16位的密码"
                      />
                      <i>*</i>
                    </li>
                  </ul>
                </div>
                <div
                  v-else-if="
                    EquipmentTcType == 'edselectFile' ||
                      EquipmentTcType == 'selectFile'
                  "
                  class="edselectFile"
                >
                  <selectImage
                    v-on:previousUp="previousUp"
                    :partType="EquipmentTcType"
                  ></selectImage>
                </div>
                <uploadPictures
                  v-on:addTc="addTc"
                  :EquipmentTcType="EquipmentTcType"
                  v-if="
                    EquipmentTcType == 'edImages' ||
                      EquipmentTcType == 'addImages'
                  "
                ></uploadPictures>
                <div
                  class="tanchuang_center_cen_bottom"
                  v-if="EquipmentTcType!=='selectFile'"
                >
                  <button
                    @click="
                      EquipmentTcType == 'add'
                        ? UserAdd('formValidator')
                        : EquipmentTcType == 'resetPasswords'
                        ? UserResetPwd()
                        : EquipmentTcType == 'editor'
                        ? UserUpdate('formValidator')
                        : EquipmentTcType == 'edImages' ||
                          EquipmentTcType == 'addImages'
                        ? FileSystemSave()
                        : ''
                    "
                    v-preventReClick="2000"
                  >
                    确认
                  </button>
                  <button @click="EquipmentTcShow = false">取消</button>
                </div>
              </div>
            </div>
          </div>
          <div class="cancel">
            <img
              :src="require('@/assets/image/index/withdrawal.png')"
              v-show="
                EquipmentTcType != 'add' &&
                  EquipmentTcType != 'resetPasswords' &&
                  EquipmentTcType != 'editor'
              "
              @click="
                previous(
                  EquipmentTcType == 'edselectFile'
                    ? 'editor'
                    : EquipmentTcType == 'selectFile'
                    ? 'add'
                    : EquipmentTcType == 'edImages'
                    ? 'editor'
                    : EquipmentTcType == 'addImages'
                    ? 'add'
                    : ''
                )
              "
              alt
            />
            <img
              @click="EquipmentTcShow = false"
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
import selectImage from '../../components/index/selectImage'
import uploadPictures from '../../components/index/uploadPictures'
import importTable from '../../components/index/importTable'
export default {
  components: {
    selectImage,
    uploadPictures,
    importTable,
  },
  data() {
    return {
      formValidator: {
        account: '',
        password: '',
        workNumber: '',
        name: '',
        authority: '',
        schedulingDepartment: '',
        position: '',
        mobile: '',
        email: '', //邮箱
        enable: false,
        roleNo: null,
        partyMember: false,
      },
      rules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '6~16的密码', trigger: 'blur' },
        ],
        workNumber: [
          { required: true, message: '请输入工号', trigger: 'blur' },
        ],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        authority: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        roleNo: [{ required: true, message: '请选择角色', trigger: 'blur' }],
        schedulingDepartment: [
          { required: true, message: '请选择部门', trigger: 'change' },
        ],
        position: [{ required: true, message: '请输入职位', trigger: 'blur' }],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/,
            message: '手机号不正确',
            trigger: ['blur', 'change'],
          },
        ],
        email: [
          { required: true, message: '请输入邮箱号', trigger: 'blur' },
          {
            pattern: /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/,
            message: '邮箱号不正确',
            trigger: ['blur', 'change'],
          },
        ],
      },
      inputAccount: '',
      inputJobNumber: '', //工号
      inputName: '',
      EquipmentTcShow: false,
      EquipmentTcType: '',
      UserGetListData: {
        list: [],
        total: 0,
      },
      pageSize: 13, //一页多少条
      pageIndex: 1, //实时页码
      resetPasswords: '', //新密码
      useNo: '', //用户no

      gender: '', //性别

      sDepartmentData: [], //所属部门数据：
      sDepartmentId: 0,

      photoIdImg: '', //图片
      photoId: '',

      role: '', //角色

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
      enableList: [
        {
          value: 1,
          name: '是',
        },
        {
          value: 0,
          name: '否',
        },
      ],
      partyMemberList: [
        {
          value: 1,
          name: '是',
        },
        {
          value: 0,
          name: '否',
        },
      ],
      xjIdArr: [],
      RoleGetListData: [],
      other: [
        {
          no: 0,
          name: '分配聊天账号',
        },
        {
          no: 1,
          name: '启用',
        },
      ], //分配聊天账号与启用
      OtherboxNo: '',
      OtherdArr: [],
      Othercheck: false,
      easemobPassword: '',
      UserMdel: {},
      cbEasemob: false,

      userRole: [],
      partType: '', //出库与入库类型
      scussFile: {},
      table: {
        title: '导入用户',
        url: 'User',
        controller:"User",
        methods: 'ImportUser',
        show: false,
      },
    }
  },
  mounted() {
    this.UserGetList(1) //用户列表
    this.DepartmentGetAllList() //获取所属部门
    this.RoleGetList() //获取角色
  },
  computed: {
    returnState: function () {
      //返回当前时间的上一个月
      //通过回调函数给计算属性传参
      return function (name) {
        switch (name) {
          case '库存':
            return 1
          case '使用中':
            return 2
          case '报废':
            return 5
          default:
            return 0
        }
      }
    },

    returnPicture: function () {
      //返回当前时间的上一个月
      //通过回调函数给计算属性传参
      return function (name) {
        var index = name.indexOf('.')
        var result = name.substr(index + 1, name.length)
        //根据后缀名指定文件类型
        switch (result) {
          case index == -1:
            return 1
          case 'jpg':
            return 2
          case '返回上一级':
            return 3
          case 'ico':
            return 4
          case 'docx':
            return 5
          case 'png':
            return 6
          case 'pdf':
            return 7
          default:
            return 1
        }
      }
    },
  },
  watch: {
    'table.show'(newVal, oldVal) {
      if (newVal) {
      } else {
        this.UserGetList(1)
      }
    },
  },
  methods: {
    importDaor(flag) {
      this.table.show = flag
    },
    async FileSystemSave() {
      const res = await this.$api.MMS.File.GetThumbnailImg({
        Id: this.scussFile.id,
      })
      this.photoIdImg = window.URL.createObjectURL(res)
      this.EquipmentTcType =
        this.EquipmentTcType == 'edImages'
          ? 'editor'
          : this.EquipmentTcType == 'addImages'
          ? 'add'
          : ''
    },
    async FileGetThumbnailImg(id) {
      const res = await this.$api.MMS.File.GetThumbnailImg({ Id: id })
      this.photoIdImg = window.URL.createObjectURL(res)
    },

    empty() {
      //清空
      this.photoIdImg = ''
      this.photoId = ''
    },
    async UserAdd(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          var emailAuthentication = new RegExp(
            /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/
          ) //邮箱
          var passwordAuthentication = new RegExp(/^.{6,16}$/) //密码
          var mobileAuthentication = new RegExp(/^[1][3,4,5,7,8,9][0-9]{9}$/) //手机
          if (
            mobileAuthentication.test(this.formValidator.mobile) &&
            passwordAuthentication.test(this.formValidator.password) &&
            emailAuthentication.test(this.formValidator.email)
          ) {
            const UserRole = []
            for (let i in this.xjIdArr) {
              UserRole.push({
                UserNo: this.UserMdel.no,
                RoleNo: this.xjIdArr[i],
              })
            }
            const res = await this.$api.MMS.User.Add({
              PhotoId: this.photoId,
              UserAccount: this.formValidator.account,
              JobNumber: this.formValidator.workNumber,
              Name: this.formValidator.name,
              Gender: this.formValidator.authority == 0 ? false : true,
              DepartmentId: this.sDepartmentId,
              Post: this.formValidator.position,
              Mobile: this.formValidator.mobile,
              Email: this.formValidator.email,
              // EasemobId: this.UserMdel.easemobId,
              // EasemobPassword: this.easemobPassword,
              Password: this.formValidator.password,
              CarNumber: this.UserMdel.carNumber,
              TenantName: this.UserMdel.tenantName,
              roleNo: this.formValidator.roleNo,
              Enable: this.formValidator.enable == 0 ? false : true,
              PartyMember: this.formValidator.partyMember == 0 ? false : true,
            })
            if (res.ok) {
              this.EquipmentTcShow = false
              this.UserGetModel(this.UserMdel.no)
              this.UserGetList(1)
              this.$Tools.LayerMsgInfo('成功')
            } else {
              this.$Tools.LayerMsgErr(res.message)
            }
          } else {
            this.$Tools.LayerMsgErr(
              mobileAuthentication.test(this.formValidator.mobile) == false
                ? '请输入正确的手机号'
                : emailAuthentication.test(this.formValidator.email) == false
                ? '请输入正确的邮箱'
                : passwordAuthentication.test(this.formValidator.password) ==
                  false
                ? '请输入6~16位的密码'
                : ''
            )
          }
        } else {
          return false
        }
      })
    },
    async UserGetModel(no) {
      const res = await this.$api.MMS.User.GetModel({ no })
      if (res.ok) {
        this.xjIdArr = []
        this.UserMdel = res.data
        this.userRole = res.data.userRole
        for (let i in this.userRole) {
          this.xjIdArr.push(this.userRole[i].roleNo)
        }
      }
    },
    async UserUpdate(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          var emailAuthentication = new RegExp(
            /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/
          ) //邮箱
          var mobileAuthentication = new RegExp(/^[1][3,4,5,7,8,9][0-9]{9}$/) //手机
          if (
            mobileAuthentication.test(this.formValidator.mobile) &&
            emailAuthentication.test(this.formValidator.email)
          ) {
            const UserRole = []
            for (let i in this.xjIdArr) {
              UserRole.push({
                UserNo: this.UserMdel.no,
                RoleNo: this.xjIdArr[i],
              })
            }

            // //编辑关联信号
            const res = await this.$api.MMS.User.Update({
              No: this.UserMdel.no,
              PhotoId: this.photoId,
              UserAccount: this.formValidator.account,
              JobNumber: this.formValidator.workNumber,
              Name: this.formValidator.name,
              Gender: this.formValidator.authority == 0 ? false : true,
              DepartmentId: this.sDepartmentId,
              Post: this.formValidator.position,
              Mobile: this.formValidator.mobile,
              Email: this.formValidator.email,
              EasemobId: this.UserMdel.easemobId,
              EasemobPassword: this.easemobPassword,
              Password: this.formValidator.password,
              CarNumber: this.UserMdel.carNumber,
              TenantName: this.UserMdel.tenantName,
              roleNo: this.formValidator.roleNo,
              Enable: this.formValidator.enable == 0 ? false : true, //启用
              PartyMember: this.formValidator.partyMember == 0 ? false : true,
            })
            if (res.ok) {
              this.EquipmentTcShow = false
              this.UserGetModel(this.UserMdel.no)
              this.UserGetList(1)
              this.$Tools.LayerMsgInfo('成功')
            } else {
              this.$Tools.LayerMsgErr(res.message)
            }
          } else {
            this.$Tools.LayerMsgErr(
              mobileAuthentication.test(this.formValidator.mobile) == false
                ? '请输入正确的手机号'
                : emailAuthentication.test(this.formValidator.email) == false
                ? '请输入正确的邮箱'
                : ''
            )
          }
        } else {
          return false
        }
      })
    },
    async RoleGetList() {
      const res = await this.$api.MMS.Role.GetList({})
      if (res.ok) {
        this.RoleGetListData = res.data
      }
    },
    checkboxOther(item) {
      this.OtherboxNo = item.no
      const index = this.OtherdArr.indexOf(item.no)
      if (index == -1) {
        this.OtherdArr.push(item.no)
      } else {
        this.OtherdArr.splice(index, 1)
      }
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
        this.formValidator.schedulingDepartment =
          this.sDepartmentData[0].model.name
        this.sDepartmentId = this.sDepartmentData[0].model.id //部门id
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
    async UserResetPwd() {
      //匹配任意字符6~16位
      var passwordAuthentication = new RegExp(/^.{6,16}$/)

      if (passwordAuthentication.test(this.resetPasswords)) {
        //编辑密码
        const res = await this.$api.MMS.User.ResetPwd({
          no: this.useNo,
          resetPwd: this.resetPasswords,
        })
        if (res.ok) {
          this.EquipmentTcShow = false
          this.UserGetList(1)
          this.$Tools.LayerMsgInfo('成功')
        } else {
          this.$Tools.LayerMsgErr(res.message)
        }
      } else {
        this.$Tools.LayerMsgErr('请输入6~16位的密码')
        this.resetPasswords = ''
      }
    },
    async UserGetList(pageIndex) {
      //获取用户列表
      this.pageIndex = pageIndex
      const res = await this.$api.MMS.User.Get({
        account: this.inputAccount,
        number: this.inputJobNumber,
        name: this.inputName,
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
      })
      if (res.ok) {
        this.UserGetListData = res.data
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    //返回上一步
    cancelSignal() {
      this.signalTcShow = false

      this.EquipmentTcShow = true
    },

    //选择文件
    previous(type) {
      //返回上一步按钮

      this.EquipmentTcShow = true
      this.EquipmentTcType = type
    },

    async addTc(type, item) {
      if (type == 'add') {
        this.xjIdArr = [] //进入前清空选中项
        this.OtherdArr = []
        this.formValidator.account = ''
        this.formValidator.workNumber = ''
        this.formValidator.name = ''
        this.formValidator.authority = 1
        this.formValidator.password = ''
        this.sDepartmentId = ''
        this.formValidator.schedulingDepartment = ''
        this.formValidator.position = ''
        this.formValidator.enable = 1
        this.formValidator.partyMember = 1
        this.formValidator.mobile = ''
        this.formValidator.email = ''
        this.formValidator.roleNo = null

        this.photoIdImg = ''
      } else if (type == 'editor' && item != '') {
        this.UserGetModel(item.no)
        console.log(item)
        this.UserMdel = item
        this.formValidator.account = item.userAccount
        this.formValidator.workNumber = item.jobNumber
        this.formValidator.name = item.name
        this.formValidator.authority = item.gender == true ? '1' : '0'
        this.formValidator.password = item.password
        this.easemobPassword = item.easemobPassword
        this.sDepartmentId = item.departmentId
        this.formValidator.schedulingDepartment = item.departmentName
        this.formValidator.mobile = item.mobile
        this.formValidator.email = item.email
        this.cbEasemob = item.easemobId == null ? false : true
        this.formValidator.enable = item.enable ? '1' : '0'
        this.formValidator.partyMember = item.partyMember ? '1' : '0'
        this.formValidator.position = item.post
        this.formValidator.roleNo = item.roleNo

        if (item.photoId != null) {
          this.FileGetThumbnailImg(item.photoId)
        }
      } else if (type == 'resetPasswords') {
        this.useNo = item
        this.resetPasswords = ''
      } else if (type == 'EditInformation') {
        if (item != '') {
          this.photoId = item
          await this.FileGetThumbnailImg(item)
        }
      } else if (type == 'edImages' || type == 'addImages') {
        this.scussFile = item
      }

      //添加节点显示弹窗
      this.EquipmentTcShow = true
      this.EquipmentTcType = type
    },
    async previousUp(type, item) {
      if (type == 'edselectFile') {
        this.EquipmentTcType = 'editor'
        this.photoId = item
        await this.FileGetThumbnailImg(item)
      } else if (type == 'selectFile') {
        this.EquipmentTcType = 'add'
        this.photoId = item
        await this.FileGetThumbnailImg(item)
      }
      this.EquipmentTcShow = true
    },

    Current(e) {
      //分页响应事件
      this.UserGetList(e)
    },

    tableRowClassName({ row, rowIndex }) {
      //list背景色
      if (rowIndex % 2 == 1) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
      return ''
    },
  },
}
</script>
<style lang="scss" scoped>
@import './styles/User.scss';
</style>
<style lang="scss">
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
        // margin: 2vh 0;
        .tanchuang_center_cen {
          //重置密码
          .resetPasswords {
            .resetPasswords_top {
              margin-top: 10vh;
              display: flex;
              justify-content: center;
              align-items: center;
              li {
                margin-top: 1vh;

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
              }
            }
          }
          .add {
            //添加用户与编辑用户
            .tanchuang_center_cen_top_w {
              // margin-top: 6vh;
              width: 100%;
              display: flex;
              justify-content: space-around;
              // height: 40vh;
              overflow: auto;
              .tanchuang_center_cen_one {
                flex: 1;
                display: flex;
                justify-content: flex-end;
                .tanchuang_center_cen_top {
                  li {
                    margin-top: 1vh;
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    //请选择
                    transform: translateZ(0);

                    .checkboxList {
                      // width: 8.5vw;
                      // height: 20vh;
                      width: 8.5vw;
                      height: 2.5vh;
                      line-height: 2.5vh;

                      .information_bootom {
                        background-color: rgba(0, 0, 0, 0) !important;
                        opacity: 0.8;

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
                            border: none;
                            outline: none;
                          }
                          .radio_type:before {
                            content: '';
                            width: 10px;
                            height: 10px;
                            border: 1px solid #00f0ff;
                            display: inline-block;
                            border-radius: 50%;
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
                            border-radius: 50%;
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
                            border-radius: 50%;
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
              }

              .tanchuang_center_cen_tow {
                flex: 1;
                display: flex;
                justify-content: center;
                margin-top: 12px;
                // align-items: center;
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
                        height: 160px;
                        width: 160px;
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
                          height: 100%;
                          width: 100%;
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
                          color: #00f0ff;
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
            .tanchuang_center_cen_top_Bottom {
              width: 100%;
              display: flex;
              justify-content: flex-start;
              padding-left: 126px;
              .tanchuang_center_cen_top {
                li {
                  margin-top: 1vh;
                  display: flex;
                  justify-content: start;
                  align-items: center;
                  //请选择
                  .padding_le {
                    transform: translateZ(0);
                    input {
                      padding-left: 40px;
                    }
                  }
                  .checkboxList {
                    width: 80%;
                    overflow: auto;
                    overflow: hidden;
                    .information_bootom {
                      background-color: rgba(0, 0, 0, 0) !important;
                      opacity: 1;

                      .readio_information {
                        display: flex;
                        justify-content: start;
                        flex-direction: row;
                        flex-wrap: wrap;

                        .radio_type {
                          margin-right: 6px;
                          width: 0px;
                          height: 0px;
                          appearance: none;
                          position: relative;
                          border: none;
                          outline: none;
                        }
                        .radio_type:before {
                          content: '';
                          width: 10px;
                          height: 10px;
                          border: 1px solid #00f0ff;
                          display: inline-block;
                          border-radius: 50%;
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
                          border-radius: 50%;
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
                          border-radius: 50%;
                          display: block;
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                        }

                        label {
                          height: 2vh;
                          line-height: 2vh;
                          font-size: 14px;
                          font-family: MicrosoftYaHei;
                          font-weight: 400;
                          color: #00f0ff;
                          margin: 0px 0.8vw;
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

                  .expirydate {
                    .el-input__inner {
                      border: 1px solid #00f0ff;
                    }
                  }
                  input {
                    border-radius: 0;
                    width: 8.5vw;
                    height: 3vh;
                    line-height: 3vh;
                    background-color: rgba(0, 0, 0, 0);
                    // border: 1px solid #00f0ff;
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
        // width: 44px;
        // height: 44px;
      }
    }
  }
}
</style>
