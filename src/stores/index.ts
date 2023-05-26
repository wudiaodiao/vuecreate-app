// import Vue from 'vue'
// import Vuex from 'vuex'
// import persistedState from "vuex-persistedstate";
// import axios from 'axios'
// Vue.use(Vuex)


import { defineStore } from 'pinia'
import { useAuthPreferencesStore } from './auth-preferences'
import { useAuthEmailStore } from './auth-email'
import vuexStore from '@/store' // 逐步转换，见 fullUserDetails

// interface State {
//   firstName: string
//   lastName: string
//   userId: number | null
// }

export const useAuthStore = defineStore('AuthStore', {
  state: () => {
    return {
    token: '',
    informationShow: false,
    itemItem: '', //菜单项
    subItem: '', //子菜单
    subitemData: [], //子菜单数据
    PatrolTask:[],
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
    copyIdLName: {}, // 拷贝的模型id和layername
    indexItemShow: true,
    userGetUserRole: {},
    Menu: [],
    nodeNo: '',
    nodePNo: '',
    linkage: {},
    urlParameter: {},
    user:{},
    }
  },
  actions: {

    setLinkage(state, val) {
      state.linkage = val

    },
    setNodePno(state, val) {
      state.nodePNo = val

    },
    setNodeno(state, val) {
      state.nodeNo = val

    },
    setMenu(state, val) {
      //权限
      state.Menu = val
    },
    setUserGetUserRole(state, val) {
      //权限
      state.userGetUserRole = {resList: val.menuPrivilege,resMonitors:val.resMonitors}
    },
    setindexItemShow(state, val) {


      state.indexItemShow = val
    },
    setLocationPathname(state, val) {


      state.pathname = val
    },
    setUser(state, val) {
      state.user = val
    },
    setequipmentActiveId(state, val) {
      state.equipmentActiveId = val
    },
    setCategoryActiveId(state, val) {
      state.categoryActiveId = val
    },
    setShiftArr(state, val) {
      state.shiftArr = val
    },
    setShiftObj(state, val) {

      if (state.shiftNo == val.key && state.shiftArr.length < 1) {

        return state.shiftArr.push(val)
      }
      if (state.shiftNo == val.key) {
        for (var i in state.shiftArr) {
          if (state.shiftArr[i].key == state.shiftNo) {
            let whether = state.shiftArr[i].value.findIndex(item => item.key == val.value[0].key)
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
        let index = state.shiftArr.findIndex(item => item.key == val.key)

        if (index === -1) {

          state.shiftArr.push(val)

        } else {

          for (var s in state.shiftArr) {
            if (state.shiftArr[s].key == val.key) {

              let whether = state.shiftArr[s].value.findIndex(item => item.key == val.value[0].key)
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
    setDtab(state, val) {
      state.dtab = val
    },
    setToken(state, val) {
      state.token = val
      window.ApiToken && window.ApiToken.set(val)
    },
    setInformationShow(state, val) {
      state.informationShow = val
    },
    setItem(state, val) {
      state.itemItem = val
    },
    setSubItem(state, val) {
      state.subItem = val
    },
    checked(state, val) {
      state.checked = val
    },
    subitemData(state, val) {
      state.subitemData = val
    },
    PatrolTask(state, val) {
      state.PatrolTask = val
    },
    setEnergyClick(state, val) {
      state.EnergyClick = val
    },
    setModelMode(state, val) {
      state.modelMode = val
    },
    setInfolistData(state, val) {
      state.InfolistData = val
    },
    setCenterP(state, val) {
      state.center_p = val
    },
    setAlarmCount(state, val) {
      state.alarmCount = val
    },
    setMonitorNo(state, val) {
      state.monitorNo = val
    },
    setRefreshBuild(state, val) {
      if(val){
        state.refreshBuild = state.refreshBuild ? state.refreshBuild + 1 : 1
      }else{
        state.refreshBuild = state.refreshBuild ? false : state.refreshBuild == false ? null : false
      }
    },
    setCopyIdLName(state, val) {
      state.copyIdLName = val
    },
    setUser(state, val) {
      state.user = val
    },
  },
  charAt: function (pos: number): string {
    throw new Error('Function not implemented.')
  },
  charCodeAt: function (index: number): number {
    throw new Error('Function not implemented.')
  },
  concat: function (...strings: string[]): string {
    throw new Error('Function not implemented.')
  },
  indexOf: function (searchString: string, position?: number | undefined): number {
    throw new Error('Function not implemented.')
  },
  lastIndexOf: function (searchString: string, position?: number | undefined): number {
    throw new Error('Function not implemented.')
  },
  localeCompare: function (that: string): number {
    throw new Error('Function not implemented.')
  },
  match: function (regexp: string | RegExp): RegExpMatchArray | null {
    throw new Error('Function not implemented.')
  },
  replace: function (searchValue: string | RegExp, replaceValue: string): string {
    throw new Error('Function not implemented.')
  },
  search: function (regexp: string | RegExp): number {
    throw new Error('Function not implemented.')
  },
  slice: function (start?: number | undefined, end?: number | undefined): string {
    throw new Error('Function not implemented.')
  },
  split: function (separator: string | RegExp, limit?: number | undefined): string[] {
    throw new Error('Function not implemented.')
  },
  substring: function (start: number, end?: number | undefined): string {
    throw new Error('Function not implemented.')
  },
  toLowerCase: function (): string {
    throw new Error('Function not implemented.')
  },
  toLocaleLowerCase: function (locales?: string | string[] | undefined): string {
    throw new Error('Function not implemented.')
  },
  toUpperCase: function (): string {
    throw new Error('Function not implemented.')
  },
  toLocaleUpperCase: function (locales?: string | string[] | undefined): string {
    throw new Error('Function not implemented.')
  },
  trim: function (): string {
    throw new Error('Function not implemented.')
  },
  length: 0,
  substr: function (from: number, length?: number | undefined): string {
    throw new Error('Function not implemented.')
  },
  codePointAt: function (pos: number): number | undefined {
    throw new Error('Function not implemented.')
  },
  includes: function (searchString: string, position?: number | undefined): boolean {
    throw new Error('Function not implemented.')
  },
  endsWith: function (searchString: string, endPosition?: number | undefined): boolean {
    throw new Error('Function not implemented.')
  },
  normalize: function (form: 'NFC' | 'NFD' | 'NFKC' | 'NFKD'): string {
    throw new Error('Function not implemented.')
  },
  repeat: function (count: number): string {
    throw new Error('Function not implemented.')
  },
  startsWith: function (searchString: string, position?: number | undefined): boolean {
    throw new Error('Function not implemented.')
  },
  anchor: function (name: string): string {
    throw new Error('Function not implemented.')
  },
  big: function (): string {
    throw new Error('Function not implemented.')
  },
  blink: function (): string {
    throw new Error('Function not implemented.')
  },
  bold: function (): string {
    throw new Error('Function not implemented.')
  },
  fixed: function (): string {
    throw new Error('Function not implemented.')
  },
  fontcolor: function (color: string): string {
    throw new Error('Function not implemented.')
  },
  fontsize: function (size: number): string {
    throw new Error('Function not implemented.')
  },
  italics: function (): string {
    throw new Error('Function not implemented.')
  },
  link: function (url: string): string {
    throw new Error('Function not implemented.')
  },
  small: function (): string {
    throw new Error('Function not implemented.')
  },
  strike: function (): string {
    throw new Error('Function not implemented.')
  },
  sub: function (): string {
    throw new Error('Function not implemented.')
  },
  sup: function (): string {
    throw new Error('Function not implemented.')
  },
  padStart: function (maxLength: number, fillString?: string | undefined): string {
    throw new Error('Function not implemented.')
  },
  padEnd: function (maxLength: number, fillString?: string | undefined): string {
    throw new Error('Function not implemented.')
  },
  trimEnd: function (): string {
    throw new Error('Function not implemented.')
  },
  trimStart: function (): string {
    throw new Error('Function not implemented.')
  },
  trimLeft: function (): string {
    throw new Error('Function not implemented.')
  },
  trimRight: function (): string {
    throw new Error('Function not implemented.')
  },
  matchAll: function (regexp: RegExp): IterableIterator<RegExpMatchArray> {
    throw new Error('Function not implemented.')
  },
  replaceAll: function (searchValue: string | RegExp, replaceValue: string): string {
    throw new Error('Function not implemented.')
  },
  at: function (index: number): string | undefined {
    throw new Error('Function not implemented.')
  },
  [Symbol.iterator]: function (): IterableIterator<string> {
    throw new Error('Function not implemented.')
  }
})
