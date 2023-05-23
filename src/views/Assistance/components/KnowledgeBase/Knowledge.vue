<!--
 * @Author: your name
 * @Date: 2020-11-09 11:31:29
 * @LastEditTime: 2022-02-18 16:41:49
 * @LastEditors: Please set LastEditors
 * @Description: //知识库
 * @FilePath: \IBMS\ibms\src\views\Assistance\components\KnowledgeBase\Knowledge.vue
-->
<template>
  <div class="Knowledge">
    <div class="Knowledge_center">
      <div class="Knowledge_center_top">
        <div
          class="Knowledge_center_top_button"
          v-if="
            $Tools.accessControl(
              this.$store.state.userGetUserRole.resList,
              'EditKnowledge'
            )
          "
        >
          <button @click="addKnowledge('add', '')">添加</button>
        </div>
      </div>
      <div class="Knowledge_center_center">
        <div class="Knowledge_list">
          <el-table
            :data="KnowledgeData.list"
            style="width: 100%"
            :row-class-name="tableRowClassName"
          >
            <el-table-column
              prop="subject"
              label="标题"
              show-overflow-tooltip
            > </el-table-column>
            <el-table-column
              prop="categoryName"
              label="类别"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="keywords"
              label="关键词"
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
              label="创建时间"
              width="170px"
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
              width="50px"
            >
              <template slot-scope="scope">
                <span
                  class="EditingingEquipment_yellew"
                  @click="addKnowledge('chakan', scope.row)"
                >查看</span>
              </template>
            </el-table-column>
            <el-table-column
              label="编辑"
              width="50px"
              v-if="
                $Tools.accessControl(
                  this.$store.state.userGetUserRole.resList,
                  'EditKnowledge'
                )
              "
            >
              <template slot-scope="scope">
                <span
                  class="Editinging_green"
                  @click="addKnowledge('Editing', scope.row)"
                >编辑</span>
              </template>
            </el-table-column>
            <el-table-column
              label="删除"
              width="50px"
              v-if="
                $Tools.accessControl(
                  this.$store.state.userGetUserRole.resList,
                  'EditKnowledge'
                )
              "
            >
              <template slot-scope="scope">
                <el-popconfirm
                  title="确定删除吗"
                  @onConfirm="KnowledgeDelete(scope.row.no)"
                  @confirm="KnowledgeDelete(scope.row.no)"
                >
                  <span
                    class="del_red"
                    slot="reference"
                  >删除</span>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="Knowledge_center_botom">
        <div class="fenye">
          <el-pagination
            hide-on-single-page
            @current-change="Current"
            :page-size="pageSize"
            :pager-count="13"
            layout="prev, pager, next"
            :total="KnowledgeData.total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <div
      class="Knowledge_tanchuang_ying"
      v-if="addKnowledgeShow"
    >
      <div class="tanchuang">
        <div class="tanchuang_bg">
          <div class="tanchuang_top">
            <img
              :src="require('~@/assets/image/index/partial_left.png')"
              alt
            />
            <span class="top_title">
              {{
                addKnowledgeType == 'add'
                  ? '添加知识库'
                  : addKnowledgeType == 'Editing'
                  ? '编辑知识库'
                  : addKnowledgeType == 'chakan'
                  ? '查看知识库'
                  : addKnowledgeType == 'edselectFile' ||
                    addKnowledgeType == 'selectFile'
                  ? '选择图片'
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
                  addKnowledgeType == 'add' ||
                    addKnowledgeType == 'chakan' ||
                    addKnowledgeType == 'Editing'
                "
              >
                <ul class="formValidator">
                  <el-form
                    :model="formValidator"
                    ref="formValidator"
                    class="demo-dynamic"
                    :rules="rules"
                  >
                    <li>
                      <span class="span_width">主题：</span>
                      <div
                        v-if="addKnowledgeType == 'chakan'"
                        class="chakan"
                      >
                        {{ formValidator.subject }}
                      </div>
                      <el-form-item
                        prop="subject"
                        v-else
                      >
                        <el-input
                          class="zhutiInput"
                          v-model="formValidator.subject"
                        ></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <span class="span_width">类别：</span>
                      <div
                        v-if="addKnowledgeType == 'chakan'"
                        class="chakan"
                      >
                        {{ formValidator.inputCategory }}
                      </div>
                      <el-form-item
                        prop="inputCategory"
                        v-else
                      >
                        <el-cascader
                          class="zhutiInput"
                          :show-all-levels="false"
                          v-model="formValidator.inputCategory"
                          :options="categoryData"
                          :props="{
                            expandTrigger: 'hover',
                            value: 'model',
                            checkStrictly: true
                          }"
                          @change="DepartmentChane(formValidator.inputCategory)"
                          :placeholder="formValidator.inputCategory || '请选择'"
                        >
                          <template slot-scope="{ node, data }">
                            <span>{{ data.model.name }}</span>
                            <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                          </template>
                        </el-cascader>
                      </el-form-item>
                    </li>
                    <li>
                      <span class="span_width">关键字：</span>
                      <div
                        v-if="addKnowledgeType == 'chakan'"
                        class="chakan"
                      >
                        {{ keyword }}
                      </div>
                      <el-input
                        v-else
                        class="keyword"
                        v-model="keyword"
                      ></el-input>
                    </li>

                    <li class="tc_textarea">
                      <span class="span_width">内容：</span>
                      <div
                        v-if="addKnowledgeType == 'chakan'"
                        class="chakan min_hei"
                      >
                        {{ formValidator.inputCenter }}
                      </div>
                      <el-form-item
                        prop="inputCenter"
                        v-else
                      >
                        <el-input
                          class="chakan"
                          type="textarea"
                          :disabled="
                            addKnowledgeType == 'chakan' ? true : false
                          "
                          v-model="formValidator.inputCenter"
                        ></el-input>
                      </el-form-item>
                      <!-- <i>*</i> -->
                    </li>

                    <li>
                      <span class="span_width">照片：</span>
                      <div class="photo">
                        <ul>
                          <li>
                            <div class="photo_img">
                              <img
                                :src="photoId0Img"
                                @click="handlePreview(photoId0)"
                                v-if="photoId0Img != ''"
                                alt
                              />
                              <i v-else>无图片</i>
                            </div>
                            <div :class="[
                                'photo_bottom',
                                addKnowledgeType == 'chakan'
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
                                    addKnowledgeType == 'Editing'
                                      ? 'edselectFile'
                                      : 'selectFile',
                                    '0'
                                  )
                                ">选择</span>
                              <span @click="empty('0')">清空</span>
                            </div>
                          </li>
                          <li>
                            <div class="photo_img">
                              <img
                                @click="handlePreview(photoId1)"
                                :src="photoId1Img"
                                v-if="photoId1Img != ''"
                                alt
                              />

                              <i v-else>无图片</i>
                            </div>
                            <div :class="[
                                'photo_bottom',
                                addKnowledgeType == 'chakan'
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
                                    addKnowledgeType == 'Editing'
                                      ? 'edselectFile'
                                      : 'selectFile',
                                    '1'
                                  )
                                ">选择</span>
                              <span @click="empty('1')">清空</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </el-form>
                </ul>
              </div>
              <div
                v-else-if="
                  addKnowledgeType == 'edselectFile' ||
                    addKnowledgeType == 'selectFile'
                "
                class="edselectFile"
              >
                <selectImage
                  v-on:previousUp="previousUp"
                  :partType="addKnowledgeType"
                ></selectImage>
              </div>

              <div
                class="tanchuang_center_cen_bottom"
                v-show="
                  addKnowledgeType != 'chakan' &&
                    addKnowledgeType != 'selectFile' &&
                    addKnowledgeType != 'edselectFile'
                "
              >
                <button
                  @click="
                    addKnowledgeType == 'add'
                      ? KnowledgeAdd('formValidator')
                      : addKnowledgeType == 'Editing'
                      ? KnowledgeUpdate('formValidator')
                      : addKnowledgeType == 'edImages' ||
                        addKnowledgeType == 'addImages'
                      ? FileSystemSave()
                      : ''
                  "
                  v-preventReClick="2000"
                >
                  确认
                </button>
                <button @click="addKnowledgeShow = false">取消</button>
              </div>
            </div>
          </div>
        </div>
        <div class="cancel">
          <img
            v-show="
              addKnowledgeType != 'Editing' &&
                addKnowledgeType != 'add' &&
                addKnowledgeType != 'chakan'
            "
            :src="require('@/assets/image/index/withdrawal.png')"
            @click="
              previous(
                addKnowledgeType == 'edselectFile'
                  ? 'Editing'
                  : addKnowledgeType == 'selectFile'
                  ? 'add'
                  : ''
              )
            "
            alt
          />
          <img
            @click="addKnowledgeShow = false"
            :src="require('@/assets/image/index/cancel.png')"
            alt
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import selectImage from '../../../../components/index/selectImage'
export default {
  components: {
    selectImage,
  },
  data() {
    return {
      formValidator: {
        subject: '',
        inputCategory: '',
        inputCenter: '',
      },
      rules: {
        subject: [{ required: true, message: '请输入主题', trigger: 'blur' }],
        inputCategory: [
          { required: true, message: '请选择类别', trigger: 'change' },
        ],
        inputCenter: [
          { required: true, message: '请输入内容', trigger: 'blur' },
        ],
      },
      KnowledgeData: [], //
      pageSize: 14, //一页多少条
      pageIndex: 1, //实时页码
      addKnowledgeType: '',
      addKnowledgeShow: false,
      categoryData: [], //知识库列表
      categoryId: 0,
      categoryNo: 0,
      keyword: '', //关键字
      photoId0: '',
      photoId1: '',
      photoId0Img: '',
      photoId1Img: '',
      scussFile: {},
      flagNum: '', //选择的图片
      itemX: {}, //当前项
      fileList: [],
    }
  },

  created() {},
  mounted() {
    this.KnowledgeGetList()
    this.KnowledgeCategoryGetList()
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
        this.photoId1 = res.data[0]
        var blod = await this.$api.MMS.Image.GetThumbnailImg(res.data[0])
        var a = new FileReader()
        a.readAsDataURL(blod) //读取文件保存在result中
        a.onload = function (e) {
          _this.photoId1Img = e.target.result
        }
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
        this.photoId0 = res.data[0]
        var blod = await this.$api.MMS.Image.GetThumbnailImg(res.data[0])
        var a = new FileReader()
        a.readAsDataURL(blod) //读取文件保存在result中
        a.onload = function (e) {
          _this.photoId0Img = e.target.result
        }

        // this.$message('上传文件成功，' + res.message)
      } else {
        this.$message('上传文件失败，' + data.message)
      }
    },
    async FileSystemSave() {
      var file = [
        {
          ParentNo: -1,
          OriginalFileName: this.scussFile.key,
          FileName: this.scussFile.value,
          FileSize: this.scussFile.size,
        },
      ]
      //确认按钮
      const res = await this.$api.MMS.FileSystem.Save(file)
      if (res.ok) {
        this.addKnowledgeType =
          this.addKnowledgeType == 'edImages'
            ? 'Editing'
            : this.addKnowledgeType == 'addImages'
            ? 'add'
            : ''
        if (this.flagNum == '0') {
          this.photoId0 = res.data[0]
        } else if (this.flagNum == '1') {
          this.photoId1 = res.data[0]
        }
      } else {
        this.$message('失败，' + res.message)
      }
    },
    async addTc(type, item) {
      //弹窗
      if (type == 'edselectFile') {
        //选择图片
      } else if (type == 'edImages' || type == 'addImages') {
        this.scussFile = item
      }
      //添加节点显示弹窗
      this.addKnowledgeShow = true
      this.addKnowledgeType = type
    },
    empty(type) {
      //清空
      if (type == '0') {
        this.photoId0Img = ''
        this.photoId0 = ''
      } else if (type == '1') {
        this.photoId1Img = ''
        this.photoId1 = ''
      }
    },
    previous(type, item) {
      //返回上一步按钮

      this.flagNum = item

      this.addKnowledgeShow = true
      this.addKnowledgeType = type
    },
    previousUp(type, item) {
      if (type == 'edselectFile') {
        this.addKnowledgeType = 'Editing'
        if (this.flagNum == '0') {
          this.photoId0 = item
        } else if (this.flagNum == '1') {
          this.photoId1 = item
        }

        this.ImageGetThumbnailImg(item, this.flagNum)
      } else if (type == 'selectFile') {
        this.addKnowledgeType = 'add'
        if (this.flagNum == '0') {
          this.photoId0 = item
        } else if (this.flagNum == '1') {
          this.photoId1 = item
        }
        this.ImageGetThumbnailImg(item, this.flagNum)
      }
      this.addKnowledgeShow = true
    },
    async ImageGetThumbnailImg(id, type) {
      //获取文件流
      const res = await this.$api.MMS.Image.GetThumbnailImg(id)
      if (res) {
        if (type == '0') {
          this.photoId0Img = window.URL.createObjectURL(res)
        } else if (type == '1') {
          this.photoId1Img = window.URL.createObjectURL(res)
        }
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },

    async KnowledgeUpdate(formName) {
      //编辑
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.MMS.Knowledge.Update({
            No: this.categoryNo,
            Subject: this.formValidator.subject,
            CreateTime: this.itemX.createTime,
            CreateUserNo: this.itemX.createUserNo,
            CategoryId: this.categoryId,
            Keywords: this.keyword,
            Content: this.formValidator.inputCenter,
            PhotoId0: this.photoId0,
            PhotoId1: this.photoId1,
          })
          if (res.ok) {
            this.addKnowledgeShow = false
            this.$Tools.LayerMsgInfo('编辑成功')
            this.KnowledgeGetList() // 列表
          } else {
            this.$Tools.LayerMsgErr(res.message)
          }
        } else {
          return false
        }
      })
    },
    async KnowledgeDelete(no) {
      //删除
      const res = await this.$api.MMS.Knowledge.Delete({
        no: no,
      })
      if (res.ok) {
        this.KnowledgeGetList() // 列表
        this.$Tools.LayerMsgInfo('删除成功')
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    async KnowledgeAdd(formName) {
      //添加知识库
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.MMS.Knowledge.Add({
            No: 0,
            Subject: this.formValidator.subject,
            CategoryId: this.categoryId,
            Keywords: this.keyword,
            Content: this.formValidator.inputCenter,
            PhotoId0: this.photoId0,
            PhotoId1: this.photoId1,
          })
          if (res.ok) {
            this.addKnowledgeShow = false
            this.KnowledgeGetList() // 列表
            this.$Tools.LayerMsgInfo('成功')
          } else {
            this.$Tools.LayerMsgErr(res.message)
          }
        } else {
          return false
        }
      })
    },
    DepartmentChane(name) {
      //分项拼接
      let res = ''
      for (var i = 0; i < name.length; i++) {
        res = name[i].name
        this.categoryId = name[i].id
      }

      this.formValidator.inputCategory = res
    },

    async KnowledgeCategoryGetList() {
      //获取知识库列表
      const res = await this.$api.MMS.KnowledgeCategory.GetList({})
      if (res.ok) {
        this.categoryData = this.getTreeData(res.data)
      }
    },
    getTreeData(data) {
      // 递归
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
    addKnowledge(type, item) {
      this.photoId0Img = ''
      this.photoId1Img = ''
      if (type == 'Editing' || type == 'chakan') {
        this.categoryId = item.categoryId
        this.formValidator.inputCategory = item.categoryName
        this.formValidator.subject = item.subject
        this.categoryNo = item.no
        this.keyword = item.keywords
        this.formValidator.inputCenter = item.content
        this.photoId0 = item.photoId0
        this.photoId1 = item.photoId1

        if (item.photoId0 != 0 && item.photoId0 != null) {
          this.ImageGetThumbnailImg(this.photoId0, '0')
        }
        if (item.photoId1 != 0 && item.photoId1 != null) {
          this.ImageGetThumbnailImg(this.photoId1, '1')
        }
      } else {
        this.formValidator.subject = ''
        this.keyword = ''
        this.formValidator.inputCenter = ''
        this.formValidator.inputCategory = ''
        this.photoId0 = ''
        this.photoId1 = ''
      }
      //添加
      this.addKnowledgeType = type
      this.addKnowledgeShow = true
      this.itemX = item
    },
    Current(e) {
      //分页响应事件
      this.pageIndex = e //赋值更新方法
      this.KnowledgeGetList()
    },
    async KnowledgeGetList() {
      //获取知识库
      const res = await this.$api.MMS.Knowledge.GetList({
        pageSize: this.pageSize, //一页多少条
        pageIndex: this.pageIndex, //实时页码
      })
      if (res.ok) {
        this.KnowledgeData = res.data
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
@import './styles/Knowledge.scss';
</style>

<style lang="scss">
.Knowledge_tanchuang_ying {
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
                align-items: center;

                .chakan {
                  color: #00f0ff;
                }
                //换行
                .min_hei {
                  max-height: 12.5rem;
                  overflow: auto;
                  white-space: pre-wrap;
                }
                .zhutiInput {
                  width: 200px;
                  color: #fff;
                  input::-webkit-input-placeholder {
                    /* placeholder颜色  */
                    color: #fff;
                  }
                }
                .keyword {
                  width: 300px;
                }

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
                .span_width {
                  width: 68px;
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
                  ul {
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
                        width: 6vw;
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
                  width: 500px !important;
                  color: #00f0ff;
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
