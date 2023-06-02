<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-02-18 16:42:19
 * @LastEditors: Please set LastEditors
 * @Description: 系统日历
 * @FilePath: \ibms\src\views\Event\components\attendanceStatistics.vue
-->

<template>
  <div class="ControlCalendar">
    <div class="schematicRestraint public_body">
      <div :class="[
        'schematicRestraint_center',
          'public_page',
          authStore.dtab ? 'index_off' : 'index_no'
        ]">
        <!-- 日历 -->
        <div class="kongz_rili">
          <div class="kongz_list_margin">
            <div class="rili_zong">
              <div class="rili_top">
                <div class="rili_top_cneter">
                  <div class="timer">
                    <i
                      class="el-icon-caret-left"
                      @click="leftRili(rili.year)"
                    ></i>
                    <span>{{ rili.year }}年{{ Month }}月</span>
                    <i
                      class="el-icon-caret-right"
                      @click="RightRili(rili.year)"
                    ></i>
                  </div>
                  <span
                    class="pilian"
                    v-if="
                      this.$Tools.accessControl(
                        authStore.userGetUserRole.resList,
                        'EditControlCalendar'
                      )
                    "
                  >
                    <span
                      class="pilian_right"
                      @click="clickControlpl('pilian')"
                    >批量设置</span>
                  </span>
                </div>
              </div>
              <div class="rili_center">
                <table
                  border="1"
                  frame="box"
                >
                  <thead>
                    <tr>
                      <th>周日</th>
                      <th>周一</th>
                      <th>周二</th>
                      <th>周三</th>
                      <th>周四</th>
                      <th>周五</th>
                      <th>周六</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(items, KEY) in rili.datas">
                      <tr :key="KEY">
                        <td
                          :class="[item.date == '' ? 'jingz' : 'yunx']"
                          v-show="Month == KEY + 1"
                          :key="indes"
                          v-for="(item, indes) in items"
                          @click="clickControlRl('danxuan', item)"
                        >
                          <div>{{ changeDate(item.date) }}</div>
                          <i
                            v-for="(rileItem, rilikey) in riliDatalist"
                            :key="rilikey"
                          >
                            <div
                              v-for="(rileItemss, rilikeyss) in rileItem"
                              :key="rilikeyss"
                              v-show="item.day == rilikey + 1"
                            >
                              <span v-if="item.day == rilikey + 1">
                                <span>{{ rileItemss.name }}&nbsp;</span>
                                <i>{{ rileItemss.beginTime }}</i>
                                至
                                <i>{{ rileItemss.endTime }}</i>
                              </span>
                              <!-- <i>{{items[indes+1]}}</i> -->
                            </div>
                          </i>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 日历弹窗 -->
      <div
        class="tanchuang_ying"
        v-if="clickControlShow"
      >
        <div class="tanchuang">
          <div class="tanchuang_bg">
            <div class="tanchuang_top">
              <img
                src="../../assets/image/index/partial_left.png"
                alt
              />
              <span class="top_title">编辑系统日历</span>
              <img
                src="../../assets/image/index/partial_right.png"
                alt
              />
            </div>
            <div
              class="tanchuang_center"
              v-if="
                this.$Tools.accessControl(
                  authStore.userGetUserRole.resList,
                  'EditControlCalendar'
                )
              "
            >
              <div class="rili_tangchuang_cen">
                <div class="tanchuang_center_cen_top formValidator">
                  <div class="tanchuang_center_cen_top_margin">
                    <!-- 2020年09月08日 -->
                    <span v-show="Rltype == 'danxuan'">日期:{{ YMD }}</span>
                    <div v-show="Rltype == 'pilian'">
                      <el-form
                        :model="formValidator"
                        ref="formValidator"
                        label-width="100px"
                        class="demo-dynamic"
                        :rules="rules"
                      >
                      
                        <el-form-item prop="piliancelect">
                          <div class="block">
                            <span class="demonstration">日期:</span>
                            <el-date-picker
                              v-model="formValidator.piliancelect"
                              type="daterange"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              
                            ></el-date-picker>
                            <span>*</span>
                          </div>
                        </el-form-item>
                        <el-form-item prop="riliSelect">
                          <div class="demonstration_box">
                            <span class="demonstration">
                              范围:
                              <el-select
                                v-model="formValidator.riliSelect"
                                placeholder="请选择"
                              >
                                <el-option
                                  v-for="item in options"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.name"
                                ></el-option>
                              </el-select>
                              <span>*</span>
                            </span>
                          </div>
                        </el-form-item>
                      </el-form>
                    </div>
                  </div>

                  <div class="mode_kongz">
                    <span>选择模式控制</span>
                  </div>
                  <div class="transfer_select">
                    <div>
                      <el-transfer
                        v-model="selectMode"
                        :data="data"
                      ></el-transfer>
                    </div>
                  </div>
                </div>

                <div class="tanchuang_center_cen_bottom">
                  <button
                    @click="
                      Rltype == 'danxuan'
                        ? selectModebtn()
                        : SetDayRangeMode('formValidator')
                    "
                    v-preventReClick="2000"
                  >
                    确认
                  </button>
                  <button @click="clickControlShow = false">取消</button>
                </div>
              </div>
            </div>
            <div
              v-else
              class="emp"
            >无权限</div>
          </div>
          <div
            class="cancel"
            @click="clickControlShow = false"
          >
            <img
              src="../../assets/image/index/cancel.png"
              alt
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/index'
const authStore = useAuthStore()
</script>
<script>
import DateTime from '@/js/datetime'

