<!--
 * @Author: your name
 * @Date: 2022-03-07 10:30:45
 * @LastEditTime: 2022-03-07 23:19:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /ibms_ty/src/views/Assistance/WxUserCheck.vue
-->
<template>
  <div class="craftingassistance public_body">
    <div class="craftingassistance_cneter">
      <div :class="[
          'public_page',
          'announcement',
          $store.state.dtab ? 'index_off' : 'index_no'
        ]">
        <div class="announcement_center">
          <div class="WorkOrderQuery_main_top">
            <div class="baojin_center_top">
              <ul>
                <li class="baojin_center_top_riqishij">
                  <span class="baojin_center_top_baojin_Time">核对时间：</span>
                  <el-date-picker
                    v-model="startTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM-dd"
                    align="left"
                    :picker-options="pickerOptions"
                    :clearable="false"
                  ></el-date-picker>
                  <span class="shunline">-</span>
                  <el-date-picker
                    v-model="endTime"
                    type="datetime"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期时间"
                    align="left"
                    :picker-options="pickerOptions"
                    :clearable="false"
                  ></el-date-picker>
                </li>
                <li>
                  <span
                    class="chaxun"
                    @click="
                      pageIndex = 1
                      WxUserCheckGet()
                    "
                  >查询</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="announcement_list">
            <div class="WorkOrderQuery_main_daochu">
              <div
                class="daochu_right"
                v-if="AnnouncementList.total > 0"
              >
                <span
                  class="chu"
                  @click="WorkOrderExportList()"
                >导出</span>
              </div>
            </div>
            <el-table
              :data="AnnouncementList.list"
              style="width: 100%"
              :row-class-name="tableRowClassName"
              v-loading="searchLoding"
            >
              <el-table-column
                prop="checkUserName"
                label="核对人"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="time"
                label="核对时间"
                show-overflow-tooltip
              >
                <template scope="scope">
                  <span>
                    {{ $Convert.getTime(scope.row.time) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="identity"
                label="身份"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="departmentName"
                label="部门"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="mobile"
                label="手机号"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="userName"
                label="姓名"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="查看"
                width="100px"
              >
                <template scope="scope">
                  <span
                    class="changkan"
                    @click="announcementChankan(scope.row)"
                  >查看</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="fenye">
            <el-pagination
              :page-size="pageSize"
              hide-on-single-page
              @current-change="announcementChangePage"
              layout="prev, pager, next"
              :total="AnnouncementList.total"
            ></el-pagination>
          </div>
        </div>
      </div>
      <div
        class="Announcement_tanchuang_ying"
        v-if="announcementTcShow"
      >
        <div class="tanchuang">
          <div class="tanchuang_bg">
            <div class="tanchuang_top">
              <img
                :src="require('~@/assets/image/index/partial_left.png')"
                alt
              />
              <span class="top_title">
                {{ announcementTcType == 'chankan' ? '查看核对信息' : '' }}
              </span>
              <img
                :src="require('@/assets/image/index/partial_right.png')"
                alt
              />
            </div>
            <div class="tanchuang_center">
              <div class="tanchuang_center_cen">
                <div class="tanchuang_center_cen_top">
                  <ul>
                    <li>
                      <div style="width:50%">
                        <span>核对人: </span>
                        <span class="chakan">{{
                          wxUserCheckItem.checkUserName
                        }}</span>
                      </div>
                      <div style="width:50%">
                        <span>时间: </span>
                        <span class="chakan">{{
                          $Convert.getTime(wxUserCheckItem.time)
                        }}</span>
                      </div>
                    </li>

                    <li>
                      <div style="width:50%">
                        <span>身份: </span>
                        <span class="chakan">{{
                          wxUserCheckItem.identity
                        }}</span>
                      </div>
                      <div style="width:50%">
                        <span>手机号: </span>
                        <span class="chakan">{{
                          wxUserCheckItem.mobile
                        }}</span>
                      </div>
                    </li>

                    <li>
                      <div style="width:50%">
                        <span>部门: </span>
                        <span class="chakan">{{
                          wxUserCheckItem.departmentName
                        }}</span>
                      </div>
                      <div style="width:50%">
                        <span>姓名: </span>
                        <span class="chakan">{{
                          wxUserCheckItem.userName
                        }}</span>
                      </div>
                    </li>
                    <li class="tc_textarea">
                      <span>说明：</span>
                      <div
                        class="chakan min_hei"
                        style="white-space: pre-wrap"
                        v-html="wxUserCheckItem.description"
                      ></div>
                    </li>
                    <li>
                      <span>照片：</span>
                      <div class="photo">
                        <ul>
                          <li>
                            <div class="photo_img">
                              <img
                                :src="PhotoId0Img"
                                @click="handlePreview(PhotoId0)"
                                v-if="PhotoId0Img != ''"
                                alt
                              />
                              <i v-else>无图片</i>
                            </div>
                          </li>
                          <li>
                            <div class="photo_img">
                              <img
                                @click="handlePreview(PhotoId1)"
                                :src="PhotoId1Img"
                                v-if="PhotoId1Img != ''"
                                alt
                              />
                              <i v-else>无图片</i>
                            </div>
                          </li>

                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="cancel">
            <img
              @click="announcementTcShow = false"
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
import DateTime from '@/js/datetime.js'
export default {
  data() {
    return {
      pageSize: 12, //一页多少条
      pageIndex: 1, //实时页码
      announcementTcType: '', //添加公告的类型
      announcementTcShow: false,
      AnnouncementList: {},
      wxUserCheckItem: {},
      PhotoId0: '',
      PhotoId1: '',
      PhotoId0Img: '',
      PhotoId1Img: '',
      announcementNo: 0,
      img: '',
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
      startTime: new Date(
        new Date(new Date().toLocaleDateString()).getTime() -
          6 * 1000 * 60 * 60 * 24
      ),
      endTime: new Date(
        new Date(new Date().toLocaleDateString()).getTime() +
          1000 * 60 * 60 * 24
      ),
      searchLoding: false,
    }
  },

  created() {},
  mounted() {
    this.WxUserCheckGet() //获取公告列表
  },
  methods: {
    async WorkOrderExportList() {
      const res = await this.$api.MMS.WxUserCheck.ExportList({
        startTime: this.startTime,
        endTime: this.endTime,
      })
      if (res) {
        var blob = new Blob([res])
        var a = document.createElement('a')
        a.download = '人员核对表.xlsx'
        a.style.display = 'none'
        a.href = URL.createObjectURL(blob)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        this.$Tools.LayerMsgInfo('成功')
      } else {
        console.log(res)
        this.$Tools.LayerMsgErr(res.message)
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
        this.$message('图片下载失败')
      }
    },

    async WxUserCheckGet() {
      this.searchLoding = true
      this.startTime = this.$Convert.getDate(DateTime.fromValue(this.startTime))
      this.endTime = this.$Convert.getDate(DateTime.fromValue(this.endTime))

      const res = await this.$api.MMS.WxUserCheck.Get({
        startTime: this.startTime,
        endTime: this.endTime,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      })
      if (res.ok) {
        this.searchLoding = false
        this.AnnouncementList = res.data
      } else {
        this.searchLoding = false
      }
    },
    announcementChankan(item) {
      console.log(item)
      if (item.photoId0) {
        this.PhotoId0Img = this.$api.ImageGetImg + item.photoId0
      }
      if (item.photoId1) {
        this.PhotoId1Img = this.$api.ImageGetImg + item.photoId1
      }
      //查看
      this.announcementTcType = 'chankan'
      this.announcementTcShow = true
      this.wxUserCheckItem = item
      this.PhotoId0 = item.photoId0 || ''
      this.PhotoId1 = item.photoId1 || ''
    },

    async announcementChangePage(e) {
      this.pageIndex = e
      this.WxUserCheckGet()
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
@import './styles/WxUserCheck.scss';
</style>
<style lang="scss">
.Announcement_tanchuang_ying {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

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
        }

        .margin_tc {
          margin: 0 0.3vw;
        }

        > img {
          vertical-align: baseline;
        }
      }

      .tanchuang_center {
        margin: 2vh 2vw;

        .tanchuang_center_cen {
          margin-top: 3vh;

          //公告内容
          .tanchuang_center_cen_top {
            text-align: left;

            ul {
              li {
                display: flex;
                margin-bottom: 1vh;

                input {
                  height: 3vh;
                  background-color: rgba(0, 0, 0, 0);
                  border: 1px solid #00f0ff;
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #ffffff;
                }

                span {
                  font-size: 16px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #00f0ff;
                }

                i {
                  font-size: 16px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #00f0ff;
                  margin-left: 0.3vw;
                }

                //照片
                .photo {
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

              .tc_textarea {
                display: flex;

                .chakan {
                  width: 90%;
                  color: #00f0ff;
                }
                .min_hei {
                  max-height: 200px;
                  overflow: auto;
                }
              }
            }
          }

          .photo_visibility {
            visibility: hidden;
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
      }
    }
  }
}
</style>
