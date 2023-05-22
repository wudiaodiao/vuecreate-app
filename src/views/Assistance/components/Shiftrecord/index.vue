<template>
  <div>
    <div class="shiftClass_right_margin">
      <div class="watchBook">

        <div class="watchBook_center">
          <el-table
            :data="watchBook"
            style="width: 100%"
            :row-class-name="tableRowClassName"
          >
            <el-table-column
              prop="userName1"
              label="调班人1"
            ></el-table-column>
            <el-table-column
              prop="userName2"
              label="调班人2"
            ></el-table-column>
            <el-table-column
              prop="userName"
              label="操作人"
            ></el-table-column>
             <el-table-column
              prop="shiftClassName1"
              label="调班人1班次"
            ></el-table-column>
             <el-table-column
              prop="shiftClassName2"
              label="调班人2班次"
            ></el-table-column>
            <el-table-column
              prop="date1"
              label="调班人1排班时间"
            >
              <template scope="scope">
                {{
                 String($Tools.timeFormatAll(scope.row.date1)).slice(0,10)
                }}
              </template>
            </el-table-column>
            <el-table-column
              prop="date2"
              label="调班人2排班时间"
            >
              <template scope="scope">
                {{
                 String($Tools.timeFormatAll(scope.row.date2)).slice(0,10)
                }}
              </template>
            </el-table-column>
            <el-table-column
            show-overflow-tooltip
              prop="time"
              label="修改时间"
            >
              <template scope="scope">
                {{
                 $Tools.timeFormatAll(scope.row.time)
                }}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="examine_bottom">
          <el-pagination
            hide-on-single-page
            @current-change="handleCustomerPage"
            :page-size="params.pageSize"
            :current-page="params.pageIndex"
            background
            layout="total,prev, pager, next"
            :total="params.totalNum"
          >
          </el-pagination>
        </div>
        <div class="watchBook_bootom"></div>
        <div></div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      params: {
        pageIndex: 1, //当前页码
        pageSize: 10,
        totalNum: 0, //页码总数
      },
      watchBook: [],
      watchBookItem: {},
      watchBookTcShow: false,
      watchBookTcType: '',
      watchBookInputName: '', //日志输入框
    }
  },

  created() {},
  mounted() {
    this.DutyLogBookGetList() //值班日志本控制器
  },
  destroyed() {},
  computed: {},
  methods: {
    handleCustomerPage(val) {
      this.params.pageIndex = val
      this.DutyLogBookGetList()
    },

    async DutyLogBookGetList() {
      //值班日志本list
      const res = await this.$api.MMS.ShiftRecord.Get({
        pageIndex: this.params.pageIndex,
        pageSize: this.params.pageSize,
      })
      if (res.ok) {
        this.params.totalNum = res.data.total
        this.watchBook = res.data.list
      }
    },

    tableRowClassName({ row, rowIndex }) {
      //背景色
      if (rowIndex % 2 == 1) {
        return 'warning-row' //基数
      } else {
        return 'success-row' //偶数
      }
      return ''
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../OnDuty/styles/DutyLogBook.scss';
</style>
<style  lang="scss" scoped>
.DutyLogBook_tanchuang_ying {
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: -11.3vh;
  left: -26vw;
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
          margin: 0 5px;
        }
        .margin_tc {
          margin: 0 0.3vw;
        }
        > img {
          vertical-align: baseline;
          width: 22px;
          height: 12px;
        }
      }

      .tanchuang_center {
        margin: 2vh 2vw;
        .tanchuang_center_cen {
          margin-top: 3vh;

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
          //值班管理、值班日志本
          .watchBook_tanchuang_center_cen_top {
            .watchBook_list {
              margin-top: 8vh;

              > li {
                opacity: 0.8;
                span {
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #ffffff;
                  color: #00f0ff;
                }
                > i {
                  margin-left: 5px;
                  color: #00f0ff;
                }
                input {
                  width: 8.5vw;
                  height: 3vh;
                  background-color: rgba(0, 0, 0, 0);
                  border: 1px solid #00f0ff;
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #ffffff;
                  padding-left: 10px;
                  padding-right: 10px;
                }
              }
            }
          }
        }
      }
    }
    .cancel {
      img {
        cursor: pointer;
        // width: 44px;
        // height: 44px;
      }
    }
  }
}
</style>
