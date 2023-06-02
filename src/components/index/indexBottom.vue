<template>
  <div>
    <div class="center_bottom">
      <div
        id="animate"
        class="action_items_bar"
        :class="[
          'animate_show_delay',
          menu.length % 2 == 0 && menu.length < '10'
            ? 'animate_show_transform' + menu.length
            : ''
        ]"
      >
        <div class="action_items">
          <ul :class="['center_bottom_list']">
            <!-- menu.length>=8&&i=='3'? 'margin_r':'',
             menu.length>=8&&i=='4'? 'margin_l':'',
            menu.length<5&&i==1?'margin_r4':'',
            menu.length<5&&i==2?'margin_l4':'',-->
            <div :class="['flex_s', 'bo_flex_right']">
              <li
                :class="[
                  'list',
                  'item' + (i + 1),
                  item.model.name == activeMenu
                    ? item.model.name == '报警管理' && baojinshow
                      ? 'alarm_bg'
                      : $route.name == '2d' || $route == '3d'
                      ? ''
                      : item.model.name == '首页'
                      ? ''
                      : 'menu_click_bg'
                    : '',
                  item.model.name != '首页' ? 'classHover' : '',
                  overFlowHide == true ? '' : 'overFlowHide'
                ]"
                @click="selected(item)"
                @mouseenter="enter(item.model.name)"
                @mouseleave="leave()"
                :key="item.model.name"
                v-for="(item, i) in menu.slice(Start, end)"
              >
                <div v-if="item.model.name == '报警管理' && baojinshow">
                  <i :class="['iconfont', 'color_red', item.model.iconPath]"></i>
                  <span>{{ item.model.name }}</span>
                </div>

                <div
                  v-else
                  :class="item.model.name == '首页' ? 'flex_index' : ''"
                >
                  <div v-if="item.model.name != '首页'">
                    <i :class="['iconfont', item.model.iconPath]"></i>
                    <span>{{ item.model.name }}</span>
                  </div>
                  <div
                    class="yuan_bottoms_list hamburger visibility"
                    v-else
                  >
                    <div
                      class="promise"
                      v-show="dtab"
                    >
                      <div class="container">
                        <div id="boxes">
                          <div
                            style="
                              --color: linear-gradient(0deg,rgba(43, 101, 183, 0.6),rgba(16, 182, 144, 0.7));
                            "
                            id="boxxx"
                            @click="threedLeft('2D')"
                          >
                            2D
                          </div>
                          <!--  :class="[borderShow?'border_bootemn':'border_none']" -->
                          <div
                            style="
                              --color: linear-gradient(0deg,rgba(43, 101, 183, 0.6),rgba(16, 182, 144, 0.7));
                            "
                            id="boxxx"
                            @click="threedLeft('3D')"
                            @mouseenter="bottomEnter()"
                            @mouseleave="BottomLeave()"
                          >
                            3D
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="bootom_round dots"
                      :class="[
                        indexItemShow == true
                          ? 'bootom_round_show'
                          : 'bootom_round_none'
                      ]"
                    >
                      <div
                        id="third"
                        :class="[
                          'bootom_round_border',
                          'third',
                          'bootom_round_border_boder_grren'
                        ]"
                        @contextmenu.prevent="rightClick"
                        @click="index_show()"
                        @dblclick="dblindex()"
                      >
                        <div class="bootom_round_border_w">
                          <img
                            src="../../assets/image/index/icon_index.png"
                            alt
                          />
                          <p>
                            {{
                              $route.name == '2d' || $route.name == '3d'
                                ? '首页'
                                : '首页'
                            }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="twoMenu_to"
                  v-show="item.model.name === enterShow"
                >
                  <ul class="twoMenu">
                    <li
                      :class="[
                        subitem.model.name === activeSubMenu
                          ? 'subMenu_click_bg'
                          : ''
                      ]"
                      @click.stop="selectedSub(subitem, item)"
                      v-for="subitem in item.children"
                      :key="subitem.model.name"
                    >
                      {{ subitem.model.name }}
                    </li>
                  </ul>

                  <div
                    class="triangle"
                    v-show="item.children.length > 0"
                  >
                    <img
                      src="../../assets/image/index/triangle.png"
                      v-show="item.children.length > 0"
                      alt
                    />
                  </div>
                </div>
              </li>
            </div>

            <span
              v-if="end > 9 && menu.length > 9"
              @click="addleft()"
              class="bootom_left"
            ></span>
            <span
              v-if="end !== clickIndex && menu.length > 9"
              @click="addRight()"
              class="bootom_right"
            ></span>
          </ul>
        </div>
      </div>

      <!-- 中间 -->

      <div class="yuan_bottoms hamburger">
        <div
          :class="[
            indexItemShow && menu.length % 2 == 0 && menu.length < '10'
              ? 'promise' + menu.length
              : '',
            'promise'
          ]"
          v-show="dtab"
        >
          <div class="container">
            <div id="boxes">
              <div
                style="
                  --color: linear-gradient(0deg,rgba(43, 101, 183, 0.6),rgba(16, 182, 144, 0.7));
                "
                id="boxxx"
                @click="threedLeft('2D')"
              >
                2D
              </div>
              <div
                style="
                  --color: linear-gradient(0deg,rgba(43, 101, 183, 0.6),rgba(16, 182, 144, 0.7));
                "
                id="boxxx"
                @click="threedLeft('3D')"
                @mouseenter="bottomEnter()"
                @mouseleave="BottomLeave()"
              >
                3D
              </div>
            </div>
          </div>
        </div>

        <div
          class="dots"
          :class="[
            indexItemShow == true
              ? menu.length % 2 == 0 && menu.length < '10'
                ? 'bootom_round_show_translate '
                : 'bootom_round_show '
              : 'bootom_round_none',
            'bootom_round'
          ]"
        >
          <earthcomponent :meunLength="menu.length">
            <div
              id="third"
              :class="[
                'bootom_round_border',
                'third',
                'bootom_round_border_boder_grren',
                menu.length % 2 == 0 && menu.length < '10'
                  ? 'bootom_round56'
                  : ''
              ]"
              @contextmenu.prevent="rightClick"
              @click="index_show()"
              @dblclick="dblindex()"
            >
              <div class="bootom_round_border_w">
                <img
                  src="../../assets/image/index/icon_index.png"
                  alt
                />
                <p>
                  {{
                    $route.name == '2d' || $route.name == '3d' ? '首页' : '首页'
                  }}
                </p>
              </div>
            </div>
          </earthcomponent>
        </div>
      </div>

      <!--  :class="[ roundCenterShow == false ? 'TabroundCenterShow' : 'TabroundCenterShowyc']" -->
      <div
        id="navigation"
        :class="[
          'TabroundCenterShow',
          menu.length % 2 == 0 && menu.length < '10'
            ? 'TabroundCenterShowyc_transiton' + menu.length
            : ''
        ]"
      >
        <img
          @click="topTab()"
          src="../../assets/image/index/up.png"
          alt
        />
      </div>
      <audio
        style="withd: 300px; height: 400px"
        id="audio"
        muted
        loop
      >
        <source src="@/assets/audio/alarm.mp3" />
        <source src="@/assets/audio/alarm.ogg" />
      </audio>
      <iframe :src="item.webAction" v-for="(item, index) in linkageItems" :key="index" style="display:none;"></iframe>
    </div>
  </div>
