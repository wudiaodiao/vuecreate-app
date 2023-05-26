<!--
 * @Author: your name
 * @Date: 2020-11-26 11:47:57
 * @LastEditTime: 2022-02-18 16:45:31
 * @LastEditors: Please set LastEditors
 * @Description: 查看工单
 * @FilePath: \ibms\src\views\WorkOrder\components\WorkOrderView.vue
-->
<template>
  <div class="chakanLog">
    <div class="chakanLog_center">
      <div class="chakanLog_top">
        <div class="chakanLog_left">
          <ul class="Distribute">
            <li>
              <span>处理部门：</span>
              <span>{{model.dealDepartmentName}}</span>
            </li>
            <li>
              <span>工单号</span>
              <span>{{ model.id }}</span>
            </li>
            <li>
              <span>工单大类：</span>
              <span>{{ $Convert.WorkOrder.Type(model.type) }}</span>
            </li>
            <li>
              <span>工单子类：</span>
              <span>{{ model.workSubTypeName }}</span>
            </li>
            <li>
              <span>工单来源：</span>
              <span>{{ $Convert.WorkOrder.Source(model.source) }}</span>
            </li>
            <li>
              <span>工单状态:</span>
              <span> {{ $Convert.WorkOrder.State(model.state) }}</span>
            </li>
            <li>
              <span>工单级别：</span>
              <span>{{ $Convert.WorkOrder.Level(model.level) }}</span>
            </li>
            <li>
              <span>派单时长：</span>
              <span>{{ $Convert.WorkOrder.getTimeSpan(model.dispatchTimeSpan, '小时') }}</span>
            </li>
            <li>
              <span>接单时长：</span>
              <span>{{ $Convert.WorkOrder.getTimeSpan(model.receiveTimeSpan, '小时') }}</span>
            </li>
            <li>
              <span>处理时长：</span>
              <span>{{ $Convert.WorkOrder.getTimeSpan(model.finishTimeSpan, '小时') }}</span>
            </li>
            <li>
              <span>保养计划：</span>
              <span>{{ model.maintainPlanName }}</span>
            </li>
            <li>
              <span>报警事件：</span>
              <span>{{ model.eventName }}</span>
            </li>
          </ul>
        </div>
        <div class="chakanLog_right">
          <ul>
            <li>
              <span>处理人：</span>
              <span
                :class="model.dealUserName == '' ? '' : 'user'"
                @click="model.dealUserName == ''? '' : addTc('clUser', model.dealUserNo)"
              >{{ model.dealUserName }}</span>
            </li>

            <li>
              <span>设备：</span>
              <span
                class="user"
                @click="addTc('chakan', model.equipmentNo)"
              >{{ model.equipmentName }}</span>
            </li>
            <li>
              <span>报单人：</span>
              <span
                :class="'user'"
                @click="addTc('bdUser', model.reportUserNo)"
              >{{ model.reportUserName }}</span>
            </li>
            <li>
              <span>报单时间：</span>
              <span>{{
                model.reportTime &&
                  DateTime.parse(model.reportTime).format(
                    'yyyy-MM-dd hh:mm:ss'
                  )
              }}</span>
            </li>
            <li>
              <span>派单人：</span>
              <span>{{ model.dispatchUserName }}</span>
            </li>
            <li>
              <span>派单时间：</span>
              <span>{{
                model.dispatchTime &&
                  DateTime.parse(model.dispatchTime).format(
                    'yyyy-MM-dd hh:mm:ss'
                  )
              }}</span>
            </li>

            <li>
              <span>完成人：</span>

              <span>{{ model.finishUserName }}</span>
            </li>
            <li>
              <span>完成时间：</span>
              <span>{{
                model.finishTime &&
                  DateTime.parse(model.finishTime).format(
                    'yyyy-MM-dd hh:mm:ss'
                  )
              }}</span>
            </li>
            <li>
              <span>评价时间：</span>
              <span>{{
                model.evaluateTime &&
                  DateTime.parse(model.evaluateTime).format(
                    'yyyy-MM-dd hh:mm:ss'
                  )
              }}</span>
            </li>
            <li>
              <span>评价分数：</span>
              <el-rate
                v-show="model.evaluateScore"
                disabled
                v-model="model.evaluateScore"
              ></el-rate>
            </li>
            <li>
              <span>收费费用（元）：</span>
              <span>{{ model.fee && model.fee / 100 }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="chakanLog_zhong">
        <ul>
          <li style="display: flex;">
            <span class="bao_baodcenter">内容：</span>
            <div class="baoy bao_M">
              {{ model.content }}
            </div>
          </li>
          <li>
            <span>照片：</span>
            <span class="baoy zt">
              <img
                style="width:40px;height:40px;cursor: pointer;"
                :src="ImageGetImg + model.photoId0"
                @click="handlePreview(model.photoId0)"
                v-if="model.photoId0"
                alt
              />
              <img
                style="width:40px;height:40px;cursor: pointer;margin-left:8px;"
                :src="ImageGetImg + model.photoId1"
                @click="handlePreview(model.photoId1)"
                v-if="model.photoId1"
                alt
              />
            </span>
          </li>
          <li>
            <span>视频：</span>
            <span class="baoy zt">
              <a
                href="javascript:void(0)"
                @click="handlePreviewVideo(model.videoId)"
              >
                {{ model.videoName }}
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
              :data="partInOut"
              style="width: 100%"
              :row-class-name="tableRowClassName"
            >
              <el-table-column
                prop="partName"
                label="名称"
              >
                <template v-slot="scope">
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
                prop="partTypeName"
                label="类别"
              ></el-table-column>
              <el-table-column
                prop="partManufactor"
                label="厂商"
              ></el-table-column>
              <el-table-column
                prop="partSpecification"
                label="规格"
              ></el-table-column>
              <el-table-column
                prop="partModel"
                label="型号"
              ></el-table-column>
              <el-table-column
                prop="partCode"
                label="编码"
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
                <template v-slot="scope">
                  <span>
                    <a
                      href="#"
                      :title="scope.row.time"
                    >{{
                      $Tools.timeFormat(scope.row.time)
                    }}</a>
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="userName"
                label="处理人"
              ></el-table-column>

              <el-table-column
                prop="description"
                label="处理内容"
              ></el-table-column>
              <el-table-column label="图片">
                <template v-slot="scope">
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
                <template v-slot="scope">
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
                <template v-slot="scope">
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
          >确认</button>
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
    DealingUserName: '',
  },
  data() {
    return {
      DateTime: DateTime,
      workFlow: [], //流程
      partInOut: [], //物资
      model: {}, //获取记录详情
      photoIdImg: '',
      ImageGetImg: this.$api.ImageGetImg,
      form: {
        content: '',
        sDepartmentId: '',
        schedulingDepartment: '',
      },
      sDepartmentData: [],
    }
  },
  mounted() {
    this.DepartmentGetAllList()
    this.chakanLog()
  },
  methods: {
    removeUser() {
      this.addTc('removeUser')
    },

    async DepartmentGetAllList() {
      const GetDepartment = await this.$api.MMS.Department.Get({})
      //获取所有部门
      if (GetDepartment.ok) {
        this.sDepartmentData = this.getTreeData(GetDepartment.data)
      }
    },
    getTreeData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].children && data[i].children.length == 0) {
          // children若为空数组，则将children设为undefined
          data[i].children = undefined
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children)
        }
      }
      return data
    },
    async sDepartmentChane(name) {
      //所属部门change事件
      let res = ''
      for (var i = 0; i < name.length; i++) {
        res = name[i].name

        this.form.sDepartmentId = name[i].id
      }

      if (res == this.form.schedulingDepartment) {
        return
      }
      this.form.schedulingDepartment = res
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
      const resPart = await this.$api.MMS.WorkOrder.WorkOrderGetWorkOrderPart({
        no: this.no,
      })
      const resWork = await this.$api.MMS.WorkOrder.EquipmentGetRepairOrderWork(
        {
          no: this.no,
        }
      )

      if (res.ok) {
        this.WorkFlowGetVideoName([res.data])
        this.model = res.data //获取记录详情
        this.form.sDepartmentId = this.model.dealDepartmentId //部门id
        this.form.schedulingDepartment = this.model.dealDepartmentName
        this.FileGetThumbnailImg(this.model.photoId)
        this.WorkFlowGetVideoName(resWork.data)
        this.workFlow = resWork.data
        this.partInOut = resPart.data
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
