import DateTime from './datetime'

export default {
    Card: {
        equipment: 200,
        area: 201,
    },
    getDate(dateTime, format) {
        format = format || "yyyy-MM-dd";
        return this.getTime(dateTime, format);
    },
    getTime(time, format) {
        if (!time) return ''
        format = format || 'yyyy-MM-dd hh:mm:ss'
        if (!(time instanceof DateTime)) time = DateTime.parse(time)
        return time.format(format)
    },
    getTimeSpan(val, unit) {
        if(val>0&&val<0.016){
            val=val*3600
           unit='秒'
        }
        if(val>0&&val<1){
            val=val*60
           unit='分'
        }
        if (val == null)
            return '';
        return String(Math.round(val * 100) / 100) + unit;
    },
    getSummary(text, length) {
        length = length || 20
        if (text.length > length) text = text.substr(0, length - 3) + '...'
        return text
    },
    Equipment: {
        getEquipmentState(val) {
            var names = ['正常', '维保中'];
            return names[val - 1];
        },
    },
    File: {
        Type(val) {
            var names = ['文件夹', '文件', '父文件夹']
            return names[val - 1]
        }
    },
    InspectionTask: {
        State(val) {
            var names = ['未准备', '待巡检', '巡检中', '已巡检', '未巡检']
            return names[val - 1]
        }
    },
      InspectionTask2: {
        State(val) {
            if(val===true){
                return '正常'
            }
               if(val===false){
                return '异常'
            }
           
        }
    },
    Shift: {
        CheckIn(val) {
            var names = ['未打卡', '正常', '迟到', '严重迟到']
            return names[val - 1]
        },
        CheckOut(val) {
            var names = ['未打卡', '正常', '早退', '严重早退']
            return names[val - 1]
        }
    },
    Signal: {
        ValueType(val) {
            var names = ['开关量', '模拟量', '字符串量', '状态枚举']
            return names[val - 1]
        }
    },
    Visit: {
        Action(val) {
            var names = ['申请', '批准', '驳回', '到访', '关闭']
            return names[val - 1]
        },
        State(val) {
            var names = ['已申请', '已批准', '已驳回', '已到访', '已关闭']
            return names[val - 1]
        }
    },
    OMS: {
        getContractType(value) {
            var names = ['出租', '出售'];
            return names[value - 1];
        },
        getContractState(value) {
            var names = ['执行中', '已到期', '异常'];
            return names[value - 1];
        }
    },
    WorkOrder: {
        Type(val) {
            var names = ['保养工单', '报修工单', '报事工单']
            return names[val - 1]
        },
        State(val) {
            // val = Number(val)
       
            var names = [
                '已报单',
                '已派单',
                '已转单',
                '已废单',
                '已接单',
                '已到场',
                '已退单',
                '已挂单',
                '取消挂单',
                '已完成',
                '确认通过',
                '确认不通过'
            ]
          
            return names[val - 1]
        },
    
        Source(val) {
            var names = ['系统报单', '电话报单', 'Web报单', 'APP报单', '微信报单', '钉钉报单']
            return names[val - 1]
        },
        Level(val) {
            var names = ['提示', '一般', '重要', '紧急']
            return names[val - 1]
        },
    },
    WorkFlow: {
        Action(val) {
            var names = [
                '报单',
                '派单',
                '转单',
                '废单',
                '接单',
                '到场',
                '退单',
                '挂单',
                '取消挂单',
                '完成',
                '确认通过',
                '催办', 
                '撤单', 
                '确认不通过'
            ]
            return names[val - 1]
        }
    }
}