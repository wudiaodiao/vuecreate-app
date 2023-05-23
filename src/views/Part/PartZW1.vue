<!--
 * @Author: your name
 * @Date: 2020-11-04 19:32:36
 * @LastEditTime: 2022-02-18 16:43:28
 * @LastEditors: Please set LastEditors
 * @Description:物资
 * @FilePath: \ibms\src\views\Event\components\knowledgeBase.vue
-->
<template>
  <div class="Part public_body">
    <div class="Part_cneter">
      <div :class="[
          'public_page',
          'Partlist',
          $store.state.dtab ? 'index_off' : 'index_no'
        ]">
        <div class="Partlist_main">
          <div class="Partlist_Serch">
            <div class="Equipment_top">
              <ul>
                <li>
                  <span>物资名称：</span>
                  <input
                    type="text"
                    class="Equipment_input"
                    v-model="inputPart"
                  />
                </li>
                <li>
                  <span>账簿类别：</span>
                  <el-select v-model="Billcategory" placeholder="请选择" clearable>
    <el-option
      v-for="item in options"
      :key="item.bookNo"
      :label="item.name"
      :value="item.bookNo">
    </el-option>
  </el-select>
                  <!-- <el-cascader
                    :show-all-levels="false"
                    v-model="inputPartType"
                    :options="PartTypeGetListData"
                    :props="{
                      expandTrigger: 'hover',
                      value: 'model',
                      checkStrictly: true
                    }"
                    @change="PartTypeChane(inputPartType)"
                    :placeholder="inputPartType"
                    clearable
                  >
                    <template slot-scope="{ node, data }">
                      <span>{{ data.model.name }}</span>
                      <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                    </template>
                  </el-cascader> -->
                </li>

                <li>
                  <div class="Equipment_chaxun">
                    <button @click="PartGetList(1)">查询</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="Partlist_add">
            <div class="Partlist_top_top">
              <ul>
                <li v-if="
                    $Tools.accessControl(
                      this.$store.state.userGetUserRole.resList,
                      'EditPartZW'
                    )
                  ">
                  <!-- <button @click="addTc('add', '')">添加</button>
                </li>
                <li v-if="
                    $Tools.accessControl(
                      this.$store.state.userGetUserRole.resList,
                      'EditPartType'
                    )
                  ">
                  <button @click="importDaor(true)">导入</button>
                </li>
                <li>
                  <button @click="PartExport()">导出</button>
                </li> -->
                <li v-if="
                    $Tools.accessControl(
                      this.$store.state.userGetUserRole.resList,
                      'EditPartZW'
                    )
                  ">
                  <button @click="addTc('PartInDb', '')">入库</button>
                </li>
                <li v-if="
                    $Tools.accessControl(
                      this.$store.state.userGetUserRole.resList,
                      'EditPartZW'
                    )
                  ">
                  <button @click="addTc('PartOutDb', '')">出库</button>
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
                prop="standardCode"
                label="标准编码"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="code"
                label="物资编码"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="name"
                label="物资名称"
                show-overflow-tooltip
              ></el-table-column>
               <el-table-column
                prop="unit"
                label="单位"
                show-overflow-tooltip
              ></el-table-column>
              <!-- <el-table-column
                prop="typeName"
                label="设备类别"
                show-overflow-tooltip
              ></el-table-column> -->
            <el-table-column
                prop="specification"
                label="规格型号"
                show-overflow-tooltip
              ></el-table-column>
             
              
              <!-- <el-table-column
                prop="model"
                label="型号"
                show-overflow-tooltip
              ></el-table-column> -->
             
              
               <el-table-column
                prop="bookName"
                label="账簿类别"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="calcName"
                label="核算类别"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="price"
                label="单价"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="count"
                label="库存数量"
                show-overflow-tooltip
              ></el-table-column>
               <!-- <el-table-column
                prop="manufactor"
                label="生产厂家"
                show-overflow-tooltip
              ></el-table-column>
               <el-table-column
                prop="brand"
                label="品牌"
                show-overflow-tooltip
              ></el-table-column> -->
              <!-- <el-table-column
                prop="riskNum"
                label="风险库存"
                show-overflow-tooltip
              ></el-table-column> -->
              <!-- <el-table-column
                label="编辑"
                width="50px"
                v-if="
                  $Tools.accessControl(
                    this.$store.state.userGetUserRole.resList,
                    'EditPartType'
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
                    'EditPartType'
                  )
                "
              >
                <template slot-scope="scope">
                  <el-popconfirm
                    title="确定删除吗"
                    @onConfirm="PartDelete(scope.row.no)"
                    @confirm="PartDelete(scope.row.no)"
                  >
                    <span
                      class="red"
                      slot="reference"
                    >删除</span>
                  </el-popconfirm>
                </template>
              </el-table-column> -->
            </el-table>
          </div>
          <div class="Partlist_foot">
            <div class="fenye">
              <el-pagination
                hide-on-single-page
                @current-change="Current"
                :current-page="pageIndex"
                :page-size="pageSize"
                :pager-count="11"
                layout="prev, pager, next"
                :total="PartGetListData.total"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
      <div
        class="EquipmentSignal_tanchuang_ying"
        v-if="PartTcShow"
      >
        <div class="tanchuang">
          <div class="tanchuang_bg">
            <div class="tanchuang_top">
              <img
                :src="require('~@/assets/image/index/partial_left.png')"
                alt
              />
              <span class="top_title margin_tc">{{
                PartTcType == 'add'
                  ? '添加物资'
                  : PartTcType == 'editor'
                  ? '编辑物资'
                  : PartTcType == 'PartInDb'
                  ? '物资入库'
                  : PartTcType == 'PartOutDb'
                  ? '物资出库'
                  : PartTcType == 'Part'
                  ? '选择物资'
                  : ''
              }}</span>

              <img
                :src="require('@/assets/image/index/partial_right.png')"
                alt
              />
            </div>
            <div class="tanchuang_center">
              <div class="tanchuang_center_cen">
                <div
                  class="Part_tcadd"
                  v-if="PartTcType == 'add' || PartTcType == 'editor'"
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
                        <el-form-item prop="PartTcName">
                          <span class="bianji">名称：</span>
                          <el-input
                            type="text"
                            v-model="formValidator.PartTcName"
                          />
                          <i>*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item prop="PartinputTc">
                          <span class="bianji">类别：</span>
                          <el-cascader
                            :show-all-levels="false"
                            v-model="formValidator.PartinputTc"
                            :options="PartTypeGetListDataTc"
                            :props="{ expandTrigger: 'hover', value: 'model' }"
                            @change="
                              PartTypeGetListDataTcChange(
                                formValidator.PartinputTc
                              )
                            "
                            :placeholder="formValidator.PartinputTc || '请选择'"
                            clearable
                          >
                            <template slot-scope="{ node, data }">
                              <span class="bianji">{{ data.model.name }}</span>
                              <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                            </template>
                          </el-cascader>
                          <i>*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item prop="Code">
                          <span class="bianji">编码：</span>
                          <el-input
                            type="text"
                            v-model="formValidator.Code"
                          />
                          <i>*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item>
                          <span class="bianji">厂商：</span>
                          <el-input
                            type="text"
                            v-model="formValidator.PartTcmanufactorName"
                          />
                          <i style="visibility: hidden;">*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item>
                          <span class="bianji">型号：</span>
                          <el-input
                            type="text"
                            v-model="formValidator.Partmodel"
                          />
                          <i style="visibility: hidden;">*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item>
                          <span class="bianji">规格：</span>
                          <el-input
                            type="text"
                            v-model="formValidator.Partspecification"
                          />
                          <i style="visibility: hidden;">*</i>
                        </el-form-item>
                      </li>
                      <li>
                        <el-form-item>
                          <span class="bianji">单位：</span>
                          <el-input
                            type="text"
                            v-model="formValidator.Partunit"
                          />
                          <i style="visibility: hidden;">*</i>
                        </el-form-item>
                      </li>
                      <!-- <li>
                        <el-form-item prop="RiskNum">
                          <span>风险库存：</span>
                          <el-input
                            type="text"
                            v-model="formValidator.RiskNum"
                          />
                          <i>*</i>
                        </el-form-item>
                      </li> -->
                    </el-form>
                  </ul>
                </div>
                <div
                  class="PartInDb"
                  v-else-if="
                    PartTcType == 'PartInDb' 
                  "
                >
                  <ul class="PartInDb_tccenter_top formValidator">
                    <el-form
                      :model="formValidatorlibrary"
                      ref="formValidatorlibrary"
                      label-width="100px"
                      class="demo-dynamic"
                      :rules="ruleslibrary"
                    >
                     
                      <li class="onePartInputName">
                        <el-form-item prop="PartInNum">
                          <span class="kuan120">标准编码：</span>
                          <el-input
                            type="text"
                            v-model.number="formValidatorlibrary.PartInNum"
                          />
                          <i>*</i>
                        </el-form-item>
                      </li>
                      <li class="onePartInputName">
                          <el-form-item prop="PartInNum">
                            <span class="kuan120">物资编码：</span>
                            <el-input
                              type="text"
                              v-model.number="formValidatorlibrary.PartInNum"
                            />
                            <i>*</i>
                          </el-form-item>
                        </li>
                        <li class="onePartInputName">
                          <el-form-item prop="PartInNum">
                            <span class="kuan120">物资名称：</span>
                            <el-input
                              type="text"
                              v-model.number="formValidatorlibrary.PartInNum"
                            />
                            <i>*</i>
                          </el-form-item>
                        </li>
                        <li class="onePartInputName">
                          <el-form-item prop="PartInNum">
                            <span class="kuan120">单位：</span>
                            <el-input
                              type="text"
                              v-model.number="formValidatorlibrary.PartInNum"
                            />
                            <i>*</i>
                          </el-form-item>
                        </li>
                        <li class="onePartInputName">
                          <el-form-item prop="PartInNum">
                            <span class="kuan120">规格型号：</span>
                            <el-input
                              type="text"
                              v-model.number="formValidatorlibrary.PartInNum"
                            />
                            <i>*</i>
                          </el-form-item>
                        </li>
                        <li class="onePartInputName">
                          <el-form-item prop="PartInNum">
                            <span class="kuan120">账簿类别：</span>
                            <el-input
                              type="text"
                              v-model.number="formValidatorlibrary.PartInNum"
                            />
                            <i>*</i>
                          </el-form-item>
                        </li>
                        <li class="onePartInputName">
                          <el-form-item prop="PartInNum">
                            <span class="kuan120">核算类别：</span>
                            <el-input
                              type="text"
                              v-model.number="formValidatorlibrary.PartInNum"
                            />
                            <i>*</i>
                          </el-form-item>
                        </li>
                        <li class="onePartInputName">
                            <el-form-item prop="PartInNum">
                              <span class="kuan120">单价：</span>
                              <el-input
                                type="text"
                                v-model.number="formValidatorlibrary.PartInNum"
                              />
                              <i>*</i>
                            </el-form-item>
                          </li>
                          <li class="onePartInputName">
                            <el-form-item prop="PartInNum">
                              <span class="kuan120">入库数量：</span>
                              <el-input
                                type="text"
                                v-model.number="formValidatorlibrary.PartInNum"
                              />
                              <i>*</i>
                            </el-form-item>
                          </li>
                      <li class="tc_textarea">
                        <span>说明：</span>
                        <!--  :disabled="announcementTcType=='chankan'?true:false" -->
                        <el-input
                          type="textarea"
                          class="chakan"
                          v-model="inputCenter"
                        ></el-input>
                      </li>
                    </el-form>
                  </ul>
                </div>
   <div
                    class="PartInDb"
                    v-else-if="
                      PartTcType == 'PartOutDb'
                    "
                  >
                    <ul class="PartInDb_tccenter_top formValidator">
                      <el-form
                        :model="formValidatorlibrary"
                        ref="formValidatorlibrary"
                        label-width="100px"
                        class="demo-dynamic"
                        :rules="ruleslibrary"
                      >
                     
                        <li class="onePartInputName">
                          <el-form-item prop="PartInNum">
                            <span>{{
                              `出库数量：`
                            }}</span>
                            <el-input
                              type="text"
                              v-model.number="formValidatorlibrary.PartInNum"
                            />
                            <i>*</i>
                          </el-form-item>
                        </li>
                        <li class="tc_textarea">
                          <span>说明：</span>
                          <!--  :disabled="announcementTcType=='chankan'?true:false" -->
                          <el-input
                            type="textarea"
                            class="chakan"
                            v-model="inputCenter"
                          ></el-input>
                        </li>
                      </el-form>
                    </ul>
                  </div>
                <div
                  class="PartTc"
                  v-else-if="PartTcType == 'Part'"
                >
                  <PartTc
                    :partType="partType"
                    v-on:addTc="addTc"
                  ></PartTc>
                </div>
                <div
                  class="tanchuang_center_cen_bottom"
                  v-if="PartTcType != 'Part'"
                >
                  <button
                    @click="
                      PartTcType == 'add'
                        ? PartAdd('formValidator')
                        : PartTcType == 'editor'
                        ? PartUpdate('formValidator')
                        : PartTcType == 'PartInDb'
                        ? PartPartInDb('formValidatorlibrary')
                        : PartTcType == 'PartOutDb'
                        ? PartPartOutDb('formValidatorlibrary')
                        : ''
                    "
                    v-preventReClick="2000"
                  >
                    确认
                  </button>
                  <button @click="PartTcShow = false">取消</button>
                </div>
              </div>
            </div>
          </div>
          <div class="cancel">
            <img
              v-show="PartTcType == 'Part'"
              :src="require('@/assets/image/index/withdrawal.png')"
              @click="previous(PartTcType == 'Part' ? 'PartInDb' : '')"
              alt
            />
            <img
              @click="PartTcShow = false"
              :src="require('@/assets/image/index/cancel.png')"
              alt
            />
          </div>
        </div>
      </div>
      <importTable :table="table"></importTable>
    </div>
  </div>
