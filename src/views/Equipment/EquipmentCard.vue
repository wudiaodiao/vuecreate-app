<!--
 * @Author: your name
 * @Date: 2020-11-04 19:59:16
 * @LastEditTime: 2022-03-09 15:15:25
 * @LastEditors: Please set LastEditors
 * @Description:备品卡片
 * @FilePath: \ibms\src\views\Equipment\EquipmentCard.vue
-->
<template>
  <div class="Equipment public_body">
    <div class="EquipmentCard_center">
      <div :class="[
          'EquipmentCard',
          'public_page',
          $store.state.dtab ? 'index_off' : 'index_no'
        ]">
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
                  <template v-slot="{ node, data }">
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
                  <template v-slot="{ node, data }">
                    <span v-if="data.children.length==0">({{ data.model.code}})</span>
                    <span disabled>{{ data.model.name }}</span>
                    <span v-if="!node.isLeaf">({{ data.children.length }})</span>
                  </template>
                </el-cascader>
              </li>
              <li>
                 <el-button @click="
                   pageSize = 8, //一页多少条
                   pageIndex = 1, //实时页
                   inputEquipment = '',
                   inputEquipmentType = '',
                   EquipmentIdType = '',
                   floor = '',
                   floorId = '',
                   EquipmentGetList(1)
                 " type="success"
                      size="medium">
                        重置
                      </el-button>
              </li>
              <li>
                
                <el-button-group>
                  <el-button
                    type="success"
                    size="medium"
                    icon="el-icon-search"
                    @click="
  EquipmentData = { list: [], total: 0 }
                       pageIndex=1
                      EquipmentGetList()
                     
                    "
                  >查询</el-button>
                  
                  <el-button
                    type="success"
                    size="medium"
                    icon="el-icon-printer"
                    @click="exportQR()"
                  >下载</el-button>
                </el-button-group>
              </li>
            </ul>
          </div>
          <div class="EquipmentCard_center">
            <div class="EquipmentCard_kapian">
              <ul class="EquipmentCard_kapian_ul">
                <li
                  class="EquipmentCard_kapian_li_dw"
                  v-for="(itemE, Eindex) in EquipmentData.list"
                  :key="Eindex"
                >
                  <div class="limian">
                    <div class="bottom">
                      <div class="bottom_left">
                        <img src="../../assets/image/index/logo .png" alt="" style="width:60%;z-index: 999;margin-top: -5px;">
                        <qr
                        style="margin-top: -10px;"
                          :url="url"
                          :code="itemE.no"
                          :_code="202"
                        ></qr>
                      </div>
                      <div class="bottom_right">
                        <ul>
                         
                          <li>
                            <span>编码：</span>
                            <span class="line">
                              {{ itemE.code }}
                            </span>
                          </li>
                           <li>
                            <span>名称：</span>
                            <span class="line">
                              {{ itemE.name }}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div
              class="EquipmentCard_center_left"
              @click="EquipmentGetPage('previous')"
              v-show="pageIndex > 1 && this.EquipmentData.total > 8"
            >
              <img
                src="../../assets/image/index/EquipmentCard_left.png"
                alt
              />
            </div>
            <div
              class="EquipmentCard_center_right"
              @click="EquipmentGetPage('next')"
              v-show="
                Math.ceil(this.EquipmentData.total / this.pageSize) !=
                  pageIndex && this.EquipmentData.total > 8
              "
            >
              <img
                src="../../assets/image/index/EquipmentCard_right.png"
                alt
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qr from '../../components/index/qr-Code.vue'

export default {
  components: {
    qr,
  },
  data() {
    return {
      inputEquipment: '',
      inputEquipmentType: '所有',
      EquipmentTypeData: [],
      EquipmentIdType: '.', //设备类型id
      floor: '所有',
      floorId: '',
      floorlist: [], //楼层
      pageSize: 8, //一页多少条
      pageIndex: 1, //实时页码
      EquipmentData: {
        list: [],
        total: 0,
      }, //设备列表数据对象
      EquipmentDataPdf: [], //设备列表数据对象
      htmlTitle: '设备卡片', // 导出为 pdf 时的名称
      url: null,
    }
  },
  created() {},
  mounted() {
    this.url =
      window.ApiBaseURL +
      'equipmentcard.html?_code=' +
      this.$Convert.Card.equipment
    this.EquipmentTypeGetList()
    this.AreaGetAllList() //获取楼层
    this.EquipmentGetList() //默认获取所有数据
    this.EquipmentGetAllList()
  },
  methods: {
    exportQR() {
      this.$api.MMS.Equipment.EquipmentQrCode({
        name: this.inputEquipment,
        typeId: this.EquipmentIdType,
        areaId: this.floorId,
      }).then((res) => {
        // console.log(res)
        var blob = new Blob([res])
        console.log(blob)
        var a = document.createElement('a')
        a.download = '设备二维码.pdf'
        a.style.display = 'none'
        a.href = URL.createObjectURL(blob)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        this.$message({
          message: '成功',
          type: 'success',
          duration: 2 * 1000,
        })
      })
    },
    async floorlistChane(name) {
      this.pageIndex=1
      //所属部门change事件
      let res = ''
      for (var i = 0; i < name.length; i++) {
        res = name[i].name
        this.floorId = name[i].id
      }

      this.floor = res
    },
    EquipmentGetPage(type) {
      if (type == 'previous') {
        //上一页
        if (this.pageIndex <= 1) {
          this.pageIndex = 1
          this.EquipmentGetList()
        } else {
          this.pageIndex--
          this.EquipmentGetList()
        }
      } else if (type == 'next') {
        //下一页
        const totalpageIndex = Math.ceil(
          this.EquipmentData.total / this.pageSize
        ) //分多少页

        if (this.pageIndex >= totalpageIndex) {
          this.pageIndex = totalpageIndex
          this.EquipmentGetList()
        } else {
          this.pageIndex++
          this.EquipmentGetList()
        }
      }
    },
    async EquipmentGetList() {
      //获取列表
      const res = await this.$api.MMS.Equipment.GetList({
        pageSize: this.pageSize, //一页多少条
        pageIndex: this.pageIndex, //实时页
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
    async EquipmentGetAllList() {
      //获取列表
      const res = await this.$api.MMS.Equipment.GetAllList({
        name: this.inputEquipment,
        typeId: this.EquipmentIdType,
        areaId: this.floorId,
      })
      if (res.ok) {
        if (res.data.length > 0) {
          this.EquipmentDataPdf = res.data
        } else {
          this.EquipmentDataPdf = []
        }
      }
    },

    async AreaGetAllList() {
      //获取楼层
      const res = await this.$api.MMS.Area.GetAllList({})
      if (res.ok) {
        this.floorlist = res.data
        this.floorlist.unshift({
          children: undefined,
          model: {
            code: '',
            id: '.',
            name: '所有',
          },
        })
      }
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
        let data = res.data

        this.EquipmentTypeData = this.getTreeData(data)
        this.EquipmentTypeData.unshift({
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
  },
}
</script>
<style lang="scss" scoped>
@import './styles/EquipmentCard.scss';
</style>
<style lang="scss" scoped></style>
