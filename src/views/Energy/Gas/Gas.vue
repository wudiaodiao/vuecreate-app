<template>
  <div class="Electricity">
    <div class="energyConsumption_zong">
      <div
        :class="[
          'energyConsumption_zong_left',
          $store.state.dtab ? 'index_off' : 'index_no'
        ]"
      >
        <div class="left_tot">
          <div class="left_tot_top">
            <span>
              <img src="../../../assets/image/index/partial-menu-top.png" alt />
            </span>
            <h3>用气管理</h3>
          </div>
          <ul class="left_tot_list">
            <li
              v-for="(item, itemkey) in $store.state.subitemData.children"
              :key="itemkey"
              :class="[
                item.model.name === $store.state.EnergyClick ? 'aqua' : ''
              ]"
              @click="energyClick(item)"
            >
              {{ item.model.name }}
            </li>
          </ul>
        </div>
      </div>
      <div
        :class="[
          'energyConsumption_zong_right',
          $store.state.dtab ? 'index_off' : 'index_no'
        ]"
      >
        <router-view></router-view>
        <!-- <div class="Sub_route"></div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      energyItem: ''
    }
  },
  mounted() {},
  methods: {
    energyClick(item) {
      //点击子菜单列表
      console.log(item)

      this.$store.commit('setEnergyClick', item.model.name)
      // this.energyItem = item.model.name
      if (!item.model.route) {
        return this.$Tools.LayerMsgErr('功能待开发')
      } else {
        console.log(item.model.route)

        this.$router.push({ name: item.model.route })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.Electricity {
    .energyConsumption_zong {
        user-select: none;
        display: flex;
        .energyConsumption_zong_left {
            opacity: 0.8;
            position: absolute;
            top: 122px;
            left: 17.92vw;
            height: 70.37vh;
            width: 11.3vw;
            background-color: rgba(0, 0, 0, 0.5);
            border-radius: 5px;
            .left_tot {
                margin: 2.41vh 1.04vw;
                .left_tot_top {
                    display: flex;
                    span {
                        >img {
                            margin-right: 4px;
                            width: 13px;
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
                    padding: 10px 0 0 16px !important;
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
        .energyConsumption_zong_right {
            position: absolute;
            top: 11.31vh;
            left: 30.85vw;
            height: 70.44vh;
            width: 51.28vw;
            background-color: rgba(0, 0, 0, 0.5);
            border-radius: 5px;
            //子路由
            .Sub_route {
                position: absolute;
            }
        }
    }
}
</style>
