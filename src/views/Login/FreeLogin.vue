<template></template>
<script>
export default {
  data() {
    return {
      faval: true,
      informationShow: true,
      menu: [],
      meunlength: '',
    }
  },
  created() {
    // this.$router.push({ name: '2d', params: { from: 'FreeLogin' } })
  },
  mounted() {
    this.Login()
  },

  methods: {
    async Login() {
      const res = await this.$api.MMS.Auth.FreeLogin()
      if (res.ok) {
        this.$store.commit('setToken', res.data.token)
        this.$store.commit('setModelMode', '2D')
        localStorage.setItem('IBMSToken', res.data.token)
        this.$store.commit('setUser', res.data.user)

        const resUserRole = await this.$api.MMS.User.GetUserRole({})
        this.$store.commit('setUserGetUserRole', resUserRole.data) //权限
        this.$router.push({ name: '2d', params: { from: 'FreeLogin' } })
      }
    },
  },

  computed: {},

  destroyed() {},
}
</script>


<style lang="scss" scoped>
.index_shouye {
  background: url(~@/assets/image/index/erbao_bg.jpg);
  background-size: 100% 100%;
}
.index_qita {
  background: url(~@/assets/image/index/shouye_qita.png);
  background-size: 100% 100%;
}
.index {
  height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;

  background-position-x: center;
  .index_box {
    user-select: none;

    .index_left_l {
      top: 50%;
      transform: translateY(-50%);
      transition: 1.5s all;
    }
    .index_left_l_de {
      top: 20px;
      transition: 2s all;
    }

    .index_left {
      // width: 420px;
      height: 87.5vh;
      // background-image: url(~@/assets/image/index/index_left_right.png);
      // background-size: 100% 100%;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 40px;

      border-radius: 7px;
      z-index: 100;
    }
    .index_center {
      float: left;
      height: 100vh;
      width: 100vw;
      // opacity: 0.9;
      // background-color: slategrey;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
      color: skyblue;
      .model3d {
        height: 100%;
        width: 100%;
      }
    }
    .index_right {
      // width: 420px;
      height: 87.5vh;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      right: 40px;

      border-radius: 7px;
      z-index: 100;
    }

    .index_bottom8 {
      transform: translateX(-56%) !important;
    }
    .index_bottom6 {
      transform: translateX(-57.8%) !important;
    }
    .index_bottom4 {
      transform: translateX(-61%) !important;
    }

    .index_bottom50 {
      transform: translateX(-50%) !important;
    }
    .index_bottom {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 37px;
      z-index: 9999;
      width: 1232px;
      border-radius: 12px;
      color: #fff;
    }
  }

  //子路由
  .Sub_route {
    position: absolute;
    z-index: 100;
  }
}
</style>
