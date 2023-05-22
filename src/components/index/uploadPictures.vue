<!--
 * @Author: your name
 * @Date: 2020-12-10 17:40:48
 * @LastEditTime: 2021-11-23 15:26:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \IBMS\ibms\src\components\Model\ThreeFiles\subView\ModalHome.vue
-->
<template>
  <div class="information_uploadFiles">
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
          multiple
        >
          <!-- slot="trigger" -->
          <el-button size="small" type="primary" class="file_bu" @click="submitUpload">选取文件</el-button>

          <div slot="tip" class="el-upload__tip">说明：请不要上传大于40M的文件！</div>
        </el-upload>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    EquipmentTcType: ''
  },
  data() {
    return {
      uploadFormFileList: [], // 确定上传文件
      fileList: [],
      scussFile: {} //成功后的文件数据
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

    async handleUploadForm(param) {
      //文件上传

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
          type: 'warning'
        })
      }
      const res = await this.$api.FileUploadImg(formData)
      if (res.ok) {
        this.scussFile.id = res.data[0]
        this.scussFile.size = param.file.size
        this.$emit('addTc', this.EquipmentTcType, this.scussFile)

        // this.$message('上传文件成功，' + res.message)
      } else {
        this.$message('上传文件失败，' + data.message)
      }
    }
  },
  mounted: function() {}
}
</script>

<style lang="scss" scoped>
//上传文件
.information_uploadFiles {
  .tanchuang_center_cen_top_edit {
    margin-top: 10vh;

  }
}
</style>
