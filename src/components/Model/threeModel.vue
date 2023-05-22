<template>
  <div
    class="default_container container app"
    id="container"
  >
    <div
      class="monitor_left"
      v-if="$route.name == 'Monitor'"
    >
      <div class="monitor_left_top">
        <el-input
          v-model="searchName"
          class="input-with-select"
          clearable
          @keyup.enter="BimAttrWay().search()"
        >
          <i
            slot="prepend"
            class="el-icon-search"
          ></i>
          <el-button
            slot="append"
            @click="BimAttrWay().search()"
          >搜索</el-button>
        </el-input>
        <div
          @click="setFocus"
          class="list"
          v-if="ProityList.length > 0"
        >
          <ul>
            <li
              v-for="(item, index) in ProityList"
              :key="index"
              :class="proityIsActive == index ? 'proityIsActive' : ''"
              @click="EquipmentBackShow().proityClick(item, index)"
            >
              {{ item.name }}
            </li>
            <li
              v-show="moreProityList"
              class="el-icon-arrow-down last"
              @click="BimAttrWay().proityMoreClick()"
            ></li>
          </ul>
        </div>
      </div>
      <div
        @click="setFocus"
        class="monitor_left_top_bootom"
      >
        <div class="monitor_left_top_bootom_listLeft">
          <div class="bootom_listLeft_img">
            <img
              class="img"
              src="../../assets/image/index/lc.png"
              alt
            />
            <span>楼层选择</span>
          </div>
          <div class="line_cent">
            <div class="line"></div>
          </div>
          <div class="my_tree3d">
            <ul class="my_tree_ul">
              <div
                class="li"
                v-for="itemfloorTree in floorTreeList"
                :key="itemfloorTree.key"
              >
                <li>
                  <div :class="[
                      'fuqing',
                      itemfloorTree.ischeck ? 'activeBg' : 'activeBgborder'
                    ]">
                    <span
                      :class="[
                        'jiantou',
                        open.indexOf(itemfloorTree.key) === -1 ? '' : 'rotate45'
                      ]"
                      @click="
                        ListShow(
                          open.indexOf(itemfloorTree.key),
                          itemfloorTree.key
                        )
                      "
                    ></span>
                    <span class="title">{{ itemfloorTree.label }}</span>
                    <span
                      class="quanx"
                      @click="
                        getSystemValue(
                          itemfloorTree,
                          itemfloorTree,
                          floorTreeList,
                          false,
                          'selectFloor',
                          checkedFloors
                        )
                      "
                    >{{
                        itemfloorTree.ischeck == false ? '全选' : '不选'
                      }}</span>
                  </div>
                </li>

                <ul
                  class="erzi"
                  id="FloorChoice"
                  v-if="open.indexOf(itemfloorTree.key) === -1"
                >
                  <template v-for="itemTreeSubject in itemfloorTree.children">
                    <li
                      v-if="itemTreeSubject.children.length == 0"
                      :key="itemTreeSubject.key"
                      @click="
                        getSystemValue(
                          itemTreeSubject,
                          itemTreeSubject,
                          itemfloorTree,
                          false,
                          'singlePoint',
                          checkedFloors
                        )
                      "
                    >
                      <span :class="['lou', itemTreeSubject.ischeck ? 'bg' : '']">{{ itemTreeSubject.label }}</span>
                      <div class="right">
                        <span
                          v-show="itemTreeSubject.ischeck"
                          class="gou"
                        ></span>
                      </div>
                      <div class="right_gou">
                        <span
                          class="iconfont iconlujingbeifen11"
                          v-show="itemTreeSubject.ischeck"
                        ></span>
                      </div>
                    </li>
                    <div
                      v-else
                      :key="itemTreeSubject.key"
                    >
                      <li :class="[
                          itemTreeSubject.ischeck
                            ? 'activeBg'
                            : 'activeBgborder'
                        ]">
                        <div class="fuqing">
                          <div class="lou padding20">
                            <span
                              @click="
                                ListShow(
                                  open.indexOf(itemTreeSubject.key),
                                  itemTreeSubject.key
                                )
                              "
                              :class="[
                                'jiantou',
                                open.indexOf(itemTreeSubject.key) === -1
                                  ? ''
                                  : 'rotate45'
                              ]"
                            ></span>
                            <span>{{ itemTreeSubject.label }}</span>

                            <div class="right_gou">
                              <span
                                @click="
                                  getSystemValue(
                                    itemTreeSubject,
                                    itemTreeSubject,
                                    itemfloorTree,
                                    false,
                                    '',
                                    checkedFloors
                                  )
                                "
                                class="quanx"
                              >
                                {{
                                  itemTreeSubject.ischeck == false
                                    ? '全选'
                                    : '不选'
                                }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <ul
                        :class="['erzi']"
                        v-if="open.indexOf(itemTreeSubject.key) === -1"
                      >
                        <div
                          v-for="itemTreeSubjects in itemTreeSubject.children"
                          :key="itemTreeSubjects.key"
                        >
                          <li
                            class="singlePoint"
                            style="cursor: pointer"
                            @click="
                              getSystemValue(
                                itemTreeSubjects,
                                itemTreeSubjects,
                                itemTreeSubject,
                                itemfloorTree,
                                'singlePoint',
                                checkedFloors
                              )
                            "
                          >
                            <div :class="[
                                itemTreeSubjects.ischeck ? 'active_bg' : ''
                              ]">
                              <span
                                :title="itemTreeSubjects.key"
                                class="lou"
                              >{{
                                itemTreeSubjects.label
                              }}</span>

                              <div class="right_gou">
                                <span
                                  class="iconfont iconlujingbeifen11"
                                  v-show="itemTreeSubjects.ischeck"
                                ></span>
                              </div>
                            </div>
                          </li>
                        </div>
                      </ul>
                    </div>
                  </template>
                </ul>
              </div>
            </ul>
          </div>
        </div>

        <div class="monitor_left_top_bootom_right">
          <div class="bootom_listright_img">
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
                v-for="itemsystemTree in systemTreeList"
                :key="itemsystemTree.key"
              >
                <li class="li">
                  <div :class="[
                      'fuqing',
                      itemsystemTree.ischeck ? 'activeBg' : 'activeBgborder'
                    ]">
                    <span
                      @click="
                        ListShow(
                          open.indexOf(itemsystemTree.key),
                          itemsystemTree.key
                        )
                      "
                      :class="[
                        'jiantou',
                        open.indexOf(itemsystemTree.key) === -1
                          ? ''
                          : 'rotate45'
                      ]"
                    ></span>
                    <span class="title">{{ itemsystemTree.label }}</span>
                    <span
                      class="quanx"
                      @click="
                        getSystemValue(
                          itemsystemTree,
                          itemsystemTree,
                          systemTreeList,
                          false,
                          'selectSystemTree',
                          checkedSubjects
                        )
                      "
                    >
                      {{ itemsystemTree.ischeck == false ? '全选' : '不选' }}
                    </span>
                  </div>
                </li>
                <ul
                  :class="['erzi']"
                  v-if="open.indexOf(itemsystemTree.key) === -1"
                >
                  <template v-for="itemSystemSubject in itemsystemTree.children">
                    <li
                      v-if="itemSystemSubject.children.length == 0"
                      :key="itemSystemSubject.key"
                      @click="
                        getSystemValue(
                          itemSystemSubject,
                          itemSystemSubject,
                          itemsystemTree,
                          false,
                          'singlePoint',
                          checkedSubjects
                        )
                      "
                    >
                      <span :class="['lou', itemSystemSubject.ischeck ? 'bg' : '']">{{ itemSystemSubject.label }}</span>
                      <div class="right">
                        <span
                          v-show="itemSystemSubject.ischeck"
                          class="gou"
                        ></span>
                      </div>
                      <div class="right_gou">
                        <span
                          class="iconfont iconlujingbeifen11"
                          v-show="itemSystemSubject.ischeck"
                        ></span>
                      </div>
                    </li>
                    <div
                      v-else
                      :key="itemSystemSubject.key"
                    >
                      <li :class="[
                          itemSystemSubject.ischeck
                            ? 'activeBg'
                            : 'activeBgborder'
                        ]">
                        <div class="fuqing">
                          <div class="lou padding20">
                            <span
                              @click="
                                ListShow(
                                  open.indexOf(itemSystemSubject.key),
                                  itemSystemSubject.key
                                )
                              "
                              :class="[
                                'jiantou',
                                open.indexOf(itemSystemSubject.key) === -1
                                  ? ''
                                  : 'rotate45'
                              ]"
                            ></span>
                            <span>{{ itemSystemSubject.label }}</span>

                            <div class="right_gou">
                              <span
                                @click="
                                  getSystemValue(
                                    itemSystemSubject,
                                    itemSystemSubject,
                                    itemsystemTree,
                                    false,
                                    '',
                                    checkedSubjects
                                  )
                                "
                                class="quanx"
                              >
                                {{
                                  itemSystemSubject.ischeck == false
                                    ? '全选'
                                    : '不选'
                                }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <ul
                        :class="['erzi']"
                        v-if="open.indexOf(itemSystemSubject.key) === -1"
                      >
                        <div
                          v-for="itemSystemSubjects in itemSystemSubject.children"
                          :key="itemSystemSubjects.key"
                        >
                          <li
                            class="singlePoint"
                            style="cursor: pointer"
                            @click="
                              getSystemValue(
                                itemSystemSubjects,
                                itemSystemSubjects,
                                itemSystemSubject,
                                itemsystemTree,
                                'singlePoint',
                                checkedSubjects
                              )
                            "
                          >
                            <div :class="[
                                itemSystemSubjects.ischeck ? 'active_bg' : ''
                              ]">
                              <span
                                :title="itemSystemSubjects.label"
                                class="lou"
                              >{{ itemSystemSubjects.label }}</span>

                              <div class="right_gou">
                                <span
                                  class="iconfont iconlujingbeifen11"
                                  v-show="itemSystemSubjects.ischeck"
                                ></span>
                              </div>
                            </div>
                          </li>
                        </div>
                      </ul>
                    </div>
                  </template>
                </ul>
              </div>
            </ul>
          </div>
        </div>
        <div class="monitor_left_top_bootom_bottom">
          <threedmodelControl
            @operate="operate"
            @disClick="disClick"
            ref="threedModelControl"
          ></threedmodelControl>
        </div>
      </div>
    </div>
    <modalHome
      v-model="showMyModal"
      :title="myModalTitle"
      @cancel="BimAttrWay().closeDialog()"
    >
      <div class="modal-box">
        <iframe
          :src="myModalSrc"
          width="100%"
          height="100%"
          frameborder="0"
        ></iframe>
      </div>
    </modalHome>
    <div
      @click="setFocus"
      v-if="informationShow"
    >
      <div class="monitor_right">
        <div class="monitor_right_center">
          <div class="chakan_info">
            <div class="add_dianh_list_top">
              <ul>
                <li
                  :class="[addSheName == addshe.name ? 'Bborder' : '']"
                  v-for="addshe in addsheb"
                  :key="addshe.id"
                >
                  <span @click="addsheClick(addshe)">{{ addshe.name }}</span>
                </li>
              </ul>
            </div>

            <div v-if="addSheName == '基本信息'">
              <ul class="informationShow">
                <li
                  v-for="(item, i) in propertyList"
                  :key="i"
                  v-show="item.name != 'SmID'"
                >
                  <span>{{ item.name }}:</span>
                  <span
                    v-if="ModelType == 'superMap'"
                    :title="item.value"
                  >
                    {{ item.value }}
                  </span>
                  <span
                    v-if="
                      ModelType == 'modaiyun' || ModelType == 'modaiyun_offline'
                    "
                    :title="item.numValue || item.strValue"
                  >{{ item.numValue || item.strValue }}</span>
                </li>
              </ul>
            </div>
            <div v-else-if="addSheName == '设备信息'">
              <ul
                class="informationShow"
                v-if="EquipmentInfo.model"
              >
                <li>
                  <span>名称：</span>
                  <span>{{ EquipmentInfo.model.name }}</span>
                </li>
                <li>
                  <span>编码：</span>
                  <span>{{ EquipmentInfo.model.code }}</span>
                </li>
                <li>
                  <span>类别：</span>
                  <span>{{ EquipmentInfo.model.typeName }}</span>
                </li>
                <li>
                  <span>地点：</span>
                  <span>{{ EquipmentInfo.model.areaName }}</span>
                </li>
                <li>
                  <span>型号：</span>
                  <span>{{ EquipmentInfo.model.model }}</span>
                </li>
                <li>
                  <span>厂商：</span>
                  <span>{{ EquipmentInfo.model.manufactor }}</span>
                </li>
                <li>
                  <span>状态：</span>
                  <span>{{ EquipmentInfo.model.stateName }}</span>
                </li>
                <li>
                  <span>说明书：</span>
                  <span>
                    <a
                      href="javascript:;"
                      :title="EquipmentInfo.model.manualOriginalFileName"
                    >{{ EquipmentInfo.model.manualOriginalFileName }}</a>
                  </span>
                </li>
                <li>
                  <span>扩展属性：</span>
                </li>
                <li
                  v-for="item in EquipmentInfo.property"
                  :key="item.equipmentNo"
                >
                  <span>{{ item.propertyKey }}</span>
                  <span>{{ item.propertyValue }}</span>
                </li>
              </ul>
            </div>
            <div v-else-if="addSheName == '状态信息'">0000000000000  
              <ul class="informationShow">
                <template v-for="(item, index) in runParamList">
                  <li :key="index">
                    <span>{{ item.name }}:</span>
                    <span>
                      <a
                        :class="item.isAlarm ? 'redFont' : ''"
                        href="javascript:;"
                        :title="item.text"
                      >{{ item.text }}</a>
                    </span>
                  </li>
                </template>
              </ul>
            </div>
          </div>
        </div>
        <div class="cancel">
          <img
            @click="informationShow = false"
            :src="require('@/assets/image/index/cancel.png')"
            alt
          />
        </div>
      </div>
    </div>
    <div class="monitor_back">
      <iframe
        ref="iframeEl"
        :src="threeMapHtml"
        width="100%"
        height="100%"
        frameborder="0"
        scrolling="no"
      ></iframe>
    </div>
  </div>
