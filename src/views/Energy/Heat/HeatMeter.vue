<template>
  <div class="page">
    <table class="filtertable">
      <tr>
        <td></td>
        <td class="tool">
          <a href="javascript:void(0)" class="toolbutton" @click="onImportClick()" v-if="this.$store.state.userGetUserRole.resList.indexOf('EditWaterEnergyMeter') != -1">导入</a>
        </td>
        <td class="tool">
          <a href="javascript:void(0)" class="toolbutton" @click="onAddClick()" v-if="this.$store.state.userGetUserRole.resList.indexOf('EditWaterEnergyMeter') != -1">添加</a>
        </td>
      </tr>
    </table>
    <el-table :data="pagedData.list" :row-class-name="onRowClassName">
      <!-- <el-table-column prop="name" label="名称" /> -->
      <el-table-column prop="code" label="编码"  show-overflow-tooltip/>
      <!-- <el-table-column prop="subSystemName" label="子系统" /> -->
      <!-- <el-table-column prop="deviceName" label="设备" /> -->
      <!-- <el-table-column prop="signalName" label="信号" /> -->
      <el-table-column prop="position" label="安装位置"  show-overflow-tooltip/>
      <el-table-column prop="areaName" label="计量区域"  show-overflow-tooltip/>
      <el-table-column prop="categoryName" label="分项"  show-overflow-tooltip/>
      <el-table-column label="编辑" v-if="this.$store.state.userGetUserRole.resList.indexOf('EditElectricityEnergyMeter') != -1" width="50">
        <template slot-scope="scope">
          <a href="javascript:void(0)" class="greenbutton" @click="onEditClick(scope.row)">编辑</a>
        </template>
      </el-table-column>
      <el-table-column label="删除" v-if="this.$store.state.userGetUserRole.resList.indexOf('EditElectricityEnergyMeter') != -1" width="50">
        <template slot-scope="scope">
          <a href="javascript:void(0)" class="redbutton" @click="onDeleteClick(scope.row.no)">删除</a>
        </template>
      </el-table-column>
    </el-table>
    <center>
      <el-pagination @current-change="onCurrentChange" :page-size="pageSize" :current-page="pageIndex" :total="pagedData.total" layout="prev, pager, next" />
    </center>
    <div class="dialog_container" v-if="dialog.id">
      <div class="dialog">
        <div class="title">{{dialog.title}}</div>
        <a href="javascript:void(0)" class="close" @click="dialog.id = ''"></a>
        <div class="box" v-if="dialog.id == 'add' || dialog.id == 'edit'">
          <table class="filtertable">
            <tr>
              <td class="title4">名称</td>
              <td><el-input type="text" v-model="model.name" /></td>
              <td class="title4">编码</td>
              <td><el-input type="text" v-model="model.code" /></td>
            </tr>
            <tr>
              <td class="title4">子系统</td>
              <td>
                <el-select v-model="model.subSystemNo" @change="onSubSystemChange">
                  <el-option v-for="item in subSystems" :key="item.no" :label="item.name" :value="item.no"></el-option>
                </el-select>
              </td>
              <td class="title4">设备</td>
              <td>
                <el-select v-model="model.deviceId" @change="onDeviceChange">
                  <el-option v-for="item in devices" :key="item.iid" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="title4">信号</td>
              <td>
                <el-select v-model="model.signalId">
                  <el-option v-for="item in signals" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </td>
              <td class="title4">安装位置</td>
              <td><el-input type="text" v-model="model.position" /></td>
            </tr>
            <tr>
              <td class="title4">计量区域</td>
              <td>
                <el-cascader v-model="areaIds" :options="areas" :props="{ checkStrictly: true }" @change="onAreaChange"></el-cascader>
              </td>
              <td class="title4">能耗分项</td>
              <td>
                <el-select v-model="model.categoryNo">
                  <el-option v-for="item in energyCategories" :key="item.no" :label="item.name" :value="item.no"></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td colspan="4" align="center">
                <a href="javascript:void(0)" class="button" @click="onOkClick()">确定</a>
              </td>
            </tr>
          </table>
        </div>
        <div class="box" v-else-if="dialog.id == 'import'">
          <table class="filtertable">
            <tr>
              <td>
                <el-link href="Template/EnergyMeter.xlsx"  type="primary" target="_blank">下载导入模板</el-link>
              </td>
            </tr>
            <tr>
              <td>
                <el-upload ref="upload" :action="uploader.action" :headers="uploader.headers" accept=".xlsx" :limit="1" with-credentials :on-success="onUploadSuccess">
                  <el-button size="small" type="primary">导入文件</el-button>
                  <div slot="tip" class="el-upload__tip" v-html="uploader.tip"></div>
                </el-upload>
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
      pagedData: {},
      pageSize: 12,
      pageIndex: 1,
      dialog: {
        id: '',
        title: ''
      },
      model: {
          name: '',
          code: '',
          subSystemNo: 0,
          deviceId: '',
          signalId: '',
          position: '',
          areaId: '',
          categoryNo: 0,
          type: 4
      },
      uploader: {
        headers: {},
        action: '',
        tip: ''
      },
      subSystems: [],
      devices: [],
      signals: [],
      areas: [],
      areaIds: [],
      energyCategories: []
    }
  },
  created() {},
  mounted() {
    this.queryData();
  },
  destroyed() {},
  computed: {},
  methods: {
    onImportClick() {
      this.uploader = {
        headers: { token: this.$store.state.token },
        action: this.$api.MMS.EnergyMeter.GetImportUrl({
          type: 4
        }),
        tip: ''
      };
      this.dialog.title = '导入';
      this.dialog.id = 'import';
    },
    onAddClick() {
      this.model = {
        name: '',
        code: '',
        subSystemNo: null,
        deviceId: '',
        signalId: '',
        position: '',
        areaId: '',
        categoryNo: null,
        type: 4
      };
      this.querySubSystem();
      this.queryDevice();
      this.querySignal();
      this.queryArea();
      this.queryEnergyCategory();
      this.dialog.title = '添加';
      this.dialog.id = 'add';
    },
    onEditClick(model) {
      this.model = { ...model };
      this.areaIds = this.$Tools.getTreeIds(this.model.areaId);
      this.querySubSystem();
      this.queryDevice();
      this.querySignal();
      this.queryArea();
      this.queryEnergyCategory();
      this.dialog.title = '编辑';
      this.dialog.id = 'edit';
    },
    onDeleteClick(no) {
        if (confirm('确定删除？')) {
            this.$api.MMS.EnergyMeter.Delete({
                no: no
            }).then(res => {
                this.$Tools.LayerMsgInfo("删除成功");
                this.queryData();
            });
        }
    },
    onAreaChange(e) {
      if (e.length == 0)
        this.model.areaId = '';
      else
        this.model.areaId = e[e.length - 1];
    },
    onOkClick() {
      if (this.dialog.id == 'add' || this.dialog.id == 'edit') {
        if (!this.model.name) return this.$Tools.LayerMsgErr('请输入名称');
        if (!this.model.code) return this.$Tools.LayerMsgErr('请输入编码');
        if (!this.model.subSystemNo) return this.$Tools.LayerMsgErr('请选择子系统');
        if (!this.model.deviceId) return this.$Tools.LayerMsgErr('请选择设备');
        if (!this.model.signalId) return this.$Tools.LayerMsgErr('请选择信号');
        if (!this.model.position) return this.$Tools.LayerMsgErr('请输入安装位置');
        if (!this.model.areaId) return this.$Tools.LayerMsgErr('请选择计量区域');
        if (!this.model.categoryNo) return this.$Tools.LayerMsgErr('请选择能耗分项');

        if (this.dialog.id == 'add') {
          this.$api.MMS.EnergyMeter.Add(this.model).then(res => {
              this.dialog.id = '';
              this.$Tools.LayerMsgInfo("添加成功");
              this.queryData();
          });
        }
        else if (this.dialog.id == 'edit') {
          this.$api.MMS.EnergyMeter.Update(this.model).then(res => {
              this.dialog.id = '';
              this.$Tools.LayerMsgInfo("编辑成功");
              this.queryData();
          });
        }
      }
      else if (this.dialog.id == 'import') {
        this.$refs.upload.submit();
      }
    },
    onSubSystemChange() {
      this.deviceId = '';
      this.queryDevice();
    },
    onDeviceChange() {
      this.signalId = '';
      this.querySignal();
    },
    onCurrentChange(e) {
      this.pageIndex = e
      this.queryData()
    },
    onUploadSuccess(res) {
      this.uploader.tip = res.message.replace(/\n/g, '<br/>');
      this.queryData();
    },
    queryData() {
        this.$api.MMS.EnergyMeter.GetPagedList({
            type: 4,
            pageIndex: this.pageIndex - 1,
            pageSize: this.pageSize
        }).then(res => {
            this.pagedData = res.data;
        });
    },
    querySubSystem() {
      this.$api.MMS.SubSystem.SubSysList().then(res => {
        this.subSystems = res.data;
      });
    },
    queryDevice() {
      this.devices = [];
      if (!this.model.subSystemNo) return;

      this.$api.MMS.Device.GetList({
        systemNo: this.model.subSystemNo
      }).then(res => {
        this.devices = res.data;
      });
    },
    querySignal() {
      this.signals = [];
      if (!this.model.deviceId) return;

      this.$api.MMS.Signal.GetList({
        code: this.model.deviceId
      }).then(res => {
        this.signals = res.data;
      });
    },
    queryArea() {
      this.$api.MMS.Area.GetAllList().then(res => {
        var options = [];
        this.getAreaOption(options, res.data);
        this.areas = options;
      });
    },
    queryEnergyCategory() {
      this.$api.MMS.EnergyCategory.GetList({
        type: 4
      }).then(res => {
        this.energyCategories = res.data;
      });
    },
    getAreaOption(options, data) {
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let option = {
          label: item.model.name,
          value: item.model.id,
          children: []
        };
        options.push(option);
        this.getAreaOption(option.children, item.children);
      }
    },
    onRowClassName({ row, rowIndex }) {
      return rowIndex % 2 == 0 ? 'even-row' : 'odd-row'
    }
  }
}
</script>