export default {
  data() {
    return {
      DateTime: DateTime,
      formValidator: {
        piliancelect: [],
        riliSelect: '',
      },
      rules: {
        piliancelect: [
          { required: true, message: '请选择时间', trigger: 'change' },
        ],
        riliSelect: [
          { required: true, message: '请选择范围', trigger: 'change' },
        ],
      },
      data: [],
      selectMode: [],
      //模式控制列表项
      ControlModeItemData: [],

      options: [
        {
          name: '全部',
          id: 1,
        },
        {
          name: '工作日',
          id: 2,
        },
        {
          name: '周末',
          id: 3,
        },
      ],
      modeNo: 0,
      //日历
      clickControlShow: false,
      Rltype: 'danxuan',
      Month: this.GetMonthsss() - 0,
      year: new Date().getFullYear(),
      rili: {
        year: new Date().getFullYear(),
        datas: [],
      },
      riliDatalist: [],
      Day: '', //日期
      YMD: '',

      showCard: false,
    }
  },
  mounted() {
    this.formValidator.piliancelect = [
      DateTime.thisMonth().format("yyyy-MM-dd"),
      DateTime.thisMonth().addDate(0, 1, 0).format("yyyy-MM-dd"),
    ]
    this.ControlModeGetList() //模式控制列表
    this.GetYear()
    this.rili.datas = this.getMonth(this.rili.year)
    this.ControlModeGetCalendarList() //获取日历列表
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
            return this.valueType1
            break
          case 2:
            return this.valueType2
            break
          case 3:
            return this.valueType3
            break
          case 4:
            return this.valueType4
            break
          default:
            return
        }
      }
    },
    returnriliSelect: function () {
      return function (type) {
        //计算属性传参
        //根据不同的类型返回不同的值
        switch (type) {
          case '全部':
            return 1
            break
          case '工作日':
            return 2
            break
          case '周末':
            return 3
            break
          default:
            return
        }
      }
    },
  },
  watch: {
    // 'rili.year': {
    //   handler: function () {
    //     this.$nextTick(function () {
    //       this.getMonth()
    //     })
    //   },
    // },
  },
  methods: {
    async SetDayRangeMode(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid && this.selectMode.length > 0) {
          //获取时间、截取时分、转化为24小时制度

          let start = this.$moment(this.formValidator.piliancelect[0]).format(
            'YYYY-MM-DD HH:mm'
          )
          let end = this.$moment(this.formValidator.piliancelect[1]).format(
            'YYYY-MM-DD HH:mm'
          )
          const res = await this.$api.MMS.ControlMode.SetDayRangeMode({
            startTime: start,
            endTime: end,
            range: this.returnriliSelect(this.formValidator.riliSelect),
            modeNo: this.selectMode,
          })
          if (res.ok) {
            this.clickControlShow = false
            this.ControlModeGetCalendarList()
          }
        } else {
          if (this.selectMode.length > 0) {
          } else {
            this.$Tools.LayerMsgErr('请选择模式控制')
          }

          return false
        }
      })
    },
    async selectModebtn() {
      //单选
      const res = await this.$api.MMS.ControlMode.SetDayMode({
        day: this.YMD,
        modeNo: this.selectMode,
      })
      if (res.ok) {
        this.clickControlShow = false
        this.ControlModeGetCalendarList()
      }
    },
    async ControlModeGetCalendarList() {
      //获取日历列表
      this.riliDatalist = []

      const res = await this.$api.MMS.ControlMode.GetCalendarList({
        month: this.rili.year + '-' + this.Month,
      })
      if (res.ok) {
        this.riliDatalist = res.data
        let begin = []
        let end = []
        let beginTime = 0
        let endTime = 0
        this.riliDatalist.forEach((item, i) => {
          item.forEach((model, it) => {
            begin = model.beginTime.split(':')
            beginTime = begin[0] + begin[1] - 0
            end = model.endTime.split(':')
            endTime = end[0] + end[1] - 0
            if (beginTime > endTime) {
              var beginEnd = '00:00'
              if (i != this.riliDatalist.length - 1) {
                var tmp = JSON.parse(JSON.stringify(model)) //深拷贝
                tmp.IsMove = true ///配置一个展示项
                tmp.beginTime = beginEnd
                this.riliDatalist[i + 1].push(tmp)
              }
              this.riliDatalist[i][it].endTime = beginEnd
            }
          })
        })
        //每个月都会多一天存上个月底跨天的数据、处理完后把它移除
        this.riliDatalist.splice(0, 1)
      }
    },
    getMonth(year) {
      var year = year || 2018
      var dayMseconds = 86400000
      var monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      var resultArr = []

      function isRun() {
        //判断是否是闰年
        if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
          return true
        } else {
          return false
        }
      }

      var run = isRun()
      for (var m = 1; m < 13; m++) {
        var arr = []
        var firstday = new Date(year + '-' + m + '-01').getTime() //拿到时间戳
        var lastday = 30
        var weekDay = new Date(firstday).getDay() //根据时间戳，拿到本月第一天的星期
        var weekLastDay = weekDay + 31 //拿到本月最后一天的星期
        switch (m) {
          case 2:
            if (run) {
              lastday = new Date(year + '-' + m + '-29').getTime()
              weekLastDay = weekDay + 29
            } else {
              lastday = new Date(year + '-' + m + '-28').getTime()
              weekLastDay = weekDay + 28
            }
            break
          case 4:
            lastday = new Date(year + '-' + m + '-30').getTime()
            weekLastDay = weekDay + 30
            break
          case 6:
            lastday = new Date(year + '-' + m + '-30').getTime()
            weekLastDay = weekDay + 30
            break
          case 9:
            lastday = new Date(year + '-' + m + '-30').getTime()
            weekLastDay = weekDay + 30
            break
          case 11:
            lastday = new Date(year + '-' + m + '-30').getTime()
            weekLastDay = weekDay + 30
            break

          default:
            lastday = new Date(year + '-' + m + '-31').getTime() //拿到时间戳
            weekLastDay = weekDay + 31
            break
        }

        var n = 0
        for (var i = 0; i < 42; i++) {
          var ss
          var content = { date: '', class: '' }
          if (i < weekDay || i > weekLastDay - 1) {
            arr.push(content)
          } else {
            n++
            arr.push({
              day: new Date(firstday + dayMseconds * n - dayMseconds).getDate(),
              date: firstday + dayMseconds * n - dayMseconds,
              class: '',
            })
          }
        }
        resultArr.push(arr)
      }
      return resultArr
      // document.getElementById('box').innerHTML = JSON.stringify(arr);
    },
    leftRili(year) {
      //左侧点击
      this.Month--
      if (this.Month != 0) {
        this.ControlModeGetCalendarList()
      }

      if (this.Month < 1) {
        this.Month = 12

        this.rili.year = year - 1
        this.ControlModeGetCalendarList()
        this.rili.datas = this.getMonth(year - 1)
      }
    },
    RightRili(year) {
      //左侧点击
      this.Month++
      if (this.Month != 13) {
        this.ControlModeGetCalendarList()
      }
      if (this.Month > 12) {
        this.Month = 1
        this.rili.year = year + 1
        this.ControlModeGetCalendarList()
        this.rili.datas = this.getMonth(year + 1)
      }
    },
    GetMonthsss() {
      var now = new Date()
      var month = now.getMonth() + 1 //年
      month = month < 10 ? '0' + month : month
      this.Month = month
      return month
    },
    GetYear() {
      var now = new Date()
      var year = now.getFullYear() //年
      this.year = year

      return year
    },
    changeDate: function (dates) {
      if (dates) {
        let date = new Date(dates)
        let y = date.getFullYear()
        let MM = date.getMonth() + 1
        MM = MM < 10 ? '0' + MM : MM
        let d = date.getDate()
        d = d < 10 ? '0' + d : d
        this.Day = d
        return y + '-' + MM + '-' + d + ' '
        // return new Date(date).getDate()
      } else {
        return ''
      }
    },

    //批量设置
    clickControlpl(type) {
      this.Rltype = type
      this.selectMode = []
      this.clickControlShow = true
    },
    //日历
    clickControlRl(type, item) {
      this.Rltype = type
      this.YMD = this.changeDate(item.date) //获取年月日
      let mode = []
      for (var i = 0; i < this.riliDatalist.length; i++) {
        for (var j = 0; j < this.riliDatalist[i].length; j++) {
          //如果手动配置的00：00存在就不要展示到穿梭框中
          if (this.Day == i + 1 && !this.riliDatalist[i][j].IsMove) {
            mode.push(this.riliDatalist[i][j].no)
          }
        }
      }
      this.selectMode = mode
      this.clickControlShow = true
    },

    async ControlModeGetList() {
      //获取模式控制列表
      const res = await this.$api.MMS.ControlMode.GetList({})
      if (res.ok) {
        this.generateDat(res.data)
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
    generateDat(item) {
      let data = []
      for (var i = 0; i < item.length; i++) {
        data.push({
          key: item[i].no,
          label: item[i].name,
        })
      }
      this.data = data
    },
  },
}
</script>