</template>
<script>
import importTable from '../../components/index/importTable'
export default {
  components: {
    importTable,
  },
  data() {
    return {
      Billcategory: '',
      options:[],
      table: {
        title: '导入物资',
        url: 'Part',
        controller: 'Part',
        methods: 'ImportPart',
        show: false,
      },
      formValidatorlibrary: {
        PartInputName: '',
        PartInNum: '',
      },
      ruleslibrary: {
        PartInputName: [
          { required: true, message: '请选择物资', trigger: 'change' },
        ],
        PartInNum: [
          { required: true, message: `请输入数量`, trigger: 'change' },
          { type: 'number', message: '值必须为数字值', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              if (value !== '') {
                if (/^\+?[1-9]\d*$/.test(value) === false) {
                  callback(new Error('请填写大于0的数'))
                } else {
                  callback()
                }
              } else {
                callback()
              }
            },
            trigger: 'change',
          },
        ],
      },
      formValidator: {
        PartTcName: '',
        PartTcmanufactorName: '',
        Partmodel: '',
        PartinputTc: '',
        Partspecification: '',
        Partunit: '',
        Code: '',
        RiskNum: '',
      },
      rules: {
        PartTcName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        PartinputTc: [
          { required: true, message: '请选择类别', trigger: 'change' },
        ],
        Code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        // RiskNum: [
        //   { required: true, message: '请输入风险库存', trigger: 'blur' },
        // ],
      },
      inputPart: '',
      inputPartType: '所有',
      PartTypeType: '', //设备类型id
      pageSize: 13, //一页多少条
      pageIndex: 1, //实时页码
      PartTypeGetListData: [],
      PartGetListData: {
        list: [],
        total: 0,
      },
      PartTcShow: false, //弹窗
      PartTcType: '',
      PartTypeGetListDataTc: [],
      PartTypeTypeidTc: '', //类别id
      PartNo: 0,
      inputCenter: '', //说明
      PartInputNameNo: '', //物资号码
      partType: '', //出库与入库类型
    }
  },
  mounted() {
    this.getBillcategory()
    this.PartTypeGetList() //物资类别
    this.PartGetList(1)
  },
  methods: {
    getBillcategory() {
      this.$api.MMS.PartBook.Get().then((res) => {
        if (res.ok) {
          this.options=res.data
        }
      })
    },
    importDaor(flag) {
      this.table.show = flag
    },
    async PartExport() {
      //导出
      const res = await this.$api.MMS.Part.Export({
        name: this.inputPart,
        typeId: this.PartTypeType,
      })
      if (res) {
        var blob = new Blob([res])
        var a = document.createElement('a')
        a.download = '物资.xlsx'
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
    previous(type) {
      //返回上一步按钮

      this.PartTcShow = true
      this.PartTcType = type
    },
    async PartPartOutDb(formName) {
      //出库
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.MMS.Part.PartOutDb({
            PartNo: this.PartInputNameNo, //物资号
            Count: this.formValidatorlibrary.PartInNum,
            Content: this.inputCenter,
          })
          if (res.ok) {
            this.PartTcShow = false
            this.PartGetList(1)
            this.$Tools.LayerMsgInfo('成功')
          } else {
            this.$Tools.LayerMsgErr(res.message)
          }
        } else {
          return false
        }
      })
    },
    async PartPartInDb(formName) {
      //入库
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.MMS.Part.PartInDb({
            no: this.PartInputNameNo, //物资号
            count: this.formValidatorlibrary.PartInNum,
            content: this.inputCenter,
          })
          if (res.ok) {
            this.PartTcShow = false
            this.PartGetList(1)
            this.$Tools.LayerMsgInfo('成功')
          } else {
            this.$Tools.LayerMsgErr(res.message)
          }
        } else {
          return false
        }
      })
    },
    async PartUpdate(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.MMS.Part.Update({
            No: this.PartNo,
            Code: this.formValidator.Code,
            Name: this.formValidator.PartTcName,
            TypeId: this.PartTypeTypeidTc,
            Model: this.formValidator.Partmodel,
            Manufactor: this.formValidator.PartTcmanufactorName,
            Specification: this.formValidator.Partspecification,
            Unit: this.formValidator.Partunit,
            Count: this.formValidator.Count,
            RiskNum: this.formValidator.RiskNum,
          })
          if (res.ok) {
            this.PartTcShow = false
            this.PartGetList(1) //知识库列表
            this.$Tools.LayerMsgInfo('成功')
          } else {
            this.$Tools.LayerMsgErr(res.message)
          }
        } else {
          return false
        }
      })
    },
    async PartAdd(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.MMS.Part.Add({
            No: 0,
            Code: this.formValidator.Code,
            Name: this.formValidator.PartTcName,
            TypeId: this.PartTypeTypeidTc,
            Model: this.formValidator.Partmodel,
            Manufactor: this.formValidator.PartTcmanufactorName,
            Specification: this.formValidator.Partspecification,
            Unit: this.formValidator.Partunit,
            Count: 0,
            RiskNum: this.formValidator.RiskNum,
          })
          if (res.ok) {
            this.PartTcShow = false
            this.PartGetList(1) //知识库列表
            this.$Tools.LayerMsgInfo('成功')
          } else {
            this.$Tools.LayerMsgErr(res.message)
          }
        } else {
          return false
        }
      })
    },
    async addTc(type, item) {
      this.inputCenter = ''
      this.formValidatorlibrary.PartInNum = ''
      //弹窗
      if (type == 'add') {
        this.formValidator.PartTcName = ''
        this.PartTypeTypeidTc = ''
        this.formValidator.Partmodel = ''
        this.formValidator.PartTcmanufactorName = ''
        this.formValidator.Partspecification = ''
        this.formValidator.Partunit = ''
        this.formValidator.PartinputTc = ''
        this.formValidator.Code = ''
        this.formValidator.RiskNum = ''
      } else if (type == 'editor') {
        this.formValidator.PartTcName = item.name
        this.PartTypeTypeidTc = item.typeId
        this.formValidator.Partmodel = item.model
        this.formValidator.PartTcmanufactorName = item.manufactor
        this.formValidator.Partspecification = item.specification
        this.formValidator.Partunit = item.unit
        this.formValidator.Count = item.count
        this.formValidator.PartinputTc = item.typeName
        this.PartNo = item.no
        this.formValidator.Code = item.code
        this.formValidator.RiskNum = item.riskNum
      } else if (type == 'PartInDb') {
        this.formValidatorlibrary.PartInputName = ''
        this.PartInputNameNo = ''
        this.formValidatorlibrary.PartInputName = item.name
        this.PartInputNameNo = item.no
        this.partType = type
      } else if (type == 'PartOutDb') {
        this.formValidatorlibrary.PartInputName = ''
        this.PartInputNameNo = ''

        this.formValidatorlibrary.PartInputName = item.name
        this.PartInputNameNo = item.no
        this.partType = type
      }
      //添加节点显示弹窗
      this.PartTcShow = true
      this.PartTcType = type
    },
    async PartDelete(no) {
      //删除
      const res = await this.$api.MMS.Part.Delete({ no: no })
      if (res.ok) {
        this.$Tools.LayerMsgInfo('成功')
        this.PartGetList(1)
      } else {
        this.$Tools.LayerMsgErr(res.message)
      }
    },
    Current(e) {
      //分页响应事件
      this.PartGetList(e)
    },
    async PartGetList(pageIndex) {
      //分页方法
      this.pageIndex = pageIndex
      const res = await this.$api.MMS.Part.GetList({
        pageSize: this.pageSize, //一页多少条
        pageIndex: pageIndex, //实时页
        name: this.inputPart,
        bookNo: this.Billcategory,
      })
      if (res.ok) {
        if (res.data.total > 0) {
          this.PartGetListData = res.data
        } else {
          this.$Tools.LayerMsgErr('没有数据')
          this.PartGetListData = {
            list: [],
            total: 0,
          }
        }
      }
    },
    PartTypeGetListDataTcChange(name) {
      //分项拼接
      let res = ''
      for (var i = 0; i < name.length; i++) {
        res = name[i].name
        this.PartTypeTypeidTc = name[i].id
      }
      if (res == this.PartinputTc) {
        return
      }
      this.formValidator.PartinputTc = res
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
        this.PartTypeGetListDataTc = this.getTreeData(
          JSON.parse(JSON.stringify(res.data))
        ) //深拷贝数据给弹窗
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
<style lang="scss" scoped>
@import './styles/Part.scss';

.bianji {
  display: inline-block;
  width: 80px;
  text-align: left;
}
</style>
<style lang="scss">

.EquipmentSignal_tanchuang_ying {
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  left: 0;
  top: 0;
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
          overflow: auto;
          height: 50vh;
          transform: translateZ(0);
          //添加
          .Part_tcadd {
            .tanchuang_center_cen_top {
              margin-top: 5vh;
              li {
                margin-top: 1vh;
                display: flex;
                justify-content: center;
                align-items: center;
                //请选择
                .el-input {
                  width: unset !important;
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
                  vertical-align: bottom;
                  margin-left: 5px;
                }
              }
            }
          }

          //入库
          .PartInDb {
            .PartInDb_tccenter_top {
              margin-top: 5vh;
              margin-left: 60px;
              .onePartInputName {
                display: flex;


              }
              li {
                .el-input {
                  width: unset !important;
                }

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
                  width: 80px;
                  text-align: center;
                }
                .chakan {
                  width: 75%;
                  color: #00f0ff;
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
<style>

                 .kuan120{
                  display: inline-block;
               
  min-width: 80px !important;
}

</style>
