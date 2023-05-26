<template>
  <div class="index_center"  ref="canvas">

    <div
      class="container"
      ondragstart="return false;"
    >
      <div
     
        id="canvas"
        :class="[$route.name == 'Monitor' ? 'canvas_w83' : 'canvas_w100']"
        v-show="$route.name == 'Monitor' || showCanvas"
      ></div>
      <div
        :class="['monitor_left_top_bootom', controlDialogVisible?'pointer_events_none':'']"
        v-show="$route.name == 'Monitor'"
      >
        <div class="monitor_left_top_bootom_listLeft">
          <div class="bootom_listLeft_img">
            <img
              class="img"
              src="../../assets/image/index/xt.png"
              alt
            />
            <span>系统选择</span>
          </div>
          <div class="line_cent">
            <div class="line"></div>
          </div>
          <div class="my_tree3d">
            <ul class="my_tree_ul">
              <div
                class="li"
                v-for="itemfloorTree in treeData"
                :key="itemfloorTree.label"
                v-show="!itemfloorTree.hidden"
              >
                <li>
                  <div :class="[
                    'fuqing',
                    itemfloorTree.no == lebaNameNo ? 'activeBg' : ''
                  ]">
                    <span
                      :class="[
                      'jiantou',
                      open.indexOf(itemfloorTree.label) === -1
                        ? ''
                        : 'rotate45',
                      'placeholder'
                    ]"
                      @click="
                      ListShow(
                        open.indexOf(itemfloorTree.label),
                        itemfloorTree.label
                      )
                    "
                    ></span>

                    <span
                      :title="itemfloorTree.label"
                      class="title"
                      @click="getSystemValue(itemfloorTree)"
                    >{{ itemfloorTree.label }}</span>
                  </div>
                </li>

                <!-- <ul class="erzi" id="FloorChoice" v-if="open.indexOf(itemfloorTree.label) === -1">
                <li
                  v-for="itemTreeSubject in itemfloorTree.children"
                  :key="itemTreeSubject.label"
                  @click="getSystemValue(itemTreeSubject)"
                >
                  <span
                    :class="['lou', itemTreeSubject.no==lebaNameNo?'bg':'']"
                    :title="itemTreeSubject.label"
                  >{{itemTreeSubject.label}}</span>
                  <div class="right">
                    <span v-show="itemTreeSubject.no==lebaNameNo" class="gou"></span>
                  </div>
                  <div class="right_gou">
                    <span class="iconfont iconlujingbeifen11" v-show="itemTreeSubject.ischeck"></span>
                  </div>
                </li>
              </ul>-->
              </div>
            </ul>
          </div>
        </div>

        <div
          class="monitor_left_top_bootom_right"
          v-if="systemTreeList"
        >
          <div class="bootom_listright_img">
            <img
              class="img"
              src="../../assets/image/index/lc.png"
              alt
            />
            <span>区域选择</span>
          </div>
          <div class="line_cent">
            <div class="line"></div>
          </div>
          <div class="my_tree3d">
            <treeNode
              :systemTreeList="systemTreeList"
              v-on:childByValue="regionalSelection"
            ></treeNode>
          </div>
        </div>
      </div>

      <!-- <div class="tree" v-if="$route.name == 'Monitor'">
      <el-scrollbar style="height: 100%">
        <el-tree
          ref="monitorTree"
          :data="treeData"
          default-expand-all
          highlight-current
          :expand-on-click-node="false"
          node-key="no"
          @node-click="regionalSelection"
          class="el-scrollbar"
          el-icon-s-flag
        ></el-tree>
      </el-scrollbar>
    </div>-->

      <!-- 模式控制弹窗 -->
      <div
        class="tanchuang_ying"
        v-if="controlDialogVisible"
      >
        <div class="tanchuang_defulet">
          <div
            class="tanchuang"
            ref="tanchuang"
            v-drag
          >
            <div class="tanchuang_bg">
              <div>
                <div class="tanchuang_top">
                  <img
                    src="../../assets/image/index/partial_left.png"
                    alt
                  />
                  <span class="top_title">控制</span>
                  <img
                    src="../../assets/image/index/partial_right.png"
                    alt
                  />
                </div>
                <div class="tanchuang_center">
                  <div class="tanchuang_center_cen">
                    <div :class="[
                      'tanchuang_center_cen_top',
                      valueType == 1 ? 'radioTypeMargin' : ''
                    ]">
                      <span>设定值：</span>

                      <template v-if="controlSignal.valueType == 1">
                        <el-radio
                          v-model="controlSignal.value"
                          label="0"
                        >
                          {{ controlSignal.state0 || '0' }}
                        </el-radio>
                        <el-radio
                          v-model="controlSignal.value"
                          label="1"
                        >
                          {{ controlSignal.state1 || '1' }}
                        </el-radio>
                      </template>
                      <template v-else-if="controlSignal.valueType == 2">
                        <input
                          type="text"
                          v-model="controlSignal.value"
                        />
                        <span class="right_dw">{{ controlSignal.unit }}</span>
                        <i>*</i>
                      </template>
                      <template v-else-if="controlSignal.valueType == 3">
                        <input
                          type="text"
                          v-model="controlSignal.value"
                        />
                        <i>*</i>
                      </template>
                      <template v-else-if="controlSignal.valueType == 4">
                        <el-radio
                          v-model="controlSignal.value"
                          v-for="item in controlSignal.multiStateArray"
                          :key="item.key"
                          :label="item.value"
                          :value="item.key"
                          @change="logchange"
                        >
                        </el-radio>
                        <!-- <el-select
                          v-model="controlSignal.value"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in controlSignal.multiStateArray"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key"
                          ></el-option>
                        </el-select> -->
                        <!-- <i>*</i> -->
                      </template>
                      <!-- <template>
                         <el-radio
                         v-model="value"
                         v-for="item in arr"
                          :key="item.key"
                            :label="item.value"
                            :value="item.key"
                         
                        >
                         
                        </el-radio>
                      
                        <i>*</i>
                      </template> -->
                    </div>
                    <div class="tanchuang_center_cen_bottom">
                      <button
                        @click="control"
                        v-preventReClick="2000"
                      >确认</button>
                      <button @click="controlDialogVisible = false">取消</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cancel">
              <img
                class="img"
                src="../../assets/image/index/cancel.png"
                @click="controlDialogVisible = false"
                alt
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="tanchuang_ying"
        v-if="frameDialog.visible"
      >
        <div
          class="tanchuang"
          :style="styel"
           ref="tanchuang2"
          v-drag
        >
          <div
            class="tanchuang_bg"
            :style="center"
          >
            <div>
              <div class="tanchuang_top">
                <img
                  src="../../assets/image/index/partial_left.png"
                  alt
                />
                <span class="top_title">{{frameDialog.title}}</span>
                <img
                  src="../../assets/image/index/partial_right.png"
                  alt
                />
              </div>
              <div class="tanchuang_center">
                <iframe
                  :src="frameDialog.url"
                  style="width:95%;height:63vh;border:0;"
                  
                ></iframe>
              </div>
            </div>
          </div>
          <div class="cancel">
            <img
              class="img"
              src="../../assets/image/index/cancel.png"
              @click="frameDialog.visible = false"
              alt
            />
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import treeNode from './components/treenode/treenode.vue'
export default {
  components: {
    treeNode,
  },
  data() {
    return {
      styel: '',
      center: '',
      height:'',
      open: [], //显示隐藏数组
      model: {
        no: 1,
      },
      form: null,
      treeData: [],
      controlDialogVisible: false,
      controlSignal: null,
      frameDialog: {
        visible: false,
        title: '',
        url: null,
        width: '',
        height: '',
      },
      showCanvas: false,
      lebaNameNo: '', //第一级名字
      // lebaChNameNo: '',
      systemTreeList: [],
    }
  },
  activated: function () {},
  watch: {
    $route(to, from) {
      if (to.name == 'Monitor') {
        this.showTree()
      }
    },

    monitorNo(val) {
      if (val == -1) {
        this.showCanvas = false
      } else {
        this.showCanvas = true
        this.openGui(val)
      }
    },
  },
  directives: {
    trigger: {
      //自动触发事件
      inserted(el, binging) {
        el.click()
      },
    },
  },
  computed: {
    monitorNo() {
      return this.$store.state.monitorNo
    },
  },
  mounted() {
   
    setTimeout(async () => {
      // const resUserRole = await this.$api.MMS.User.GetUserRole({})
      // this.$store.commit('setUserGetUserRole', resUserRole.data) //权限
      $.scada.handler = window.ApiBaseURL + 'api/Scada/Handle'
      this.$store.commit('setMonitorNo', -1)
      this.showTree()
    }, 300)

    var that = this
    var isMouseDown = false
    var mouseOffset = null
    var form = null

    function getTime() {
      var date = new Date()
      return date.getTime()
    }
    //点击

    window.linkMonitor = function (monitorNo) {
      $.get(
        $.scada.handler,
        {
          _Type: 19,
          _T: getTime(),
          No: monitorNo,
        },
        function (data) {
          that.openGui(data.No)
        }
      )
    }

    window.openCamera = function (cameraNo) {
      $.get(
        $.scada.handler,
        {
          _Type: 13,
          _T: getTime(),
          No: cameraNo,
        },
        function (data) {
          if (data && data.WebCommand) {
            window.frames['hideframe'].location.href = data.WebCommand
          }
        }
      )
    }

    window.showDialog = function (url, title, width, height) {
      console.log(url, title, width, height)
      that.frameDialog = {
        visible: true,
        url: url,
        title: title,
        width: width,
        height: height,
      }
      if (width == 600 && height == 400) {
        console.log(width, height)

        that.styel = `width:40vw; height:61.85vh`
        //  let h=height-100
        that.center = ``
      } else {
         let ele = that.$refs.canvas
           let ww = ele.offsetWidth
          
      //  console.log(ww);
        let a = width/ww*50
      // console.log(a);
      
        that.styel = `width:` + width + `px;` + `height:` + height + 'px;'+`transform: translate(-`+a+`%, -50%)`
        let h = height - 100
        that.center = `width:98%;` + `height:` + h + `px;border:0;`
     
          
          
   
      }
    }
    console.log(this.frameDialog)

    $.scada.showControlDialog = async function (
      deviceId,
      signalId,
      controlValue
    ) {
      if (
        !that.$Tools.accessControl(
          that.$store.state.userGetUserRole.resList,
          'ControlMonitor'
        )
      ) {
        return that.$Tools.LayerMsgErr('没有控制权限,控制失败')
      } else {
        if (controlValue) {
          if (confirm('确定下发控制命令吗？')) {
            await that.Signal_GetModel(deviceId, signalId)
            that.controlSignal.value = controlValue
            that.control()
          }
        } else {
          that.showControlDialog(deviceId, signalId)
        }
      }
    }

    $('#canvas')
      .on('wheel', function (e) {
        if (that.form && that.form.getScale) {
          var left = that.form.left
          var top = that.form.top
          var width = that.form.width
          var height = that.form.height
          var scale = that.form.getScale()
          var newScale
          if (e.originalEvent.deltaY < 0)
            newScale =
              scale * (1 - Math.round(e.originalEvent.deltaY / 120) / 5)
          else
            newScale =
              scale / (1 + Math.round(e.originalEvent.deltaY / 120) / 5)
          newScale = Math.max(0.1, Math.min(10, newScale))
          var newLeft =
            ((left - mouseOffset.x) / scale) * newScale + mouseOffset.x
          var newTop =
            ((top - mouseOffset.y) / scale) * newScale + mouseOffset.y
          that.form.set('left', newLeft)
          that.form.set('top', newTop)
          that.form.setScale(newScale)
        }
      })
      .on('mousedown', function (e) {
        if (that.form && that.form.getScale) {
          isMouseDown = true
          var offset = $(this).offset()
          mouseOffset = {
            x: e.clientX - offset.left,
            y: e.clientY - offset.top,
          }
        }
      })
      .on('mousemove', function (e) {
        if (that.form && that.form.getScale) {
          var _mouseOffset = mouseOffset
          var offset = $(this).offset()
          mouseOffset = {
            x: e.clientX - offset.left,
            y: e.clientY - offset.top,
          }
          if (isMouseDown) {
            var left = that.form.left
            var top = that.form.top
            left += mouseOffset.x - _mouseOffset.x
            top += mouseOffset.y - _mouseOffset.y
            that.form.set('left', left)
            that.form.set('top', top)
          }
        }
      })
      .on('mouseup', function (e) {
        if (that.form && that.form.getScale) isMouseDown = false
      })
  },

  unmounted() {
    this.closeGui()
  },
  methods: {
    logchange(val) {
      // console.log(val);
    },
    getSystemValue(data) {
      this.lebaNameNo = data.no
      if (data.children.length > 0) {
        this.systemTreeList = data.children
      } else {
        this.systemTreeList = []
        this.closeGui()
      }
    },
    //显示隐藏
    ListShow(type, id) {
      if (type == -1) {
        this.open.push(id)
      } else {
        this.delArray(this.open, id)
      }
    },
    //去除数组中的元素
    delArray(array, ele) {
      let index = array.indexOf(ele)
      if (index > -1) {
        array.splice(index, 1)
      }
      return array
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
    regionalSelection(node) {
      //node就是子组件传过来的值
      if (node.no == '6') {
        var cans = document.querySelector('#canvas')
        cans.style.width = 83 + '%'
        cans.style.height = 80 + '%'
      } else {
        var cans = document.querySelector('#canvas')
        cans.style.width = ''
        cans.style.height = ''
      }

      // if (node.children.length > 0) {
      //   this.openGui(node.children[0].no)
      //   this.lebaChNameNo = node.children[0].no
      // }

      if (node.hasGui) {
        if (node) this.openGui(node.no)
      } else {
        this.closeGui()
      }
    },
    async showTree() {
      const res = await this.$api.MMS.Monitor.GetTree({ Type: 1 })
      if (res.ok) {
        this.treeData = []
        //this.treeData = this.getTreeData(res.data)

        let treeDataClone = []
        let threeCl = []
        treeDataClone = JSON.parse(JSON.stringify(res.data)) //深拷贝数据给弹窗
        for (let i in treeDataClone) {
          let targetModel =
            this.$store.state.userGetUserRole.resMonitors[0].children.find(
              (a) => a.model.no == treeDataClone[i].no
            )
          if (targetModel && targetModel.selected == true) {
            threeCl.push(treeDataClone[i])
            this.treeData = threeCl

            if (this.treeData.length > 0) {
              this.systemTreeList = this.treeData[0].children
              this.lebaNameNo = this.treeData[0].no
              this.recursice(this.treeData[0].children)
            }
          }
        }

        this.$nextTick(() => {
          var node = this.findFirstGuiNode(this.treeData)

          // if (node) this.$refs.monitorTree.setCurrentKey(node.no)
          if (node != null && !node.hidden) {
            this.openGui(node.no)
          } else {
            this.closeGui()
          }
        })
      }
    },
    recursice(data) {
      data.forEach((resin, i) => {
        if (i == 0 && resin) {
          if (resin.children.length == 0) {
            return (
              this.$store.commit('setNodeno', resin.no),
              this.$store.commit('setNodePno', resin.parentNo)
            )
          } else {
            return this.recursice(resin.children)
          }
        }
      })
    },

    findFirstGuiNode(nodes) {
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i]

        if (node.hasGui && !node.hidden) return node
        var subNode = this.findFirstGuiNode(node.children)
        if (subNode) return subNode
      }
      return null
    },
    async openGui(no) {
      const res = await this.$api.MMS.Monitor.GetModel({ No: no })
      if (res.ok) {
        // if (res.data.hidden) return

        this.model = res.data

        if (this.model) {
          this.closeGui()

          var options = JSON.parse(this.model.gui)
          switch (options.type) {
            case 'webBrowser':
              this.form = new $.scada.WebBrowser('canvas', options)
              break
            case 'canvas':
              this.form = new $.scada.StaticCanvas('canvas', options)
              var width = this.form.width
              var height = this.form.height
              var mainWidth = $('#canvas').width()
              var mainHeight = $('#canvas').height()
              var scale = Math.min(mainWidth / width, mainHeight / height)
              width *= scale
              height *= scale
              var left = (mainWidth - width) / 2
              var top = (mainHeight - height) / 2
              this.form.setScale(scale)
              this.form.set('left', left)
              this.form.set('top', top)
              this.form.start(3000)
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
      $('#canvas').empty()
    },
    async Signal_GetModel(deviceId, signalId) {
      const res = await this.$api.MMS.Signal.GetModel({
        deviceId: deviceId,
        id: signalId,
      })
      if (!res.ok) return

      this.controlSignal = res.data
      if (this.controlSignal.valueType == 4) {
        var multiState = this.controlSignal.multiState.split(';')
        var multiStateArray = []
        for (var i = 0; i < multiState.length; i++) {
          var kv = multiState[i].split(':')
          multiStateArray.push({
            key: kv[0],
            value: kv[1],
          })
        }
        this.controlSignal.multiStateArray = multiStateArray
        console.log(multiStateArray)
      }
      this.controlSignal.value = null
    },
    async showControlDialog(deviceId, signalId) {
      await this.Signal_GetModel(deviceId, signalId)
      this.controlDialogVisible = true
    },
    async control() {
      if (!this.controlSignal.value) {
        this.$Tools.LayerMsgInfo('值不能为空')
        return
      }
      console.log(this.controlSignal.value)
      if (this.controlSignal.valueType == 4) {
        for (
          let index = 0;
          index < this.controlSignal.multiStateArray.length;
          index++
        ) {
          const element = this.controlSignal.multiStateArray[index]
          if (this.controlSignal.value == element.value) {
            this.controlSignal.value = element.key
          }
        }
      }

      const res = await this.$api.MMS.Monitor.Control({
        deviceId: this.controlSignal.deviceId,
        signalId: this.controlSignal.id,
        value: this.controlSignal.value,
      })
      this.$Tools.LayerMsgInfo(res.message)
      this.controlSignal = null
      this.controlDialogVisible = false
    },
  },
}
</script>

<style lang="scss" scoped>
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

.container {
  position: relative;
  width: 100%;
  height: 100%;

  #canvas {
    position: absolute;
  }
  .canvas_w83 {
    right: 1%;
    top: 1%;
    width: 76%;
    height: 88%;
  }

  .canvas_w100 {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .container_panel {
    position: absolute;
    left: 15px;
    top: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    padding: 20px 0;
    width: 140px;
    h3 {
      // background-color: rgba(0, 0, 0, 0.5);
      height: 3vh;
      width: 100%;
      line-height: 3vh;
      font-size: 18px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: #00f0ff;
      opacity: 0.8;

      padding-right: 15px;
      cursor: pointer;
    }
    ul {
      .lenHide {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      li {
        // background-color: rgba(0, 0, 0, 0.5);
        height: 3vh;
        width: 100%;
        line-height: 3vh;
        font-size: 16px;
        color: #fff;
        opacity: 0.8;
        position: relative;

        cursor: pointer;

        @keyframes anima-pointer {
          0% {
            opacity: 0;
            right: 0;
          }
          100% {
            opacity: 1;
            right: -15px;
          }
        }
        img {
          animation: anima-pointer 1.5s infinite ease-in-out;
          position: absolute;
          top: 50%;
          right: -11px;
          transform: translate(0, -50%);
        }
      }
      .libg {
        background: linear-gradient(
          120deg,
          rgba(12, 236, 234, 0.2),
          rgba(12, 236, 234, 0.6)
        );
      }
      li:hover {
        background: linear-gradient(
          120deg,
          rgba(12, 236, 234, 0.2),
          rgba(12, 236, 234, 0.6)
        );
      }
    }
  }
  .container_panelchi {
    position: absolute;
    left: 170px;
    top: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    // overflow: scroll;
    padding: 20px 0;
    min-height: calc(40% - 5em);
    h3 {
      height: 3vh;
      width: 140px;
      // background-color: rgba(0, 0, 0, 0.5);
      line-height: 3vh;
      font-size: 18px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: #00f0ff;
      opacity: 0.8;

      padding-right: 15px;
      cursor: pointer;
    }

    ul {
      .lenHide {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      li {
        height: 3vh;
        width: 140px;
        line-height: 3vh;
        font-size: 16px;
        color: #fff;
        opacity: 0.8;
        cursor: pointer;
        position: relative;
        @keyframes anima-pointer {
          0% {
            opacity: 0;
            right: 0;
          }
          100% {
            opacity: 1;
            right: -15px;
          }
        }
        img {
          animation: anima-pointer 1.5s infinite ease-in-out;
          position: absolute;
          top: 50%;
          right: -11px;
          transform: translate(0, -50%);
        }
      }
      .libg {
        background: linear-gradient(
          120deg,
          rgba(12, 236, 234, 0.2),
          rgba(12, 236, 234, 0.6)
        );
      }
      li:hover {
        background: linear-gradient(
          120deg,
          rgba(12, 236, 234, 0.2),
          rgba(12, 236, 234, 0.6)
        );
      }
    }
  }

  // .tree {
  //   position: absolute;
  //   left: 40px;
  //   top: 20px;
  //   width: 250px;
  //   height: 80vh;
  //   background-color: rgba(0, 0, 0, 0.5);
  //   border-radius: 8px;

  //   .el-tree {
  //     overflow: auto;
  //     background-color: transparent;

  //     .el-tree-node__content {
  //       height: 40px;
  //       color: #f3f4f4;
  //     }

  //     .el-tree-node:focus {
  //       .el-tree-node__content {
  //         background-color: transparent !important;
  //       }
  //     }
  //     .el-tree-node__content:hover {
  //       color: #00f0ff !important;
  //       background-color: rgba(0, 0, 0, 0) !important;
  //     }
  //     .el-scrollbar__wrap {
  //       overflow: scroll;
  //       width: 120%;
  //       overflow-x: hidden;
  //     }
  //     .el-tree-node {
  //       padding-left: 14px !important;
  //     }
  //     .el-scrollbar__thumb {
  //       background-color: #009ef0 !important;
  //     }
  //   }
  // }

  .tanchuang_ying {
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
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
        background: url('../../assets/image/index/tanchuan.png') no-repeat;
        background-size: 100% 100%;

        .tanchuang_top {
          .top_title {
            font-size: 22px;
            font-family: MicrosoftYaHei;
            font-weight: bold;
            color: #00f0ff;
            line-height: 5vh;
            height: 5vh;
            padding: 0 0.2vw;
          }

          > img {
            vertical-align: baseline;
            height: 12px;
            width: 22px;
          }
        }

        .tanchuang_center {
          .tanchuang_center_cen {
            margin-top: 10vh;
            .radioTypeMargin {
              margin-right: 2.3vw;
            }
            .valueNone {
              width: 9vw;
              display: inline-flex;
              vertical-align: text-top !important;
            }
            .tanchuang_center_cen_top {
              margin-top: 1.5vh;
              opacity: 0.8;
              position: relative;

              input {
                width: 8.5vw;
                height: 3vh;
                background-color: rgba(0, 0, 0, 0);
                border: 1px solid #00f0ff;
                font-size: 14px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: #ffffff;
                padding-left: 15px;
                padding-right: 30px;
              }
              .right_dw {
                position: absolute;
                font-weight: 400;
                color: #ffffff;
                left: 59%;
                top: 50%;
                width: 1.6vw;

                font-size: 14px;
                opacity: 0.5;
                text-align: right;
              }

              span {
                font-size: 16px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                text-align: left;
                color: #00f0ff;
                width: 3.4vw;
                display: inline-block;
              }
              > i {
                font-size: 20px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: #00f0ff;
                vertical-align: bottom;
                margin-left: 5px;
              }
            }
            .tanchuang_center_cen_bottom {
              margin-top: 3.7vh;

              button {
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
                cursor: pointer;
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
          margin: 0 1vh;
        }
      }
    }
  }

  .monitor_left_top_bootom {
    position: absolute;
    top: 47px;
    overflow: hidden;
    left: 77px;
    display: flex;
    flex-wrap: wrap;
    // width: 18vw;
    display: flex;
    justify-content: space-evenly;

    .monitor_left_top_bootom_listLeft {
      width: 168px;
      height: 52.22vh;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 8px;
      overflow: scroll;
      margin-right: 10px;
      overflow: hidden;
      position: relative;
      z-index: 10;
      text-align: center;

      .bootom_listLeft_img {
        height: 48px;

        > .img {
          vertical-align: baseline;
          width: 14px;
          height: 13px;
        }

        > span {
          margin-left: 8px;
          width: 66px;
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 22px;
        }
      }
      .line_cent {
        width: 168px;
        display: flex;
        justify-content: center;
        .line {
          width: 157px;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.2);
        }
      }
      > .my_tree3d {
        overflow-y: scroll;
        width: 186px;
        height: 429px;
        margin-top: 14px;
        .my_tree_ul {
          .li {
            .placeholder {
              visibility: hidden;
            }
            .activeBg {
              background: rgba(0, 216, 255, 0.55);
              border: 1px solid transparent;
              margin-bottom: 4px;
            }
            .activeBgborder {
              border: 1px solid rgba(50, 197, 255, 0.6);
            }
            .fuqing {
              padding: 0px 10px;
              display: flex;
              align-items: center;

              width: 168px;
              border-radius: 2px;
              position: relative;
              .title {
                height: 28px;
                font-size: 16px;
                font-family: PingFang-SC-Medium, PingFang-SC;
                font-weight: 500;
                color: rgba(255, 255, 255, 0.7);
                line-height: 28px;
                letter-spacing: 2px;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
                word-break: break-all;
                cursor: pointer;
                text-align: left;
              }
              .quanx {
                width: 25px;
                display: inline-block;
                font-size: 10px;
                height: 28px;
                line-height: 28px;
                font-family: PingFang-SC-Medium, PingFang-SC;
                font-weight: 500;
                color: rgba(255, 255, 255, 0.7);
                position: absolute;
                top: 50%;
                right: 10px;
                transform: translateY(-50%);
                cursor: pointer;
              }
              .jiantou {
                cursor: pointer;
                margin-right: 16px;
                content: '';
                display: inline-block;
                width: 8px;
                height: 8px;
                margin-bottom: 2px;
                border-top: 2px solid rgba(255, 255, 255, 0.7);
                border-right: 2px solid rgba(255, 255, 255, 0.7);
                -webkit-transform: rotate(135deg);
                /*箭头方向可以自由切换角度*/
                transform: rotate(135deg);
              }
              .rotate45 {
                transform: rotate(45deg);
                margin-bottom: 0px;
              }
            }

            .erzi {
              margin-top: 5px;
              align-items: left;
              width: 168px;
              padding-bottom: 5px;
              > li {
                margin-top: 1px;
                // width: 168px;
                height: 28px;
                font-size: 14px;
                font-family: PingFang-SC-Medium, PingFang-SC;
                font-weight: 500;
                color: rgba(255, 255, 255, 0.7);
                line-height: 29px;
                text-align: left;
                cursor: pointer;
                position: relative;

                .lou {
                  padding-left: 38px;
                  display: block;
                  width: 100%;
                  height: 100%;
                  cursor: pointer;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                }
                .bg {
                  background: rgba(50, 197, 255, 0.2);
                }
                .right_gou {
                  position: absolute;
                  right: 0;
                  top: 50%;
                  transform: translateY(-50%);
                  display: inline-block;

                  .iconlujingbeifen11 {
                    margin-right: 12px;
                    width: 9px;
                    height: 6px;
                    font-size: 5px;
                  }
                }
              }
            }
          }
        }
      }
    }

    .monitor_left_top_bootom_right {
      width: 168px;
      height: 52.22vh;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 8px;

      position: relative;
      z-index: 10;
      text-align: center;

      .bootom_listright_img {
        height: 48px;
        > .img {
          vertical-align: baseline;
          width: 16px;
          height: 14px;
        }

        > span {
          margin-left: 8px;
          width: 66px;
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 22px;
        }
      }
      .line_cent {
        width: 168px;
        display: flex;
        justify-content: center;
        .line {
          width: 157px;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.2);
        }
      }
      .my_tree3d {
        box-sizing: border-box;
        overflow-y: scroll;
        width: 178px;
        height: 429px;
        margin-top: 14px;

        .my_tree_ul {
          .active_bg {
            background: rgba(50, 197, 255, 0.2);
          }
          .activeBg {
            background: rgba(0, 216, 255, 0.45);
            border: 1px solid transparent;
          }
          .activeBgborder {
            border: 1px solid rgba(50, 197, 255, 0.6);
          }
          .li {
            position: relative;

            // .fuqing {
            //   padding: 0px 10px;
            //   display: flex;
            //   align-items: center;
            //   min-width: 168px;
            //   border-radius: 2px;
            //   position: relative;

            //   a {
            //     color: rgba(255, 255, 255, 0.7);
            //   }

            //   .title {
            //     font-size: 16px;
            //     font-family: PingFang-SC-Medium, PingFang-SC;
            //     font-weight: 500;
            //     color: rgba(255, 255, 255, 0.7);
            //     line-height: 28px;
            //     letter-spacing: 2px;
            //     height: 28px;
            //   }
            //   .quanx {
            //     width: 25px;
            //     display: inline-block;
            //     font-size: 10px;
            //     height: 28px;
            //     line-height: 28px;
            //     font-family: PingFang-SC-Medium, PingFang-SC;
            //     font-weight: 500;
            //     color: rgba(255, 255, 255, 0.7);
            //     position: absolute;
            //     top: 50%;
            //     right: 10px;
            //     transform: translateY(-50%);
            //     cursor: pointer;
            //   }
            //   .jiantou {
            //     cursor: pointer;
            //     margin-right: 16px;
            //     content: '';
            //     display: inline-block;
            //     width: 8px;
            //     height: 8px;
            //     margin-bottom: 2px;
            //     border-top: 2px solid rgba(255, 255, 255, 0.7);
            //     border-right: 2px solid rgba(255, 255, 255, 0.7);
            //     -webkit-transform: rotate(135deg);
            //     /*箭头方向可以自由切换角度*/
            //     transform: rotate(135deg);
            //   }
            //   .rotate45 {
            //     transform: rotate(45deg);
            //     margin-bottom: 0px;
            //   }
            // }
          }

          .erzi {
            transition: text-indent 0.15s, height 0.3s;
            margin-top: 5px;
            align-items: left;
            width: 168px;
            padding-bottom: 5px;
            box-sizing: border-box;

            li {
              margin-top: 1px;
              min-width: 168px;
              // background: rgba(50, 197, 255, 0.2);
              font-size: 14px;
              font-family: PingFang-SC-Medium, PingFang-SC;
              font-weight: 500;
              color: rgba(255, 255, 255, 0.7);
              line-height: 29px;
              text-align: left;
              position: relative;
              border-radius: 2px;

              a {
                color: rgba(255, 255, 255, 0.7);
              }
              .padding20 {
                padding-left: 20px !important;
              }
              .lou {
                padding-left: 45px;
                display: block;
                // width: 120px;
                height: 100%;
                // overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                .jiantou {
                  cursor: pointer;
                  margin-bottom: 2px;
                  margin-right: 16px;
                  content: '';
                  display: inline-block;
                  width: 8px;
                  height: 8px;
                  border-top: 2px solid rgba(255, 255, 255, 0.7);
                  border-right: 2px solid rgba(255, 255, 255, 0.7);
                  -webkit-transform: rotate(135deg);
                  /*箭头方向可以自由切换角度*/
                  transform: rotate(135deg);
                }
                .rotate45 {
                  transform: rotate(45deg);
                  margin-bottom: 0px;
                }

                .quanx {
                  width: 25px;
                  display: inline-block;
                  font-size: 10px;
                  height: 28px;
                  line-height: 28px;
                  font-family: PingFang-SC-Medium, PingFang-SC;
                  font-weight: 500;
                  color: rgba(255, 255, 255, 0.7);
                  position: absolute;
                  top: 50%;
                  right: 10px;
                  transform: translateY(-50%);
                  cursor: pointer;
                }
              }

              .right_gou {
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                display: inline-block;

                .iconlujingbeifen11 {
                  margin-right: 12px;
                  width: 9px;
                  height: 6px;
                  font-size: 5px;
                }
              }
            }
          }
        }
      }
    }
    .monitor_left_top_bootom_bottom {
      width: 346px;
      height: 250px;
      position: relative;
      margin-top: 15px;
      z-index: 999;
    }
  }
}
</style>