<style lang="scss" scoped>
@import './styles/ControlCalendar.scss';
</style>
<style lang="scss">
//弹窗全局样式
.tanchuang_ying {
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
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
      width: 40vw;
      height: 61.85vh;
      background: url('../../assets/image/index/tanchuan.png') no-repeat;
      background-size: 100% 100%;
      transform: translateZ(0); //解决translate改变导致页面抖动问题
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
          width: 22px;
          height: 12px;
        }
      }

      .tanchuang_center {
        //日历
        .rili_tangchuang_cen {
          margin-top: 5vh;
          .tanchuang_center_cen_top {
            color: #fff;
            .mode_kongz {
              text-align: left;
              margin-left: 8vw;
              margin-bottom: 2vh;
              margin-top: 1vh;
            }
            .transfer_select {
              text-align: left;
              margin-left: 8vw;
            }
            span {
              color: rgba(0, 240, 255, 1);
              font-family: MicrosoftYaHei;
              font-weight: 400;
              font-size: 16px;
            }
            .tanchuang_center_cen_top_margin {
              margin-left: 8vw;
              text-align: left;
              display: flex;
              .demonstration_box {
                margin: 1vh 0;
              }
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
      }
      .emp {
        padding-top: 20px;
      }
    }
    .cancel {
      img {
        cursor: pointer;
        margin: 0 1vh;
        // width: 44px;
        // height: 44px;
      }
    }
  }
}
</style>

