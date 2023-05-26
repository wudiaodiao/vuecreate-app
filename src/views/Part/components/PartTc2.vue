<!--
 * @Author: your name
 * @Date: 2020-11-26 18:44:51
 * @LastEditTime: 2021-11-23 15:17:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ibms\src\views\Part\components\Part.vue
-->
<template>
  <div class="Part">
    <div class="Partlist_main">
      <div class="Partlist_Serch">
        <div class="Equipment_top">
          <ul>
            <li>
              <span>名称：</span>
              <input
                type="text"
                class="Equipment_input"
                v-model="inputPart"
              />
            </li>
            <!-- <li>
              <span>类别：</span>
              <el-cascader
                :show-all-levels="false"
                v-model="inputPartType"
                :options="PartTypeGetListData"
                :props="{ expandTrigger: 'hover', value : 'model',checkStrictly:true }"
                @change="PartTypeChane(inputPartType)"
                :placeholder="inputPartType"
                clearable
              >
                <template slot-scope="{ node, data }">
                  <span>{{ data.model.name }}</span>
                  <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                </template>
              </el-cascader>
            </li> -->

            <li>
              <div class="Equipment_chaxun">
                <button @click="PartGetList()">查询</button>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="Partlist_list">
        <el-table
          :data="PartGetListData.list"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            prop="name"
            label="名称"
          >
            <template v-slot="scope">
              <span>
                <a
                  href="#"
                  :title="scope.row.name"
                >{{scope.row.name}}</a>
              </span>
            </template>
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
            prop="specification"
            label="规格型号"
          ></el-table-column>
          <!-- <el-table-column
            prop="model"
            label="型号"
          >
            <template slot-scope="scope">
              <span>
                <a
                  href="#"
                  :title="scope.row.model"
                >{{scope.row.model}}</a>
              </span>
            </template>
          </el-table-column> -->
          <el-table-column
            prop="unit"
            label="单位"
          ></el-table-column>
          <el-table-column
            prop="count"
            label="库存数量"
          ></el-table-column>

          <el-table-column
            label="选择"
            width="50px"
          >
            <template v-slot="scope">
              <span
                class="editing_green"
                @click="addTc(partType,scope.row )"
              >选择</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="Partlist_foot">
        <div class="fenye">
          <el-pagination
            hide-on-single-page
            @current-change="Current"
            :page-size="pageSize"
            :pager-count="11"
            layout="prev, pager, next"
            :total="PartGetListData.total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    partType: '',
  },
  data() {
    return {
      inputPart: '',
      inputPartType: '所有',
      PartTypeType: '', //设备类型id
      pageSize: 10, //一页多少条
      pageIndex: 1, //实时页码
      PartTypeGetListData: [],
      PartGetListData: [],
    }
  },
  mounted() {
    this.PartTypeGetList() //物资类别
    this.PartGetList()
  },
  methods: {
    async addTc(type, item) {
      //弹窗

      this.$emit('addTc', type, item)
    },
    Current(e) {
      //分页响应事件
      this.pageIndex = e //赋值更新方法
      this.PartGetList()
    },
    async PartGetList() {
      //分页方法
      const res = await this.$api.MMS.PartZW.GetList({
        pageSize: this.pageSize, //一页多少条
        pageIndex: this.pageIndex, //实时页
        name: this.inputPart,
        typeId: this.PartTypeType,
      })
      if (res.ok) {
        this.PartGetListData = res.data
      }
    },
    PartTypeChane(name) {
      //分项拼接
      let res = ''
      for (var i = 0; i < name.length; i++) {
        res = name[i].name
        this.PartTypeType = name[i].id
      }
      if (res == this.inputPartType) {
        return
      }
      this.inputPartType = res
    },

    async PartTypeGetList() {
      const res = await this.$api.MMS.PartType.GetList({})
      if (res.ok) {
        this.PartTypeGetListData = this.getTreeData(res.data)
        this.PartTypeGetListData.unshift({
          children: undefined,
          model: {
            id: '',
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

<style lang="scss" >
//出库
.PartTc {
  height: 54vh;
  overflow: auto;
  .Partlist_main {
    margin: 10px 30px;
    // width: 100%;
    // height: 100%;

    .Partlist_Serch {
      // width: 100%;
      // height: 100%;

      .Equipment_top {
        opacity: 1;

        ul {
          display: flex;

          li {
            display: flex;
            align-items: center;
            margin-right: 20px;

            .Equipment_input {
              width: 150px;
              height: 3vh;
              background: rgba(0, 0, 0, 0);
              border: 1px solid rgba(255, 255, 255, 1);
              padding-left: 5px;
              color: #fff;
            }

            .withd_ {
              width: 120px;
            }

            .Equipment_chaxun {
              button {
                width: 100px;
                height: 3vh;
                background: #47d235;
                border-radius: 2px;
                font-size: 14px;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: #ffffff;
                cursor: pointer;
              }
            }
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

    .Partlist_foot {
      .fenye {
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