</template>
<script></script>
<script lang="ts">
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/index'
import earthcomponent from '@/views/Index/components/earth/earthcomponent.vue'

let authStore = useAuthStore()
var time = null
export default {
  components: {
    earthcomponent
  },
  data() {
    return {
      indexItemShow: true,
      showDialogT: true,
      menu: [
        {
          children: [],
          model: {
            iconPath: 'iconnenghao',
            name: '首页',
            no: 20,
            parentNo: 0,
            route: null,
            selectedIconPath: 'Images/system_config_selected.png',
            sequence: 13,
          },
        },
      ],
      Tomenulist: '',
      clickIndex: '',
      activeMenu: authStore.itemItem, //选中的菜单
      activeSubMenu: '' || authStore.subItem,
      enterShow: '',
      Start: 0,
      end: 9,
      dtab: false,
      roundCenterShow: false, //圆形
      alarmbaojin: 0,
      baojinshow: false,
      borderShow: true,
      overFlowHide: true, //控制list是否显示隐藏样式
      timer: '',
      guiTimer: '',
      linkageNos: [],
      linkageItems: []
    }
  },
  mounted() {
    authStore.setindexItemShow = true
    var boxes = document.querySelectorAll('#boxes > div')
    ;[].forEach.call(boxes, (box) => {
      box.addEventListener('mousemove', (e) => {
        document.body.style.setProperty(
          '--bg-color',
          box.style.getPropertyValue('--color')
        )

        var size = parseInt(getComputedStyle(box).width)
        // scaling
        var x = size * 0.3 * 0.7 + 0.7 * e.offsetX
        var y = size * 0.3 * 0.7 + 0.7 * e.offsetY

        box.style.setProperty('--x', x)
        box.style.setProperty('--y', y)
        box.style.setProperty('--size', size)
      })
    })

    setTimeout(() => {
      this.getTree()
    }, 300)

    // this.guiTimer = setInterval(() => {
    //   this.GetAlarmAndUnConfirmedCount();
    //   this.GuiLinkageGetList();
    // }, 3000);
  },
  destroyed() {
    clearInterval(this.guiTimer)
    this.guiTimer = null;
  },
  computed: {},
  // 监听其他发生变化，语音播报
  watch: {
    alarmbaojin: function () {},
    'authStore.Menu': function () {
      this.getTree()
    },
    'authStore.token': function () {
      this.getTree()
    },
    'authStore.indexItemShow': function (value) {
      this.indexItemShow = value
    },
  },
  methods: {
    GuiLinkageGetList() {
      this.linkageItems = [];
      this.$api.MMS.GuiLinkage.GetList({}).then(res => {
        let linkageNos = [];
        for (var i = 0; i < res.data.length; i++) {
          let linkage = res.data[i];
          linkageNos.push(linkage.No);

          if (this.linkageNos.indexOf(linkage.No) == -1)
            this.linkageItems.push(linkage);
        }
        this.linkageNos = linkageNos;
      });
    },
    bottomEnter() {
      this.borderShow = false
    },
    BottomLeave() {
      this.borderShow = true
    },
    // 语音播放
    aplayAudio(type) {
      const audio = document.getElementById('audio')
      if (audio && type > 0) {
        audio.play()
        this.baojinshow = true
      } else {
        this.baojinshow = false
        audio.pause()
      }
    },

    GetAlarmAndUnConfirmedCount() {
      //捕获实时报警
      this.$api.MMS.Event.GetAlarmAndUnConfirmedCount({}).then(res => {
        if (res.ok && res.data > 0) {
          this.alarmbaojin = res.data
          this.aplayAudio(this.alarmbaojin)
          authStore.setAlarmCount = this.alarmbaojin
        } else {
          if (res.ok && res.data == 0) {
            this.aplayAudio(res.data)
          }
        }
      })
    },
    topTab() {
      //箭头展示菜单

      this.timer = ''
      $('#navigation')
        .addClass(' TabroundCenterShow')
        .removeClass('TabroundCenterShowyc')
      $('#animate').addClass('animate_show').removeClass('animate_none')

      // this.roundCenterShow = false

      this.indexItemShow = true
      this.$emit('setindexItemShow', this.indexItemShow)
      authStore.setindexItemShow = this.indexItemShow
      this.getTree()
    },
    threedLeft(type) {
      if (type != authStore.modelMode) {
        if (type == '2D') {
          window.location.href = '2d.html'
          authStore.setindexItemShow = true
        } else {
          window.location.href = '3d.html'
          authStore.setindexItemShow = true
        }
      }
      authStore.setModelMode = type
    },
    // twoRight(type) {
    //   authStore.setModelMode = type
    // },
    addleft() {
      if (this.end == 9) {
        return false
      } else {
        this.Start--
        this.end--
        let asmenu = []
        let index = null
        // JSON.parse(JSON.stringify())
        asmenu = this.menu

        let menuArr = []
        for (let i in asmenu) {
          if (asmenu[i] && asmenu[i].model.name != '首页') {
            menuArr.push(asmenu[i])
          } else {
            index = i
          }
        }
        if (menuArr) {
          menuArr.splice(index - 1, 0, {
            children: [],
            model: {
              iconPath: 'iconnenghao',
              name: '首页',
              no: 20,
              parentNo: 0,
              route: null,
              selectedIconPath: 'Images/system_config_selected.png',
              sequence: 13,
            },
          })
          this.menu = menuArr
        }
      }
    },

    rightClick() {
      //右击事件

      this.dtab = !this.dtab
      authStore.setDtab = this.dtab
    },
    addRight() {
      this.clickIndex = this.menu.length
      if (this.end == this.clickIndex) {
        return false
      } else {
        this.Start++
        this.end++
        let asmenu = []
        let index = null
        // JSON.parse(JSON.stringify())
        asmenu = this.menu

        let menuArr = []
        for (let i in asmenu) {
          if (asmenu[i] && asmenu[i].model.name != '首页') {
            menuArr.push(asmenu[i])
          } else {
            index = i
          }
        }
        if (menuArr) {
          menuArr.splice(index - 0 + 1, 0, {
            children: [],
            model: {
              iconPath: 'iconnenghao',
              name: '首页',
              no: 20,
              parentNo: 0,
              route: null,
              selectedIconPath: 'Images/system_config_selected.png',
              sequence: 13,
            },
          })
          this.menu = menuArr
        }
      }
    },
    //双击事件
    dblindex() {
      clearTimeout(this.timer)
      this.timer = ''
      this.activeSubMenu = ''
      this.showDialogT = !this.showDialogT
      this.dtab = false
      authStore.modelMode == '2D'
        ? this.$router.push({ name: '2d' })
        : this.$router.push({ name: '3d' })
    },
    index_show() {
      var self = this
      if (self.timer) return

      self.timer = setTimeout(() => {
        self.dtab = false
        self.indexItemShow = false
        self.$emit('setindexItemShow', self.indexItemShow)
        authStore.setindexItemShow = self.indexItemShow
        $('#navigation')
          .removeClass('TabroundCenterShow')
          .addClass('TabroundCenterShowyc')
        $('#animate').removeClass('animate_show').addClass('animate_none')
      }, 300)
    },
    //选中
    selected(item) {
     
      this.dtab = false

      this.activeMenu = item.model.name
      let arr = []
      for (var j = 0; j < item.children.length; j++) {
        arr.push(item.children[j].model.name)
      }
      if (arr.indexOf(this.activeSubMenu) == -1) {
        this.activeSubMenu = ''
        authStore.setItem = this.activeMenu
      } else {
        authStore.setItem = this.activeMenu
      }

      if (!item.model.route) {
        if (item.children.length != 0) {
          for (let i in item.children) {
            if (i == 0) {
              this.activeSubMenu = item.children[i].model.name
              authStore.setSubItem = this.activeSubMenu
              let nenghao = item.children[i].children.map((v, i) => {
                if (i == 0) {
                  return v.model.name
                }
              })
              if (item.children[i].children.length != 0) {
                authStore.subitemData = item.children[i]
                authStore.setEnergyClick = [...nenghao]
              }
              this.$router.push({ name: item.children[i].model.route })
            }
          }
        }
      } else {
        if (item.children.length === 0) {
          this.$router.push({ name: item.model.route })
        }
      }
    },

    //二级菜单
    async selectedSub(subitem, item) {
      this.activeMenu = item.model.name
      this.activeSubMenu = subitem.model.name
      authStore.subitemData = subitem

      if (item.model.route == null) {
        if (item.children.length > 0) {
          if (subitem.model.route == 'LoginOut') {
            const res = await this.$api.MMS.Auth.Logout({}) //退出登录
            console.log(res)
            if (res.ok) {
              window.location.href = 'login.html'
            }
          }
          this.$router.push({
            name: subitem.model.route,
          })
          this.dtab = false
          authStore.setDtab = this.dtab
          authStore.setSubItem = this.activeSubMenu

          if (subitem.children.length > 0) {
            let nenghao = subitem.children.map((v, s) => {
              if (s == 0) {
                return v.model.name
              }
            })
            authStore = setEnergyClick
          }
        }
      } else {
        return
      }
    },

    //移入移出事件
    enter(item) {
      this.overFlowHide = false

      this.enterShow = item
    },
    leave() {
      this.overFlowHide = true

      this.enterShow = ''
    },
    getTree_Ext(treeList, roleList) {
      // 移除的两大原因：
      // 1.菜单本身的查看权限没有
      // 2.菜单的子节点没有 并且 （自身不带路由 或者自身不带查看权限）

      // 必须拥有的菜单
      var mustMenu = ['MonitorEdit', 'MyWorkOrder', 'LoginOut'] // 例如：运行监控配置等
      for (let i = 0; i < treeList.length; i++) {
        let m = treeList[i]
        let viewKey = m.menuPrivilege.find(
          (p) =>
            p.key.indexOf('View') != -1 ||
            p.key.indexOf('Query') == 0 ||
            p.key.indexOf('Urge') != -1
        )

        if (viewKey && roleList.indexOf(viewKey.key) == -1) {
          treeList.splice(i--, 1)
          continue
        }
        this.getTree_Ext(m.children, roleList)
        if (m.model.route && mustMenu.indexOf(m.model.route) != -1) {
          // 必须存在的菜单，后续的判断就不用了
          continue
        }
        if (m.children.length == 0 && (!m.model.route || !viewKey)) {
          treeList.splice(i--, 1)
        }
      }
    },
    //菜单数据
    async getTree() {
      let res = await this.$api.MMS.Auth.GetTree({})
      res = res.data[0] ? res.data[0].children : []

      const resUserRole = await this.$api.MMS.User.GetUserRole({})
      if (resUserRole.ok) {
        authStore.setUserGetUserRole(authStore, resUserRole.data)
        this.getTree_Ext(res, resUserRole.data.menuPrivilege)
      } else {
        if (resUserRole.data.code == 401) {
          window.opener = null
          this.$Tools.LayerMsgErr('登录已过期')
          setTimeout(() => {
            window.open(resUserRole.data.url, '_top').close()
          }, 2000)
        }
      }

      if (res.length >= 9) {
        let index = null
        if (this.Start != 0) {
          if (res.length % 2 == 0) {
            res.splice(9 / 2, 0, {
              children: [],
              model: {
                iconPath: 'iconnenghao',
                name: '首页',
                no: 20,
                parentNo: 0,
                route: null,
                selectedIconPath: 'Images/system_config_selected.png',
                sequence: 13,
              },
            })
          } else {
            res.splice(9 / 2, 0, {
              children: [],
              model: {
                iconPath: 'iconnenghao',
                name: '首页',
                no: 20,
                parentNo: 0,
                route: null,
                selectedIconPath: 'Images/system_config_selected.png',
                sequence: 13,
              },
            })
          }

          this.Start = 0
          this.end = 9
        } else {
          res.splice(9 / 2, 0, {
            children: [],
            model: {
              iconPath: 'iconnenghao',
              name: '首页',
              no: 20,
              parentNo: 0,
              route: null,
              selectedIconPath: 'Images/system_config_selected.png',
              sequence: 13,
            },
          })
          this.Start = 0
          this.end = 9
        }
      } else {
        if (res.length % 2 == 0) {
          res.splice(res.length / 2, 0, {
            children: [],
            model: {
              iconPath: 'iconnenghao',
              name: '首页',
              no: 20,
              parentNo: 0,
              route: null,
              selectedIconPath: 'Images/system_config_selected.png',
              sequence: 13,
            },
          })
          this.Start = 0
          this.end = 9
        } else {
          res.splice(res.length / 2 + 1, 0, {
            children: [],
            model: {
              iconPath: 'iconnenghao',
              name: '首页',
              no: 20,
              parentNo: 0,
              route: null,
              selectedIconPath: 'Images/system_config_selected.png',
              sequence: 13,
            },
          })
          this.Start = 0
          this.end = 9
        }
      }
for (let index = 0; index < res.length; index++) {
  const element = res[index];
  
  if (element.model.name=="维保管理") {
    // console.log(element.children);
    element.children.forEach(element2 => {
      if (element2.model.name=='巡检管理') {
        console.log(element2.children);
    
        authStore.PatrolTask  = element2
      }
    });
  }
  
}
      this.menu = res
      this.$emit('meunLength', this.menu.length)
    },
    arrowTo() {
      // this.roundCenterShow = false
      // this.indexItemShow = true
    },
    arrowOut() {
      // this.roundCenterShow = true
      // this.indexItemShow = false
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../../views/Index/css/index.scss'; //2、3d样式

.center_bottom {
  padding: 0 20px;
  position: relative;
  // background: rgba(0, 0, 0, 0.6);
  border-radius: 6px;

  .action_items_bar {
    .action_items {
      .center_bottom_list {
        // height: 4.54vh;
        // position: relative;
        // display: flex;
        // justify-content: space-between;
        // min-width: 1000px;

        .menu_click_bg {
          background: url('~@/assets/image/index/menu_click_bg.png');
          background-size: 100% 100%;
          color: rgba(119, 247, 255, 1);
        }
        .alarm_bg {
          // background: #f7493a;
          background: url('~@/assets/image/index/menu_click_bg.png');
          animation: twinkling 0.3s infinite ease-in-out;
          animation-fill-mode: both;
          background-size: 100% 100%;
        }

        @keyframes twinkling {
          0% {
            // opacity: 0.2;
            background: #f7493a;
            filter: alpha(opacity=20);
            background: url('~@/assets/image/index/icon_tab_red.png');
            background-size: 100% 100%;
          }
          50% {
            // opacity: 0.5;
            background: #12b1bd;
            filter: alpha(opacity=50);
            background: url('~@/assets/image/index/menu_click_bg.png') no-repeat;
            background-size: 100% 100%;
          }
          100% {
            //  opacity: 0.2;
            background: #f7493a;
            filter: alpha(opacity=20);
            background: url('~@/assets/image/index/icon_tab_red.png');
            background-size: 100% 100%;
          }
        }
        .flex_s {
          display: flex;
          justify-content: space-between;
          margin: 0 20px;
          flex: 1;
          .flex_index {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          // > li:hover {
          //   color: #00f0ff;
          // }
          .classHover:hover {
            background: url('~@/assets/image/index/menu_click_bg.png');
            background-size: 100% 100%;
          }
        }
        .subMenu_click_bg {
          background: url('~@/assets/image/index/sub_menu_click_bg.png');
          background-size: 100% 100%;
        }
        .margin_l {
          margin-left: 65px;
        }
        .margin_r {
          margin-right: 70px;
        }
        .margin_r4 {
          margin-right: 135px;
        }
        .margin_r4 {
          margin-right: 120px;
        }
        .overFlowHide {
          overflow: unset;
        }
        > li:hover {
          background: url('~@/assets/image/index/menu_click_bg.png');
          background-size: 100% 100%;
        }

        li {
          position: relative;
          user-select: none;
          cursor: pointer;
          text-align: center;
          width: 7vw;
          height: 4.54vh;
          line-height: 4.54vh;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: #ffffff;

          > img {
            margin-right: 9px;
            vertical-align: sub;
            width: 18px;
            height: 18px;
          }
          .iconfont {
            margin-right: 4px;
          }

          @keyframes zz_color {
            0% {
              opacity: 0.6;
              color: red;
            }

            50% {
              opacity: 0.3;
              color: red;
            }
            75% {
              opacity: 0.5;
              color: red;
            }

            100% {
              opacity: 0.6;
              color: red;
            }
          }
          .color_red {
            color: red;
            animation: zz_color 1s ease-in-out alternate infinite;
          }

          .twoMenu_to {
            .twoMenu {
              text-align: center;
              position: absolute;
              bottom: 59px;
              border-radius: 5px;
              background-color: rgba(0, 0, 0, 0.6);
              > li {
                // height: 4.54vh;
                // line-height: 49px;
                font-size: 16px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                width: 136px;
              }
              li:hover {
                color: #00f0ff;
              }
            }

            > .triangle {
              position: absolute;
              height: 29px;
              line-height: 1px;
              bottom: 30px;
              left: 50%;
              transform: translateX(-50%);
              padding: 0 40%;
            }
          }
        }
      }
    }
  }

  @keyframes zz {
    0% {
      opacity: 1;
      transform: translate(-50%, 170%);
    }
    50% {
      opacity: 0.5;
      transform: translate(-50%, 150%);
    }
    75% {
      opacity: 1;
      transform: translate(-50%, 170%);
    }

    100% {
      opacity: 0.5;
      transform: translate(-50%, 150%);
    }
  }
  .TabroundCenterShowyc_transiton8 {
    left: 56% !important;
  }
  .TabroundCenterShowyc_transiton6 {
    left: 57.8% !important;
  }
  .TabroundCenterShowyc_transiton4 {
    left: 61% !important;
  }

  .TabroundCenterShowyc {
    position: absolute;
    z-index: 9999;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 170%);
    transition: all 2s;
    //之前2.5秒
    transition-delay: 1.5s;
    animation: zz 3s linear alternate infinite;
    animation-delay: 6s;

    img {
      width: 28px;
      height: 12px;
      cursor: pointer;
    }

    i {
      font-size: 43px;
      // box-shadow: 0px 5px 20px rgba(12, 236, 234, 1);
      // border: 1px solid rgba(12, 236, 234, 0.6);
      border-radius: 50%;
    }
  }
  .TabroundCenterShow {
    position: absolute;
    z-index: 9999;
    opacity: 0;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 300%);

    transition: all 2s;
    img {
      width: 28px;
      height: 12px;
      cursor: pointer;
    }
    i {
      font-size: 43px;
    }
  }
  .visibility {
    visibility: hidden;
  }
  .yuan_bottoms {
    position: relative;

    .bootom_round_none {
      transform: translate(-50%, 350%);
      transition: all 5s;
      transition-delay: 1s;
    }
    .bootom_round_show_translate {
      transform: translate(-50%, -75%) !important;

      transition-delay: 4s;
      transition: all 3s;
    }

    .bootom_round_show {
      transform: translate(-50%, -75%);
      transition-delay: 4s;
      transition: all 3s;
    }

    .bootom_round {
      text-align: center;
      position: absolute;
      left: 50%;
      top: 50%;

      .bootom_round56 {
        transform: translate(75%, 0%) !important;
      }
      .bootom_round50 {
        transform: translate(-50%, -75%);
      }

      .bootom_round_border {
        cursor: pointer;
        width: 92px;
        height: 92px;
        border-radius: 50%;
        background: url('~@/assets/image/index/index_diqiuBg.png') no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        box-shadow: 0px 0px 12px 0px rgba(123, 221, 255, 0.45);

        .bootom_round_border_w {
          border-radius: 50%;
          height: 71px;
          width: 71px;
          text-align: center;
          // background: #7bddff;
          // background: url('~@/assets/image/index/index_diqiu.png') no-repeat;
          background: linear-gradient(
            to right,
            rgba(22, 231, 255, 0),
            rgba(22, 231, 255, 0.3)
          );
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          z-index: 9999;

          img {
            opacity: 1;
            width: 30px;
            height: 30px;
          }
          p {
            height: 19px;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: #ffffff;
          }
        }
      }

      .bottom_D {
        top: -30%;
        position: absolute;
        width: 100px;
        height: 3vh;
        line-height: 3vh;
        display: flex;
        .bottom_3D {
          flex: 1;
          background: linear-gradient(0deg, #00d8ff 0%, #77f7ff 100%);
          border-radius: 30px;
          margin-right: 10px;
          opacity: 0.8;
          cursor: pointer;
        }
        .bottom_2D {
          flex: 1;
          background: rgba(29, 172, 1, 1);
          border-radius: 30px;
          margin-left: 10px;
          opacity: 0.8;
          cursor: pointer;
        }
      }
    }
  }
  .yuan_bottoms_list {
    // position: relative;

    .bootom_round_none {
      transform: translate(-50%, 350%);
      transition: all 5s;
      transition-delay: 1s;
    }
    .bootom_round_show {
      transform: translate(-50%, -50%);
      transition-delay: 4s;
      transition: all 3s;
    }
    .bootom_round {
      text-align: center;
      position: absolute;
      left: 50%;
      top: 50%;

      .bootom_round_border {
        cursor: pointer;
        width: 92px;
        height: 92px;
        border-radius: 50%;
        background: url('~@/assets/image/index/index_diqiuBg.png') no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        box-shadow: 0px 0px 12px 0px rgba(123, 221, 255, 0.45);

        .bootom_round_border_w {
          border-radius: 50%;
          height: 71px;
          width: 92px;
          text-align: center;
          background: #7bddff;
          background: url('~@/assets/image/index/index_diqiu.png') no-repeat;
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;

          img {
            opacity: 1;
            width: 30px;
            height: 30px;
          }
          p {
            height: 19px;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: #ffffff;
          }
        }
      }

      .bottom_D {
        top: -30%;
        position: absolute;
        width: 100px;
        height: 3vh;
        line-height: 3vh;
        display: flex;
        .bottom_3D {
          flex: 1;
          background: linear-gradient(0deg, #00d8ff 0%, #77f7ff 100%);
          border-radius: 30px;
          margin-right: 10px;
          opacity: 0.8;
          cursor: pointer;
        }
        .bottom_2D {
          flex: 1;
          background: rgba(29, 172, 1, 1);
          border-radius: 30px;
          margin-left: 10px;
          opacity: 0.8;
          cursor: pointer;
        }
      }
    }
  }

  .bootom_left {
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 10px;
    width: 11px;
    height: 12px;
    vertical-align: middle;
    background: url('@/assets/image/index/left.png') no-repeat;
    background-size: 100% 100%;
    transform: translateY(-50%);
  }
  .bootom_right {
    cursor: pointer;
    position: absolute;
    width: 11px;
    height: 12px;
    vertical-align: middle;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    background: url('@/assets/image/index/right.png') no-repeat;
    background-size: 100% 100%;
  }
}
</style>
<style lang="scss" scoped>
.action_items_bar {
  // position: absolute;
  // top: 0%;
  // left: -580px;
  // width: 1200px;
  // height: 44px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 6px;
  // box-shadow: 0px 5px 20px rgba(12, 236, 234, 0.3);
  z-index: 5; /*   animation-name: expand-the-bar;  animation-duration: 2s;  animation-timing-function: ease-in-out; */
  transform: scaleX(0);
  transition: all 0.8s ease-in-out;
}
// .center_bottom input:checked ~ .action_items_bar {
//   transform: scaleX(1);
// }

//偏移中心圆圈位置
//3
.animate_show_transform4 {
  transform-origin: 62% 50%;
}
.animate_show_transform6 {
  transform-origin: 58.5% 50%;
}
//7
.animate_show_transform8 {
  transform-origin: 56.5% 50%;
}
.animate_show_delay {
  transform: scaleX(1);
}
.animate_show {
  transform: scaleX(1);
  transition-delay: 2s;
}
.animate_none {
  transform: scaleX(0);
}
</style>
