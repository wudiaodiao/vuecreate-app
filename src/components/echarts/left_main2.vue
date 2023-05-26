<!--  -->
<template>
  <div class="left-main2">
    <div class="left-main2-top"></div>
    <div class="left-main2-bottom">
      <div class="left-main2-bottom_top">
        <div class="state_left">
          <div class="state_left_top">
            <span class="wancheng">{{ result.finished }}</span><span class="weiwancheng">{{result.notFinished}}</span>
          </div>
          <div class="state_left_center">
            <div class="blli">
              <div class="bili_left"></div>
              <div class="bili_right"></div>
              <div class="sanjiao"></div>
            </div>
          </div>
          <div class="state_left_bottom">
            <div class="kuai">
              <div class="wanchengkuai">

              </div>
              已完成
            </div>
            <div class="kuai">
              未完成 <div class="weiwanchengkuai">

              </div>
            </div>
          </div>
        </div>
        <div class="state_right">
          <div class="state_right_top wanchenglv">
            {{result.wanchenglv}}
          </div>
          <div class="state_right_bottom">
            完成率
          </div>
        </div>
      </div>
      <div class="left-main2-bottom_bottom">
        <div class="state_left">
            <div class="state_left_top">
              <span class="zhunshi">{{result.onTime}}</span><span class="chaoshi">{{result.overtime}}</span>
            </div>
            <div class="state_left_center">
              <div class="blli">
                <div class="bili_left2" style="background: #03D5F8;"></div>
                <div class="bili_right" style="background: #FE898B;"></div>
                <div class="sanjiao sanjiao2"></div>
              </div>
            </div>
            <div class="state_left_bottom">
              <div class="kuai">
                <div class="zhunshikuai">

                </div>
                准时
              </div>
              <div class="kuai">
                超时 <div class="chaoshikuai">

                </div>
              </div>
            </div>
          </div>
          <div class="state_right">
            <div class="state_right_top zhunshilv" style=" color: #03D5F8; " >
              {{result.zhunshilv}}
            </div>
            <div class="state_right_bottom">
              准时率
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  name: 'ComponentName',
  //name必须是大驼峰规范,和文件名保持一致
  data() {
    //这里存放数据
    return {
      equipmentOk: 650,
      equipmentNotOk: 100,
      interval:0,
      leftMain2: {
        series: [
          {
            hoverAnimation: false,
            itemStyle: {
              borderWidth: 2, //设置border的宽度有多大
              borderColor: '#29383E',
            },
            type: 'pie',
            radius: ['50%', '60%'],
            center: ['50%', '44%'],
            avoidLabelOverlap: false,
            label: {
              position: 'center',
              show: true,
              formatter: () => {
                return `750` + '\n' + '设备总数'
              },
              color: 'white',
              lineHeight: 16,
              fontSize: 14,
            },
            labelLine: {
              show: false,
            },
            color: ['#DCFF3B', '#3BFFC5'],
            data: [100, 650],
          },
          {
            itemStyle: {
              borderWidth: 2, //设置border的宽度有多大
              borderColor: '#29383E',
            },
            hoverAnimation: false,

            type: 'pie',
            radius: ['60%', '82%'],
            center: ['50%', '44%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            labelLine: {
              show: false,
            },

            data: [
              {
                value: 100,
                itemStyle: { normal: { color: 'rgba(220,255,59,0.6)' } },
              },
              {
                value: 650,
                itemStyle: { normal: { color: 'rgba(62,241,189,0.6)' } },
              },
            ],
          },
        ],
      },
      result: {
        finished: '32',
        notFinished: '58',
        wanchenglv: '41.5%',
        onTime: '50',
        overtime: '9',
        zhunshilv: '41.5%',
      },
      wanchenglv: '40%',
      zhunshilv: ''
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    initLeftMain2() {
        (this as any).$api.MMS.Home.GetWorkOrderStateStatistics().then(( res: any)=>{
        let result=res.data
        // this.result = res.data
        this.result.finished = result.finished
        this.result.notFinished = result.notFinished
        this.wanchenglv= (result.finished + result.notFinished)==0?'0%':(result.finished/ (result.finished+ result.notFinished)*100).toFixed(0)+'%'
        this.result.wanchenglv = result.wanchenglv
        this.result.onTime = result.onTime
        this.result.overtime = result.overtime
        this.zhunshilv = (result.onTime + result.overtime) == 0 ? '0%' : (result.onTime / (result.onTime + result.overtime) * 100).toFixed(0) + '%'
        this.result.zhunshilv = result.zhunshilv
      })
   
     
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    
    this.initLeftMain2()
     this.interval = setInterval(() => {
      this.initLeftMain2()
    }, 10000);
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeUnmount() {
     clearInterval(this.interval)
  }, //生命周期 - 销毁之前
  unmounted() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  deactivated() {}, //如果页面有keep-alive缓存功能，当组件移除时候，这个函数会触发
}
</script>
<style lang="scss">
.sanjiao2{
  left: v-bind(zhunshilv)
}
.bili_left2{
  width: v-bind(zhunshilv)
}
.left_center {
  width: 420px;
  padding:0 20px;
  background: url('~@/assets/image/MMS/左.png') no-repeat center;
   background-size: 100% 100%;
  // width: 100%;
  height: 100%;
.left-main1{
  width: 100%;
  height: 23%;

  .left-main1-top{
    width: 100%;
    height: 23%;
  }
  .left-main1-bottom{
    width: 100%;
    height: 77%;
    display: flex;
    .left-main1-bottom-left{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 30%;
      position: relative;
      p{
        font-size: 26px;
      }
      h6{
        color: rgba($color: #FFF, $alpha: .8);
      }
    }
    .left-main1-bottom-center{
      width: 40%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      position: relative;
      bottom: 25px;
      background-size: 80%;
       p{
        font-size: 26px;
      }
      h6{
        color: rgba($color: #FFF, $alpha: .8);
      }
    }
    .left-main1-bottom-right{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 30%;
      p{
        font-size: 26px;
      }
      h6{
        color: rgba($color: #FFF, $alpha: .8);
      }
    }
  }
}
.left-main2{
  // margin-top: 20px;
  width: 100%;
  height: 23%;
   .left-main2-top{
    width: 100%;
    height: 10%;
  }
  .left-main2-bottom{
    width: 100%;
    height: 90%;
    >div{
       box-sizing: border-box;
          padding: 5px 0;
      width: 100%;
      height: 50%;
      display: flex;
      box-sizing: border-box;
       margin-top: 5px;
      justify-content: center;
      align-items: center;
      >div{
        height: 100%;
        
      }
      .state_left{
        flex: 4;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .state_left_top{
          font-size: 18px;
        }
        >div{
         
          width: 100%;
          flex: 0.9;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        // background: red;
        
        .state_left_center{
          flex: 1;
         .blli{
          position: relative;
          box-sizing: border-box;
         padding: 3px 5px;
          border: 1px solid rgba($color: #FFF, $alpha: .4);
          width: 100%;
          height: 60%;
          display: flex;
          justify-content: center;
          align-items: center;
          >div{
            height: 100%;
          }
          .sanjiao{
            position: absolute;
            top: -13px;
            left: v-bind(wanchenglv);
            transform: translateX(-6px);
            border-top: 8px solid #fff;
            border-left: 6px solid transparent;
             border-right: 6px solid transparent;
          }
          .bili_left{
           
            width: v-bind(wanchenglv);
            background: #FEA172;
          }
          .bili_right{
            background: rgba($color: #FFF, $alpha: .4);
            flex-grow: 1;
          }
         }
        }
        .state_left_bottom{
          .kuai{
            
            div{
            
              display: inline-block;
              width: 10px;
              height: 10px;
              margin: 0 5px;
              
            }
            .wanchengkuai{
              background: #FEA172;
            }
            .weiwanchengkuai{
              background:  rgba($color: #FFF, $alpha: .4);
            }
            .zhunshikuai{
               background: #03D5F8;
            }
            .chaoshikuai{
               background: #FE898B;
            }
          }
        }
      }
      .state_right{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
        
        >div{
          flex: 1;
          line-height: 40px;
        }
        .state_right_top{
          font-size: 21px;
          color: #e59e8a;
        }
        .state_right_bottom{
          line-height: 30px;
          font-size: 18px;
          color: rgba($color: #FFF, $alpha: .7);
        }
        // background: #fff;
      }
    }
   
    
   
  }
}
.left_main3{
    margin-top: 45px;
  width: 100%;
  height: 23%;
  z-index: 999;
  position: relative;
   .nyr{
    text-align: center;
    width: 130px;
    // background: red;
    position: absolute;
    right: 0;
    top: -5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    >div{
      cursor: pointer;
      border: 1px solid #347A98;
      height: 100%;
      width: 40px;
      text-align: center;
      background: #2A708F;
    }
    .active{
      background: #00B9E1;
    }
  }
  #left_main3{
width: 100%;
height: 100%;

 
}
}


.left-main4{
  margin-top: 50px;
  // background: red;
  width: 100%;
  height: 18%;
 display: flex;
 >div{
  height: 100%;

 }
 .left_main4_left{
 
  flex: 1.5;
 }
 .left_main4_right{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex: 2;
  // background: red;
  >div{
    width: 50%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: left;
    >div{
      height: 100%;
      box-sizing: border-box;
      padding-left: 20px;
      padding-bottom: 10px;
    }
    .shuju_left{
      height: 80%;
      margin-top: 5px;
      flex: 1;
      // background: red;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .kuai{
        width: 10px;
        height: 10px;
        background: red;
      }
      .line{
        width: 2px;
        height: 30px;
        background: rgba($color: #FFF, $alpha: .4);
      }
      .tiao{
        width: 5px;
        height: 15px;
        background: #ccc;
      }
    }
    .shuju_right{
      // background: #fff;
      flex: 10;
      box-sizing: border-box;
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .shu{
        font-size: 24px;
        font-weight: 700;
      }
      span{
        font-size: 16px;
      }
    }
  }
 }
}
}
</style>