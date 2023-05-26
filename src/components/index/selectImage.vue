<!--
 * @Author: your name
 * @Date: 2020-12-16 19:22:29
 * @LastEditTime: 2021-11-23 15:26:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \IBMS\ibms\src\components\index\selectImage.vue
-->
<template>
  <div>
    <div class="selectFile">
      <div class="information_moveFiles">
        <div class="moveFiles_top">
          <span>当前路径：{{ systemFileData.path }}</span>
          <!-- <button @click="FileSystemMove()">移动到当前目录</button> -->
        </div>
        <div class="moveFiles_center">
          <div class="moveFiles_center_list">
            <el-table
              :data="systemFileData.list"
              style="width: 100%"
              :row-class-name="tableRowClassName"
            >
              <el-table-column
                prop="originalFileName"
                label="名称"
              >
                <template v-slot="scope">
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
                      :title="scope.row.originalFileName"
                      href="javascript:;"
                      @click="jumpFile(scope.row)"
                      class="originalFileName_a"
                    >{{ scope.row.originalFileName }}</a>
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column
                prop="fileSize"
                label="大小"
                width="80px"
              >
                <template scope="scope">
                  <a :title="scope.row.fileSize">
                    <span>{{
                      scope.row.fileType == 1 ? '' : scope.row.fileSize
                    }}</span>
                  </a>
                </template>
              </el-table-column> -->
              <el-table-column
                prop="createTime"
                label="创建时间"
                width="180px"
              >
                <template v-slot="scope">
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
                width="80px"
              ></el-table-column>
              <el-table-column
                label="选择"
                width="50px"
              >
                <template v-slot="scope">
                  <span
                    style="cursor: pointer;"
                    v-if="
                      partType == 'edselectFile'||partType == 'selectFile'||partType == 'edselectFileimg'||partType == 'addedselectFileimg'
                    "
                    @click="addTc(partType, scope.row.fileId)"
                  >{{
                      $Tools.noImg(scope.row.originalFileName) ? '' : '选择'
                    }}</span>
                  <span
                    style="cursor: pointer;"
                    v-else
                    @click="addFile(scope.row,partType)"
                  >{{
                    scope.row.fileType == 1 || scope.row.fileType == 3
                      ? ''
                      : '选择'
                  }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    partType: '',
  },
  data() {
    return {
      systemFileData: {}, //文档管理数据
      directoryNo: 0, //要跳转的文件号//
      parentNo: 0, //父级id
      jumpNums: [], //创建父级id
    }
  },
  computed: {
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
  mounted() {
    this.FileSystemGetList() //文档管理数据
  },
  methods: {
    async addTc(type, id) {
      //弹窗
      this.$emit('previousUp', type, id)
    },
    addFile(item, type) {
      //弹窗
      this.$emit('selectFile', item, type)
    },
    async jumpFile(item) {
      console.log(item)
      //点击文件
      if (item.originalFileName == '返回上一级') {
        this.directoryNo = this.jumpNums[this.jumpNums.length - 2] //获取上一级id号 -1为当前id

        this.jumpNums.splice(this.jumpNums.length - 2, 1)
      } else {
        if (item.fileType == 1) {
          this.jumpNums.push(item.no)
          this.parentNo = item.parentNo
          this.directoryNo = item.no
          // this.jumpNums.push(item.directoryNo)
          // this.parentNo = item.directoryNo
          // this.directoryNo = item.directoryNo
        } else {
        }
      }
      this.FileSystemGetList() //更新列表
      //跳转文件
    },
    async FileSystemGetList() {
      //获取数据
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

<style lang="scss">
//选择文件
.selectFile {
  //移动
  .information_moveFiles {
    opacity: 0.9;
    margin: 12px 24px;
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
      height: 44vh;
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
}
</style>
