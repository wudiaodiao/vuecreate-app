import {
	get,
	exportGet1,
	post,
	exportPost,
	exportGet,
	exportGetFile,
	exportGetFileBlob,
	UploadPost,
	downPost,
	Delete
} from './index'

// 对Url Query参数进行编码
function encodeQuery(obj: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) {
	const arr = [];
	if (obj) {
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				const value = obj[key];
				if (value == null) continue;
				arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
			}
		}
	}
	return arr.join('&');
}
//显示图片
const ImageGetImg = `${window.ApiFileURL}api/Image/GetThumbnailImg/`
const MMS = {
		Auth: {
			Login: (e: any) => get('api/Auth/Login', e),
			FreeLogin: (e: any) => get('api/Auth/FreeLogin', e),
			// 退出登录
			Logout: (e: any) => get('api/Auth/Logout', e),
			//菜单
			GetTree: (e: any) => get('api/Menu/GetTree', e)
		},
		Area: {
			GetAllList: (e: any) => get('api/Area/GetAllList', e),
			Add: (e: any) => post('api/Area/Add', e),
			AreaQrCode: (e: any) =>exportGet1('api/Area/QrCode', e),
			Delete: (e: any) => get('api/Area/Delete', e),
			Update: (e: any) => post('api/Area/Update', e),
			GetInspectionList: (e: any) => get('api/Area/GetInspectionList', e),
			AddInspection: (e: any) => post('api/Area/AddInspection', e),
			DeleteInspection: (e: any) => get('api/Area/DeleteInspection', e),
			UpdateInspection: (e: any) => post('api/Area/UpdateInspection', e),
			ImportArea: (e: any) => post('api/Area/ImportArea', e),
			ImportInspection: (e: any) => post('api/Area/ImportInspection', e),
		},
		Announcement: {
			//公告管理控制器
			//获取列表
			GetList: (e: any) => get('api/Announcement/GetList', e),
			//删除公告
			Delete: (e: any) => get('api/Announcement/Delete', e),
			//编辑公告
			Update: (e: any) => post('api/Announcement/Update', e),
			//添加公告
			Add: (e: any) => post('api/Announcement/Add', e)
		},
		BimProperty: {

			//获取BIM

			Resource: (e: any) => get('api/BimProperty/Resource', e),
			//获取BIM属性列表
			PropertyList: (e: any) => get('api/BimProperty/PropertyList', e),
			//获取设备属于哪个楼层

			GetFloor: (e: any) => get('api/BimProperty/GetFloor', e),
			//获取模袋云-三维运行监控树
			GetInitTree: (e: any) => get('api/BimProperty/GetInitTree', e),
			//获取专业
			GetMajorExcel: (e: any) =>
				exportPost('api/BimProperty/GetMajorExcel', e)
		},
		Camera: {
			GetModel: (e: any) => get('api/Camera/GetModel', e),
			//获取摄像头列表
			GetList: (e: any) => get('api/Camera/GetList', e)
		},
		ControlMode: {
			GetList: (e: any) => get('api/ControlMode/GetList', e),
			//删除
			Delete: (e: any) => get('api/ControlMode/Delete', e),
			//添加
			Add: (e: any) => post('api/ControlMode/Add', e),
			//编辑
			
			Update: (e: any) => post('api/ControlMode/Update', e),
			//获取日期列表
			GetCalendarList: (e: any) =>
				get('api/ControlMode/GetCalendarList', e),
			//添加模式控制
			SetDayMode: (e: any) => post('api/ControlMode/SetDayMode', e),
			//批量设置
			SetDayRangeMode: (e: any) =>
				post('api/ControlMode/SetDayRangeMode', e)
		},
		ControlModeItem: {
			//获取模式控制项列表
			GetList: (e: any) =>
				get('api/ControlModeItem/GetList', e),
			//添加
			Add: (e: any) => post('api/ControlModeItem/Add', e),
			//删除
			Delete: (e: any) =>
				get('api/ControlModeItem/Delete', e),
			//编辑
			Update: (e: any) =>
				post('api/ControlModeItem/Update', e),
			GetAddSameDeviceList:(e: any)=>get('api/ControlModeItem/GetAddSameDeviceList', e),
			GetUpdateSameDeviceList:(e: any)=>get('api/ControlModeItem/GetUpdateSameDeviceList', e),
		},
		Department: {
			Get: (e: any) => get('api/Department/Get', e),
			//添加
			Add: (e: any) => post('api/Department/Add', e),
			//编辑
			Update: (e: any) => post('api/Department/Update', e),
			//删除

			Delete: (e: any) => get('api/Department/Delete', e)
		},
		DutyLogBook: {
			//值班管理控制器
			//值班日志本控制器
			GetList: (e: any) => get('api/DutyLogBook/GetList', e),
			//删除
			Delete: (e: any) => get('api/DutyLogBook/Delete', e),
			//添加
			Add: (e: any) => post('api/DutyLogBook/Add', e),
			//修改
			Update: (e: any) => post('api/DutyLogBook/Update', e)
		},
		DutyLog: {
			//值班日志控制器
			GetList: (e: any) => get('api/DutyLog/GetList', e),
			//写日志
			Add: (e: any) => post('api/DutyLog/Add', e)
		},
		Device: {
			GetList: (e: any) => get('api/Device/GetList', e),
			
		},
		Event: {
			//报警确认
			Confirm: (e: any) => get('api/Event/Confirm', e),
			//获取报警设备id
			GetLatestSmId: (e: any) => post('api/Event/GetLatestSmId', e),
			//导出报警列表
			ExportList: (e: any) => exportPost('api/Event/ExportList', e),
			GetPoint: (e: any) => get('api/Event/GetPoint', e),
			//获取实时报警
			GetLatestList: (e: any) => post('api/Event/GetLatestList', e),
			//获取历史报警列表
			GetList: (e: any) => post('api/Event/GetList', e),
			//获取历史报警图表信息
			GetChartInfo: (e: any) => post('api/Event/GetChartInfo', e),
			GetLevelChartTable: (e: any) => get('api/Event/GetLevelChartTable', e),
			//获取最新报警、恢复、确认、完成时间
			GetMaxTime: (e: any) => get('api/Event/GetMaxTime', e),
			//获取恢复、确认时间为空的数量
			GetAlarmAndUnConfirmedCount: (e: any) => get('api/Event/GetAlarmAndUnConfirmedCount', e),
		},
		EquipmentType: {
			GetList: (e: any) => get('api/EquipmentType/GetList', e),
			//添加节点
			Add: (e: any) => post('api/EquipmentType/Add', e),
			//编辑
			Update: (e: any) => post('api/EquipmentType/Update', e),
			//删除
			
			Delete: (e: any) => get('api/EquipmentType/Delete', e),
			//设备类别
			//1111111111111
			Import: (e: any) => post('api/EquipmentType/Import', e),
			Export: (e: any) =>
				exportGet('api/EquipmentType/Export', e)
		},
		Equipment: {
			//获取设备档案列表
			GetList: (e: any) => get('api/Equipment/GetList', e),
			GetAllList: (e: any) => get('api/Equipment/GetAllList', e),
			//导入设备

			ImportUser: (e: any) => post('api/Equipment/ImportUser', e),


			//删除
			Delete: (e: any) => get('api/Equipment/Delete', e),
			//添加
			Add: (e: any) => post('api/Equipment/Add', e),
			//获取设备信息
			GetModel: (e: any) => get('api/Equipment/GetModel', e),
			//修改设备
			Update: (e: any) => post('api/Equipment/Update', e),
			//获取设备关联列表
			SignalList: (e: any) => get('api/Equipment/SignalList', e),
			//添加设备关联
			EquipmentQrCode:(e: any)=>exportGet1('api/Equipment/QrCode', e),
			AddSignal: (e: any) => post('api/Equipment/AddSignal', e),
			//删除关联设备
			DelSignal: (e: any) => get('api/Equipment/DelSignal', e),
			//修改设备关联

			UpdateSignal: (e: any) =>
				get('api/Equipment/UpdateSignal', e),
			//获取维修记录、保养记录列表
			RepairOrderList: (e: any) =>
				get('api/Equipment/RepairOrderList', e),
			//设备给保养计划添加
			GetListForPlan: (e: any) =>
				get('api/Equipment/GetListForPlan', e),
			//获取2d模式下的设备MonitorNo
			Get2DMonitorNo: (e: any) =>
				get('api/Equipment/Get2DMonitorNo', e),
			//获取设备信息

			GetModelForSmId: (e: any) =>
				post('api/Equipment/GetModelForSmId', e),
			//导入设备
			ExportList: (e: any) =>
				exportGet('api/Equipment/ExportList', e),
			//获取运行参数、状态信息

			GetModelRunParam: (e: any) =>
				get('api/Equipment/GetModelRunParam', e),
			//更新二维电子地图

			UpdateMonitor: (e: any) =>
				get('api/Equipment/UpdateMonitor', e),
			//更新三维模型绑定构件

			UpdateThreeModel: (e: any) =>
				get('api/Equipment/UpdateThreeModel', e),
			//删除二维电子地图

			DeleteMonitor: (e: any) =>
				get('api/Equipment/DeleteMonitor', e),
		},
		EnergyMeter: {
			GetList: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/EnergyMeter/GetList?' + encodeQuery(e)),
			GetPagedList: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/EnergyMeter/GetPagedList?' + encodeQuery(e)),
			Add: (e: any) => post('api/EnergyMeter/Add', e),
			Update: (e: any) => post('api/EnergyMeter/Update', e),
			Delete: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/EnergyMeter/Delete?' + encodeQuery(e)),
			GetImportUrl: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => window.ApiBaseURL + 'api/EnergyMeter/Import?' + encodeQuery(e)
		},
		EnergyCategory: {
			Add: (e: any) => post('api/EnergyCategory/Add', e),
			GetList: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/EnergyCategory/GetList?' + encodeQuery(e)),
			Update: (e: any) => post('api/EnergyCategory/Update', e),
			Delete: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/EnergyCategory/Delete?' + encodeQuery(e))
		},
		EnergyReportDay: {
			GetPagedList: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/EnergyReportDay/GetPagedList?' + encodeQuery(e)),
			GetAreaDayReport: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/EnergyReportDay/GetAreaDayReport?' + encodeQuery(e)),
			GetExportUrl: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => window.ApiBaseURL + 'api/EnergyReportDay/Export?' + encodeQuery(e),
			GetAreaRatioReport: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/EnergyReportDay/GetAreaRatioReport?' + encodeQuery(e)),
			GetAreaDetailReport: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/EnergyReportDay/GetAreaDetailReport?' + encodeQuery(e)),
			GetExportAreaReportUrl: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => window.ApiBaseURL + 'api/EnergyReportDay/ExportAreaReport?' + encodeQuery(e),
		},
		FileSystem: {
			//删除
			Delete: (e: any) => get('api/FileSystem/Delete', e),

			//获取列表
			GetList: (e: any) => get('api/FileSystem/GetList', e),
			//搜索
			Search: (e: any) => get('api/FileSystem/Search', e),
			//重命名
			ReName: (e: any) => get('api/FileSystem/ReName', e),
			//新建文件夹
			AddDirectory: (e: any) =>
				get('api/FileSystem/AddDirectory', e),
			//移动，目录列表
			//
			MoveList: (e: any) => get('api/FileSystem/MoveList', e),
			//移动
			Move: (e: any) => get('api/FileSystem/Move', e),
			//上传文件
			Upload: (e: any) => UploadPost('api/FileSystem/Upload', e),
			AddFile: (e: any) => get('api/FileSystem/AddFile', e),
			Save: (e: any) => post('api/FileSystem/Save', e),
			//获取文件流
			GetFileSteam: (e: any) =>
				exportGet('api/FileSystem/GetFileSteam', e),
		},
		File: {
			//删除文件
			Delete: (e: string) => Delete('api/File/Delete/' + e),
			Info: (e: string) => exportGetFile('api/File/Info/' + e),

			//分段上传
			UploadPre: (e: any) => exportGetFile('api/File/UploadPre', e),
			//文件缩略图获取
			GetThumbnailImg: (e: any) =>
				exportGetFileBlob('api/File/GetThumbnailImg', e),

			//分段上传post
			UploadPart: (ss: string, e: any) =>
				UploadPost('api/File/UploadPart' + ss, e),
			//文件系统新建文件


			//下载
			DownFile: (e: any) => exportGetFileBlob(`api/File/DownFile/${e}`),

			//预下载post
			RequestDownloadFile: (e: any) =>
				exportGetFile(`api/File/RequestDownloadFile/${e}`),
			//分段下载
			FileDownload: (e: string) => downPost('api/File/FileDownload' + e),
			//保存文件

			//文件合并
			FileMerge: (e: string) => UploadPost('api/File/FileMerge' + e),
			//文件上传

			UploadFile: (e: any) => UploadPost('api/File/UploadFile', e)
		},
		GuiLinkage: {
			GetList: (e: any) => get('api/GuiLinkage/GetList', e)
	},
	Home: {
		GetWorkOrderStatistics:(e: any)=>get('api/Home/GetWorkOrderStatistics', e),//工单统计
		GetEquipmentAvailability: (e: any) => get('api/Home/GetEquipmentAvailability', e),//设备完好率
		GetWorkOrderTypeStatistics: (e: any) => get('api/Home/GetWorkOrderTypeStatistics', e),//工单类别统计
		GetMaintainOrderStatistics: (e: any) => get('api/Home/GetMaintainOrderStatistics', e),//保养统计

		GetWorkOrderStateStatistics: (e: any) => get('api/Home/GetWorkOrderStateStatistics', e),//工单状态
		GetWorkOrderTrendStatistics: (e: any) => get('api/Home/GetWorkOrderTrendStatistics', e),//工单趋势
		GetPartStatistics: (e: any) => get('api/Home/GetPartStatistics', e),//库房管理
		GetPatrolStatistics: (e: any) => get('api/Home/GetPatrolStatistics', e),//巡检统计

		// GetMJStatistics: e => get('api/Home/GetMJStatistics', e),
		// GetWorkOrderStatistics: e => get('api/Home/GetWorkOrderStatistics', e),
		// GetDTMonitor: e => get('api/Home/GetDTMonitor', e),
		// GetRQStatistics:e=>get('api/Home/GetRQStatistics', e)
		},
		Image: {

			//删除图片
			Delete: (e: string) => Delete('api/Image/Delete/' + e),
			//图片缩略图
			GetThumbnailImg: (e: string) =>
				exportGetFileBlob('api/Image/GetThumbnailImg/' + e),
			//图片原始图
			GetOriginalImg: (e: string) =>
				exportGetFileBlob('api/Image/GetOriginalImg/' + e),
			//图片上传
			UploadImg: (e: any) => UploadPost('api/Image/UploadImg', e)

	},
			PatrolItem: {
			Get: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/PatrolItem/Get?' + encodeQuery(e)),
			//添加知识库
			Add: (e: any) => post('api/PatrolItem/Add', e),
			//删除
			Delete: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/PatrolItem/Delete?' + encodeQuery(e)),
			//编辑
			Update: (e: any) => post('api/PatrolItem/Update', e)
	},
	PatrolProject: {
			Get: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/PatrolProject/Get?' + encodeQuery(e)),
			//添加知识库
			Add: (e: any) => post('api/PatrolProject/Add', e),
			//删除
			Delete: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/PatrolProject/Delete?' + encodeQuery(e)),
			//编辑
			Update: (e: any) => post('api/PatrolProject/Update', e)
	},
	PatrolPlan: {
			Get: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/PatrolPlan/Get?' + encodeQuery(e)),
			//添加知识库
			Add: (e: any) => post('api/PatrolPlan/Add', e),
			//删除
			Delete: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/PatrolPlan/Delete?' + encodeQuery(e)),
			//编辑
		Update: (e: any) => post('api/PatrolPlan/Update', e),
		GetTimeList: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/PatrolPlan/GetTimeList?' + encodeQuery(e)),
			AddTime: (e: any) => post('api/PatrolPlan/AddTime', e),
		UpdateTime: (e: any) => post('api/PatrolPlan/UpdateTime', e),
		RemoveTime: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/PatrolPlan/RemoveTime?' + encodeQuery(e)),
			GetTeamList: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/PatrolPlan/GetTeamList?' + encodeQuery(e)),
		AddTeam: (e: any) => post('api/PatrolPlan/AddTeam', e),
		UpdateTeam: (e: any) => post('api/PatrolPlan/UpdateTeam', e),
				RemoveTeam: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/PatrolPlan/RemoveTeam?' + encodeQuery(e)),
	},
	PatrolTask: {
			//查看巡检项
			Peek: (e: any) => get('api/PatrolTask/Getitem', e),
GetAnalyse: (e: any) =>
			get('api/PatrolTask/GetAnalyse', e),
			//导出巡检计划
			ExportList: (e: any) =>
				exportGet('api/PatrolTask/ExportList', e),

			//巡检记录控制器

			GetList: (e: any) =>
			get('api/PatrolTask/Get', e),
			GetTaskTeam: (e: any) =>
				get('api/PatrolTask/GetTaskTeam', e),
		},
		InspectionPlan: {
			//巡检计划
			GetList: (e: any) =>
				get('api/InspectionPlan/GetList', e),
			//删除
			Remove: (e: any) => get('api/InspectionPlan/Remove', e),
			//添加
			Add: (e: any) => post('api/InspectionPlan/Add', e),
			//编辑
			Update: (e: any) => post('api/InspectionPlan/Update', e),
			//获取巡检时间列表
			GetTimeList: (e: any) =>
				get('api/InspectionPlan/GetTimeList', e),
			//添加巡检时间

			AddTime: (e: any) =>
				post('api/InspectionPlan/AddTime', e),
			//删除巡检时间

			RemoveTime: (e: any) =>
				get('api/InspectionPlan/RemoveTime', e),
			//巡检计划项
			GetInspectionList: (e: any) =>
				get('api/InspectionPlan/GetInspectionList', e),
			//根据地点获取巡检项
			GetInspections: (e: any) =>
				get('api/InspectionPlan/GetInspections', e),
			//添加巡检项
			AddArea: (e: any) =>
				post('api/InspectionPlan/AddArea', e),
			//删除巡检项
			RemoveArea: (e: any) =>
				post('api/InspectionPlan/RemoveArea', e),
		},
		InspectionTask: {
			//查看巡检项
			Peek: (e: any) => get('api/InspectionTask/Peek', e),

			//导出巡检计划
			ExportList: (e: any) =>
				exportGet('api/InspectionTask/ExportList', e),

			//巡检记录控制器

			GetList: (e: any) =>
				get('api/InspectionTask/GetList', e),
		},
		KnowledgeCategory: {
			//获取列表
			GetList: (e: any) =>
				get('api/KnowledgeCategory/GetList', e),
			//添加
			Add: (e: any) => post('api/KnowledgeCategory/Add', e),
			//删除节点

			Delete: (e: any) =>
				get('api/KnowledgeCategory/Delete', e),
			//编辑
			Update: (e: any) =>
				post('api/KnowledgeCategory/Update', e),
			//知识库导出
			Export: (e: any) =>
				exportGet('api/KnowledgeCategory/Export', e),

			Import: (e: any) =>
				post('api/KnowledgeCategory/Import', e)
		},
		Knowledge: {
			//获取列表
			GetList: (e: any) => get('api/Knowledge/GetList', e),
			//添加知识库
			Add: (e: any) => post('api/Knowledge/Add', e),
			//删除
			Delete: (e: any) => get('api/Knowledge/Delete', e),
			//编辑
			Update: (e: any) => post('api/Knowledge/Update', e)
		},
		ShiftClass: {
			//班次管理控制器
			//获取列表
			GetList: (e: any) => get('api/ShiftClass/GetList', e),
			//删除
			Delete: (e: any) => get('api/ShiftClass/Delete', e),
			//添加
			Add: (e: any) => post('api/ShiftClass/Add', e),
			//编辑
			Update: (e: any) => post('api/ShiftClass/Update', e),
		},
		Shift: {
			AdjustShift: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) =>
			post('api/Shift/AdjustShift?' + encodeQuery(e)),
			//排班管理、考勤统计控制器
			GetShiftList: (e: any) => get('api/Shift/GetShiftList', e),
			//编辑排班管理
			EditShift: (e: any) => post('api/Shift/EditShift', e),
			//考勤统计
			ShiftCheck: (e: any) => get('api/Shift/ShiftCheck', e),
			//图表
			ShiftEchart: (e: any) => get('api/Shift/ShiftEchart', e),
			//导出考勤统计
			ExportShiftCheck: (e: any) =>
				exportGet('api/Shift/ExportShiftCheck', e),
			ImportShift: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; },data: any) => post('api/Shift/ImportShift?'+ encodeQuery(e), data),

		},
		ShiftRecord:{
			Get: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) =>
			get('api/ShiftRecord/Get?' + encodeQuery(e)),
		},
		MaintainPlan: {
			//保养计划
			GetList: (e: any) => get('api/MaintainPlan/GetList', e),
			//删除
			Remove: (e: any) => get('api/MaintainPlan/Remove', e),
			//工单状态


			//添加保养计划
			Add: (e: any) => post('api/MaintainPlan/Add', e),
			//编辑
			Update: (e: any) => post('api/MaintainPlan/Update', e),
			//设备列表
			GetEquipmentList: (e: any) =>
				get('api/MaintainPlan/GetEquipmentList', e),
			//删除设备
			RemoveEquipment: (e: any) =>
				get('api/MaintainPlan/RemoveEquipment', e),
			//添加设备
			AddEquipment: (e: any) =>
				get('api/MaintainPlan/AddEquipment', e),
			//保养记录
			MaintainOrderList: (e: any) =>
				get('api/MaintainPlan/MaintainOrderList', e)
		},
		Monitor: {
			//获取节点
			GetModel: (e: any) => get('api/Monitor/GetModel', e),
			GetTree: (e: any) => get('api/Monitor/GetTree', e),
			Control: (e: any) => get('api/Monitor/Control', e)
		},
		Operation: {
			//操作日志控制器
			Get: (e: any) => get('api/Operation/Get', e),
			//导出
			Export: (e: any) =>
				exportGet('api/Operation/Export', e)
		},
		PartType: {
			//类别
			GetList: (e: any) => get('api/PartType/GetList', e),
			//添加
			Add: (e: any) => post('api/PartType/Add', e),
			//修改
			Update: (e: any) => post('api/PartType/Update', e),
			//删除

			Delete: (e: any) => get('api/PartType/Delete', e),
			//导入物资类别

			Import: (e: any) => post('api/PartType/Import', e),

			Export: (e: any) => exportGet('api/PartType/Export', e)
		},
		Part: {
			//物资查询
			GetList: (e: any) => get('api/Part/GetList', e),
			//删除
			Delete: (e: any) => get('api/Part/Delete', e),
			//添加
			Add: (e: any) => post('api/Part/Add', e),
			//编辑
			Update: (e: any) => post('api/Part/Update', e),
			//出库审批列表
			GetModel: (e: any) => get('api/Part/GetModel', e),

			GetListForType: (e: any) => get('api/Part/GetListForType', e),
			//入库
			PartInDb: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => post('api/Part/PartInDb?'+encodeQuery(e), e),
			//出库
			PartOutDb: (e: any) => post('api/Part/PartOutDb', e),
			//导出
			PartExport: (e: any) => exportGet('api/Part/Export', e),

			//导入物资
			ImportPart: (e: any) => post('api/Part/ImportPart', e)
	},
			PartZW: {
			//物资查询
			GetList: (e: any) => get('api/PartZW/GetList', e),
			//删除
			// Delete: e => get('api/Part/Delete', e),
			//添加
			Add: (e: any) => post('api/PartZW/AddPartZW', e),
			//编辑
			Update: (e: any) => post('api/PartZW/UpdatePartZW', e),
			//出库审批列表
			GetModel: (e: any) => get('api/PartZW/GetModel', e),

			// GetListForType: e => get('api/Part/GetListForType', e),
			//入库
			PartInDb: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => post('api/PartZW/PartInDb?'+encodeQuery(e), e),
			//出库
			PartOutDb: (e: any) => post('api/PartZW/PartOutDb', e),
			//导出
			PartExport: (e: any) => exportGet('api/PartZW/Export', e),

			//导入物资
			ImportPart: (e: any) => post('api/PartZW/Import', e)
	},
	PartBook: {
			Get: (e: any) => get('api/PartBook/Get', e),
		},
		PartCalculate: {
			Get: (e: any) => get('api/PartCalculate/Get', e),
		},
		PartInOut: {
			GetList: (e: any) => get('api/PartInOut/GetList', e),
			//批准出库
			Approve: (e: any) => post('api/PartInOut/Approve', e),
			//获取单个物资

			//出入库查询
			GetSearchList: (e: any) =>
				get('api/PartInOut/GetSearchList', e),
				
			//获取名称
GetListByOrder: (e: any) => get('api/PartInOut/GetListByOrder', e),
			ExportSearchList: (e: any) =>
				exportGet('api/PartInOut/ExportSearchList', e),
		},
			PartInOutZW: {
			GetList: (e: any) => get('api/PartInOutZW/GetList', e),
			//批准出库
			Approve: (e: any) => post('api/PartInOutZW/Approve', e),
			//获取单个物资

			//出入库查询
			GetSearchList: (e: any) =>
				get('api/PartInOutZW/GetSearchList', e),
				
			//获取名称
GetListByOrder: (e: any) => get('api/PartInOutZW/GetListByOrder', e),
			ExportSearchList: (e: any) =>
				exportGet('api/PartInOutZW/ExportSearchList', e),
		},
		Project: {
			//Project项目控制器
			//获取项目信息
			GetModel: (e: any) => get('api/Project/GetModel', e),
			//编辑
			Update: (e: any) => post('api/Project/Update', e)
		},
		Report: {
			//设备运行报表
			MonitorReport: (e: any) => get('api/Report/MonitorReport', e),
			//设备控制报表
			ControlReport: (e: any) => get('api/Report/ControlReport', e),
			//报表管理子系统
			MonitorSubSystem: (e: any) =>
				get('api/Report/MonitorSubSystem', e),
			//报表管理设备
			MonitorDevice: (e: any) => get('api/Report/MonitorDevice', e),
			//设备运行曲线-信号列表

			MonitorSignal: (e: any) => get('api/Report/MonitorSignal', e),
			//导出设备运行报表
			ExportMonitorReport: (e: any) =>
				exportGet('api/Report/ExportMonitorReport', e),
			//导出设备运行报表
			ExportControlReport: (e: any) =>
				exportGet('api/Report/ExportControlReport', e),
			//设备运行曲线
			MonitorChart: (e: any) => get('api/Report/MonitorChart', e),
			//设备完好率报表
			PerfectRatioOfEquipment: (e: any) =>
				get('api/Report/PerfectRatioOfEquipment', e),
			//导出不可用设备报表
			ExportPerfectRatioOfEquipment: (e: any) =>
				exportGet('api/Report/ExportPerfectRatioOfEquipment', e),
			//设备可用率报表
			AvailableRateOfEquipment: (e: any) =>
				get('api/Report/AvailableRateOfEquipment', e),
			//设备维修及时率
			RepairTimeliness: (e: any) =>
				get('api/Report/RepairTimeliness', e),
			//人员效绩报表
			Performance: (e: any) => get('api/Report/Performance', e),
			//导出设备维修及时率

			ExportRepairTimeliness: (params: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }, data: any) =>exportPost('api/Report/ExportRepairTimeliness?' + encodeQuery(params), data),

			//导出人员绩效表
			ExportPerformance: (params: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }, data: any) =>
				exportPost('api/Report/ExportPerformance?' + encodeQuery(params), data)
		},
		Role: {
		  GetList: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/Role/GetList?' + encodeQuery(e))
		},
		RoleMonitor: {
		  GetTree: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/RoleMonitor/GetTree?' + encodeQuery(e)),
		  GetMonitorNos: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) =>
			get('api/RoleMonitor/GetMonitorNos?' + encodeQuery(e)),
		  Update: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }, f: any) => post('api/RoleMonitor/Update?' + encodeQuery(e), f)
		},
		Signal: {
			GetList: (e: any) => get('api/Signal/GetList', e),
			GetModel: (e: any) => get('api/Signal/GetModel', e)
		},
		SubSystem: {
			SubSysList: (e: any) => get('api/SubSystem/SubSysList', e)
		},
		User: {
			//获取用户
			GetModel: (e: any) => get('api/User/GetModel', e),
			//获取用户列表
			UserGetList: (e: any) => get('api/User/Get', e),
			//获取用户列表
			GetAll: (e: any) => get('api/User/GetAll', e),
			//修改密码
			UpdatePwd: (e: any) => get('api/User/UpdatePwd', e),
			//编辑用户
			Update: (e: any) => post('api/User/Update', e),
			Add: (e: any) => post('api/User/Add', e),
			//重置密码

			ResetPwd: (e: any) => get('api/User/ResetPwd', e),

			//权限
			GetUserRole: (e: any) => get('api/User/GetUserRole', e),

			GetListByDepartmentAndPrivilege: (e: any) => get('api/User/GetListByDepartmentAndPrivilege', e),

			ImportUser: (e: any) => post('api/User/ImportUser', e)
		},
		VisitFlow: {
			GetListByRecord: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/VisitFlow/GetListByRecord?' + encodeQuery(e))
		},
		Visitor: {
			GetModel: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/Visitor/GetModel?' + encodeQuery(e)),
			GetListByRecord: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/Visitor/GetListByRecord?' + encodeQuery(e)),
			GetUnvisitedPagedList: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) =>
				post('api/Visitor/GetUnvisitedPagedList?' + encodeQuery(e)),
			Visit: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => post('api/Visitor/Visit?' + encodeQuery(e))
		},
		VisitRecord: {
			GetModel: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/VisitRecord/GetModel?' + encodeQuery(e)),
			GetPagedList: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => post('api/VisitRecord/GetPagedList?' + encodeQuery(e)),
			ExportList: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) =>
				window.ApiBaseURL + 'api/VisitRecord/ExportList?' + encodeQuery(e)
		},
		WorkSubType: {
			//获取列表
			Get: (e: any) => get('api/WorkSubType/Get', e),
			GetByType: (e: any) => get('api/WorkSubType/GetByType', e),
			//获取列表
			Add: (e: any) => post('api/WorkSubType/Add', e),
			//获取列表
			Update: (e: any) => post('api/WorkSubType/Update', e),
			//获取列表

			Delete: (e: any) => get('api/WorkSubType/Delete', e)
		},
		Weather: {
			// 天气
			WeatherWeatherNow: (e: any) => get('api/Weather/WeatherNow', e)
		},
		WorkAssister: {
			GetListByOrder: (e: any) => get('api/WorkAssister/GetListByOrder', e)
		},
			InfoNotice: {
			Get: (e: any) => get('api/InfoNotice/Get', e)
		},
		WorkPart: {
			GetListByOrder: (e: any) => get('api/PartInOut/GetListByOrder', e)
		},
		WorkOrder: {
			EquipmentGetRepairOrderWork: (e: any) => get('api/WorkOrder/GetWorkOrderFlow', e),
			WorkOrderExportList: (e: any) => exportGet('api/WorkOrder/ExportMaintainWorkOrder', e),
			MaintainWorkOrder: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/WorkOrder/MaintainWorkOrder?'+ encodeQuery(e)),
			GetMaintainChartTrend: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/WorkOrder/GetMaintainChartTrend?'+ encodeQuery(e)),
			ExportList: (e: any) => exportGet('api/WorkOrder/ExportList', e),
			WorkOrderGetLevelChartTable: (e: any) => get('api/WorkOrder/GetLevelChartTable', e),
			WorkOrderGetDealSpanWorkOrder: (e: any) => get('api/WorkOrder/GetDealSpanWorkOrder', e),
			WorkOrderGetWorkOrderPart: (e: any) => get('api/WorkOrder/GetWorkOrderPart', e),
			WorkOrderGetRepairOrderModel: (e: any) => get('api/WorkOrder/GetRepairOrderModel', e),
			GetWorkMaxTime: (e: any) => get('api/WorkOrder/GetWorkMaxTime', e),
			GetChartTrend: (e: any) => get('api/WorkOrder/GetChartTrend', e),
			GetProcessingInfo: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/WorkOrder/GetProcessingInfo?' + encodeQuery(e)),
			GetProcessingUndispatchedPagedList: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => post('api/WorkOrder/GetProcessingUndispatchedPagedList?' + encodeQuery(e)),
			GetProcessingUndealedPagedList: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => post('api/WorkOrder/GetProcessingUndealedPagedList?' + encodeQuery(e)),
			GetProcessingDealingPagedList: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => post('api/WorkOrder/GetProcessingDealingPagedList?' + encodeQuery(e)),
			GetProcessingFinishedPagedList: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => post('api/WorkOrder/GetProcessingFinishedPagedList?' + encodeQuery(e)),
			GetSupervisionInfo: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/WorkOrder/GetSupervisionInfo?' + encodeQuery(e)),
			GetSupervisionUndispatchedPagedList: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => post('api/WorkOrder/GetSupervisionUndispatchedPagedList?' +
				encodeQuery(e)),
			GetSupervisionDealingPagedList: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => post('api/WorkOrder/GetSupervisionDealingPagedList?' + encodeQuery(e)),
			GetSupervisionFinishedPagedList: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => post('api/WorkOrder/GetSupervisionFinishedPagedList?' + encodeQuery(
				e)),
			GetMyPagedList: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => post('api/WorkOrder/GetMyPagedList?' + encodeQuery(e)),
			GetToConfirmPagedList: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => post('api/WorkOrder/GetToConfirmPagedList?' + encodeQuery(e)),
			Report: (e: any) => post('api/WorkOrder/Report', e),
			Transfer: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/WorkOrder/Transfer?' + encodeQuery(e)),
			Dispatch: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }, s: any) => post('api/WorkOrder/Dispatch?' + encodeQuery(e), s),
			Discard: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/WorkOrder/Discard?' + encodeQuery(e)),
			Urge: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/WorkOrder/Urge?' + encodeQuery(e)),
			Cancel: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/WorkOrder/Cancel?' + encodeQuery(e)),
			Confirm: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/WorkOrder/Confirm?' + encodeQuery(e)),
			UnConfirm: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/WorkOrder/UnConfirm?' + encodeQuery(e)),
			GetStateList: (e: any) =>
				get('api/WorkOrder/GetStateList', e),
			//查询
			GetSeachList: (e: any) =>
				get('api/WorkOrder/GetSeachList', e),
		},
		WxUserCheck: {
			Get: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/WxUserCheck/Get?' + encodeQuery(e)),
			ExportList: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => exportGet('api/WxUserCheck/ExportList?' + encodeQuery(e))
		}
	},
	OMS = {
		Contract: {
			GetModel: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/oms/Contract/GetModel?' + encodeQuery(e)),
		}
	},
	WX = {
		User: {
			GetModel: (e: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => get('api/wx/User/GetModel?' + encodeQuery(e)),
		}
	}
	
export default {
	ImageGetImg,
	MMS,
	OMS,
	WX
}
