<!--排班管理-->
<template>
  <div class="craftingassistance">
    <div class="shiftClass_right_margin">
      <div class="scheduling">
        <div class="scheduling_top">
          <div class="scheduling_top_left">
            <ul class="scheduling_top_left_list">
              <li>
                <span>月份：</span>
                <el-date-picker
                  v-model="areaTime"
                  type="month"
                  placeholder="选择日期"
                  value-format="yyyy-MM"
                ></el-date-picker>
              </li>
              <li>
                <span>部门：</span>
                <el-cascader
                  :show-all-levels="false"
                  v-model="schedulingDepartment"
                  :options="sDepartmentData"
                  :props="{
                    expandTrigger: 'hover',
                
                    checkStrictly: true
                  }"
                  @change="sDepartmentChane(schedulingDepartment)"
                  placeholder="请选择"
                >
                  <template slot-scope="{node,  data }">
                    <span disabled>{{ node.label }}</span>
                    <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                  </template>
                </el-cascader>
              </li>
              <li>
                <el-button
                  type="success"
                  size="mini"
                  @click="ShiftGetShiftList()"
                >查询</el-button>
              </li>
            </ul>
          </div>
          <div class="scheduling_top_right">
            <ul class="scheduling_top_right_list" v-if="$Tools.accessControl(
              this.$store.state.userGetUserRole.resList,
              'EditShiftmanage'
            )
              ">
              <li>
                <button
                  @click="schedulingEditor()"
                  v-show="shiftListMangent != ''"
                >
                  调班
                </button>
              </li>
              <li>
                <!-- <button class="oragen">导入</button> -->
              </li>
              <!-- <li>
                <button
                  class="blue_button"
                  @click="ShiftExportList()"
                  v-show="shiftListMangent != ''"
                >
                  导出
                </button>
              </li> -->
            </ul>
          </div>
        </div>
        <div class="scheduling_center">
          <table
            border="1"
            frame="box"
          >
            <thead>
              <tr>
                <th
                  v-show="xinqinArr != ''"
                  style="width:50px"
                >姓名</th>
                <th
                  style="width:34px"
                  v-for="(item, index) in xinqinArr"
                  :key="index"
                >
                  {{ index + 1 }}
                  <br />
                  {{ xinqinArr[index] }}
                </th>
              </tr>
            </thead>

            <tr
              v-for="(item, index) in shiftListMangent"
              :key="index"
            >
              <td style="width:36px;height: 36px;">{{ item.key.name }}</td>
              <td
                v-show="i < xinqinArr.length"
                v-for="(value, i) in item.value"
                :key="i"
              >
                {{ item.value[i] ? item.value[i].name : '' }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <!-- 编辑排班 -->
    <div
      class="Shift_scheduling_tanchuang_ying"
      v-if="schedulingEditorShow"
    >
      <div class="tanchuang">
        <div class="tanchuang_bg">
          <div class="tanchuang_top">
            <img
              :src="require('@/assets/image/index/partial_left.png')"
              alt
            />
            <span class="top_title">调班</span>

            <img
              :src="require('@/assets/image/index/partial_right.png')"
              alt
            />
          </div>
          <div
            class="tanchuang_center"
            v-if="
              $Tools.accessControl(
                this.$store.state.userGetUserRole.resList,
                'EditShiftmanage'
              )
            "
          >
            <div class="tanchuang_center_cen">
              <div class="scheduling_tanchuang_center_cen_top">
              
                <el-form
                  :model="form"
                  :rules="rules"
                  :inline="true"
                  ref="forms"
                >
                  <el-form-item
                    label="调班人1:"
                    prop="userNo1"
                  >
                    <el-select
                      v-model="form.userNo1"
                      filterable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.key.no"
                        :label="item.key.name"
                        :value="item.key.no"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="调班人1工作时间:"
                    prop="date1"
                  >
                    <el-date-picker
      v-model="form.date1"
      type="date"
      
      placeholder="选择日期">
    </el-date-picker>
                  </el-form-item>
                    <el-form-item
                    label="调班人2:"
                    prop="userNo2"
                  >
                    <el-select
                      v-model="form.userNo2"
                      filterable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.key.no"
                        :label="item.key.name"
                        :value="item.key.no"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                   <el-form-item
                    label="调班人2工作时间:"
                    prop="date2"
                  >
                    <el-date-picker
      v-model="form.date2"
      
      type="date"
      placeholder="选择日期">
    </el-date-picker>
                  </el-form-item>
                </el-form>
                <!-- </div> -->
              </div>
              <div class="tanchuang_center_cen_bottom">
                <button
                  @click="ShiftEditShift()"
                  v-preventReClick="2000"
                >确认</button>
                <button @click="schedulingEditorShow = false">取消</button>
              </div>
            </div>
          </div>
          <div
            class="tanchuang_center"
            v-else
          >没有权限！！</div>
        </div>
        <div
          class="cancel"
          @click="schedulingEditorShow = false"
        >
          <img
            :src="require('@/assets/image/index/cancel.png')"
            alt
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
        return {
            rules: {
                 userNo1: [
            { required: true, message: '请选择调班人1', trigger: 'change' }
          ],
                userNo2: [
            { required: true, message: '请选择调班人2', trigger: 'change' }
          ],
             date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
        },
      form: {
        date1: '',
        userNo1: '',
        date2: '',
        userNo2: '',
      },
      options: [],
      Department: '请选择', //所属部门：
      DepartmentData: [], //所属部门数据：
      DepartmentId: '',
      shiftManagementData: [], //班次管理控制器--获取列表
      areaTime: '', //选择月份
      schedulingDepartment: '请选择', //所属部门：
      sDepartmentData: [], //所属部门数据：
      sDepartmentId: 0,
      shiftListMangent: [],
      xinqinArr: [], //星期
      schedulingEditorShow: false,
      VUE_APP_UPLOAD_URL: '',
    }
  },

  created() {},
  mounted() {
    this.DepartmentGetAllList() //获取所属部门
    this.VUE_APP_UPLOAD_URL = window.ApiBaseURL
    this.ShiftClassGetList() //班次管理控制器--获取列表
    this.sameMonth()
  },
  destroyed() {},
  computed: {
    headers() {
      return {
        Token: this.$store.state.token,
        // 'Content-Type': 'application/x-www-form-urlencoded'
        'Content-Type': 'multipart/form-data',
      }
    },
  },
  methods: {
    sameMonth() {
      //获取当前月份
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth()
      var toMonth = year + '-' + (month + 1)
      this.areaTime = toMonth
    },
    async ShiftExportList() {
      //导出排班管理
      this.$axios
        .get(`${this.VUE_APP_UPLOAD_URL}api/Shift/ExportList`, {
          headers: {
            Token: this.$store.state.token,
          },
          responseType: 'blob',
          params: {
            depId: this.sDepartmentId,
            month: this.areaTime,
          },
        })
        .then(function (response) {
          var blob = new Blob([response.data])
          var a = document.createElement('a')
          a.download = '排班管理报表.xlsx'
          a.style.display = 'none'
          a.href = URL.createObjectURL(blob)
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        })
        .catch(function (error) {})
      //导出电表报表
    },

      async ShiftEditShift() {
          if (this.form.userNo1 == this.form.userNo2) {
              this.$Tools.LayerMsgErr('调班人重复！！')
            return 
        }
       this.$refs['forms'].validate( async(valid) => {
          if (valid) {
             const res = await this.$api.MMS.Shift.AdjustShift({
       date1: this.$moment(this.form.date1).format('YYYY-MM-DD'),
        userNo1: this.form.userNo1,
        date2: this.$moment(this.form.date2).format('YYYY-MM-DD'),
        userNo2: this.form.userNo2,
      })
      if (res.ok) {
        this.schedulingEditorShow = false

        this.ShiftGetShiftList()
      }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
     
    },
    chiftitemChange(e, item, index) {
      var bcType = e.target.value
      if (e.target.value == false) {
        bcType = 0
      }

      var chiftArr = []
      var itemObj = {}
      ;(itemObj.key = item.key.no),
        (itemObj.value = [
          {
            key: this.areaTime + '-' + (index + 1), //具体日期
            value: bcType, //班次id
          },
        ])

      this.$store.commit('setShiftObj', itemObj)
    },

    schedulingEditor() {
      //排班管理
      this.schedulingEditorShow = true
      let empty = [] //编辑前清空排班管理列表
      this.$store.commit('setShiftArr', empty)
    },
    async ShiftClassGetList() {
      //班次管理控制器--获取列表
      const res = await this.$api.MMS.ShiftClass.GetList({})

      if (res.ok) {
        this.shiftManagementData = res.data //
      }
    },

    async DepartmentGetAllList() {
      const GetDepartment = await this.$api.MMS.Department.Get({})
      //获取所有部门
      if (GetDepartment.ok) {
        // let arr4 = JSON.parse(JSON.stringify(GetDepartment.data))
        //  if(this.$store.state.EnergyClick == '排班管理'){
        this.sDepartmentData = GetDepartment.data
        console.log(this.sDepartmentData)
        // this.sDepartmentId = this.sDepartmentData[0].id //部门id
        // this.schedulingDepartment = this.sDepartmentData[0].name

        // }
        // this.DepartmentData = this.getTreeData(arr4) //递归数据
      }
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
    DepartmentChane(name) {
      //所属部门change事件
      let res = ''
      for (var i = 0; i < name.length; i++) {
        res = name[i].name + '/' + name[i].name
        this.DepartmentId = name[i].id
      }

      if (this.Department === res) {
        return this.Department
      } else {
        this.Department = res
      }
    },
    async sDepartmentChane(name) {
      //排班管理
      //所属部门change事件

      this.sDepartmentId = name[name.length - 1]
      //  console.log(name);
      // idDep
      // console.log(this.sDepartmentData);
      //所属部门change事件
      // let res = ''
      for (var i = 0; i < this.sDepartmentData.length; i++) {
        if (this.sDepartmentData[i].name == name) {
          console.log(this.sDepartmentData[i].value)
          this.schedulingDepartment = this.sDepartmentData[i].label
        }
      }

      // let res = ''
      // for (var i = 0; i < name.length; i++) {
      //   res = name[i].name

      //   this.sDepartmentId = name[i].id
      // }

      // if (res == this.schedulingDepartment) {
      //   return
      // }
      // this.schedulingDepartment = res
    },
    async ShiftGetShiftList() {
      if (!this.areaTime) {
        this.$Tools.LayerMsgErr('请选择日期')
      }
      //排班管理
      const sDepar = await this.$api.MMS.Shift.GetShiftList({
        month: this.areaTime,
        depId: this.sDepartmentId,
      })
      if (sDepar.ok) {
        this.options = sDepar.data
        console.log(sDepar.data)
        if (sDepar.data.length == 0) {
          this.$Tools.LayerMsgErr('无数据')
          this.xinqinArr = []
          this.shiftListMangent = sDepar.data //获取排班管理数据
          return
        }
        this.shiftListMangent = sDepar.data //获取排班管理数据
        let yue = this.areaTime
        var totalDay = this.mGetDate(yue) //获取天数
        var firstMonthDate = ''
        var zj = ''
        const xinqinArr = []
        var weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        for (var i = 1; i <= totalDay; i++) {
          firstMonthDate = new Date(yue + '-' + i)
          zj = weekDays[firstMonthDate.getDay()]
          xinqinArr.push(zj)
        }
        this.xinqinArr = xinqinArr
      }
    },
    //字符串转日期格式，strDate要转为日期格式的字符串
    getToStringDate(strDate) {
      var date = eval(
        'new Date(' +
          strDate
            .replace(/\d+(?=-[^-]+$)/, function (a) {
              return parseInt(a, 10) - 1
            })
            .match(/\d+/g) +
          ')'
      )
      return date
    },
    mGetDate(yue) {
      //传递年月返回月份的天数

      var year = this.getToStringDate(yue).getFullYear()
      var month = this.getToStringDate(yue).getMonth()
      var d = new Date(year, month, 0)
      return d.getDate()
    },

    tableRowClassName({ row, rowIndex }) {
      //背景色
      if (rowIndex % 2 == 1) {
        return 'warning-row' //基数
      } else {
        return 'success-row' //偶数
      }
      return ''
    },
  },
}
</script>
<style >
input.el-input__inner {
    background: transparent !important;
     color: #fff !important;
}
</style>
<style lang="scss" scoped>
@import '../OnDuty/styles/Shift.scss';
</style>
<style lang="scss" scoped>

.el-form-item{
    width: 40% !important;
}
.el-form-item__label{
    color: #Fff !important;
}

.Shift_scheduling_tanchuang_ying {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;

  .tanchuang {
    width: 100%;
    height: 90%;
    text-align: center;
    // position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .tanchuang_bg {
      width: 90vw;
      height: 80vh;
      background: url('~@/assets/image/index/tanchuan.png') no-repeat;
      background-size: 100% 100%;
      .tanchuang_top {
        .top_title {
          font-size: 22px;
          font-family: MicrosoftYaHei;
          font-weight: bold;
          color: #00f0ff;
          height: 5vh;
          line-height: 5vh;
          margin: 0 5px;
        }
        .margin_tc {
          margin: 0 0.3vw;
        }
        > img {
          vertical-align: baseline;
          height: 12px;
          width: 22px;
        }
      }

      .tanchuang_center {
        margin: 2vh 2vw;
        .tanchuang_center_cen {
          margin-top: 15vh;

          //排班管理
          .scheduling_tanchuang_center_cen_top {
            .scheduling_list_top {
              ul {
                display: flex;
                justify-content: center;
                li {
                  margin: 0 20px;
                  span {
                    font-size: 18px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
                    color: #00f0ff;
                  }
                }
              }
              .beizhu {
                text-align: left;
                margin: 15px 0;
                font-size: 18px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: #00f0ff;
              }
            }
            .scheduling_list_center {
              width: 100%;
              margin-top: 15px;
              height: 100%;
              height: 53vh;
              overflow: auto;
              table {
                width: 100%;

                text-align: center;
                border-color: rgba(0, 216, 255, 0.5) !important;
                tr {
                  th {
                    width: 100px;
                  }
                  td {
                    width: 100px;

                    select {
                      background: linear-gradient(
                        90deg,
                        rgba(0, 104, 183, 0.2),
                        rgba(0, 104, 183, 0.6)
                      );
                      font-size: 14px;
                      font-family: MicrosoftYaHei;
                      font-weight: 400;

                      color: #fff;
                      .select_aqua {
                        //  opacity: 0.6;
                        background: rgba(0, 0, 0, 1);
                        color: #fff;
                      }
                    }
                  }
                }
              }
            }
          }
          .tanchuang_center_cen_bottom {
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
    .cancel {
      img {
        cursor: pointer;
        width: 44px;
      }
    }
  }
}
 
</style>
