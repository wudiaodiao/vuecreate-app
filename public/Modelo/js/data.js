var modelId = '98yVlX5r'
var appToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDc3LCJ1c2VybmFtZSI6InpoYW53ZWlAc2lob25naXQuY29tIiwiaXNQZXJtYW5lbnQiOnRydWUsImlhdCI6MTYyMTU4MDcxOCwiZXhwIjozMzE1NzU4MDcxOH0.vn-buI0LqYEnt6_6HfWAvMKsZfZL2EGBq0tdCfxXD3I'
var offlinemodel_path = 'static/Modelo/Source'
var cameraInfo = {
  at:[387.5868225097656, 304.4556579589844, 68.5624008178711],
  distance:1586.3307136924877,
  fov:46,
  phi:0.22851687870707715,
  theta: -11.007534305233255
}






var idxxxx = 0
var selectedColors = [
  [251 / 255, 162 / 255, 64 / 255],
  [248 / 255, 88 / 255, 71 / 255],
  [148 / 255, 71 / 255, 248 / 255],
  [71 / 255, 186 / 255, 248 / 255],
  [0.0, 1.0, 0.0],
  [1.0, 1.0, 0.0]
]
var selectedColor = [1, 1, 1] // 默认选中构件的颜色
var eventElementIds = []
var eventElementIdsLast = []
var ribbonGroups
var rulers = []
// 飞行路线
var keyPoints = [
  [904.0780639648438, -190.65611267089844, 108.11817932128906],
  [860.8433227539062, -88.94837188720703, 107.32151794433594],
  [687.3507080078125, 46.55967330932617, 92.48213195800781],
  [564.6295166015625, -102.89479064941406, 102.2374267578125],
  [527.1118774414062, -167.49713134765625, 20.788429260253906],
  [462.5735778808594, -166.67955017089844, 52.14413833618164],
  [389.6610412597656, -169.9225311279297, 46.185787200927734],
  [352.4881896972656, -175.66270446777344, 61.116981506347656],
  [225.80874633789062, -181.5723876953125, 61.40930938720703],
  [121.10775756835938, -190.91497802734375, 61.40930938720703]
]
var animateRibbon,
  person,
  person1,
  animateRibbon1,
  selectedElements = []
var viewer,
  camera,
  cameraNavFlag,
  cameraNavigator,
  selectElementTool,
  selectElementNow
var circleFlag = true
var circleIndex
// 打点点位
const gasPath = {
  path0: [
    [841.092041015625, -185.30511474609375, 125.82017517089844 + 1],
    [820.6114501953125, -185.30511474609375, 125.82017517089844 + 1],
    [593.2682495117188, -184.7922821044922, 125.82061767578125 + 1],
    [593.2682495117188, -141.39590454101562, 125.82061767578125 + 1.02],
    [578.0963134765625, -141.02822875976562, 125.8216552734375 + 1.02],
    [564.3650512695312, -141.39590454101562, 125.82035064697266 + 1.02],
    [669.256591796875, -29.249074935913086, 125.81842803955078 + 1],
    [690.9871826171875, -29.249074935913086, 125.822509765625 + 1],
    [793.7887573242188, -83.13096618652344, 125.81887817382812 + 1],
    [793.7887573242188, -126.98714447021484, 125.82134246826172 + 1],
    [752.10791015625, -126.98714447021484, 125.82219696044922 + 1],
    [752.10791015625, -182.55471801757812, 125.81916046142578 + 1],
    [841.092041015625, -182.55471801757812, 125.82026672363281]
  ]
}
var localBimTree = [] // 运行监控树总数据
var floorTreeList = [] // 运行监控树的楼层列表
var systemTreeList = [] // 运行监控树的专业列表
var floorTreeDic = {}
var subjectTreeDic = {}
var checkedFloors
var checkedSubjects
var allSubjects
// 点位的数据
var isPointRoll = false // 点位放大缩小
var isPointShow = true // 是否显示点位
var ctrl_focus = false // ctrl 是否按下了
var pointArray1 = []
var elementId1 = []
var selfPoints = {
  Floor: [
    'B1F',
    '1F',
    '2F',
    '3F',
    '4F',
    '5F',
    '6F',
    '7F',
    '8F',
    '9F',
    '10F',
    '11F',
    '12F',
    '13F',
    '14F',
    '15F',
    '16F',
    '17F',
    '18F',
    '19F',
    '20F',
    '21F',
    '22F',
    '23F',
    '24F',
    '25F',
    '26F',
    '27F',
    '28F',
    '29F',
    '30F',
    '31F',
    '32F',
    '33F',
    '外立面',
  ],
  Subject: [
    '视频安防监控系统',
    '入侵报警系统',
    '求助呼叫系统',
    '门禁管理系统',
    '停车场管理系统',
    '车位引导系统',
    '能源管理系统',
    '变配电系统',
    '智能照明系统',
    '广播系统',
    '信息引导及发布系统',
    '火灾自动报警系统',
    '信息网络系统',
    '无线WIFI覆盖系统',
    '机房环境监测系统',
    '综合布线系统',
    '有线电视系统',
    '会议系统',
    '物业管理系统',
    '电气火灾监控系统',
    '消防电源管理系统',
    '智能末端试水系统',
    '智能水炮控制系统',
    'IPTV系统',
    '时钟系统',
    '卫星有线电视系统',
    '酒店客房控制系统',
    '水质监测系统'
  ],
  Point: {}
}

//鼠标状态标志
var flags = {
  looking: false,
  moveForward: false, //向前
  moveBackward: false, //向后
  moveUp: false, //向上
  moveDown: false, //向下
  moveLeft: false, //向左
  moveRight: false //向右
}
//移动速度
var moveBaseRate = 50.0
//快捷键
var EVENT_KEY = {
  KEY_A: 65,
  KEY_B: 66,
  KEY_C: 67,
  KEY_D: 68,
  KEY_E: 69,
  KEY_F: 70,
  KEY_G: 71,
  KEY_H: 72,
  KEY_I: 73,
  KEY_J: 74,
  KEY_k: 75,
  KEY_L: 76,
  KEY_M: 77,
  KEY_N: 78,
  KEY_O: 79,
  KEY_P: 80,
  KEY_Q: 81,
  KEY_R: 82,
  KEY_S: 83,
  KEY_T: 84,
  KEY_U: 85,
  KEY_V: 86,
  KEY_W: 87,
  KEY_X: 88,
  KEY_Y: 89,
  KEY_Z: 90,

  KEY_0: 48,
  KEY_1: 49,
  KEY_2: 50,
  KEY_3: 51,
  KEY_4: 52,
  KEY_5: 53,
  KEY_6: 54,
  KEY_7: 55,
  KEY_8: 56,
  KEY_9: 57,

  KEY_ENTER: 108,

  KEY_ALT: 18,
  KEY_CTRL: 17,
  KEY_SHIFT: 16,

  KEY_LEFT: 37,
  KEY_UP: 38,
  KEY_RIGHT: 39,
  KEY_DOWN: 40
}

// 爆炸，分层效果数据
var building = []
var building_exp = []
var building_others = []
