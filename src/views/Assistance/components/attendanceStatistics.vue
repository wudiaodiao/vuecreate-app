<!--值班管理考勤统计-->
<template>
  <div class="ShiftCheck">
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
            :placeholder="'请选择'"
          >
            <template slot-scope="{ node, data }">
              <span disabled>{{ data.label }}</span>
              <span v-if="!node.isLeaf">({{ data.children.length }})</span>
            </template>
          </el-cascader>
        </li>
        <li>
          <el-button
            type="success"
            size="mini"
            @click="ShiftShiftCheck()"
          >查询</el-button>
        </li>
      </ul>
    </div>
    <div
      class="ShiftCheck_list"
      v-show="ShiftCheckData.total != 0"
    >
      <div class="attendanceStatistics">
        <div class="attendanceStatisticsOne">
          <div
            class="attendanceStatisticsOne_chart"
            id="attendanceStatisticsOne_chart"
          ></div>
          <div class="attendanceStatisticsOne_text">迟到</div>
        </div>
        <div class="attendanceStatisticsTow">
          <div
            class="attendanceStatisticsTow_chart"
            id="attendanceStatisticsTow_chart"
          ></div>
          <div class="attendanceStatisticsTow_text">早退</div>
        </div>
        <div class="attendanceStatisticsThree">
          <div
            class="attendanceStatisticsThree_chart"
            id="attendanceStatisticsThree_chart"
          ></div>
          <div class="attendanceStatisticsThree_text">缺卡</div>
        </div>
        <!-- <div class="attendanceStatisticsFour">
          <div
            class="attendanceStatisticsFour_chart"
            id="attendanceStatisticsFour_chart"
          ></div>
          <div class="attendanceStatisticsFour_text">旷工</div>
        </div> -->
      </div>
      <div>
        <div class="attendanceStatistics_tu">
          <div class="attendanceStatistics_tu_table">
            <div
              class="attendanceStatistics_tu_table_chart"
              id="attendanceStatistics_tu_table_chart"
            ></div>
          </div>
        </div>
      </div>
      <div
        class="attendanceStatistics_table"
        v-show="ShiftCheckData.total != 0"
      >
        <div class="analyse">
          分析说明：本月出勤率为{{
            ((1 - this.ShiftShiftEchartData.none) * 100).toFixed(2)
          }}%,出勤状况{{
            1 - this.ShiftShiftEchartData.none > 0.8
              ? '好'
              : 1 - this.ShiftShiftEchartData.none > 0.6
              ? '良'
              : '差'
          }}
        </div>
        <div class="shiftClass_right_margin">
          <!--班次管理直接用了 值班日志本的样式 -->
          <div class="watchBook">
            <div class="watchBook_top">
              <span @click="ShiftExportShiftCheck()">导出</span>
            </div>
            <div class="watchBook_center">
              <el-table
                :data="ShiftCheckData.list"
                style="width: 100%"
                :row-class-name="tableRowClassName"
              >
                <el-table-column
                  show-overflow-tooltip
                  prop="date"
                  label="日期"
                >
                </el-table-column>
                <el-table-column
                  prop="className"
                  label="班次"
                ></el-table-column>
                <el-table-column
                  prop="userName"
                  label="姓名"
                ></el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  width="180px"
                  prop="checkInTime"
                  label="签到时间"
                ></el-table-column>
                <el-table-column
                  prop="checkIn"
                  label="签到结果"
                ></el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  width="180px"
                  prop="checkOutTime"
                  label="签退时间"
                >
                </el-table-column>
                <el-table-column
                  prop="checkOut"
                  label="签退结果"
                ></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DateTime from '@/js/datetime'
