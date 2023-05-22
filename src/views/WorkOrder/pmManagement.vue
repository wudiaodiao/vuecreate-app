<!--
 * @Author: your name
 * @Date: 2020-11-05 17:09:23
 * @LastEditTime: 2021-11-23 15:14:36
 * @LastEditors: Please set LastEditors
 * @Description: 值班管理
 * @FilePath: \ibms\src\views\Assistance\OnDuty.vue
-->
<template>
  <div class="craftingassistance">
    <div class="craftingassistance_cneter">
      <div class="shiftClass">
        <div :class="['shiftClass_left',$store.state.dtab?'index_off':'index_no']">
          <div class="left_tot">
            <div class="left_tot_top">
              <span>
                <img src="../../assets/image/index/partial-menu-top.png" alt />
              </span>
              <h3>保养管理</h3>
            </div>
            <ul class="left_tot_list">
              <li
                  v-trigger
              :data-sunC="itemkey"
                v-for="(item,itemkey) in $store.state.subitemData.children"
                :key="item.model.name"
                :class="[
                item.model.name === $store.state.EnergyClick ? 'aqua' : ''
              ]"
                @click="energyClick(item)"
              >{{ item.model.name }}</li>
            </ul>
          </div>
        </div>
        <div :class="['shiftClass_right',$store.state.dtab?'index_off':'index_no']">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
    watch: {
    $route(to, from) {
      if (
        from.path == '/pmManagement/MaintainPlan' &&
        to.path == '/pmManagement'
      ) {
        this.$router.push('/pmManagement/MaintainPlan')
      }
    },
  },
  created() {},
  mounted() {},
  destroyed() {},
  computed: {},
    directives: {
    trigger: {
      //自动触发事件
      inserted(el, binging) {
        if (el.getAttribute('data-sunC') == 0) {
          el.click()
        }
      }
    }
  },
  methods: {
    energyClick(item) {
      //点击子菜单列表

      this.$store.commit('setEnergyClick', item.model.name)
      // this.energyItem = item.model.name
      if (!item.model.route) {
        return this.$Tools.LayerMsgErr('功能待开发')
      } else {

        this.$router.push({ name: item.model.route })
      }
    }
  }
}
</script>
<style  lang="scss" scoped>
.craftingassistance {
  user-select: none;
  .craftingassistance_cneter {
    color: #fff;
    .shiftClass {
      .shiftClass_left {
        opacity: 1;
        position: absolute;
        top: 11.31vh;
        left: 13vw;
        height: 70.37vh;
        width: 12.4vw;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        .left_tot {
          margin: 2.41vh 1.04vw;

          .left_tot_top {
            display: flex;
            span {
              > img {
                margin-right: 4px;
                width: 12px;
                height: 12px;
              }
            }
            h3 {
              font-size: 16px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: #00f0ff;
            }
          }
          .left_tot_list {
            padding-left: 16px;
            .aqua {
              color: #00f0ff;
            }

            li {
              cursor: pointer;
              height: 40px;
              line-height: 40px;
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: #ffffff;
            }
          }
        }
      }
      .shiftClass_right {
        position: absolute;
        top: 11.31vh;
        left: 26vw;
        height: 70.37vh;
        width: 61vw;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        //子路由
        .Sub_route {
          position: absolute;
        }
      }
    }
  }
}
</style>
