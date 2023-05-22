<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2021-11-18 11:23:26
 * @LastEditors: Please set LastEditors
 * @Description:设备维修及时率
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->
<template>
  <div class="Part public_body">
    <div class="WorkOrderQuery_cneter">
      <div :class="[
          'public_page',
          $store.state.dtab ? 'index_off' : 'index_no'
        ]">
        <div class="WorkOrderQuery_main">
          <div class="WorkOrderQuery_main_top">
            <div class="MonitorReport_center_top">
              <ul>
                <li>
                  <span>月份：</span>
                  <el-date-picker
                    class="EqTime"
                    v-model="EqTime"
                    type="month"
                    placeholder="选择日期"
                    value-format="yyyy-MM"
                  ></el-date-picker>
                </li>
                <!-- <li>
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
                </li> -->

                <li>
                  <span
                    class="chaxun"
                    @click="ReportRepairTimeliness()"
                  >查询</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="daochu">
            <span
              @click="ReportExportRepairTimeliness()"
              v-show="ReportRepairTimelinessData.list.length > 0"
            >导出</span>
          </div>
          <div class="WorkOrderQuery_main_zhon">
            <div
              class="WorkOrderQuery_main_list"
              v-show="ReportRepairTimelinessData.list.length > 0"
            >
              <RepairTimelinessChart :ReportRepairTimelinessData="ReportRepairTimelinessData"></RepairTimelinessChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RepairTimelinessChart from './components/RepairTimelinessChart'
export default {
  components: {
    RepairTimelinessChart,
  },
  data() {
    return {
       fullscreenLoading:'',
      inputEquipment: '',
      inputEquipmentType: '所有',
      EquipmentTypeData: [], //设备类别
      EquipmentIdType: '.', //设备类型id
      EqTime: new Date().getFullYear() + '-' + (new Date().getMonth() + 1), //日期
      ReportRepairTimelinessData: {
        list: [],
      },
    }
  },
  mounted() {
    this.EquipmentTypeGetList() //设备类别
    this.ReportRepairTimeliness()
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
    async ReportExportRepairTimeliness() {
      var image = await this.getChartImg('#alarmLevelqus_chart')
      // this.previewChartImg(image) // 预览

      let formData = new FormData()
      formData.append('file', image)

      //导出设备维修及时率报表
      const res = await this.$api.MMS.Report.ExportRepairTimeliness(
        {
          date: this.EqTime,
          typeId: this.EquipmentIdType == '.' ? '' : this.EquipmentIdType,
        },
        formData
      )
      if (res) {
        var blob = new Blob([res])
        var a = document.createElement('a')
        a.download = '设备运行维修率报表.xlsx'
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
    //维修及时率查询
    async ReportRepairTimeliness() {
       this.openFullScreen()
      const res = await this.$api.MMS.Report.RepairTimeliness({
        date: this.EqTime,
        type: this.EquipmentIdType,
      })
      if (res) { 
        this.fullscreenLoading.close()
      }
      if (res.ok) {
        if (res.data.list.length == false) {
          this.$Tools.LayerMsgErr('暂无数据')
        }
        this.ReportRepairTimelinessData = res.data //查询
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
  },
}
</script>
<style lang="scss" scoped>
@import './styles/RepairTimeliness.scss';
</style>
