<!--
 * @Author: your name
 * @Date: 2020-11-09 11:31:29
 * @LastEditTime: 2021-12-02 10:21:35
 * @LastEditors: Please set LastEditors
 * @Description://知识库查询
 * @FilePath: \IBMS\ibms\src\views\Assistance\components\KnowledgeBase\KnowledgeSearch.vue
-->
<template>
  <div class="KnowledgeSearch">
    <div class="KnowledgeSearch_ceneter">
      <div class="KnowledgeSearch_top">
        <ul>
          <li>
            <span>类别：</span>
            <el-cascader
              :show-all-levels="false"
              v-model="inputCategory"
              :options="categoryData"
              :props="{
                expandTrigger: 'hover',
                value: 'model',
                checkStrictly: true
              }"
              @change="DepartmentChane(inputCategory)"
              :placeholder="inputCategory"
              clearable
            >
              <template slot-scope="{ node, data }">
                <span>{{ data.model.name }}</span>
                <span v-if="!node.isLeaf">({{ data.children.length }})</span>
              </template>
            </el-cascader>
          </li>
          <li>
            <span class="span_width">关键字：</span>
            <el-input
              class="keyword"
              v-model="keyword"
            ></el-input>
            <div>(多个关键字以空格隔开)</div>
          </li>
          <li>
            <div class="div_button">
              <button @click="KnowledgeGetList(1, categoryId, keyword)">
                查询
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div class="KnowledgeSearch_list">
        <el-table
          :data="KnowledgeData.list"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            prop="subject"
            label="标题"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="categoryName"
            label="类别"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="keywords"
            label="关键字"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="content"
            label="内容"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="createUserName"
            label="创建人"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="170px"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>
                {{ $Convert.getTime(scope.row.createTime) }}
              </span>
            </template>
          </el-table-column>

          <el-table-column
            label="查看"
            width="50px"
          >
            <template slot-scope="scope">
              <span
                class="editingEquipment_green"
                @click="addTc('chakan', scope.row)"
              >查看</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="KnowledgeSearch_foot">
        <div class="fenye">
          <el-pagination
            hide-on-single-page
            @current-change="Current"
            :page-size="pageSize"
            :pager-count="11"
            layout="prev, pager, next"
            :total="KnowledgeData.total"
            :current-page="pageIndex"
          ></el-pagination>
        </div>
      </div>
    </div>
    <div
      class="Knowledge_tanchuang_ying"
      v-if="addKnowledgeShow"
    >
      <div class="tanchuang">
        <div class="tanchuang_bg">
          <div class="tanchuang_top">
            <img
              :src="require('~@/assets/image/index/partial_left.png')"
              alt
            />
            <span class="top_title">
              {{ addKnowledgeType == 'chakan' ? '查看知识库' : '' }}
            </span>

            <img
              :src="require('@/assets/image/index/partial_right.png')"
              alt
            />
          </div>
          <div class="tanchuang_center">
            <div class="tanchuang_center_cen">
              <div
                class="tanchuang_center_cen_top"
                v-if="addKnowledgeType == 'chakan'"
              >
                <ul>
                  <li>
                    <span class="span_width">主题：</span>
                    <div class="chakan">{{ KnowledgeDataItem.subject }}</div>
                  </li>
                  <li>
                    <span class="span_width">类别：</span>
                    <div class="chakan">
                      {{ KnowledgeDataItem.categoryName }}
                    </div>
                  </li>
                  <li>
                    <span class="span_width">关键词：</span>
                    <div class="chakan">{{ KnowledgeDataItem.keywords }}</div>
                  </li>
                  <li class="tc_textarea">
                    <span class="span_width">内容：</span>
                    <div
                      class="chakan min_hei"
                      v-html="KnowledgeDataItem.content"
                    ></div>
                  </li>
                  <li>
                    <span class="span_width">照片：</span>
                    <div class="photo">
                      <ul>
                        <li>
                          <div class="photo_img">
                            <img
                              @click="handlePreview(photoId0)"
                              :src="photoId0Img"
                              v-if="photoId0Img != ''"
                              alt
                            />
                            <i v-else>无图片</i>
                          </div>
                        </li>
                        <li>
                          <div class="photo_img">
                            <img
                              @click="handlePreview(photoId1)"
                              :src="photoId1Img"
                              v-if="photoId1Img != ''"
                              alt
                            />
                            <i v-else>无图片</i>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="cancel">
          <img
            @click="addKnowledgeShow = false"
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
      inputCategory: '所有',
      categoryData: [], //获取知识库列表
      keyword: '',
      KnowledgeData: [], //
      KnowledgeDataItem: {},
      pageSize: 14, //一页多少条
      pageIndex: 1, //实时页码
      categoryId: '',
      addKnowledgeType: '',
      addKnowledgeShow: false,
      photoId0: '',
      photoId1: '',
      photoId0Img: '',
      photoId1Img: '',
    }
  },

  created() {},
  mounted() {
    this.KnowledgeCategoryGetList()
    this.KnowledgeGetList(1, '.', '')
  },
  destroyed() {},
  computed: {},
  methods: {
    // 预览
    async handlePreview(val) {
      const prepareres = await this.$api.MMS.Image.GetOriginalImg(val)
      if (prepareres) {
        let url = window.URL.createObjectURL(new Blob([prepareres]))
        let link = document.createElement('a')
        link.href = url
        const image = new Image()
        image.src = link
        const imgWindow = window.open(link)
        imgWindow.document.write(image.outerHTML)
      } else {
        this.$message('图片下载失败')
      }
    },
    async ImageGetThumbnailImg(id, type) {
      //获取文件流
      const res = await this.$api.MMS.Image.GetThumbnailImg(id)
      if (res) {
        if (type == '0') {
          this.photoId0Img = window.URL.createObjectURL(res)
        } else if (type == '1') {
          this.photoId1Img = window.URL.createObjectURL(res)
        }
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },

    addTc(type, item) {
      this.KnowledgeDataItem = item
      this.addKnowledgeType = type
      this.addKnowledgeShow = true
      this.photoId0 = item.photoId0
      this.photoId1 = item.photoId1
      if (item.photoId0 != null) {
        this.ImageGetThumbnailImg(item.photoId0, '0')
      }
      if (item.photoId1 != null) {
        this.ImageGetThumbnailImg(item.photoId1, '1')
      }
    },
    Current(e) {
      //分页响应事件
      //  this.pageIndex = e //赋值更新方法
      this.KnowledgeGetList(e, this.categoryId, this.keyword)
    },
    async KnowledgeGetList(pageIndex, id, keyword) {
      //获取知识库
      this.pageIndex = pageIndex
      const res = await this.$api.MMS.Knowledge.GetList({
        keyword: keyword,
        categoryId: id,
        pageSize: this.pageSize, //一页多少条
        pageIndex: pageIndex, //实时页码
      })
      if (res.ok) {
        this.KnowledgeData = res.data
      }
    },
    DepartmentChane(name) {
      //分项拼接
      let res = ''
      for (var i = 0; i < name.length; i++) {
        res = name[i].name
        this.categoryId = name[i].id
      }

      if (res == this.inputCategory) {
        return
      }
      this.inputCategory = res
    },
    async KnowledgeCategoryGetList() {
      //获取知识库列表
      const res = await this.$api.MMS.KnowledgeCategory.GetList({})
      if (res.ok) {
        let data = res.data

        this.categoryData = this.getTreeData(data)
        this.categoryData.unshift({
          children: undefined,
          model: {
            id: '.',
            name: '所有',
          },
        })
      }
    },
    getTreeData(data) {
      // 递归
      for (var i = 0; i < data.length; i++) {
        if (data[i].children.length == 0) {
          // children若为空数组，则将children设为undefined
          data[i].children = undefined
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children)
        }
      }

      return data
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
}
</script>
<style lang="scss" scoped>
@import './styles/KnowledgeSearch.scss';
</style>
<style lang="scss">
.Knowledge_tanchuang_ying {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;

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

        .margin_tc {
          margin: 0 0.3vw;
        }

        > img {
          vertical-align: baseline;
        }
      }

      .tanchuang_center {
        margin: 2vh 2vw;

        .tanchuang_center_cen {
          margin-top: 3vh;

          //公告内容
          .tanchuang_center_cen_top {
            text-align: left;

            ul {
              li {
                display: flex;
                margin-bottom: 1vh;
                align-items: center;
                .chakan {
                  color: #00f0ff;
                }
                //换行
                .min_hei {
                  max-height: 12.5rem;
                  overflow: auto;
                  white-space: pre-wrap;
                }
                .zhutiInput {
                  width: 200px;
                  color: #fff;
                  input::-webkit-input-placeholder {
                    /* placeholder颜色  */
                    color: #fff;
                  }
                }
                .keyword {
                  width: 300px;
                }

                input {
                  height: 3vh;
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
                .span_width {
                  width: 68px;
                }

                i {
                  font-size: 16px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #00f0ff;
                  margin-left: 0.3vw;
                }

                //照片
                .photo {
                  > ul {
                    display: flex;

                    > li {
                      display: flex;
                      flex-direction: column;

                      .photo_img {
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 12vh;
                        width: 6.5vw;
                        cursor: pointer;
                        border: 1px solid #00f0ff;

                        > i {
                          position: absolute;
                          text-align: center;
                          left: 50%;
                          top: 50%;
                          transform: translate(-50%, -50%);
                          font-size: 14px;
                          margin-left: 0;
                        }

                        img {
                          height: 11vh;
                          width: 6vw;
                        }
                      }
                    }

                    > :nth-child(2) {
                      margin-left: 0.5vw;
                    }
                  }
                }
              }

              .tc_textarea {
                display: flex;

                .chakan {
                  width: 90%;
                  color: #00f0ff;
                }
              }
            }
          }

          .photo_visibility {
            visibility: hidden;
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
      }
    }
  }
}
</style>
