<template>
  <div>
    <div class="shiftClass_right_margin">
      <div class="watchBook">
        <div
          class="watchBook_top"
          v-if="$Tools.accessControl( this.$store.state.userGetUserRole.resList,'EditDutyLogBook')"
        >
          <span @click="watchBookTcShowxie()">添加</span>
        </div>
        <div class="watchBook_center">
          <el-table
            :data="watchBook"
            style="width: 100%"
            :row-class-name="tableRowClassName"
          >
            <el-table-column
              prop="name"
              label="名称"
            ></el-table-column>
            <el-table-column
              prop="createUserName"
              label="创建者"
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
            >
              <template scope="scope">
                {{
                 $Tools.timeFormatAll(scope.row.createTime)
                }}
              </template>
            </el-table-column>
            <el-table-column
              label="编辑"
              width="80px"
              v-if="$Tools.accessControl( this.$store.state.userGetUserRole.resList,'EditDutyLogBook')"
            >
              <template slot-scope="scope">
                <span
                  class="green"
                  @click="watchBookTcShowbian(scope.row, 'Editing')"
                >编辑</span>
              </template>
            </el-table-column>
            <el-table-column
              label="删除"
              width="80px"
              v-if="$Tools.accessControl( this.$store.state.userGetUserRole.resList,'EditDutyLogBook')"
            >
              <template slot-scope="scope">
                <el-popconfirm
                  title="确定删除吗"
                  @onConfirm="DutyLogBookDelete(scope.row.no)"
                  @confirm="DutyLogBookDelete(scope.row.no)"
                >
                  <span
                    class="red"
                    slot="reference"
                  >删除</span>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="watchBook_bootom"></div>
        <div></div>
      </div>
    </div>

    <div
      class="DutyLogBook_tanchuang_ying"
      v-if="watchBookTcShow"
    >
      <div class="tanchuang">
        <div class="tanchuang_bg">
          <div class="tanchuang_top">
            <img
              :src="require('~@/assets/image/index/partial_left.png')"
              alt
            />
            <span class="top_title">{{watchBookTcType=='add'?'添加日志本':'编辑日志本'}}</span>

            <img
              :src="require('@/assets/image/index/partial_right.png')"
              alt
            />
          </div>
          <div class="tanchuang_center">
            <div class="tanchuang_center_cen">
              <div class="watchBook_tanchuang_center_cen_top">
                <ul class="watchBook_list">
                  <li>
                    <span>名称：</span>
                    <input
                      type="text"
                      v-model="watchBookInputName"
                    />
                    <i>*</i>
                  </li>
                </ul>
              </div>
              <div class="tanchuang_center_cen_bottom">
                <button
                  @click="watchBookTcType=='add'?DutyLogBookAdd():DutyLogBookUpdate()"
                  v-preventReClick="2000"
                >确认</button>
                <button @click="watchBookTcShow=false">取消</button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="cancel"
          @click="watchBookTcShow=false"
        >
          <img
            :src="require('@/assets/image/index/cancel.png')"
            alt
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
    async DutyLogBookUpdate() {
      let obj = {
        Name: this.watchBookInputName,
        No: this.watchBookItem.no,
        CreateUserNo: this.watchBookItem.createUserNo,
        CreateTime: this.watchBookItem.createTime,
      }
      //编辑
      const res = await this.$api.MMS.DutyLogBook.Update(obj)
      if (res.ok) {
        this.DutyLogBookGetList()
        this.watchBookTcShow = false
      }
    },
    async DutyLogBookAdd() {
      //添加
      const res = await this.$api.MMS.DutyLogBook.Add({
        Name: this.watchBookInputName,
      })
      if (res.ok) {
        this.DutyLogBookGetList()
        this.watchBookTcShow = false
      }
    },
    watchBookTcShowxie() {
      //写日志
      this.watchBookInputName = ''
      this.watchBookTcShow = true
      this.watchBookTcType = 'add'
    },
    watchBookTcShowbian(item, type) {
      this.watchBookTcShow = true
      this.watchBookTcType = type
      this.watchBookInputName = item.name
      this.watchBookItem = item
    },
    async DutyLogBookDelete(no) {
      //删除
      const res = await this.$api.MMS.DutyLogBook.Delete({ no })
      if (res.ok) {
        this.DutyLogBookGetList()
      }
    },
    async DutyLogBookGetList() {
      //值班日志本list
      const res = await this.$api.MMS.DutyLogBook.GetList({})
      if (res.ok) {
        this.watchBook = res.data
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
@import './styles/DutyLogBook.scss';
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
