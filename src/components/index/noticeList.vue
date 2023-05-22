<!--
 * @Author: your name
 * @Date: 2020-12-30 15:59:07
 * @LastEditTime: 2021-10-28 17:15:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \IBMS\ibms\src\components\importTable.vue
-->
<template>
  <div
    :class="'tanchuang_dianbiao'"
  
  >
    <div class="tanchuang">
      <div class="tanchuang_bg">
        <div class="tanchuang_top">
          <img :src="require('@/assets/image/index/partial_left.png')" alt />
          <span class="top_title">通知列表</span>

          <img :src="require('@/assets/image/index/partial_right.png')" alt />
        </div>
        <div class="tanchuang_center">
          <div class="tanchuang_center_cen">
            <div class="Partlist_list">
          <el-table
            :data="datalist"
            style="width: 98%;margin-left:11px ;"
            :row-class-name="tableRowClassName"
          >
            <el-table-column
              prop="name"
              label="名称"
            >
             
          </el-table-column>
            <!-- <el-table-column
              prop="typeName"
              label="类别"
            ></el-table-column> -->
            <!-- <el-table-column
            prop="manufactor"
            label="厂商"
          ></el-table-column> -->
          <el-table-column
            prop="state"
            label="状态"
          ></el-table-column>
         
           
            <el-table-column
              prop="value"
              label="数量"
            ></el-table-column>

            <el-table-column
              label="操作"
              width="50px"
            >
              <template slot-scope="scope">
                <span
                v-if="scope.row.key!='UserOperateCert'"
                  class="editing_green"
                  @click="tiao(scope.row.key)"
                >跳转</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
          </div>
        </div>
      </div>
      <div class="cancel">
        <img
          @click="tijiao"
          :src="require('@/assets/image/index/cancel.png')"
          alt
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    datalist:''
  },
  data() {
    return {
     
    }
  },
  computed: {
  
  },
  methods: {
    tijiao(){
      this.$emit('callBack',false)
    },
    tiao(val){
       this.$emit('callBack', false)
      // "RepairOrderUndispatched"
      // "RepairOrderUndealed"
      // "RepairOrderConfirm"
      // "PatrolPlanNo16"
      console.log(val.indexOf("PatrolPlanNo"));
      if(val.indexOf("PatrolPlanNo")==0){
        this.routerTo('PatrolPlanNo')
      }else{
        this.routerTo(val)

      }
      
    },
    routerTo(val){
      switch (val) {
        case 'RepairOrderUndispatched':
          this.$router.push('/WorkOrderProcessing?index=0')
          break;
        case 'RepairOrderUndealed':
          this.$router.push('/WorkOrderProcessing?index=1')
          break;
            case 'RepairOrderConfirm':
          this.$router.push('/WorkOrderToConfirm')
          break;
            case 'PatrolPlanNo':
          this.$router.push('/patrolDefend/PatrolTask?index=1')
          break;
            case 'EquipmentThresholdValue':
          this.$router.push('/Equipment')
          break;
        default:
          break;
      }
    },
       tableRowClassName({ row, rowIndex }) {
      //list背景色
      if (rowIndex % 2 == 1) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
      return ''
    },
  },
  mounted: function() {
  
  }
}
</script>

<style lang="scss" scoped>
//全局弹窗样式
.positionclass {
  top: -11.3vh !important;
  left: -26vw !important;
}

.tanchuang_dianbiao {
  background: rgba(0, 0, 0, 0.7);
z-index: 12;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  .tanchuang {
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .tanchuang_bg {
      width: 40vw;
      height: 61.85vh;
      background: url('~@/assets/image/index/tanchuan.png') no-repeat;
      background-size: 100% 100%;
      .tanchuang_top {
        .top_title {
          font-size: 22px;
          font-family: MicrosoftYaHei;
          font-weight: bold;
          color: #00f0ff;
          height: 5vh;
          line-height: 5vh;
        }
        > img {
          vertical-align: baseline;
          height: 12px;
          width: 22px;
        }
      }

      .tanchuang_center {
        .tanchuang_center_cen {
          margin-top: 1vh;
          .tanchuang_center_cen_top {
            width: 26vw;
            li {
              margin-top: 1vh;
              display: flex;
              justify-content: flex-end;
              align-items: center;
              input {
                border-radius: 0;
                width: 8.5vw;
                height: 3vh;
                line-height: 3vh;
                background-color: rgba(0, 0, 0, 0);
                border: 1px solid #00f0ff;
                font-size: 14px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: #ffffff;
                padding-left: 0.7vw;
              }
              span {
                font-size: 16px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: #00f0ff;
              }
              i {
                //**** */
                font-size: 20px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: #00f0ff;
                vertical-align: bottom;
                margin-left: 5px;
              }
            }
          }
          .tanchuang_center_cen_top_edit {
            // width: 26vw;
            height: 10vh;
            margin: 0 3vw;
            color: #fff;
            > li {
              display: flex;
              align-items: center;
              justify-content: start;
            }
            .upload_li {
              margin-top: 13px;
              .el-upload__tip {
                margin-top: 18px;
                color: #fff;
                overflow: hidden;
                height: 35vh;
                overflow-y: scroll;
              }
              .upload-demo {
                text-align: left;
                align-items: flex-start !important;
              }
            }
          }

          .tanchuang_center_cen_bottom {
            margin-top: 3.7vh;

            button {
              cursor: pointer;
              border: 0;
              width: 70px;
              height: 26px;
              background: #30b8ff;
              border-radius: 2px;
              outline: none;
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: #ffffff;
            }
            :nth-child(1) {
              margin-right: 1.56vw;
            }
          }
        }
      }
    }
    .cancel {
      img {
        cursor: pointer;
        width: 44px;
        height: 44px;
      }
    }
  }
}
  .Partlist_list {
      width: 100%;
      overflow-y: scroll;
      height: 45vh;

      .editing_green {
        color: rgba(95, 255, 0, 1);
        cursor: pointer;
      }

      .red {
        color: #ff3c00;
        cursor: pointer;
      }

      .guanlian {
        color: rgba(0, 255, 234, 1);
        cursor: pointer;
      }

      .chakan {
        color: rgba(246, 255, 0, 1);
        cursor: pointer;
      }
    }
</style>
