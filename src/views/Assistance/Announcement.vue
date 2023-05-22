<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-02-18 16:41:42
 * @LastEditors: Please set LastEditors
 * @Description: 文档管理
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->
<template>
  <div class="craftingassistance public_body">
    <div class="craftingassistance_cneter">
      <div :class="['public_page','announcement']">
        <div class="announcement_center">
          <div class="announcement_add">
            <el-button
              type="primary"
              size="mini"
              @click="Addition()"
            >添加</el-button>
          </div>
          <div class="announcement_list">
            <el-table
              :data="AnnouncementList.list"
              style="width: 100%"
              :row-class-name="tableRowClassName"
            >
              <el-table-column
                prop="subject"
                label="标题"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="content"
                label="内容"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="createUserName"
                label="创建人"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="createTime"
                label="恢复时间"
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
                width="100px"
              >
                <template scope="scope">
                  <span
                    class="changkan"
                    @click="announcementChankan(scope.row)"
                  >查看</span>
                </template>
              </el-table-column>
              <el-table-column
                label="编辑"
                width="100px"
              >
                <template slot-scope="scope">
                  <span
                    class="green"
                    @click="Editing(scope.row)"
                  >编辑</span>
                </template>
              </el-table-column>
              <el-table-column
                label="删除"
                width="100px"
              >
                <template slot-scope="scope">
                  <el-popconfirm
                    title="确定删除吗"
                    @onConfirm="AnnouncementDelete(scope.row.no)"
                    @confirm="AnnouncementDelete(scope.row.no)"
                  >
                    <span
                      class="red"
                      slot="reference"
                    >删除</span>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="fenye">
            <!--      hide-on-single-page -->
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
                :src="require('@/assets/image/index/partial_left.png')"
                alt
              />
              <span class="top_title">
                {{
                  announcementTcType == 'add'
                    ? '添加公告'
                    : announcementTcType == 'edit'
                    ? '编辑公告'
                    : announcementTcType == 'edselectFile' ||
                      announcementTcType == 'selectFile'
                    ? '选择图片'
                    : announcementTcType == 'chankan'
                    ? '查看公告'
                    : ''
                }}
              </span>

              <img
                :src="require('@/assets/image/index/partial_right.png')"
                alt
              />
            </div>
            <div class="tanchuang_center">
              <div class="tanchuang_center_cen">
                <div
                  class="tanchuang_center_cen_top"
                  v-if="
                    announcementTcType == 'chankan' ||
                      announcementTcType == 'edit' ||
                      announcementTcType == 'add'
                  "
                >
                  <ul>
                    <li>
                      <span class="bianji">名称：</span>
                      <span
                        v-if="announcementTcType == 'chankan'"
                        class="chakan"
                      >{{ inputName }}</span>
                      <input
                        v-else
                        type="text"
                        :disabled="
                          announcementTcType == 'chankan' ? true : false
                        "
                        v-model="inputName"
                      />
                      <!-- <i>*</i> -->
                    </li>
                    <li class="tc_textarea">
                      <span class="bianji">内容：</span>
                      <div
                        v-if="announcementTcType == 'chankan'"
                        class="chakan min_hei"
                        style="white-space: pre-wrap"
                        v-html="inputCenter"
                      ></div>
                      <el-input
                        type="textarea"
                        v-else
                        :disabled="
                          announcementTcType == 'chankan' ? true : false
                        "
                        v-model="inputCenter"
                      ></el-input>
                      <!-- <i>*</i> -->
                    </li>
                    <li>
                      <span class="bianji">照片：</span>
                      <div class="photo">
                        <ul>
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
                            <div :class="[
                                'photo_bottom',
                                announcementTcType == 'chankan'
                                  ? 'photo_visibility'
                                  : ''
                              ]">
                              <el-upload
                                class="upload-demo"
                                ref="upload"
                                action
                                :file-list="fileList"
                                :auto-upload="true"
                                :http-request="handleUploadForm"
                                :headers="headers"
                                :show-file-list="false"
                              >
                                <span @submit="submitUpload">上传</span>
                              </el-upload>
                              <span @click="
                                  previous(
                                    announcementTcType == 'edit'
                                      ? 'edselectFile'
                                      : 'selectFile',
                                    '1'
                                  )
                                ">选择</span>
                              <span @click="empty('1')">清空</span>
                            </div>
                          </li>
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
                            <div :class="[
                                'photo_bottom',
                                ,
                                announcementTcType == 'chankan'
                                  ? 'photo_visibility'
                                  : ''
                              ]">
                              <el-upload
                                class="upload-demo"
                                ref="upload"
                                action
                                :file-list="fileList"
                                :auto-upload="true"
                                :http-request="handleUploadForm1"
                                :headers="headers"
                                :show-file-list="false"
                              >
                                <span @submit="submitUpload">上传</span>
                              </el-upload>
                              <span @click="
                                  previous(
                                    announcementTcType == 'edit'
                                      ? 'edselectFile'
                                      : 'selectFile',
                                    '0'
                                  )
                                ">选择</span>
                              <span @click="empty('0')">清空</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
                <div
                  v-else-if="
                    announcementTcType == 'edselectFile' ||
                      announcementTcType == 'selectFile'
                  "
                  class="edselectFile"
                >
                  <selectImage
                    v-on:previousUp="previousUp"
                    :partType="announcementTcType"
                  ></selectImage>
                </div>
                <div
                  v-if="
                    announcementTcType != 'edselectFile' &&
                      announcementTcType != 'edselectFile' &&
                      announcementTcType != 'selectFile'
                  "
                  :class="[
                    'tanchuang_center_cen_bottom',
                    announcementTcType == 'chankan' ? 'photo_visibility' : ''
                  ]"
                >
                  <button
                    @click="
                      announcementTcType == 'add'
                        ? AnnouncementAdd()
                        : announcementTcType == 'edit'
                        ? AnnouncementUpdate()
                        : ''
                    "
                    v-preventReClick="2000"
                  >
                    确认
                  </button>
                  <button @click="announcementTcShow = false">取消</button>
                </div>
              </div>
            </div>
          </div>
          <div class="cancel">
            <img
              v-show="
                announcementTcType != 'edit' &&
                  announcementTcType != 'add' &&
                  announcementTcType != 'chankan'
              "
              :src="require('@/assets/image/index/withdrawal.png')"
              @click="
                previous(
                  announcementTcType == 'edselectFile'
                    ? 'edit'
                    : announcementTcType == 'selectFile'
                    ? 'add'
                    : ''
                )
              "
              alt
            />
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
import selectImage from '../../components/index/selectImage'
export default {
  components: {
    selectImage,
  },
  data() {
    return {
      pageSize: 14, //一页多少条
      pageIndex: 1, //实时页码
      announcementTcType: '', //添加公告的类型
      announcementTcShow: false,
      inputName: '',
      inputCenter: '', //内容
      AnnouncementList: {},
      AnnouncementItem: {},
      PhotoId0: '',
      PhotoId1: '',
      PhotoId0Img: '',
      PhotoId1Img: '',
      announcementNo: 0,
      CreateUserNo: 0,
      CreateTime: '',
      craftingItem: '',
      scussFile: {},
      flagNum: '', //选择的图片
      img: '',
      fileList: [],
    }
  },

  created() {},
  mounted() {
    this.AnnouncementGetList() //获取公告列表
  },
  destroyed() {},
  computed: {
    headers() {
      return {
        token: this.$store.state.token,
        // 'Content-Type': 'application/x-www-form-urlencoded'
        'Content-Type': 'multipart/form-data',
      }
    },
  },
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
    submitUpload(e) {
      this.$refs.upload.submit()
    },
    async handleUploadForm(param) {
      //文件上传
      var _this = this
      let formData = new FormData()
      formData.append('file', param.file)
      var imgtype = param.file.type.toLowerCase().split('/')
      if (
        imgtype[1] != 'png' &&
        imgtype[1] != 'jpeg' &&
        imgtype[1] != 'bmp' &&
        imgtype[1] != 'jpg'
      ) {
        return this.$notify({
          title: '警告',
          message: '图片格式不正确！',
          type: 'warning',
        })
      }
      const res = await this.$api.MMS.Image.UploadImg(formData)
      if (res.ok) {
        this.scussFile.id = res.data[0]
        this.scussFile.size = param.file.size
        this.PhotoId1 = res.data[0]
        this.PhotoId1Img = this.$api.ImageGetImg + this.PhotoId1
      } else {
        this.$message('上传文件失败，' + data.message)
      }
    },
    async handleUploadForm1(param) {
      //文件上传
      var _this = this
      let formData = new FormData()
      formData.append('file', param.file)
      var imgtype = param.file.type.toLowerCase().split('/')
      if (
        imgtype[1] != 'png' &&
        imgtype[1] != 'jpeg' &&
        imgtype[1] != 'bmp' &&
        imgtype[1] != 'jpg'
      ) {
        return this.$notify({
          title: '警告',
          message: '图片格式不正确！',
          type: 'warning',
        })
      }
      const res = await this.$api.MMS.Image.UploadImg(formData)
      if (res.ok) {
        this.scussFile.id = res.data[0]
        this.scussFile.size = param.file.size
        this.PhotoId0 = res.data[0]
        this.PhotoId0Img = this.$api.ImageGetImg + this.PhotoId0

        // this.$message('上传文件成功，' + res.message)
      } else {
        this.$message('上传文件失败，' + data.message)
      }
    },
    previousUp(type, id) {
      if (type == 'edselectFile') {
        this.announcementTcType = 'edit'
        if (this.flagNum == '0') {
          this.PhotoId0 = id

          this.PhotoId0Img = this.$api.ImageGetImg + id
        } else if (this.flagNum == '1') {
          this.PhotoId1 = id
          this.PhotoId1Img = this.$api.ImageGetImg + id
        }
      } else if (type == 'selectFile') {
        this.announcementTcType = 'add'
        if (this.flagNum == '0') {
          this.PhotoId0 = id
          this.PhotoId0Img = this.$api.ImageGetImg + id
        } else if (this.flagNum == '1') {
          this.PhotoId1 = id
          this.PhotoId1Img = this.$api.ImageGetImg + id
        }
      }
      this.announcementTcShow = true
    },
    previous(type, item) {
      //返回上一步按钮

      this.flagNum = item

      this.announcementTcShow = true
      this.announcementTcType = type
    },
    async addTc(type, item) {
      //弹窗
      if (type == 'edselectFile') {
        //选择图片
      }
      //添加节点显示弹窗
      this.announcementTcShow = true
      this.announcementTcType = type
    },

    empty(type) {
      //清空
      if (type == '0') {
        this.PhotoId0Img = ''
        this.PhotoId0 = ''
      } else if (type == '1') {
        this.PhotoId1Img = ''
        this.PhotoId1 = ''
      }
    },
    async AnnouncementAdd() {
      //添加公告
      const res = await this.$api.MMS.Announcement.Add({
        No: 0,
        Subject: this.inputName,
        Content: this.inputCenter,
        PhotoId0: this.PhotoId0,
        PhotoId1: this.PhotoId1,
        CreateUserNo: 0,
        CreateTime: '2020-10-21T07:05:33.948Z',
      })

      if (res.ok) {
        this.announcementTcShow = false
        this.AnnouncementGetList() //获取公告列表
      }
    },
    async AnnouncementUpdate() {
      //编辑公告
      const res = await this.$api.MMS.Announcement.Update({
        No: this.announcementNo,
        Subject: this.inputName,
        Content: this.inputCenter,
        PhotoId0: this.PhotoId0,
        PhotoId1: this.PhotoId1,
        CreateUserNo: this.CreateUserNo,
        CreateTime: this.CreateTime,
      })

      if (res.ok) {
        this.announcementTcShow = false
        this.AnnouncementGetList() //获取公告列表
      }
    },
    async AnnouncementDelete(no) {
      //删除公告
      const res = await this.$api.MMS.Announcement.Delete({
        no: no,
      })
      if (res.ok) {
        this.AnnouncementGetList() //获取公告列表
      }
    },
    async AnnouncementGetList() {
      const res = await this.$api.MMS.Announcement.GetList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      })
      if (res.ok) {
        this.AnnouncementList = res.data
      }
    },
    Addition() {
      this.announcementTcType = 'add'
      this.announcementTcShow = true
      //添加前清空值
      this.inputName = ''
      this.inputCenter = ''
      this.PhotoId0 = ''
      this.PhotoId1 = ''
      this.PhotoId0Img = ''
      this.PhotoId1Img = ''
    },
    Editing(item) {
      if (item.photoId0) {
        this.PhotoId0Img = this.$api.ImageGetImg + item.photoId0
      }
      if (item.photoId1) {
        this.PhotoId1Img = this.$api.ImageGetImg + item.photoId1
      }

      //编辑
      this.announcementTcType = 'edit'
      this.announcementTcShow = true
      this.AnnouncementItem = item
      this.inputName = item.subject
      this.inputCenter = item.content
      this.PhotoId0 = item.photoId0
      this.PhotoId1 = item.photoId1
      this.CreateUserNo = item.createUserNo
      this.CreateTime = item.createTime
      this.announcementNo = item.no
    },
    announcementChankan(item) {
      if (item.photoId0) {
        this.PhotoId0Img = this.$api.ImageGetImg + item.photoId0
      }
      if (item.photoId1) {
        this.PhotoId1Img = this.$api.ImageGetImg + item.photoId1
      }
      //查看
      this.announcementTcType = 'chankan'
      this.announcementTcShow = true
      this.disabled = true
      this.AnnouncementItem = item
      this.inputName = item.subject
      this.inputCenter = item.content
      this.PhotoId0 = item.photoId0
      this.PhotoId1 = item.photoId1
    },

    async announcementChangePage(e) {
      // this.pageIndex = e
      //在更新列表
      const res = await this.$api.MMS.Announcement.GetList({
        pageIndex: e,
        pageSize: this.pageSize,
      })
      if (res.ok) {
        this.AnnouncementList = res.data
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
@import './styles/Announcement.scss';
.bianji {
  display: inline-block;
  width: 80px;
  text-align-last: left;
}
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
                margin-bottom: 3vh;

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
