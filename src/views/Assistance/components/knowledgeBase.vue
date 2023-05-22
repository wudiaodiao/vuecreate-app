<!--
 * @Author:李寒松
 * @Date: 2020-11-04 11:40:53
 * @LastEditTime: 2021-11-17 16:27:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\views\Assistance\components\knowledgeBase.vue
-->
<!--知识库类别-->
<template>
  <div>
    <div class="knowledgeBase">
      <div class="knowledgeBase_top">
        <ul>
          <li class="gen">
            <span>添加根节点</span>
          </li>
          <li>
            <span>添加子节点</span>
          </li>
          <li>
            <span>编辑节点</span>
          </li>
          <li class="del_red">
            <span class="del_red">删除节点</span>
          </li>
        </ul>
      </div>
      <div class="knowledgeBase_center">
        <div class="knowledgeBase_center_list">
          <ul>
            <li
              v-for=" item in categoryData"
              :key="item.model.id"
            >
              <div class="list_top">
                <i
                  class="el-icon-plus"
                  v-if="clickHeadShow"
                  @click="clickHead()"
                ></i>
                <i
                  class="el-icon-minus"
                  v-else
                  @click="clickHead()"
                ></i>
                <span>{{item.model.name}}</span>
              </div>
              <div class="list_center">
                <ul v-show="clickHeadShow">
                  <li
                    v-for=" children in item.children"
                    :key="children.model.id"
                  >{{children.model.name}}</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      clickHeadShow: false,
      categoryData: [], //知识库列表
    }
  },
  mounted() {
    this.KnowledgeCategoryGetList() //知识库列表
  },
  methods: {
    async KnowledgeCategoryGetList() {
      //获取知识库列表
      const res = await this.$api.MMS.KnowledgeCategory.GetList({})
      if (res.ok) {
        this.categoryData = res.data
      }
    },

    clickHead() {
      //控制列表收缩下拉
      this.clickHeadShow = !this.clickHeadShow
    },
  },
}
</script>

<style >
/* @import url('./styles/knowledgeBase.scss'); */
</style>
<style lang="scss" scoped>
.knowledgeBase {
  margin: 24px;

  .knowledgeBase_top {
    ul {
      display: flex;
      justify-content: start;
      align-items: center;
      li {
        background: #47d235;
        border-radius: 2px;
        text-align: center;
        margin-right: 20px;
        cursor: pointer;
        min-width: 76px;
        height: 26px;
        line-height: 26px;
        span {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: #ffffff;
        }
      }
      .del_red {
        background: #ff4545;
      }
      .gen {
        min-width: 100px;
        height: 30px;
        line-height: 30px;
      }
    }
  }
  .knowledgeBase_center {
    margin-top: 20px;
    width: 100%;
    .knowledgeBase_center_list {
      .list_top {
        margin-top: 3px;
        padding-left: 20px;
        width: 100%;
        height: 36px;
        line-height: 36px;
        background: linear-gradient(90deg, #0068b7, rgba(0, 104, 183, 0));
        border-radius: 2px;
        cursor: pointer;

        > span {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: #ffffff;
          margin-left: 5px;
        }
      }
      .list_center {
        > ul {
          > li {
            margin: 5px 0;
            cursor: pointer;
            padding-left: 40px;
          }
          .active {
            background: rgba(0, 104, 183, 0.3);
          }
        }
      }
    }
  }
}
</style>
