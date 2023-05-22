<template>
  <div class="Threedmodel">
    <div class="Threedmodel_left">
      <div class="box">
        <div class="circleCenter" id="circlecenter">
          <div class="bgBox" id="bgBox">
            <div class="zhongz_circ">
              <span class="iconfont iconfuwei" @click="operate(0)"></span>
            </div>
          </div>
          <div class="rotation-turn">
            <div class="rotation-item">
              <div class="rotation-animat" @click="showOper(0)">
                <span class="iconfont iconceliang"></span>
                <p>测量</p>
              </div>
            </div>
          </div>
          <div class="rotation-turn">
            <div class="rotation-item">
              <div class="rotation-animat" @click="operate(3)">
                <span class="iconfont iconfeihangmanyou"></span>
                <p>飞行</p>
              </div>
            </div>
          </div>
          <div class="rotation-turn">
            <div class="rotation-item">
              <div class="rotation-animat" @click="showOper(1)">
                <span class="iconfont icontexiao"></span>
                <p>特效</p>
              </div>
            </div>
          </div>
          <div class="rotation-turn">
            <div class="rotation-item">
              <div class="rotation-animat" @click="operate(1)">
                <span class="iconfont iconxuanzhuan"></span>
                <p>旋转</p>
              </div>
            </div>
          </div>
        </div>
        <!-- <span class="right_dw"></span> -->
        <div class="line1"></div>
        <div class="line2"></div>
      </div>
    </div>
    <div class="Threedmodel_right">
      <ul v-show="dicVisible">
        <li
          v-for="(item, index) in dicList"
          :key="index"
          @click="disClick(index + 1)"
          :class="dicActive === index + 1 ? 'active' : ''"
        >{{ item }}</li>
      </ul>
      <ul v-show="effVisible">
        <li @click="effClick(5)" :class="showActive ? 'active' : ''">透视</li>
        <li @click="effClick(6)" :class="explodeActive ? 'active' : ''">分层</li>
        <li @click="effClick(7)" :class="loadActive ? 'active' : ''">路线</li>
        <li @click="effClick(8)" :class="sunActive ? 'active' : ''">光源</li>
        <!-- <li @click="effClick(9)" :class="lightActive ? 'active' : ''">灯光</li> -->
        <li @click="effClick(10)" :class="toolActive ? 'active' : ''">高亮</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Rotation from './js/animationRotation'
export default {
  data() {
    return {
      dicVisible: true,
      effVisible: false,
      dicActive: 0,
      dicList: ['测距', '测面', '测高', '清除'],
      explodeActive: false,
      showActive: false,
      loadActive: false,
      lightActive: false,
      toolActive: false,
      sunActive: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      var option = {
        radius: 48, //大圆半径
        focusindex: 1, //焦点图位置
        speed: 800, //旋转速率，单位（毫秒）
        callback: function(ele, index) {
          //this指向此rotation对象
        }
      }
      var rotation = new Rotation('circlecenter', option)
    })
  },
  methods: {
    // 开始测量
    disClick(key) {
      this.dicActive = key
      this.$emit('disClick', key)
    },
    effClick(key) {
      let flag = this.showActive
      switch (key) {
        case 5:
          this.showActive = !this.showActive
          flag = this.showActive
          break
        case 6:
          this.explodeActive = !this.explodeActive
          flag = this.explodeActive
          break
        case 7:
          this.loadActive = !this.loadActive
          flag = this.loadActive
          break
        case 8:
          this.sunActive = !this.sunActive
          flag = this.sunActive
          break
        case 9:
          this.lightActive = !this.lightActive
          flag = this.lightActive
          break
        case 10:
          this.toolActive = !this.toolActive
          flag = this.toolActive
          break
      }
      this.$emit('operate', key, { flag: flag })
    },
    operate(key) {
      this.hideOper()
      this.$emit('operate', key)
    },
    hideOper() {
      this.dicVisible = false
      this.effVisible = false
    },
    showOper(key) {
      this.hideOper()
      switch (key) {
        case 0:
          this.dicVisible = true
          this.dicActive = -1
          break
        case 1:
          this.effVisible = true
          break
        default:
          break
      }
    },
    // 取消选中分离楼层
    setExplodeActive() {
      this.explodeActive = !this.explodeActive
    },
    // 还原
    setOrigin() {
      this.explodeActive = false
      this.showActive = false
      this.loadActive = false
      this.lightActive = false
      this.toolActive = false
      this.sunActive = true
    }
  }
}
</script>
<style lang="scss"  >
// @import url('./styles/main.css');

