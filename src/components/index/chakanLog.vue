<!--
 * @Author: your name
 * @Date: 2020-11-26 11:47:57
 * @LastEditTime: 2022-02-23 11:30:52
 * @LastEditors: Please set LastEditors
 * @Description: 查看工单
 * @FilePath: \ibms\src\components\index\chakanLog.vue
-->
<template>
  <div class="chakanLog">
    <div class="chakanLog_center">
      <div class="chakanLog_top">
        <div class="chakanLog_left">
          <ul class="Distribute">
            <li>
              <span>工单号：</span>
              <span>{{ EquipmentGetModelListLog.id }}</span>
            </li>
            <li>
              <span>工单大类：</span>
              <span>{{
                $Convert.WorkOrder.Type(EquipmentGetModelListLog.type)
              }}</span>
            </li>
            <li>
              <span>工单子类：</span>
              <span>{{ EquipmentGetModelListLog.workSubTypeName }}</span>
            </li>
            <li>
              <span>工单来源：</span>
              <span>{{
                $Convert.WorkOrder.Source(EquipmentGetModelListLog.source)
              }}</span>
            </li>

            <li>
              <span>工单级别：</span>
              <span>{{
                $Convert.WorkOrder.Level(EquipmentGetModelListLog.level)
              }}</span>
            </li>
            <li>
              <span>报单人：</span>
              <span
                :class="'user'"
                @click="addTc('bdUser', EquipmentGetModelListLog.reportUserNo)"
              >{{ EquipmentGetModelListLog.reportUserName }}</span>
            </li>
            <li>
              <span>报单时间：</span>
              <span>{{
                EquipmentGetModelListLog.reportTime &&
                  DateTime.parse(EquipmentGetModelListLog.reportTime).format(
                    'yyyy-MM-dd hh:mm:ss'
                  )
              }}</span>
            </li>
            <li>
              <span>地点：</span>
              <span>{{ EquipmentGetModelListLog.areaName }}</span>
            </li>
            <li>
              <span>设备：</span>
              <span
                class="user"
                @click="addTc('chakan', EquipmentGetModelListLog.equipmentNo)"
              >{{ EquipmentGetModelListLog.equipmentName }}</span>
            </li>
          </ul>
        </div>
        <div class="chakanLog_right">
          <ul class="Distribute">
            <li>
              <span>处理部门：</span>
              <el-cascader
                v-if="operType == 'Transfer'"
                :show-all-levels="false"
                v-model="form.departmentIds"
                :options="departmentData"
                :props="{
                  expandTrigger: 'hover',
                  checkStrictly: true
                }"
                @change="onDepartmentChange(form.departmentIds)"
              >
                <template slot-scope="{ node, data }">
                  <span disabled>{{ data.label }}</span>
                  <span v-if="data.children">({{ data.children.length }})</span>
                </template>
              </el-cascader>
              <span
                v-if="operType == 'Transfer'"
                class="xing"
              >*</span>
              <span v-else>{{
                EquipmentGetModelListLog.dealDepartmentName
              }}</span>
            </li>
            <li>
              <span>处理人：</span>
              <div v-if="operType == 'Distribute'">
                <span class="selectFile_sub">{{ DealingUserName || '' }}</span>
                <a
                  href="javascript:;"
                  @click="addTc('Dealing', EquipmentGetModelListLog.dealDepartmentId)"
                  class="smallbluebutton one_a"
                >... <span class="xing">*</span></a>
              </div>
              <span
                v-else
                :class="
                  EquipmentGetModelListLog.dealUserName == '' ? '' : 'user'
                "
                @click="
                  EquipmentGetModelListLog.dealUserName == ''
                    ? ''
                    : addTc('clUser', EquipmentGetModelListLog.dealUserNo)
                "
              >{{ EquipmentGetModelListLog.dealUserName }}</span>
            </li>
            <li>
              <span>总务协助：</span>
              <div v-if="operType == 'Distribute'">
                <el-switch
                  :value="dispatchGeneralAssist"
                  @change="onDispatchGeneralAssistChange"
                ></el-switch>
              </div>
              <span v-else>{{ EquipmentGetModelListLog.generalAssist ? "是" : "否" }}</span>
            </li>
            <li v-if="operType == 'Distribute'">
              <span>添加协助人</span>
              <span><i
                  class="el-icon-circle-plus-outline"
                  style="font-size:20px"
                  @click="addTc('AddAssister', EquipmentGetModelListLog.dealDepartmentId)"
                ></i></span>
            </li>
            <li
              v-for="(assister,index) in currentAssisters"
              :key="assister.userNo"
            >
              <span>协助人{{index + 1}}：</span>
              <span v-if="operType == 'Distribute'">
                {{ assister.userName }}
                <i
                  class="el-icon-remove-outline"
                  style="font-size:20px;margin-left:15px"
                  @click="addTc('RemoveAssister', index)"
                ></i>
              </span>
              <span
                v-else
                class="user"
                @click="addTc('clUser', assister.userNo)"
              >
                {{ assister.userName }}
              </span>
            </li>
            <li>
              <span>派单时长：</span>
              <span>{{
                EquipmentGetModelListLog.dispatchTimeSpan &&
                  EquipmentGetModelListLog.dispatchTimeSpan.toFixed(2) + '小时'
              }}</span>
            </li>
            <li>
              <span>接单时长：</span>
              <span>{{
                EquipmentGetModelListLog.receiveTimeSpan &&
                  EquipmentGetModelListLog.receiveTimeSpan.toFixed(2) + '小时'
              }}</span>
            </li>
            <li>
              <span>处理时长：</span>
              <span>{{
                EquipmentGetModelListLog.finishTimeSpan &&
                  EquipmentGetModelListLog.finishTimeSpan.toFixed(2) + '小时'
              }}</span>
            </li>
            <li>
              <span>收费费用（元）：</span>
              <span>{{ EquipmentGetModelListLog.fee /100}}</span>
            </li>
            <li>
              <span>评价分数：</span>
              <el-rate
                v-show="EquipmentGetModelListLog.evaluateScore"
                disabled
                v-model="EquipmentGetModelListLog.evaluateScore"
              ></el-rate>
            </li>
          </ul>
        </div>
      </div>
      <div class="chakanLog_zhong">
        <ul>
          <li style="display: flex; justify-content: space-between; width: 100%;">
            <span class="bao_baodcenter">内容：</span>
            <div class="baoy bao_M" v-html="returnh(EquipmentGetModelListLog.content)">
              <!-- {{ EquipmentGetModelListLog.content }} -->
            </div>
          </li>
          <li>
            <span>照片：</span>
            <span class="baoy zt">
              <img
                style="width:40px;height:40px;cursor: pointer;"
                :src="ImageGetImg + EquipmentGetModelListLog.photoId0"
                @click="handlePreview(EquipmentGetModelListLog.photoId0)"
                v-if="EquipmentGetModelListLog.photoId0"
                alt
              />
              <img
                style="width:40px;height:40px;cursor: pointer;margin-left:8px;"
                :src="ImageGetImg + EquipmentGetModelListLog.photoId1"
                @click="handlePreview(EquipmentGetModelListLog.photoId1)"
                v-if="EquipmentGetModelListLog.photoId1"
                alt
              />
            </span>
          </li>
          <li>
            <span>视频：</span>
            <span class="baoy zt">
              <a
                href="javascript:void(0)"
                @click="handlePreviewVideo(EquipmentGetModelListLog.videoId)"
              >
                {{ EquipmentGetModelListLog.videoName }}
              </a>
            </span>
          </li>
        </ul>
      </div>
      <div class="chakanLog_bottom">
        <fieldset class="legend_bor">
          <legend>物资</legend>
          <div class="div_table">
            <el-table
              :data="parts"
              style="width: 100%"
              :row-class-name="tableRowClassName"
            >
              <el-table-column
              show-overflow-tooltip
                prop="partName"
                label="名称"
              >
                <template slot-scope="scope">
                  <span>
                    <a
                      href="#"
                      :title="scope.row.partName"
                    >{{
                      scope.row.partName
                    }}</a>
                  </span>
                </template>
              </el-table-column>
              <el-table-column
              show-overflow-tooltip
                prop="partStandardCode"
                label="标准编码"
              ></el-table-column>
              <el-table-column
              show-overflow-tooltip
                prop="partCode"
                label="编码"
              ></el-table-column>

              <el-table-column
              show-overflow-tooltip
                prop="partSpecification"
                label="规格型号"
                width="190px"
              ></el-table-column>
              <!-- <el-table-column
                prop="partCalcName"
                label="核算类别"
              ></el-table-column> -->
              <el-table-column
              show-overflow-tooltip
                prop="partBookName"
                label="账簿类别"
              ></el-table-column>

              <el-table-column
                prop="partUnit"
                label="单位"
              ></el-table-column>
              <el-table-column
                prop="count"
                label="数量"
              ></el-table-column>
            </el-table>
          </div>
        </fieldset>
        <fieldset class="legend_bor">
          <legend>处理流程</legend>
          <div class="div_table">
            <el-table
              :data="workFlow"
              style="width: 100%"
              :row-class-name="tableRowClassName"
            >
              <el-table-column
                prop="time"
                label="处理时间"
              >
                <template slot-scope="scope">
                  <span>
                    {{ $Tools.timeFormat(scope.row.time) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="userName"
                label="处理人"
              >
                <template slot-scope="scope">
                  <span
                    style="text-decoration:underline;cursor:pointer"
                    @click="addTc('clUser', scope.row.userNo)"
                  >
                    {{ scope.row.userName }}
                  </span>
                </template>
              </el-table-column>

              <el-table-column
                prop="description"
                label="处理内容"
              ></el-table-column>
              <el-table-column label="图片">
                <template slot-scope="scope">
                  <img
                    v-if="scope.row.photoId0"
                    style="width:30px;height:30px;cursor: pointer;"
                    :src="ImageGetImg + scope.row.photoId0"
                    @click="handlePreview(scope.row.photoId0)"
                    alt
                  />
                  <img
                    v-if="scope.row.photoId1"
                    style="width:30px;height:30px;cursor: pointer;margin-left:8px;"
                    :src="ImageGetImg + scope.row.photoId1"
                    @click="handlePreview(scope.row.photoId1)"
                    alt
                  />
                </template>
              </el-table-column>
              <el-table-column label="视频">
                <template slot-scope="scope">
                  <a
                    @click="handlePreviewVideo(scope.row.videoId)"
                    href="javascript:void(0)"
                  >
                    {{ scope.row.videoName }}
                  </a>
                </template>
              </el-table-column>
              <el-table-column
                prop="stateName"
                label="工单操作"
                width="100px"
              >
                <template slot-scope="scope">
                  <span>{{ $Convert.WorkFlow.Action(scope.row.action) }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </fieldset>
        <div
          class="chakanLog_bottom_content"
          v-if="operType == 'abandoned' || operType == 'Transfer'"
        >
          <span>说明：</span>
          <el-input
            :rows="8"
            type="textarea"
            v-model="form.content"
          >
          </el-input>
          <span class="mgl5">*</span>
        </div>
        <div
          v-if="operType && operType != 'chakanLog'"
          class="tanchuang_center_cen_bottom"
        >
          <button
            @click="addTc(operType, form)"
            v-preventReClick="2000"
          >
            确认
          </button>
          <button @click="addTc('cancel')">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DateTime from '@/js/datetime'

export default {
  props: {
    no: '',
    operType: '',
    DealingUserName: {
      type: String,
    },
    dispatchGeneralAssist: {
      type: Boolean,
    },
    dispatchAssisters: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    currentAssisters: function () {
      return this.operType == 'Distribute'
        ? this.dispatchAssisters
        : this.assisters
    },
       returnh: function () {
      return function (type) {
        //换行
        let reg = new RegExp('\n', 'g')
        let str = type.replace(reg, '<br>')
        return str
      }
    },
  },
  data() {
    return {
      DateTime: DateTime,
      workFlow: [], //流程
      assisters: [],
      parts: [], //物资
      EquipmentGetModelListLog: {}, //获取记录详情
      photoIdImg: '',
      ImageGetImg: this.$api.ImageGetImg,
      form: {
        content: '',
        departmentId: '',
        departmentIds: '',
      },
      departmentData: [],
    }
  },
  mounted() {
    this.DepartmentGetAllList()
    this.chakanLog()
  },
  methods: {
   
    onDispatchGeneralAssistChange(val) {
      this.addTc('ChangeGeneralAssist', val)
    },
    async DepartmentGetAllList() {
      const GetDepartment = await this.$api.MMS.Department.Get({})
      //获取所有部门
      if (GetDepartment.ok) {
        let departmentData = GetDepartment.data
        this.handleDepartmentData(departmentData)
        this.departmentData = departmentData
      }
    },
    handleDepartmentData(children) {
      for (let i = 0; i < children.length; i++) {
        let node = children[i]
        if (node.children && node.children.length == 0)
          node.children = undefined
        else this.handleDepartmentData(node.children)
      }
    },
    async onDepartmentChange(name) {
      if (this.form.departmentIds.length > 0)
        this.form.departmentId =
          this.form.departmentIds[this.form.departmentIds.length - 1]
    },
    getDepartmentIds(children, value, values) {
      for (let i = 0; children && i < children.length; i++) {
        let node = children[i]
        if (node.value == value) {
          values.splice(0, 0, node.value)
          return true
        }

        if (this.getDepartmentIds(node.children, value, values)) {
          values.splice(0, 0, node.value)
          return true
        }
      }
      return false
    },
    WorkFlowGetVideoName(resWork) {
      resWork.forEach(async (item) => {
        item.videoName = ''
        if (item.videoId) {
          var res = await this.$api.MMS.File.Info(item.videoId)
          if (res.ok) {
            item.videoName = res.data.originalFileName
          }
        }
      })
    },
    async handlePreviewVideo(videoId) {
      const prepareres = await this.$api.MMS.File.DownFile(videoId)
      if (prepareres) {
        let url = window.URL.createObjectURL(new Blob([prepareres]))

        var div = document.createElement('div')
        div.style.margin = '0 auto'
        div.style.marginTop = 'calc(50vh - 200px)'
        div.style.width = '960px'

        var x = document.createElement('VIDEO')
        x.setAttribute('width', '960')
        x.setAttribute('height', '400')
        x.setAttribute('controls', 'controls')
        x.setAttribute('src', url)
        div.appendChild(x)
        const imgWindow = window.open()
        imgWindow.document.body.style.backgroundColor = '#000'
        imgWindow.document.body.appendChild(div)
      } else {
        this.$message('视频预览失败')
      }
    },
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
    addTc(type, item) {
      this.$emit('addTc', type, item)
    },
    async chakanLog() {
      const res = await this.$api.MMS.WorkOrder.WorkOrderGetRepairOrderModel({
        no: this.no,
      })
      const resWork = await this.$api.MMS.WorkOrder.EquipmentGetRepairOrderWork(
        {
          no: this.no,
        }
      )
      const resAssister = await this.$api.MMS.WorkAssister.GetListByOrder({
        orderNo: this.no,
      })
      const resPart = await this.$api.MMS.WorkPart.GetListByOrder({
        orderNo: this.no,
      })

      if (res.ok) {
        this.WorkFlowGetVideoName([res.data])
        this.EquipmentGetModelListLog = res.data //获取记录详情
        console.log(res.data)
        this.form.departmentId = this.EquipmentGetModelListLog.dealDepartmentId
        let departmentIds = []
        this.getDepartmentIds(
          this.departmentData,
          this.form.departmentId,
          departmentIds
        )
        this.form.departmentIds = departmentIds
        this.FileGetThumbnailImg(this.EquipmentGetModelListLog.photoId)
        this.WorkFlowGetVideoName(resWork.data)
        this.workFlow = resWork.data
        this.assisters = resAssister.data
        this.parts = resPart.data
      }
    },
    async FileGetThumbnailImg(id) {
      const res = await this.$api.MMS.File.GetThumbnailImg({ Id: id })
      this.photoIdImg = window.URL.createObjectURL(res)
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
//查看工单
.chakanLog {
  .xing {
    position: absolute;
    right: -20px;
  }
  // text-align: left;
  overflow: auto;
  height: 50vh;

  .chakanLog_center {
    margin: 12px 24px;

    .chakanLog_top {
      display: flex;
      // height: 200px;
      .chakanLog_left {
        .Distribute {
          position: relative;
        }
        flex: 1;
        > ul {
          margin: 0 50px;
          li {
            display: flex;
            justify-content: space-between;
            height: 3vh;
            line-height: 3vh;
            .user {
              cursor: pointer;
              text-decoration: underline;
            }
            a,
            span {
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: #00f0ff;
              // width: 80px;

              word-break: keep-all;
              /* 不换行 */
              white-space: nowrap;
              /* 不换行 */
              overflow: hidden;
              /* 内容超出宽度时隐藏超出部分的内容 */
              text-overflow: ellipsis;
            }
          }
        }
      }
      .chakanLog_right {
        flex: 1;
        > ul {
          margin: 0 50px;
          li {
            position: relative;
            display: flex;
            justify-content: space-between;
            height: 3vh;
            line-height: 3vh;
            .user {
              cursor: pointer;
              text-decoration: underline;
            }

            a,
            span {
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: #00f0ff;
              // width: 80px;

              word-break: keep-all;
              /* 不换行 */
              white-space: nowrap;
              /* 不换行 */
              overflow: hidden;
              /* 内容超出宽度时隐藏超出部分的内容 */
              text-overflow: ellipsis;
            }

            .one_a {
              margin-left: 5px;
            }
            .smallbluebutton {
              margin-right: 5px;
              display: inline-block;
              background-color: rgba(0, 0, 0, 0);
              border: 1px solid #00f0ff;
              color: #00f0ff;
              height: 20px;
              line-height: 20px;
              text-align: center;
              text-decoration: none;
              width: 20px;
              font-size: 14px;
            }
          }
        }
      }
    }
    .chakanLog_zhong {
      width: 100%;
      // height: 500px;

      // display: flex;
      text-align: left;
      > ul {
        margin: 0 50px;
        .line_hei3 {
          height: 3vh;
          line-height: 3vh;
        }
        li {
          margin: 22px 0;
          .baoy {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: #00f0ff;
          }
          .zt {
            margin-left: 75px;
          }
          .bao_baodcenter {
            min-width: 45px;
          }
          .bao_M {
            margin-left: 75px;
            flex: 1;
          }
          a,
          span {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: #00f0ff;
            // width: 80px;

            word-break: keep-all;
            /* 不换行 */
            white-space: nowrap;
            /* 不换行 */
            overflow: hidden;
            /* 内容超出宽度时隐藏超出部分的内容 */
            text-overflow: ellipsis;
          }
        }
      }
    }
    .chakanLog_bottom {
      text-align: left;
      .legend_bor {
        border: 1px solid #00f0ff;
        color: #00f0ff;
        margin-top: 10px;
      }
      .div_table {
        .white {
          color: #fff;
        }
      }
      .chakanLog_bottom_content {
        position: relative;
        margin: 10px 50px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #00f0ff;
        span {
          vertical-align: top;
        }
        .mgl5 {
          margin-left: 5px;
        }
        .el-textarea {
          width: calc(90% - 5vw);
          display: inline-block;
        }
      }
      .tanchuang_center_cen_bottom {
        text-align: center !important;
        margin-top: 3.7vh;
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
