<template>
    <div>
         <div class="scheduling_top_left">
          <ul class="scheduling_top_left_list">
            <li>
              <span>姓名：</span>

               <input
               :placeholder="'请输入'"
                        type="text"
                        class="Equipment_input"
                        v-model="operationParam.name"
                      />
            </li>
           
            <li>
              <el-button
                type="success"
                size="mini"
                @click="getoperationlist()"
              >查询</el-button>
            </li>
            <li>
                 <el-button
                
                    type="primary"
                    size="mini"
                    @click="operationShowxie()"
                  >添加</el-button>
                
            </li>
          </ul>
        </div>
        <div class="shiftClass_right_margin">
            <div class="watchBook">
               
                <div class="watchBook_center">
                    <el-table :data="operationlist.list" style="width: 100%" :row-class-name="tableRowClassName">
                         <el-table-column prop="userName" label="姓名">
                    </el-table-column>
                    <el-table-column prop="name" label="操作证名称">
                    </el-table-column>
                    <el-table-column prop="" label="状态">
                      <template scope="scope">
                        <span
                          v-if="((new Date(scope.row.endTime) - new Date()) / 1000 / 3600 / 24) < scope.row.remindDate"
                          class="red"
                          >即将到期</span
                        >
                        <span v-else>正常</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="endTime" label="到期时间">
                      <template scope="scope">
                        <span>
                          {{ String(scope.row.endTime).slice(0, 10) + ' ' + String(scope.row.endTime).slice(11) }}
                        </span>
                      </template>
                    </el-table-column>
                      <el-table-column prop="remindDate" label="提醒周期(天)" width="110px">
                      </el-table-column>
                    <el-table-column prop="" label="操作证">
                      <template scope="scope">
                        <img
                          v-if="scope.row.imageId1"
                          style="cursor: pointer; width: 40px; height: 40px"
                          @click="previewChartImg(FileBaseURL + 'api/Image/GetOriginalImg/' + scope.row.imageId1)"
                          :src="FileBaseURL + 'api/Image/GetOriginalImg/' + scope.row.imageId1"
                          alt=""
                        />
                        <img
                          v-if="scope.row.imageId2"
                          style="cursor: pointer; width: 40px; height: 40px"
                          @click="previewChartImg(FileBaseURL + 'api/Image/GetOriginalImg/' + scope.row.imageId2)"
                          :src="FileBaseURL + 'api/Image/GetOriginalImg/' + scope.row.imageId2"
                          alt=""
                        />
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-if="$Tools.accessControl(
                              this.$store.state.userGetUserRole.resList,
                              'EditPatrolPlan'
                          )
                          "
                      label="操作"
                      width="90px"
                    >
                      <template slot-scope="scope">
                        <span
                          class="editing_green"
                          @click="editoperationlist(scope.row)"
                          >修改</span
                        >
                        <el-popconfirm
                          title="确定删除吗"
                          @confirm="deleteoperationlist(scope.row.userNo)"
                        >
                          <span class="red mgl7" slot="reference">删除</span>
                        </el-popconfirm>
                      </template>
                    </el-table-column>
                    </el-table>
                </div>
                <div class="watchBook_bootom"></div>
                <div></div>
            </div>
        </div>
      <div class="fenye">
                  <el-pagination
                    :page-size="operationParam.pageSize"
                    hide-on-single-page
                    @current-change="Current2"
                    layout="prev, pager, next"
                    :total="operationParam.total"
                    :current-page="operationParam.pageIndex"
                  ></el-pagination>
                </div>
                   <div
            class="EquipmentSignal_tanchuang_ying_IP"
            v-if="operationShow"
          >
            <div class="tanchuang">
              <div :class="['tanchuang_bg']">
                <div class="tanchuang_top">
                  <img
                    :src="require('~@/assets/image/index/partial_left.png')"
                    alt
                  />
                  <span class="top_title margin_tc">{{ operationAdd == 'add' ? '添加操作证' : '编辑操作证' }}</span>

                  <img
                    :src="require('@/assets/image/index/partial_right.png')"
                    alt
                  />
                </div>
                <div class="tanchuang_center">
                  <div class="tanchuang_center_cen">
                    <div class="InspectionPlan_add">
                      <ul class="InspectionPlan_add_cen_top formValidator">
                        <el-form
                          :model="formValidator"
                          ref="formValidator"
                          label-width="100px"
                          class="demo-dynamic"
                          :rules="rules"
                        >
                        
                          <li style="text-align: left;box-sizing: border-box;padding-left: 15px;" class="lis">
                                <el-form-item prop="name">
                                  <span class="span_wii">用户:</span>
                                 <el-select v-model="operationform.userNo" filterable placeholder="请选择">
                            <el-option v-for="item in UserList" :key="item.no" :label="item.name" :value="item.no">
                            </el-option>
                          </el-select> 
                                  <i>*</i>
                                </el-form-item>
                              </li>
                          <li style="text-align: left;box-sizing: border-box;padding-left: 0px;" class="lis">
                            <el-form-item prop="name">
                              <span class="span_wii">操作证名称:</span>
                              <el-input
                                type="text"
                                v-model="operationform.name"
                              />
                              <i>*</i>
                            </el-form-item>
                          </li>
                            <li style="text-align: left;box-sizing: border-box; padding-left: 5px;" class="lis">
                                    <el-form-item label="" prop="remindDate">
                                    <span class="span_wii">提醒周期(天):</span>
                                  <el-input v-model="operationform.remindDate" type="text">
                    
                                  </el-input> <i>*</i>
                                </el-form-item>
                                   </li>
                         <li style="text-align: left;box-sizing: border-box;padding-left: 36px;" class="lis">
                          <el-form-item label="" prop="startTime">
                            <span class="span_wii">起始时间:</span>
                            <el-date-picker v-model="operationform.startTime" type="datetime" value-format="yyyy-MM-dd hh:mm:ss" size="large">
                            </el-date-picker> <i>*</i>
                          </el-form-item>
                        
                        </li>
                         <li style="text-align: left;box-sizing: border-box;padding-left: 36px;" class="lis">
                             <el-form-item label="" prop="endTime">
                                <span class="span_wii">到期时间:</span>
                                <el-date-picker v-model="operationform.endTime" type="datetime" value-format="yyyy-MM-dd hh:mm:ss"
                                  size="large"></el-date-picker> <i>*</i>
                              </el-form-item>
                           </li>
                              <el-form-item
                          style="
                        display: flex;
                        width: 100%;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                      "
                        >
                          <el-upload
                            style="
                          width: 100px;
                          height: 100px;
                          border: 1px dashed #d9d9d9;
                          cursor: pointer;
                          overflow: hidden;
                          display: inline-block;
                        "
                            :action="uploadUrl"
                            :show-file-list="false"
                            :auto-upload="true"
                            accept=".jpg,.png,.jpeg,.gif"
                            :before-upload="beforeUpload"
                            :on-success="oncaozuoImageSuccess"
                          >
                            <img
                              v-if="operationform.imageId1"
                              :src="operationform.imageId1Url"
                              style="max-width: 100px; max-height: 100px"
                            />
                            <i
                              v-else
                              class="el-icon-plus"
                              style="
                            font-size: 40px;
                            width: 100px;
                            height: 100px;
                            line-height: 100px;
                            text-align: center;
                          "
                            ></i>
                          </el-upload>

                          <el-upload
                            style="
                          width: 100px;
                          height: 100px;
                          border: 1px dashed #d9d9d9;
                          cursor: pointer;
                          overflow: hidden;
                          display: inline-block;
                        "
                            :action="uploadUrl"
                            :show-file-list="false"
                            :auto-upload="true"
                            accept=".jpg,.png,.jpeg,.gif"
                            :before-upload="beforeUpload"
                            :on-success="oncaozuoFireImageSuccess"
                          >
                            <img
                              v-if="operationform.imageId2"
                              :src="operationform.imageId2Url"
                              style="max-width: 100px; max-height: 100px"
                            />
                            <i
                              v-else
                              class="el-icon-plus"
                              style="
                            font-size: 40px;
                            width: 100px;
                            height: 100px;
                            line-height: 100px;
                            text-align: center;
                          "
                            ></i>
                          </el-upload>
                        </el-form-item>
                        <el-form-item> 注:操作证支持上传PDF格式文件 </el-form-item>
                        <br />
                        <el-form-item>
                          <el-upload
                            class="upload-demo"
                            ref="upload"
                            auto-upload
                            :limit="2"
                            :action="uploadFileUrl"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :on-success="submitUpload"
                          >
                            <el-button slot="trigger" size="small" type="primary"
                              >选取文件</el-button
                            >
                            <!-- <el-button  size="small"
