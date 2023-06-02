

<template>
  <div>
    <ul class="my_tree_uls">
      <div
        class="li"
        v-show="!itemsystemTree.hidden"
        v-for="itemsystemTree in systemTreeList"
        :key="itemsystemTree.no"
      >
        <div
          class="fuqing"
          @click="logjiedian( $event )"
        >
          <div :class="[
              'lou',
              itemsystemTree.children.length > 0 ? 'padd20' : 'padd45'
            ]">
            <span
              class="padding20"
              :style="itemsystemTree.children.some(p=>!p.hidden)?'':'visibility: hidden'"
              v-if="itemsystemTree.children.length > 0"
              @click="
                ListShow(open.indexOf(itemsystemTree.no), itemsystemTree.no)
              "
              :class="[
                'jiantou',
                open.indexOf(itemsystemTree.no) !== -1 ? '' : 'rotate45'
              ]"
            ></span>
            <span
              :class="[
                'title',
                itemsystemTree.no == $store.state.nodeNo ? 'activeBg' : ''
              ]"
              @click="childClick(itemsystemTree),ListShow(open.indexOf(itemsystemTree.no), itemsystemTree.no)"
              :title="itemsystemTree.label"
            >{{ itemsystemTree.label }}</span>

            <div class="right_gou"></div>
            <ul
              :class="['erzi']"
              v-if="
                open.indexOf(itemsystemTree.no) !== -1 &&
                  itemsystemTree.children.length > 0
              "
            >
              <treeNode
                v-if="itemsystemTree"
                @childByValue="item => $emit('childByValue', item)"
                :systemTreeList="itemsystemTree.children"
              ></treeNode>
            </ul>
          </div>
        </div>
      </div>
    </ul>
  </div>
</template>
<script>
import { useAuthStore } from '@/stores/index'
const authStore = useAuthStore()

export default {
  name: 'treeNode',
  props: ['systemTreeList'],
  data() {
    return {
      open: [authStore.nodePNo],
    }
  },
  activated: function () {},
  watch: {},
  directives: {},
  computed: {},
  mounted() {},
  watch: {
    open: function (newVal, oldVal) {
      // console.log(newVal, oldVal);
    },
    systemTreeList: function (newVal, oldVal) {
      // console.log(newVal)
      this.systemTreeList = newVal
      newVal && this.drawChart(this.systemTreeList)
    },
  },
  unmounted() {},
  methods: {
    drawChart(data) {
      if (
        data.length > 0 &&
        data[0].children.length > 0 &&
        data[0].children.some((p) => !p.hidden)
      ) {
        this.drawChart(data[0].children)
      } else {
        if (data.length > 0) {
          for (let i in data) {
            if (!data[i].hidden) {
              return this.childClick(data[i])
            }
          }
        }
      }
    },
    logjiedian(e) {
      if (e.target.className == 'title activeBg') {
        if (e.target.parentNode.lastChild.className == 'erzi') {
          // console.log(e.target.parentNode.lastChild.firstChild.children)
          let diyis =
            e.target.parentNode.lastChild.firstChild.firstChild.children
          for (let index = 0; index < diyis.length; index++) {
            const element = diyis[index]

            if (element.style.display == 'none') {
            } else {
              // console.log(element.firstChild.firstChild.children[0])
              for (
                let index = 0;
                index < element.firstChild.firstChild.children.length;
                index++
              ) {
                const ele = element.firstChild.firstChild.children[index]
                if (ele.className == 'title') {
                  // console.log(ele)
                  ele.click()
                  break
                }
              }
              element.firstChild.firstChild.children[0].click()
              break
            }
          }
          let allChilds =
            e.target.parentNode.parentNode.parentNode.parentNode.children

          for (var i = 0; i < allChilds.length; i++) {
            if (allChilds[i] !== e.target.parentNode.parentNode.parentNode) {
              // console.log(allChilds[i].lastChild.lastChild)
              // allChilds[i].click()

              if (
                allChilds[i].lastChild.lastChild.lastChild.className == 'erzi'
              ) {
                allChilds[i].lastChild.lastChild.firstChild.click()
                // console.log(allChilds[i].lastChild.lastChild.lastChild)
                // allChilds[i].lastChild.lastChild.removeChild(
                //   allChilds[i].lastChild.lastChild.lastChild
                // )
              }
            }
          }
        }
        // console.log(e.target.parentNode.lastChild)
      }
    },
    childClick(data) {
      // childByValue是在父组件on监听的方法
      // 第二个参数this.childValue是需要传的值
      this.$emit('childByValue', data)
      this.$store.commit('setNodeno', data.no)
    },
    //显示隐藏
    ListShow(type, id) {
      if (type == -1) {
        this.open.push(id)
      } else {
        this.delArray(this.open, id)
      }
    },
    //去除数组中的元素
    delArray(array, ele) {
      let index = array.indexOf(ele)
      if (index > -1) {
        array.splice(index, 1)
      }
      return array
    },
  },
}
</script>

<style lang="scss">
.my_tree_uls {
  .active_bg {
    color: rgba(50, 197, 255, 0.2) !important;
  }
  .activeBg {
    color: rgba(0, 216, 255, 0.8) !important;

    // border-radius: 2px;
  }
  .activeBgborder {
    border: 1px solid rgba(50, 197, 255, 0.6);
  }

  .li {
    margin-top: 1px;
    min-width: 168px;
    // background: rgba(50, 197, 255, 0.2);
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    line-height: 28px;
    text-align: left;
    // position: relative;
    border-radius: 2px;

    span {
      font-size: 20px;
    }

    a {
      color: rgba(255, 255, 255, 0.7);
    }
    .padd100 {
      padding-left: 100px;
    }
    .padd80 {
      padding-left: 80px;
    }
    .padd60 {
      padding-left: 60px;
    }
    .padd40 {
      padding-left: 40px;
    }
    .padd45 {
      padding-left: 45px;
    }
    .padd20 {
      padding-left: 20px;
    }

    .lou {
      display: block;
      height: 100%;
      cursor: pointer;
      text-overflow: ellipsis;
      white-space: nowrap;
      // overflow: hidden;
      position: relative;
      .title {
        height: 28px;
        font-size: 16px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.7);
        line-height: 28px;
        letter-spacing: 2px;
      }

      .jiantou {
        // position: absolute;
        // top: 20%;
        // left: 10%;
        cursor: pointer;
        margin-bottom: 2px;
        margin-right: 16px;
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        border-top: 2px solid rgba(255, 255, 255, 0.7);
        border-right: 2px solid rgba(255, 255, 255, 0.7);
        -webkit-transform: rotate(135deg);
        /*箭头方向可以自由切换角度*/
        transform: rotate(135deg);
        span {
          font-size: 16px;
        }
      }
      .rotate45 {
        transform: rotate(45deg);
        margin-bottom: 0px;
      }
    }

    .right_gou {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      display: inline-block;

      .iconlujingbeifen11 {
        margin-right: 12px;
        width: 9px;
        height: 6px;
        font-size: 5px;
      }
    }
  }
}
</style>
