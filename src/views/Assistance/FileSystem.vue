<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-02-18 16:41:46
 * @LastEditors: Please set LastEditors
 * @Description: 文档管理
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->
<template>
  <div class="craftingassistance public_body">
    <div class="craftingassistance_cneter">
      <div :class="[
          'public_page',
          'systemFile',
          $store.state.dtab ? 'index_off' : 'index_no'
        ]">
        <div class="systemFile_center">
          <div class="systemFile_center_top">
            <ul>
              <li>
                <span class="filefont">文件名：</span>
                <input
                  class="filrInput"
                  type="text"
                  v-model="fileName"
                />
              </li>
              <li>
                <button
                  class="blue_button"
                  @click="FileSystemSearch()"
                >
                  搜索
                </button>
              </li>
              <li>
                <!-- v-show="systemFileData.editFile" -->
                <button
                  class="blue_button"
                  v-if="FileSearchDataShow"
                  @click="FileSearchDataShow = false"
                >
                  返回
                </button>
              </li>
              <li v-if="
                  $Tools.accessControl(
                    this.$store.state.userGetUserRole.resList,
                    'EditFileSystem'
                  )
                ">
                <!-- v-show="systemFileData.editFile" -->
                <button @click="addFile()">新建文件夹</button>
              </li>

              <li v-if="
                  $Tools.accessControl(
                    this.$store.state.userGetUserRole.resList,
                    'EditFileSystem'
                  )
                ">
                <button @click="addUpload()">上传文件</button>
              </li>
            </ul>
          </div>
          <div class="systemFile_center_push">
            <ul>
              <li>
                <span>当前路径：</span>
                <span v-html="systemFileData.path"></span>
              </li>
            </ul>
          </div>
          <div class="systemFile_center_list">
            <el-table
              v-if="FileSearchDataShow == false"
              :data="systemFileData.list"
              style="width: 100%"
              :row-class-name="tableRowClassName"
            >
              <el-table-column
                prop="originalFileName"
                label="名称"
              >
                <template slot-scope="scope">
                  <div class="file_icon">
                    <img
                      :src="
                        require('@/assets/image/index/FileIcon' +
                          returnPicture(scope.row.originalFileName) +
                          '.png')
                      "
                      alt
                    />
                    <a
                      v-if="scope.row.originalFileName == '返回上一级'"
                      href="javascript:;"
                      @click="jumpFile(scope.row)"
                      class="originalFileName_a"
                    >{{ scope.row.originalFileName }}</a>
                    <span v-else>
                      <a
                        v-if="inputValueDirectoryNo != scope.row.no"
                        href="javascript:;"
                        :title="scope.row.originalFileName"
                        @click="jumpFile(scope.row)"
                        class="originalFileName_a"
                      >{{ scope.row.originalFileName }}</a>

                      <input
                        type="text"
                        v-model="inputValue"
                        v-else
                        @blur="handleInputConfirm(inputValue, scope.row.no)"
                      />
                    </span>
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column
                prop="fileSize"
                label="大小"
                width="160px"
              >
                <template scope="scope">
                  <span>{{
                    scope.row.fileType == 1 ? '' : sizeTostr(scope.row.fileSize)
                  }}</span>
                </template>
              </el-table-column> -->
              <el-table-column
                prop="createTime"
                label="创建时间"
                width="180px"
              >
                <template slot-scope="scope">
                  <a
                    href="javascript:;"
                    :title="$Tools.timeFormatAll(scope.row.createTime)"
                  >
                    <span>{{
                      $Tools.timeFormatAll(scope.row.createTime)
                    }}</span>
                  </a>
                </template>
              </el-table-column>
              <el-table-column
                prop="createUserName"
                label="创建者"
                width="80px"
              ></el-table-column>
              <el-table-column
                label="移动"
                width="60px"
                v-if="
                  $Tools.accessControl(
                    this.$store.state.userGetUserRole.resList,
                    'EditFileSystem'
                  )
                "
              >
                <template slot-scope="scope">
                  <span
                    class="yidong"
                    @click="moveFiles(scope.row)"
                  >{{
                    scope.row.fileType == 3 ? '' : '移动'
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="删除"
                width="60px"
                v-if="
                  $Tools.accessControl(
                    this.$store.state.userGetUserRole.resList,
                    'EditFileSystem'
                  )
                "
              >
                <template slot-scope="scope">
                  <el-popconfirm
                    title="确定删除吗"
                    @onConfirm="FileDelete(scope.row)"
                    @confirm="FileDelete(scope.row)"
                  >
                    <span
                      class="red"
                      slot="reference"
                    >{{
                      scope.row.fileType == 3 ? '' : '删除'
                    }}</span>
                  </el-popconfirm>
                </template>
              </el-table-column>
              <el-table-column
                label="重命名"
                width="80px"
                v-if="
                  $Tools.accessControl(
                    this.$store.state.userGetUserRole.resList,
                    'EditFileSystem'
                  )
                "
              >
                <template scope="scope">
                  <span
                    class="changkan"
                    @click="showInput(scope.row)"
                  >{{
                    scope.row.fileType == 3 ? '' : '重命名'
                  }}</span>
                </template>
              </el-table-column>
            </el-table>

            <el-table
              v-else
              :data="FileSearchData"
              style="width: 100%"
              :row-class-name="tableRowClassName"
            >
              <el-table-column
                prop="originalFileName"
                label="名称"
              >
                <template slot-scope="scope">
                  <div class="file_icon">
                    <img
                      :src="
                        require('@/assets/image/index/FileIcon' +
                          returnPicture(scope.row.originalFileName) +
                          '.png')
                      "
                      alt
                    />
                    <span>{{ scope.row.originalFileName }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="fileSize"
                label="大小"
                width="100px"
              ></el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间"
              >
                <template slot-scope="scope">
                  <span>{{
                    scope.row.createTime
                      .split('T')
                      .join(' ')
                      .substring(0, 19)
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="createUserName"
                width="100px"
                label="创建者"
              ></el-table-column>
              <el-table-column
                label="移动"
                width="100px"
              >
                <template slot-scope="scope">
                  <span
                    class="yidong"
                    @click="jumpFiles(scope.row)"
                  >跳转</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div
        class="FileSystem_tanchuang_ying"
        v-if="addfileTcShow"
      >
        <div class="tanchuang">
          <div class="tanchuang_bg">
            <div class="tanchuang_top">
              <img
                :src="require('~@/assets/image/index/partial_left.png')"
                alt
              />
              <span class="top_title margin_tc">{{
                addfileTcShowType == ''
                  ? '新建文件夹'
                  : addfileTcShowType == 'moveFiles'
                  ? '移动文件夹'
                  : addfileTcShowType == 'uploadFiles'
                  ? '上传文件'
                  : '文件夹属性'
              }}</span>

              <img
                :src="require('@/assets/image/index/partial_right.png')"
                alt
              />
            </div>
            <div class="tanchuang_center">
              <div class="tanchuang_center_cen">
                <div class="file_tanchuang_center_cen_top">
                  <div
                    class="information_Attribute"
                    v-if="addfileTcShowType == 'Attribute'"
                  >
                    <ul>
                      <li>
                        <span>
                          <img
                            :src="require('@/assets/image/index/FileIcon1.png')"
                            alt
                          />
                        </span>
                        <span>{{ fileAttributeItem.originalFileName }}</span>
                      </li>
                      <li>
                        <span>位置：</span>
                        <span>{{
                          systemFileData.path +
                            '' +
                            fileAttributeItem.originalFileName
                        }}</span>
                      </li>
                      <li>
                        <span>创建时间：</span>
                        <span>{{ fileAttributeItem.createTime }}</span>
                      </li>
                      <li>
                        <span>文件大小:</span>
                        <span>{{ fileAttributeItem.fileSize }}</span>
                      </li>
                      <li>
                        <span>创建者：</span>
                        <span>{{ fileAttributeItem.createUserName }}</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    class="information_moveFiles"
                    v-else-if="addfileTcShowType == 'moveFiles'"
                  >
                    <div class="moveFiles_top">
                      <span>当前路径：{{ movePath }}</span>
                      <button @click="FileSystemMove()">移动到当前目录</button>
                    </div>
                    <div class="moveFiles_center">
                      <div class="moveFiles_center_list">
                        <el-table
                          :data="moveData"
                          style="width: 100%"
                          :row-class-name="tableRowClassName"
                        >
                          <el-table-column
                            prop="originalFileName"
                            label="名称"
                          >
                            <template slot-scope="scope">
                              <div class="file_icon">
                                <img
                                  :src="
                                    require('@/assets/image/index/FileIcon' +
                                      returnPicture(
                                        scope.row.originalFileName
                                      ) +
                                      '.png')
                                  "
                                  alt
                                />
                                <a
                                  href="javascript:;"
                                  @click="moveDataFile(scope.row)"
                                  class="originalFileName_a"
                                >{{ scope.row.originalFileName }}</a>
                              </div>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="createTime"
                            label="创建时间"
                          >
                            <template slot-scope="scope">
                              <span>{{
                                scope.row.createTime
                                  .split('T')
                                  .join(' ')
                                  .substring(0, 19)
                              }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="createUserName"
                            label="创建者"
                            width="100px"
                          ></el-table-column>
                        </el-table>
                      </div>
                    </div>
                  </div>
                  <div
                    class="information_uploadFiles"
                    v-else-if="addfileTcShowType == 'uploadFiles'"
                  >
                    <ul class="tanchuang_center_cen_top_edit">
                      <li class="uploadFiles_file">
                        <el-upload
                          class="upload-demo"
                          ref="upload"
                          action
                          :on-preview="handlePreview"
                          :on-remove="handleRemove"
                          :file-list="fileList"
                          :auto-upload="true"
                          :http-request="handleUploadForm"
                          :headers="headers"
                          :limit="1"
                          :beforeUpload="beforeAvatarUpload"
                        >
                          <!-- slot="trigger" -->
                          <el-button
                            size="small"
                            type="primary"
                            class="file_bu"
                            @click="submitUpload"
                          >选取文件</el-button>

                          <div
                            slot="tip"
                            class="el-upload__tip"
                          >
                            说明：请不要上传大于40M的文件！
                          </div>
                        </el-upload>
                      </li>
                    </ul>
                  </div>
                  <div
                    class="information_top formValidator"
                    v-else
                  >
                    <p>
                      <span>文件夹名：</span>
                      <el-form
                        :model="formValidator"
                        ref="formValidator"
                        class="demo-dynamic"
                        :rules="rules"
                      >
                        <el-form-item prop="folderName">
                          <el-input
                            type="text"
                            v-model="formValidator.folderName"
                          />
                        </el-form-item>
                      </el-form>
                      <!-- <span>*</span> -->
                    </p>
                  </div>
                </div>
                <div
                  class="tanchuang_center_cen_bottom"
                  v-if="
                    addfileTcShowType == '' ||
                      addfileTcShowType == 'uploadFiles'
                  "
                >
                  <button
                    @click="
                      addfileTcShowType == ''
                        ? FileSystemAddDirectory('formValidator')
                        : FileSystemSave()
                    "
                    v-preventReClick="2000"
                  >
                    确认
                  </button>
                  <button @click="addfileTcShow = false">取消</button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="cancel"
            @click="addfileTcShow = false"
          >
            <img
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
      formValidator: {
        folderName: '',
      },
      rules: {
        folderName: [
          { required: true, message: '请输入文件名', trigger: 'blur' },
        ],
      },
      directoryNo: 0, //要跳转的文件号//
      parentNo: 0, //父级id
      inputValueDirectoryNo: 0, //重命名id号判断
      systemFileData: {}, //文档管理数据
      FileSearchData: [], //搜索接口
      addfileTcShow: false, //新建文件夹
      addfileTcShowType: '', //文件属性
      moveData: [], //移动列表
      jumpNums: [], //创建父级id
      directoryNoMove: 0, //移动文件夹id号
      parentNoMove: 0, ////移动文件夹父亲
      pageSize: 13, //一页多少条
      pageIndex: 1, //实时页码
      fileName: '', //文件管理
      fileTcShow: false, //文档管理弹窗显示
      fileTcType: '',

      authority: '',
      selectuser: false,
      Department: '请选择', //所属部门：
      DepartmentData: [], //所属部门数据：
      DepartmentId: '',
      CreateUserNo: 0,
      CreateTime: '',
      selectuserData: {
        list: [],
      },
      inputVisible: false,
      inputValue: '',
      nextPnde: 0,
      FileSearchDataShow: false,
      VUE_APP_UPLOAD_URL: '',
      uploadFormFileList: [], // 确定上传文件
      fileList: [],
      scussFile: {}, //成功后的文件数据
      scussFileName: '', //预上传文件号
      blockLength: 0, //分段长度
      upfileName: '',
      downfileName: '',
      downfileSize: 0,
      downFileId: '',
      maxHttpRequestCount: 100,
      maxHttpRequest: 1,
      uploadingCount: 0,
    }
  },

  created() {},
  mounted() {
    this.VUE_APP_UPLOAD_URL = window.ApiBaseURL

    this.FileSystemGetList() //文档管理数据
  },
  destroyed() {},
  computed: {
    headers() {
      return {
        Token: this.$store.state.token,
        'Content-Type': 'multipart/form-data',
      }
    },

    returnPicture: function () {
      //返回当前时间的上一个月
      //通过回调函数给计算属性传参
      return function (name) {
        var index = name.indexOf('.')
        var result = name.substr(index + 1, name.length)
        //根据后缀名指定文件类型
        if (index == -1) {
          return 1
        }
        switch (result) {
          case 'jpg':
            return 2
          case '返回上一级':
            return 3
          case 'ico':
            return 4
          case 'docx':
            return 5
          case 'png':
            return 6
          case 'pdf':
            return 7
          default:
            return 4
        }
      }
    },
  },
  methods: {
    sizeTostr(size) {
      if (!size) return ''
      var data = ''
      if (size < 0.1 * 1024) {
        //如果小于0.1KB转化成B
        data = size.toFixed(2) + 'B'
      } else if (size < 0.1 * 1024 * 1024) {
        //如果小于0.1MB转化成KB
        data = (size / 1024).toFixed(2) + 'KB'
      } else if (size < 0.1 * 1024 * 1024 * 1024) {
        //如果小于0.1GB转化成MB
        data = (size / (1024 * 1024)).toFixed(2) + 'MB'
      } else {
        //其他转化成GB
        data = (size / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
      }
      var sizestr = data + ''
      var len = sizestr.indexOf('.')
      var dec = sizestr.substr(len + 1, 2)
      if (dec == '00') {
        //当小数点后为00时 去掉小数部分
        return sizestr.substring(0, len) + sizestr.substr(len + 3, 2)
      }
      return sizestr
    },
    beforeAvatarUpload(file) {
      //限制文件大小
      const isLt2M = file.size / 1024 / 1024 < 40
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 40MB!',
          type: 'warning',
        })
      }
      return isLt2M
    },
    async FileSystemSave() {
      //合并
      const prepareres = await this.$api.MMS.FileSystem.AddFile({
        name: this.upfileName,
        Id: this.downFileId,
        FileSize: this.downfileSize,
        partentNo: this.directoryNo,
      })
      if (prepareres.ok) {
        this.addfileTcShow = false
        this.FileSystemGetList() //更新列表
        this.$message(prepareres.message)
      } else {
        this.$message(prepareres.message)
      }
    },
    isFile() {},
    async UploadPartFileAjax(a, fileData) {
      let res = await this.$api.MMS.File.UploadPart(a, fileData)
      return res.ok
    },
    async handleUploadForm(parse) {
      const loading = this.$loading({
        lock: true,
        text: '上传中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      var _this = this
      this.upfileName = ''
      this.downfileName = ''
      this.downfileSize = 0
      this.blockLength = 0
      //文件上传
      var pos = parse.file.name.lastIndexOf('.')
      var imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp']
      var extension = parse.file.name
        .substr(pos)
        .toLowerCase()
        .replace(/(\s*$)/g, '')
      if (imageExtensions.indexOf(extension) == -1) {
        const data = await this.$api.MMS.File.UploadPre({
          originalName: parse.file.name,
        })
        const LENGTH = 1024 * 1024 * 3
        let chunks = this.slice(parse.file, LENGTH) // 首先拆分切片
        this.blockLength = chunks.length
        if (data.ok) {
          this.upfileName = parse.file.name
          this.downfileName = data.data
          this.downfileSize = parse.file.size

          this.uploadingCount = this.blockLength
          while (this.uploadingCount > 0) {
            let i = this.blockLength - this.uploadingCount
            let fileData = new FormData()
            fileData.append('file', chunks[i])
            let a = `?fileName=${data.data}&index=${i}`
            if (await this.UploadPartFileAjax(a, fileData)) {
              this.uploadingCount--
            }
          }
          let file = `?total=${this.blockLength}&fileName=${this.downfileName}&originalName=${this.upfileName}&fileSize=${this.downfileSize}`
          const resData = await this.$api.MMS.File.FileMerge(file)
          this.downFileId = resData.data

          loading.close()
        } else {
          this.$message('上传文件失败，')
        }
      } else {
        let formData = new FormData()

        formData.append('file', parse.file)
        const resdata = await this.$api.MMS.Image.UploadImg(formData)
        if (resdata.ok) {
          this.downFileId = resdata.data[0]
          this.downfileSize = parse.file.size
          this.upfileName = parse.file.name
          loading.close()
        } else {
          this.$message('上传失败，')
        }
      }
    },
    slice(file, piece = 1024 * 1024 * 5) {
      let totalSize = file.size // 文件总大小
      let start = 0 // 每次上传的开始字节
      let end = start + piece // 每次上传的结尾字节
      let chunks = []
      while (start < totalSize) {
        // 根据长度截取每次需要上传的数据
        // File对象继承自Blob对象，因此包含slice方法
        let blob = file.slice(start, end)
        chunks.push(blob)
        start = end
        end = start + piece
      }
      return chunks
    },
    submitUpload(e) {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    addUpload() {
      //文件上传
      this.addfileTcShow = true
      this.addfileTcShowType = 'uploadFiles'
    },
    jumpFiles(row) {
      //跳转文件
console.log(row)
      if (row) {
        this.directoryNo = row.parentNo //获取跳转到的父级
        this.FileSystemGetList() //刷新文件列表
        this.FileSearchDataShow = false
      }
    },
    async FileSystemMove() {
      const res = await this.$api.MMS.FileSystem.Move({
        no: this.directoryNoMove, //移动的对象
        parentNo: this.parentNoMove, //移动到对应的目录
      })
      if (res.ok) {
        this.FileSystemGetList() //刷新文件列表
        this.addfileTcShow = false
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    async moveDataFile(row) {
      //移动文件夹
      //跳转文件
      if (row.originalFileName == '返回上一级') {
        this.parentNoMove = this.parentNums[this.parentNums.length - 1] //获取上一级id号
        this.parentNums.splice(this.parentNums.length - 1, 2)
        // var site = this.movePath.lastIndexOf('/') //获取最后一个斜杠的位置
        // this.movePath = this.movePath.substr(site, this.movePath.length - 1)
        this.movePath = ''
        this.parentPath.splice(this.parentNums.length, 1) //返回时截取最后一位重新赋值
        for (var i in this.parentPath) {
          this.movePath += this.parentPath[i]
        }
      } else {
        this.movePath = ''
        this.parentNums.push(row.parentNo)
        this.nextPnde = row.parentNo //父级id号传人返回上一级中
        this.parentNoMove = row.no //id号传递到目录中
        this.parentPath.push('/' + row.originalFileName) //移动文件夹路径
        for (var i in this.parentPath) {
          this.movePath += this.parentPath[i]
        }
      }
      this.FileSystemMoveList()
    },
    async moveFiles(row) {
      this.parentNums = [] //创建父级id
      this.parentPath = []
      this.movePath = ''
      this.parentNoMove = row.parentNo
      this.directoryNoMove = row.no

      //移动
      this.addfileTcShow = true
      this.addfileTcShowType = 'moveFiles'
      this.FileSystemMoveList()
    },
    async FileSystemMoveList() {
      const res = await this.$api.MMS.FileSystem.MoveList({
        no: this.directoryNoMove, //id号
        parentNo: this.parentNoMove, //目录
      })
      if (res.ok) {
        if (this.parentNoMove == 0) {
          this.moveData = res.data
        } else {
          let arr = []
          arr = res.data
          const obj = {
            createTime: '',
            createUserName: '',
            createUserNo: 0,
            directoryNo: this.directoryNoMove,
            fileMd5: null,
            fileName: '',
            fileSize: '',
            fileType: 3,
            originalFileName: '返回上一级',
            parentNo: this.nextPnde,
            thumbnailMd5: null,
            thumbnailName: null,
            thumbnailSize: null,
          }
          arr.unshift(obj)

          this.moveData = arr
        }
      }
    },

    async FileSystemAddDirectory(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.MMS.FileSystem.AddDirectory({
            name: this.formValidator.folderName,
            partentNo: this.directoryNo,
          })

          if (res.ok) {
            this.addfileTcShow = false
            this.FileSystemGetList() //更新列表
          } else {
            this.$Tools.LayerMsgErr(res.message)
          }
        } else {
          return false
        }
      })
    },

    showInput(row) {
      this.inputVisible = true
      this.inputValue = row.originalFileName
      this.inputValueDirectoryNo = row.no
    },

    async handleInputConfirm(inputValue, directoryNo) {
      //失去焦点
      this.inputValueDirectoryNo = 0

      if (inputValue) {
        const res = await this.$api.MMS.FileSystem.ReName({
          name: inputValue,
          no: directoryNo,
        })
        if (res.ok) {
          this.FileSystemGetList() //更新列表
        }
      }

      this.inputValue = ''
    },
    async FileDelete(item) {
      //判断是图片还是文件
      const resfile = await this.$api.MMS.FileSystem.Delete({
        no: item.no,
      })
      if (resfile.ok) {
        this.$message.success('删除成功')
        this.FileSystemGetList() //更新列表
      } else {
        this.$message.success(resfile.message)
      }
      // if (this.$Tools.noImg(item.originalFileName)) {
      //   //不是图片
      //   //删除文档管理项
      //   const res = await this.$api.MMS.File.Delete(item.fileId)
      //   if (res.ok) {
      //     this.FileSystemGetList() //更新列表
      //   }
      // } else {
      //   const res = await this.$api.MMS.Image.Delete(item.fileId)
      //   if (res.ok) {
      //     this.FileSystemGetList() //更新列表
      //   }
      // }
    },
    async jumpFile(item) {
      console.log(item)
      if (item.originalFileName == '返回上一级') {
        this.directoryNo = this.jumpNums[this.jumpNums.length - 2] //获取上一级id号 -1为当前id
        this.jumpNums.splice(this.jumpNums.length - 1, 1)
        // this.jumpNums.splice(this.jumpNums.length - 2, 1)
      } else {
        if (item.fileType == 1) {
          this.jumpNums.push(item.no)
          this.parentNo = item.parentNo
          this.directoryNo = item.no
        } else {
          var pos = item.originalFileName.lastIndexOf('.')
          var imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp']
          var extension = item.originalFileName
            .substr(pos)
            .toLowerCase()
            .replace(/(\s*$)/g, '')

          if (imageExtensions.indexOf(extension) == -1) {
            const no = item.no
            //预下载
            const prepareres = await this.$api.MMS.File.RequestDownloadFile(
              item.fileId
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
                let file = `?Id=${item.fileId}&index=${i}`
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
                  link.setAttribute('download', item.originalFileName)
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                  loading.close()
                }
              }
            }
          } else {
            const prepareres = await this.$api.MMS.Image.GetOriginalImg(
              item.fileId
            )
            if (prepareres) {
              let url = window.URL.createObjectURL(new Blob([prepareres]))
              let link = document.createElement('a')
              link.style.display = 'none'
              link.href = url
              link.setAttribute('download', item.originalFileName)
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            } else {
              this.$message('图片下载失败')
            }
          }
        }
      }
      this.FileSystemGetList() //更新列表
      //跳转文件
    },
    async FileSystemSearch() {
      if (!this.fileName) {
        return this.$Tools.LayerMsgErr('文件名不能为空')
      }
      //搜索
      const res = await this.$api.MMS.FileSystem.Search({
        name: this.fileName,
      })
      if (res.ok) {
        this.FileSearchData = res.data
        this.FileSearchDataShow = true
      }
    },
    async FileSystemGetList() {
      const res = await this.$api.MMS.FileSystem.GetList({
        directoryNo: this.directoryNo,
      })
      if (res.ok) {
        if (res.data.path == '/') {
          this.systemFileData = res.data
        } else {
          let arr = []
          arr = res.data

          const obj = {
            createTime: '',
            createUserName: '',
            createUserNo: 0,
            directoryNo: this.parentNo,
            fileMd5: null,
            fileName: '',
            fileSize: '',
            fileType: 3,
            originalFileName: '返回上一级',
            parentNo: 0,
            thumbnailMd5: null,
            thumbnailName: null,
            thumbnailSize: null,
          }
          arr.list.unshift(obj)

          this.systemFileData = arr
        }
      }
    },

    addFile() {
      //新建文件夹
      //文档管理
      //新建文件夹事件
      // this.fileTcShow = true
      this.addfileTcShow = true
      this.addfileTcShowType = ''
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
@import './styles/FileSystem.scss';
</style>
<style lang="scss">
.FileSystem_tanchuang_ying {
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
          width: 22px;
          height: 12px;
        }
      }

      .tanchuang_center {
        margin: 2vh 2vw;
        .tanchuang_center_cen {
          margin-top: 3vh;

          //文档管理弹窗
          .file_tanchuang_center_cen_top {
            margin-top: 4vh;

            text-align: center;
            .information_top {
              margin-top: 16vh;
              opacity: 0.8;
              p {
                font-size: 16px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: #00f0ff;
                margin-bottom: 1.85vh;
                margin-top: 1.85vh;
                display: flex;
                justify-content: center;
                align-items: center;
                input {
                  height: 3vh;
                  line-height: 3vh;
                  border: 1px solid #00f0ff;
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #ffffff;
                  background-color: rgba(0, 0, 0, 0);
                  margin-right: 0.3vw;
                }
              }
              span {
                margin: 0px 4px;
              }
            }
            .information_center {
              margin-top: 5vh;
              opacity: 0.8;
              text-align: center;
              .information_center_top {
                position: relative;
                margin-bottom: 2.4vh;

                p {
                  font-size: 16px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #00f0ff;
                  margin-bottom: 1.85vh;
                }
                > i {
                  position: absolute;
                  top: 0;
                  right: 0;
                  display: inline-block;
                  height: 3vh;
                  line-height: 3vh;
                  width: 3vw;
                  background: #007edd;
                  border-radius: 2px;
                  cursor: pointer;
                }
              }
              .information_center_bootom {
                table {
                  width: 100%;

                  tr {
                    height: 3vh;
                    font-size: 14px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
                    color: #00f0ff;
                    .red {
                      font-size: 14px;
                      font-family: MicrosoftYaHei;
                      font-weight: 400;
                      color: #ff3c00;
                      cursor: pointer;
                    }
                    :last-child {
                      width: 15%;
                    }
                  }
                }
              }
            }
            .information_Attribute {
              ul {
                // text-align: left;
                margin-left: 200px;

                li {
                  text-align: left;
                  height: 4vh;
                  padding: 25px 0;
                  span {
                    margin: 0 10px;
                  }
                }
              }
            }
            //移动
            .information_moveFiles {
              opacity: 0.9;
              .moveFiles_top {
                display: flex;
                justify-content: space-between;
                button {
                  cursor: pointer;
                  height: 30px;
                  // width: 6vw;
                  color: #fff;
                  background: #47d235;
                  border-radius: 2px;
                  background: rgba(0, 126, 221, 1);
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #ffffff;
                }
              }
              .moveFiles_center {
                height: 46vh;
                overflow: auto;
                .moveFiles_center_list {
                  .file_icon {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    a {
                      color: #fff;
                    }
                    img {
                      width: 16px;
                      height: 16px;
                    }

                    .originalFileName_a {
                      text-decoration: underline;
                      cursor: pointer;
                    }
                  }
                }
              }
            }
            //上传文件
            .information_uploadFiles {
              .tanchuang_center_cen_top_edit {
                margin-top: 10vh;
              }
            }

            //使用伪类覆盖单选框的样式
            .information_bootom {
              background-color: rgba(0, 0, 0, 0) !important;
              opacity: 0.8;
              .readio_top {
                margin-bottom: 1.85vh;
                margin-top: 1.85vh;
                font-size: 16px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: #00f0ff;
                margin-bottom: 1.85vh;
              }
              .readio_information {
                display: flex;
                justify-content: center;

                .radio_type {
                  margin-right: 6px;
                  width: 0px;
                  height: 0px;
                  appearance: none;
                  position: relative;
                  border: none;
                  outline: none;
                }
                .radio_type:before {
                  content: '';
                  width: 10px;
                  height: 10px;
                  border: 1px solid #00f0ff;
                  display: inline-block;
                  border-radius: 10%;
                  vertical-align: middle;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
                .radio_type:checked:before {
                  content: '';
                  width: 10px;
                  height: 10px;
                  border: 1px solid #00f0ff;
                  display: inline-block;
                  border-radius: 10%;
                  vertical-align: middle;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
                .radio_type:checked:after {
                  content: '';
                  width: 6px;
                  height: 6px;
                  text-align: center;
                  background: #00f0ff;
                  border-radius: 10%;
                  display: block;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }

                label {
                  height: 2vh;
                  line-height: 2vh;
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #00f0ff;
                  margin: 0 0.8vw;
                  display: flex;
                  align-items: center;
                  cursor: pointer;

                  input {
                    line-height: 2vh;
                  }
                  span {
                    margin: 0.3vw;
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
        // width: 44px;
        // height: 44px;
      }
    }
  }
}
</style>
