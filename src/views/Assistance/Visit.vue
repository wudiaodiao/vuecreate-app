<!--
 * @Author: your name
 * @Date: 2020-11-05 17:10:45
 * @LastEditTime: 2021-11-23 15:24:10
 * @LastEditors: Please set LastEditors
 * @Description:访客管理
 * @FilePath: \ibms\src\views\Assistance\Visit.vue
-->
<template>
  <div class="craftingassistance">
    <div class="craftingassistance_cneter">
      <div class="knowledge">
        <div
          :class="[
            'knowledge_left',
            $store.state.dtab ? 'index_off' : 'index_no'
          ]"
        >
          <div class="left_tot">
            <div class="left_tot_top">
              <span>
                <img src="../../assets/image/index/partial-menu-top.png" alt />
              </span>
              <h3>访客管理</h3>
            </div>
            <ul class="left_tot_list">
              <li
                v-trigger
                :data-sunC="itemkey"
                v-for="(item,itemkey) in $store.state.subitemData.children"
                :key="item.model.name"
                :class="[
                  item.model.name === $store.state.EnergyClick ? 'aqua' : ''
                ]"
                @click="energyClick(item)"
              >
                {{ item.model.name }}
              </li>
            </ul>
          </div>
        </div>
        <div
          :class="[
            'knowledge_right',
            $store.state.dtab ? 'index_off' : 'index_no'
          ]"
        >
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import attendanceStatistics from '@/views/Assistance/components/attendanceStatistics.vue'
export default {
  components: {
    attendanceStatistics
  },
  data() {
    return {
      flag: false,

      ss: 0,
      directoryNo: 0, //要跳转的文件号//
      parentNo: 0, //父级id
      inputValueDirectoryNo: 0, //重命名id号判断
      systemFileData: {}, //文档管理数据
      FileSearchData: [], //搜索接口
      addfileTcShow: false, //新建文件夹
      addfileTcShowType: '', //文件属性
      //  fileAttributeItem:{},//文件属性项
      moveData: [], //移动列表
      jumpNums: [], //创建父级id
      directoryNoMove: 0, //移动文件夹id号
      parentNoMove: 0, ////移动文件夹父亲
      pageSize: 13, //一页多少条
      pageIndex: 1, //实时页码
      announcementTcType: '', //添加公告的类型
      announcementTcShow: false,
      inputName: '',
      inputCenter: '', //内容
      fileName: '', //文件管理
      fileTcShow: false, //文档管理弹窗显示
      fileTcType: '',
      folderName: '', //文件夹名
      authority: '',
      selectuser: false,
      Department: '请选择', //所属部门：
      DepartmentData: [], //所属部门数据：
      DepartmentId: '',
      AnnouncementList: {},
      AnnouncementItem: {},
      photoId0: '',
      photoId1: '',
      announcementNo: 0,
      CreateUserNo: 0,
      CreateTime: '',
      craftingItem: '',
      selectuserData: {
        list: []
      },
      watchBook: [],
      watchBookItem: {},
      watchBookTcShow: false,
      watchBookTcType: '',
      watchBookInputName: '', //日志输入框
      logbookNo: 2, //日志本选中
      logbookData: {
        list: [],
        total: 0
      },
      logbookTcShow: false,
      logbookInputCenter: '', //内容
      logbookInputHdCenter: '', //交接内容
      shiftManagementData: [], //班次管理控制器--获取列表
      shiftManagementTcShow: false,
      shiftManagementTcType: 'add',
      shiftManagementInputName: '',
      shiftManagementItem: {},
      BeginTime: '',
      EndTime: '',
      areaTime: '', //选择月份
      shiftListMangent: [],
      xinqinArr: [], //星期
      schedulingEditorShow: false,
      classes: [
        {
          shift: '',
          id: 0
        },
        {
          shift: '白班',
          id: 1
        },
        {
          shift: '晚班',
          id: 2
        }
      ],
      zhi: '',
      inputVisible: false,
      inputValue: '',
      nextPnde: 0,
      FileSearchDataShow: false,
      VUE_APP_UPLOAD_URL: '',
      uploadFormFileList: [], // 确定上传文件
      fileList: []
    }
  },

  created() {},
  mounted() {},
  unmounted() {},
  computed: {},
  directives: {
    trigger: {
      //自动触发事件
      inserted(el, binging) {
        if (el.getAttribute('data-sunC') == 0) {
          el.click()
        }
      }
    }
  },
  methods: {
    energyClick(item) {
      //点击子菜单列表

      this.$store.commit('setEnergyClick', item.model.name)
      // this.energyItem = item.model.name
      if (!item.model.route) {
        return this.$Tools.LayerMsgErr('功能待开发')
      } else {
        this.$router.push({ name: item.model.route })
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
    }
  }
}
</script>
<style lang="scss" scoped>
.craftingassistance {
  user-select: none;
  .craftingassistance_cneter {
    color: #fff;

    .knowledge {
      .knowledge_left {
        opacity: 0.8;
        position: absolute;
        left: 13vw;
        height: 70.37vh;
        width: 12.4vw;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        .left_tot {
          margin: 2.41vh 1.04vw;
          .left_tot_top {
            display: flex;
            span {
              > img {
                margin-right: 4px;
                width: 12px;
                height: 12px;
              }
            }
            h3 {
              font-size: 16px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: #00f0ff;
            }
          }
          .left_tot_list {
            padding-left: 16px;
            .aqua {
              color: #00f0ff;
            }

            li {
              cursor: pointer;
              height: 40px;
              line-height: 40px;
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: #ffffff;
            }
          }
        }
      }
      .knowledge_right {
        position: absolute;

        left: 26vw;
        height: 70.37vh;
        width: 61vw;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 5px;
      }
    }
  }
}
</style>
