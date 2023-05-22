<!--
 * @Author: your name
 * @Date: 2020-11-24 17:04:59
 * @LastEditTime: 2021-11-23 15:26:08
 * @LastEditors: Please set LastEditors
 * @Description: 查看报单人
 * @FilePath: \ibms\src\components\index\userGetModel.vue
-->

<template>
  <div>
    <div
      class="Self_center"
      v-if="viewFalg"
    >
      <div class="center_left">
        <ul>
          <!-- <li>
            <span class="one">账号:</span>
            <span>{{UserMdel.userAccount}}</span>
          </li> -->
          <li>
            <span class="one">工号：</span>
            <span>{{UserMdel.cd}}</span>
          </li>
          <li>
            <span class="one">姓名:</span>
            <span>{{UserMdel.name}}</span>
          </li>
          <li>
            <span class="one">性别:</span>
            <span>{{UserMdel.sdSex?'男':'女'}}</span>
          </li>
          <li>
            <span class="one">部门：</span>
            <span>{{UserMdel.departmentName}}</span>
          </li>
          <!-- <li>
            <span class="one">职位：</span>
            <span>{{UserMdel.post}}</span>
          </li> -->
          <li>
            <span class="one">电话:</span>
            <span>{{UserMdel.mobile}}</span>
          </li>
          <li>
            <span class="one">邮箱:</span>
            <span>{{UserMdel.email}}</span>
          </li>
        </ul>
      </div>
      <!-- <div class="center_right">
        <div class="center_right_ptot">
          <img
            :src="userimg||require('@/assets/image/index/userSelf.png')"
            alt="头像"
          />
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  props: {
    applyUserNo: '',
  },
  data() {
    return {
      UserMdel: {
        userAccount: '',
      },
      userimg: '',
      viewFalg: false,
    }
  },
  mounted() {
    this.UserGetModel()
  },
  methods: {
    async UserGetModel() {
      const res = await this.$api.MMS.User.GetModel({
        no: this.applyUserNo,
      })
      if (res.ok) {
        console.log(res);
        this.UserMdel = res.data
        this.userimg = `${this.$api.ImageGetImg + res.data.photoId}`
        this.viewFalg = true
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.Self_center {
  display: flex;
  margin: 50px 0;
  .center_left {
    flex: 1;
    ul {
      margin-left: 50px;
      text-align: left;

      li {
        height: 30px;
        display: flex;
        .one {
          display: inline-block;
          width: 69px;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
  }
  .center_right {
    flex: 1;
    position: relative;
    width: 100%;
    .center_right_ptot {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      img {
        width: 168px;
        height: 198px;
      }
    }
  }
}
</style>