.rotation-item span {
  position: absolute;
  z-index: 10;
}

.circleCenter {
  position: relative;
  top: 50%;
  left: 50%;
}

.Threedmodel {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 346px;
  height: 250px;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  border-radius: 10px;
  box-sizing: border-box;
  // padding: 35px 60px 35px 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  .Threedmodel_left {
    float: left;
    width: 234px;
    height: 210px;
    position: relative;
    .box {
      width: 100%;
      height: 100%;
      transform: translateZ(0);
      .right_dw {
        width: 0px;
        height: 0px;
        border-top: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 8px solid #fff;
        position: absolute;
        top: 50%;
        right: 9.5%;
        transform: translateY(-50%);
        cursor: pointer;
      }

      .line1 {
        width: 1px;
        height: 150px;
        background-color: rgba(40, 161, 255, 1);
        position: absolute;
        top: 27px;
        left: 113.8px;
        transform: rotate(45deg);
        z-index: -10;
        transition: all 0.8s;
        transform-origin: 50% 50%;
      }

      .line2 {
        width: 1px;
        height: 150px;
        background-color: rgba(40, 161, 255, 1);
        position: absolute;
        top: 27px;
        left: 113.8px;
        transform: rotate(-45deg);
        z-index: -10;
        transition: all 0.8s;
        transform-origin: 50% 50%;
      }

      .bgBox {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 18px solid rgba(40, 161, 255, 0.2);
        border-right: 18px solid rgba(40, 161, 255, 1);
        border-radius: 50%;
        background: rgba(40, 161, 255, 0.6);
        background-clip: padding-box;
        transform: translateZ(0);
        .zhongz_circ {
          width: 50px;
          height: 50px;
          background-color: rgba(40, 161, 255, 1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          span {
            cursor: pointer;
          }
        }
      }

      .rotation-turn {
        position: absolute;
        margin: 0 auto;
        transform: rotate(0deg);
        -ms-transform: rotate(0);
        /* IE 9 */
        -moz-transform: rotate(0);
        /* Firefox */
        -webkit-transform: rotate(0);
        /* Safari 和 Chrome */
        -o-transform: rotate(0);
        transition: all 1s;
        -moz-transition: all 1s;
        /* Firefox 4 */
        -webkit-transition: all 1s;
        /* Safari 和 Chrome */
        -o-transition: all 1s;
      }

      .rotation-item {
        width: 100%;
        transform: rotate(0);
        -ms-transform: rotate(0);
        /* IE 9 */
        -moz-transform: rotate(0);
        /* Firefox */
        -webkit-transform: rotate(0);
        /* Safari 和 Chrome */
        -o-transform: rotate(0);
        transition: all 1s;
        -moz-transition: all 1s;
        /* Firefox 4 */
        -webkit-transition: all 1s;
        /* Safari 和 Chrome */
        -o-transition: all 1s;
      }

      .rotation-item {
        .rotation-animat {
          width: 20px;
          height: 40px;
        }
      }

      .rotation-item .rotation-animat {
        span {
          width: 100%;
          font-size: 9px;
          height: auto;
          display: inline-block;
          color: rgba(251, 251, 251, 1);
          cursor: pointer;
          text-align: center;
        }
      }

      .rotation-item .rotation-animat {
        p {
          font-size: 9px;
          height: auto;
          display: inline-block;
          color: rgba(251, 251, 251, 1);
          cursor: pointer;
          word-break: keep-all;
          white-space: nowrap;
        }
      }

      .rotation-item .rotation-animat {
        /* transform: scale(1, 1); */
        transition: all 1s;
        -moz-transition: all 1s;
        /* Firefox 4 */
        -webkit-transition: all 1s;
        /* Safari 和 Chrome */
        -o-transition: all 1s;
      }
    }

    /* 以下是每个模块的样式 */
  }

  .Threedmodel_right {
    float: right;
    width: 70px;
    height: 100%;
    position: relative;

    ul {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .active {
        color: #ffffff;
        background: #28a1ff;
      }

      li {
        text-align: center;
        margin: 4px 0;
        height: 30px;
        line-height: 30px;
        color: rgba(140, 205, 255, 1);
        width: 60px;
        border: 1px solid rgba(40, 161, 255, 1);
        letter-spacing: 2px;
        font-family: PingFang SC;
        font-weight: 500;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      }
    }
  }
}
</style>
