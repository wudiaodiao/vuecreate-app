<!--
 * @Author: your name
 * @Date: 2022-03-09 14:24:36
 * @LastEditTime: 2022-03-09 15:15:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /ibms_ty/src/views/SystemConfiguration/components/areacard.vue
-->
<template>
  <div class="vanishing EquipmentCard_center">
    <div class="EquipmentCard_kapian">
      <ul class="EquipmentCard_kapian_ul" id="pdfDom">
        <li
          class="pdf_margin EquipmentCard_kapian_li_dw"
          v-for="(item, index) in EquipmentDataPdf"
          :key="index"
        >
          <div class="limian">
            <div class="bottom">
              <div class="bottom_left">
                <qr  :url="url" :code="item.id"></qr>
              </div>
              <div class="bottom_right">
                <ul>
                  <li>
                    <span>名称：</span>
                    <span class="line">
                      {{ item.name }}
                    </span>
                  </li>
                  <li>
                    <span>编码：</span>
                    <span class="line">
                      {{ item.code }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import qr from '../../../components/index/qr-Code.vue'

export default {
  components:{
    qr
  },
  props:{
    url:'',
    EquipmentDataPdf:{}
  }
}
</script>

<style lang="scss" scoped>
.vanishing {
  position: absolute !important;
  top: -9999px !important;
}

.EquipmentCard_center {
  position: relative;
  margin: 15px 0;
  // width: 100%;
  // height: 100%;
  height: 550px;
  width: 100%;
  display: flex;
  justify-content: center;

  .EquipmentCard_kapian {
    // margin: 0 40px;
    width: 800px;

    .EquipmentCard_kapian_ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      // padding-left: 50px;

      .pdf_margin {
        margin-top: 25px !important;
        margin-bottom: 25px !important;
      }

      .EquipmentCard_kapian_li_dw {
        background: url('~@/assets/image/index/kapian_shebei_dw.png') no-repeat;
        background-size: 100% 100%;
        width: calc((100% - 25px) / 2);
        height: 18.5vh;
        margin: 10px 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 10px;
        .limian {
          margin: 26px;
          display: flex;
          align-items: center;

          .bottom {
            display: flex;
            justify-content: flex-start;

            .bottom_right {
              display: flex;
              align-items: center;
              > ul {
                display: flex;
                flex-direction: column;
                margin-left: 10px;
                li {
                  height: 29px;
                  span {
                    font-size: 14px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
                    color: #444444;
                  }
                  .line {
                    font-size: 14px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
                    color: #444444;
                    padding-left: 10px;
                    display: inline-block;
                    width: 125px;
                    opacity: 0.8;
                    border-bottom: 1px solid #444444;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .EquipmentCard_center_left {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -40%);
    cursor: pointer;

    img {
      width: 28px;
      height: 108px;
    }
  }

  .EquipmentCard_center_right {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -40%);
    cursor: pointer;

    img {
      width: 28px;
      height: 108px;
    }
  }
}
</style>
