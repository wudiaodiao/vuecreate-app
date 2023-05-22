<!--
 * @Author: your name
 * @Date: 2022-01-17 19:50:53
 * @LastEditTime: 2022-01-17 20:26:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /ibms_ty/src/components/index/contractGetModel.vue
-->

<!--
 * @Author: your name
 * @Date: 2020-11-24 17:04:59
 * @LastEditTime: 2022-01-17 19:21:09
 * @LastEditors: Please set LastEditors
 * @Description: 查看报单人
 * @FilePath: \ibms\src\components\index\userGetModel.vue
-->

<template>
  <div>
    <div class="Self_center" v-if="viewFalg">
      <div class="center_left">
        <ul>
          <!-- <li>
            <span class="one">账号:</span>
            <span>{{UserMdel.userAccount}}</span>
          </li> -->

          <li>
            <span class="one">店铺:</span>
            <span>{{UserMdel.shopName}}</span>
          </li>
          <li>
            <span class="one">合同:</span>
            <span>{{UserMdel.name}}</span>
          </li>
          <li>
            <span class="one">合同类型:</span>
            <span>{{$Convert.OMS.getContractType(UserMdel.type)}}</span>
          </li>
          <li>
            <span class="one">合同状态:</span>
            <span>{{$Convert.OMS.getContractState(UserMdel.state)}}</span>
          </li>
               <li>
            <span class="one">铺位号:</span>
            <span>{{spaceCodes.join('，')}}</span>
          </li>
        </ul>
      </div>
      <div class="center_right">
        <div class="center_right_ptot">
          <img v-if="UserMdel.photoId" :src="userimg||require('@/assets/image/index/userSelf.png')" alt="头像" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    applyUserNo: ''
  },
  data() {
    return {
      UserMdel: {
        userAccount: ''
      },
      spaceCodes: [],
      userimg:'',
      viewFalg: false
    }
  },
  mounted() {

    this.UserGetModel()
  },
  methods: {
    async UserGetModel() {
      const res = await this.$api.OMS.Contract.GetModel({
        no: this.applyUserNo
      })
      if (res.ok) {
        this.UserMdel = res.data
        if(res.data.spaceExs){
            for (let i = 0; i < res.data.spaceExs.length; i++)
						this.spaceCodes.push(res.data.spaceExs[i].code);
        }
        this.viewFalg = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.Self_center {
  display: flex;
  margin: 50px 0;
  .center_left {
    flex: 1;
    ul {
      margin-left: 100px;
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
