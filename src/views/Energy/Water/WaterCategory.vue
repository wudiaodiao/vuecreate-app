<template>
  <div class="page">
    <table class="filtertable">
      <tr>
        <td></td>
        <td class="tool">
          <a href="javascript:void(0)" class="toolbutton" @click="onAddClick()">添加</a>
        </td>
      </tr>
    </table>
    <el-table :data="data" :row-class-name="onRowClassName">
      <el-table-column prop="name" label="名称" />
      <el-table-column label="编辑">
        <template v-slot="scope">
          <a href="javascript:void(0)" class="greenbutton" @click="onEditClick(scope.row)">编辑</a>
        </template>
      </el-table-column>
      <el-table-column label="删除">
        <template v-slot="scope">
          <a href="javascript:void(0)" class="redbutton" @click="onDeleteClick(scope.row.no)">删除</a>
        </template>
      </el-table-column>
    </el-table>
    <div class="dialog_container" v-if="dialog.show">
      <div class="dialog">
        <div class="title">{{dialog.title}}</div>
        <a href="javascript:void(0)" class="close" @click="dialog.show = false"></a>
        <div class="box">
          <table class="filtertable">
            <tr>
              <td class="title4">名称：</td>
              <td><el-input type="text" v-model="model.name" /></td>
            </tr>
            <tr>
              <td colspan="2" align="center">
                <a href="javascript:void(0)" class="button" @click="onOkClick()">确定</a>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      data: [],
      dialog: {
        isAdd: false,
        show: false,
        title: ''
      },
      model: {
          name: '',
          type: 2
      }
    }
  },
  created() {},
  mounted() {
    this.queryData();
  },
  unmounted() {},
  computed: {},
  methods: {
    onAddClick() {
        this.model.name = '';
        this.dialog.isAdd = true;
        this.dialog.show = true;
        this.dialog.title = '添加';
    },
    onEditClick(model) {
        this.model = { ...model };
        this.dialog.isAdd = false;
        this.dialog.show = true;
        this.dialog.title = '编辑';
    },
    onDeleteClick(no) {
        if (confirm('确定删除？')) {
            this.$api.MMS.EnergyCategory.Delete({
                no: no
            }).then(res => {
                this.$Tools.LayerMsgInfo("删除成功");
                this.queryData();
            });
        }
    },
    onOkClick() {
        if (!this.model.name) {
            this.$Tools.LayerMsgErr('请输入名称')
            return;
        }

        if (this.dialog.isAdd) {
            this.$api.MMS.EnergyCategory.Add(this.model).then(res => {
                this.dialog.show = false;
                this.$Tools.LayerMsgInfo("添加成功");
                this.queryData();
            });
        } else {
            this.$api.MMS.EnergyCategory.Update(this.model).then(res => {
                this.dialog.show = false;
                this.$Tools.LayerMsgInfo("编辑成功");
                this.queryData();
            });
        }
    },
    queryData() {
        this.$api.MMS.EnergyCategory.GetList({
            type: 2
        }).then(res => {
            this.data = res.data;
        });
    },
    onRowClassName({ row, rowIndex }) {
      return rowIndex % 2 == 0 ? 'even-row' : 'odd-row'
    }
  }
}
</script>
<style scoped lang="scss">
.box table {
  margin-top:20%;
  width: 100%;
  height: 20%;

  .title4 {
    width: 40%;
    text-align: right;
  }
  .button{
    background: #30b8ff;
  }
}
</style>
