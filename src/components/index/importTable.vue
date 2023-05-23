<!--
 * @Author: your name
 * @Date: 2020-12-30 15:59:07
 * @LastEditTime: 2021-10-28 17:15:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \IBMS\ibms\src\components\importTable.vue
-->
<template>
  <div
    :class="['tanchuang_dianbiao', table.position ? table.position : '']"
    v-if="table.show"
  >
    <div class="tanchuang">
      <div class="tanchuang_bg">
        <div class="tanchuang_top">
          <img :src="require('~@/assets/image/index/partial_left.png')" alt />
          <span class="top_title">{{ table.title }}</span>

          <img :src="require('@/assets/image/index/partial_right.png')" alt />
        </div>
        <div class="tanchuang_center">
          <div class="tanchuang_center_cen">
            <ul class="tanchuang_center_cen_top_edit">
              <li>
                <a :href="`${http}Template/${table.url}.xlsx`">
                  <el-button size="small" type="primary">下载模板</el-button>
                </a>
              </li>
              <li class="upload_li">
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  action
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :auto-upload="true"
                  :headers="headers"
                  :http-request="addExcel"
                  :limit="1"
                  :data="{ areaId: table.floorId }"
                  multiple
                >
                  <el-button
                    slot="trigger"
                    size="small"
                    type="primary"
                    @click="submitUpload"
                    >选取文件</el-button
                  >
                  <div
                    slot="tip"
                    class="el-upload__tip"
                    v-html="uploader.tip"
                  ></div>
                </el-upload>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="cancel">
        <img
          @click="table.show = false"
          :src="require('@/assets/image/index/cancel.png')"
          alt
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    EquipmentTcType: '',
    table: {
      title: '',
      url: '',
      methods: '',
      controller: '',
      show: false,
      floorId: ''
    }
  },
  data() {
    return {
      http: '',
      fileList: [],
      uploader: {
        tip: ''
      }
    }
  },
  computed: {
    headers() {
      return {
        token: this.$store.state.token,
        // 'Content-Type': 'application/x-www-form-urlencoded'
        'Content-Type': 'multipart/form-data'
      }
    }
  },
  methods: {
    submitUpload(e) {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {},

    async addExcel(files) {
      try {
        let formData = new FormData()

        var sefl = this
        formData.append('formFile', files.file)
        console.log(this.table)
        if (this.table.url == 'InspectionItem') {
          formData.append('areaId', this.table.floorId)
        }
        const data = await eval(
          this.$api.MMS[this.table.controller][this.table.methods](formData)
        ) //动态导入方法名
        if (data.ok) {
          this.uploader.tip = data.message.replace(/\n/g, '<br/>')
        } else {
          this.$Tools.LayerMsgErr(data.data)
        }
      } catch (e) {
        console.log(e)
        return this.$Tools.LayerMsgErr('导入格式不正确!!!')
      }
    }
  },
  mounted: function() {
    this.http = window.ApiBaseURL
  }
}
</script>

<style lang="scss" scoped>
//全局弹窗样式
.positionclass {
  top: -11.3vh !important;
  left: -26vw !important;
}

.tanchuang_dianbiao {
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
        > img {
          vertical-align: baseline;
          height: 12px;
          width: 22px;
        }
      }

      .tanchuang_center {
        .tanchuang_center_cen {
          margin-top: 6vh;
          .tanchuang_center_cen_top {
            width: 26vw;
            li {
              margin-top: 1vh;
              display: flex;
              justify-content: flex-end;
              align-items: center;
              input {
                border-radius: 0;
                width: 8.5vw;
                height: 3vh;
                line-height: 3vh;
                background-color: rgba(0, 0, 0, 0);
                border: 1px solid #00f0ff;
                font-size: 14px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: #ffffff;
                padding-left: 0.7vw;
              }
              span {
                font-size: 16px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: #00f0ff;
              }
              i {
                //**** */
                font-size: 20px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: #00f0ff;
                vertical-align: bottom;
                margin-left: 5px;
              }
            }
          }
          .tanchuang_center_cen_top_edit {
            // width: 26vw;
            height: 10vh;
            margin: 0 3vw;
            color: #fff;
            > li {
              display: flex;
              align-items: center;
              justify-content: start;
            }
            .upload_li {
              margin-top: 13px;
              .el-upload__tip {
                margin-top: 18px;
                color: #fff;
                overflow: hidden;
                height: 35vh;
                overflow-y: scroll;
              }
              .upload-demo {
                text-align: left;
                align-items: flex-start !important;
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
        width: 44px;
        height: 44px;
      }
    }
  }
}
</style>
