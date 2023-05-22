<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2021-11-18 11:35:01
 * @LastEditors: Please set LastEditors
 * @Description:设备完好率报表
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->
<template>
  <div class="Part public_body">
    <div class="WorkOrderQuery_cneter">
      <div :class="[
          'public_page',
          'WorkOrderQuery',
          $store.state.dtab ? 'index_off' : 'index_no'
        ]">
        <div class="WorkOrderQuery_main">
          <div class="WorkOrderQuery_main_top">
            <div class="MonitorReport_center_top">
              <ul>
                <li>
                  <span class="span">设备类别：</span>
                  <el-cascader
                    :show-all-levels="false"
                    v-model="inputEquipmentType"
                    :options="EquipmentTypeData"
                    :props="{
                      expandTrigger: 'hover',
                      value: 'model',
                      checkStrictly: true
                    }"
                    @change="EquipmentTypeChane(inputEquipmentType)"
                    :placeholder="inputEquipmentType"
                    clearable
                  >
                    <template slot-scope="{ node, data }">
                      <span>{{ data.model.name }}</span>
                      <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                    </template>
                  </el-cascader>
                </li>
                <li>
                  <span>地点：</span>
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
                  >
                    <template slot-scope="{ node, data }">
                      <span v-if="data.children.length==0">({{ data.model.code}})</span>
                      <span disabled>{{ data.model.name }}</span>
                      <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                    </template>
                  </el-cascader>
                </li>
                <li>
                  <span
                    class="chaxun"
                    @click="ReportPerfectRatioOfEquipment()"
                  >查询</span>
                </li>
              </ul>
            </div>
          </div>
          <div
            class="daochu"
            v-if="ReportPerfectRatioOfEquipmentData.arr"
          >
            <span @click="ReportExportPerfectRatioOfEquipment()">导出</span>
          </div>
          <div
            class="WorkOrderQuery_main_zhon"
            v-if="ReportPerfectRatioOfEquipmentData.arr"
          >
            <div class="WorkOrderQuery_main_list">
              <h3>设备{{ deviceType }}分析</h3>
              <PerfectRatioOfEquipmentChart
                :ReportPerfectRatioOfEquipmentData="ReportList"
                :deviceType="deviceType"
              ></PerfectRatioOfEquipmentChart>
              <notCurrentlyAvailable :notCurrentlyAvailable="ReportPerfectRatioOfEquipmentData.list"></notCurrentlyAvailable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PerfectRatioOfEquipmentChart from './components/PerfectRatioOfEquipmentChart'
import notCurrentlyAvailable from './components/notCurrentlyAvailable'
export default {
  components: {
    PerfectRatioOfEquipmentChart,
    notCurrentlyAvailable,
  },
  data() {
    return {
      inputEquipment: '',
      inputEquipmentType: '所有',
      ReportPerfectRatioOfEquipmentData: [], //设备类别
      EquipmentIdType: '.', //设备类型id
      EquipmentTypeData: [],
      ReportList: {}, //设备完好率分析
      deviceType: '设备完好率',
      floorlist: [],
      floor: '所有',
      floorId: '',
      fullscreenLoading:''
    }
  },
  mounted() {
    this.AreaGetAllList()
    this.EquipmentTypeGetList() //设备类别
    this.ReportPerfectRatioOfEquipment() //默认查询所有
  },
  methods: {
     openFullScreen() {
            let that = this
            that.fullscreenLoading = that.$loading({
              lock: true,
              text: '加载中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)',
            })
          },
    async AreaGetAllList() {
      //获取楼层
      const res = await this.$api.MMS.Area.GetAllList({})
      if (res.ok) {
        this.floorlist = res.data
        this.floorlist.unshift({
          children: undefined,
          model: {
            code: '',
            id: '',
            name: '所有',
          },
        })
      }
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

    async ReportExportPerfectRatioOfEquipment() {
      //导出
      const res = await this.$api.MMS.Report.ExportPerfectRatioOfEquipment({
        type: this.EquipmentIdType,
      })
      if (res) {
        var blob = new Blob([res])
        var a = document.createElement('a')
        a.download = '不可用设备报表.xlsx'
        a.style.display = 'none'
        a.href = URL.createObjectURL(blob)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        this.$Tools.LayerMsgInfo('成功')
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    async ReportPerfectRatioOfEquipment() {
      this.openFullScreen()
      const res = await this.$api.MMS.Report.PerfectRatioOfEquipment({
        type: this.EquipmentIdType,
        areaId: this.floorId,
      })
       if (res) { 
        this.fullscreenLoading.close()
      }
      if (res.ok) {
        let obj = {}
        obj.arr = res.data.arr
        obj.availability = res.data.availability
        this.ReportList = obj
        this.ReportPerfectRatioOfEquipmentData = res.data //查询
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    EquipmentTypeChane(name) {
      //分项拼接
      let res = ''
      for (var i = 0; i < name.length; i++) {
        res = name[i].name
        this.EquipmentIdType = name[i].id
      }

      this.inputEquipmentType = res
    },

    async EquipmentTypeGetList() {
      //获取设备类别
      const res = await this.$api.MMS.EquipmentType.GetList({})
      if (res.ok) {
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
@import './styles/PerfectRatioOfEquipment.scss';
</style>
