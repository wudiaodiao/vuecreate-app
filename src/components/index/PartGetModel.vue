<!--
 * @Author: your name
 * @Date: 2020-11-25 19:02:38
 * @LastEditTime: 2020-11-25 19:18:43
 * @LastEditors: Please set LastEditors
 * @Description: 查看名称
 * @FilePath: \ibms\src\components\PartGetModel.vue
-->


<template>
  <div>
    <div class="PartGetModel">
      <div class="PartOut_tccenter">
        <div class="PartOut_tccenter_top">
          <ul class="left">
            <li>
              <span>标准编码：</span>
              <i>{{partGetModelData.standardCode}}</i>
            </li>
            <li>
              <span>物资编码：</span>
              <i>{{partGetModelData.code}}</i>
            </li>
            <li>
              <span>物资名称：</span>
              <i>{{partGetModelData.name}}</i>
            </li>
            <li>
              <span>单位：</span>
              <i>{{partGetModelData.unit}}</i>
            </li>
            <li>
              <span>规格型号：</span>
              <i>{{partGetModelData.specification}}</i>
            </li>
            <li>
              <span>账簿类别：</span>
              <i>{{partGetModelData.bookName}}</i>
            </li>
            <li>
              <span>核算类别：</span>
              <i>{{partGetModelData.calcName}}</i>
            </li>
            <li>
              <span>单价：</span>
              <i>{{partGetModelData.price}}</i>
            </li>

            <!-- <li>
              <span>供货单位：</span>
              <i>{{partGetModelData.supplier}}</i>
            </li> -->
            <!-- <li>
              <span>编码：</span>
              <i>{{partGetModelData.code}}</i>
            </li> -->
            <li>
              <span>库存数量：</span>
              <i>{{partGetModelData.count}}</i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    partNo: '', //接受父组件传递的用户号
  },
  data() {
    return {
      partGetModelData: {},
    }
  },
  mounted() {
    this.getPartGetModel()
  },
  methods: {
    async getPartGetModel() {
      const res = await this.$api.MMS.Part.GetModel({
        no: this.partNo,
      })
      if (res.ok) {
        console.log(res.data)
        this.partGetModelData = res.data
      }
    },
  },
}
</script>
<style lang="scss" scoped>
//查看物资
.PartGetModel {
  display: flex;
  justify-content: start;
  height: 44vh;
  overflow-y: scroll;

  .left {
    margin-left: 160px;
    margin-top: 40px;
    // margin: auto;
    text-align: left;
    flex: 1;
    > li {
      height: 2.8vh;
      margin-bottom: 8px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: #00f0ff;
      .user {
        cursor: pointer;
        text-decoration: underline;
      }
      span {
        display: inline-block;
        // width: 60px;
      }
    }
  }
}
</style>

