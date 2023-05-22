<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-02-18 16:40:15
 * @LastEditors: Please set LastEditors
 * @Description: 操作日志
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->

<template>
  <div class="PartInOut ">
    <div class="PartInOut_cneter public_body">
      <div :class="['PartInOutlist public_page', $store.state.dtab ? 'index_off' : 'index_no']">
        <div class="PartInOutlist_main">
          <div class="PartInOutlist_main_top">
            <div class="baojin_center_top">
              <ul>
                <li class="baojin_center_top_riqishij">
                  <span class="baojin_center_top_baojin_Time">操作时间：</span>
                  <el-date-picker
                    v-model="Start"
                    type="datetime"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM-dd"
                    align="left"
                    :picker-options="pickerOptions"
                    :clearable="false"
                  ></el-date-picker>
                  <span class="shunline">-</span>
                  <el-date-picker
                    v-model="End"
                    type="datetime"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期时间"
                    align="left"
                    :picker-options="pickerOptions"
                    :clearable="false"
                  ></el-date-picker>
                </li>
                <li>
                  <span class="span">用户：</span>
                  <span class="selectFile_sub">{{
                    userName != '' ? userName : '所有'
                  }}</span>
                  <a
                    href="javascript:;"
                    class="smallbluebutton one_a"
                    v-show="userName != undefined && userName != ''"
                    @click="
                      userName = ''
                      userNameNo = ''
                    "
                  >X</a>
                  <a
                    href="javascript:;"
                    @click="addTc('selectUser', '')"
                    class="smallbluebutton"
                  >...</a>
                </li>
                <li>
                  类型：
                  <span class="vertical">
                    <el-checkbox v-model="browse">浏览</el-checkbox>
                  </span>
                  <span class="vertical">
                    <el-checkbox v-model="increase">增加</el-checkbox>
                  </span>
                  <span class="vertical">
                    <el-checkbox v-model="remove">删除</el-checkbox>
                  </span>
                  <span class="vertical">
                    <el-checkbox v-model="amend">修改</el-checkbox>
                  </span>
                  <span class="vertical">
                    <el-checkbox v-model="control">控制</el-checkbox>
                  </span>
                  <span class="vertical">
                    <el-checkbox v-model="other">其他</el-checkbox>
                  </span>
                </li>
                <li>
                  <el-button
                    type="success"
                    size="mini"
                    @click="OperationGetList(1)"
                  >查询</el-button>
                </li>
              </ul>
            </div>
          </div>
          <div class="PartInOutlist_main_daochu">
            <span @click="OperationExportList()">导出</span>
          </div>
          <div class="PartInOutlist_main_zhon">
            <div class="Partlist_list">
              <el-table
                :data="OperationGetListData.list"
                style="width: 100%"
                :row-class-name="tableRowClassName"
              >
                <el-table-column
                  prop="time"
                  width="140px"
                  label="时间"
                >
                  <template slot-scope="scope">
                    <span>
                      <a
                        href="#"
                        :title="$Tools.timeFormat(scope.row.time)"
                      >{{
                        $Tools.timeFormat(scope.row.time)
                      }}</a>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  width="140px"
                  label="用户"
                >
                  <template slot-scope="scope">
                    <span>
                      <a
                        href="#"
                        :title="scope.row.name"
                      >{{
                        scope.row.name
                      }}</a>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="machineName"
                  width="140px"
                  label="计算机名"
                >
                  <template slot-scope="scope">
                    <span>
                      <a
                        href="#"
                        :title="scope.row.machineName"
                      >{{
                        scope.row.machineName
                      }}</a>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="type"
                  width="140px"
                  label="类型"
                >
                  <template slot-scope="scope">
                    <span>
                      <a
                        href="#"
                        :title="scope.row.type"
                      >{{
                        scope.row.type
                      }}</a>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="content"
                  label="内容"
                >
                  <template slot-scope="scope">
                    <span>
                      <a
                        href="#"
                        :title="scope.row.content"
                      >{{
                        scope.row.content
                      }}</a>
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="PartInOutlist_main_botom">
            <div class="fenye">
              <el-pagination
                hide-on-single-page
                @current-change="Current"
                :page-size="pageSize"
                :current-page="pageIndex"
                :pager-count="11"
                layout="prev, pager, next"
                :total="OperationGetListData.total"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
      <div
        class="PartOut_tanchuang_ying"
        v-if="PartInOutGetSearchShow"
      >
        <div class="tanchuang">
          <div :class="[
              'tanchuang_bg',
              PartInOutGetSearchType == 'chakanLog' ? 'gongd_tanchuang_bg' : ''
            ]">
            <div class="tanchuang_top">
              <img
                :src="require('@/assets/image/index/partial_left.png')"
                alt
              />
              <span class="top_title margin_tc">{{
                PartInOutGetSearchType == 'selectUser' ? '选择用户' : ''
              }}</span>

              <img
                :src="require('@/assets/image/index/partial_right.png')"
                alt
              />
            </div>
            <div class="tanchuang_center">
              <div class="tanchuang_center_cen">
                <div
                  class="selectUser"
                  v-if="PartInOutGetSearchType == 'selectUser'"
                >
                  <selectUser
                    v-on:addTc="addTc"
                    :eqUserId="userNameNo"
                  ></selectUser>
                </div>
              </div>
            </div>
          </div>
          <div class="cancel">
            <img
              :src="require('@/assets/image/index/withdrawal.png')"
              v-show="PartInOutGetSearchType != 'selectUser'"
              alt
            />
            <img
              @click="PartInOutGetSearchShow = false"
              :src="require('@/assets/image/index/cancel.png')"
              alt
            />
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
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        },
      },
      Start: new Date(new Date(new Date().toLocaleDateString()).getTime()),
      End: new Date(
        new Date(new Date().toLocaleDateString()).getTime() +
          1000 * 60 * 60 * 24
      ), //明天
      inputPartType: '所有',
      pageSize: 13, //一页多少条
      pageIndex: 1, //实时页码
      OperationGetListData: {}, //出入库数据
      PartInOutGetSearchShow: false,
      PartInOutGetSearchType: '',
      userName: '', //用户名
      userNameNo: '', //用户号
      browse: true, //浏览
      increase: true, //增加
      remove: true, //删除
      amend: true, //修改
      control: true, //控制
      other: true, //其他
    }
  },
  mounted() {
    this.OperationGetList(1) //查询
  },
  computed: {
    numberTrue: function () {
      //通过回调函数给计算属性传参
      return function (num) {
        if (num > 0) {
          return num == 0 ? '' : num
        } else {
          return Math.abs(num) == 0 ? '' : Math.abs(num) //负数变成整数
        }
      }
    },
  },
  methods: {
    async OperationExportList() {
      let number = this.count()
      let arrNu = number.split('') //转成数组
      let type = arrNu.join(',') //分割逗号
      //导出
      const res = await this.$api.MMS.Operation.Export({
        startTime: this.Start,
        endTime: this.End,
        userNo: this.userNameNo,
        type: type,
      })
      if (res) {
        var blob = new Blob([res])
        var a = document.createElement('a')
        a.download = '操作日志.xlsx'
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

    async addTc(type, item) {
      //弹窗
      if (type == 'selectUser') {
      } else if (type == 'Distribute') {
        this.PartInOutGetSearchShow = false
        this.userNameNo = item.no
        this.userName = item.name
        return
      }
      //添加节点显示弹窗

      this.PartInOutGetSearchShow = true
      this.PartInOutGetSearchType = type
    },
    Current(e) {
      //分页响应事件
      this.OperationGetList(e)
    },
    count() {
      let one = this.browse ? '1' : ''
      let two = this.increase ? '2' : ''
      let three = this.remove ? '3' : ''
      let four = this.amend ? '4' : ''
      let five = this.control ? '5' : ''
      let six = this.other ? '6' : ''

      return one + two + three + four + five + six
    },

    async OperationGetList(pageIndex) {
      this.pageIndex = pageIndex
      //查询
      let number = this.count()
      let arrNu = number.split('') //转成数组
      let type = arrNu.join(',') //分割逗号
      const res = await this.$api.MMS.Operation.Get({
        pageSize: this.pageSize, //一页多少条
        pageIndex: this.pageIndex, //实时页码
        startTime: this.Start,
        endTime: this.End,
        userNo: this.userNameNo,
        type: type,
      })
      if (res.ok) {
        this.OperationGetListData = res.data //获取查询数据
      } else {
        this.$Tools.LayerMsgErr(res.message)
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
  },
}
</script>
<style lang="scss" scoped>
@import './styles/Operation.scss';
</style>
<style lang="scss">
.PartOut_tanchuang_ying {
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  .tanchuang {
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .gongd_tanchuang_bg {
      width: 58vw !important;
    }

    .tanchuang_bg {
      width: 40vw;
      height: 61.85vh;
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
        }
        .margin_tc {
          margin: 0 0.3vw;
        }
        > img {
          vertical-align: baseline;
          width: 22px;
          height: 12px;
        }
      }

      .tanchuang_center {
        margin: 2vh 0;
        .tanchuang_center_cen {
          .selectUser {
            height: 50vh;
            overflow: auto;
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
            > :nth-child(1) {
              margin-right: 1.56vw;
            }
            > :nth-child(2) {
              margin-right: 1.56vw;
            }
          }
        }
      }
    }
    .cancel {
      > img {
        cursor: pointer;
      }
    }
  }
}
</style>