</template>
<script>
import './ThreeFiles/js/array.extend'
export default {
  data() {
    return {
      ModelType: window.ModelType,
      // 灯光表单
      open: [], //显示隐藏数组
      allCheck: false,
      allActive: true,
      point1Flag: false,
      point2Flag: false,
      lightIndex: -1,
      origin: '*',
      iframeWin: '', // iframe 对象
      // 树形结构
      EquipmentInfo: {},
      sessionJiL: '0',
      proityIsActive: -1,
      moreProityList: true,
      searchName: '',
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      allFloors: [], //所有的楼层Keys
      allSubjects: [], //所有的系统Keys
      floorTreeList: [],
      systemTreeList: [],
      floorData: {},
      subjectData: [],
      checkedFloors: [],
      checkedSubjects: [],
      subjectTree: [],
      floorTree: [],
      propertyList: [],
      runParamList: [], // 运行参数、状态信息
      // 3d模型
      eventSmId: [], // 报警设备的SmId列表
      sm3dMeasure: true,
      informationShow: false,
      showMyModal: false,
      myModalTitle: '',
      myModalSrc: '',
      viewer: null,
      scene: null,
      canvas: null,
      camera: null,
      layer: null,
      layer2: null,
      features: [],
      flyManager: null,
      event_timestamp: null,
      event_list: [],
      last_event_no: 0,
      userNo: '',
      cameraPosition: {
        x: 120.801896,
        y: 30.720006 - 0.001,
        z: 190.740008,
        head: 358.093011,
        pitch: 67.914524 - 90,
        roll: 0.0,
      },
      //鼠标状态标志
      flags: {
        looking: false,
        moveForward: false, //向前
        moveBackward: false, //向后
        moveUp: false, //向上
        moveDown: false, //向下
        moveLeft: false, //向左
        moveRight: false, //向右
      },
      //移动速度
      moveBaseRate: 50.0,
      floorSelectAllData: null,
      boxEntity: null,
      Cesium: null,
      promise: null,
      handlerPoint: null,
      bimFilterArray: [],
      ProityList: [],
      ProityParam: {
        pageIndex: 1,
        pageSize: 30,
      },
      addsheb: [
        { name: '基本信息', id: '0' },
        { name: '设备信息', id: '1' },
        { name: '状态信息', id: '2' },
      ], //选择设备与手动输入
      addSheName: '基本信息',
    }
  },
  watch: {
    $route(to, from) {
      this.informationShow = false
    },
    searchName(val1) {
      if (val1 == '') {
        this.ProityList = []
      }
    },
    echoPoint(val1) {
      if (this.$store.state.center_p) {
        this.EquipmentBackShow().proityClick({
          center_p: val1,
          elementId: val1,
        })
      }
    },
    alarmCount(val1) {
      if (val1 && val1 != 0) {
        this.InitWay().EventGetLatestSmId()
      }
    },
    refreshBuild(val) {
      this.informationShow = false
      if (val) {
        this.operate(12)
      } else {
        this.operate(0)
      }
    },
    informationShow(val) {
      if (!val) {
        this.addSheName = '基本信息'
        this.sessionJiL = '0'
        window.runTimer && clearInterval(window.runTimer)
      }
    },
  },
  computed: {
    threeMapHtml() {
      return 'modaiyun.html'
    },
    echoPoint() {
      return this.$store.state.center_p
    },
    alarmCount() {
      return this.$store.state.alarmCount
    },
    refreshBuild() {
      return this.$store.state.refreshBuild
    },
  },
  methods: {
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
    getSystemValue(data, value, fad, fuq, type, selectCheboxArr) {
      value.ischeck = !value.ischeck
      // if (type == 'selectFloor' || type == 'selectSystemTree') {
      //   if (type == 'selectFloor' && value.ischeck)
      //     selectCheboxArr = JSON.parse(JSON.stringify(this.allFloors))
      //   else selectCheboxArr.splice(0, selectCheboxArr.length)

      //   if (type == 'selectSystemTree' && value.ischeck)
      //     selectCheboxArr = JSON.parse(JSON.stringify(this.allSubjects))
      //   else selectCheboxArr.splice(0, selectCheboxArr.length)
      // }
      if (type == 'selectFloor' || type == 'selectSystemTree') {
        if (type == 'selectFloor' && value.ischeck) {
          selectCheboxArr = JSON.parse(JSON.stringify(this.allFloors))
        } else if (type == 'selectSystemTree' && value.ischeck) {
          selectCheboxArr = JSON.parse(JSON.stringify(this.allSubjects))
        } else {
          selectCheboxArr.splice(0, selectCheboxArr.length)
        }
      }

      if (type == 'singlePoint') {
        if (selectCheboxArr.indexOf(data.key) === -1)
          selectCheboxArr.push(data.key)
        else selectCheboxArr.splice(selectCheboxArr.indexOf(data.key), 1)
      }

      if (data.children.length > 0 && value.ischeck) {
        data.children.map((el) => {
          el.ischeck = true

          if (type === 'selectSystemTree') {
            this.checkedSubjects = selectCheboxArr
          } else {
            if (type === 'selectFloor') this.checkedFloors = selectCheboxArr

            if (selectCheboxArr.indexOf(el.key) === -1)
              selectCheboxArr.push(el.key)
          }

          if (el.children.length > 0)
            el.children.map((el) => (el.ischeck = true))
        })
        if (type === 'selectSystemTree') this.checkedSubjects = selectCheboxArr
        else if (type == 'selectFloor') this.checkedFloors = selectCheboxArr

        if (fad.children)
          fad.ischeck = fad.children.every((itemfu) => itemfu.ischeck == true)
      } else {
        if (data.ischeck) {
          data.children.map((el) => {
            el.ischeck = true
            if (selectCheboxArr.indexOf(el.key) === -1)
              selectCheboxArr.push(el.key)
            else selectCheboxArr.splice(selectCheboxArr.indexOf(el.key), 1)

            if (el.children.length > 0)
              el.children.map((el) => (el.ischeck = false))
          })
        } else {
          data.children.map((el) => {
            el.ischeck = false
            if (
              selectCheboxArr.indexOf(el.key) === -1 &&
              type != 'selectSystemTree' &&
              type != 'selectFloor'
            )
              selectCheboxArr.push(el.key)
            else selectCheboxArr.splice(selectCheboxArr.indexOf(el.key), 1)

            if (el.children.length > 0)
              el.children.map((el) => (el.ischeck = false))
          })
          selectCheboxArr = [...new Set(selectCheboxArr)]
        }
        if (fad.children)
          fad.ischeck = fad.children.every((itemfu) => itemfu.ischeck == true)
        if (fuq)
          fuq.ischeck = fuq.children.every((itemfu) => itemfu.ischeck == true)
      }

      selectCheboxArr = [...new Set(selectCheboxArr)]

      this.BimModelWay().changeTreeEvent(this.checkedFloors)

      this.setFocus()
    },

    addsheClick(addShe) {
      //选择设备与手动输入
      this.addSheName = addShe.name
      this.sessionJiL = addShe.id
      this.BimAttrWay().informationClick()
    },
    // 设置获取点位信息状态
    setPointState(point) {
      let _this = this
      if (point == 1) {
        _this.point1Flag = true
        _this.point2Flag = false
      } else {
        _this.point2Flag = true
        _this.point1Flag = false
      }
    },
    // bim模型属性基本方法
    BimAttrWay() {
      let _this = this
      return {
        // 搜索属性
        search() {
          _this.ProityList = []
          _this.proityIsActive = -1
          _this.moreProityList = true
          _this.ProityParam.pageIndex = 1
          _this.BimAttrWay().PropertyList(_this.searchName)
          _this.setFocus()
        },
        // 获取搜索属性列表
        async PropertyList(name) {
          const res = await _this.$api.MMS.BimProperty.PropertyList({
            name: name,
            pageIndex: _this.ProityParam.pageIndex,
            pageSize: _this.ProityParam.pageSize,
          })
          if (res.ok) {
            _this.ProityList = _this.ProityList.concat(res.data.data)
            if (
              res.data.total <=
              _this.ProityParam.pageIndex * _this.ProityParam.pageSize
            ) {
              _this.moreProityList = false
            }
          }
        },
        // 查询获取更多
        proityMoreClick() {
          _this.ProityParam.pageIndex++
          _this.BimAttrWay().PropertyList(_this.searchName)
        },
        // Bim 属性 Dialog 框
        renderBimProperty(equipment) {
          if (equipment && equipment.cameraNo) {
            _this.$api.MMS.Camera.GetModel({
              no: equipment.cameraNo,
            }).then((res) => {
              if (res.ok) {
                window.open(res.data.webCommand, '_self')
              }
            })
          }
          if (equipment && !equipment.cameraNo && equipment.monitorNo) {
            _this
              .BimAttrWay()
              .showDialog(
                '运行监控',
                window.ApiBaseURL + 'viewer.html?No=' + equipment.monitorNo
              )
          }
        },
        // 获取状态信息
        runParams(equipment) {
          window.runTimer && clearInterval(window.runTimer)
          _this.runParamList = []
          if (equipment) {
            window.runTimer = setInterval(() => {
              if (_this.informationShow) {
                _this.$api.MMS.Equipment.GetModelRunParam({
                  no: equipment.no,
                }).then((res) => {
                  _this.runParamList = res.data.runParam
                })
              }
            }, 1500)
          }
        },
        // 获取Bim 属性信息 - 设备信息
        async informationClick() {
          if (_this.sessionJiL == '1') {
            const res = await _this.$api.MMS.Equipment.GetModelForSmId({
              elementId: _this.selectModel.elementId,
            })
            if (res.ok) {
              _this.EquipmentInfo = res.data
            }
          }
        },
        // 获取Bim 属性信息 - 基本信息
        async GetBimProperty(elementId) {
          _this.sessionJiL = '0'
          _this.selectModel = {}
          _this.selectModel.elementId = elementId === undefined ? '' : elementId

          _this.informationShow = true
          _this.BimAttrWay().runParams(data.equipment)
          _this.BimAttrWay().renderBimProperty(data.equipment)
        },
        showDialog(title, src) {
          _this.myModalTitle = title
          _this.myModalSrc = src
          _this.showMyModal = true
        },
        closeDialog() {
          _this.myModalTitle = ''
          _this.myModalSrc = ''
          _this.showMyModal = false
        },
      }
    },
    // 设备回显
    EquipmentBackShow() {
      let _this = this
      return {
        // 设备定位
        async proityClick(item, index) {
          if (item.elementId != '') {
            _this.postMessage('setPointEcho', {
              elementId: item.elementId,
            })
            _this.postMessage('GetBimProperty', {
              elementId: item.elementId,
            })
          }
        },
      }
    },
    // 给三维背景设置焦点、解决键盘移动事件
    setFocus() {
      this.$refs.iframeEl && this.$refs.iframeEl.contentWindow.focus()
    },

    // bim模型基本方法
    BimModelWay() {
      let _this = this

      return {
        // 光影效果
        light(flag) {
          _this.postMessage('light', {
            flag: flag,
          })
        },
        // 光源
        sunLight(flag) {
          _this.postMessage('sunLight', {
            flag: flag,
          })
        },
        // 模型单击高亮
        clickHighlight(flag) {
          _this.postMessage('clickHighlight', {
            flag: flag,
          })
        },
        // 巡更路线
        loadWatch(flag) {
          _this.postMessage('loadWatch', {
            flag: flag,
          })
        },
        // 楼层爆炸效果
        explode(flag) {
          _this.postMessage('explode', {
            flag: flag,
          })
        },
        // 楼层和专业变化
        changeTreeEvent(floors, opc) {
          _this.informationShow = false
          _this.postMessage('changeTreeEvent', {
            floors,
            subjects: _this.checkedSubjects,
          })
        },
        // 透视
        opcModel(opc) {
          _this.postMessage('opcModel', {
            opc: opc,
          })
        },
        // 改变模型颜色
        changeLayerColor(smid, color, removeAll) {
          _this.postMessage('changeLayerColor', {
            smid: smid,
            color: color,
            removeAll: removeAll,
          })
        },
      }
    },
    // 初始化运行监控bim树 模袋云离线
    async BimResource_Offline() {
      let _this = this
      this.$api.MMS.BimProperty.GetInitTree().then((res) => {
        if (res.ok) {
          _this.postMessage('getInitTree', { data: res.data, type: 2 })
        }
      })
    },
    // 初始化一些地图资源等设置
    InitWay() {
      let _this = this
      return {
        // 获取 报警smid
        async EventGetLatestSmId() {
          //捕获实时报警
          const res = await _this.$api.MMS.Event.GetLatestSmId({})
          if (res.ok) {
            _this.eventSmId = res.data
            // _this.InitWay().initEventEquipment()
          }
        },
        // 初始化报警设备 （设置闪烁报警）
        initEventEquipment() {
          _this.$nextTick(function () {
            _this.postMessage('initEventEquipment', {
              eventElementId: _this.eventSmId,
            })
          })
        },
      }
    },
    // 操作按钮
    operate(key, params) {
      let _this = this
      switch (key) {
        case 0: // 复位 还原
          _this.postMessage('originState')
          _this.$refs.threedModelControl &&
            _this.$refs.threedModelControl.setOrigin()
          _this.floorTreeList = JSON.parse(
            JSON.stringify(_this.cloneFloorTreeList)
          )
          _this.systemTreeList = JSON.parse(
            JSON.stringify(_this.cloneSystemTreeList)
          )

          _this.checkedFloors = JSON.parse(JSON.stringify(_this.checkedFloors))
          _this.checkedSubjects = JSON.parse(JSON.stringify(_this.allSubjects))

          break
        case 1: // 旋转
          _this.postMessage('toggleFlyCircle')
          break
        case 3: // 飞行
          _this.postMessage('toggleFly')
          break
        case 4:
          _this.BasicsHandle().showFire()
          break
        case 5: // 透视
          setTimeout(_this.BimModelWay().opcModel(params.flag))
          break
        case 6: // 爆炸
          if (_this.checkedFloors.length == _this.allFloors.length) {
            _this.BimModelWay().explode(params.flag)
          } else {
            _this.$refs.threedModelControl.setExplodeActive()
          }
          break
        case 7: // 巡更路线
          _this.BimModelWay().loadWatch(params.flag)
          break
        case 8: // 光源效果
          _this.BimModelWay().sunLight(params.flag)
          break
        case 10: // 模型单击高亮
          _this.BimModelWay().clickHighlight(params.flag)
          break
        case 11: // 更新光源参数
          _this.BimModelWay().updateSpotLight(params.key)
          break
        case 12: // 相机复位
          _this.postMessage('cameraLocation')
          break
      }
    },
    // 基础操作 飞行、相机、火灾
    BasicsHandle() {
      let _this = this
      return {
        showTipPic(point) {
          // _this.BasicsHandle().hideTipPic()

          var imageEntity = _this.viewer.entities.add({
            id: 'image',
            position: Cesium.Cartesian3.fromDegrees(
              point.x,
              point.y,
              point.z + 3
            ),
            billboard: {
              image: 'point_1.png',
              rotation: 0,
            },
          })
          imageEntity.addProperty('imageClock')
          // 用计时器控制图标的转动
          // var second = 0
          // imageEntity.imageClock = setInterval(function () {
          //   if (imageEntity != null) {
          //     second -= 0.1
          //     imageEntity.billboard.rotation = second
          //     if (second < 0) {
          //       second = 10
          //     }
          //   }
          // }, 20)
        },
        hideTipPic() {
          if (_this.tipPic) {
            _this.scene.primitives.remove(_this.tipPic)
            _this.tipPic = null
          }
        },
        showFire() {
          if (_this.fire) {
            _this.BasicsHandle().hideFire()
            return
          }
          var entity = _this.viewer.entities.add({
            position: new Cesium.Cartesian3(-2807665, 4709480, 3258478),
          })

          var particleSystem = _this.scene.primitives.add(
            new Cesium.ParticleSystem({
              id: 'fire1',
              image: require('./ThreeFiles/images/fire.png'),
              startColor: new Cesium.Color(1, 1, 1, 1),
              endColor: new Cesium.Color(0.5, 0, 0, 0),
              startScale: 3,
              endScale: 1.5,
              minimumParticleLife: 1.5,
              maximumParticleLife: 1.8,
              minimumSpeed: 7,
              maximumSpeed: 9,
              imageSize: new Cesium.Cartesian2(2, 2),
              emissionRate: 40,
              lifetime: 6.0,
              loop: true,
              emitter: new Cesium.ConeEmitter(Cesium.Math.toRadians(45.0)),
              sizeInMeters: true,
            })
          )

          var emitterModelMatrix = new Cesium.Matrix4()
          var translation = new Cesium.Cartesian3()
          var rotation = new Cesium.Quaternion()
          var hpr = new Cesium.HeadingPitchRoll()
          var trs = new Cesium.TranslationRotationScale()
          _this.scene.preUpdate.addEventListener(function (scene, time) {
            particleSystem.modelMatrix = entity.computeModelMatrix(
              time,
              new Cesium.Matrix4()
            )
            hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, hpr)
            trs.translation = Cesium.Cartesian3.fromElements(
              0,
              0,
              86,
              translation
            )
            trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation)
            particleSystem.emitterModelMatrix =
              Cesium.Matrix4.fromTranslationRotationScale(
                trs,
                emitterModelMatrix
              )
          })
          _this.fire = particleSystem
        },
        hideFire() {
          _this.BimAttrWay().closeDialog()
          _this.scene.primitives.remove(_this.fire)
          _this.fire = null
        },
        cameraLocation(cameraPosition) {
          _this.postMessage('cameraLocation', {
            cameraPosition: cameraPosition,
          })
        },
      }
    },
    // 开始测量
    disClick(key) {
      this.postMessage('disClick', {
        key: key,
      })
    },
    //显示警告信息
    showWarningMessage(message) {
      this.message.$Notice.warning({
        title: message,
      })
    },
    downMajorExcel(param) {
      this.$api.MMS.BimProperty.GetMajorExcel(param).then((res) => {
        var blob = new Blob([res])
        var a = document.createElement('a')
        a.download = '专业.xlsx'
        a.style.display = 'none'
        a.href = URL.createObjectURL(blob)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      })
    },
    // 接收Iframe 的消息
    handleMessage(event) {
      var _this = this
      var data = event.data
      var params = data.params
      switch (data.cmd) {
        case 'informationShow':
          _this.informationShow = data.params.value
          break
        case 'GetBimProperty':
          _this.propertyList = params.modelInfo
          _this.BimAttrWay().GetBimProperty(params.elementId)
          break
        case 'onloadEnd':
          _this.InitWay().EventGetLatestSmId()
          break
        case 'threeFocus':
          _this.setFocus()
          break
        case 'sendBimPosIdLay': // 获取设备的位置、
          _this.$store.commit('setCopyIdLName', {
            point: params.point,
            elementId: params.elementId,
          })
          break
        case 'initTree': // 初始化运行监控树
          // _this.initBimResource(
          //   params.sendFloorTreeList,
          //   params.sendSystemTreeList
          // )

          _this.floorTreeList = JSON.parse(JSON.stringify(params.floorTreeList))
          _this.systemTreeList = JSON.parse(
            JSON.stringify(params.systemTreeList)
          )

          _this.cloneFloorTreeList = JSON.parse(
            JSON.stringify(params.floorTreeList)
          )
          _this.cloneSystemTreeList = JSON.parse(
            JSON.stringify(params.systemTreeList)
          )
          _this.allFloors = JSON.parse(JSON.stringify(params.checkedFloors))
          _this.allSubjects = JSON.parse(JSON.stringify(params.checkedSubjects))
          _this.checkedFloors = JSON.parse(JSON.stringify(params.checkedFloors))
          _this.checkedSubjects = JSON.parse(
            JSON.stringify(params.checkedSubjects)
          )
          // 2021/8/24 默认所有的菜单都折叠起来
          _this.open = []
          _this.closeJianTou(params.floorTreeList)
          _this.closeJianTou(params.systemTreeList)
          break
        case 'GetBimProperty_offline':
          _this.propertyList = []
          _this.informationShow = true
          break
        case 'loadSuccess': // 加载完成html页面后
          _this.initModelLoadVoid() // 初始化模型以及运行监控
          break
        case 'GetMajorExcel':
          // _this.downMajorExcel(params.dic_systemZu)
          break
      }
    },
    closeJianTou(list) {
      let _this = this
      for (const key in list) {
        const element = list[key]
        _this.open.push(element.key)
        _this.closeJianTou(element.children)
      }
    },
    // 给Iframe 发送消息
    postMessage(cmd, params) {
      this.iframeWin.postMessage(
        {
          cmd: cmd,
          params: params,
        },
        this.origin
      )
    },

    initModelLoadVoid() {
      switch (window.ModelType) {
        case 'modaiyun':
          this.postMessage('getInitTree', { type: 1 })
          break
        case 'modaiyun_offline':
          this.BimResource_Offline()
          break
      }
    },
  },
  mounted() {
    this.iframeWin = this.$refs.iframeEl.contentWindow
    window.addEventListener('message', this.handleMessage)
    this.$store.commit('setCenterP', [])
    this.setFocus()
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background: url(./ThreeFiles/images/xingkongnew4.jpg) no-repeat;
  background-size: 100% 100%;
  .modal-box {
    margin: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
  }
  #cesiumContainer {
    margin: 0px;
    border-width: 0px;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .topOpera {
    position: absolute;
    left: 25%;
    top: 10px;
    width: 50%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    span {
      text-decoration: underline;
      margin: 0 15px;
    }
  }
  .monitor_left {
    text-align: left;
    user-select: none;
    margin-top: 2.78vh;
    margin-left: 46px;
    position: relative;

    .monitor_left_top {
      // background: url('../../assets/image/index/search.png');
      // background-size: 100% 100%;
      background-color: rgba(0, 0, 0, 0.5);
      width: 18vw;
      // width: 410px;
      height: 3.56vh;
      font-size: 16px;
      position: relative;
      z-index: 12;

      .list {
        position: absolute;
        top: 4.3vh;
        width: 18.15vw;
        height: 508px;
        background-color: #000;
        // z-index: 200;
        text-align: left;
        overflow: hidden;
        overflow-y: scroll;
        font-size: 14px;
        color: #fff;
        .proityIsActive {
          background: linear-gradient(
            120deg,
            rgba(12, 236, 234, 0.2),
            rgba(12, 236, 234, 0.6)
          );
        }
        .last {
          text-align: center;
          font-size: 16px;
          width: 100%;
        }
        ul {
          margin-top: 15px;
        }
        li {
          margin: 5px 0;
          padding: 0 10px;
          cursor: pointer;
          &:hover {
            background: linear-gradient(
              120deg,
              rgba(12, 236, 234, 0.2),
              rgba(12, 236, 234, 0.6)
            );
          }
        }
      }
    }

    .monitor_left_top_bootom {
      overflow: hidden;
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      width: 18vw;
      display: flex;
      justify-content: space-between;

      .monitor_left_top_bootom_listLeft {
        width: 168px;
        height: 52.22vh;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 8px;
        overflow: scroll;

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
          box-sizing: border-box;
          overflow-y: scroll;
          width: 186px;
          height: 429px;
          margin-top: 14px;
          .my_tree_ul {
            .active_bg {
              background: rgba(50, 197, 255, 0.2);
            }
            .activeBg {
              background: rgba(0, 216, 255, 0.55);
              border: 1px solid transparent;
            }
            .activeBgborder {
              border: 1px solid rgba(50, 197, 255, 0.6);
            }
            .li {
              position: relative;
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
                }
                .quanx {
                  min-width: 25px;
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
                box-sizing: border-box;
                li {
                  margin-top: 1px;
                  width: 168px;
                  font-size: 14px;
                  font-family: PingFang-SC-Medium, PingFang-SC;
                  font-weight: 500;
                  color: rgba(255, 255, 255, 0.7);
                  line-height: 29px;
                  text-align: left;
                  cursor: pointer;
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
                    overflow: hidden;
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
                      min-width: 25px;
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
          width: 186px;
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

              .fuqing {
                padding: 0px 10px;
                display: flex;
                align-items: center;
                width: 168px;
                border-radius: 2px;
                position: relative;

                a {
                  color: rgba(255, 255, 255, 0.7);
                }

                .title {
                  font-size: 16px;
                  font-family: PingFang-SC-Medium, PingFang-SC;
                  font-weight: 500;
                  color: rgba(255, 255, 255, 0.7);
                  line-height: 28px;
                  letter-spacing: 2px;
                  height: 28px;
                }
                .quanx {
                  min-width: 25px;
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
                width: 168px;
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
                  overflow: hidden;
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
                    min-width: 25px;
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
      .monitor_left_top_bootom_bottom {
        width: 346px;
        height: 250px;
        position: relative;
        margin-top: 15px;
        z-index: 999;
      }
    }
  }
  .monitor_right {
    position: absolute;
    z-index: 10;
    top: 2.78vh;
    left: 81.15vw;
    width: 16.46vw;
    height: 40.19vh;
    background-color: rgba(0, 0, 0, 0.5);
    background: url('../../assets/image/index/3d_information.png');
    background-size: 100% 100%;
    border-radius: 5px;
    text-align: left;

    // &:hover {
    //   overflow-y: scroll;
    // }

    .monitor_right_center {
      height: 40.19vh;
      // padding-left: 1.35vw;
      // padding-top: 1.35vh;
      // padding-bottom: 1.35vh;
      .add_dianh_list_top {
        ul {
          display: flex;
          li {
            margin: 0 20px;
            height: 40px;
            line-height: 40px;
            border-bottom: 2px solid transparent;
            span {
              font-size: 16px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: #00f0ff;
              line-height: 48px;
              opacity: 0.6;
              cursor: pointer;
            }
          }
          .Bborder {
            border-bottom: 2px solid #00f0ff;

            > span {
              opacity: 1;
            }
          }
        }
      }

      p {
        width: 88px;
        height: 19px;
        font-size: 18px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #00f0ff;
        line-height: 36px;
        margin-bottom: 1.94vh;
      }

      .informationShow {
        user-select: text;
        overflow: auto;
        height: 34.19vh;
        margin: 10px 20px;
        margin-right: 0px;
        padding-bottom: 15px;
        li {
          line-height: 3vh;
          width: 100%;
          height: 3vh;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .redFont {
            color: red;
          }
          span {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: #e8e9e9;
          }

          :nth-child(1) {
            margin-right: 10px;
          }
        }
      }
    }
  }
  .cancel {
    display: flex;
    justify-content: center;
    align-items: center;
    > img {
      cursor: pointer;

      margin-top: 4px;
      width: 32px;
    }
  }
  .monitor_back {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    // z-index: 1000000;
  }
}
</style>
