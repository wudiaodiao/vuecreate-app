<template>
  <div
    class="login"
    @click="login_show(true)"
  >
    <div
      class="login_card"
      v-if="loginShow"
    >
      <div class="login_card_zuoyou">
        <div class="login_card_left">
          <div class="login_card_left_title">
            <img
              src="../../assets/image/index/logo@2x.png"
              alt
            />
          </div>
          <div class="login_card_left_line"></div>
          <div class="login_card_left_time">
            <div
              class="currentTime"
              v-html="date"
            ></div>
            <div class="currentDate">{{ $Tools.ymr() }}</div>
          </div>
          <div class="login_card_left_ewm">
            <img
              src="../../assets/image/index/ewm@2x.png"
              alt
            />
          </div>
        </div>
        <div class="login_card_right">
          <div class="login_card_right_article">集成运维管理平台</div>
          <div class="login_card_right_line"></div>
          <div class="login_card_right_paragraph">
            <p>智慧园区集成管理平台是将不同功能的园区智能化管理，通过统一的信息平台实现集成，以形成具体信息汇集，资源共享及优化管理等综合功能的系统平台，服务于设备运维管理。</p>
          </div>
          <div class="login_card_top">
            <div class="login_card_body">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="dynamicValidateForm"
                @submit.native.prevent
              >
                <el-form-item prop="username">
                  <el-input
                    placeholder="请输入用户名"
                    prefix-icon="el-icon-user-solid"
                    v-model="ruleForm.username"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="login_card_body">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="dynamicValidateForm"
                @submit.native.prevent
              >
                <el-form-item prop="password">
                  <el-input
                    placeholder="请输入密码"
                    prefix-icon="el-icon-lock"
                    v-model="ruleForm.password"
                    show-password
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="login_button">
              <el-checkbox v-model="checkedAccount">记住账号</el-checkbox>
              <el-checkbox v-model="checkedPassword">记住密码</el-checkbox>
            </div>
          </div>
        </div>
      </div>
      <div class="login_card__bootom">
        <!-- <el-button type="primary">登录</el-button> -->
        <div class="login_card__bootom_video">
          <a href="JavaScript:;">下载视频监控插件</a>
        </div>

        <div class="login_card__bootom_dl">
          <a
            @click="Login_in('dynamicValidateForm')"
            href="javascript:;"
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //记住密码
      checkedPassword: false,
      checkedAccount: false,
      loginShow: false,
      date: '',
      timer: '',

      //表单验证
      ruleForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
        ],
      },
      token: '',
    }
  },
  mounted() {
    this.date = this.$Tools.getTimer()
    let _this = this // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = _this.$Tools.getTimer() // 修改数据date
    }, 28000)

    if (localStorage.getItem('username')) {
      this.ruleForm.username = localStorage.getItem('username')
      this.checkedAccount = JSON.parse(localStorage.getItem('checkedAccount'))
    }

    if (
      localStorage.getItem('checkedPassword') &&
      localStorage.getItem('password') != null
    ) {
      this.ruleForm.username = localStorage.getItem('username')
      this.checkedAccount = JSON.parse(localStorage.getItem('checkedAccount'))
      this.ruleForm.password = localStorage.getItem('password')
      this.checkedPassword = JSON.parse(localStorage.getItem('checkedPassword'))
    }
    //绑定事件
    window.addEventListener('keydown', this.keyDown)
  },
  methods: {
    login_show(type) {
      this.loginShow = type
    },
    keyDown(e) {
      //如果是回车则执行登录方法
      if (e.keyCode == 13 && this.loginShow) {
        this.Login_in()
      }
    },
    //登录

    async Login_in(formName) {
      if (
        this.ruleForm.username !== '' &&
        this.ruleForm.password !== '' &&
        this.ruleForm.password.length > 5
      ) {
        const res = await this.$api.MMS.Auth.Login({
          userAccount: this.ruleForm.username,
          password: this.ruleForm.password,
        })
        if (res.ok) {
          this.token = res.data.token
          this.$store.commit('setToken', this.token)
          this.$store.commit('setUser', res.data.user)
          if (this.checkedAccount) {
            localStorage.setItem('username', this.ruleForm.username)
            localStorage.setItem('checkedAccount', this.checkedAccount)
          } else {
            localStorage.setItem('username', '')
            localStorage.setItem('checkedAccount', this.checkedAccount)
            localStorage.setItem('password', '')
            localStorage.setItem('checkedPassword', this.checkedPassword)
          }

          if (this.checkedPassword) {
            this.checkedAccount = true
            localStorage.setItem('password', this.ruleForm.password)
            localStorage.setItem('checkedPassword', this.checkedPassword)
            localStorage.setItem('username', this.ruleForm.username)
            localStorage.setItem('checkedAccount', this.checkedAccount)
          } else {
            localStorage.setItem('password', '')
            localStorage.setItem('checkedPassword', this.checkedPassword)
            // localStorage.setItem('username', '')
            // localStorage.setItem('checkedAccount', this.checkedAccount)
          }

          window.location.href = '2d.html'
        } else {
          this.$Tools.LayerMsgErr(res.message)
        }
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          } else {
            return false
          }
        })
      }
    },
  },
  computed: {},
  watch: {
    checkedPassword: function (val) {
      //监听密码选择框的变化
      //记住密码时都记住
      if (val == true) {
        this.checkedAccount = true
      }
    },
    checkedAccount: function (val) {
      //监听密码选择框的变化
      //取消记住账号时都取消
      if (val == false) {
        this.checkedPassword = false
      }
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    }
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDown, false)
  },
}
</script>
<style lang="scss" scoped>
.login {
  user-select: none;
  background-image: url(~@/assets/image/login_bg.jpeg);
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
  // position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @keyframes myfirst {
    0% {
      opacity: 0.4;
      transform: scale(0.1);
      top: -500px;
    }
    50% {
      opacity: 0.4;
      transform: scale(0.1) rotateX(90deg);
      top: -50px;
    }
    100% {
      opacity: 1;
      transform: scale(1) rotateX(0deg);
      top: 0;
    }
  }
  .login_card {
    animation: myfirst 4s ease-in-out;

    position: relative;
    top: 0;
    width: 1072px;

    text-align: center;
    opacity: 0.9;
    border-radius: 0px 0px 20px 20px;
    border-radius: 10px;

    .login_card_zuoyou {
      display: flex;
      .login_card_left {
        height: 512px;
        width: 292px;

        background: linear-gradient(
          180deg,
          RGBA(134, 135, 145, 1),
          RGBA(143, 141, 141, 1)
        );
        border-radius: 20px 0px 0px 0px;
        .login_card_left_title {
          height: 154px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          > img {
            width: 229px;
            height: 75px;
          }
        }
        .login_card_left_line {
          margin: 0 auto;
          width: 264px;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.99),
            rgba(255, 255, 255, 0)
          );
        }
        .login_card_left_time {
          height: 165px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-family: Arial;
          font-weight: 400;
          color: #ffffff;
          .currentTime {
            width: 168px;
            height: 48px;
            font-size: 64px;
          }
          .currentDate {
            margin-top: 20px;
            width: 163px;
            height: 19px;
            font-size: 19px;
          }
        }
        .login_card_left_ewm {
          > img {
            width: 139px;
            height: 155px;
          }
        }
      }
      .login_card_right {
        width: 780px;
        height: 512px;
        background: rgba(5, 5, 5, 0.6);

        border-radius: 0px 20px 0px 0px;
        padding: 0 32px;
        .login_card_right_article {
          padding-left: 12px;
          margin-top: 62px;
          width: 210px;
          height: 25px;
          font-size: 24px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: #ffffff;
        }
        .login_card_right_line {
          margin-top: 16px;
          width: 259px;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.99),
            rgba(255, 255, 255, 0)
          );
        }
        .login_card_right_paragraph {
          width: 100%;
          p {
            text-indent: 2em;
            line-height: 2em;
            letter-spacing: 1.5px; //字间距为2px
            width: 664px;
            text-align: left;
            height: 91px;
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;
          }
        }
        .login_card_top {
          margin-top: 10%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .login_card_body {
          margin-right: 40px;
          margin-left: 10px;
          display: flex;

          .el-input__inner {
            border: 1px solid red !important;
          }
        }
        .login_button {
          margin-right: 400px;
          display: flex;
          justify-content: flex-end;
          align-items: baseline;
          width: 100%;
        }
      }
    }

    .login_card__bootom {
      width: 1072px;
      height: 56px;

      background: linear-gradient(180deg, #565657, #2a2b2b);
      opacity: 0.9;
      border-radius: 0px 0px 20px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .login_card__bootom_video {
        margin-left: 80px;
        a {
          display: block;
          color: #fff;
          min-width: 164px;
          height: 32px;
          line-height: 32px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.8);
        }
      }
      .login_card__bootom_dl {
        margin-right: 33px;
        a {
          display: block;
          width: 33px;
          height: 33px;
          background: url(~@/assets/image/index/login_normal.png) no-repeat;
          background-size: 100% 100%;
        }
        > a:hover {
          background: url(~@/assets/image/index/login_hover.png) no-repeat;

          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
