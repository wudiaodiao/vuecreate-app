<!--
 * @Author: your name
 * @Date: 2020-12-07 16:30:03
 * @LastEditTime: 2021-11-17 16:29:13
 * @LastEditors: Please set LastEditors
 * @Description: 查看巡检项
 * @FilePath: \IBMS\ibms\src\views\WorkOrder\components\InspectionTaskPeek.vue
-->
<template>
  <div class="editEquipment">
    <div class="editEquipment_center">
      <div class="MaintainPlan_main_list">
        <el-table
         
          :data="InspectionTaskPeekData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
         
          <el-table-column
            prop="patrolProject.name"
            label="巡检项目"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="巡检项"
          >
            <template slot-scope="scope">
              <span
                style="cursor: pointer;"
                @click="addTc('chakanXJX', scope.row.patrolTaskTeamItems)"
              >查看</span>
            </template>
          
          </el-table-column>

        </el-table>
       
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    InspectionTaskNo: '',
  },
  data() {
    return {
      type: 'first',
      chakanList: [],
      InspectionTaskPeekData: [],
      ImageGetImg: this.$api.ImageGetImg,
    }
  },
  mounted() {
    this.InspectionTaskPeek()
  },
  computed: {},
  watch: {
    InspectionTaskNo(newVal, old) {
      console.log(123, newVal, old)
      this.type = 'first'

      this.InspectionTaskNo = newVal
      this.InspectionTaskPeek()
    },

    immediate: true,
    deep: true,
  },
  methods: {
    // 预览
    async handlePreview(val) {
      const prepareres = await this.$api.MMS.Image.GetOriginalImg(val)
      if (prepareres) {
        let url = window.URL.createObjectURL(new Blob([prepareres]))
        let link = document.createElement('a')
        link.href = url
        const image = new Image()
        image.src = link
        const imgWindow = window.open(link)
        imgWindow.document.write(image.outerHTML)
      } else {
        this.$message('图片预览失败')
      }
    },
    async InspectionTaskPeek() {
      //查看巡检项
      const res = await this.$api.MMS.PatrolTask.Peek({
        taskTeamNo: this.InspectionTaskNo.no,
      })
      console.log(res)
      if (res.ok) {
        this.InspectionTaskPeekData = res.data
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    addTc(type, item) {
      this.type = type
      this.chakanList = item
      console.log(this.chakanList)
      this.$emit('addTc', type, item)
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
.editEquipment {
  margin: 0 40px;
  .editEquipment_top {
    height: 3vh;

    .editEquipment_top_right {
      float: right;
      > span {
        display: inline-block;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #ffffff;
        width: 40px;
        height: 26px;
        text-align: center;
        line-height: 26px;
        background: #007edd;
        border-radius: 2px;
      }
    }
  }
  .editEquipment_center {
    .red {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: #ff3c00;
      cursor: pointer;
    }
  }
}
</style>