@click="download()"
 type="primary" v-if="operationform.pdfId1||operationform.pdfId2" 
                          >下载文件</el-button
                        > -->
                            <!-- <div slot="tip" class="el-upload__tip">只能pdf文件</div> -->
                          </el-upload>
                        </el-form-item>
                     

                        </el-form>
                      </ul>
                    </div>
              <div class="tanchuang_center_cen_bottom">
                      <button @click="operationUpdate()">确认</button>
                      <button @click="watchTcShow = false">取消</button>
                    </div>
                  
                  </div>
                </div>
              </div>
              <div class="cancel" @click="operationShow = false">
                        <img :src="require('@/assets/image/index/cancel.png')" alt />
                    </div>
            </div>
          </div>
        <!-- <div class="DutyLogBook_tanchuang_ying" v-if="operationShow">
            <div class="tanchuang">
                <div class="tanchuang_bg">
                    <div class="tanchuang_top">
                        <img :src="require('~@/assets/image/index/partial_left.png')" alt />
                        <span class="top_title">{{ operationAdd == 'add' ? '添加操作证' : '编辑操作证' }}</span>

                        <img :src="require('@/assets/image/index/partial_right.png')" alt />
                    </div>
                    <div class="tanchuang_center">
                        <div class="tanchuang_center_cen">
                            <div class="watchBook_tanchuang_center_cen_top">
                                <ul class="watchBook_list">
                                    <li>
                                        <span>名称：</span>
                                        <input type="text" v-model="watchBookInputName" />
                                        <i>*</i>
                                    </li>
                                    
                                       <li>
                     <el-form-item prop="userNo">
                          <el-select v-model="operationform.userNo" filterable placeholder="请选择">
                            <el-option v-for="item in UserList" :key="item.no" :label="item.name" :value="item.no">
                            </el-option>
                          </el-select> </el-form-item>
                          </li>
                                </ul>
                            </div>
                            <div class="tanchuang_center_cen_bottom">
                                <button @click="operationAdd == 'add' ? DutyLogBookAdd() : DutyLogBookUpdate()"
                                    v-preventReClick="2000">确认</button>
                                <button @click="operationShow = false">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cancel" @click="operationShow = false">
                    <img :src="require('@/assets/image/index/cancel.png')" alt />
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            operationParam:{
                 name: "",
                pageIndex: 1,
                pageSize: 10,
            },
           
             operationlist: [],
                  operationform: {
                userNo: "",
                startTime: "",
                endTime: "",
                imageId1: "",
                imageId2: "",
                remindDate: '',
                name: '',
                files: [],
                pdfId1: "",
                pdfId2: "",
                imageId1Url: "",
                imageId2Url: "",
            },
               fileList: [],
            operationShow: false,
            operationAdd: '',
            watchBookInputName: '', //日志输入框
            FileBaseURL: window.ApiFileURL,
             uploadUrl: window.ApiFileURL + "api/Image/UploadImg",
               uploadFileUrl: window.ApiFileURL + "api/File/UploadFile",
        }
    },

    created() { },
    mounted() {
        this.getoperationlist() //值班日志本控制器
    },
    destroyed() { },
    computed: {},
    methods: {
                submitUpload(file, fileList) {
            console.log(fileList);
            this.operationform.files = fileList;
            if (this.operationform.pdfId1) {
                this.operationform.pdfId2 = file.data[0];
            } else {
                this.operationform.pdfId1 = file.data[0];
            }
            this.$refs.upload.submit();
        },
               handlePreview(file) {
            console.log(file);
        },
               handleRemove(file, fileList) {
            console.log(file, fileList);
            if (file == this.operationform.files) {
                if (this.operationform.pdfId2) {
                    this.operationform.pdfId2 = "";
                } else {
                    this.operationform.pdfId1 = "";
                }
            } else if (file != this.operationform.files) {
                this.operationform.pdfId1 = "";
            }
            console.log(this.operationform);
        },
            oncaozuoImageSuccess(file) {
            this.operationform.imageId1 = file.data[0];
            // console.log(this.operationform);
            this.operationform.imageId1Url =
                window.FileBaseURL +
                "api/Image/GetOriginalImg/" +
                file.data[0];
        },
        oncaozuoFireImageSuccess(file) {
            this.operationform.imageId2 = file.data[0];
            this.operationform.imageId2Url =
                window.FileBaseURL +
                "api/Image/GetOriginalImg/" +
                file.data[0];
            console.log(this.operationform);
        },
             beforeUpload(file) {
            var index = file.name.lastIndexOf(".");
            var ext = file.name.substring(index).toLowerCase();
            var list = [".jpg", ".png", ".jepg", ".gif"];
            if (list.indexOf(ext) == -1) {
                this.LayerMsgInfo("warning", "请选择图片");
                return false;
            }
        },
           Current2(e) {
            //分页响应事件
            // this.UserGetList(e)
            this.operationParam.pageIndex = e;
            this.getoperationlist();
        },
                      async getoperationlist() {
                      const res =   await this.$api.MMS.UserOperateCert.Get({
                name: this.operationParam.name,
                pageIndex: this.operationParam.pageIndex,
                pageSize: this.operationParam.pageSize,
            })
           
            if (res.ok) {
                console.log(res);
                this.operationlist = res.data;
            } else {
                this.LayerMsgInfo("warning", res.message);
            }
        },
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
                this.operationShow = false
            }
        },
        async DutyLogBookAdd() {
            //添加
            const res = await this.$api.MMS.DutyLogBook.Add({
                Name: this.watchBookInputName,
            })
            if (res.ok) {
                this.DutyLogBookGetList()
                this.operationShow = false
            }
        },
        operationShowxie() {
           
           
            this.operationShow = true
            this.operationAdd = 'add'
              this.operationform = {
                remindDate: '',
                name: '',
                userNo: "",
                startTime: "",
                endTime: "",
                imageId1: "",
                imageId2: "",
                files: [],
                pdfId1: "",
                pdfId2: "",
                imageId1Url: "",
                imageId2Url: "",
            };
        },
  
             async deleteoperationlist(no) {
            console.log(no);
             const res = await this.$api.MMS.UserOperateCert.Delete({ no })
          
            if (res.ok) {
                this.getoperationlist();
                this.LayerMsgInfo("success", "成功");
            } else {
                this.LayerMsgInfo("warning", res.message);
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
.fenye {
  text-align: center;
  position: relative;
  top: -20px;
}
.Equipment_input {
                                width: 150px;
                                height: 3vh;
                                background: rgba(0, 0, 0, 0);
                                border: 1px solid rgba(255, 255, 255, 1);
                                padding-left: 5px;
                                color: #fff;
                            }
 .scheduling_top_left {
    padding-top: 20px;
    padding-left: 24px;
    .scheduling_top_left_list {
      display: flex;
      justify-content: start;

      li {
        margin: 0 10px;
        // color: #00f0ff;
      }
    }
  }
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

                >img {
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

                            >li {
                                opacity: 0.8;

                                span {
                                    font-size: 14px;
                                    font-family: MicrosoftYaHei;
                                    font-weight: 400;
                                    color: #ffffff;
                                    color: #00f0ff;
                                }

                                >i {
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
.EquipmentSignal_tanchuang_ying_IP {
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: -13.3vh;
  left: -26vw;
  width: 100vw;
  height: 100vh;

  .tanchuang {
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .gongd_tanchuang_bg {
      width: 58vw !important;
    }
    .selectEq_bg {
      width: 50vw !important;
    }

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
        margin: 12px 0px;
        .tanchuang_center_cen {
          overflow: auto;
          height: 50vh;
          //添加巡检计划
          .InspectionPlan_add {
            //添加
            .InspectionPlan_add_cen_top {
              margin-top: 5vh;
              opacity: 0.9;
              li {
                position: relative;
                margin-top: 1vh;
                display: flex;
                justify-content: center;
                align-items: center;
                transform: translateZ(0);
                .el-input {
                  width: unset !important;
                }
                //请选择
                .po_witd {
                  position: absolute;
                  top: 50%;
                  right: 36%;
                  transform: translate(-36%, -50%);
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  // color: #00f0ff;
                }

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
                  display: inline-block;
                  text-align: left;
                  font-size: 16px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #00f0ff;
                }
                .span_wii {
                  width: 125px !important;
                  text-align: left;
                }
                .padding_le {
                  input {
                    padding-left: 40px;
                  }
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
          }

          .editTime_add {
            //添加时间
            margin: 0 3vw;

            .editTime_center {
              .editTime_list {
                margin-top: 8vh;
                .time_input {
                  display: flex;
                  color: #fff;
                  > i {
                    margin: 0 7px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                  > span {
                    min-width: 54px;
                    vertical-align: top;
                    line-height: 3vh;
                  }
                }
                > li {
                  margin-top: 3vh;
                  margin-left: 50%;
                  transform: translateX(-50%);
                  opacity: 0.8;
                  span {
                    font-size: 14px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
                    color: #ffffff;
                  }
                  input {
                    width: 6.4vw;
                    height: 3vh;
                    line-height: 3vh;
                    background-color: rgba(0, 0, 0, 0);
                    border: 1px solid #00f0ff;
                    font-size: 14px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
                    color: #ffffff;
                    padding-left: 30px;
                    padding-right: 10px;
                  }
                }
              }
            }
          }
          //添加巡检项
          .editTheCheck_add {
            //添加信号
            .signalTc {
              .signalTc_center {
                margin-top: 6vh;
                width: 100%;

                height: 33vh;
                overflow: auto;
                li {
                  margin-top: 1vh;
                  display: flex;
                  justify-content: start;
                  margin-left: 200px;
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
                  .span_wiidth {
                    width: 70px;
                  }
                  .empty {
                    font-size: 16px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
                    color: #00f0ff;
                  }
                  .checkboxList {
                    // width: 8.5vw;
                    // height: 20vh;
                    width: 20vw;
                    height: 6vh;
                    overflow: auto;
                    .information_bootom {
                      background-color: rgba(0, 0, 0, 0) !important;
                      opacity: 0.8;

                      .readio_information {
                        display: flex;
                        justify-content: start;
                        flex-direction: row;
                        flex-wrap: wrap;

                        .radio_type {
                          margin-right: 6px;
                          width: 0px;
                          height: 0px;

                          appearance: none;
                          position: relative;
                          border: none;
                          outline: none;
                        }
                        .radio_type:before {
                          content: '';
                          width: 10px;
                          height: 10px;
                          border: 1px solid #00f0ff;
                          display: inline-block;
                          border-radius: 10%;
                          vertical-align: middle;
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                        }
                        .radio_type:checked:before {
                          content: '';
                          width: 10px;
                          height: 10px;
                          border: 1px solid #00f0ff;
                          display: inline-block;
                          border-radius: 10%;
                          vertical-align: middle;
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                        }
                        .radio_type:checked:after {
                          content: '';
                          width: 6px;
                          height: 6px;
                          text-align: center;
                          background: #00f0ff;
                          border-radius: 10%;
                          display: block;
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                        }

                        label {
                          height: 2vh;
                          line-height: 2vh;
                          font-size: 14px;
                          font-family: MicrosoftYaHei;
                          font-weight: 400;
                          color: #00f0ff;
                          margin: 0 0.8vw;
                          display: flex;
                          align-items: center;
                          cursor: pointer;

                          input {
                            line-height: 2vh;
                          }
                          span {
                            margin: 0.3vw;
                          }
                        }
                      }
                    }
                  }
                  .checkboxLists {
                    // width: 8.5vw;
                    // height: 20vh;
                    // width: 20vw;
                    // height: 20vh;
                    overflow: auto;
                    .information_bootom {
                      background-color: rgba(0, 0, 0, 0) !important;
                      opacity: 0.8;

                      .readio_information {
                        display: flex;
                        justify-content: start;
                        flex-direction: row;
                        flex-wrap: wrap;

                        .radio_type {
                          margin-right: 6px;
                          width: 0px;
                          height: 0px;
                          appearance: none;
                          position: relative;
                          border: none;
                          outline: none;
                        }
                        .radio_type:before {
                          content: '';
                          width: 10px;
                          height: 10px;
                          border: 1px solid #00f0ff;
                          display: inline-block;
                          border-radius: 50%;
                          vertical-align: middle;
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                        }
                        .radio_type:checked:before {
                          content: '';
                          width: 10px;
                          height: 10px;
                          border: 1px solid #00f0ff;
                          display: inline-block;
                          border-radius: 50%;
                          vertical-align: middle;
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                        }
                        .radio_type:checked:after {
                          content: '';
                          width: 6px;
                          height: 6px;
                          text-align: center;
                          background: #00f0ff;
                          border-radius: 50%;
                          display: block;
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                        }

                        label {
                          height: 2vh;
                          line-height: 2vh;
                          font-size: 14px;
                          font-family: MicrosoftYaHei;
                          font-weight: 400;
                          color: #00f0ff;
                          margin: 0 0.8vw;
                          display: flex;
                          align-items: center;
                          cursor: pointer;

                          input {
                            line-height: 2vh;
                          }
                          span {
                            margin: 0.3vw;
                          }
                        }
                      }
                    }
                  }
                }
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
      > img {
        cursor: pointer;
        margin: 0 7px;
      }
    }
  }
}

</style>
<style>
 input.el-input__inner {
      background: transparent;
      color: #fff;
    }
  .readio_information {
      width: 172px !important;
    }
    .red {
      color: red;
    }

    .el-input {
      margin-left: -2px;
    }
  .ceshi .el-icon-close {
    border-radius: 50%;
    text-align: center;
    margin-bottom: 3px;
    /* position: relative;
    cursor: pointer;
    font-size: 12px;
    height: 16px;
    width: 16px;
    line-height: 16px;
    vertical-align: middle;
    top: -6px;
    right: 33px; */
}
.ceshi .el-icon-arrow-down{
  position: relative;
  left: 45px;
}
.el-cascader__suggestion-list {
    max-height: 204px;
    margin: 0;
    padding: 6px 0;
    font-size: 14px;
    color: #fff;
    text-align: center;
    background: black;
}
.el-cascader__suggestion-item{
    color: #fff;
  background: black;
}
.el-cascader__suggestion-item :hover{
    color: #fff;
  
}
.el-cascader__suggestion-item:focus, .el-cascader__suggestion-item:hover {
    background: linear-gradient(120deg, rgba(12, 236, 234), rgba(12, 236, 234)) !important;
}
.el-form-item__label{
  color: #fff;
}
.lis .el-input--small .el-input__inner {
    height: 32px;
    line-height: 32px;
    width: 220px;
}
</style>
