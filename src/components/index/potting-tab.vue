<!--
 * @Author: your name
 * @Date: 2021-10-27 14:04:33
 * @LastEditTime: 2021-10-27 15:03:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ibms_ty/src/components/index/potting-tab.vue
-->

<template>
  <div>
    <div class="event_dianh_list_top">
      <ul>
        <li
          :class="[dataSheId == adde.id ? 'Bborder' : '']"
          v-for="adde in tabData"
          :key="adde.id"
        >
          <span @click="addsheClick(adde.id)">{{ adde.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tabData: null
  },
  data() {
    return {
      dataSheId: '0'
    }
  },
  mounted() {},
  methods: {
    addsheClick(id) {
      //选择设备与手动输入
      for (let i in this.tabData) {
        if (id == this.tabData[i].id) {
          this.dataSheId = this.tabData[i].id
        }
      }
      this.$emit('pottingTabClick',this.dataSheId)
    }
  }
}
</script>
<style lang="scss" scoped>
.event_dianh_list_top {
  ul {
    display: flex;
    li {
      margin: 0 20px;
      height: 40px;
      line-height: 40px;
      border-bottom: 2px solid transparent;
      span {
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #00f0ff;
        line-height: 48px;
        opacity: 0.6;
        cursor: pointer;
      }
    }
    .Bborder {
      border-bottom: 2px solid #00f0ff;
      transition: all .8s;

      > span {
        opacity: 1;
      }
    }
  }
}
</style>
