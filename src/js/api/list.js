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
function encodeQuery(obj) {
	var arr = [];
	if (obj) {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				var value = obj[key];
				if (value == null) continue;
				arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
			}
		}
	}
	return arr.join('&');
}
//显示图片
const ImageGetImg = `${window.ApiFileURL}api/Image/GetThumbnailImg/`
var MMS = {
		Auth: {
			Login: e => get('api/Auth/Login', e),
			FreeLogin: e => get('api/Auth/FreeLogin', e),
			// 退出登录
			Logout: e => get('api/Auth/Logout', e),
			//菜单
			GetTree: e => get('api/Menu/GetTree', e)
		},
		Area: {
			GetAllList: e => get('api/Area/GetAllList', e),
			Add: e => post('api/Area/Add', e),
			AreaQrCode:e=>exportGet1('api/Area/QrCode', e),
			Delete: e => get('api/Area/Delete', e),
			Update: e => post('api/Area/Update', e),
			GetInspectionList: e => get('api/Area/GetInspectionList', e),
			AddInspection: e => post('api/Area/AddInspection', e),
			DeleteInspection: e => get('api/Area/DeleteInspection', e),
			UpdateInspection: e => post('api/Area/UpdateInspection', e),
			ImportArea: e => post('api/Area/ImportArea', e),
			ImportInspection: e => post('api/Area/ImportInspection', e),
		},
		Announcement: {
			//公告管理控制器
			//获取列表
			GetList: e => get('api/Announcement/GetList', e),
			//删除公告
			Delete: e => get('api/Announcement/Delete', e),
			//编辑公告
			Update: e => post('api/Announcement/Update', e),
			//添加公告
			Add: e => post('api/Announcement/Add', e)
		},
		BimProperty: {

			//获取BIM

			Resource: e => get('api/BimProperty/Resource', e),
			//获取BIM属性列表
			PropertyList: e => get('api/BimProperty/PropertyList', e),
			//获取设备属于哪个楼层

			GetFloor: e => get('api/BimProperty/GetFloor', e),
			//获取模袋云-三维运行监控树
			GetInitTree: e => get('api/BimProperty/GetInitTree', e),
			//获取专业
			GetMajorExcel: e =>
				exportPost('api/BimProperty/GetMajorExcel', e)
		},
		Camera: {
			GetModel: e => get('api/Camera/GetModel', e),
			//获取摄像头列表
			GetList: e => get('api/Camera/GetList', e)
		},
		ControlMode: {
			GetList: e => get('api/ControlMode/GetList', e),
			//删除
			Delete: e => get('api/ControlMode/Delete', e),
			//添加
			Add: e => post('api/ControlMode/Add', e),
			//编辑
			
			Update: e => post('api/ControlMode/Update', e),
			//获取日期列表
			GetCalendarList: e =>
				get('api/ControlMode/GetCalendarList', e),
			//添加模式控制
			SetDayMode: e => post('api/ControlMode/SetDayMode', e),
			//批量设置
			SetDayRangeMode: e =>
				post('api/ControlMode/SetDayRangeMode', e)
		},
		ControlModeItem: {
			//获取模式控制项列表
			GetList: e =>
				get('api/ControlModeItem/GetList', e),
			//添加
			Add: e => post('api/ControlModeItem/Add', e),
			//删除
			Delete: e =>
				get('api/ControlModeItem/Delete', e),
			//编辑
			Update: e =>
				post('api/ControlModeItem/Update', e),
			GetAddSameDeviceList:e=>get('api/ControlModeItem/GetAddSameDeviceList', e),
			GetUpdateSameDeviceList:e=>get('api/ControlModeItem/GetUpdateSameDeviceList', e),
		},
		Department: {
			Get: e => get('api/Department/Get', e),
			//添加
			Add: e => post('api/Department/Add', e),
			//编辑
			Update: e => post('api/Department/Update', e),
			//删除

			Delete: e => get('api/Department/Delete', e)
		},
		DutyLogBook: {
			//值班管理控制器
			//值班日志本控制器
			GetList: e => get('api/DutyLogBook/GetList', e),
			//删除
			Delete: e => get('api/DutyLogBook/Delete', e),
			//添加
			Add: e => post('api/DutyLogBook/Add', e),
			//修改
			Update: e => post('api/DutyLogBook/Update', e)
		},
		DutyLog: {
			//值班日志控制器
			GetList: e => get('api/DutyLog/GetList', e),
			//写日志
			Add: e => post('api/DutyLog/Add', e)
		},
		Device: {
			GetList: e => get('api/Device/GetList', e),
			
		},
		Event: {
			//报警确认
			Confirm: e => get('api/Event/Confirm', e),
			//获取报警设备id
			GetLatestSmId: e => post('api/Event/GetLatestSmId', e),
			//导出报警列表
			ExportList: e => exportPost('api/Event/ExportList', e),
			GetPoint: e => get('api/Event/GetPoint', e),
			//获取实时报警
			GetLatestList: e => post('api/Event/GetLatestList', e),
			//获取历史报警列表
			GetList: e => post('api/Event/GetList', e),
			//获取历史报警图表信息
			GetChartInfo: e => post('api/Event/GetChartInfo', e),
			GetLevelChartTable: e => get('api/Event/GetLevelChartTable', e),
			//获取最新报警、恢复、确认、完成时间
			GetMaxTime: e => get('api/Event/GetMaxTime', e),
			//获取恢复、确认时间为空的数量
			GetAlarmAndUnConfirmedCount: e => get('api/Event/GetAlarmAndUnConfirmedCount', e),
		},
		EquipmentType: {
			GetList: e => get('api/EquipmentType/GetList', e),
			//添加节点
			Add: e => post('api/EquipmentType/Add', e),
			//编辑
			Update: e => post('api/EquipmentType/Update', e),
			//删除
			
			Delete: e => get('api/EquipmentType/Delete', e),
			//设备类别
			//1111111111111
			Import: e => post('api/EquipmentType/Import', e),
			Export: e =>
				exportGet('api/EquipmentType/Export', e)
		},
		Equipment: {
			//获取设备档案列表
			GetList: e => get('api/Equipment/GetList', e),
			GetAllList: e => get('api/Equipment/GetAllList', e),
			//导入设备

			ImportUser: e => post('api/Equipment/ImportUser', e),


			//删除
			Delete: e => get('api/Equipment/Delete', e),
			//添加
			Add: e => post('api/Equipment/Add', e),
			//获取设备信息
			GetModel: e => get('api/Equipment/GetModel', e),
			//修改设备
			Update: e => post('api/Equipment/Update', e),
			//获取设备关联列表
			SignalList: e => get('api/Equipment/SignalList', e),
			//添加设备关联
			EquipmentQrCode:e=>exportGet1('api/Equipment/QrCode', e),
			AddSignal: e => post('api/Equipment/AddSignal', e),
			//删除关联设备
			DelSignal: e => get('api/Equipment/DelSignal', e),
			//修改设备关联

			UpdateSignal: e =>
				get('api/Equipment/UpdateSignal', e),
			//获取维修记录、保养记录列表
			RepairOrderList: e =>
				get('api/Equipment/RepairOrderList', e),
			//设备给保养计划添加
			GetListForPlan: e =>
				get('api/Equipment/GetListForPlan', e),
			//获取2d模式下的设备MonitorNo
			Get2DMonitorNo: e =>
				get('api/Equipment/Get2DMonitorNo', e),
			//获取设备信息

			GetModelForSmId: e =>
				post('api/Equipment/GetModelForSmId', e),
			//导入设备
			ExportList: e =>
				exportGet('api/Equipment/ExportList', e),
			//获取运行参数、状态信息

			GetModelRunParam: e =>
				get('api/Equipment/GetModelRunParam', e),
			//更新二维电子地图

			UpdateMonitor: e =>
				get('api/Equipment/UpdateMonitor', e),
			//更新三维模型绑定构件

			UpdateThreeModel: e =>
				get('api/Equipment/UpdateThreeModel', e),
			//删除二维电子地图

			DeleteMonitor: e =>
				get('api/Equipment/DeleteMonitor', e),
		},
		EnergyMeter: {
			GetList: e => get('api/EnergyMeter/GetList?' + encodeQuery(e)),
			GetPagedList: e => get('api/EnergyMeter/GetPagedList?' + encodeQuery(e)),
			Add: e => post('api/EnergyMeter/Add', e),
			Update: e => post('api/EnergyMeter/Update', e),
			Delete: e => get('api/EnergyMeter/Delete?' + encodeQuery(e)),
			GetImportUrl: e => window.ApiBaseURL + 'api/EnergyMeter/Import?' + encodeQuery(e)
		},
		EnergyCategory: {
			Add: e => post('api/EnergyCategory/Add', e),
			GetList: e => get('api/EnergyCategory/GetList?' + encodeQuery(e)),
			Update: e => post('api/EnergyCategory/Update', e),
			Delete: e => get('api/EnergyCategory/Delete?' + encodeQuery(e))
		},
		EnergyReportDay: {
			GetPagedList: e => get('api/EnergyReportDay/GetPagedList?' + encodeQuery(e)),
			GetAreaDayReport: e => get('api/EnergyReportDay/GetAreaDayReport?' + encodeQuery(e)),
			GetExportUrl: e => window.ApiBaseURL + 'api/EnergyReportDay/Export?' + encodeQuery(e),
			GetAreaRatioReport: e => get('api/EnergyReportDay/GetAreaRatioReport?' + encodeQuery(e)),
			GetAreaDetailReport: e => get('api/EnergyReportDay/GetAreaDetailReport?' + encodeQuery(e)),
			GetExportAreaReportUrl: e => window.ApiBaseURL + 'api/EnergyReportDay/ExportAreaReport?' + encodeQuery(e),
		},
		FileSystem: {
			//删除
			Delete: e => get('api/FileSystem/Delete', e),

			//获取列表
			GetList: e => get('api/FileSystem/GetList', e),
			//搜索
			Search: e => get('api/FileSystem/Search', e),
			//重命名
			ReName: e => get('api/FileSystem/ReName', e),
			//新建文件夹
			AddDirectory: e =>
				get('api/FileSystem/AddDirectory', e),
			//移动，目录列表
			//
			MoveList: e => get('api/FileSystem/MoveList', e),
			//移动
			Move: e => get('api/FileSystem/Move', e),
			//上传文件
			Upload: e => UploadPost('api/FileSystem/Upload', e),
			AddFile: e => get('api/FileSystem/AddFile', e),
			Save: e => post('api/FileSystem/Save', e),
			//获取文件流
			GetFileSteam: e =>
				exportGet('api/FileSystem/GetFileSteam', e),
		},
		File: {
			//删除文件
			Delete: e => Delete('api/File/Delete/' + e),
			Info: e => exportGetFile('api/File/Info/' + e),

			//分段上传
			UploadPre: e => exportGetFile('api/File/UploadPre', e),
			//文件缩略图获取
			GetThumbnailImg: e =>
				exportGetFileBlob('api/File/GetThumbnailImg', e),

			//分段上传post
			UploadPart: (ss, e) =>
				UploadPost('api/File/UploadPart' + ss, e),
			//文件系统新建文件


			//下载
			DownFile: e => exportGetFileBlob(`api/File/DownFile/${e}`),

			//预下载post
			RequestDownloadFile: e =>
				exportGetFile(`api/File/RequestDownloadFile/${e}`),
			//分段下载
			FileDownload: e => downPost('api/File/FileDownload' + e),
			//保存文件

			//文件合并
			FileMerge: e => UploadPost('api/File/FileMerge' + e),
			//文件上传

			UploadFile: e => UploadPost('api/File/UploadFile', e)
		},
		GuiLinkage: {
			GetList: e => get('api/GuiLinkage/GetList', e)
	},
	Home: {
		GetWorkOrderStatistics:e=>get('api/Home/GetWorkOrderStatistics', e),//工单统计
		GetEquipmentAvailability: e => get('api/Home/GetEquipmentAvailability', e),//设备完好率
		GetWorkOrderTypeStatistics: e => get('api/Home/GetWorkOrderTypeStatistics', e),//工单类别统计
		GetMaintainOrderStatistics: e => get('api/Home/GetMaintainOrderStatistics', e),//保养统计

		GetWorkOrderStateStatistics: e => get('api/Home/GetWorkOrderStateStatistics', e),//工单状态
		GetWorkOrderTrendStatistics: e => get('api/Home/GetWorkOrderTrendStatistics', e),//工单趋势
		GetPartStatistics: e => get('api/Home/GetPartStatistics', e),//库房管理
		GetPatrolStatistics: e => get('api/Home/GetPatrolStatistics', e),//巡检统计

		// GetMJStatistics: e => get('api/Home/GetMJStatistics', e),
		// GetWorkOrderStatistics: e => get('api/Home/GetWorkOrderStatistics', e),
		// GetDTMonitor: e => get('api/Home/GetDTMonitor', e),
		// GetRQStatistics:e=>get('api/Home/GetRQStatistics', e)
		},
		Image: {

			//删除图片
			Delete: e => Delete('api/Image/Delete/' + e),
			//图片缩略图
			GetThumbnailImg: e =>
				exportGetFileBlob('api/Image/GetThumbnailImg/' + e),
			//图片原始图
			GetOriginalImg: e =>
				exportGetFileBlob('api/Image/GetOriginalImg/' + e),
			//图片上传
			UploadImg: e => UploadPost('api/Image/UploadImg', e)

	},
			PatrolItem: {
			Get: e => get('api/PatrolItem/Get?' + encodeQuery(e)),
			//添加知识库
			Add: e => post('api/PatrolItem/Add', e),
			//删除
			Delete: e => get('api/PatrolItem/Delete?' + encodeQuery(e)),
			//编辑
			Update: e => post('api/PatrolItem/Update', e)
	},
	PatrolProject: {
			Get: e => get('api/PatrolProject/Get?' + encodeQuery(e)),
			//添加知识库
			Add: e => post('api/PatrolProject/Add', e),
			//删除
			Delete: e => get('api/PatrolProject/Delete?' + encodeQuery(e)),
			//编辑
			Update: e => post('api/PatrolProject/Update', e)
	},
	PatrolPlan: {
			Get: e => get('api/PatrolPlan/Get?' + encodeQuery(e)),
			//添加知识库
			Add: e => post('api/PatrolPlan/Add', e),
			//删除
			Delete: e => get('api/PatrolPlan/Delete?' + encodeQuery(e)),
			//编辑
		Update: e => post('api/PatrolPlan/Update', e),
		GetTimeList: e => get('api/PatrolPlan/GetTimeList?' + encodeQuery(e)),
			AddTime: e => post('api/PatrolPlan/AddTime', e),
		UpdateTime: e => post('api/PatrolPlan/UpdateTime', e),
		RemoveTime: e => get('api/PatrolPlan/RemoveTime?' + encodeQuery(e)),
			GetTeamList: e => get('api/PatrolPlan/GetTeamList?' + encodeQuery(e)),
		AddTeam: e => post('api/PatrolPlan/AddTeam', e),
		UpdateTeam: e => post('api/PatrolPlan/UpdateTeam', e),
				RemoveTeam: e => get('api/PatrolPlan/RemoveTeam?' + encodeQuery(e)),
	},
	PatrolTask: {
			//查看巡检项
			Peek: e => get('api/PatrolTask/Getitem', e),
GetAnalyse: e =>
			get('api/PatrolTask/GetAnalyse', e),
			//导出巡检计划
			ExportList: e =>
				exportGet('api/PatrolTask/ExportList', e),

			//巡检记录控制器

			GetList: e =>
			get('api/PatrolTask/Get', e),
			GetTaskTeam: e =>
				get('api/PatrolTask/GetTaskTeam', e),
		},
		InspectionPlan: {
			//巡检计划
			GetList: e =>
				get('api/InspectionPlan/GetList', e),
			//删除
			Remove: e => get('api/InspectionPlan/Remove', e),
			//添加
			Add: e => post('api/InspectionPlan/Add', e),
			//编辑
			Update: e => post('api/InspectionPlan/Update', e),
			//获取巡检时间列表
			GetTimeList: e =>
				get('api/InspectionPlan/GetTimeList', e),
			//添加巡检时间

			AddTime: e =>
				post('api/InspectionPlan/AddTime', e),
			//删除巡检时间

			RemoveTime: e =>
				get('api/InspectionPlan/RemoveTime', e),
			//巡检计划项
			GetInspectionList: e =>
				get('api/InspectionPlan/GetInspectionList', e),
			//根据地点获取巡检项
			GetInspections: e =>
				get('api/InspectionPlan/GetInspections', e),
			//添加巡检项
			AddArea: e =>
				post('api/InspectionPlan/AddArea', e),
			//删除巡检项
			RemoveArea: e =>
				post('api/InspectionPlan/RemoveArea', e),
		},
		InspectionTask: {
			//查看巡检项
			Peek: e => get('api/InspectionTask/Peek', e),

			//导出巡检计划
			ExportList: e =>
				exportGet('api/InspectionTask/ExportList', e),

			//巡检记录控制器

			GetList: e =>
				get('api/InspectionTask/GetList', e),
		},
		KnowledgeCategory: {
			//获取列表
			GetList: e =>
				get('api/KnowledgeCategory/GetList', e),
			//添加
			Add: e => post('api/KnowledgeCategory/Add', e),
			//删除节点

			Delete: e =>
				get('api/KnowledgeCategory/Delete', e),
			//编辑
			Update: e =>
				post('api/KnowledgeCategory/Update', e),
			//知识库导出
			Export: e =>
				exportGet('api/KnowledgeCategory/Export', e),

			Import: e =>
				post('api/KnowledgeCategory/Import', e)
		},
		Knowledge: {
			//获取列表
			GetList: e => get('api/Knowledge/GetList', e),
			//添加知识库
			Add: e => post('api/Knowledge/Add', e),
			//删除
			Delete: e => get('api/Knowledge/Delete', e),
			//编辑
			Update: e => post('api/Knowledge/Update', e)
		},
		ShiftClass: {
			//班次管理控制器
			//获取列表
			GetList: e => get('api/ShiftClass/GetList', e),
			//删除
			Delete: e => get('api/ShiftClass/Delete', e),
			//添加
			Add: e => post('api/ShiftClass/Add', e),
			//编辑
			Update: e => post('api/ShiftClass/Update', e),
		},
		Shift: {
			AdjustShift: e =>
			post('api/Shift/AdjustShift?' + encodeQuery(e)),
			//排班管理、考勤统计控制器
			GetShiftList: e => get('api/Shift/GetShiftList', e),
			//编辑排班管理
			EditShift: e => post('api/Shift/EditShift', e),
			//考勤统计
			ShiftCheck: e => get('api/Shift/ShiftCheck', e),
			//图表
			ShiftEchart: e => get('api/Shift/ShiftEchart', e),
			//导出考勤统计
			ExportShiftCheck: e =>
				exportGet('api/Shift/ExportShiftCheck', e),
			ImportShift: (e,data) => post('api/Shift/ImportShift?'+ encodeQuery(e), data),

		},
		ShiftRecord:{
			Get: e =>
			get('api/ShiftRecord/Get?' + encodeQuery(e)),
		},
		MaintainPlan: {
			//保养计划
			GetList: e => get('api/MaintainPlan/GetList', e),
			//删除
			Remove: e => get('api/MaintainPlan/Remove', e),
			//工单状态


			//添加保养计划
			Add: e => post('api/MaintainPlan/Add', e),
			//编辑
			Update: e => post('api/MaintainPlan/Update', e),
			//设备列表
			GetEquipmentList: e =>
				get('api/MaintainPlan/GetEquipmentList', e),
			//删除设备
			RemoveEquipment: e =>
				get('api/MaintainPlan/RemoveEquipment', e),
			//添加设备
			AddEquipment: e =>
				get('api/MaintainPlan/AddEquipment', e),
			//保养记录
			MaintainOrderList: e =>
				get('api/MaintainPlan/MaintainOrderList', e)
		},
		Monitor: {
			//获取节点
			GetModel: e => get('api/Monitor/GetModel', e),
			GetTree: e => get('api/Monitor/GetTree', e),
			Control: e => get('api/Monitor/Control', e)
		},
		Operation: {
			//操作日志控制器
			Get: e => get('api/Operation/Get', e),
			//导出
			Export: e =>
				exportGet('api/Operation/Export', e)
		},
		PartType: {
			//类别
			GetList: e => get('api/PartType/GetList', e),
			//添加
			Add: e => post('api/PartType/Add', e),
			//修改
			Update: e => post('api/PartType/Update', e),
			//删除

			Delete: e => get('api/PartType/Delete', e),
			//导入物资类别

			Import: e => post('api/PartType/Import', e),

			Export: e => exportGet('api/PartType/Export', e)
		},
		Part: {
			//物资查询
			GetList: e => get('api/Part/GetList', e),
			//删除
			Delete: e => get('api/Part/Delete', e),
			//添加
			Add: e => post('api/Part/Add', e),
			//编辑
			Update: e => post('api/Part/Update', e),
			//出库审批列表
			GetModel: e => get('api/Part/GetModel', e),

			GetListForType: e => get('api/Part/GetListForType', e),
			//入库
			PartInDb: e => post('api/Part/PartInDb?'+encodeQuery(e), e),
			//出库
			PartOutDb: e => post('api/Part/PartOutDb', e),
			//导出
			PartExport: e => exportGet('api/Part/Export', e),

			//导入物资
			ImportPart: e => post('api/Part/ImportPart', e)
	},
			PartZW: {
			//物资查询
			GetList: e => get('api/PartZW/GetList', e),
			//删除
			// Delete: e => get('api/Part/Delete', e),
			//添加
			Add: e => post('api/PartZW/AddPartZW', e),
			//编辑
			Update: e => post('api/PartZW/UpdatePartZW', e),
			//出库审批列表
			GetModel: e => get('api/PartZW/GetModel', e),

			// GetListForType: e => get('api/Part/GetListForType', e),
			//入库
			PartInDb: e => post('api/PartZW/PartInDb?'+encodeQuery(e), e),
			//出库
			PartOutDb: e => post('api/PartZW/PartOutDb', e),
			//导出
			PartExport: e => exportGet('api/PartZW/Export', e),

			//导入物资
			ImportPart: e => post('api/PartZW/Import', e)
	},
	PartBook: {
			Get: e => get('api/PartBook/Get', e),
		},
		PartCalculate: {
			Get: e => get('api/PartCalculate/Get', e),
		},
		PartInOut: {
			GetList: e => get('api/PartInOut/GetList', e),
			//批准出库
			Approve: e => post('api/PartInOut/Approve', e),
			//获取单个物资

			//出入库查询
			GetSearchList: e =>
				get('api/PartInOut/GetSearchList', e),
				
			//获取名称
GetListByOrder: e => get('api/PartInOut/GetListByOrder', e),
			ExportSearchList: e =>
				exportGet('api/PartInOut/ExportSearchList', e),
		},
			PartInOutZW: {
			GetList: e => get('api/PartInOutZW/GetList', e),
			//批准出库
			Approve: e => post('api/PartInOutZW/Approve', e),
			//获取单个物资

			//出入库查询
			GetSearchList: e =>
				get('api/PartInOutZW/GetSearchList', e),
				
			//获取名称
GetListByOrder: e => get('api/PartInOutZW/GetListByOrder', e),
			ExportSearchList: e =>
				exportGet('api/PartInOutZW/ExportSearchList', e),
		},
		Project: {
			//Project项目控制器
			//获取项目信息
			GetModel: e => get('api/Project/GetModel', e),
			//编辑
			Update: e => post('api/Project/Update', e)
		},
		Report: {
			//设备运行报表
			MonitorReport: e => get('api/Report/MonitorReport', e),
			//设备控制报表
			ControlReport: e => get('api/Report/ControlReport', e),
			//报表管理子系统
			MonitorSubSystem: e =>
				get('api/Report/MonitorSubSystem', e),
			//报表管理设备
			MonitorDevice: e => get('api/Report/MonitorDevice', e),
			//设备运行曲线-信号列表

			MonitorSignal: e => get('api/Report/MonitorSignal', e),
			//导出设备运行报表
			ExportMonitorReport: e =>
				exportGet('api/Report/ExportMonitorReport', e),
			//导出设备运行报表
			ExportControlReport: e =>
				exportGet('api/Report/ExportControlReport', e),
			//设备运行曲线
			MonitorChart: e => get('api/Report/MonitorChart', e),
			//设备完好率报表
			PerfectRatioOfEquipment: e =>
				get('api/Report/PerfectRatioOfEquipment', e),
			//导出不可用设备报表
			ExportPerfectRatioOfEquipment: e =>
				exportGet('api/Report/ExportPerfectRatioOfEquipment', e),
			//设备可用率报表
			AvailableRateOfEquipment: e =>
				get('api/Report/AvailableRateOfEquipment', e),
			//设备维修及时率
			RepairTimeliness: e =>
				get('api/Report/RepairTimeliness', e),
			//人员效绩报表
			Performance: e => get('api/Report/Performance', e),
			//导出设备维修及时率

			ExportRepairTimeliness: (params, data) =>exportPost('api/Report/ExportRepairTimeliness?' + encodeQuery(params), data),

			//导出人员绩效表
			ExportPerformance: (params, data) =>
				exportPost('api/Report/ExportPerformance?' + encodeQuery(params), data)
		},
		Role: {
		  GetList: e => get('api/Role/GetList?' + encodeQuery(e))
		},
		RoleMonitor: {
		  GetTree: e => get('api/RoleMonitor/GetTree?' + encodeQuery(e)),
		  GetMonitorNos: e =>
			get('api/RoleMonitor/GetMonitorNos?' + encodeQuery(e)),
		  Update: (e, f) => post('api/RoleMonitor/Update?' + encodeQuery(e), f)
		},
		Signal: {
			GetList: e => get('api/Signal/GetList', e),
			GetModel: e => get('api/Signal/GetModel', e)
		},
		SubSystem: {
			SubSysList: e => get('api/SubSystem/SubSysList', e)
		},
		User: {
			//获取用户
			GetModel: e => get('api/User/GetModel', e),
			//获取用户列表
			UserGetList: e => get('api/User/Get', e),
			//获取用户列表
			GetAll: e => get('api/User/GetAll', e),
			//修改密码
			UpdatePwd: e => get('api/User/UpdatePwd', e),
			//编辑用户
			Update: e => post('api/User/Update', e),
			Add: e => post('api/User/Add', e),
			//重置密码

			ResetPwd: e => get('api/User/ResetPwd', e),

			//权限
			GetUserRole: e => get('api/User/GetUserRole', e),

			GetListByDepartmentAndPrivilege: e => get('api/User/GetListByDepartmentAndPrivilege', e),

			ImportUser: e => post('api/User/ImportUser', e)
		},
		VisitFlow: {
			GetListByRecord: e => get('api/VisitFlow/GetListByRecord?' + encodeQuery(e))
		},
		Visitor: {
			GetModel: e => get('api/Visitor/GetModel?' + encodeQuery(e)),
			GetListByRecord: e => get('api/Visitor/GetListByRecord?' + encodeQuery(e)),
			GetUnvisitedPagedList: e =>
				post('api/Visitor/GetUnvisitedPagedList?' + encodeQuery(e)),
			Visit: e => post('api/Visitor/Visit?' + encodeQuery(e))
		},
		VisitRecord: {
			GetModel: e => get('api/VisitRecord/GetModel?' + encodeQuery(e)),
			GetPagedList: e => post('api/VisitRecord/GetPagedList?' + encodeQuery(e)),
			ExportList: e =>
				window.ApiBaseURL + 'api/VisitRecord/ExportList?' + encodeQuery(e)
		},
		WorkSubType: {
			//获取列表
			Get: e => get('api/WorkSubType/Get', e),
			GetByType: e => get('api/WorkSubType/GetByType', e),
			//获取列表
			Add: e => post('api/WorkSubType/Add', e),
			//获取列表
			Update: e => post('api/WorkSubType/Update', e),
			//获取列表

			Delete: e => get('api/WorkSubType/Delete', e)
		},
		Weather: {
			// 天气
			WeatherWeatherNow: e => get('api/Weather/WeatherNow', e)
		},
		WorkAssister: {
			GetListByOrder: e => get('api/WorkAssister/GetListByOrder', e)
		},
			InfoNotice: {
			Get: e => get('api/InfoNotice/Get', e)
		},
		WorkPart: {
			GetListByOrder: e => get('api/PartInOut/GetListByOrder', e)
		},
		WorkOrder: {
			EquipmentGetRepairOrderWork: e => get('api/WorkOrder/GetWorkOrderFlow', e),
			WorkOrderExportList: e => exportGet('api/WorkOrder/ExportMaintainWorkOrder', e),
			MaintainWorkOrder: e => get('api/WorkOrder/MaintainWorkOrder?'+ encodeQuery(e)),
			GetMaintainChartTrend: e => get('api/WorkOrder/GetMaintainChartTrend?'+ encodeQuery(e)),
			ExportList: e => exportGet('api/WorkOrder/ExportList', e),
			WorkOrderGetLevelChartTable: e => get('api/WorkOrder/GetLevelChartTable', e),
			WorkOrderGetDealSpanWorkOrder: e => get('api/WorkOrder/GetDealSpanWorkOrder', e),
			WorkOrderGetWorkOrderPart: e => get('api/WorkOrder/GetWorkOrderPart', e),
			WorkOrderGetRepairOrderModel: e => get('api/WorkOrder/GetRepairOrderModel', e),
			GetWorkMaxTime: e => get('api/WorkOrder/GetWorkMaxTime', e),
			GetChartTrend: e => get('api/WorkOrder/GetChartTrend', e),
			GetProcessingInfo: e => get('api/WorkOrder/GetProcessingInfo?' + encodeQuery(e)),
			GetProcessingUndispatchedPagedList: e => post('api/WorkOrder/GetProcessingUndispatchedPagedList?' + encodeQuery(e)),
			GetProcessingUndealedPagedList: e => post('api/WorkOrder/GetProcessingUndealedPagedList?' + encodeQuery(e)),
			GetProcessingDealingPagedList: e => post('api/WorkOrder/GetProcessingDealingPagedList?' + encodeQuery(e)),
			GetProcessingFinishedPagedList: e => post('api/WorkOrder/GetProcessingFinishedPagedList?' + encodeQuery(e)),
			GetSupervisionInfo: e => get('api/WorkOrder/GetSupervisionInfo?' + encodeQuery(e)),
			GetSupervisionUndispatchedPagedList: e => post('api/WorkOrder/GetSupervisionUndispatchedPagedList?' +
				encodeQuery(e)),
			GetSupervisionDealingPagedList: e => post('api/WorkOrder/GetSupervisionDealingPagedList?' + encodeQuery(e)),
			GetSupervisionFinishedPagedList: e => post('api/WorkOrder/GetSupervisionFinishedPagedList?' + encodeQuery(
				e)),
			GetMyPagedList: e => post('api/WorkOrder/GetMyPagedList?' + encodeQuery(e)),
			GetToConfirmPagedList: e => post('api/WorkOrder/GetToConfirmPagedList?' + encodeQuery(e)),
			Report: e => post('api/WorkOrder/Report', e),
			Transfer: e => get('api/WorkOrder/Transfer?' + encodeQuery(e)),
			Dispatch: (e, s) => post('api/WorkOrder/Dispatch?' + encodeQuery(e), s),
			Discard: e => get('api/WorkOrder/Discard?' + encodeQuery(e)),
			Urge: e => get('api/WorkOrder/Urge?' + encodeQuery(e)),
			Cancel: e => get('api/WorkOrder/Cancel?' + encodeQuery(e)),
			Confirm: e => get('api/WorkOrder/Confirm?' + encodeQuery(e)),
			UnConfirm: e => get('api/WorkOrder/UnConfirm?' + encodeQuery(e)),
			GetStateList: e =>
				get('api/WorkOrder/GetStateList', e),
			//查询
			GetSeachList: e =>
				get('api/WorkOrder/GetSeachList', e),
		},
		WxUserCheck: {
			Get: e => get('api/WxUserCheck/Get?' + encodeQuery(e)),
			ExportList: e => exportGet('api/WxUserCheck/ExportList?' + encodeQuery(e))
		}
	},
	OMS = {
		Contract: {
			GetModel: e => get('api/oms/Contract/GetModel?' + encodeQuery(e)),
		}
	},
	WX = {
		User: {
			GetModel: e => get('api/wx/User/GetModel?' + encodeQuery(e)),
		}
	}
	
export default {
	ImageGetImg,
	MMS,
	OMS,
	WX
}