export default {
  data() {
    return {
      DateTime: DateTime,
      areaTime: '',
      schedulingDepartment: '', //所属部门：
      sDepartmentData: [], //所属部门数据：
      sDepartmentId: 0,
      ShiftCheckData: {
        list: [],
        total: 0,
      },
      ShiftShiftEchartData: {
        early: 0,
        late: 0,
        lose: 0,
        none: 0,
        res: [],
      },
      pageIndex: 1,
      pageSize: 10,
    }
  },
  mounted() {
    this.attendanceStatisticsOne()
    this.attendanceStatisticsTow()
    this.attendanceStatisticsThree()
    this.attendanceStatisticsFour()
    this.attendanceStatistics_tu_table()
    this.DepartmentGetAllList() //获取所属部门
    this.sameMonth()
  },
  watch: {
    ShiftShiftEchartData() {
      //数据一传递触发更新函数
      this.attendanceStatisticsOne()
      this.attendanceStatisticsTow()
      this.attendanceStatisticsThree()
      this.attendanceStatisticsFour()
      this.attendanceStatistics_tu_table()
      return
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
    async ShiftExportShiftCheck() {
      //导出考勤统计
      const res = await this.$api.MMS.Shift.ExportShiftCheck({
        month: this.areaTime,
        depId: this.sDepartmentId,
      })
      if (res) {
        var blob = new Blob([res])
        var a = document.createElement('a')
        a.download = '考勤统计.xlsx'
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
    tableRowClassName({ row, rowIndex }) {
      //背景色
      if (rowIndex % 2 == 1) {
        return 'warning-row' //基数
      } else {
        return 'success-row' //偶数
      }
      return ''
    },
    async ShiftShiftEchart() {
      const res = await this.$api.MMS.Shift.ShiftEchart({
        depId: this.sDepartmentId,
        month: this.areaTime,
      })
      if (res.ok) {
        this.ShiftShiftEchartData = res.data
        console.log(res.data)
      } else {
      }
    },
    async ShiftShiftCheck() {
      if (!this.areaTime) {
        return this.$Tools.LayerMsgErr('请选择日期')
      }
      //考勤统计
      const res = await this.$api.MMS.Shift.ShiftCheck({
        depId: this.sDepartmentId,
        month: this.areaTime,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      })
      if (res.ok) {
        if (res.data.total < 1) {
          this.$Tools.LayerMsgErr('暂无数据!')
        }
        console.log(res.data.list)
        var batchList = res.data.list
        for (let i = 0; i < batchList.length; i++) {
          let record = batchList[i]
          record.date = DateTime.parse(record.date).format('yyyy-MM-dd')
          if (record.checkInTime)
            record.checkInTime = DateTime.parse(record.checkInTime).format(
              'yyyy-MM-dd hh:mm'
            )
          if (record.checkOutTime)
            record.checkOutTime = DateTime.parse(record.checkOutTime).format(
              'yyyy-MM-dd hh:mm'
            )
          record.checkIn = this.$Convert.Shift.CheckIn(record.checkIn)
          record.checkOut = this.$Convert.Shift.CheckOut(record.checkOut)
        }
        this.ShiftCheckData = {
          list: batchList,
          total: res.data.total,
        }
        console.log(this.ShiftCheckData)
        this.ShiftShiftEchart()
      } else {
      }
    },
    async DepartmentGetAllList() {
      const GetDepartment = await this.$api.MMS.Department.Get({})
      //获取所有部门
      if (GetDepartment.ok) {
       
        // let arr4 = JSON.parse(JSON.stringify(GetDepartment.data))
        //  if(this.$store.state.EnergyClick == '排班管理'){
        this.sDepartmentData =GetDepartment.data
        // this.sDepartmentId = this.sDepartmentData[0].idDep //部门id
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
    async sDepartmentChane(name) {
       this.sDepartmentId = name[name.length - 1]
      // idDep
      //所属部门change事件
      // let res = ''
      for (var i = 0; i < this.sDepartmentData.length; i++) {
        if (this.sDepartmentData[i].name == name) {
         this.schedulingDepartment = this.sDepartmentData[i].label
        }
      }
      //所属部门change事件
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

    attendanceStatisticsOne() {
      var getfpkszb = [this.ShiftShiftEchartData.late * 100] //非贫困生占比
      //贫困生分布-非贫困生图表
      let option = {
        backgroundColor: 'rgba(0, 0, 0, 0)',

        title: {
          text: getfpkszb + '%',
          textStyle: {
            color: '#fff',
            fontSize: 18,
          },

          itemGap: 20,
          left: 'center',
          top: '45%',
        },

        angleAxis: {
          max: 100,
          clockwise: true, // 逆时针
          // 隐藏刻度线
          show: false,
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        polar: {
          center: ['50%', '50%'],
          radius: '100%', //图形大小
        },
        series: [
          {
            stack: '测试',
            type: 'bar',
            data: getfpkszb,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              borderWidth: 3,
            },
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 13,
            silent: true,
            itemStyle: {
              normal: {
                opacity: 1,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(1, 221, 240, 1)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(1, 221, 240, 1)',
                  },
                ]),
                borderColor: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(1, 221, 240, 1)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(1, 221, 240, 1)',
                    },
                  ]
                ),
                borderWidth: 3,
              },
            },
          },
          {
            stack: '测试',
            type: 'bar',
            data: '',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(0, 0, 0, 0.2)',
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 20,
              shadowOffsetY: 2,
            },
            //  小圆圈
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 20,
            itemStyle: {
              color: 'rgba(1, 221, 240, 1)',
              borderColor: 'rgba(1, 221, 240, 1)',
              borderWidth: 1,
            },
          },
        ],
      }

      var attendanceStatisticsOne_chart = this.$echarts.init(
        document.getElementById('attendanceStatisticsOne_chart')
      )
      attendanceStatisticsOne_chart.setOption(option)
    },
    attendanceStatisticsTow() {
      var getfpkszb = [this.ShiftShiftEchartData.early * 100] //非贫困生占比
      //贫困生分布-非贫困生图表
      let option = {
        backgroundColor: 'rgba(0, 0, 0, 0)',

        title: {
          text: getfpkszb + '%',
          textStyle: {
            color: '#fff',
            fontSize: 18,
          },

          itemGap: 20,
          left: 'center',
          top: '45%',
        },

        angleAxis: {
          max: 100,
          clockwise: true, // 逆时针
          // 隐藏刻度线
          show: false,
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        polar: {
          center: ['50%', '50%'],
          radius: '100%', //图形大小
        },
        series: [
          {
            stack: '测试',
            type: 'bar',
            data: getfpkszb,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              borderWidth: 3,
            },
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 13,
            silent: true,
            itemStyle: {
              normal: {
                opacity: 1,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(247, 214, 92, 1)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(247, 214, 92, 1)',
                  },
                ]),
                borderColor: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(247, 214, 92, 1)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(247, 214, 92, 1)',
                    },
                  ]
                ),
                borderWidth: 3,
              },
            },
          },
          {
            stack: '测试',
            type: 'bar',
            data: '',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(0, 0, 0, 0.2)',
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10,
              shadowOffsetY: 2,
            },
            //  小圆圈
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 10,
            itemStyle: {
              color: 'rgba(1, 221, 240, 1)',
              borderColor: 'rgba(1, 221, 240, 1)',
              borderWidth: 1,
            },
          },
        ],
      }

      var attendanceStatisticsTow_chart = this.$echarts.init(
        document.getElementById('attendanceStatisticsTow_chart')
      )
      attendanceStatisticsTow_chart.setOption(option)
    },
    attendanceStatisticsThree() {
      var getfpkszb = [this.ShiftShiftEchartData.lose * 100] //非贫困生占比
      //贫困生分布-非贫困生图表
      let option = {
        backgroundColor: 'rgba(0, 0, 0, 0)',

        title: {
          text: getfpkszb + '%',
          textStyle: {
            color: '#fff',
            fontSize: 18,
          },

          itemGap: 20,
          left: 'center',
          top: '45%',
        },

        angleAxis: {
          max: 100,
          clockwise: true, // 逆时针
          // 隐藏刻度线
          show: false,
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        polar: {
          center: ['50%', '50%'],
          radius: '100%', //图形大小
        },
        series: [
          {
            stack: '测试',
            type: 'bar',
            data: getfpkszb,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              borderWidth: 3,
            },
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 13,
            silent: true,
            itemStyle: {
              normal: {
                opacity: 1,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(100, 129, 244, 1)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(100, 129, 244, 1)',
                  },
                ]),
                borderColor: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(100, 129, 244, 1)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(100, 129, 244, 1)',
                    },
                  ]
                ),
                borderWidth: 3,
              },
            },
          },
          {
            stack: '测试',
            type: 'bar',
            data: '',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(0, 0, 0, 0.2)',
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10,
              shadowOffsetY: 2,
            },
            //  小圆圈
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 10,
            itemStyle: {
              color: 'rgba(1, 221, 240, 1)',
              borderColor: 'rgba(1, 221, 240, 1)',
              borderWidth: 1,
            },
          },
        ],
      }

      var attendanceStatisticsThree_chart = this.$echarts.init(
        document.getElementById('attendanceStatisticsThree_chart')
      )
      attendanceStatisticsThree_chart.setOption(option)
    },
    attendanceStatisticsFour() {
      var getfpkszb = [this.ShiftShiftEchartData.none * 100] //非贫困生占比
      //贫困生分布-非贫困生图表
      let option = {
        backgroundColor: 'rgba(0, 0, 0, 0)',

        title: {
          text: getfpkszb + '%',
          textStyle: {
            color: '#fff',
            fontSize: 18,
          },

          itemGap: 20,
          left: 'center',
          top: '45%',
        },

        angleAxis: {
          max: 100,
          clockwise: true, // 逆时针
          // 隐藏刻度线
          show: false,
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        polar: {
          center: ['50%', '50%'],
          radius: '100%', //图形大小
        },
        series: [
          {
            stack: '测试',
            type: 'bar',
            data: getfpkszb,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              borderWidth: 3,
            },
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 13,
            silent: true,
            itemStyle: {
              normal: {
                opacity: 1,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(224, 97, 107, 1)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(224, 97, 107, 1)',
                  },
                ]),
                borderColor: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(224, 97, 107, 1)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(224, 97, 107, 1)',
                    },
                  ]
                ),
                borderWidth: 3,
              },
            },
          },
          {
            stack: '测试',
            type: 'bar',
            data: '',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(0, 0, 0, 0.2)',
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10,
              shadowOffsetY: 2,
            },
            //  小圆圈
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 10,
            itemStyle: {
              color: 'rgba(1, 221, 240, 1)',
              borderColor: 'rgba(1, 221, 240, 1)',
              borderWidth: 1,
            },
          },
        ],
      }

      // var attendanceStatisticsFour_chart = this.$echarts.init(
      //   document.getElementById('attendanceStatisticsFour_chart')
      // )
      // attendanceStatisticsFour_chart.setOption(option)
    },
    attendanceStatistics_tu_table() {
      let _this = this
      let chartData = []
      if (this.ShiftShiftEchartData.res.length > 0) {
        for (var i = 0; i < this.ShiftShiftEchartData.res.length; i++) {
          chartData.push({
            name: this.ShiftShiftEchartData.res[i].date
              .split('T')
              .join(' ')
              .substring(8, 10),
            value: this.ShiftShiftEchartData.res[i].value,
          })
        }
      }
      let bgColor = 'rgba(0,0,0,0)',
        fontColor = '#fefefe'
      let xData = chartData.map((v) => v.name)
      let sData = chartData.map((v) => v.value)

      let lineOption = {
        lineStyle: {
          color: 'rgba(151,151,151,0.5)',
          type: 'dashed',
        },
      }

      let option = {
        backgroundColor: bgColor,
        title: [
          {
            text: '月出勤率',
            x: '50%',
            y: 10,
            textAlign: 'center',
            textStyle: {
              align: 'center',
              color: 'rgba(0, 252, 255, 1)',
              fontSize: 20,
              fontWeight: 'bold',
              fontfamily: 'PingFang SC',
            },
          },
        ],

        tooltip: {
          trigger: 'item',
          padding: 1,
          formatter: function (param) {
            var resultTooltip =
              "<div style='background:rgba(13,5,30,.1);border:1px solid rgba(255,255,255,.2);padding:5px;border-radius:3px;'>" +
              "<div style='text-align:center;'>" +
              _this.areaTime +
              '-' +
              param.name +
              '</div>' +
              "<div style='padding-top:5px;'>" +
              "<span style=''> " +
              '' +
              '</span>' +
              "<span style=''>" +
              '出勤人数: ' +
              '</span>' +
              param.value +
              '</span>人<span>' +
              '</div>' +
              '</div>'
            return resultTooltip
          },
        },
        grid: {
          top: '14%',
          right: '3%',
          left: '5%',
          bottom: '14%',
        },
        xAxis: [
          {
            type: 'category',
            data: xData,
            axisLine: lineOption,
            axisTick: {
              show: false,
            },
            axisLabel: {
              margin: 10,
              color: fontColor,
              textStyle: {
                fontSize: 14,
              },
            },
          },
        ],
        yAxis: [
          {
            axisLabel: {
              formatter: '{value}',
              color: fontColor,
            },
            axisTick: {
              show: false,
            },
            axisLine: lineOption,
            splitLine: lineOption,
          },
          {
            axisLine: lineOption,
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            type: 'bar',
            data: sData,
            barWidth: '16px',
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: '#00DEF0', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#715FFE', // 100% 处的颜色
                    },
                  ],
                  false
                ),
              },
            },
          },
        ],
      }

      var attendanceStatistics_tu_table_chart = this.$echarts.init(
        document.getElementById('attendanceStatistics_tu_table_chart')
      )
      attendanceStatistics_tu_table_chart.setOption(option)
    },
  },
}
</script>
<style lang="scss" scoped>
.ShiftCheck {
  .scheduling_top_left {
    padding-top: 20px;
    padding-left: 24px;
    .scheduling_top_left_list {
      display: flex;
      justify-content: start;

      li {
        margin: 0 10px;
        // color: #00f0ff;
      }
    }
  }
  .ShiftCheck_list {
    height: 65vh;
    width: 51.68vw;

    overflow: auto;
    .attendanceStatistics {
      display: flex;

      .attendanceStatisticsOne {
        flex: 1;
        width: 180px;
        //   height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .attendanceStatisticsOne_chart {
          width: 180px;
          height: 180px;
        }
        .attendanceStatisticsOne_text {
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ffffff;
          text-align: center;
        }
      }
      .attendanceStatisticsTow {
        flex: 1;
        width: 180px;
        //   height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .attendanceStatisticsTow_chart {
          width: 180px;
          height: 180px;
        }
        .attendanceStatisticsTow_text {
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ffffff;
          text-align: center;
        }
      }
      .attendanceStatisticsThree {
        flex: 1;
        width: 180px;
        //   height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .attendanceStatisticsThree_chart {
          width: 180px;
          height: 180px;
        }
        .attendanceStatisticsThree_text {
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ffffff;
          text-align: center;
        }
      }
      .attendanceStatisticsFour {
        flex: 1;
        width: 180px;
        //   height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .attendanceStatisticsFour_chart {
          width: 180px;
          height: 180px;
        }
        .attendanceStatisticsFour_text {
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ffffff;
          text-align: center;
        }
      }
    }
    .attendanceStatistics_tu {
      width: 984px;
      .attendanceStatistics_tu_table {
        .attendanceStatistics_tu_table_chart {
          width: 960px;
          height: 430px;
        }
      }
    }
  }
  .attendanceStatistics_table {
    .analyse {
      margin-left: 20px;
    }
    .shiftClass_right_margin {
      margin: 20px 24px;
      opacity: 1;

      .watchBook {
        width: 100%;
        text-align: center;

        .watchBook_top {
          text-align: left;

          span {
            text-align: center;
            display: inline-block;
            min-width: 52px;
            height: 26px;
            line-height: 26px;
            background: #007edd;
            border-radius: 2px;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: #ffffff;
            cursor: pointer;
          }
        }

        .watchBook_center {
        }

        .watchBook_bootom {
        }
      }
    }
  }
}
</style>
