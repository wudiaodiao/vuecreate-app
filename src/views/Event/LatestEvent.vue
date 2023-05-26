<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-02-18 16:43:04
 * @LastEditors: Please set LastEditors
 * @Description: 实时报警
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->
<template>
  <div class="LatestEvent public_body">
    <!-- 报警管理 -->
    <div class="baojinguanli">
      <div
        v-if="Shrink"
        :class="[
          'public_page',
          Shrink == false ? 'alarmManagement_list_hide' : 'public_page',
          $store.state.dtab ? 'index_off' : 'index_no'
        ]"
      >
        <div class="baojin_center">
          <div>
            <div class="baojin_center_zhong">
              <div
                class="baojin_center_zhong_list"
                v-cloak
              >
                <el-table
                  :data="Shrink == false ? realTimeOne : realTime.list"
                  style="width: 100%"
                  :row-class-name="tableRowClassName"
                  show-overflow-tooltip
                >
                 <el-table-column
                    type="index"
                     :index="(pageIndex-1)*pageSize+1"
                    show-overflow-tooltip
                    label="序号"
                  ></el-table-column>
                  <el-table-column
                    prop="status"
                    label="状态"
                    width="50px"
                  >
                    <template v-slot="scope">
                      <img :src="
                          require(`@/assets/image/index/event${scope.row.level}.png`)
                        " />
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="alarmTime"
                    label="报警时间"
                    width="190px"
                    show-overflow-tooltip
                  >
                    <template v-slot="scope">
                      <span>
                        {{ $Convert.getTime(scope.row.alarmTime) }}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="subSystemName"
                    show-overflow-tooltip
                    label="子系统"
                  ></el-table-column>
                  <el-table-column
                    prop="deviceName"
                    show-overflow-tooltip
                    label="设备"
                  ></el-table-column>
                  <!-- <el-table-column
                    prop="signalName"
                    show-overflow-tooltip
                    label="信号"
                  ></el-table-column> -->
                  <el-table-column
                    prop="equipmentAreaName"
                    show-overflow-tooltip
                    label="地点"
                  ></el-table-column>
                  <el-table-column
                    width="300px"
                    show-overflow-tooltip
                    prop="content"
                    label="报警内容"
                  ></el-table-column>
                  <el-table-column
                    prop="level"
                    label="级别"
                    width="50px"
                  >
                    <template v-slot="scope">
                      <span :class="[`event${scope.row.level}`]">
                        {{ level(scope.row.level) }}
                      </span>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column prop="workOrderState" label="工单状态">
                    <template scope="scope">
                      <span>
                        {{ $Convert.WorkOrder.State(scope.row.workOrderState) }}
                      </span>
                    </template>
                  </el-table-column> -->
                  <el-table-column
                    label="查看"
                    width="50px"
                  >
                    <template v-slot="scope">
                      <span
                        class="moshou changkan"
                        @click="chankan(scope.row)"
                      >
                        查看
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="确认"
                    width="70px"
                  >
                    <template v-slot="scope">
                      <span
                        :class="[
                          'moshou',
                          scope.row.confirmTime ? 'changkan' : 'queren'
                        ]"
                        @click="
                          scope.row.confirmTime ? '' : Confirm(scope.row.no)
                        "
                        v-preventReClick="2000"
                      >
                        {{ scope.row.confirmTime ? '已确认' : '确认' }}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column label="摄像头" width="70">
                    <template v-slot="scope">
                      <span
                        v-show="scope.row.cameraNo"
                        class="queren"
                        @click="cameraClick(scope.row)"
                      >摄像头
                      </span>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column label="定位" width="50px">
                    <template scope="scope">
                      <span
                        class="queren"
                        v-show="scope.row.monitorNo"
                        @click="Shrink ? jump(scope.row) : Back()"
                        >{{ Shrink ? '定位' : '返回' }}
                      </span>
                    </template>
                  </el-table-column> -->
                </el-table>
              </div>
              <div class="fenye">
                <el-pagination
                  :page-size="pageSize"
                  :pager-count="11"
                  hide-on-single-page
                  @current-change="Current"
                  :current-page="pageIndex"
                  layout="prev, pager, next"
                  :total="realTime.total"
                ></el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="alarmManagement_box"
      >
        <div class="baojin_center">
          <div>
            <div class="baojin_center_zhong">
              <div
                class="baojin_center_zhong_list"
                v-cloak
              >
                <el-table
                  :data="Shrink == false ? realTimeOne : realTime.list"
                  style="width: 100%"
                  :row-class-name="tableRowClassName"
                  :show-header="false"
                >
                  <el-table-column
                    prop="status"
                    label="状态"
                    width="50px"
                  >
                    <template>
                      <img :src="require('@/assets/image/index/bj.png')" />
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="alarmTime"
                    label="报警时间"
                  >
                    <template v-slot="scope">
                      {{ $Tools.timeFormatAll(scope.row.alarmTime) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="subSystemName"
                    show-overflow-tooltip
                    label="子系统"
                  ></el-table-column>
                  <el-table-column
                    prop="deviceName"
                    show-overflow-tooltip
                    label="设备"
                  ></el-table-column>
                  <el-table-column
                    prop="signalName"
                    show-overflow-tooltip
                    label="信号"
                  ></el-table-column>
                  <el-table-column
                    prop="equipmentAreaName"
                    show-overflow-tooltip
                    label="地点"
                  ></el-table-column>
                  <el-table-column
                    width="140px"
                    show-overflow-tooltip
                    prop="content"
                    label="报警内容"
                  ></el-table-column>
                  <el-table-column
                    prop="level"
                    label="级别"
                    width="50px"
                  >
                    <template v-slot="scope">
                      <span>{{ level(scope.row.level) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="workOrderState"
                    label="工单状态"
                  >
                    <template v-slot="scope">
                      <span>
                        {{ $Convert.WorkOrder.State(scope.row.workOrderState) }}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="查看"
                    width="50px"
                  >
                    <template v-slot="scope">
                      <span
                        class="moshou changkan"
                        @click="chankan(scope.row)"
                      >查看</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="确认"
                    width="70px"
                  >
                    <template v-slot="scope">
                      <span
                        :class="[
                          'moshou',
                          scope.row.confirmTime ? 'changkan' : 'queren'
                        ]"
                        @click="
                          scope.row.confirmTime ? '' : Confirm(scope.row.no)
                        "
                        v-preventReClick="2000"
                      >{{ scope.row.confirmTime ? '已确认' : '确认' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="定位"
                    width="50px"
                  >
                    <template v-slot="scope">
                      <span
                        class="queren"
                        @click="Shrink ? jump(scope.row) : Back()"
                      >{{ Shrink ? '定位' : '返回' }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="fenye">
                <el-pagination
                  :page-size="pageSize"
                  :pager-count="11"
                  hide-on-single-page
                  @current-change="Current"
                  :current-page="pageIndex"
                  layout="prev, pager, next"
                  :total="realTime.total"
                ></el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="Wales_bg"
        v-if="chankanShow"
      >
        <div class="Wales_bg_center">
          <div class="Wales">
            <div class="Wales_xinxi">
              <div class="Wales_xinxi_title">
                <span>查看事件</span>
              </div>
              <div class="Wales_xinxi_list">
                <ul>
                  <li>
                    <div>
                      <span>状态：</span>
                      <i>报警</i>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>报警时间：</span>
                      <i>
                        {{ $Tools.timeFormatAll(alarmEnergylist.alarmTime) }}
                      </i>
                    </div>
                    <div>
                      <span>恢复时间：</span>
                      <i>
                        {{ $Tools.timeFormatAll(alarmEnergylist.resetTime) }}
                      </i>
                     
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>子系统：</span>
                      <i>{{ alarmEnergylist.subSystemName }}</i>
                    </div>
                    <div>
                      <span>设备：</span>
                      <i>{{ alarmEnergylist.deviceName }}</i>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>信号：</span>
                      <i>{{ alarmEnergylist.signalName }}</i>
                    </div>
                    <div>
                      <span>地点：</span>
                      <i>{{ alarmEnergylist.equipmentAreaName }}</i>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>报警主题：</span>
                      <i>{{ alarmEnergylist.content }}</i>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>报警类别：</span>
                      <i>
                        {{
                          alarmEnergylist.category == 1
                            ?'上限告警'
                            :'下限报警'
                        }}
                      </i>
                    </div>
                    <div>
                      <span>报警级别：</span>
                      <i>{{ level(alarmEnergylist.level) }}</i>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>确认时间：</span>
                      <i>
                        {{ $Tools.timeFormatAll(alarmEnergylist.confirmTime) }}
                      </i>
                    </div>
                    <div>
                      <span>确认人:</span>
                      <i>{{ alarmEnergylist.confirmUserName }}</i>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>工单号：</span>
                      <i>{{ alarmEnergylist.workOrderId }}</i>
                    </div>
                    <div>
                      <span>工单状态：</span>
                      <i>{{
                        $Convert.WorkOrder.State(alarmEnergylist.workOrderState)
                      }}</i>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="Wales_cancel"
              @click="cancel()"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Subsystem: '',
      equipment: '',
      signal: '',
      zjchecked: true,
      hfchecked: true,
      chakandata: '',
      chankanShow: false,
      subSystemNo: '', //子系统号
      End: new Date(
        new Date(new Date().toLocaleDateString()).getTime() +
          1000 * 60 * 60 * 24
      ),
      Start: new Date(
        new Date(new Date().toLocaleDateString()).getTime() -
          30 * 1000 * 60 * 60 * 24
      ),
      realTime: {
        list: [],
        total: 0,
      },
      maxTime: 1592580559700,
      timer: '',
      pageSize: 14, //一页多少条
      pageIndex: 1, //实时页码
      baojinActive: true,

      alarmEnergylist: {}, //报警当前项
      Shrink: true,
      realTimes: [],
    }
  },

  created() {},
  mounted() {
    this.GetLatestList()

    if (this.timer) {
      clearInterval(this.timer)
    } else {
      this.timer = setInterval(() => {
        this.GetMaxTime()
      }, 1500)
    }
  },
  unmounted() {
    clearInterval(this.timer)
  },
  computed: {
    level: function () {
      //返回当前时间的上一个月
      //通过回调函数给计算属性传参
      return function (type) {
        switch (type) {
          case 1:
            return '提示'
            break
          case 2:
            return '一般'
            break
          case 3:
            return '重要'
            break
          case 4:
            return '紧急'
            break
          default:
            return '其他'
        }
      }
    },
    realTimeOne: function () {
      return this.realTimes
    },
  },
  methods: {
    cameraClick(row) {
      this.$api.MMS.Camera.GetModel({
        no: row.cameraNo,
      }).then((res) => {
        if (res.ok) {
          window.open(res.data.webCommand, '_self')
        }
      })
    },
    Back() {
      this.Shrink = true
      this.$nextTick(() => {
        this.$store.commit('setMonitorNo', -1)
        this.$store.commit('setCenterP', [])
        this.$store.commit('setRefreshBuild', true)
      })
    },
    async jump(item) {
      //定位

      const res = await this.$api.MMS.Event.GetPoint({
        no: item.no,
      })
      if (res.ok) {
        //2.关联运行监控
        if (item.monitorNo) {
          this.$store.commit('setMonitorNo', item.monitorNo)
        } else {
          //4.该设备未关联信号
          this.$Tools.LayerMsgErr('该设备未关联运行监控')
          return (this.Shrink = true)
        }
      }

      this.Shrink = false
      this.realTimes = [item]
    },
    async Confirm(no) {
      const that = this
      //删除节点
      this.$confirm('是否确认吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const res = await that.$api.MMS.Event.Confirm({ no })
          if (res.ok) {
            that.$Tools.LayerMsgInfo('确认成功')
            this.GetLatestList()
          }
        })
        .catch(() => {})
    },

    Current(e) {
      this.pageIndex = e
      this.GetLatestList()
    },

    async GetMaxTime() {
      //定时三秒更新列表
      const res = await this.$api.MMS.Event.GetMaxTime({})
      if (res.ok) {
        if (this.maxTime != res.data) {
          this.GetLatestList()
          this.maxTime = res.data
        } else {
          this.maxTime = res.data
        }
      }
    },
    async GetLatestList() {
      const res = await this.$api.MMS.Event.GetLatestList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        Start: this.Start,
        End: this.End,
        SubSystemNo: this.subSystemNo || 0,
        Device: this.equipment || '',
        Signal: this.signal || '',
        Alarm: true,
        Reset: true,
      })
      if (res.ok) {
        if (res.data.total == 0) {
          this.$Tools.LayerMsgErr('该时间段暂无数据')
        }
        this.realTime = res.data
      }
    },

    chankan(item) {
      this.alarmEnergylist = item

      //查看信息
      this.chankanShow = true
    },
    cancel() {
      //关闭
      this.chankanShow = false
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
<style>
[v-cloak] {
  display: none;
}
</style>
<style lang="scss" scoped>
@import './styles/LatestEvent.scss';
.Wales_xinxi_list li div {
  // display: flex;
}
.Wales_xinxi_list li div span {
  float: left;
 width:72px !important;
}
.Wales_xinxi_list li div i {
  float: left;

 display: inline-block;
 width: calc(100% - 72px);
}
</style>
