<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-03-09 15:55:00
 * @LastEditors: Please set LastEditors
 * @Description:设备档案
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->
<template>
  <div class="Equipment public_body">
    <div class="Equipment_cneter">
      <div
        v-if="Shrink"
        :class="[
          'public_page',
          'EquipmentDanan',
          Shrink == false ? 'EquipmentDanan_hide' : 'EquipmentDanan',
          $store.state.dtab ? 'index_off' : 'index_no'
        ]"
      >
        <div class="content">
          <div class="Equipment_top">
            <ul>
              <li>
                <span>名称：</span>
                <input
                  type="text"
                  class="Equipment_input"
                  v-model="inputEquipment"
                />
              </li>
              <li>
                <span>设备类别：</span>
                <el-cascader
                  :show-all-levels="false"
                  v-model="inputEquipmentType"
                  :options="EquipmentTypeData"
                  :props="{
                    expandTrigger: 'hover',
                    value: 'model',
                    checkStrictly: true
                  }"
                  @change="EquipmentTypeChane(inputEquipmentType)"
                  :placeholder="inputEquipmentType"
                  clearable
                >
                  <template slot-scope="{ node, data }">
                    <span>{{ data.model.name }}</span>
                    <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                  </template>
                </el-cascader>
              </li>
              <li>
                <span>地点：</span>
                <el-cascader
                
                  :show-all-levels="false"
                  v-model="floor"
                  :options="floorlist"
                  :props="{
                    expandTrigger: 'hover',
                    value: 'model',
                    checkStrictly: true
                  }"
                  @change="floorlistChane(floor)"
                  :placeholder="floor"
                  clearable
                >
                  <template slot-scope="{ node, data }">
                    <span v-if="data.children.length==0">({{ data.model.code}})</span>
                    <span disabled>{{ data.model.name }}</span>
                    <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                  </template>
                </el-cascader>
              </li>
              <li>
                <div class="Equipment_chaxun">
                  <button @click="
                      EquipmentData = {
                        list: [],
                        total: 0
                      }
                      EquipmentGetList(1)
                    ">
                    查询
                  </button>
                  <button @click="
                    pageSize=14, //一页多少条
                    pageIndex= 1, //实时页
                    inputEquipment='',
                    inputEquipmentType='',
                    EquipmentIdType='',
                    floor='',
                    floorId='',
                     EquipmentGetList(1)
 " style="margin-left: 15px;">
                      重置
                    </button>
                </div>
              </li>
            </ul>
            <div class="Equipment_top_top">
              <ul v-if="
                  $Tools.accessControl(
                    this.$store.state.userGetUserRole.resList,
                    'EditEquipment'
                  )
                ">
                <li>
                  <button @click="addTc('add', '')">添加</button>
                </li>
                <li>
                  <button @click="importDaor(true)">导入</button>
                </li>
                <li>
                  <button @click="EquipmentExportList()">导出</button>
                </li>
              </ul>
            </div>
          </div>
          <div class="Equipment_center">
            <el-table
              :data="Shrink == false ? realTimeOne : EquipmentData.list"
              style="width: 100%"
              :row-class-name="tableRowClassName"
            >
              <el-table-column
                type="index"
                :index="(pageIndex-1)*pageSize+1"
                label="序号"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="设备名称"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="code"
                label="设备编号"
                show-overflow-tooltip
              ></el-table-column>
              <!-- <el-table-column prop="userfulLife" label="使用年限" show-overflow-tooltip></el-table-column> -->
              <el-table-column
                prop="typeName"
                label="设备类型"
                show-overflow-tooltip
              >
              </el-table-column>
              <!-- <el-table-column prop="productionDate" label="出厂日期" show-overflow-tooltip>  </el-table-column> -->
              <el-table-column
                prop="areaName"
                label="地点"
                show-overflow-tooltip
              ></el-table-column>
              <!-- <el-table-column prop="factoryNumber" label="出厂编号" show-overflow-tooltip> </el-table-column> -->
              <el-table-column
                prop="purchaseDate"
                label="使用日期"
                width="130px"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span>
                    {{ scope.row.purchaseDate | datefmt('YYYY-MM-DD') }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="countingUnit"
                label="计数单位"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="nextYearlyDate"
                label="下一次年检日期"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span :class="color1(scope.row.nextYearlyDate,scope.row.threshold)">
                    {{ scope.row.nextYearlyDate | datefmt('YYYY-MM-DD') }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="threshold"
                label="提前预警周期(天)"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="state"
                label="状态"
                show-overflow-tooltip
              >
                <!-- :style="color1(scope.row.nextYearlyDate)" -->
                <template slot-scope="scope">
                  <span :class="color2(scope.row.state)">
                    {{ $Convert.Equipment.getEquipmentState(scope.row.state) }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="查看"
                width="50px"
              >
                <template slot-scope="scope">
                  <span
                    class="chakan"
                    @click="addTc('chakan', scope.row)"
                  >查看</span>
                </template>
              </el-table-column>
              <!-- <el-table-column
                label="关联"
                width="80px"
                v-if="
                  $Tools.accessControl(
                    this.$store.state.userGetUserRole.resList,
                    'EditEquipment'
                  )
                "
              >
                <template slot-scope="scope">
                  <span
                    class="guanlian"
                    @click="addTc('signal', scope.row)"
                  >关联</span>
                </template>
              </el-table-column> -->
              <el-table-column
                label="绑定"
                width="50px"
                v-if="
                  $Tools.accessControl(
                    this.$store.state.userGetUserRole.resList,
                    'EditEquipment'
                  ) && $store.state.modelMode === '3D'
                "
              >
                <template slot-scope="scope">
                  <span
                    class="guanlian"
                    @click="addTc('bangding', scope.row)"
                  >绑定</span>
                </template>
              </el-table-column>
              <el-table-column
                label="编辑"
                width="50px"
                v-if="
                  $Tools.accessControl(
                    this.$store.state.userGetUserRole.resList,
                    'EditEquipment'
                  )
                "
              >
                <template slot-scope="scope">
                  <span
                    class="editing_green"
                    @click="addTc('editor', scope.row)"
                  >编辑</span>
                </template>
              </el-table-column>
              <el-table-column
                label="删除"
                width="50px"
                v-if="
                  $Tools.accessControl(
                    this.$store.state.userGetUserRole.resList,
                    'EditEquipment'
                  )
                "
              >
                <template slot-scope="scope">
                  <el-popconfirm
                    title="确定删除吗"
                    @onConfirm="EquipmentDelete(scope.row.no)"
                    @confirm="EquipmentDelete(scope.row.no)"
                  >
                    <span
                      class="red"
                      slot="reference"
                    >删除</span>
                  </el-popconfirm>
                </template>
              </el-table-column>
              <!-- <el-table-column
                label="定位"
                width="50px"
                v-if="
                  $Tools.accessControl(
                    this.$store.state.userGetUserRole.resList,
                    'EditEquipment'
                  )
                "
              >
                <template slot-scope="scope">
                  <span
                    class="editing_green"
                    v-show="scope.row.monitorNo"
                    @click="Shrink ? addTc('goToPoint', scope.row) : Back()"
                  >{{ Shrink ? '定位' : '返回' }}</span>
                </template>
              </el-table-column> -->
            </el-table>
          </div>
          <div class="Equipment_footer">
            <div class="fenye">
              <el-pagination
                hide-on-single-page
                @current-change="Current"
                :page-size="pageSize"
                :pager-count="11"
                layout="prev, pager, next"
                :total="EquipmentData.total"
                :current-page="pageIndex"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
      <div
        class="EquipmentDanan_box"
        v-else
      >
        <div class="content">
          <div class="Equipment_center">
            <el-table
              :data="Shrink == false ? realTimeOne : EquipmentData.list"
              style="width: 100%"
              :row-class-name="tableRowClassName"
              :show-header="false"
            >
              <el-table-column
                prop="name"
                label="设备名称"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="code"
                label="设备编号"
                show-overflow-tooltip
              ></el-table-column>
              <!-- <el-table-column prop="userfulLife" label="使用年限" show-overflow-tooltip></el-table-column> -->
              <el-table-column
                prop="model"
                label="设备型号"
                show-overflow-tooltip
              >
              </el-table-column>
              <!-- <el-table-column prop="productionDate" label="出厂日期" show-overflow-tooltip>  </el-table-column> -->
              <el-table-column
                prop="originalValue"
                label="设备原值"
                show-overflow-tooltip
              ></el-table-column>
              <!-- <el-table-column prop="factoryNumber" label="出厂编号" show-overflow-tooltip> </el-table-column> -->
              <el-table-column
                prop="startDate"
                label="启用日期"
                show-overflow-tooltip
              >
               <template slot-scope="scope">
                  <span>
                    {{ scope.row.startDate | datefmt('YYYY-MM-DD') }}
                  </span>
                </template>
            </el-table-column>
              <el-table-column
                prop="depreciationRate"
                label="设备折旧率"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="manufactor"
                label="制造单位、厂商"
                width="140px"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="settingPlace"
                label="设置场所"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="skillParams"
                label="设备主要技术参数"
                width="140px"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="features"
                label="设备主要特征"
                width="140px"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="查看"
                width="50px"
              >
                <template slot-scope="scope">
                  <span
                    class="chakan"
                    @click="addTc('chakan', scope.row)"
                  >查看</span>
                </template>
              </el-table-column>
              <el-table-column
                label="关联"
                width="80px"
              >
                <template slot-scope="scope">
                  <span
                    class="guanlian"
                    @click="addTc('signal', scope.row)"
                  >关联</span>
                </template>
              </el-table-column>
              <el-table-column
                label="编辑"
                width="50px"
              >
                <template slot-scope="scope">
                  <span
                    class="editing_green"
                    @click="addTc('editor', scope.row)"
                  >编辑</span>
                </template>
              </el-table-column>
              <el-table-column
                label="删除"
                width="50px"
              >
                <template slot-scope="scope">
                  <el-popconfirm
                    title="确定删除吗"
                    @onConfirm="EquipmentDelete(scope.row.no)"
                    @confirm="EquipmentDelete(scope.row.no)"
                  >
                    <span
                      class="red"
                      slot="reference"
                    >删除</span>
                  </el-popconfirm>
                </template>
              </el-table-column>
              <el-table-column
                label="定位"
                width="50px"
              >
                <template slot-scope="scope">
                  <span
                    class="editing_green"
                    @click.stop="
                      Shrink ? addTc('goToPoint', scope.row) : Back()
                    "
                  >{{ Shrink ? '定位' : '返回' }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div
        class="Equipment_tanchuang_ying"
        v-if="EquipmentTcShow"
      >
        <div class="tanchuang">
          <div :class="[
              'tanchuang_bg',
              EquipmentTcType == 'chakanLog' ? 'gongd_tanchuang_bg' : ''
            ]">
            <div class="tanchuang_top">
              <img
                :src="require('~@/assets/image/index/partial_left.png')"
                alt
              />
              <span class="top_title margin_tc">
                {{
                  EquipmentTcType == 'add'
                    ? '添加设备'
                    : EquipmentTcType == 'selectFilefile' ||
                      EquipmentTcType == 'edselectFilefile'
                    ? '选择文件'
                    : EquipmentTcType == 'editor'
                    ? '编辑设备'
                    : EquipmentTcType == 'signal'
                    ? '关联'
                    : EquipmentTcType == 'bangding'
                    ? '绑定'
                    : EquipmentTcType == 'editorsignal'
                    ? '编辑关联信号'
                    : EquipmentTcType == 'chakan'
                    ? '查看设备'
                    : EquipmentTcType == 'chakanLog123'
                    ? '查看主设备'
                    : EquipmentTcType == 'chakanLog'
                    ? '查看工单'
                    : EquipmentTcType == 'bdUser'
                    ? '查看报单人'
                    : EquipmentTcType == 'edselectFileimg' ||
                      EquipmentTcType == 'addedselectFileimg'
                    ? '选择图片'
                    : EquipmentTcType == 'clUser'
                    ? '查看处理人'
                    : ''
                }}
              </span>

              <img
                :src="require('@/assets/image/index/partial_right.png')"
                alt
              />
            </div>
            <div class="tanchuang_center">
              <div class="tanchuang_center_cen">
                <div
                  class="tanchuang_center_cen_top_w"
                  v-if="EquipmentTcType == 'add' || EquipmentTcType == 'editor'"
                >
                  <ul class="tanchuang_center_cen_top formValidator">
                    <el-form
                      :model="formValidator"
                      ref="formValidator"
                      label-width="100px"
                      class="demo-dynamic"
                      :rules="rules"
                    >
                      <li>
                        <el-form-item prop="EquipmentName">
                          <span class="span">设备名称：</span>
                          <el-input
                            type="text"
                            v-model="formValidator.EquipmentName"
                          />
                          <i>*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item prop="parentNo">
                          <span class="span">主设备</span>
                          <el-select
                            v-model="formValidator.parentNo"
                            filterable
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="item in parentList"
                              :key="item.no"
                              :label="item.name"
                              :value="item.no"
                            >
                            </el-option>
                          </el-select>
                          <i>*</i>
                        </el-form-item>
                      </li>

                      <li>
                        <el-form-item prop="EquipmentCode">
                          <span class="span">设备编号：</span>
                          <el-input
                            type="text"
                            v-model="formValidator.EquipmentCode"
                          />
                          <i>*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item prop="TcinputEquipmentType">
                          <span class="span">类别：</span>
                          <el-cascader
                            :show-all-levels="false"
                            v-model="formValidator.TcinputEquipmentType"
                            :options="tcEquipmentTypeData"
                            :props="{
                              expandTrigger: 'hover',
                              value: 'model',
                              checkStrictly: true
                            }"
                            @change="
                              TcEquipmentTypeChane(
                                formValidator.TcinputEquipmentType
                              )
                            "
                            :placeholder="
                              formValidator.TcinputEquipmentType || '请选择'
                            "
                            clearable
                          >
                            <template slot-scope="{ node, data }">
                              <span>{{ data.model.name }}</span>
                              <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                            </template>
                          </el-cascader>
                          <i>*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item prop="Tcloufloor">
                          <span class="span">地点：</span>
                          <el-cascader
                            :show-all-levels="false"
                            v-model="formValidator.Tcloufloor"
                            :options="tcfloorlist"
                            :props="{
                              expandTrigger: 'hover',
                              value: 'model',
                              checkStrictly: true
                            }"
                            @change="tcfloorlistChane(formValidator.Tcloufloor)"
                            :placeholder="formValidator.Tcloufloor || '请选择'"
                          >
                            <template slot-scope="{ node, data }">
                               <span v-if="data.children.length==0">({{ data.model.code}})</span>
                              <span disabled>{{ data.model.name }}</span>
                              <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                            </template>
                          </el-cascader>
                          <i>*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item prop="stateName">
                          <span class="span">状态：</span>
                          <el-select
                            class="didian"
                            v-model="formValidator.stateName"
                            @change="stateNameChane(formValidator.stateName)"
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="itemstate in stateData"
                              :key="itemstate.no"
                              :label="itemstate.name"
                              :value="itemstate.name"
                            ></el-option>
                          </el-select>
                          <i>*</i>
                        </el-form-item>
                      </li>

                      <li>
                        <el-form-item>
                          <span class="span">安装位置：</span>
                          <input
                            type="text"
                            v-model="formValidator.installPosition"
                          />
                          <i style="visibility: hidden;">*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item>
                          <span class="span">使用年限：</span>
                          <input
                            type="text"
                            v-model="formValidator.usefulLife"
                          />
                          <i style="visibility: hidden;">*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item>
                          <span class="span">质保期：</span>
                          <input
                            type="text"
                            v-model="formValidator.warranty"
                          />
                          <i style="visibility: hidden;">*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item>
                          <span class="span">设备型号：</span>
                          <input
                            type="text"
                            v-model="formValidator.model"
                          />
                          <i style="visibility: hidden;">*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item>
                          <span class="span">使用日期：</span>
                          <el-date-picker
                            v-model="formValidator.purchaseDate"
                             value-format='yyyy-MM-dd'
                            format="yyyy-MM-dd "
                            type="date"
                            prefix-icon="icon_none"
                            placeholder="选择日期"
                          ></el-date-picker>
                          <i style="visibility: hidden;">*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item>
                          <span class="span">出厂日期：</span>
                          <el-date-picker
                            v-model="formValidator.startDate"
                             value-format='yyyy-MM-dd'
                            format="yyyy-MM-dd "
                            type="date"
                            prefix-icon="icon_none"
                            placeholder="选择日期"
                          ></el-date-picker>
                          <i style="visibility: hidden;">*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item>
                          <span class="span">安装日期：</span>
                          <el-date-picker
                            v-model="formValidator.installDate"
                             value-format='yyyy-MM-dd'
                            format="yyyy-MM-dd "
                            type="date"
                            prefix-icon="icon_none"
                            placeholder="选择日期"
                          ></el-date-picker>
                          <i style="visibility: hidden;">*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item>
                          <span class="span">下一个年检日期：</span>
                          <el-date-picker
                            v-model="formValidator.NextYearlyDate"
                            type="date"
                            value-format='yyyy-MM-dd'
                            format="yyyy-MM-dd "
                            prefix-icon="icon_none"
                            placeholder="选择日期"
                          ></el-date-picker>
                          <i style="visibility: hidden;">*</i>
                        </el-form-item>
                      </li>

                      <li>
                        <el-form-item>
                          <span class="span">预警周期(天)：</span>
                          <input
                            type="text"
                            v-model="formValidator.threshold"
                          />
                          <i style="visibility: hidden;">*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item>
                          <span class="span">品牌：</span>
                          <input
                            type="text"
                            v-model="formValidator.brand"
                          />
                          <i style="visibility: hidden;">*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item>
                          <span class="span">规格：</span>
                          <input
                            type="text"
                            v-model="formValidator.specifications"
                          />
                          <i style="visibility: hidden;">*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item>
                          <span class="span">计数单位：</span>
                          <input
                            type="text"
                            v-model="formValidator.countingUnit"
                          />
                          <i style="visibility: hidden;">*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item>
                          <span class="span">制造单位、厂商：</span>
                          <input
                            type="text"
                            v-model="formValidator.manufactor"
                          />
                          <i style="visibility: hidden;">*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <span class="span">说明书：</span>
                        <span
                          @click="fileUp()"
                          class="selectFile_sub"
                        >
                          {{
                            selectFileOriginalFileName != ''
                              ? selectFileOriginalFileName
                              : ''
                          }}
                        </span>
                        <a
                          href="javascript:;"
                          class="smallbluebutton one_a"
                          v-show="selectFileOriginalFileName != ''"
                          @click="
                            selectFileOriginalFileName = ''
                            selectFileDirectoryNo = ''
                          "
                        >X</a>
                        <a
                          href="javascript:;"
                          @click="
                            previous(
                              EquipmentTcType == 'add'
                                ? 'selectFilefile'
                                : 'edselectFilefile'
                            )
                          "
                          class="smallbluebutton"
                        >...</a>
                      </li>
                      <li class="shuxing_li">
                        <div class="shuxing_top">
                          <span class="span">扩展属性：</span>
                          <span
                            class="shuxing_sub"
                            @click="addExpendObject()"
                          >添加+</span>
                        </div>
                        <div class="shuxing_center">
                          <ul v-if="ExpendObjectData.length > 0">
                            <li
                              v-for="ExpendObjecItem in ExpendObjectData"
                              :key="ExpendObjecItem.equipmentNo"
                            >
                              <input
                                class="shuxing_center_key"
                                type="text"
                                v-model="ExpendObjecItem.propertyKey"
                              />
                              <span class="shuxing_center_dian">:</span>
                              <input
                                class="shuxing_center_value"
                                type="text"
                                v-model="ExpendObjecItem.propertyValue"
                              />
                              <span
                                @click="deleteNode(i)"
                                class="del"
                              >删除</span>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </el-form>
                  </ul>
                  <div class="tanchuang_center_cen_tow">
                    <div class="photo">
                      <ul>
                        <li>
                          <div class="photo_img">
                            <img
                              :src="photoIdImg"
                              alt="头像"
                              v-if="photoIdImg != ''"
                            />
                            <i v-else>无图片</i>
                          </div>
                          <div :class="['photo_bottom']">
                            <el-upload
                              class="upload-demo"
                              ref="upload"
                              action
                              :file-list="fileList"
                              :auto-upload="true"
                              :http-request="handleUploadForm"
                              :headers="headers"
                              :show-file-list="false"
                            >
                              <span @submit="submitUpload">上传</span>
                            </el-upload>
                            <span @click="
                                previous(
                                  EquipmentTcType == 'editor'
                                    ? 'edselectFileimg'
                                    : 'addedselectFileimg'
                                )
                              ">选择</span>
                            <span @click="empty()">清空</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  v-else-if="EquipmentTcType == 'signal'"
                  class="signal"
                >
                  <div class="add_dianh_list_top">
                    <ul>
                      <li
                        :class="[related == releve.name ? 'Bborder' : '']"
                        v-for="releve in relevance"
                        :key="releve.id"
                      >
                        <span @click="relatedClick(releve)">{{
                          releve.name
                        }}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="add_dianh_list_center">
                    <ul
                      v-if="related == '关联信号'"
                      class="PartInDb_tccenter_top formValidator"
                    >
                      <div class="div_list">
                        <div class="div_top">
                          <div class="div_top_button">
                            <button @click="signalTc('addSignal', '')">
                              添加
                            </button>
                          </div>
                        </div>
                        <div class="div_table">
                          <el-table
                            :data="signalList"
                            style="width: 100%"
                            :row-class-name="tableRowClassName"
                          >
                            <el-table-column
                              prop="subSystemName"
                              label="子系统"
                              width="100px"
                              show-overflow-tooltip
                            >
                            </el-table-column>
                            <el-table-column
                              prop="equipmentName"
                              label="设备"
                              width="100px"
                              show-overflow-tooltip
                            ></el-table-column>
                            <el-table-column
                              prop="signalName"
                              label="信号"
                              show-overflow-tooltip
                            >
                            </el-table-column>
                            <el-table-column
                              prop="workSubTypeName"
                              label="工单子类"
                              width="140px"
                            >
                            </el-table-column>
                            <el-table-column
                              label="编辑"
                              width="50px"
                            >
                              <template slot-scope="scope">
                                <span
                                  class="editing_green"
                                  @click="addTc('editorsignal', scope.row)"
                                >编辑</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                              label="删除"
                              width="50px"
                            >
                              <template slot-scope="scope">
                                <el-popconfirm
                                  title="确定删除吗"
                                  @onConfirm="EquipmentDelSignal(scope.row.no)"
                                  @confirm="EquipmentDelSignal(scope.row.no)"
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
                      </div>
                    </ul>
                    <ul
                      v-if="related == '关联摄像头'"
                      class="PartInDb_tccenter_top formValidator"
                    >
                      <div class="camera_related">
                        <div class="camera_title">
                          当前关联摄像头： {{ selectCameraName }}
                          <i
                            v-show="selectCameraName"
                            @click="deleteRelated(1)"
                            class="el-tag__close el-icon-close delete"
                          ></i>
                        </div>
                        <div class="tree_center">
                          <el-tree
                            :data="cameraList"
                            :props="defaultProps"
                            @node-click="CameraActive"
                          >
                            <template
                              class="custom-tree-node"
                              slot-scope="{ node, data }"
                            >
                              <span :class="[
                                  cameraActiveId == data.model.no ? 'aqua' : ''
                                ]">{{ data.model.name }}</span>
                            </template>
                          </el-tree>
                        </div>
                        <div class="camera_bottom">
                          <button
                            @click="sureCamera"
                            v-preventReClick="2000"
                          >
                            确认
                          </button>
                        </div>
                      </div>
                    </ul>
                    <ul
                      v-if="related == '关联运行监控'"
                      class="PartInDb_tccenter_top formValidator"
                    >
                      <div class="camera_related">
                        <div class="camera_title">
                          当前关联运行监控：{{ selectMonitorName }}
                          <i
                            v-show="selectMonitorName"
                            @click="deleteRelated(0)"
                            class="el-tag__close el-icon-close delete"
                          ></i>
                        </div>
                        <div class="tree_center">
                          <el-tree
                            :data="monitorList"
                            :props="defaultProps"
                            @node-click="MonitorActive"
                          >
                            <template
                              class="custom-tree-node"
                              slot-scope="{ node, data }"
                            >
                              <span :class="[
                                  monitorActiveId == data.no ? 'aqua' : ''
                                ]">{{ data.label }}</span>
                            </template>
                          </el-tree>
                        </div>
                        <div class="camera_bottom">
                          <button
                            @click="sureMonitor"
                            v-preventReClick="2000"
                          >
                            确认
                          </button>
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
                <div
                  v-else-if="EquipmentTcType == 'editorsignal'"
                  class="editorsignal"
                >
                  <ul class="editorsignal_ul ">
                    <li>
                      <span class="bianji">子系统：</span>
                      <span>{{ editorsignalItem.subSystemName }}</span>
                    </li>
                    <li>
                      <span class="bianji">设备：</span>
                      <span>{{ editorsignalItem.equipmentName }}</span>
                    </li>
                    <li>
                      <span class="bianji">信号：</span>
                      <span>{{ editorsignalItem.signalName }}</span>
                    </li>
                    <li class="onePartInputName">
                      <span class="span_width">工单类别：</span>
                      <el-select
                        v-model="subTypeNo"
                        placeholder="请选择"
                      >
                        <el-option-group
                          v-for="group in subTypeData"
                          :key="group.label"
                          :label="group.label"
                        >
                          <el-option
                            v-for="item in group.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-option-group>
                      </el-select>
                    </li>
                  </ul>
                </div>
                <div
                  v-else-if="EquipmentTcType == 'chakan'||EquipmentTcType == 'chakanLog123'"
                  class="chakan"
                >
                  <EquipmentGetModelList
                    v-if="EquipmentTcType == 'chakan'||EquipmentTcType == 'chakanLog123'"
                    :EquipmentGetModelNo="EquipmentSignalListNo"
                    :preNo="currentNO1"
                    v-on:addTc="addTc"
                  ></EquipmentGetModelList>
                </div>
                <div
                  v-else-if="EquipmentTcType == 'chakanLog'"
                  class="chakanLog"
                >
                  <chakanLog
                    :no="orderNo"
                    v-on:addTc="addTc"
                  ></chakanLog>
                </div>
                <div
                  v-else-if="
                    EquipmentTcType == 'bdUser' || EquipmentTcType == 'clUser'
                  "
                  class="bdUser"
                >
                  <userGetModel :applyUserNo="bdUserNo"></userGetModel>
                </div>
                <div
                  v-else-if="
                    EquipmentTcType == 'edselectFileimg' ||
                      EquipmentTcType == 'addedselectFileimg' ||
                      EquipmentTcType == 'edselectFilefile' ||
                      EquipmentTcType == 'selectFilefile'
                  "
                  class="edselectFile"
                >
                  <selectImage
                    v-on:selectFile="selectFile"
                    v-on:previousUp="previousUp"
                    :partType="EquipmentTcType"
                  ></selectImage>
                </div>
                <div
                  v-else-if="EquipmentTcType == 'bangding'"
                  class="tanchuang_center_cen_top_w"
                >
                  <ul class="tanchuang_center_cen_top formValidator">
                    <el-form
                      size="small"
                      :model="lightForm"
                      label-width="100px"
                      class="demo-dynamic"
                    >
                      <li>
                        <el-form-item>
                          <span>id：</span>
                          <el-input
                            placeholder="请输入id"
                            v-model="lightForm.elementId"
                          >
                          </el-input>
                        </el-form-item>
                      </li>
                    </el-form>
                  </ul>
                </div>
                <div
                  class="tanchuang_center_cen_bottom"
                  v-show="
                    EquipmentTcType != 'signal' &&
                      EquipmentTcType != 'chakan' &&
                      EquipmentTcType != 'chakanLog' &&
                       EquipmentTcType != 'chakanLog123' &&
                      EquipmentTcType != 'bdUser' &&
                      EquipmentTcType != 'clUser' &&
                      EquipmentTcType != 'selectFilefile' &&
                      EquipmentTcType != 'addedselectFile' &&
                      EquipmentTcType != 'edselectFilefile' &&
                      EquipmentTcType != 'addedselectFileimg' &&
                      EquipmentTcType != 'edselectFileimg'
                  "
                >
                  <button
                    @click="
  EquipmentTcType == 'add'
    ? EquipmentAdd('formValidator')
    : EquipmentTcType == 'editor'
      ? EquipmentUpdate('formValidator')
      : EquipmentTcType == 'editorsignal'
        ? EquipmentUpdateSignal()
        : EquipmentTcType == 'bangding'
          ? BimModelWay().EquipmentBangDingModel()
          : '';
    
        
                    "
                    v-preventReClick="2000"
                  >
                    确认
                  </button>
                  <button @click="EquipmentTcShow = false">取消</button>
                </div>
              </div>
            </div>
          </div>
          <div class="cancel">
            <img
              :src="require('@/assets/image/index/withdrawal.png')"
              v-show="
                EquipmentTcType == 'selectFilefile' ||
                  EquipmentTcType == 'editorsignal' ||
                  EquipmentTcType == 'edselectFilefile' ||
                  EquipmentTcType == 'chakanLog' ||
                  EquipmentTcType == 'bdUser' ||
                  EquipmentTcType == 'clUser' ||
                  EquipmentTcType == 'addedselectFile'|| EquipmentTcType == 'chakanLog123'
              "
              @click="
                previous(
                  EquipmentTcType == 'selectFilefile' ||
                    EquipmentTcType == 'addedselectFile' ||
                    EquipmentTcType == 'edselectFilefile'
                    ? 'editor'
                    : EquipmentTcType == 'editorsignal'
                    ? 'signal'
                    : EquipmentTcType == 'chakanLog'
                        ? 'chakan'
                    : EquipmentTcType == 'chakanLog123'
                    ? 'chakan'    
                    : EquipmentTcType == 'bdUser'
                    ? 'chakanLog'
                    : EquipmentTcType == 'clUser'
                    ? 'chakanLog'
                    : ''
                )
              "
              alt
            />
            <img
              @click="EquipmentTcShow = false"
              :src="require('@/assets/image/index/cancel.png')"
              alt
            />
          </div>
        </div>
      </div>
      <div
        class="EquipmentSignal_tanchuang_ying"
        v-if="signalTcShow"
      >
        <div class="tanchuang">
          <div :class="['tanchuang_bg']">
            <div class="tanchuang_top">
              <img
                :src="require('~@/assets/image/index/partial_left.png')"
                alt
              />
              <span class="top_title margin_tc">{{
                signalTcType == 'addSignal' ? '添加信号' : ''
              }}</span>

              <img
                :src="require('@/assets/image/index/partial_right.png')"
                alt
              />
            </div>
            <div class="tanchuang_center">
              <div class="tanchuang_center_cen">
                <div class="signalTc">
                  <ul class="signalTc_center">
                    <li class="zixitong">
                      <span class="span_width">子系统：</span>
                      <el-select
                        v-model="Subsystem"
                        placeholder="请选择"
                        @change="equipmentChane(Subsystem)"
                      >
                        <el-option
                          v-for="(itemSub, SubSysi) in SubSysdata"
                          :key="SubSysi + 'd'"
                          :label="itemSub.name"
                          :value="itemSub.name"
                        ></el-option>
                      </el-select>
                    </li>
                    <li class="center_top_shebei">
                      <span class="span_width">设备：</span>
                      <el-select
                        filterable
                        v-model="equipment"
                        placeholder="请选择"
                        @change="signalChane(equipment)"
                      >
                        <el-option
                          v-for="(item, Devici) in DeviceListData"
                          :key="Devici + 'a'"
                          :label="item.name"
                          :value="item.name"
                        ></el-option>
                      </el-select>
                    </li>

                    <li class="center_top_xinhao">
                      <span class="span_width">信号：</span>

                      <div class="checkboxList">
                        <div class="information_bootom">
                          <div class="readio_information">
                            <label
                              v-for="(item, Signali) in SignalData"
                              :key="Signali + 'b'"
                              class="check"
                            >
                              <input
                                @click="checkboxClick(item)"
                                type="checkbox"
                                :value="item.name"
                                :id="item.id"
                                class="radio_type"
                                :checkbox="
                                  (signal =
                                    item.id == checkboxId ? true : false)
                                "
                              />
                              <div class="name">{{ item.name }}</div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="onePartInputName">
                      <span class="span_width">工单类别：</span>
                      <el-select
                        v-model="subTypeNo"
                        placeholder=""
                      >
                        <el-option
                          label="[不关联工单]"
                          value=""
                        > </el-option>
                        <el-option-group
                          v-for="group in subTypeData"
                          :key="group.label"
                          :label="group.label"
                        >
                          <el-option
                            v-for="item in group.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-option-group>
                      </el-select>
                    </li>
                  </ul>
                </div>
                <div class="tanchuang_center_cen_bottom">
                  <button
                    @click="
                      signalTcType == 'addSignal'
                        ? EquipmentAddSignal()
                        : signalTcType == 'editor'
                        ? EquipmentUpdate('formValidator')
                        : ''
                    "
                    v-preventReClick="2000"
                  >
                    确认
                  </button>
                  <button @click="signalTcShow = false">取消</button>
                </div>
              </div>
            </div>
          </div>
          <div class="cancel">
            <img
              :src="require('@/assets/image/index/withdrawal.png')"
              @click="cancelSignal()"
              alt
            />
            <img
              @click="signalTcShow = false"
              :src="require('@/assets/image/index/cancel.png')"
              alt
            />
          </div>
        </div>
      </div>
    </div>
    <importTable :table="table"></importTable>
  </div>
