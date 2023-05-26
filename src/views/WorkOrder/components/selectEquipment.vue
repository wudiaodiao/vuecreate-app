<!--
 * @Author: your name
 * @Date: 2020-11-26 18:44:51
 * @LastEditTime: 2022-02-18 16:45:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ibms\src\views\Part\components\Part.vue
-->
<template>
  <div class="Equipment">
    <div class="Equipment_cneter">
      <div class="EquipmentDanan">
        <div class="content">
          <div class="selectEquipment_top">
            <ul>
              <li>
                <span>名称：</span>
                <input
                  type="text"
                  class="Equipment_input"
                  v-model="inputEquipment"
                />
              </li>
              <li>
                <span>设备类别：</span>
                <el-cascader
                  :show-all-levels="false"
                  v-model="inputEquipmentType"
                  :options="EquipmentTypeData"
                  :props="{ expandTrigger: 'hover', value : 'model',checkStrictly:true}"
                  @change="EquipmentTypeChane(inputEquipmentType)"
                  :placeholder="inputEquipmentType"
                  clearable
                >
                  <template v-slot="{ node, data }">
                    <span>{{ data.model.name }}</span>
                    <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                  </template>
                </el-cascader>
              </li>
              <li>
                <span>地点：</span>
                <!-- <el-select
                  v-model="loufloor"
                  class="withd_"
                  placeholder="所有"
                  @change="loufloorChane(loufloor)"
                >
                  <el-option
                    v-for="(item,i ) in floorlist"
                    :key="i"
                    :label="item.model.name"
                    :value="item.model.name"
                  ></el-option>
                </el-select> -->
                         <el-cascader
                                  :show-all-levels="false"
                                  v-model="floor"
                                
                                  :options="floorlist"
                                  :props="{
                                    expandTrigger: 'hover',
                                    value: 'model',
                                    checkStrictly: true
                                  }"
                                  @change="floorlistChane(floor)"
                                  :placeholder="floor"
                                  clearable
                                >
                                  <template v-slot="{ node, data }">
                                    <span v-if="data.children.length == 0">({{ data.model.code }})</span>
                                    <span disabled>{{ data.model.name }}</span>
                                    <!-- <span v-if="data.children.length==0">({{ data.model.id}})</span> -->

                                    <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                                  </template>
                                </el-cascader>
              </li>
              <!-- <li v-show="floorchildre.length>0">
                <span>楼层：</span>
                <el-select
                  class="withd_"
                  v-model="floor"
                  placeholder="所有"
                  @change="floorchildreChane(floor)"
                >
                  <el-option
                    v-for="(item,i ) in floorchildre"
                    :key="i"
                    :label="item.model.name"
                    :value="item.model.name"
                  ></el-option>
                </el-select>
              </li> -->
              <li>
                <div class="Equipment_chaxun">
                  <button @click="EquipmentGetList()">查询</button>
                </div>
              </li> 
               <li>
                  <div class="Equipment_chongzhi">
                    <button @click="pageSize=14, //一页多少条
                      pageIndex=1, //实时页
                      name='',
                      EquipmentIdType ='',
                      floorId ='',
                      editEquipmentNo ='',
                      floor='<--无-->'
                      EquipmentGetList()
                      ">重置</button>
                  </div>
                </li>
            </ul>
          </div>
          <div class="Equipment_center">
            <el-table
              :data="EquipmentData.list"
              style="width: 100%"
              :row-class-name="tableRowClassName"
              @selection-change="handleSelectionChange"
              tooltip-effect="dark"
              show-overflow-tooltip
            >
              <el-table-column
                type="selection"
                width="55"
                v-if="WorkOrderTcType=='selectEquipmentEd'"
                :key="Math.random()"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="名称"
              >
                <template v-slot="scope">
                  <span>
                    <a
                      href="#"
                      :title="scope.row.name"
                    >{{scope.row.name}}</a>
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="code"
                label="编码"
              ></el-table-column>
              <el-table-column
                prop="typeName"
                label="类别"
              ></el-table-column>
              <el-table-column
                prop="areaName"
                label="地点"
                show-overflow-tooltip
              ></el-table-column>
              <!-- <el-table-column
                prop="model"
                label="型号"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span>
                    <a
                      href="#"
                      :title="scope.row.model"
                    >{{scope.row.model}}</a>
                  </span>
                </template>
              </el-table-column> -->
              <!-- <el-table-column
                prop="manufactor"
                label="厂商"
                width="70px"
              ></el-table-column> -->
              <el-table-column
                prop="state"
                label="状态"
                width="70px"
              >
                <template v-slot="scope">
                  <span> {{(scope.row.state==1?'正常':'维保中')}}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="选择"
                width="50px"
                v-if="WorkOrderTcType!='selectEquipmentEd'"
                :key="Math.random()"
              >
                <template v-slot="scope">
                  <span
                    class="editing_green"
                    @click="selectTc('add',scope.row)"
                  >选择</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="Equipment_footer">
            <div class="fenye">
              <el-pagination
                hide-on-single-page
                @current-change="Current"
                :page-size="13"
                :pager-count="11"
                layout="prev, pager, next"
                :total="EquipmentData.total"
              ></el-pagination>
            </div>
          </div>
          <div
            class="tanchuang_center_cen_bottom"
            v-show="WorkOrderTcType=='selectEquipmentEd'"
          >
            <button
              @click="MaintainPlanAddEquipment()"
              v-preventReClick="2000"
            >确认</button>
            <button @click="selectTc('editEquipment',editEquipmentNo)">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    WorkOrderTcType: '',
    editEquipmentNo: '',
    floor:'',
    floorId:'',
  },
  data() {
    return {
      inputEquipment: '',
      inputEquipmentType: '所有',
      EquipmentTypeData: [],
      tcEquipmentTypeData: [],
      EquipmentIdType: '', //设备类型id
      floorlist: [], //楼层
      tcfloorlist: [],
      floorchildre: [],
      loufloor: '', //楼
      floor: '所有',
      floorId: '',

      EquipmentData: {},
      EquipmentTcShow: false,
      EquipmentTcType: '',
      EquipmentName: '', //设备名称
      EquipmentCode: '',
      model: '', //型号
      manufactor: '',
      stateName: '', //状态
      TcinputEquipmentType: '请选择', //弹窗类别
      TcEquipmentIdType: '.', //弹窗id
      Tcloufloor: '', //楼

      Tcfloorchildre: [],
      stateID: 0,
      pageSize: 14, //一页多少条
      pageIndex: 1, //实时页码
      directoryNo: 0, //要跳转的文件号//
      parentNo: 0, //父级id
      jumpNums: [], //创建父级id
      selectFileDirectoryNo: 0,
      selectFileOriginalFileName: '',
      ExpendObjectData: [], //扩展属性
      equipmentID: 0, //id号
      ExpendObject: {},
      equipmentNo: '',
      fileShow: false,
      //信号列表数据
      EquipmentSignalListNo: 0, //获取设备信号数组的no
      signalList: [], //信号列表
      signalTcShow: false, //信号tc
      signalTcType: 'addSignal',
      SubSysdata: [], //子系统列表
      subSystemNo: '', //子系统号
      DeviceListData: [], //设备
      SignalData: [], //获取信号列表
      Subsystem: '',
      DeviceListDataID: '', //设备id
      equipment: '',
      signal: true,
      checkboxId: '',
      Checking: false,
      signalIdArr: [],
      editorsignalItem: {}, //编辑关联信号当前项
      EquipmentGetModelList: {}, //获取model对象
      sessionJiL: 0, //维修记录和保养记录名字
      sessionJiLData: {}, ////维修记录和保养记录对象
      EquipmentGetModelListLog: {}, //获取记录详情
      UserMdel: {}, //报单人
      workFlow: [], //流程
      partInOut: [], //物资
      epuipments: [],
    }
  },
  mounted() {
    console.log(this.floor,this.floorId);
    this.EquipmentTypeGetList()
    this.AreaGetAllList() //获取楼层
    this.EquipmentGetList() //默认获取所有数据

    this.SubSysList() //子系统
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
            break
          case '报废':
            return 5
            break
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
            break
          case '返回上一级':
            return 3
            break
          case 'ico':
            return 4
            break
          case 'docx':
            return 5
            break
          case 'png':
            return 6
            break
          case 'pdf':
            return 7
            break
          default:
            return 1
        }
      }
    },
  },
  watch: {
    signalTcShow(newVal, oldVal) {
      if (newVal == false) {
        //如果关闭信号弹窗就清空值
        this.signalIdArr = []
        this.Subsystem = ''
        this.equipment = ''
        this.DeviceListDataID = ''
        this.Checking = false
        this.SignalData = []
      }
    },
  },
  methods: {
    async MaintainPlanAddEquipment() {
      //添加保养计划设备
      let eqArr = ''
      for (let i in this.epuipments) {
        eqArr += this.epuipments[i].no + ','
      }
      //添加设备
      const res = await this.$api.MMS.MaintainPlan.AddEquipment({
        no: this.editEquipmentNo,
        epuipments: eqArr,
      })
      if (res.ok) {
        this.$emit('addTc', 'editEquipment', this.editEquipmentNo)

        this.$Tools.LayerMsgInfo('成功')
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    handleSelectionChange(val) {
      this.epuipments = val
    },
    selectTc(type, item) {
      //弹窗

      this.$emit('addTc', type, item)
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
      let systemNo = ''
      for (var j in this.SubSysdata) {
        if (this.SubSysdata[j].name === name) {
          systemNo = this.SubSysdata[j].no
        }
        this.subSystemNo = systemNo
      }
      const res = await this.$api.MMS.Device.GetList({ systemNo: systemNo })
      if (res.ok) {
        this.DeviceListData = res.data
      }
    },
    async signalChane(name) {
      let subSystemNo = ''
      for (var j in this.DeviceListData) {
        if (this.DeviceListData[j].name === name) {
          subSystemNo = this.DeviceListData[j].id

          this.DeviceListDataID = this.DeviceListData[j].id
        }
      }
      const res = await this.$api.MMS.Signal.GetList({ code: subSystemNo })
      if (res.ok) {
        this.SignalData = res.data
      }
    },

    Current(e) {
      //分页响应事件
      this.pageIndex = e //赋值更新方法
      this.EquipmentGetList()
    },
    async EquipmentGetList() {
      //分页方法
      const res = await this.$api.MMS.Equipment.GetList({
        pageSize: this.pageSize, //一页多少条
        pageIndex: this.pageIndex, //实时页
        name: this.inputEquipment,
        typeId: this.EquipmentIdType,
        areaId: this.floorId,
        planNo: this.editEquipmentNo,
      })
      if (res.ok) {
        this.EquipmentData = res.data
      }
      console.log(this.EquipmentData)
    },

     async floorlistChane(name) {
      //所属部门change事件
      let res = ''
      for (var i = 0; i < name.length; i++) {
        res = name[i].name
        this.floorId = name[i].id
      }

      this.floor = res
    },
    //获取楼层
    // async loufloorChane(item) {
    //   this.floor = ''
    //   var floorreId = ''
    //   //获取楼层

    //   for (var i = 0; i < this.floorlist.length; i++) {
    //     if (this.floorlist[i].model.name == item) {
    //       if (this.floorlist[i].children == undefined) {
    //         this.floorchildre = []
    //       } else {
    //         this.floorchildre = this.floorlist[i].children
    //       }

    //       floorreId = this.floorlist[i].model.id
    //     }
    //   }
    //   this.floorId = floorreId
    // },

    // async floorchildreChane(childreitem) {
    //   var floorchildreId = ''
    //   for (var i = 0; i < this.floorchildre.length; i++) {
    //     if (this.floorchildre[i].model.name == childreitem) {
    //       floorchildreId = this.floorchildre[i].model.id
    //     }
    //   }
    //   this.floorId = floorchildreId
    // },
    async AreaGetAllList() {
      //获取楼层
      // const res = await this.$api.MMS.Area.GetAllList({})
      // if (res.ok) {
      //   this.floorlist = res.data
      //   this.tcfloorlist = JSON.parse(JSON.stringify(res.data)) //深拷贝数据给弹窗
      //   this.floorlist.unshift({
      //     children: undefined,
      //     model: {
      //       code: '',
      //       id: '.',
      //       name: '所有',
      //     },
      //   })
      // }
      const res = await this.$api.MMS.Area.GetAllList({})
      if (res.ok) {
        this.floorlist = res.data
        this.floorlist.unshift({
          children: undefined,
          model: {
            code: '',
            id: '',
            name: '<--无-->',
          },
        })
      }
    },
    TcEquipmentTypeChane(name) {
      //分项拼接
      let res = ''
      for (var i = 0; i < name.length; i++) {
        res = name[i].name
        this.TcEquipmentIdType = name[i].id
      }

      if (res == this.TcinputEquipmentType) {
        return
      }
      this.TcinputEquipmentType = res
    },

    EquipmentTypeChane(name) {
      //分项拼接
      let res = ''
      for (var i = 0; i < name.length; i++) {
        res = name[i].name
        this.EquipmentIdType = name[i].id
      }

      if (res == this.inputEquipmentType) {
        return
      }
      this.inputEquipmentType = res
    },
    async EquipmentTypeGetList() {
      //获取设备类别
      const res = await this.$api.MMS.EquipmentType.GetList({})
      if (res.ok) {
        this.tcEquipmentTypeData = this.getTreeData(
          JSON.parse(JSON.stringify(res.data))
        ) //深拷贝数据给弹窗
        this.EquipmentTypeData = this.getTreeData(res.data)
        this.EquipmentTypeData.unshift({
          children: undefined,
          model: {
            id: '.',
            name: '所有',
          },
        })
      }
    },

    getTreeData(data) {
      // 递归
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
.Equipment {
  user-select: none;

  .Equipment_cneter {
    color: #fff;

    .content {
      margin: 0 24px;

      .selectEquipment_top {
        opacity: 1;
        .ul_margin {
          margin-top: 5px;
        }

        ul {
          display: flex;

          li {
            display: flex;
            align-items: center;
            margin-right: 20px;

            .Equipment_input {
              width: 120px;
              height: 3vh;
              background: rgba(0, 0, 0, 0);
              border: 1px solid rgba(255, 255, 255, 1);
              padding-left: 5px;
              color: #fff;
            }

            .withd_ {
              width: 120px;
            }

            .Equipment_chaxun {
              button {
                width: 100px;
                height: 3vh;
                background: #47d235;
                border-radius: 2px;
                font-size: 14px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: #ffffff;
                cursor: pointer;
              }
            }
            .Equipment_chongzhi{
              button {
                width: 100px;
                height: 3vh;
                background: #007EDD;
                border-radius: 2px;
                font-size: 14px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: #ffffff;
                cursor: pointer;
              }
            }
          }
        }
      }

      .Equipment_top_top {
        float: right;
        margin-top: 5px;

        ul {
          li {
            button {
              width: 50px;
              height: 26px;
              background: #007edd;
              border-radius: 2px;
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: #ffffff;
              cursor: pointer;
            }
          }
        }
      }

      .Equipment_center {
        width: 100%;

        .editing_green {
          color: rgba(95, 255, 0, 1);
          cursor: pointer;
        }

        .red {
          color: #ff3c00;
          cursor: pointer;
        }

        .guanlian {
          color: rgba(0, 255, 234, 1);
          cursor: pointer;
        }

        .chakan {
          color: rgba(246, 255, 0, 1);
          cursor: pointer;
        }
      }

      .Equipment_footer {
        .fenye {
          display: flex;
          justify-content: center;
        }
      }
      .tanchuang_center_cen_bottom {
        margin-top: 3vh;

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
</style>
