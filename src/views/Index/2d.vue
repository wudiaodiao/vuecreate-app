<template>
  <div :class="['index', $route.name == '2d' ? 'index_shouye' : 'index_qita']">
    <div id="canvas1" class="canvas_w100" v-show="$route.name != 'Monitor' && showCanvas"></div>
    <!-- <backgroundbg> -->
    <div class="index_box">
      <div :class="['index_left', authStore.indexItemShow ? 'index_left_l_de' : 'index_left_l']" v-if="$route.name == '2d'">
        <indexLeft></indexLeft>
      </div>

      <div v-if="$route.name == '2d'">
        {{ authStore.indexItemShow }}
        <div v-if="false && $route.name == '2d'" @click="IOTVisible = !IOTVisible"
          style="position: absolute; bottom: 25px; left: -55px; z-index: 999">
          <!-- <img style="cursor: pointer" src="~@/assets/image/index/IOT_Btn.png" /> -->
          <div v-show="IOTVisible" style="position: absolute; bottom: -24px; left: -90px">
            <!-- <img src="~@/assets/image/index/IOT_Message.png" /> -->
            <span @mouseenter="lightgreen = 1" @mouseover="lightgreen = 0" :class="lightgreen == 1 ? 'lightgreen' : ''"
              style="
                  cursor: pointer;
                  font-size: 16px;
                  top: 13px;
                  position: absolute;
                  left: 14px;
                " @click="runIOT">运行</span>
            <span @mouseenter="lightgreen = 2" @mouseover="lightgreen = 0" :class="lightgreen == 2 ? 'lightgreen' : ''"
              style="
                  cursor: pointer;
                  font-size: 16px;
                  top: 51px;
                  position: absolute;
                  left: 14px;
                " @click="download">下载</span>
          </div>
        </div>
        <indexRight></indexRight>
      </div>

      <div :class="[
        meunlength % 2 == 0 && meunlength < 10
          ? 'index_bottom' + meunlength
          : 'index_bottom50',
        'index_bottom'
      ]">
        <indexBottom v-on:indexItemShow="getValue" v-on:meunLength="getMeunLength"></indexBottom>
      </div>
    </div>

    <div class="Sub_route">
      <el-badge :value="datanum" class="lingdang" v-if="$route.name != '2d' && datanum != 0" @click="notice_show = true">
        <!-- $route.name != '2d' -->
        <img src="../../assets/image/lingdang.png" alt="" style="width: 50px;height: 50px;opacity: 0.8;"
          @click="notice_show = true">
      </el-badge>
      <noticeList v-show="notice_show" @callBack="callBack" :datalist="datalist"></noticeList>
      <router-view></router-view>
    </div>
    <!-- </backgroundbg> -->
  </div>
</template>
<script setup lang="ts">
import noticeList from '@/components/index/noticeList.vue'
import indexLeft from '@/components/index/indexLeft.vue'
import indexRight from '@/components/index/indexRight.vue'
import indexBottom from '@/components/index/indexBottom.vue'
const authStore = useAuthStore()
</script>
<script lang="ts">
// function resize() {
//   var height1 = $(window).height()
//   var h = $('.index_left').height()
//   var zoom = height1 / h
//   $('.index_left').animate({
//     zoom: zoom / 1.15,
//   })

//   h = $('.index_right').height()
//   zoom = height1 / h
//   $('.index_right').animate({
//     zoom: zoom / 1.15,
//   })
// }

// $(document).ready(function () {
//   resize()
//   $(window).resize(function () {
//     resize()
//   })
// })
export default {
  data() {
    return {
      datalist: '' as string | any,
      datanum: 0,
      notice_show: false,
      faval: true,
      informationShow: true,
      menu: [],
      meunlength: 0,
      to: '',
      from: '',
      IOTVisible: false,
      lightgreen: 0,
      // 二维电子地图
      showCanvas: false,
      form: {
        width: 0,
        height: 0,
        stop: false
      },
      model: {
        gui: ''
      }
    }
  },
  watch: {
    monitorNo(val) {
      if (val == -1) {
        this.showCanvas = false
      } else {
        this.showCanvas = true
        this.openGui(val)
      }
    }
  },

  mounted() {
    this.getnoticelist()
    setInterval(() => {
      this.getnoticelist()
    }, 3000);
  },

  methods: {
    getnoticelist() {
      (this as any).$api.MMS.InfoNotice.Get().then((res: { data: string | any[] }) => {
        console.log(res);
        let num = 0
        for (let index = 0; index < res.data.length; index++) {
          num = num + res.data[index].value

        }
        this.datanum = num
        this.datalist = res.data
      }).catch((eer: any) => {
        console.log("错误！")
      })
    },
    callBack(val: boolean) {

      // console.log(val);
      console.log(this.datalist);
      this.notice_show = val;
    },
    getValue(data: boolean) {
      this.faval = data
    },
    getMeunLength(data: number) {
      this.meunlength = data
    },
    // async getTree() {
    //   const res = await this.$api.MMS.Auth.GetTree({})

    //   this.menu = res
    // }
    download() {
      window.open(
        window.ApiBaseURL + 'Template/IOT运维管理平台安装包.exe',
        '_self'
      )
    },
    runIOT() {
      window.open('IOTOM://exe/', '_self')
    },
    // 电子地图
    async openGui(no: any) {
      const res = await (this as any).$api.MMS.Monitor.GetModel({ No: no })
      if (res.ok) {
        this.model = res.data
        if (this.model) {
          this.closeGui()

          var options = JSON.parse(this.model.gui)
          switch (options.type) {
            case 'webBrowser':
              this.form = new $.scada.WebBrowser('canvas1', options)
              break
            case 'canvas':
              this.form = new $.scada.StaticCanvas('canvas1', options)
              var width = this.form.width
              var height = this.form.height
              var mainWidth = $('#canvas1').width()
              var mainHeight = $('#canvas1').height()
              var scale = Math.min(mainWidth / width, mainHeight / height) * 0.8
              width *= scale
              height *= scale
              var left = (mainWidth - width) / 2
              var top = (mainHeight - height) / 4
              this.form.setScale(scale as any)
              this.form.set('left', left)
              this.form.set('top', top)
              this.form.start(2000)
              break
          }
        }
      }
    },
    closeGui() {
      if (this.form) {
        this.form.stop && this.form.stop()
        this.form.clear()
        this.form = null
      }
      $('#canvas1').empty()
    }
  }
}
</script>
<style>
.lingdang .el-badge__content {
  border-radius: 0.625rem;
  color: #FFF;

  display: inline-block;
  font-size: 16px;
  height: 1.225rem;
  background: red;
  line-height: 1.225rem;
  padding: 0 0.375rem;
  text-align: center;
  white-space: nowrap;
  border: none;
}
</style>
<style lang="scss" scoped>
.lingdang {
  // float: right;
  cursor: pointer;
  position: relative;
  ;
  left: 90vw;
  top: 13.5vh;
}

.lightgreen {
  color: lightgreen;
}

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
      top: 2.78%;
      transition: 2s all;
    }

    .index_left {
      width: 420px;
      height: 820px;
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
      width: 420px;
      height: 820px;
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
      // width: 1232px;
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

// 二维电子地图
#canvas1 {
  position: absolute;
  // width: 83%;
  // height: 100%;
  right: 0;
  top: 5.3vh;
}

.canvas_w100 {
  width: 100%;
  height: 95%;
}
</style>
