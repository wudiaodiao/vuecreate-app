// import Vue from 'vue'
// import Vuex from 'vuex'
// import persistedState from "vuex-persistedstate";
// import axios from 'axios'
// Vue.use(Vuex)
import "../js/api/config"
import { defineStore } from 'pinia'

interface CopyIdName {
  id: string;
  layername: string;
}

interface State {
  token: string,
  informationShow: boolean,
  itemItem: string, //菜单项
  subItem: string, //子菜单
  subitemData: string[],
  PatrolTask: string[],
  checked: boolean, //记住密码
  EnergyClick: string, //能耗菜单列表
  modelMode: string,
  InfolistData: any,
  dtab: boolean, //右击事件
  shiftArr: string[],
  shiftNo: string,
  categoryActiveId: string,
  equipmentActiveId: string,
  user: any,//用户信息
  pathname: string,
  center_p: string[],
  alarmCount: number,
  monitorNo: number,
  dragBgShow: boolean,
  refreshBuild: boolean, //刷新模型
  copyIdLName: CopyIdName, // 拷贝的模型id和layername
  indexItemShow: boolean,
  userGetUserRole: any,
  Menu: string[],
  nodeNo: string,
  nodePNo: string,
  linkage: any,
  urlParameter: any
}

export const useAuthStore = defineStore('AuthStore', {
  state: (): State => {
    return {
    token: '',
    informationShow: false,
    itemItem: '', //菜单项
    subItem: '', //子菜单
    subitemData: [], //子菜单数据
    PatrolTask: [],
    checked: false, //记住密码
    EnergyClick: '用电分项', //能耗菜单列表
    modelMode: '2D',
    InfolistData: {},
    dtab: false, //右击事件
    shiftArr: [],
    shiftNo: '',
    categoryActiveId: '',
    equipmentActiveId: '',
    user: {},//用户信息
    pathname: '',
    center_p: [],
    alarmCount: 0,
    monitorNo: -1,
    dragBgShow: false,
    refreshBuild: false, //刷新模型
    copyIdLName: {id:'',layername:''}, // 拷贝的模型id和layername
    indexItemShow: true,
    userGetUserRole: {},
    Menu: [],
    nodeNo: '',
    nodePNo: '',
    linkage: {},
    urlParameter: {}
    }
  },
  actions: {

    setLinkage(state: { linkage: any }, val: any) {
      state.linkage = val

    },
    setNodePno(state: { nodePNo: any }, val: any) {
      state.nodePNo = val

    },
    setNodeno(state: { nodeNo: any }, val: any) {
      state.nodeNo = val

    },
    setMenu(state: { Menu: any }, val: any) {
      //权限
      state.Menu = val
    },
    setUserGetUserRole(state: { userGetUserRole: { resList: any; resMonitors: any } }, val: { menuPrivilege: any; resMonitors: any }) {
      //权限
      state.userGetUserRole = {resList: val.menuPrivilege,resMonitors:val.resMonitors}
    },
    setindexItemShow(state: { indexItemShow: any }, val: any) {


      state.indexItemShow = val
    },
    setLocationPathname(state: { pathname: any }, val: any) {


      state.pathname = val
    },
    setUser(state: { user: any }, val: any) {
      state.user = val
    },
    setequipmentActiveId(state: { equipmentActiveId: any }, val: any) {
      state.equipmentActiveId = val
    },
    setCategoryActiveId(state: { categoryActiveId: any }, val: any) {
      state.categoryActiveId = val
    },
    setShiftArr(state: { shiftArr: any }, val: any) {
      state.shiftArr = val
    },
    setShiftObj(state: { shiftNo: any; shiftArr: any[] }, val: { key: any; value: any[] }) {

      if (state.shiftNo == val.key && state.shiftArr.length < 1) {

        return state.shiftArr.push(val)
      }
      if (state.shiftNo == val.key) {
        for (var i in state.shiftArr) {
          if (state.shiftArr[i].key == state.shiftNo) {
            let whether = state.shiftArr[i].value.findIndex((item: { key: any }) => item.key == val.value[0].key)
            if (whether === -1) {

              state.shiftArr[i].value.push(val.value[0]);
            } else {



              state.shiftArr[i].value[whether] = val.value[0]

            }
          }
        }
        state.shiftNo = val.key
      } else {



        //用于找出第一个符合条件的数组成员，如果没有找到返回undefined
        let index = state.shiftArr.findIndex((item: { key: any }) => item.key == val.key)

        if (index === -1) {

          state.shiftArr.push(val)

        } else {

          for (var s in state.shiftArr) {
            if (state.shiftArr[s].key == val.key) {

              let whether = state.shiftArr[s].value.findIndex((item: { key: any }) => item.key == val.value[0].key)
              if (whether === -1) {
                state.shiftArr[s].value.push(val.value[0]);
              } else {
                state.shiftArr[s].value[whether] = val.value[0]
              }

            }
          }
        }

        state.shiftNo = val.key
      }



    },
    setDtab(state: { dtab: any }, val: any) {
      state.dtab = val
    },
    setToken(state: { token: any }, val: any) {
      state.token = val
      window.ApiToken && window.ApiToken.set(val)
    },
    setInformationShow(state: { informationShow: any }, val: any) {
      state.informationShow = val
    },
    setItem(state: { itemItem: any }, val: any) {
      state.itemItem = val
    },
    setSubItem(state: { subItem: any }, val: any) {
      state.subItem = val
    },
    checked(state: { checked: any }, val: any) {
      state.checked = val
    },
    subitemData(state: { subitemData: any }, val: any) {
      state.subitemData = val
    },
    PatrolTask(state: { PatrolTask: any }, val: any) {
      state.PatrolTask = val
    },
    setEnergyClick(state: { EnergyClick: any }, val: any) {
      state.EnergyClick = val
    },
    setModelMode(state: { modelMode: any }, val: any) {
      state.modelMode = val
    },
    setInfolistData(state: { InfolistData: any }, val: any) {
      state.InfolistData = val
    },
    setCenterP(state: { center_p: any }, val: any) {
      state.center_p = val
    },
    setAlarmCount(state: { alarmCount: any }, val: any) {
      state.alarmCount = val
    },
    setMonitorNo(state: { monitorNo: any }, val: any) {
      state.monitorNo = val
    },
    setRefreshBuild(state: { refreshBuild: boolean | null }, val: any) {
      if(val){
        state.refreshBuild = state.refreshBuild ? false: true
      }else{
        state.refreshBuild = state.refreshBuild ? false : state.refreshBuild == false ? null : false
      }
    },
    setCopyIdLName(state: { copyIdLName: any }, val: any) {
      state.copyIdLName = val
    }
  }
})
