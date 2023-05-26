<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-02-18 16:42:24
 * @LastEditors: Please set LastEditors
 * @Description:模式配置
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->
<template>
  <div class="ControlMode">
    <div class="schematicRestraint public_body">
      <div :class="['public_page','schematicRestraint_center',$store.state.dtab?'index_off':'index_no']">
        <div class="list_margin">
          <div class="cneter_list">
            <div
              class="list_top"
              v-if="$Tools.accessControl( this.$store.state.userGetUserRole.resList,'EditControlMode')"
            >
              <span @click="add('add')">添加</span>
            </div>
            <div class="lists">
              <div class="kongz_list">
                <el-table
                  :data="ControlModeData"
                  style="width: 100%"
                  :row-class-name="tableRowClassName"
                >
                  <el-table-column
                    prop="name"
                    label="名称"
                  ></el-table-column>
                  <el-table-column
                    prop="time"
                    label="时间"
                  >
                    <template v-slot="scope">
                      <span>{{scope.row.beginTime+'至'+scope.row.endTime}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="编辑设备组"
                    v-if="$Tools.accessControl( this.$store.state.userGetUserRole.resList,'EditControlMode')"
                  >
                    <template v-slot="scope">
                      <span
                        class="editingEquipment_green"
                        @click="chankanShebei('EditingSb',scope.row)"
                      >编辑设备组</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="编辑"
                    width="60px"
                    v-if="$Tools.accessControl( this.$store.state.userGetUserRole.resList,'EditControlMode')"
                  >
                    <template v-slot="scope">
                      <span
                        class="editing_green"
                        @click="Editing(scope.row, 'Editing')"
                      >编辑</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="删除"
                    width="60px"
                  >
                    <template v-slot="scope">
                      <el-popconfirm
                        title="确定删除吗"
                        @onConfirm="ControlModeDelete(scope.row.no)"
                        @confirm="ControlModeDelete(scope.row.no)"
                      >
                        <span
                          class="del_red"
                          slot="reference"
                        >删除</span>
                      </el-popconfirm>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 模式控制弹窗 -->
      <div
        class="tanchuang_ying"
        v-if="addModeShow && $store.state.subItem == '模式配置'"
      >
        <div class="tanchuang_defulet">
          <div class="tanchuang">
            <div class="tanchuang_bg">
              <div>
                <div class="tanchuang_top">
                  <img
                    src="../../assets/image/index/partial_left.png"
                    alt
                  />
                  <span class="top_title">
                    {{
                    type == 'add'
                    ? '新增模式'
                    : type == 'Editing'
                    ? '编辑模式'
                    : type == 'EditingSb'
                    ? '编辑设备组'
                    : type == 'EditingSb_add'
                    ? '添加模式设备信号'
                    : '编辑模式设备信号'
                    }}
                  </span>

                  <img
                    src="../../assets/image/index/partial_right.png"
                    alt
                  />
                </div>
                <div class="tanchuang_center">
                  <div
                    :class="['tanchuang_center_cen','tanchuang_center_sb','formValidator']"
                    v-if="type == 'EditingSb_add' || type == 'EditingSb_bj'"
                  >
                    <el-form
                      :model="formValidator"
                      ref="formValidator"
                      label-width="100px"
                      class="demo-dynamic"
                      :rules="rules"
                    >
                      <div class="tanchuang_center_cen_top">
                        <el-form-item prop="subSystem">
                          <span>子系统：</span>
                          <el-select
                            v-model="formValidator.subSystem"
                            @change="equipmentChane(formValidator.subSystem)"
                            placeholder="请选择"
                            :disabled='type=="EditingSb_bj"?true:false'
                          >
                            <el-option
                              v-for="item in SubSysdata"
                              :key="item.name"
                              :label="item.name"
                              class="Restraint_add"
                              :value="item.no"
                            ></el-option>
                          </el-select>
                          <i>*</i>
                        </el-form-item>

                      </div>
                      <div class="tanchuang_center_cen_top">
                        <el-form-item prop="equipment">
                          <span>设备：</span>
                          <el-select
                            :disabled='type=="EditingSb_bj"?true:false'
                            v-model="formValidator.equipment"
                            placeholder="请选择"
                            @change="signalChane(formValidator.equipment)"
                          >
                            <el-option
                              v-for="item in DeviceListData"
                              :key="item.name"
                              :label="item.name"
                              class="Restraint_add"
                              :value="item.id"
                            ></el-option>
                          </el-select>
                          <i>*</i>
                        </el-form-item>
                      </div>

                      <div class="tanchuang_center_cen_top">
                        <el-form-item prop="signal">
                          <span>信号：</span>
                          <el-select
                            :disabled='type=="EditingSb_bj"?true:false'
                            v-model="formValidator.signal"
                            @change="sheDsignalChane(formValidator.signal)"
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="item in SignalData"
                              :key="item.name"
                              :label="item.name"
                              :value="item.name"
                            ></el-option>
                          </el-select>
                          <i>*</i>
                        </el-form-item>
                      </div>
                      <div
                        class="tanchuang_center_cen_top "
                        v-show="(formValidator.signal&&type=='EditingSb_add')"
                      >
                        <span style="display:inline-block;width: 100px; margin-left: -68px;">同类设备：</span>

                        <button
                          style="background:#30b8ff;border: 1px solid #00f0ff;color:#fff; width: 80px;cursor: pointer;height: 26px;"
                          @click="(type='duoxuanadd')"
                        >多选</button>
                      </div>
                      <div
                        class="tanchuang_center_cen_top "
                        v-show="(formValidator.signal&&type=='EditingSb_bj')"
                      >
                        <span style="display:inline-block;width: 100px; margin-left: -68px;">同类设备：</span>

                        <button
                          style="background:#30b8ff;border: 1px solid #00f0ff;color:#fff; width: 80px;cursor: pointer;height: 26px;"
                          @click="(type='duoxuanbj')"
                        >多选</button>
                      </div>
                      <div :class="['tanchuang_center_cen_top',valueType==1?'radioTypeMargin':'']">
                        <el-form-item prop="setValueType">
                          <span :style="valueType==1?'margin-right:40px':''">设定值：</span>
                          <template v-if="valueType==1">
                            <el-radio-group v-model="formValidator.setValueType">
                              <el-radio :label="signalValueType1.state0"></el-radio>
                              <el-radio :label="signalValueType1.state1"></el-radio>
                            </el-radio-group>
                          </template>
                          <template v-else-if="valueType==2">
                            <el-input
                              type="text"
                              v-model="formValidator.setValueType"
                            />
                            <span class="right_dw dd">{{unit}}</span>
                            <i>*</i>
                          </template>
                          <template v-else-if="valueType==3">
                            <input
                              type="text"
                              v-model="formValidator.setValueType"
                            />
                            <i>*</i>
                          </template>
                          <template v-else-if="valueType==4">
                            <el-select
                              v-model="formValidator.setValueType"
                              placeholder="请选择"
                            >
                              <el-option
                                v-for="item in valueType4data"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name"
                              ></el-option>
                            </el-select>
                            <i>*</i>
                          </template>
                          <template v-else>
                            <i
                              class="valueNone"
                              v-if="valueType<1"
                            >*</i>
                          </template>
                        </el-form-item>
                      </div>
                      <div class="tanchuang_center_cen_top">
                        <el-form-item prop="latency">
                          <span>延迟：</span>
                          <el-input
                            type="text"
                            v-model.number="formValidator.latency"
                            @input="yanchilog"
                          />
                          <i>*</i>
                        </el-form-item>
                        <span class="right_dw">分钟</span>
                      </div>
                    </el-form>
                    <div class="tanchuang_center_cen_bottom">
                      <button
                        @click="type == 'EditingSb_add'?ControlModeItemAdd('formValidator'):ControlModeItemUpdate('formValidator')"
                        v-preventReClick="2000"
                      >确认</button>
                      <button @click="addModeShow = false">取消</button>
                    </div>
                  </div>
                  <div
                    class="duoxuankuang"
                    v-if="((type == 'duoxuanadd' ))"
                  >
                    <div class="duoxuan">
                      <el-transfer
                        @change="logchange"
                        v-model="formValidator.duoxuan"
                        :props="{
                          key: 'id',
                          label: 'name'
                        }"
                        :data="options"
                        :titles="['待选项', '已勾选']"
                      ></el-transfer>
                    </div>

                    <div
                      slot="footer"
                      class="dialog-footer"
                    >
                      <el-button
                        type="primary"
                        @click="type = 'EditingSb_add'"
                        v-preventReClick="2000"
                      >确 定</el-button>
                      <el-button @click="type = 'EditingSb_add'">取 消</el-button>
                    </div>
                  </div>
                  <div
                    class="duoxuankuang"
                    v-if="(( type == 'duoxuanbj'))"
                  >
                    <div class="duoxuan">
                      <el-transfer
                        @change="logchange"
                        v-model="formValidator.duoxuan"
                        :props="{
                          key: 'id',
                          label: 'name'
                        }"
                        :data="options"
                        :titles="['待选项', '已勾选']"
                      ></el-transfer>
                    </div>

                    <div
                      slot="footer"
                      class="dialog-footer"
                    >
                      <el-button
                        type="primary"
                        @click="type = 'EditingSb_bj'"
                        v-preventReClick="2000"
                      >确 定</el-button>
                      <el-button @click="type = 'EditingSb_bj'">取 消</el-button>
                    </div>
                  </div>
                  <div
                    class="xingzengMode"
                    v-else-if="type == 'add' || type == 'Editing'"
                  >
                    <div class="xingzengMode_center">
                      <ul class="xingzengMode_list formValidator">
                        <el-form
                          :model="formValidatorMode"
                          ref="formValidatorMode"
                          class="demo-dynamic"
                          :rules="rulesMode"
                        >
                          <li>
                            <el-form-item prop="addName">
                              <span>名称：</span>
                              <el-input
                                type="text"
                                v-model="formValidatorMode.addName"
                              /> <i style="color:#00f0ff">*</i>
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
                          <li>
                            <el-button
                              type="success"
                              @click="type == 'add'?ControlModeAdd('formValidatorMode'):ControlUpdate('formValidatorMode')"
                              v-preventReClick="2000"
                              style="background:#007edd"
                            >确认</el-button>
                          </li>
                        </el-form>
                      </ul>
                    </div>
                  </div>
                  <div
                    class="EditingSbz"
                    v-else-if="(type == 'EditingSb')"
                  >
                    <div class="EditingSbz_add">
                      <button @click="Ed_sb('EditingSb_add')">添加</button>
                    </div>
                    <div class="EditingSbz_list">
                      <el-table
                        :data="ControlModeItemData"
                        style="width: 100%"
                        :row-class-name="tableRowClassName"
                      >
                        <el-table-column
                          show-overflow-tooltip
                          prop="subSystemName"
                          label="子系统"
                        ></el-table-column>
                        <el-table-column
                          show-overflow-tooltip
                          prop="deviceName"
                          label="设备"
                        ></el-table-column>

                        <el-table-column
                          show-overflow-tooltip
                          prop="signalName"
                          label="信号"
                        ></el-table-column>
                        <el-table-column
                          show-overflow-tooltip
                          prop="delay"
                          label="延迟"
                        >
                          <template v-slot="scope">
                            <span>{{scope.row.delay+'分钟'}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="编辑">
                          <template v-slot="scope">
                            <span
                              class="editing_yeelow"
                              @click="EditingShebei('EditingSb_bj', scope.row)"
                            >编辑</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="删除">
                          <template v-slot="scope">
                            <el-popconfirm
                              title="确定删除吗"
                              @onConfirm="ControlModeItemDelete(scope.row.no)"
                              @confirm="ControlModeItemDelete(scope.row.no)"
                            >
                              <span
                                class="del_red"
                                slot="reference"
                              >删除</span>
                            </el-popconfirm>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cancel">
              <img
                src="../../assets/image/index/withdrawal.png"
                v-show="((type == 'EditingSb_add' || type == 'EditingSb_bj'))"
                @click="previous()"
                alt
              />
              <img
                class="img"
                src="../../assets/image/index/cancel.png"
                @click="addModeShow = false"
                alt
              />
            </div>

          </div>
        </div>
      </div>

    </div>

  </div>

</template>
<script>
export default {
  data() {
    return {
      options: [],
      tijiao: [],
      dialogTableVisible: false,
      module1: { subSystemNo: '', signalId: '', deviceId: '', modeNo: '' },
      formValidator: {
        dianName: '',
        dianCode: '',
        subSystem: '',
        equipment: '',
        signal: '',
        setValueType: '',
        latency: 0,
        duoxuan: [],
      },
      rules: {
        dianName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        dianCode: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        subSystem: [
          { required: true, message: '请选择子系统', trigger: 'change' },
        ],
        equipment: [
          { required: true, message: '请选择设备', trigger: 'change' },
        ],
        signal: [{ required: true, message: '请选择信号', trigger: 'change' }],
        setValueType: [
          { required: true, message: '请选择设定值', trigger: 'change' },
        ],
        latency: [
          { required: true, message: '请输入延迟时间', trigger: 'change' },
          {
            type: 'number',
            message: '必须为数字值',
            trigger: 'change',
          },
          {
            validator: (rule, value, callback) => {
              if (value !== '') {
                if (/^\+?[0-9]\d*$/.test(value) === false) {
                  callback(new Error('请填写大于或等于0的数'))
                } else {
                  callback()
                }
              } else {
                callback()
              }
            },
            trigger: 'change',
          },
        ],
      },
      formValidatorMode: {
        addName: '',
        BeginTime: '',
        EndTime: '',
      },
      rulesMode: {
        addName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
      },
      selectMode: [],
      //模式控制列表项
      ControlModeItemData: [],
      addModeShow: false,
      inputName: '',
      type: '',

      shedingValue: 2,
      selectValue: '0',
      EditingShebeiItem: {},

      ControlModeData: [], //模式控制列表
      modeNo: 0,
      SubSysdata: [],
      DeviceListData: [], //设备
      SignalData: [], //信号
      valueType: 0, //1、按钮、2、输入框、3文字、4下拉框
      valueType1: '',
      signalValueType1: {}, //信号类型一
      valueType2: '',
      valueType3: '',
      valueType4: '',
      valueType4data: [],
      ControlModeItem_no: 0,
      ControlModeItem_modeNo: 0,
      ControlModeItem_device_id: 0,
      ControlModeItem_signal_id: 0,
      SumNo: '',
      //日历
    }
  },
  watch: {},

  mounted() {
    // this.$Tools.LayerMsgEr('添加成功')
    this.ControlModeGetList() //模式控制列表
    this.SubSysList() //获取子系统
  },
  computed: {
    retutnRiliDatalist: function () {
      return function () {
        let obj = ''
        for (var i = 0; i < this.riliDatalist.length; i++) {
          if (this.Day == this.riliDatalist[i]) {
            obj = this.riliDatalist[i]
          }
        }
        return obj.name
      }
    },
    returnType: function () {
      return function (type) {
        //计算属性传参
        //根据不同的类型返回不同的值
        switch (type) {
          case 1:
            return this.formValidator.setValueType
            break
          case 2:
            return this.formValidator.setValueType
            break
          case 3:
            return this.formValidator.setValueType
            break
          case 4:
            return this.formValidator.setValueType
            break
          default:
            return
        }
      }
    },
  },
  watch: {},
  methods: {
    yanchilog(e) {
      console.log(e)
      console.log(this.tijiao)
      for (let index = 0; index < this.tijiao.length; index++) {
        this.tijiao[index].Delay = e
      }
    },
    logchange(e) {
      console.log(e)

      // if (e.length) {
      if (this.SumNo) {
        this.tijiao = [
          {
            ModeNo: this.ControlModeItem_modeNo,
            DeviceId: this.ControlModeItem_device_id,
            SignalId: this.ControlModeItem_signal_id,
            Value: this.returnType(this.valueType),
            Delay: parseInt(this.formValidator.latency),
            no: this.SumNo,
          },
        ]
      } else {
        this.tijiao = [
          {
            ModeNo: this.ControlModeItem_modeNo,
            DeviceId: this.ControlModeItem_device_id,
            SignalId: this.ControlModeItem_signal_id,
            Value: this.returnType(this.valueType),
            Delay: parseInt(this.formValidator.latency),
          },
        ]
      }
      for (let index = 0; index < e.length; index++) {
        const element = e[index]
        for (let i = 0; i < this.options.length; i++) {
          const e = this.options[i]
          console.log(e)
          if (e.id == element) {
            this.tijiao.push({
              ModeNo: this.ControlModeItem_modeNo,
              DeviceId: element,
              SignalId: this.ControlModeItem_signal_id,
              Value: this.returnType(this.valueType),
              Delay: parseInt(this.formValidator.latency),
              no: e.no,
            })
          }
        }
      }
      // }
      console.log(this.tijiao)
    },

    async SubSysList() {
      //获取子系统列表
      const res = await this.$api.MMS.SubSystem.SubSysList({})
      if (res.ok) {
        this.SubSysdata = res.data
      }
    },
    async equipmentChane(name) {
      //获取设备
      // console.log(name)
      this.module1.subSystemNo = name
      let systemNo = name
      this.formValidator.equipment = ''
      this.formValidator.signal = ''
      this.valueType = 0
      const res = await this.$api.MMS.Device.GetList({ systemNo: systemNo })
      if (res.ok) {
        this.DeviceListData = res.data
      }
    },
    async signalChane(name) {
      console.log(name)
      //返回不同的类型
      this.module1.deviceId = name
      this.formValidator.signal = ''
      let subSystemNo = name
      this.valueType = 0
      this.ControlModeItem_device_id = subSystemNo
      const res = await this.$api.MMS.Signal.GetList({ code: subSystemNo })
      if (res.ok) {
        this.SignalData = res.data
      }
    },
    async sheDsignalChane(name) {
      // console.log(name)
      let subSystemNo = ''
      let unit = ''
      this.formValidator.setValueType = ''
      for (var j in this.SignalData) {
        if (this.SignalData[j].name === name) {
          // console.log(this.SignalData[j])
          this.module1.signalId = this.SignalData[j].id
          console.log(this.module1)
          let res = await this.$api.MMS.ControlModeItem.GetAddSameDeviceList(
            this.module1
          )
          console.log(res)
          if (res.ok) {
            if (res.data == []) {
              this.options = []
              this.formValidator.duoxuan = ''
            } else {
              this.options = res.data
            }
          }
          subSystemNo = this.SignalData[j].valueType
          this.ControlModeItem_signal_id = this.SignalData[j].id
          switch (subSystemNo) {
            case 1:
              this.signalValueType1 = {
                state0: this.SignalData[j].state0,
                state1: this.SignalData[j].state1,
              }
              break
            case 2:
              this.unit = this.SignalData[j].unit
              break
            case 3:
              break
            case 4:
              //如果是类型4的化处理一下数据格式
              let arr1 = this.SignalData[j].multiState
              this.valueType4data = valueType4data
              let arr2 = arr1.split(';')
              var valueType4data = []
              var arr3 = []
              let number1 = 0
              let number2 = 1
              for (var i = 0; i < arr2.length; i++) {
                arr3.push({ ...arr2[i].split(':') })
                arr3[i].id = arr3[i][number1]
                arr3[i].name = arr3[i][number2]
                delete arr3[i][number2]
                delete arr3[i][number1]
              }
              valueType4data = [...arr3]
              this.valueType4data = valueType4data
              break
            default:
          }
        }
      }
      this.valueType = subSystemNo //不同的类型做判断
    },
    async ControlModeItemUpdate(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //编辑
          // const res = await this.$api.MMS.ControlModeItem.Update({
          //   No: this.ControlModeItem_no, //添加不用传这个字段
          //   ModeNo: this.ControlModeItem_modeNo,
          //   DeviceId: this.ControlModeItem_device_id,
          //   SignalId: this.ControlModeItem_signal_id,
          //   Value: this.returnType(this.valueType),
          //   Delay: parseInt(this.formValidator.latency),
          // })
          // this.tijiao .push
          //  ( {
          //     No: this.ControlModeItem_no, //添加不用传这个字段
          //     ModeNo: this.ControlModeItem_modeNo,
          //     DeviceId: this.ControlModeItem_device_id,
          //     SignalId: this.ControlModeItem_signal_id,
          //     Value: this.returnType(this.valueType),
          //     Delay: parseInt(this.formValidator.latency),
          //   }),

          console.log(this.tijiao)
          const res = await this.$api.MMS.ControlModeItem.Update(this.tijiao)
          this.module1 = {
            subSystemNo: '',
            signalId: '',
            deviceId: '',
            modeNo: '',
          }
          if (res.ok) {
            this.type = 'EditingSb'
            this.ControlModeItemGetList(this.ControlModeItem_modeNo)
            this.$Tools.LayerMsgInfo('修改成功')
          } else {
            this.$Tools.LayerMsgErr(res.message)
          }
          this.ControlModeItemGetList(this.ControlModeItem_modeNo)
        } else {
          return false
        }
      })
    },
    async ControlModeItemAdd(formName) {
      for (let index = 0; index < this.tijiao.length; index++) {
        this.tijiao[index].value = this.formValidator.setValueType
        console.log(this.tijiao[index])
      }
      console.log(this.tijiao)
      //添加
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // const res = await this.$api.MMS.ControlModeItem.Add({
          //   // No: this.ControlModeItem_no, //添加不用传这个字段
          //   ModeNo: this.ControlModeItem_modeNo,
          //   DeviceId: this.ControlModeItem_device_id,
          //   SignalId: this.ControlModeItem_signal_id,
          //   Value: this.returnType(this.valueType),
          //   Delay: parseInt(this.formValidator.latency),
          // })
          if (this.SumNo) {
            this.tijiao = [
              {
                ModeNo: this.ControlModeItem_modeNo,
                DeviceId: this.ControlModeItem_device_id,
                SignalId: this.ControlModeItem_signal_id,
                Value: this.returnType(this.valueType),
                Delay: parseInt(this.formValidator.latency),
                no: this.SumNo,
              },
            ]
          } else {
            this.tijiao = [
              {
                ModeNo: this.ControlModeItem_modeNo,
                DeviceId: this.ControlModeItem_device_id,
                SignalId: this.ControlModeItem_signal_id,
                Value: this.returnType(this.valueType),
                Delay: parseInt(this.formValidator.latency),
              },
            ]
          }
          const res = await this.$api.MMS.ControlModeItem.Add(this.tijiao)
          ;(this.tijiao = []),
            (this.module1 = {
              subSystemNo: '',
              signalId: '',
              deviceId: '',
              modeNo: '',
            })
          if (res.ok) {
            this.type = 'EditingSb'
            this.ControlModeItemGetList(this.ControlModeItem_modeNo)
            this.$Tools.LayerMsgInfo('添加成功')
          } else {
            this.$Tools.LayerMsgErr(res.message)
          }
          this.ControlModeItemGetList(this.ControlModeItem_modeNo)
        } else {
          return false
        }
      })
    },
    async ControlModeItemGetList(modeNo) {
      //获取模式控制项列表
      const res = await this.$api.MMS.ControlModeItem.GetList({
        modeNo,
      })
      if (res.ok) {
        this.ControlModeItemData = res.data
      }
    },
    async ControlUpdate(formName) {
      //编辑
      this.$refs[formName].validate(async (valid) => {
        if (
          valid &&
          this.formValidatorMode.EndTime &&
          this.formValidatorMode.BeginTime
        ) {
          const res = await this.$api.MMS.ControlMode.Update({
            BeginTime: this.formValidatorMode.BeginTime,
            EndTime: this.formValidatorMode.EndTime,
            Name: this.formValidatorMode.addName,
            No: this.ControlModeItem_no,
          })
          if (res.ok) {
            this.addModeShow = false
            this.ControlModeGetList()
            this.$Tools.LayerMsgInfo('编辑成功')
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
    async ControlModeAdd(formName) {
      //添加

      this.$refs[formName].validate(async (valid) => {
        if (
          valid &&
          this.formValidatorMode.EndTime &&
          this.formValidatorMode.BeginTime
        ) {
          const res = await this.$api.MMS.ControlMode.Add({
            Name: this.formValidatorMode.addName,
            BeginTime: this.formValidatorMode.BeginTime,
            EndTime: this.formValidatorMode.EndTime,
          })
          if (res.ok) {
            this.addModeShow = false
            this.ControlModeGetList()
            this.$Tools.LayerMsgInfo('添加成功')
          }
          this.ControlModeGetList()
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
      this.ControlModeGetList()
    },
    async ControlModeItemDelete(no) {
      //删除设备组项
      const res = await this.$api.MMS.ControlModeItem.Delete({
        no,
      })
      if (res.ok) {
        this.ControlModeItemGetList(this.ControlModeItem_modeNo)
        this.$Tools.LayerMsgInfo('删除成功')
      }
    },
    ControlModeGetList() {
      //获取模式控制列表
      this.$api.MMS.ControlMode.GetList({}).then((res) => {
        if (res.ok) {
          this.ControlModeData = res.data
        }
      })
    },
    previous() {
      //返回上一步按钮
      this.addModeShow = true
      this.type = 'EditingSb'
    },
    Ed_sb(type) {
      //先清空值
      this.valueType = 0 //添加时类型为0
      this.formValidator.equipment = ''
      this.formValidator.latency = ''
      this.formValidator.signal = ''
      this.formValidator.subSystem = ''
      this.formValidator.setValueType = ''
      //添加设备组
      this.type = type
      this.addModeShow = true
    },
    async EditingShebei(type, item) {
      console.log(item)
      this.duoxuan = []
      this.type = type
      this.module1.modeNo = item.modeNo
      this.module1.signalId = item.signalId
      this.module1.subSystemNo = item.subSystemNo
      this.module1.deviceId = item.deviceId
      this.module1.no = item.no
      this.module1.value = item.value
      this.SumNo = item.no
      this.tijiao.push(this.module1)
      console.log(item)
      console.log(this.tijiao)
      console.log(this.module1)
      let res1 = await this.$api.MMS.ControlModeItem.GetUpdateSameDeviceList({
        controlModeItemNo: item.no,
      })
      console.log(res1)

      if (res1.ok) {
        if (res1.data == []) {
          this.options = []
          this.formValidator.duoxuan = ''
        } else {
          // console.log(this.formValidator.duoxuan);
          for (let index = 0; index < res1.data.length; index++) {
            res1.data[index].name = res1.data[index].deviceName
            res1.data[index].id = res1.data[index].deviceId
          }
          this.options = res1.data
        }
      }
      //获取设备
      const Deviceres = await this.$api.MMS.Device.GetList({
        systemNo: item.no,
      })
      if (Deviceres.ok) {
        this.DeviceListData = Deviceres.data
      }
      //编辑设备组
      //获取信号
      const res = await this.$api.MMS.Signal.GetList({ code: item.deviceId })
      if (res.ok) {
        this.SignalData = res.data
      }
      let subSystemNo = ''
      for (var j in this.SignalData) {
        if (this.SignalData[j].name == item.signalName) {
          subSystemNo = this.SignalData[j].valueType
          switch (subSystemNo) {
            case 1:
              this.signalValueType1 = {
                state0: this.SignalData[j].state0,
                state1: this.SignalData[j].state1,
              }
              this.formValidator.setValueType = item.value
              break
            case 2:
              this.formValidator.setValueType = item.value
              this.unit = this.SignalData[j].unit
              break
            case 3:
              this.formValidator.setValueType = item.value
              break
            case 4:
              //如果是类型4的化处理一下数据格式
              let arr1 = this.SignalData[j].multiState
              this.valueType4data = valueType4data
              let arr2 = arr1.split(';')
              var valueType4data = []
              var arr3 = []
              let number1 = 0
              let number2 = 1
              for (var i = 0; i < arr2.length; i++) {
                arr3.push({ ...arr2[i].split(':') })
                arr3[i].id = arr3[i][number1]
                arr3[i].name = arr3[i][number2]
                delete arr3[i][number2]
                delete arr3[i][number1]
              }
              valueType4data = [...arr3]
              this.valueType4data = valueType4data
              this.formValidator.setValueType = item.value
              break
            default:
          }
        }
      }
      this.valueType = subSystemNo //不同的类型做判断
      this.type = type
      this.addModeShow = true
      this.EditingShebeiItem = item
      this.ControlModeItem_no = item.no //
      this.ControlModeItem_modeNo = item.modeNo
      this.ControlModeItem_device_id = item.deviceId
      this.ControlModeItem_signal_id = item.signalId
      this.formValidator.subSystem = item.subSystemName //子系统名字
      this.formValidator.equipment = item.deviceName
      this.formValidator.latency = item.delay
      this.formValidator.signal = item.signalName
    },
    chankanShebei(type, item) {
      this.module1.modeNo = item.no
      this.type = type
      this.addModeShow = true
      this.ControlModeItem_modeNo = item.no
      this.ControlModeItemGetList(item.no)
    },
    add(type) {
      this.formValidatorMode.addName = ''
      this.formValidatorMode.BeginTime = ''
      this.formValidatorMode.BeginTime = ''
      //添加
      this.type = type
      this.addModeShow = true
    },
    async ControlModeDelete(no) {
      const res = await this.$api.MMS.ControlMode.Delete({ no })
      if (res.ok) {
        this.ControlModeGetList()
        this.$Tools.LayerMsgInfo('删除成功')
      }
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

    Editing(item, type) {
      //编辑
      this.type = type
      this.addModeShow = true
      this.formValidatorMode.addName = item.name
      this.formValidatorMode.BeginTime = item.beginTime
      this.formValidatorMode.EndTime = item.endTime
      this.nodeNo = item.no
      this.ControlModeItem_no = item.no
    },
  },
}
</script>
<style>
.duoxuankuang {
  /* border: 1px solid red; */
  /* text-align: center; */
  text-align: left;
  position: relative;
  top: 100px;
  right: 20px;
}
.dialog-footer {
  position: relative;
  left: 350px;
  top: 20px;
}
.el-transfer-panel {
  color: #fff !important;
  background: transparent !important;
}
.el-transfer-panel__header,
.el-checkbox__label {
  color: #fff !important;
  background: transparent !important;
}
.dialogForm .el-upload__tip,
.dialogForm .el-upload-list__item-name,
.dialogForm .el-icon-document,
.dialogForm .el-icon-close {
  color: #09f;
}
.dialogForm .el-icon-close-tip {
  display: none;
  opacity: 0;
}
.dialogForm .el-upload-list .el-upload-list__item {
  color: #09f;
}
.dialogForm .el-upload-list .el-upload-list__item:hover {
  background: none;
}
.dialogForm .el-dialog {
  background-color: #141d4d !important;
  color: #09f;
  font-family: Arial, 'Microsoft Yahei';
  font-size: 14px;
  min-width: 700px;
}
.dialogForm .el-dialog__title {
  color: #09f;
  font-family: Arial, 'Microsoft Yahei';
}
.dialogForm .label {
  color: #09f;
  font-family: Arial, 'Microsoft Yahei';
  font-size: 14px;
  display: inline-block;
  width: 201px;
}
.dialogForm .el-form-item__label {
  color: #09f;
  font-family: Arial, 'Microsoft Yahei';
  font-size: 14px;
}
.dialogForm .el-date-editor,
.dialogForm .el-input,
.dialogForm .el-select,
.dialogForm .el-input-number,
.dialogForm .el-rate,
.dialogForm .el-radio-group {
  width: 201px !important;
}
.dialogForm .inputAppend .el-input__inner {
  cursor: pointer;
}
.dialogForm .inputAppend .el-input-group__append {
  background-color: #1890ff;
  color: #fff;
  border: 0;
  cursor: pointer;
}
.dialogForm input {
  border: 1px solid #1890ff;
  opacity: 1;
  border-radius: 2px;
  background-color: transparent;
  padding-left: 12px;
  color: #09f;
  text-align: left !important;
}
</style>
<style scoped>
.position {
  width: 243px;
}
</style>
<style lang="scss" scoped>
@import './styles/ControlMode.scss';
.duoxuan {
  position: relative;
  left: 20%;
  bottom: 63.5%;
}
</style>
<style  lang="scss"  scoped>
.tanchuang_ying {
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
      transform: translateZ(0);
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
            transform: translateZ(0);
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 0px;

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
              top: 20%;
              width: 1.6vw;

              font-size: 14px;
              opacity: 0.5;
              text-align: right;
            }
            .dd {
              left: 75%;
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
            i {
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
        .xingzengMode {
          margin: 0 3vw;

          .xingzengMode_center {
            .xingzengMode_list {
              margin-top: 8vh;
              .time_input {
                display: flex;
                width: 500px;
                color: #fff;
                position: relative;
                left: 50px;
                > i {
                  margin: 0 7px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                span {
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
                  // padding-left: 10px;
                  // padding-right: 10px;
                }
              }
            }
          }
        }
        .EditingSbz {
          color: #fff;
          margin: 0 3vw;
          .EditingSbz_add {
            text-align: right;

            button {
              width: 2.7vw;
              height: 2.5vh;
              background: #007fdd;
              border-radius: 2px;
              color: #fff;
              opacity: 0.8;
              cursor: pointer;
            }
          }
          .EditingSbz_list {
            height: 44vh;
            overflow-y: scroll;
            .editing_yeelow {
              color: rgba(255, 247, 0, 1);
              cursor: pointer;
            }
            .del_red {
              color: rgba(255, 24, 24, 1);
              cursor: pointer;
            }
          }
        }
      }
    }
    .cancel {
      img {
        cursor: pointer;
        margin: 0 1vh;
        // height: 44px;
        // width: 44px;
      }
    }
  }
}
</style>

