import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  // history: createWebHistory('/'),//import.meta.env.BASE_URL
  history: createWebHashHistory(),
  routes: [
    // {
    //   path: '/',
    //   name: 'city',
    //   component: HomeView
    // },
    {
      path: '/',
      name: '2d',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/Index/2d.vue'),
      children: [
          // 报警管理
          {
              path: 'LatestEvent', //实时报警
              name: 'LatestEvent',
              component: () => import('@/views/Event/LatestEvent.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'Event', //历史报警
              name: 'Event',
              component: () => import('@/views/Event/Event.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'Monitor', //运行监控
              name: 'Monitor',
              component: () => import('@/views/Monitor/Monitor.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          //模式控制
          {
              path: 'ControlMode', //模式配置
              name: 'ControlMode',
              component: () => import('@/views/Control/ControlMode.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'ControlCalendar', //系统日历
              name: 'ControlCalendar',
              component: () => import('@/views/Control/ControlCalendar.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },

          {
              path: 'FileSystem', //文档管理
              name: 'FileSystem',
              component: () => import('@/views/Assistance/FileSystem.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'Announcement', //公告管理
              name: 'Announcement',
              component: () => import('@/views/Assistance/Announcement.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'KnowledgeBase', //知识库管理
              name: 'KnowledgeBase',
              component: () => import('@/views/Assistance/KnowledgeBase.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              },
              children: [{
                      path: 'KnowledgeCategory', //知识库类别
                      name: 'KnowledgeCategory',
                      component: () => import('@/views/Assistance/components/KnowledgeBase/KnowledgeCategory.vue'),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  },
                  {
                      path: 'Knowledge', //知识库
                      name: 'Knowledge',
                      component: () => import('@/views/Assistance/components/KnowledgeBase/Knowledge.vue'),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  },
                  {
                      path: 'KnowledgeSearch', //知识库查询
                      name: 'KnowledgeSearch',
                      component: () => import('@/views/Assistance/components/KnowledgeBase/KnowledgeSearch.vue'),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  }
              ]
          },
          {
              path: 'Visit', //访客管理
              name: 'Visit',
              component: () => import('@/views/Assistance/Visit.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              },
              children: [{
                      path: 'VisitRegister', //访客登记
                      name: 'VisitRegister',
                      component: () =>
                      import(
                              '@/views/Assistance/components/Visit/VisitRegister.vue'
                          ),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  },
                  {
                      path: 'VisitRecord', //访客记录查询
                      name: 'VisitRecord',
                      component: () =>
                      import(
                              '@/views/Assistance/components/Visit/VisitRecord.vue'
                          ),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  }
              ]
          },
          {
              path: 'WxUserCheck', //人员核对
              name: 'WxUserCheck',
              component: () =>
              import('@/views/Assistance/WxUserCheck.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'OnDuty', //值班管理
              name: 'OnDuty',
              component: () => import('@/views/Assistance/OnDuty.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              },
              children: [{
                      path: 'DutyLogBook', //值班日志本
                      name: 'DutyLogBook',
                      component: () =>
                          require(
                              '@/views/Assistance/components/OnDuty/DutyLogBook.vue'
                          ),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  },
                  {
                      path: 'DutyLog', //值班日志
                      name: 'DutyLog',
                      component: () =>
                      import('@/views/Assistance/components/OnDuty/DutyLog.vue'),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  },
                  {
                      path: 'ShiftClass', //班次管理
                      name: 'ShiftClass',
                      component: () =>
                          import('@/views/Assistance/components/OnDuty/ShiftClass.vue'),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  },
                  {
                      path: 'Shift', //排班管理
                      name: 'Shift',
                      component: () =>
                          import('@/views/Assistance/components/OnDuty/Shift.vue'),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  },
                  {
                      path: 'Shiftrecord', //调班记录
                      name: 'Shiftrecord',
                      component: () =>
                          import('@/views/Assistance/components/Shiftrecord/index.vue'),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  },
                  {
                      path: 'Shiftmanage', //调班管理
                      name: 'Shiftmanage',
                      component: () =>
                      import('@/views/Assistance/components/Shiftmanage/index.vue'),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  },
                  {
                      path: 'ShiftCheck', //考勤统计
                      name: 'ShiftCheck',
                      component: () =>
                      import('@/views/Assistance/components/OnDuty/ShiftCheck.vue'),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  },
                  // {
                  //     path: 'Operation', //操作证
                  //     name: 'Operation',
                  //     component: () =>
                  //         require([
                  //             '@/views/Assistance/components/OnDuty/Operation'
                  //         ], ()),
                  //     meta: {
                  //         keepAlive: false,
                  //         notAuth: true
                  //     }
                  // },
              ]
          },

          //设备管理
          {
              path: 'Equipment', //卡片
              name: 'Equipment',
              component: () => import('@/views/Equipment/Equipment.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },

          {
              path: 'EquipmentCard', //档案
              name: 'EquipmentCard',
              component: () =>
              import('@/views/Equipment/EquipmentCard.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'EquipmentType', //类别
              name: 'EquipmentType',
              component: () =>
              import('@/views/Equipment/EquipmentType.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },

          //物资
          {
              path: 'PartType', //物资类别
              name: 'PartType',
              component: () => import('@/views/Part/PartType.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },

          {
              path: 'Part', //物资
              name: 'Part',
              component: () => import('@/views/Part/Part.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          
          {
              path: 'PartOut', //出库审批
              name: 'PartOut',
              component: () => import('@/views/Part/PartOut.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'PartInOut', //出入库查询
              name: 'PartInOut',
              component: () => import('@/views/Part/PartInOut.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'PartZW', //总务物资
              name: 'PartZW',
              component: () => import('@/views/Part/PartZW.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          
          {
              path: 'PartOutZW', //总务审批
              name: 'PartOutZW',
              component: () => import('@/views/Part/PartOutZW.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'PartInOutZW', //总务查询
              name: 'PartInOutZW',
              component: () => import('@/views/Part/PartInOutZW.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          //维保管理
          {
              path: 'MyWorkOrder', //我的报单
              name: 'MyWorkOrder',
              component: () => import('@/views/WorkOrder/MyWorkOrder.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'WorkOrderToConfirm', //工单确认
              name: 'WorkOrderToConfirm',
              component: () => import('@/views/WorkOrder/WorkOrderToConfirm.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          //维保管理
          {
              path: 'WorkOrderProcessing', //工单处理
              name: 'WorkOrderProcessing',
              component: () => import('@/views/WorkOrder/WorkOrderProcessing.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          //维保管理
          {
              path: 'WorkOrderSupervision', //工单监管
              name: 'WorkOrderSupervision',
              component: () => import('@/views/WorkOrder/WorkOrderSupervision.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'WorkOrderSubType', //工单子类
              name: 'WorkOrderSubType',
              component: () =>
              import('@/views/WorkOrder/WorkOrderSubType.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'WorkOrderQuery', //工单查询
              name: 'WorkOrderQuery',
              component: () =>
              import('@/views/WorkOrder/WorkOrderQuery.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'pmManagement', //保养管理
              name: 'pmManagement',
              component: () =>
              import('@/views/WorkOrder/pmManagement.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              },
              children: [{
                      path: 'MaintainPlan',
                      name: 'MaintainPlan',
                      component: () =>
                      import('@/views/WorkOrder/MaintainPlan.vue'),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  },
                  {
                      path: 'MaintainOrder', //保养记录
                      name: 'MaintainOrder',
                      component: () =>
                      import('@/views/WorkOrder/MaintainOrder.vue'),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  }
              ]
          },
          {
              path: 'patrolManagement', //巡检
              name: 'patrolManagement',
              component: () =>
              import('@/views/WorkOrder/patrolManagement.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              },
              children: [{
                      path: 'InspectionPlan',
                      name: 'InspectionPlan',
                      component: () =>
                      import('@/views/WorkOrder/InspectionPlan.vue'),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  },
                  {
                      path: 'InspectionTask', //巡检记录
                      name: 'InspectionTask',
                      component: () =>
                      import('@/views/WorkOrder/InspectionTask.vue'),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  }
              ]
          },
  {
              path: 'patrolDefend', //保卫巡检
              name: 'patrolDefend',
              component: () =>
              import('@/views/Patrol/index.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              },
              children: [{  //巡检项管理
                      path: 'PatrolItem',
                      name: 'PatrolItem',
                      component: () =>
                      import('@/views/Patrol/PatrolItem.vue'),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  },
                  {
                      path: 'PatrolProject', //巡检项目管理
                      name: 'PatrolProject',
                      component: () =>
                      import('@/views/Patrol/PatrolProject.vue'),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  },
                  {
                      path: 'PatrolPlan',//巡检计划
                      name: 'PatrolPlan',
                      component: () =>
                      import('@/views/Patrol/InspectionPlan.vue'),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  },
                  {
                      path: 'PatrolTask', //巡检记录
                      name: 'PatrolTask',
                      component: () =>
                      import('@/views/Patrol/InspectionTask.vue'),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  }
              ]
          },
          //报表管理
          {
              path: 'MonitorReport', //设备运行报表
              name: 'MonitorReport',
              component: () =>
              import('@/views/ReportManagement/MonitorReport.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'MonitorChart', //设备运行曲线
              name: 'MonitorChart',
              component: () =>
                  import('@/views/ReportManagement/MonitorChart.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'PerfectRatioOfEquipment', //设备完好率报表
              name: 'PerfectRatioOfEquipment',
              component: () =>
                  import('@/views/ReportManagement/PerfectRatioOfEquipment.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'RepairTimeliness', //设备维修及时率
              name: 'RepairTimeliness',
              component: () =>
              import('@/views/ReportManagement/RepairTimeliness.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'EquipmentAvailabilityReport', //设备可用率报表
              name: 'EquipmentAvailabilityReport',
              component: () =>
              import('@/views/ReportManagement/EquipmentAvailabilityReport.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'Performance', //人员绩效报表
              name: 'Performance',
              component: () =>
              import('@/views/ReportManagement/Performance.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'ControlReport', //设备控制报表
              name: 'ControlReport',
              component: () =>
              import('@/views/ReportManagement/ControlReport.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },

          //系统配置
          {
              path: 'UserSelf', //个人信息
              name: 'UserSelf',
              component: () =>
              import('@/views/SystemConfiguration/UserSelf.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'Project', //项目信息
              name: 'Project',
              component: () =>
              import('@/views/SystemConfiguration/Project.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'Operation', //操作日志
              name: 'Operation',
              component: () =>
              import('@/views/SystemConfiguration/Operation.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'MonitorEdit', //运行监控配置
              name: 'MonitorEdit',
              component: () =>
              import('@/views/SystemConfiguration/MonitorEdit.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'Department', //部门管理
              name: 'Department',
              component: () =>
              import('@/views/SystemConfiguration/Department.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'Area', //地点管理
              name: 'Area',
              component: () =>
              import('@/views/SystemConfiguration/Area.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'Role', //角色管理
              name: 'Role',
              component: () =>
              import('@/views/SystemConfiguration/Role.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              path: 'User', //用户管理
              name: 'User',
              component: () =>
              import('@/views/SystemConfiguration/User.vue'),
              meta: {
                  keepAlive: false,
                  notAuth: true
              }
          },
          {
              redirect: "Electricity/ElectricityReport", //默认到子路由的第一个路由
              path: "Electricity", //用电管理
              name: "Electricity",
              component: () => import("@/views/Energy/Electricity/Electricity.vue"),
              meta: {
                  keepAlive: false,
                  notAuth: true
              },
              children: [
                  {
                      path: "ElectricityReport", //电表报表
                      name: "ElectricityReport",
                      component: () => import("@/views/Energy/Electricity/ElectricityReport.vue"),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  },
                  {
                      path: "ElectricityAreaReport", //区域用电报表
                      name: "ElectricityAreaReport",
                      component: () => import("@/views/Energy/Electricity/ElectricityAreaReport.vue"),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  },
                  {
                      path: "ElectricityEnergyCategory", //用电分项
                      name: "ElectricityEnergyCategory",
                      component: () => import("@/views/Energy/Electricity/ElectricityCategory.vue"),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  }, {
                      path: "ElectricityEnergyMeter", //电表管理
                      name: "ElectricityEnergyMeter",
                      component: () => import("@/views/Energy/Electricity/ElectricityMeter.vue"),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  }
              ]
          },
          //用水管理
          {
              path: "Water", //用水管理
              name: "Water",
              redirect: "Water/WaterReport", //默认到子路由的第一个路由
              component: () => import("@/views/Energy/Water/Water.vue"),
              meta: {
                  keepAlive: false,
                  notAuth: true
              },
              children: [
                  {
                      path: "WaterReport", //水表报表
                      name: "WaterReport",
                      component: () => import("@/views/Energy/Water/WaterReport.vue"),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  }, 
                  {
                      path: "WaterAreaReport", //区域用水报表
                      name: "WaterAreaReport",
                      component: () => import("@/views/Energy/Water/WaterAreaReport.vue"),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  },
                  {
                      path: "WaterEnergyCategory", //用水分项
                      name: "WaterEnergyCategory",
                      component: () => import("@/views/Energy/Water/WaterCategory.vue"),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  },
                  {
                      path: "WaterEnergyMeter", //水表管理
                      name: "WaterEnergyMeter",
                      component: () => import("@/views/Energy/Water/WaterMeter.vue"),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  }
              ]
          },
          //用气管理
          {
              path: "Gas", //用气管理
              name: "Gas",
              redirect: "Gas/GasReport", //默认到子路由的第一个路由
              component: () => import("@/views/Energy/Gas/Gas.vue"),
              meta: {
                  keepAlive: false,
                  notAuth: true
              },
              children: [
                  {
                      path: "GasReport", //气表报表
                      name: "GasReport",
                      component: () => import("@/views/Energy/Gas/GasReport.vue"),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  },
                  {
                      path: "GasAreaReport", //区域用气报表
                      name: "GasAreaReport",
                      component: () => import("@/views/Energy/Gas/GasAreaReport.vue"),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  },
                  {
                      path: "GasEnergyCategory", //用气分项
                      name: "GasEnergyCategory",
                      component: () => import("@/views/Energy/Gas/GasCategory.vue"),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  },
                  {
                      path: "GasEnergyMeter", //气表管理
                      name: "GasEnergyMeter",
                      component: () => import("@/views/Energy/Gas/GasMeter.vue"),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  }
              ]
          },
          //热量管理
          {
              path: "Heat", //热量管理
              name: "Heat",
              redirect: "Heat/HeatReport", //默认到子路由的第一个路由
              component: () => import("@/views/Energy/Heat/Heat.vue"),
              meta: {
                  keepAlive: false,
                  notAuth: true
              },
              children: [
                  {
                      path: "HeatReport", //热量表报表
                      name: "HeatReport",
                      component: () => import("@/views/Energy/Heat/HeatReport.vue"),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  }, 
                  {
                      path: "HeatAreaReport", //区域用热报表
                      name: "HeatAreaReport",
                      component: () => import("@/views/Energy/Heat/HeatAreaReport.vue"),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  },
                  {
                      path: "HeatEnergyCategory", //用热量分项
                      name: "HeatEnergyCategory",
                      component: () => import("@/views/Energy/Heat/HeatCategory.vue"),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  },
                  {
                      path: "HeatEnergyMeter", //热量表管理
                      name: "HeatEnergyMeter",
                      component: () => import("@/views/Energy/Heat/HeatMeter.vue"),
                      meta: {
                          keepAlive: false,
                          notAuth: true
                      }
                  }
              ]
          }
      ]
    }
  ]
})

export default router
