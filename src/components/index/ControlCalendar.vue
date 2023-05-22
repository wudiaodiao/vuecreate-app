<template>
  <div>2232</div>
</template>
<script>
export default {
  //日历
  data() {
    return {
      newDate: '', //当前的日期的信息
      ynow: '', //当前的年数
      mnow: '', //当前的月份
      dnow: '', //当前的天数
      firstDay: '', //第一天
      firstnow: '', //当前的星期
      m_days: [], //每个月的天数
      tr_str: '', //行数
      clickControlShow: false
    }
  },
  mounted() {},
  methods: {
    clickControl() {
      this.clickControlShow = true
    }
  }
}
</script>
<style lang="scss" scoped>
.tanchuang_ying {
  background: rgba(0, 0, 0, 0.7);
  height: 100vh;
  width: 100vw;
  .tanchuang {
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .tanchuang_bg {
      width: 40vw;
      height: 57.69vh;
      background: url('../../assets/image/index/tanchuan.png') no-repeat;
      background-size: 100% 100%;
      .tanchuang_top {
        padding-top: 6vh;
        .top_title {
          font-size: 22px;
          font-family: MicrosoftYaHei;
          font-weight: bold;
          color: #00f0ff;
          margin: 0 0.75vw;
        }
        > img {
          vertical-align: baseline;
        }
      }

      .tanchuang_center {
        .tanchuang_center_cen {
          margin-top: 16vh;
          .tanchuang_center_cen_top {
            input {
              width: 8.5vw;
              height: 2.5vh;
              background-color: rgba(0, 0, 0, 0);
              border: 1px solid #00f0ff;
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: #ffffff;
            }
            span {
              font-size: 16px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: #00f0ff;
            }
          }
          .tanchuang_center_cen_bottom {
            margin-top: 3.7vh;

            button {
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
      }
    }
  }
}
</style>
