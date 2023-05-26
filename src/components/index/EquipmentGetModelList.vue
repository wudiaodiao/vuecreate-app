<!--
 * @Author: your name
 * @Date: 2020-11-25 19:55:23
 * @LastEditTime: 2022-02-18 11:54:36
 * @LastEditors: Please set LastEditors
 * @Description: 查看设备
 * @FilePath: \ibms\src\components\index\EquipmentGetModelList.vue
-->
<template>
  <div>
    <div class="chakan">
      <div class="chakan_center">
        <div class="add_dianh_list_top">
          <ul>
            <li
              :class="[addSheName == addshe.name ? 'Bborder' : '']"
              v-for="addshe in addsheb"
              :key="addshe.id"
            >
              <span @click="addsheClick(addshe.name)">{{ addshe.name }}</span>
            </li>
          </ul>
        </div>
        <div
          class="chakan_center_list_bottom"
          v-if="addSheName == '基本信息'"
        >
          <div class="session">
            <div class="session_left">
              <ul>
                <li>
                  <span>名称：</span>
                  <span>{{ EquipmentGetModelList.model.name }}</span>
                </li>
                <li>
                  <span>编码：</span>
                  <span>{{ EquipmentGetModelList.model.code }}</span>
                </li>
                <li>
                  <span>主设备：</span>
                  <span @click="addTc('chakanLog123', EquipmentGetModelList.model); EquipmentGetModelNo = EquipmentGetModelList.model.parentNo; getEquipmentGetModel();EquipmentRepairOrderList()" class="div">{{ EquipmentGetModelList.model.parentName }}</span>
                </li>
                <li>
                  <span>类别：</span>
                  <span>{{ EquipmentGetModelList.model.typeName }}</span>
                </li>
                <li>
                  <span>地点：</span>
                  <span>{{ EquipmentGetModelList.model.areaName }}</span>
                </li>
                <li>
                  <span>安装位置：</span>
                  <span>{{ EquipmentGetModelList.model.installPosition }}</span>
                </li>
                <li>
                  <span>型号：</span>
                  <span>{{ EquipmentGetModelList.model.model }}</span>
                </li>
                 <li>
                  <span>使用年限：</span>
                  <span>{{ EquipmentGetModelList.model.usefulLife }}</span>
                </li>
                 <li>
                  <span>质保期：</span>
                  <span>{{ EquipmentGetModelList.model.warranty }}</span>
                </li>
                 <li>
                  <span>使用日期：</span>
                  <span>{{ $Tools.timeFormat2(EquipmentGetModelList.model.purchaseDate) }}</span>
                </li>
                <li>
                  <span>出厂日期：</span>
                  <span>{{  $Tools.timeFormat2(EquipmentGetModelList.model.startDate)  }}</span>
                </li>
                <li>
                  <span>安装日期：</span>
                  <span>{{ $Tools.timeFormat2(EquipmentGetModelList.model.installDate) }}</span>
                </li>
                <li>
                  <span>下一个年检日期：</span>
                  <span>{{ $Tools.timeFormat2(EquipmentGetModelList.model.nextYearlyDate) }}</span>
                </li>
                 <li>
                  <span>预警周期(天)</span>
                  <span>{{ EquipmentGetModelList.model.threshold }}</span>
                </li>
                 <li>
                  <span>品牌</span>
                  <span>{{ EquipmentGetModelList.model.brand }}</span>
                </li>
                <li>
                  <span>厂商：</span>
                  <span>{{ EquipmentGetModelList.model.manufactor }}</span>
                </li>
                <li>
                  <span>状态：</span>
                  <span>{{ EquipmentGetModelList.model.state }}</span>
                </li>
                <li>
                  <span>说明书：</span>
                  <span @click="fileUp()">
                    <a
                      style="text-decoration:underline;"
                      href="javascript:;"
                      :title="
                        EquipmentGetModelList.model.manualOriginalFileName
                      "
                    >
                      {{ EquipmentGetModelList.model.manualOriginalFileName }}
                    </a>
                  </span>
                </li>
                <li>
                  <span>扩展属性：</span>
                </li>

                <li
                  v-for="ModelListitem in EquipmentGetModelList.property"
                  :key="ModelListitem.propertyKey"
                >
                  <span>{{ ModelListitem.propertyKey }}</span>
                  <span>{{ ModelListitem.propertyValue }}</span>
                </li>

                <li>
                  <span>运行参数：</span>
                </li>

                <li
                  v-for="(yuanxing, inde) in runParam"
                  :key="inde"
                >
                  <span></span>
                  <span>
                    {{ yuanxing.name + ' :' }}
                    <a
                      href="javascript:;"
                      :class="yuanxing.isAlarm ? 'redFont' : ''"
                      :title="yuanxing.text"
                    >{{ yuanxing.text }}</a>
                  </span>
                </li>
              </ul>
            </div>
            <div class="session_right">
              <div class="center_right_ptot">
                <img
                  :src="photoIdImg"
                  v-if="photoIdImg != ''"
                  alt="头像"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="chakan_center_list_bottom"
          v-else-if="addSheName == '维修记录'"
        >
          <div class="div_table">
            <el-table
              :data="sessionJiLData.list"
              :key="isUpdate"
              style="width: 100%"
              :row-class-name="tableRowClassName"
            >
              <el-table-column
                show-overflow-tooltip
                prop="id"
                label="工单号"
              >
              </el-table-column>
              <!-- <el-table-column
                show-overflow-tooltip
                prop="subject"
                label="主题"
              ></el-table-column> -->
              <el-table-column
                show-overflow-tooltip
                prop="reportTime"
                label="报单时间"
              >
                <template v-slot="scope">
                  <span>
                    {{ $Convert.getTime(scope.row.reportTime) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="dealUserName"
                label="处理人"
                width="80px"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="state"
                label="工单状态"
                width="100px"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="查看"
                width="50px"
              >
                <template v-slot="scope">
                  <span
                    class="editing_green"
                    @click="addTc('chakanLog', scope.row.no)"
                  >查看</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div
          class="chakan_center_list_bottom"
          v-else-if="addSheName == '保养记录'"
        >
          <div class="div_table">
            <el-table
              :data="sessionJiLData.list"
              style="width: 100%"
              :row-class-name="tableRowClassName"
            >
              <el-table-column
                prop="id"
                label="工单号"
                
                show-overflow-tooltip
              >
              </el-table-column>
              <!-- <el-table-column
                show-overflow-tooltip
                prop="subject"
                label="主题"
              ></el-table-column> -->

              <el-table-column
                show-overflow-tooltip
                prop="reportTime"
                label="报单时间"
              >
                <template v-slot="scope">
                  <span>
                    {{ $Convert.getTime(scope.row.reportTime) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="dealUserName"
                label="处理人"
                width="80px"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="state"
                width="120px"
                label="工单状态"
              >
                <template v-slot="scope">

                  <span>
                    {{$Convert.WorkOrder.State(scope.row.state)}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="查看"
                width="50px"
              >
                <template v-slot="scope">
                  <span
                    class="editing_green"
                    @click="addTc('chakanLog', scope.row.no)"
                  >查看</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="div_table_footer">
            <div class="fenye">
              <el-pagination
                hide-on-single-page
                @current-change="CurrentLog"
                :page-size="pageSize"
                :pager-count="11"
                layout="prev, pager, next"
                :total="sessionJiLData.total"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    EquipmentGetModelNo: '',
    preNo:''
  },
  watch: {
    EquipmentGetModelNo(newVal,old) {
      console.log(123, newVal, old);
    
         this.EquipmentGetModelNo=newVal
      this.getEquipmentGetModel()
      this.EquipmentRepairOrderList()
      
     
    },
    preNo(newVal,old) {
      console.log(123, newVal, old);
    
         this.EquipmentGetModelNo=newVal.no
      this.getEquipmentGetModel()
      this.EquipmentRepairOrderList()
      
     
    },
    immediate: true,
    deep:true
  },
 
  data() {
    return {
      isUpdate:false,
      addsheb: [
        { name: '基本信息', id: '0' },
        { name: '维修记录', id: '1' },
        { name: '保养记录', id: '2' },
      ], //选择设备与手动输入
      addSheName: '基本信息',
      addSheId: '0',
      EquipmentGetModel: {},
      sessionJiLData: {}, ////维修记录和保养记录对象
      pageIndex: 1,
      pageSize: 11,
      EquipmentGetModelList: {
        model: {},
        property: [{}],
      },
      runParam: [{}],
      photoIdImg: '',
    }
  },
  
  mounted() {
    this.getEquipmentGetModel()
    this.EquipmentRepairOrderList()
  },
  unmounted() {
    window.runTimer && clearInterval(window.runTimer)
  },
  methods: {
    async fileUp() {
      //下载文件
      // const res = await this.$api.MMS.FileSystem.GetFileSteam({
      //   no: this.selectFileDirectoryNo
      // })
      // if (res) {
      //   let url = window.URL.createObjectURL(new Blob([res]))
      //   let link = document.createElement('a')
      //   link.style.display = 'none'
      //   link.href = url
      //   link.setAttribute('download', this.selectFileOriginalFileName)
      //   document.body.appendChild(link)

      //   link.click()
      // }
      var pos =
        this.EquipmentGetModelList.model.manualOriginalFileName.lastIndexOf('.')
      var imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp']
      var extension = this.EquipmentGetModelList.model.manualOriginalFileName
        .substr(pos)
        .toLowerCase()
        .replace(/(\s*$)/g, '')

      if (imageExtensions.indexOf(extension) == -1) {
        const no = this.EquipmentGetModelList.model.manualNo
        //预下载
        const prepareres = await this.$api.MMS.File.RequestDownloadFile(
          this.EquipmentGetModelList.model.fileId
        )
        let allFileData = []
        if (prepareres.ok) {
          const loading = this.$loading({
            lock: true,
            text: '下载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
          })
          for (let i = 0; i < prepareres.data.count; i++) {
            let file = `?Id=${this.EquipmentGetModelList.model.fileId}&index=${i}`

            //分段下载
            const down = await this.$api.MMS.File.FileDownload(file)
            //合并
            allFileData.push(down)
            if (i == prepareres.data.count - 1) {
              //成功
              let url = window.URL.createObjectURL(new Blob(allFileData))
              let link = document.createElement('a')
              link.style.display = 'none'
              link.href = url
              link.setAttribute(
                'download',
                this.EquipmentGetModelList.model.manualOriginalFileName
              )
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
              loading.close()
            }
          }
        }
      } else {
        const prepareres = await this.$api.MMS.Image.GetOriginalImg(
          this.EquipmentGetModelList.model.fileId
        )
        if (prepareres) {
          let url = window.URL.createObjectURL(new Blob([prepareres]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute(
            'download',
            this.EquipmentGetModelList.model.manualOriginalFileName
          )
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        } else {
          this.$message('图片下载失败')
        }
      }
    },
    async ImageGetThumbnailImg(id) {
      const res = await this.$api.MMS.Image.GetThumbnailImg(id)
      this.photoIdImg = window.URL.createObjectURL(res)
    },
    addsheClick(name) {
      //选择设备与手动输入
      this.addSheName = name
      for (let i in this.addsheb) {
        if (name == this.addsheb[i].name) {
          this.addSheId = this.addsheb[i].id
        }
      }

      switch (name) {
        case '基本信息':
          // return
          break
        case '维修记录':
          return this.EquipmentRepairOrderList()
          break
        case '保养记录':
          return this.EquipmentRepairOrderList() 
          break
        default:
          return
      }
    },
    addTc(type, item) {
      if (type == 'chakanLog') {
      }
      this.$emit('addTc', type, item)
    },
    async CurrentLog(e) {
      this.pageIndex = e
      this.EquipmentRepairOrderList()
    },
    async EquipmentRepairOrderList() {
      //获取设备维修记录、保养记录

      const res = await this.$api.MMS.Equipment.RepairOrderList({
        no:this.EquipmentGetModelNo,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        type: this.addSheId,
      })
      if (res.ok) {
        console.log(res)
        var data = res.data
         this.sessionJiLData = data
        this.isUpdate = !this.isUpdate;
        // for (let i = 0; i < data.list.length; i++) {
        //   let item = data.list[i]
        //   item.state = this.$Convert.WorkOrder.State(item.state)
        // }
       
        console.log(this.sessionJiLData.list);
      }
    },
    getEquipmentGetModel() {
      let _this = this
      this.$api.MMS.Equipment.GetModel({
        no: this.EquipmentGetModelNo,
      }).then((res) => {
        if (res.ok) {
          console.log(res.data)
          res.data.model.state = this.$Convert.Equipment.getEquipmentState(
            res.data.model.state
          )
          _this.EquipmentGetModelList = res.data
          window.runTimer && clearInterval(window.runTimer)
          _this.runParam = []
          if (res.data && res.data.model) {
            window.runTimer = setInterval(() => {
              _this.$api.MMS.Equipment.GetModelRunParam({
                no: res.data.model.no,
              }).then((run) => {
                _this.runParam = run.data.runParam
              })
            }, 3000)
          }
        }
      })
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
.div{
  text-decoration: underline;
  cursor: pointer;
}
.chakan {
  text-align: left;
  .chakan_center {
    margin: 12px 24px;
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

    .chakan_center_list_bottom {
      box-sizing: border-box;
      height: 430px;
      overflow: auto;
      .session {
        display: flex;
        margin-top: 25px;

        .session_left {
          width: 450px;
          .redFont {
            color: red !important;
          }
          > ul {
            margin: 0 30px;
            > li {
              margin-top: 10px;
              display: flex;
              justify-content: start;
              text-align: left;
              height: 2.5vh;
              > span,
              a {
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
              :nth-child(1) {
                width: 150px;
              }
            }
          }
        }
        .session_right {
          flex: 1;
          position: relative;
          width: 100%;
          .center_right_ptot {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            img {
              width: 168px;
              height: 168px;
            }
          }
        }
      }
      .div_table {
        .editing_green {
          color: #ffd904;
          cursor: pointer;
        }
      }
      .div_table_footer {
        .fenye {
          display: flex;
          justify-content: center;
        }
      }
    }
  }
}
</style>
