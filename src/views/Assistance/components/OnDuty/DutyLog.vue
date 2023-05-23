<!--值班日志-->

<template>
  <div class="DutyLog">
    <div class="shiftClass_right_margin">
      <div class="logbook">
        <div class="logbook_top">
          <ul class="logbook_top_ul">
            <li
              v-for="item in watchBook"
              :key="item.no"
              :class="[item.no == logbookNo ? 'li_color' : '']"
              @click="logbooklistClick(item.no)"
            >
              <span>{{ item.name }}</span>
            </li>
          </ul>
          <div
            class="logbook_top_click"
            v-if="
              $Tools.accessControl(
                this.$store.state.userGetUserRole.resList,
                'EditDutyLog'
              )
            "
          >
            <span @click="logBookTcShowbian('', 'addLog')">写日志</span>
          </div>
        </div>
        <div class="logbook_center">
          <el-table
            :data="logbookData.list"
            style="width: 100%"
            :row-class-name="tableRowClassName"
          >
            <el-table-column
              prop="content"
              label="内容"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="shiftContent"
              label="交接班内容"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="createUserName"
              label="记录人"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              show-overflow-tooltip
            >
              <template scope="scope">
                <span>
                  {{ $Convert.getTime(scope.row.createTime) }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="查看"
              width="80px"
            >
              <template slot-scope="scope">
                <span
                  class="chankan"
                  @click="logBookTcShowbian(scope.row, 'chakan')"
                >查看</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="logbook_bootom">
          <el-pagination
            :page-size="pageSize"
            hide-on-single-page
            @prev-click="prev(pageIndex)"
            @next-click="next(pageIndex)"
            @current-change="logbookChangePage"
            layout="prev, pager, next"
            :total="logbookData.total"
          ></el-pagination>
        </div>
      </div>
    </div>

    <div
      class="DutyLog_tanchuang_ying"
      v-if="logbookTcShow"
    >
      <div class="tanchuang">
        <div class="tanchuang_bg">
          <div class="tanchuang_top">
            <img
              :src="require('~@/assets/image/index/partial_left.png')"
              alt
            />
            <span class="top_title">{{
              logbookType == 'addlog' ? '写日志' : '查看日志'
            }}</span>

            <img
              :src="require('@/assets/image/index/partial_right.png')"
              alt
            />
          </div>
          <div class="tanchuang_center">
            <div class="tanchuang_center_cen">
              <div class="logbook_tanchuang_center_cen_top">
                <ul class="logbook_list">
                  <li class="tc_textarea">
                    <span>内容：</span>
                    <el-input
                      v-if="logbookType == 'addLog'"
                      type="textarea"
                      v-model="logbookInputCenter"
                    ></el-input>
                    <div
                      class="center_width"
                      v-else-if="logbookType == 'chakan'"
                    >
                      {{ logbookInputCenter }}
                    </div>
                    <i v-show="logbookType == 'addLog'">*</i>
                  </li>
                  <li class="tc_textarea">
                    <span>交接班内容：</span>
                    <el-input
                      v-if="logbookType == 'addLog'"
                      type="textarea"
                      v-model="logbookInputHdCenter"
                    ></el-input>
                    <div
                      class="center_width"
                      v-else-if="logbookType == 'chakan'"
                    >
                      {{ logbookInputHdCenter }}
                    </div>
                    <i v-show="logbookType == 'addLog'">*</i>
                  </li>
                  <li
                    class="tc_textarea"
                    v-if="logbookType == 'chakan'"
                  >
                    <span>照片：</span>
                    <div class="photo">
                      <ul>
                        <li>
                          <div class="photo_img">
                            <img
                              @click="handlePreview(PhotoId0)"
                              :src="PhotoId0Img"
                              v-if="PhotoId0Img != ''"
                              alt
                            />
                            <i
                              v-else
                              style="color: #00f0ff"
                            >无图片</i>
                          </div>
                        </li>
                        <li>
                          <div class="photo_img">
                            <img
                              :src="PhotoId1Img"
                              @click="handlePreview(PhotoId1)"
                              v-if="PhotoId1Img != ''"
                              alt
                            />
                            <i
                              v-else
                              style="color: #00f0ff"
                            >无图片</i>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div
                class="tanchuang_center_cen_bottom"
                v-if="logbookType == 'addLog'"
              >
                <button
                  @click="xieDutyLogGetList()"
                  v-preventReClick="2000"
                >确认</button>
                <button @click="logbookTcShow = false">取消</button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="cancel"
          @click="logbookTcShow = false"
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
      pageSize: 13, //一页多少条
      pageIndex: 1, //实时页码
      watchBook: [],
      watchBookItem: {},
      watchBookTcShow: false,
      watchBookTcType: '',
      watchBookInputName: '', //日志输入框
      logbookNo: '', //日志本选中
      logType: 'add',
      logbookData: {
        list: [],
        total: 0,
      },
      logbookType: 'addLog',
      logbookTcShow: false,
      logbookInputCenter: '', //内容
      logbookInputHdCenter: '', //交接内容
      PhotoId0: '',
      PhotoId1: '',
      PhotoId0Img: '',
      PhotoId1Img: '',
    }
  },

  created() {},
  mounted() {
    this.DutyLogBookGetList() //值班日志本控制器
  },
  destroyed() {},
  computed: {},
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
        this.$message('图片下载失败')
      }
    },
    async xieDutyLogGetList() {
      //写日志
      const res = await this.$api.MMS.DutyLog.Add({
        No: 0,
        BookNo: this.logbookNo,
        Content: this.logbookInputCenter,
        ShiftContent: this.logbookInputHdCenter,
        PhotoId0: null,
        PhotoId1: null,
        CreateUserNo: 0,
      })
      if (res.ok) {
        this.DutyLogGetList()
      }
    },

    async DutyLogGetList() {
      //值班日志控制器
      const res = await this.$api.MMS.DutyLog.GetList({
        pageSize: 12, //一页多少条
        pageIndex: this.pageIndex, //实时页码
        bookNo: this.logbookNo,
      })
      if (res.ok) {
        this.logbookTcShow = false
        this.logbookData = res.data
      }
    },

    logBookTcShowbian(item, type) {
      if (type == 'addLog') {
        this.logbookInputCenter = ''
        this.logbookInputHdCenter = ''
        this.logbookTcShow = type
        this.logbookType = type
      } else if (type == 'chakan') {
        console.log(item.content)
        this.logbookTcShow = type
        this.logbookInputCenter = item.content
        this.logbookInputHdCenter = item.shiftContent
        this.logbookType = type

        if (item.photoId0) {
          this.PhotoId0 = item.photoId0
          this.PhotoId0Img = this.$api.ImageGetImg + item.photoId0
        }
        if (item.photoId1) {
          this.PhotoId1 = item.photoId1
          this.PhotoId1Img = this.$api.ImageGetImg + item.photoId1
        }
      }
    },
    async DutyLogBookGetList() {
      //获取值班日志本
      const res = await this.$api.MMS.DutyLogBook.GetList({})
      if (res.ok) {
        this.watchBook = res.data
        if (res.data[0]) {
          this.logbookNo = res.data[0].no
          this.DutyLogGetList()
        }
      }
    },
    logbooklistClick(no) {
      //值班日志本号
      this.logbookNo = no
      this.DutyLogGetList()
    },
    async logbookChangePage(e) {
      this.pageIndex = e
      //值班日志分页响应事件
      const res = await this.$api.MMS.DutyLog.GetList({
        pageSize: this.pageSize, //一页多少条
        pageIndex: this.pageIndex, //实时页码
        bookNo: this.logbookNo,
      })
      if (res.ok) {
        this.logbookData = res.data
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
  },
}
</script>
<style lang="scss" scoped>
@import './styles/DutyLog.scss';
</style>
<style lang="scss">
.DutyLog_tanchuang_ying {
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: -11.3vh;
  left: -26vw;
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
          width: 22px;
          height: 12px;
        }
      }

      .tanchuang_center {
        margin: 2vh 2vw;
        .tanchuang_center_cen {
          margin-top: 3vh;

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
          //值班管理、值班日志
          .logbook_tanchuang_center_cen_top {
            .logbook_list {
              .tc_textarea {
                display: flex;
                justify-content: start;
                text-align: left;
                //照片
                .photo {
                  margin-top: 20px;
                  > ul {
                    display: flex;

                    > li {
                      display: flex;
                      flex-direction: column;

                      .photo_img {
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 12vh;
                        width: 6.5vw;
                        cursor: pointer;
                        border: 1px solid #00f0ff;

                        > i {
                          position: absolute;
                          text-align: center;
                          left: 50%;
                          top: 50%;
                          transform: translate(-50%, -50%);
                          font-size: 14px;
                          margin-left: 0;
                        }

                        img {
                          height: 11vh;
                          width: 6vw;
                        }
                      }

                      .photo_bottom {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        span {
                          font-size: 14px;
                          cursor: pointer;
                        }
                      }
                    }

                    > :nth-child(2) {
                      margin-left: 0.5vw;
                    }
                  }
                }
              }
              li {
                display: flex;
                justify-content: center;
                align-items: center;
                .center_width {
                  max-height: 10.5rem;
                  overflow: auto;
                  white-space: pre-wrap;
                  text-align: left;
                  width: 86%;
                  color: #00f0ff;
                }
                span {
                  width: 100px;
                  color: #00f0ff;
                }
                > i {
                  margin-left: 5px;
                  color: #00f0ff;
                }
              }
              > :nth-child(2) {
                margin-top: 20px;
              }
            }
          }
        }
      }
    }
    .cancel {
      img {
        cursor: pointer;
        // width: 44px;
        // height: 44px;
      }
    }
  }
}
</style>