</template>
<script>
import importTable from '../../components/index/importTable'
import selectImage from '../../components/index/selectImage'
export default {
  components: {
    selectImage,
    importTable,
  },
  data() {
    return {
      parentList: [
        {
          label: '001',
          value: 1,
        },
      ],
      ModelType: window.ModelType,
      // lightEdit 灯光
      lightForm: {
        distance: 8, //光的照射距离
        decay: 5, //光的衰减指数
        intensity: 5, //光源的强度
        angle: 5, // 光源的角度
        color: '#EEF700',
        point1: '120.80120436436086,30.722554893222867,13.963621842556297',
        point2: '120.80119096239599,30.722553139090195,10.973285923148035',
        smId: '',
        layerName: '',
        elementId: '',
      },
      pointFlag: false,
      point1Flag: false,
      point2Flag: false,
      point3Flag: false,
      // equipment
      formValidator: {
        startDate: '',
        parentNo: '',
        EquipmentName: '',
        EquipmentCode: '',
        TcinputEquipmentType: '',
        Tcloufloor: '',
        model: '',
        manufactor: '',
        stateName: '',
        NextYearlyDate: '',
        threshold: '',
        installPosition: '',
        installDate: '',
        usefulLife: '',
        warranty: '',
        purchaseDate: '',
      },
      rules: {
        EquipmentName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        EquipmentCode: [
          { required: true, message: '请输入编码', trigger: 'blur' },
        ],
        TcinputEquipmentType: [
          { required: true, message: '请选择类别', trigger: 'change' },
        ],
        Tcloufloor: [
          { required: true, message: '请选择地点', trigger: 'change' },
        ],

        stateName: [
          { required: true, message: '请选择状态', trigger: 'change' },
        ],
      },
      table: {
        title: '导入设备',
        url: 'Equipment',
        controller: 'Equipment',
        methods: 'ImportUser',
        show: false,
      },
      inputEquipment: '',
      inputEquipmentType: '所有',
      EquipmentTypeData: [],
      tcEquipmentTypeData: [],
      EquipmentIdType: '', //设备类型id
      floorlist: [], //楼层
      tcfloorlist: [],
      floorchildre: [],
      floor: '所有',
      floorId: '',
      smId: '',
      monitorNo: '',
      cameraNo: '',

      EquipmentData: {
        list: [],
        total: 0,
      },
      EquipmentTcShow: false,
      EquipmentTcType: '',
      TcEquipmentIdType: '', //弹窗id
      Tcfloor: '请选择',
      TcfloorId: '',
      Tcfloorchildre: [],
      stateID: 0,
      nianjian: '',
      stateData: [
        {
          id: 1,
          name: '正常',
        },
        {
          id: 2,
          name: '维保中',
        },
      ],
      systemFileData: {}, //文档管理数据
      pageSize: 14, //一页多少条
      pageIndex: 1, //实时页码
      directoryNo: 0, //要跳转的文件号//
      parentNo: 0, //父级id
      jumpNums: [], //创建父级id
      selectFileDirectoryNo: 0,
      selectFileOriginalFileName: '',
      ExpendObjectData: [
        {
          equipmentNo: 1,
          propertyKey: 'BimId',
          propertyValue: '53776832',
        },
      ], //扩展属性
      equipmentID: 0, //id号
      ExpendObject: {},
      equipmentNo: '',
      fileShow: false,
      //信号列表数据
      EquipmentSignalListNo: 0, //获取设备信号数组的no
      currentNO: 0,
      currentNO1: '',
      i: 0,
      signalList: [], //信号列表
      signalTcShow: false, //信号tc
      signalTcType: 'addSignal',
      SubSysdata: [], //子系统列表
      subSystemNo: '', //子系统号
      DeviceListData: [], //设备
      SignalData: [], //获取信号列表
      Subsystem: '',
      DeviceListDataID: '', //设备id
      equipment: '',
      elementId: '',
      signal: true,
      checkboxId: '',
      signalIdArr: [],
      editorsignalItem: {}, //编辑关联信号当前项
      EquipmentGetModelList: {}, //获取model对象
      sessionJiL: 0, //维修记录和保养记录名字
      sessionJiLData: {}, ////维修记录和保养记录对象

      bdUserNo: 0, //报单人
      workFlow: [], //流程
      partInOut: [], //物资
      Shrink: true,
      realTimes: [], //跳转后的数组项
      scussFile: {},
      photoIdImg: '', //图片
      photoId: '',
      orderNo: '', //查看工单号
      threeModelId: '', // 三维点位的id
      threeModelLayerName: '', // 三维点位的layername
      threeModelPoint: '', // 三维点位的point

      relevance: [
        { name: '关联信号', id: '1' },
        { name: '关联摄像头', id: '2' },
        { name: '关联运行监控', id: '3' },
      ],
      related: '关联信号',
      defaultProps: {
        children: 'children',
        label: 'model',
      },
      cameraList: [],
      monitorList: [],
      selectCameraName: '',
      selectMonitorName: '',
      cameraActiveId: 0,
      monitorActiveId: 0,
      bindings: [
        { name: '绑定模型', id: '1' },
        { name: '设置光照', id: '2' },
      ],
      fileList: [],
      selectFileId: 0,
      features: '', //设备主要特征
      skillParams: '', //设备主要技术参数
      settingPlace: '', //设置场所
      depreciationRate: '', //设备折旧率
      startDate: '', //启用日期：
      factoryNumber: '', //出厂编号：
      originalValue: '', //设备原值：
      productionDate: '', //出厂日期：
      userfulLife: '', //使用年限：
      subTypeData: [
        {
          label: '保养工单',
          options: [],
        },
        {
          label: '报修工单',
          options: [],
        },
        {
          label: '报事工单',
          options: [],
        },
      ],
      subTypeNo: '',
    }
  },
  mounted() {
    this.getchaoshi()
    this.EquipmentTypeGetList()
    this.AreaGetAllList() //获取楼层
    this.EquipmentGetList(1) //默认获取所有数据
    this.FileSystemGetList() //文档管理数据
    this.SubSysList() //子系统
    this.WorkSubTypeGet()
  },
  computed: {
    headers() {
      return {
        token: this.$store.state.token,
        // 'Content-Type': 'application/x-www-form-urlencoded'
        'Content-Type': 'multipart/form-data',
      }
    },
    returnState: function () {
      //返回当前时间的上一个月
      //通过回调函数给计算属性传参
      return function (name) {
        switch (name) {
          case '正常':
            return 1
          case '维保中':
            return 2
            break
          default:
            return 0
        }
      }
    },
    returnPicture: function () {
      //返回当前时间的上一个月
      //通过回调函数给计算属性传参
      return function (name) {
        var index = name.indexOf('.')
        var result = name.substr(index + 1, name.length)
        //根据后缀名指定文件类型
        switch (result) {
          case index == -1:
            return 1
          case 'jpg':
            return 2
            break
          case '返回上一级':
            return 3
            break
          case 'ico':
            return 4
            break
          case 'docx':
            return 5
            break
          case 'png':
            return 6
            break
          case 'pdf':
            return 7
            break
          default:
            return 1
        }
      }
    },
    realTimeOne: function () {
      return this.realTimes
    },
    copyIdLName() {
      return this.$store.state.copyIdLName
    },
  },
  watch: {
    'table.show'(newVal, oldVal) {
      if (newVal) {
      } else {
        this.EquipmentGetList(1)
      }
    },
    signalTcShow(newVal, oldVal) {
      if (newVal == false) {
        //如果关闭信号弹窗就清空值
        this.signalIdArr = []
        this.Subsystem = ''
        this.equipment = ''
        this.DeviceListDataID = ''
        this.SignalData = []
      }
    },
    copyIdLName(val) {
      if (this.pointFlag) {
        this.lightForm.elementId = val.elementId
      }
    },
  },
  methods: {
    async getchaoshi() {
      const res = await this.$api.MMS.Project.GetModel({})
      //获取所有部门
      if (res.ok) {
        // this.ProjectGetModelDataClone = JSON.parse(JSON.stringify(res.data)) //深拷贝数据给弹窗
        let obj = { ...res.data }

        // this.chaoshi = obj[8].value - 0
        // this.nianjian = obj[9].value - 0
        // console.log(this.ProjectGetModelData);
        console.log(this.nianjian)
      }
    },
    async WorkSubTypeGet() {
      const res = await this.$api.MMS.WorkSubType.Get({})
      if (res.ok) {
        let data = res.data
        for (let i in data) {
          this.subTypeData[data[i].type - 1].options.push({
            value: data[i].no,
            label: data[i].name,
            departmentId: data[i].departmentId,
            departmentName: data[i].departmentName,
          })
        }
      }
    },
    async floorlistChane(name) {
      //所属部门change事件
      let res = ''
      for (var i = 0; i < name.length; i++) {
        res = name[i].name
        this.floorId = name[i].id
      }

      this.floor = res
    },
    async tcfloorlistChane(name) {
      //所属部门change事件
      let res = ''
      for (var i = 0; i < name.length; i++) {
        res = name[i].name
        this.TcfloorId = name[i].id
      }

      this.formValidator.Tcloufloor = res
    },
    submitUpload(e) {
      this.$refs.upload.submit()
    },
    async handleUploadForm(param) {
      //文件上传
      var _this = this
      let formData = new FormData()
      formData.append('file', param.file)
      var imgtype = param.file.type.toLowerCase().split('/')
      if (
        imgtype[1] != 'png' &&
        imgtype[1] != 'jpeg' &&
        imgtype[1] != 'bmp' &&
        imgtype[1] != 'jpg'
      ) {
        return this.$notify({
          title: '警告',
          message: '图片格式不正确！',
          type: 'warning',
        })
      }
      const res = await this.$api.MMS.Image.UploadImg(formData)
      if (res.ok) {
        this.scussFile.id = res.data[0]
        this.scussFile.size = param.file.size
        this.photoId = res.data[0]
        var blod = await this.$api.MMS.Image.GetThumbnailImg(res.data[0])
        var a = new FileReader()
        a.readAsDataURL(blod) //读取文件保存在result中
        a.onload = function (e) {
          _this.photoIdImg = e.target.result
        }
      } else {
        this.$message('上传文件失败，' + data.message)
      }
    },
    // 设置获取点位信息状态
    setPointState(point) {
      let _this = this
      if (point == 1) {
        _this.point1Flag = true
        _this.point2Flag = false
        _this.point3Flag = false
      } else if (point == 2) {
        _this.point2Flag = true
        _this.point3Flag = false
        _this.point1Flag = false
      } else if (point == 3) {
        _this.point2Flag = false
        _this.point3Flag = true
        _this.point1Flag = false
      } else {
        _this.pointFlag = true
      }
    },
    operate(key, params) {
      let _this = this
      switch (key) {
        case 11: // 更新光源参数
          _this.BimModelWay().updateSpotLight(params.key)
          break
      }
    },
    setFocus() {
      this.$parent.$children.forEach((element) => {
        element.iframeWin && element.iframeWin.focus()
      })
    },
    // 给Iframe 发送消息
    postMessage(cmd, params) {
      this.$parent.$children.forEach((element) => {
        element.iframeWin &&
          element.iframeWin.postMessage(
            {
              cmd: cmd,
              params: params,
            },
            this.origin
          )
      })
      // let iframeWin = this.$parent.$children[0].$refs.iframeEl.contentWindow
    },
    // bim模型基本方法
    BimModelWay() {
      let _this = this
      return {
        // 模型解绑
        deletebangding() {
          _this.$api.MMS.Equipment.UpdateThreeModel({
            no: _this.selectRow.no,
          }).then((res) => {
            if (res.ok) {
              _this.lightForm.elementId = null
              _this.$Tools.LayerMsgInfo('解绑成功！')
              _this.EquipmentGetList(_this.pageIndex)
              _this.EquipmentTcShow = false
            }
          })
        },
        EquipmentBangDingModel() {
          if (!_this.lightForm.elementId) {
            _this.BimModelWay().deletebangding()
          } else {
            _this.BimModelWay().bangdingModel()
          }
        },
        // 模型绑定
        bangdingModel() {
          var eleId = _this.lightForm.elementId.split(/[+/]/)
          _this.$api.MMS.Equipment.UpdateThreeModel({
            no: _this.selectRow.no,
            smId: _this.lightForm.smId,
            layerName: _this.lightForm.layerName,
            elementId0: eleId[0],
            elementId1: eleId[1],
            elementId2: eleId[2],
          }).then((res) => {
            if (res.ok) {
              _this.$Tools.LayerMsgInfo('绑定成功！')
              _this.EquipmentGetList(_this.pageIndex)
              _this.EquipmentTcShow = false
            }
          })
        },
        // 设置灯光点位
        setlightPosition(position) {
          if (_this.point1Flag) {
            _this.lightForm.point1 = position
          } else if (_this.point2Flag) {
            _this.lightForm.point2 = position
          }
          _this.point1Flag = false
          _this.point2Flag = false
        },
        // 点光源
        customPointLight() {
          var model = _this.lightForm
          var options = {
            // angle: Math.PI / model.angle,
            color: model.color,
            cutoffDistance: model.distance,
            decay: model.decay,
            intensity: model.intensity,
          }
          _this.postMessage('customPointLight', {
            options: options,
            position: model.point1,
          })
          _this.lightIndex = 0
        },
        // 生成聚光源
        customSpotLight() {
          var model = _this.lightForm
          var options = {
            angle: Math.PI / model.angle,
            color: model.color,
            distance: model.distance,
            decay: model.decay,
            intensity: model.intensity,
          }
          _this.postMessage('customSpotLight', {
            options: options,
            position: model.point1,
            targetPosition: model.point2,
          })
          _this.lightIndex = 1
        },
        // 生成聚光源
        customDirectionalLight() {
          var model = _this.lightForm
          var options = {
            color: model.color,
            intensity: model.intensity,
          }
          _this.postMessage('customDirectionalLight', {
            options: options,
            position: model.point1,
            targetPosition: model.point2,
          })
          _this.lightIndex = 2
        },
        // 修改光源
        updateSpotLight(key) {
          let value = _this.lightForm[key]
          if (key == 'distance' && _this.lightIndex == 0) {
            key = 'cutoffDistance'
          }
          if (_this.lightIndex != -1) {
            _this.postMessage('updateSpotLight', {
              index: _this.lightIndex,
              key: key,
              value: value,
            })
          }
        },
        // 清除光源
        customRemove() {
          _this.postMessage('customRemove')
        },
      }
    },
    // 删除运行监控关联
    deleteRelated(type) {
      let _this = this
      this.$api.MMS.Equipment.DeleteMonitor({
        no: this.selectRow.no,
        type: type,
      }).then((res) => {
        if (res.ok) {
          _this.selectCameraName = ''
          _this.selectMonitorName = ''
          if (type == 0) {
            _this.selectRow.monitorNo = 0
          } else {
            _this.selectRow.cameraNo = 0
          }
          _this.EquipmentGetList(this.pageIndex)
          _this.$Tools.LayerMsgInfo('删除关联成功！')
        }
      })
    },
    // 确认关联运行监控
    sureMonitor() {
      let _this = this
      if (this.monitorActiveId != 0) {
        this.$api.MMS.Equipment.UpdateMonitor({
          no: this.selectRow.no,
          monitorNo: this.monitorActiveId,
        }).then((res) => {
          if (res.ok) {
            _this.EquipmentGetList(this.pageIndex)
            _this.selectRow.monitorNo = this.monitorActiveId
            _this.selectCameraName = ''
            _this.$api.MMS.Monitor.GetModel({
              no: _this.monitorActiveId,
            }).then((res) => {
              if (res.ok && res.data) {
                _this.selectMonitorName =
                  res.data.parentName + ' - ' + res.data.name
              }
            })
            _this.$Tools.LayerMsgInfo('关联成功！')
          }
        })
      }
    },
    // 确认关联摄像头
    sureCamera() {
      let _this = this
      if (this.cameraActiveId != 0) {
        this.$api.MMS.Equipment.UpdateMonitor({
          no: this.selectRow.no,
          cameraNo: this.cameraActiveId,
        }).then((res) => {
          if (res.ok) {
            _this.EquipmentGetList(this.pageIndex)
            _this.selectRow.cameraNo = this.cameraActiveId
            _this.selectCameraName = ''
            _this.$api.MMS.Camera.GetModel({ no: _this.cameraActiveId }).then(
              (res) => {
                if (res.ok && res.data) {
                  _this.selectCameraName =
                    res.data.groupName + ' - ' + res.data.name
                }
              }
            )
            _this.$Tools.LayerMsgInfo('关联成功！')
          }
        })
      }
    },
    // 树节点camera点击
    CameraActive(data, node) {
      // 3d.vue this - Sub_route, this.$parent index_box
      // this.$parent.$children[1] index_center(threeModel)
      if (node.parent.parent == null) {
        this.cameraActiveId = 0
      } else {
        this.cameraActiveId = data.model.no
      }
    },
    // 树节点monitor点击
    MonitorActive(data) {
      this.monitorActiveId = data.parentNo ? data.no : 0
    },
    // 关联功能 tab切换
    relatedClick(releve) {
      let _this = this
      this.related = releve.name

      if (releve.id == '1') {
        this.EquipmentSignalList()
      }
      if (releve.id == '2') {
        this.$api.MMS.Camera.GetList().then((res) => {
          if (res.ok) {
            _this.cameraList = res.data
          }
        })
        this.selectCameraName = ''
        this.$api.MMS.Camera.GetModel({
          no: this.selectRow.cameraNo,
        }).then((res) => {
          if (res.ok && res.data) {
            _this.selectCameraName = res.data.groupName + ' - ' + res.data.name
          }
        })
      } else if (releve.id == '3') {
        this.$api.MMS.Monitor.GetTree({ type: 1 }).then((res) => {
          if (res.ok) {
            _this.monitorList = res.data
          }
        })
        this.selectMonitorName = ''
        this.$api.MMS.Monitor.GetModel({
          no: this.selectRow.monitorNo,
        }).then((res) => {
          if (res.ok && res.data) {
            _this.selectMonitorName =
              res.data.parentName + ' - ' + res.data.name
          }
        })
      }
    },
    async FileSystemSave() {
      //文档管理文件下载
      var file = [
        {
          ParentNo: -1,
          OriginalFileName: this.scussFile.key,
          FileName: this.scussFile.value,
          FileSize: this.scussFile.size,
        },
      ]
      //确认按钮
      const res = await this.$api.MMS.FileSystem.Save(file)
      if (res.ok) {
        this.photoId = res.data[0]
        this.ImageGetThumbnailImg(this.photoId)
      } else {
        this.$message('失败，' + res.message)
      }
    },
    blobToDataURL(blob) {
      var self = this //this指回vue
      var a = new FileReader()
      a.readAsDataURL(blob) //读取文件保存在result中
      a.onload = function (e) {
        self.photoIdImg = e.target.result //读取的结果在result中
      }
    },
    async ImageGetThumbnailImg(no) {
      //获取文件流
      const res = await this.$api.MMS.Image.GetThumbnailImg(no)
      if (res) {
        if (res.type == 'application/octet-stream') {
          this.blobToDataURL(res)
        } else {
          this.photoIdImg = ''
        }
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    async previousUp(type, item) {
      if (type == 'edselectFileimg') {
        this.EquipmentTcType = 'editor'
        this.photoId = item
        await this.ImageGetThumbnailImg(item)
      } else if (type == 'addedselectFileimg') {
        this.EquipmentTcType = 'add'
        this.photoId = item
        await this.ImageGetThumbnailImg(item)
      }
    },
    empty() {
      //清空
      this.photoIdImg = ''
      this.photoId = ''
    },
    //选择文件

    async EquipmentExportList() {
      //导出
      const res = await this.$api.MMS.Equipment.ExportList({
        name: this.inputEquipment,
        typeId: this.EquipmentIdType,
        areaId: this.floorId,
      })
      if (res) {
        var blob = new Blob([res])
        var a = document.createElement('a')
        a.download = '设备档案.xlsx'
        a.style.display = 'none'
        a.href = URL.createObjectURL(blob)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        this.$Tools.LayerMsgInfo('成功')
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    importDaor(flag) {
      this.table.show = flag
    },
    async CurrentLog(e) {
      if (this.sessionJiL != '0') {
        const res = await this.$api.MMS.Equipment.RepairOrderList({
          no: this.EquipmentSignalListNo,
          pageIndex: e,
          pageSize: this.pageSize,
          type: this.sessionJiL,
        })
        if (res.ok) {
          this.sessionJiLData = res.data
        }
      }
    },
    async EquipmentRepairOrderList(tab) {
      //获取设备维修记录、保养记录
      if (tab.index > 0) {
        const res = await this.$api.MMS.Equipment.RepairOrderList({
          no: this.EquipmentSignalListNo,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          type: tab.index,
        })
        if (res.ok) {
          this.sessionJiLData = res.data
        }
      }
    },

    async EquipmentUpdateSignal() {
      //编辑关联信号
      const res = await this.$api.MMS.Equipment.UpdateSignal({
        no: this.editorsignalItem.no,
        workSubTypeNo: this.subTypeNo,
      })
      if (res.ok) {
        this.EquipmentTcType = 'signal'
        this.EquipmentSignalList() //列表
        this.$Tools.LayerMsgInfo('成功')
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    async EquipmentDelSignal(no) {
      console.log(123)
      //删除关联设备
      const res = await this.$api.MMS.Equipment.DelSignal({ no })
      if (res.ok) {
        this.EquipmentSignalList() //列表
        this.$Tools.LayerMsgInfo('成功')
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    async EquipmentAddSignal() {
      //添加设备关联
      if (!this.EquipmentSignalListNo) {
        return this.$Tools.LayerMsgErr('请选择子系统')
      }
      if (!this.DeviceListDataID) {
        return this.$Tools.LayerMsgErr('请选择设备')
      }
      if (this.signalIdArr.length < 1) {
        return this.$Tools.LayerMsgErr('请选择信号')
      }

      const res = await this.$api.MMS.Equipment.AddSignal({
        equipmentNo: this.EquipmentSignalListNo,
        deviceId: this.DeviceListDataID,
        WorkSubTypeNo: this.subTypeNo,
        signalId: this.signalIdArr,
      })
      if (res.ok) {
        this.signalTcShow = false
        this.EquipmentTcShow = true
        this.EquipmentSignalList() //列表
        if (res.data.length == 0) {
          this.$Tools.LayerMsgInfo('成功')
        } else {
          this.$Tools.LayerMsgErr(res.data[0])
        }
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    async EquipmentSignalList() {
      //信号列表
      const signalRes = await this.$api.MMS.Equipment.SignalList({
        equipmentNo: this.EquipmentSignalListNo,
      })
      if (signalRes.ok) {
        this.signalList = signalRes.data
      }
    },

    //复选框点击事件
    checkboxClick(item) {
      this.checkboxId = item.id
      const index = this.signalIdArr.indexOf(item.id)

      if (index == -1) {
        this.signalIdArr.push(item.id)
      } else {
        // if(index==0)
        this.signalIdArr.splice(index, 1)
      }
    },
    async SubSysList() {
      //获取子系统列表
      const res = await this.$api.MMS.SubSystem.SubSysList({})
      if (res.ok) {
        this.SubSysdata = res.data
      }
    },

    async equipmentChane(name) {
      //获取设备
      let systemNo = ''
      for (var j in this.SubSysdata) {
        if (this.SubSysdata[j].name === name) {
          systemNo = this.SubSysdata[j].no
        }
        this.subSystemNo = systemNo
      }
      const res = await this.$api.MMS.Device.GetList({ systemNo: systemNo })
      if (res.ok) {
        this.DeviceListData = res.data
        if (this.DeviceListData.length > 0) {
          this.signalChane(this.DeviceListData[0].id)
        } else {
          this.SignalData = []
        }
      }
    },
    async signalChane(name) {
      let subSystemNo = ''
      for (var j in this.DeviceListData) {
        if (this.DeviceListData[j].name === name) {
          subSystemNo = this.DeviceListData[j].id

          this.DeviceListDataID = this.DeviceListData[j].id
        }
      }
      const res = await this.$api.MMS.Signal.GetList({ code: subSystemNo })
      if (res.ok) {
        this.SignalData = res.data
      }
    },
    color2(val) {
      if (val == 2) {
        return 'orange'
      }
    },
    color1(val, ele) {
      let date = new Date().getTime()
      if (val) {
        let time = (new Date(val).getTime() - date) / (1 * 24 * 60 * 60 * 1000)
        if (time < new Date(ele).getTime()) {
          // return 'color:red;:after:{content:"123"}'
          return 'red'
        } else {
          return ''
        }
      } else {
        return ''
      }
      //  if(val&&)
    },
    //返回上一步
    cancelSignal() {
      this.signalTcShow = false
      this.EquipmentTcShow = true
    },
    signalTc(type, item) {
      //添加

      this.signalTcShow = true
      this.signalTcType = type
      this.EquipmentTcShow = false
    },
    async fileUp() {
      //下载文件
      // const res = await this.$api.MMS.FileSystem.GetFileSteam({
      //   no: this.selectFileDirectoryNo
      // })
      // if (res) {
      //   let url = window.URL.createObjectURL(new Blob([res]))
      //   let link = document.createElement('a')
      //   link.style.display = 'none'
      //   link.href = url
      //   link.setAttribute('download', this.selectFileOriginalFileName)
      //   document.body.appendChild(link)

      //   link.click()
      // }
      var pos = this.selectFileOriginalFileName.lastIndexOf('.')
      var imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp']
      var extension = this.selectFileOriginalFileName
        .substr(pos)
        .toLowerCase()
        .replace(/(\s*$)/g, '')

      if (imageExtensions.indexOf(extension) == -1) {
        const no = this.selectFileDirectoryNo
        //预下载
        const prepareres = await this.$api.MMS.File.RequestDownloadFile(
          this.selectFileId
        )
        let allFileData = []
        if (prepareres.ok) {
          const loading = this.$loading({
            lock: true,
            text: '下载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
          })
          for (let i = 0; i < prepareres.data.count; i++) {
            // let file = new FormData()
            // file.append('Id', this.selectFileId)
            // file.append('index', i)
            let file = `?Id=${this.selectFileId}&index=${i}`

            //分段下载
            const down = await this.$api.MMS.File.FileDownload(file)
            //合并
            allFileData.push(down)
            if (i == prepareres.data.count - 1) {
              //成功
              let url = window.URL.createObjectURL(new Blob(allFileData))
              let link = document.createElement('a')
              link.style.display = 'none'
              link.href = url
              link.setAttribute('download', this.selectFileOriginalFileName)
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
              loading.close()
            }
          }
        }
      } else {
        const prepareres = await this.$api.MMS.Image.GetOriginalImg(
          this.selectFileId
        )
        if (prepareres) {
          let url = window.URL.createObjectURL(new Blob([prepareres]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', this.selectFileOriginalFileName)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        } else {
          this.$message('图片下载失败')
        }
      }
    },
    deleteNode: function (i) {
      //移除扩展属性
      this.ExpendObjectData.splice(i, 1) //删除index为i,位置的数组元素
    },
    addExpendObject() {
      //添加扩展属性
      this.ExpendObjectData.push({
        equipmentNo: 0,
        propertyKey: '',
        propertyValue: '',
      })
    },
    async EquipmentAdd(formName) {
      this.ExpendObject = {} //扩展属性对象

      for (let i in this.ExpendObjectData) {
        //方括号方法把数组中的值插入到对象
        this.ExpendObject[this.ExpendObjectData[i].propertyKey] =
          this.ExpendObjectData[i].propertyValue
      }

      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.MMS.Equipment.Add({
            No: 0,
            PhotoId: this.photoId,
            parentNo: this.formValidator.parentNo,
            TypeId: this.TcEquipmentIdType,
            AreaId: this.TcfloorId,
            State: this.stateID,
            ManualNo: this.selectFileDirectoryNo,
            Id: this.equipmentID,
            Argument: this.argument,
            ElementId: this.elementId,
            MonitorNo: this.monitorNo,
            CameraNo: this.cameraNo,
            Name: this.formValidator.EquipmentName,
            Code: this.formValidator.EquipmentCode,
            UserfulLife: this.userfulLife,
            Model: this.formValidator.model,
            ProductionDate: this.productionDate, //出厂日期
            OriginalValue: this.originalValue,
            FactoryNumber: this.factoryNumber,
            StartDate: this.startDate,
            DepreciationRate: this.depreciationRate,
            Manufactor: this.formValidator.manufactor,
            SettingPlace: this.settingPlace,
            SkillParams: this.skillParams,
            Features: this.features,
            CountingUnit: this.formValidator.countingUnit,
            Specifications: this.formValidator.specifications,
            StartDate: this.formValidator.startDate,
            ExpendObject: this.ExpendObject,
            NextYearlyDate: this.formValidator.NextYearlyDate,
            threshold: this.formValidator.threshold,
            brand: this.formValidator.brand,
            installPosition: this.formValidator.installPosition,
            installDate: this.formValidator.installDate,
            usefulLife: this.formValidator.usefulLife,
            warranty: this.formValidator.warranty,
            purchaseDate: this.formValidator.purchaseDate,
          })
          if (res.ok) {
            this.EquipmentTcShow = false
            this.EquipmentGetList(1) //列表
            this.$Tools.LayerMsgInfo('添加成功')
          } else {
            this.$Tools.LayerMsgErr('添加失败')
          }
        } else {
          return false
        }
      })
    },
    selectFile(item, type) {
      if (type == 'selectFilefile') {
        this.EquipmentTcType = 'add'
      } else if (type == 'edselectFilefile') {
        this.EquipmentTcType = 'editor'
      }
      //选择文件
      this.selectFileId = item.fileId
      this.selectFileDirectoryNo = item.directoryNo
      this.selectFileOriginalFileName = item.originalFileName
    },
    async jumpFile(item) {
      //点击文件
      if (item.originalFileName == '返回上一级') {
        this.directoryNo = this.jumpNums[this.jumpNums.length - 2] //获取上一级id号 -1为当前id

        this.jumpNums.splice(this.jumpNums.length - 2, 1)
      } else {
        if (item.fileType == 1) {
          this.jumpNums.push(item.directoryNo)
          this.parentNo = item.directoryNo
          this.directoryNo = item.directoryNo
        } else {
        }
      }
      this.FileSystemGetList() //更新列表
      //跳转文件
    },
    async FileSystemGetList() {
      const res = await this.$api.MMS.FileSystem.GetList({
        directoryNo: this.directoryNo,
      })
      if (res.ok) {
        if (res.data.path == '/') {
          this.systemFileData = res.data
        } else {
          let arr = []
          arr = res.data

          const obj = {
            createTime: '',
            createUserName: '',
            createUserNo: 0,
            directoryNo: this.parentNo,
            fileMd5: null,
            fileName: '',
            fileSize: '',
            fileType: 3,
            originalFileName: '返回上一级',
            parentNo: 0,
            thumbnailMd5: null,
            thumbnailName: null,
            thumbnailSize: null,
          }
          arr.list.unshift(obj)

          this.systemFileData = arr
        }
      }
    },
    //选择文件
    previous(type) {
      //返回上一步按钮
      console.log(this.EquipmentSignalListNo)
      // if (this.currentNO) {
      // currentNO =EquipmentSignalListNo;
      //       currentNO1 = EquipmentSignalListNo;
      this.i += 1
      this.currentNO1 = {
        no: this.EquipmentSignalListNo,
        i: this.i,
      }
      // }
      this.EquipmentTcShow = true
      this.EquipmentTcType = type
    },
    stateNameChane(name) {
      //状态选择器

      for (var i in this.stateData) {
        if (this.stateData[i].name == name) {
          this.stateID = this.stateData[i].id
        }
      }
    },
    async addTc(type, item) {
      console.log(item)
      // this.currentNO=''
      if (type == 'chakanLog123') {
        this.selectRow = item
        if (item instanceof Object) {
          this.EquipmentSignalListNo = item.no
        } else {
          this.EquipmentSignalListNo = item
        }
        console.log(item)

        this.EquipmentTcType = 'chakanLog123'
        this.EquipmentTcShow = true
        this.currentNO = item.no
        console.log(this.EquipmentTcType)
        return
      }
      this.selectRow = item
      this.lightForm.smId = item.smId
      if (type == 'add') {
        //添加前清空值
        ;(this.formValidator.installPosition = ''),
          (this.formValidator.installDate = ''),
          (this.formValidator.usefulLife = ''),
          (this.formValidator.warranty = '')
        this.formValidator.parentNo = ''
        this.formValidator.EquipmentName = ''
        this.formValidator.EquipmentCode = ''
        this.TcEquipmentIdType = ''
        this.TcfloorId = '.'
        this.formValidator.model = ''
        ;(this.formValidator.NextYearlyDate = ''),
          (this.formValidator.threshold = ''),
          (this.stateID = 0)
        this.selectFileDirectoryNo = ''
        this.formValidator.TcinputEquipmentType = ''
        this.formValidator.Tcloufloor = ''
        this.formValidator.manufactor = ''
        this.formValidator.stateName = ''
        this.formValidator.purchaseDate = ''
        this.selectFileOriginalFileName = ''
        this.ExpendObjectData = []
        this.selectFileId = 0
        this.features = ''
        this.skillParams = ''
        this.settingPlace = ''
        this.depreciationRate = ''
        this.startDate = ''
        this.formValidator.startDate = ''
        this.factoryNumber = ''
        this.originalValue = ''
        this.productionDate = ''
        this.userfulLife = ''
        //清空
        this.photoIdImg = ''
        this.photoId = ''
      } else if (type == 'editor' && item != '') {
        //编辑
        //清空
        this.photoIdImg = ''
        this.photoId = ''
        const res = await this.$api.MMS.Equipment.GetModel({
          no: item.no,
        })
        if (res.ok) {
          const obj = res.data.model
          console.log(res.data)
          this.formValidator.parentNo = obj.parentNo
          this.formValidator.EquipmentName = obj.name
          this.formValidator.EquipmentCode = obj.code
          this.TcEquipmentIdType = obj.typeId
          this.equipmentID = obj.id
          this.TcfloorId = obj.areaId
          this.formValidator.model = obj.model
          this.formValidator.manufactor = obj.manufactor
          this.stateID = this.returnState(obj.stateName)
          this.selectFileDirectoryNo = obj.manualNo
          this.formValidator.TcinputEquipmentType = obj.typeName
          this.formValidator.Tcloufloor = obj.areaName
          this.stateID = obj.state
          this.formValidator.countingUnit = obj.countingUnit
          this.formValidator.specifications = obj.specifications
          this.formValidator.startDate = obj.startDate
          ;(this.formValidator.installPosition = obj.installPosition),
            (this.formValidator.installDate = obj.installDate),
            (this.formValidator.usefulLife = obj.usefulLife),
            (this.formValidator.warranty = obj.warranty)
          this.formValidator.brand = obj.brand
          this.formValidator.purchaseDate = obj.purchaseDate
          this.formValidator.model = obj.model

          this.formValidator.stateName =
            this.$Convert.Equipment.getEquipmentState(obj.state)
          this.selectFileOriginalFileName =
            obj.manualOriginalFileName == null ? '' : obj.manualOriginalFileName
          this.ExpendObject = {}
          this.ExpendObjectData = []
          this.equipmentNo = obj.no
          this.smId = obj.smId
          this.monitorNo = obj.monitorNo
          this.cameraNo = obj.cameraNo
          this.elementId = item.elementId
          this.photoId = obj.photoId
          this.selectFileId = obj.fileId
          this.features = obj.features
          this.skillParams = obj.skillParams
          this.settingPlace = obj.settingPlace
          this.depreciationRate = obj.depreciationRate
          this.startDate = obj.startDate
          this.formValidator.startDate = obj.startDate
          this.factoryNumber = obj.factoryNumber
          this.originalValue = obj.originalValue
          this.productionDate = obj.productionDate
          this.userfulLife = obj.userfulLife
          ;(this.formValidator.NextYearlyDate = obj.nextYearlyDate),
            (this.formValidator.threshold = obj.threshold)
          this.ImageGetThumbnailImg(obj.photoId)
          //获取扩展属性
          for (var i in res.data.property) {
            this.ExpendObject[res.data.property[i].propertyKey] =
              res.data.property[i].propertyValue

            this.ExpendObjectData.push(res.data.property[i])
          }
        }
      } else if (type == 'signal') {
        this.EquipmentSignalListNo = item.no
        this.related = '关联信号'
        this.EquipmentSignalList()
      } else if (type == 'editorsignal') {
        //编辑关联信号当前项

        this.editorsignalItem = item
        this.subTypeNo = item.workSubTypeNo
      } else if (type == 'chakan') {
        if (item instanceof Object) {
          this.EquipmentSignalListNo = item.no
        } else {
          this.EquipmentSignalListNo = item
        }
      } else if (type == 'chakanLog') {
        this.orderNo = item
      } else if (type == 'bdUser') {
        this.bdUserNo = item
      } else if (type == 'clUser') {
        this.bdUserNo = item
        //处理人
      } else if (type == 'goToPoint') {
        // this.Shrink = false
        this.threeModelId = item.smId
        this.threeModelLayerName = item.layerName

        //2.关联运行监控
        if (item.monitorNo) {
          this.$store.commit('setMonitorNo', item.monitorNo)
        } else {
          //4.该设备未关联信号
          this.$Tools.LayerMsgErr('该设备未关联运行监控')
          return (this.Shrink = true)
        }

        this.Shrink = false
        this.realTimes = [item]
        return
      } else if (type == 'bangding') {
        this.lightForm.elementId = 'modelo+' + item.elementId
      }

      //添加节点显示弹窗

      this.EquipmentTcShow = true
      this.EquipmentTcType = type
    },
    Back() {
      this.lightDivFlag = false
      this.Shrink = true
      this.EquipmentGetList(this.pageIndex)
      this.$store.commit('setMonitorNo', -1)
      this.$store.commit('setCenterP', [])
      this.$store.commit('setRefreshBuild', true)

      //返回
    },
    async EquipmentUpdate(formName) {
      this.ExpendObject = {} //扩展属性对象
      for (let i in this.ExpendObjectData) {
        //方括号方法把数组中的值插入到对象
        this.ExpendObject[this.ExpendObjectData[i].propertyKey] =
          this.ExpendObjectData[i].propertyValue
      }
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.MMS.Equipment.Update({
            parentNo: this.formValidator.parentNo,
            No: this.equipmentNo,
            PhotoId: this.photoId,
            TypeId: this.TcEquipmentIdType,
            AreaId: this.TcfloorId,
            State: this.stateID,
            ManualNo: this.selectFileDirectoryNo,
            Id: this.equipmentID,
            Argument: this.argument,
            ElementId: this.elementId,
            MonitorNo: this.monitorNo,
            CameraNo: this.cameraNo,
            Name: this.formValidator.EquipmentName,
            Code: this.formValidator.EquipmentCode,
            UserfulLife: this.userfulLife,
            Model: this.formValidator.model,
            ProductionDate: this.productionDate,
            OriginalValue: this.originalValue,
            FactoryNumber: this.factoryNumber,
            StartDate: this.startDate,
            DepreciationRate: this.depreciationRate,
            Manufactor: this.formValidator.manufactor,
            SettingPlace: this.settingPlace,
            SkillParams: this.skillParams,
            Features: this.features,
            CountingUnit: this.formValidator.countingUnit,
            Specifications: this.formValidator.specifications,
            StartDate: this.formValidator.startDate,
            ExpendObject: this.ExpendObject,
            NextYearlyDate: this.formValidator.NextYearlyDate,
            threshold: this.formValidator.threshold,
            brand: this.formValidator.brand,
            installPosition: this.formValidator.installPosition,
            installDate: this.formValidator.installDate,
            usefulLife: this.formValidator.usefulLife,
            warranty: this.formValidator.warranty,
            purchaseDate: this.formValidator.purchaseDate,
          })
          if (res.ok) {
            this.EquipmentTcShow = false
            this.EquipmentGetList(1) //知识库列表
            this.$Tools.LayerMsgInfo('成功')
          } else {
            this.$Tools.LayerMsgErr(res.message)
          }
        } else {
          return false
        }
      })
    },

    async EquipmentDelete(no) {
      //删除
      const res = await this.$api.MMS.Equipment.Delete({ no: no })
      if (res.ok) {
        this.$Tools.LayerMsgInfo('成功')
        this.EquipmentGetList(1)
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },

    Current(e) {
      //分页响应事件
      this.EquipmentGetList(e)
    },
    async EquipmentGetList(pageIndex) {
      //分页方法
      this.pageIndex = pageIndex
      let a = await this.$api.MMS.Equipment.GetList({
        pageSize: 10, //一页多少条
        pageIndex: 1, //实时页
        name: this.inputEquipment,
        typeId: this.EquipmentIdType,
        areaId: this.floorId,
      })
      if (a.ok) {
        console.log(a)
        this.parentList = a.data.list
      }
      const res = await this.$api.MMS.Equipment.GetList({
        pageSize: this.pageSize, //一页多少条
        pageIndex: pageIndex, //实时页
        name: this.inputEquipment,
        typeId: this.EquipmentIdType,
        areaId: this.floorId,
      })
      if (res.ok) {
        if (res.data.total > 0) {
          this.EquipmentData = res.data
        } else {
          this.$Tools.LayerMsgErr('没有数据')

          this.EquipmentData = {
            list: [],
            total: 0,
          }
        }
      }
    },
    async AreaGetAllList() {
      //获取楼层
      const res = await this.$api.MMS.Area.GetAllList({})
      if (res.ok) {
        this.floorlist = res.data
        this.tcfloorlist = JSON.parse(JSON.stringify(res.data)) //深拷贝数据给弹窗
        this.floorlist.unshift({
          children: undefined,
          model: {
            code: '',
            id: '',
            name: '所有',
          },
        })
      }
    },
    TcEquipmentTypeChane(name) {
      //分项拼接
      let res = ''
      for (var i = 0; i < name.length; i++) {
        res = name[i].name
        this.TcEquipmentIdType = name[i].id
      }

      if (res == this.TcinputEquipmentType) {
        return
      }
      this.formValidator.TcinputEquipmentType = res
    },

    EquipmentTypeChane(name) {
      //分项拼接
      let res = ''
      for (var i = 0; i < name.length; i++) {
        res = name[i].name
        this.EquipmentIdType = name[i].id
      }

      if (res == this.inputEquipmentType) {
        return
      }
      this.inputEquipmentType = res
    },
    async EquipmentTypeGetList() {
      //获取设备类别
      const res = await this.$api.MMS.EquipmentType.GetList({})
      if (res.ok) {
        this.tcEquipmentTypeData = this.getTreeData(
          JSON.parse(JSON.stringify(res.data))
        ) //深拷贝数据给弹窗
        this.EquipmentTypeData = this.getTreeData(res.data)
        this.EquipmentTypeData.unshift({
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
<style lang="scss" scoped>
@import './styles/Equipment.scss';
.span {
  display: inline-block;
  width: 130px;
  text-align: left;
}
.bianji {
  display: inline-block;
  width: 80px;
  text-align: left;
}
</style>
<style lang="scss">
.orange {
  color: orange;
}
//关联信号
.red {
  color: red;
  // &::after{
  //   content:'临近年检'
  // }
}
.lightEdit {
  .add_dianh_list_top {
    margin-left: 20px;
    ul {
      display: flex;
      li {
        margin: 0 20px;
        height: 40px;
        line-height: 40px;
        border-bottom: 2px solid transparent;
        span {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: #00f0ff;
          line-height: 48px;
          opacity: 0.6;
          cursor: pointer;
        }
      }
      .Bborder {
        border-bottom: 2px solid #00f0ff;

        > span {
          opacity: 1;
        }
      }
    }
  }
  .light_body {
    margin-top: 20px;
  }
}

.Equipment_tanchuang_ying {
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
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
        margin: 2vh 0;
        .tanchuang_center_cen {
          //添加设备
          .tanchuang_center_cen_top_w {
            // margin-top: 6vh;
            width: 100%;
            // display: flex;
            // justify-content: start;
            height: 40vh;
            overflow: auto;
            padding-left: 100px;

            .tanchuang_center_cen_top {
              li {
                margin-top: 1vh;
                display: flex;
                justify-content: start;
                align-items: center;
                //请选择
                .one_a {
                  margin-left: 5px;
                }
                .smallbluebutton {
                  margin-right: 5px;
                  display: inline-block;
                  background-color: rgba(0, 0, 0, 0);
                  border: 1px solid #00f0ff;
                  color: #00f0ff;
                  height: 20px;
                  line-height: 20px;
                  text-align: center;
                  text-decoration: none;
                  width: 20px;
                  font-size: 14px;
                }
                .selectFile_sub {
                  text-decoration: underline;

                  overflow: hidden; //超出的文本隐藏
                  text-overflow: ellipsis; //溢出用省略号显示
                  white-space: nowrap; //溢出不换行
                  cursor: pointer;
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
                .el-input {
                  width: unset !important;
                }
                span {
                  font-size: 16px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #00f0ff;
                }
                i {
                  //**** */
                  font-size: 20px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #00f0ff;
                  vertical-align: baseline;
                  margin-left: 5px;
                }
              }
              .shuxing_li {
                display: flex;
                flex-direction: column;
                justify-content: start;
                //扩展属性
                .shuxing_top {
                  display: flex;
                  width: 100%;
                  .shuxing_sub {
                    text-decoration: underline;
                    cursor: pointer;
                  }
                }
                .shuxing_center {
                  display: inline-block;
                  // display: flex;
                  // justify-content: flex-end;
                  // margin-left: 60%;

                  width: 100%;
                  // margin-left: 50px;
                  .shuxing_center_dian {
                    margin: 0 3px;
                  }
                  .shuxing_center_key {
                    width: 80px;
                  }
                  .shuxing_center_value {
                    width: 120px;
                    margin-right: 8px;
                  }
                  .del {
                    cursor: pointer;
                  }
                }
              }
            }
            .tanchuang_center_cen_tow {
              position: absolute;
              top: 100px;
              right: 100px;
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

                    .photo_bottom {
                      display: flex;
                      justify-content: space-between;
                      align-items: center;

                      span {
                        font-size: 14px;
                        cursor: pointer;
                        color: #00f0ff;
                      }
                    }
                  }

                  > :nth-child(2) {
                    margin-left: 0.5vw;
                  }
                }
              }
            }
          }
          //选择文件
          .selectFile {
            //移动
            .information_moveFiles {
              opacity: 0.9;
              margin: 12px 24px;
              .moveFiles_top {
                display: flex;
                justify-content: space-between;
                button {
                  cursor: pointer;
                  height: 30px;
                  // width: 6vw;
                  color: #fff;
                  background: #47d235;
                  border-radius: 2px;
                  background: rgba(0, 126, 221, 1);
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #ffffff;
                }
              }
              .moveFiles_center {
                height: 44vh;
                overflow: auto;
                .moveFiles_center_list {
                  .file_icon {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    a {
                      color: #fff;
                    }
                    img {
                      width: 16px;
                      height: 16px;
                    }

                    .originalFileName_a {
                      text-decoration: underline;
                      cursor: pointer;
                    }
                  }
                }
              }
            }
          }
          //关联信号
          .signal {
            .add_dianh_list_top {
              margin-left: 20px;
              ul {
                display: flex;
                li {
                  margin: 0 20px;
                  height: 40px;
                  line-height: 40px;
                  border-bottom: 2px solid transparent;
                  span {
                    font-size: 16px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
                    color: #00f0ff;
                    line-height: 48px;
                    opacity: 0.6;
                    cursor: pointer;
                  }
                }
                .Bborder {
                  border-bottom: 2px solid #00f0ff;

                  > span {
                    opacity: 1;
                  }
                }
              }
            }

            .add_dianh_list_center {
              .camera_related {
                margin: 20px 40px 20px 20px;
                .tree_center {
                  height: 36.85vh;
                  // height: 360px;
                  overflow: hidden;
                  overflow-y: scroll;
                }
                .camera_title {
                  text-align: left;
                  color: #30b8ff;
                  .delete {
                    cursor: pointer;
                  }
                }
                .camera_bottom {
                  margin-top: 10px;
                  button {
                    width: 50px;
                    height: 26px;
                    background: #007edd;
                    border-radius: 2px;
                    font-size: 14px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
                    color: #ffffff;
                    cursor: pointer;
                  }
                }
              }

              .PartInDb_tccenter_top {
                // margin-top: 5vh;
                margin-left: 20px;
                .onePartInputName {
                  display: flex;
                }
                li {
                  //请选择
                  .el-input {
                    width: unset !important;
                  }
                  .one_a {
                    margin-left: 5px;
                  }
                  .smallbluebutton {
                    margin-right: 5px;
                    display: inline-block;
                    background-color: rgba(0, 0, 0, 0);
                    border: 1px solid #00f0ff;
                    color: #00f0ff;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    text-decoration: none;
                    width: 20px;
                    font-size: 14px;
                  }
                  .selectFile_sub {
                    text-decoration: underline;

                    overflow: hidden; //超出的文本隐藏
                    text-overflow: ellipsis; //溢出用省略号显示
                    white-space: nowrap; //溢出不换行
                    cursor: pointer;
                  }
                  text-align: left;
                  margin-top: 1vh;
                  // display: flex;
                  // justify-content: center;
                  // align-items: center;
                  //请选择

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
                    color: #00f0ff;
                    padding-left: 0.7vw;
                  }
                  span {
                    font-size: 15px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
                    color: #00f0ff;
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
                .tc_textarea {
                  display: flex;
                  align-items: center;
                  // height: 18vh;
                  > span {
                    display: inline-block;
                    // width: 80px;
                    text-align: center;
                  }
                  .chakan {
                    width: 75%;
                    color: #00f0ff;
                  }
                }
              }
            }
            .div_list {
              .div_top {
                height: 26px;

                .div_top_button {
                  margin-right: 40px;
                  float: right;
                  // margin-top: 5px;
                  button {
                    width: 50px;
                    height: 26px;
                    background: #007edd;
                    border-radius: 2px;
                    font-size: 14px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
                    color: #ffffff;
                    cursor: pointer;
                  }
                }
              }
              .div_table {
                margin: 0 35px;
                height: 42vh;
                overflow: auto;
                .editing_green {
                  color: rgba(95, 255, 0, 1);
                  cursor: pointer;
                }

                .red {
                  color: #ff3c00;
                  cursor: pointer;
                }
              }
            }
          }
          //编辑关联信号
          .editorsignal {
            display: flex;
            justify-content: center;
            .editorsignal_ul {
              margin-top: 4vh;
              text-align: start;
              li {
                height: 4vh;
                span {
                  font-size: 16px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: #00f0ff;
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

                .checkbox {
                  margin-right: 5px;
                }
              }
            }
          }
          //查看设备
          .chakan {
            text-align: left;
            .chakan_center {
              margin: 12px 24px;
              .session {
                display: flex;
                .session_left {
                  width: 450px;

                  > ul {
                    margin: 0 30px;
                    > li {
                      display: flex;
                      justify-content: start;
                      text-align: left;
                      height: 2.5vh;
                      > span,
                      a {
                        font-size: 14px;
                        font-family: MicrosoftYaHei;
                        font-weight: 400;
                        color: #00f0ff;
                        // width: 80px;

                        word-break: keep-all;
                        /* 不换行 */
                        white-space: nowrap;
                        /* 不换行 */
                        overflow: hidden;
                        /* 内容超出宽度时隐藏超出部分的内容 */
                        text-overflow: ellipsis;
                      }
                      :nth-child(1) {
                        width: 150px;
                      }
                    }
                  }
                }
                .session_right {
                  flex: 1;
                  position: relative;
                  width: 100%;
                  .center_right_ptot {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    img {
                      width: 168px;
                      height: 168px;
                    }
                  }
                }
              }
              .div_table {
                .editing_green {
                  color: #ffd904;
                  cursor: pointer;
                }
              }
              .div_table_footer {
                .fenye {
                  display: flex;
                  justify-content: center;
                }
              }
            }
          }
          //查看工单
          .chakanLog {
            // text-align: left;
            overflow: auto;
            height: 50vh;

            .chakanLog_center {
              margin: 12px 24px;

              .chakanLog_top {
                display: flex;
                // height: 200px;
                .chakanLog_left {
                  flex: 1;
                  > ul {
                    margin: 0 50px;
                    li {
                      display: flex;
                      justify-content: space-between;
                      height: 3vh;
                      line-height: 3vh;
                      a,
                      span {
                        font-size: 14px;
                        font-family: MicrosoftYaHei;
                        font-weight: 400;
                        color: #00f0ff;
                        // width: 80px;

                        word-break: keep-all;
                        /* 不换行 */
                        white-space: nowrap;
                        /* 不换行 */
                        overflow: hidden;
                        /* 内容超出宽度时隐藏超出部分的内容 */
                        text-overflow: ellipsis;
                      }
                    }
                  }
                }
                .chakanLog_right {
                  flex: 1;
                  > ul {
                    margin: 0 50px;
                    li {
                      display: flex;
                      justify-content: space-between;
                      height: 3vh;
                      line-height: 3vh;
                      .user {
                        cursor: pointer;
                        text-decoration: underline;
                      }
                      a,
                      span {
                        font-size: 14px;
                        font-family: MicrosoftYaHei;
                        font-weight: 400;
                        color: #00f0ff;
                        // width: 80px;

                        word-break: keep-all;
                        /* 不换行 */
                        white-space: nowrap;
                        /* 不换行 */
                        overflow: hidden;
                        /* 内容超出宽度时隐藏超出部分的内容 */
                        text-overflow: ellipsis;
                      }
                    }
                  }
                }
              }
              .chakanLog_zhong {
                width: 100%;
                // height: 500px;

                // display: flex;
                text-align: left;
                > ul {
                  margin: 0 50px;
                  .line_hei3 {
                    height: 3vh;
                    line-height: 3vh;
                  }
                  li {
                    .baoy {
                      font-size: 14px;
                      font-family: MicrosoftYaHei;
                      font-weight: 400;
                      color: #00f0ff;
                    }
                    .zt {
                      margin-left: 75px;
                    }
                    .bao_M {
                      margin-left: 120px;
                    }
                    a,
                    span {
                      font-size: 14px;
                      font-family: MicrosoftYaHei;
                      font-weight: 400;
                      color: #00f0ff;
                      // width: 80px;

                      word-break: keep-all;
                      /* 不换行 */
                      white-space: nowrap;
                      /* 不换行 */
                      overflow: hidden;
                      /* 内容超出宽度时隐藏超出部分的内容 */
                      text-overflow: ellipsis;
                    }
                  }
                }
              }
              .chakanLog_bottom {
                text-align: left;
                .legend_bor {
                  border: 1px solid #00f0ff;
                  color: #00f0ff;
                  margin-top: 10px;
                }
                .div_table {
                  .white {
                    color: #fff;
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
        // width: 44px;
        // height: 44px;
      }
    }
  }
}
.EquipmentSignal_tanchuang_ying {
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
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
        margin: 2vh 0;
        .tanchuang_center_cen {
          //添加信号
          .signalTc {
            .signalTc_center {
              margin-top: 6vh;
              width: 100%;

              height: 40vh;
              overflow: auto;
              li {
                margin-top: 1vh;
                display: flex;
                justify-content: start;
                align-items: center;
                margin-left: 200px;
                // align-items: center;
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
                .span_width {
                  min-width: 70px;
                  text-align: left;
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
                        // width: 20px;
                        // height: 20px;
                        appearance: none;
                        position: relative;

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
      }
    }
  }
}
</style>
