

var URL_CONFIG = {
    TDT_IMG: 'https://[subdomain].tianditu.com/img_w/wmts',//天地图影像
    TDT_LABEL: 'https://[subdomain].tianditu.com/cia_w/wmts',//天地图文字注记
    BINGMAP: '//dev.virtualearth.net',//bing map影像
    STK: 'https://www.supermapol.com/realspace/services/3D-stk_terrain/rest/realspace/datas/info/data/path',//STK 地形
    ZF_IMG: 'http://www.supermapol.com/realspace/services/3D-dxyx_ios2/rest/realspace/datas/MosaicResult_2@IMAGE_1',
    ZF_TERRAIN: 'http://www.supermapol.com/realspace/services/3D-dxyx_ios2/rest/realspace/datas/DatasetDEM_1@sichuanTer',
    ZF_IMG2: 'http://www.supermapol.com/realspace/services/3D-ZF_normal/rest/realspace/datas/image',//珠峰影像SCI
    ZF_TERRAIN2: 'http://www.supermapol.com/realspace/services/3D-ZF_normal/rest/realspace/datas/srtm_54_07@zhufeng',//珠峰地形SCT
    SiChuan_TERRAIN: 'http://www.supermapol.com/realspace/services/3D-dixingyingxiang/rest/realspace/datas/DatasetDEM', // 四川地形
    SiChuan_IMG: 'http://www.supermapol.com/realspace/services/3D-dixingyingxiang/rest/realspace/datas/MosaicResult', // 四川影像
    TENSE_IMG0: 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe/rest/realspace/datas/rs0300@%E6%88%BF%E5%B1%B1',//环境监测时态影像SCI（房山）
    TENSE_IMG1: 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe/rest/realspace/datas/rs0310@%E6%88%BF%E5%B1%B1',//环境监测时态影像SCI（房山）
    TENSE_IMG2: 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe/rest/realspace/datas/rs0330@%E6%88%BF%E5%B1%B1',//环境监测时态影像SCI（房山）
    TENSE_IMG3: 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe/rest/realspace/datas/rs0340@%E6%88%BF%E5%B1%B1',//环境监测时态影像SCI（房山）
    TENSE_IMG4: 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe/rest/realspace/datas/rs0350@%E6%88%BF%E5%B1%B1',//环境监测时态影像SCI（房山）
    TENSE_IMG5: 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe/rest/realspace/datas/rs0400@%E6%88%BF%E5%B1%B1',//环境监测时态影像SCI（房山）
    TENSE_IMG6: 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe/rest/realspace/datas/rs0410@%E6%88%BF%E5%B1%B1',//环境监测时态影像SCI（房山）
    TENSE_IMG7: 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe/rest/realspace/datas/rs0420@%E6%88%BF%E5%B1%B1',//环境监测时态影像SCI（房山）
    TENSE_IMG8: 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe/rest/realspace/datas/rs0430@%E6%88%BF%E5%B1%B1',//环境监测时态影像SCI（房山）
    TENSE_IMG9: 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe/rest/realspace/datas/rs0440@%E6%88%BF%E5%B1%B1',//环境监测时态影像SCI（房山）
    TENSE_IMG10: 'http://www.supermapol.com/realspace/services/3D-HuanJingJianCe/rest/realspace/datas/rs0450@%E6%88%BF%E5%B1%B1',//环境监测时态影像SCI（房山）
    SUPERMAP_IMG_WGS: 'http://www.supermapol.com/realspace/services/map-World/rest/maps/World_Google',//经纬度投影地图TILE IMGERY（中国区域）
    SUPERMAP_IMG_MEC: 'http://www.supermapol.com/realspace/services/map-China400/rest/maps/China400',//墨卡托投影地图TILE IMGERY（全球）
    SCP_JINJIANG: 'http://www.supermapol.com/realspace/services/3D-jinjiang/rest/realspace/datas/jinjiang/config',// 晋江倾斜SCP
    SCENE_JINJIANG: 'http://www.supermapol.com/realspace/services/3D-jinjiang/rest/realspace', // 晋江倾斜 场景
    SCP_SUOFEIYA: 'http://www.supermapol.com/realspace/services/3D-suofeiya_church/rest/realspace/datas/Config/config', // 索菲亚大教堂倾斜数据
    SCENE_SUOFEIYA: 'http://www.supermapol.com/realspace/services/3D-suofeiya_church/rest/realspace', // 索菲亚大教堂倾斜数据场景
    SCP_SRSB: 'http://www.supermapol.com/realspace/services/3D-srsb/rest/realspace/datas/srsb/config',//萨尔茨堡SCP
    SCENE_SRSB: 'http://www.supermapol.com/realspace/services/3D-srsb/rest/realspace', // 萨尔茨堡场景
    SCP_SRSB_WATER: 'http://www.supermapol.com/realspace/services/3D-srsb/rest/realspace/datas/%E6%B0%B4%E9%9D%A2@vector/config',//萨尔茨堡水面SCP
    SCP_NIAOCHAO: 'http://www.supermapol.com/realspace/services/3D-niaocao_water/rest/realspace/datas/%E9%B8%9F%E5%B7%A2%E4%BA%94%E6%9C%9F/config',//鸟巢SCP
    SCENE_NIAOCHAO: 'http://www.supermapol.com/realspace/services/3D-niaocao_water/rest/realspace', // 鸟巢 场景
    SCP_NIAOCHAO_WATER: 'http://www.supermapol.com/realspace/services/3D-Olympic/rest/realspace/datas/NewDataset@water-caijian/config',//鸟巢水面SCP
    SCP_CBD_TREE: 'http://www.supermapol.com/realspace/services/3D-WebGLCBD/rest/realspace/datas/Tree@%E6%96%B0CBD/config',//CBD 树SCP
    SCP_CBD_GROUND1: 'http://www.supermapol.com/realspace/services/3D-WebGLCBD/rest/realspace/datas/Ground_1@%E6%96%B0CBD/config',//CBD 地面1 SCP
    SCP_CBD_GROUND2: 'http://www.supermapol.com/realspace/services/3D-WebGLCBD/rest/realspace/datas/Ground_2@%E6%96%B0CBD/config',//CBD 地面2 SCP
    SCP_CBD_BUILD: 'http://www.supermapol.com/realspace/services/3D-WebGLCBD/rest/realspace/datas/Building@%E6%96%B0CBD/config',//CBD 建筑物 SCP
    SCP_BIM: 'https://www.supermapol.com/realspace/services/3D-S3MData/rest/realspace/datas/T8H_NoLod/config',//BIM scp
    SCENE_BIMBUILDING: 'http://www.supermapol.com/realspace/services/3D-BIMbuilding/rest/realspace', // BIM 场景
    SCP_VECTOR_POLYGON: 'http://www.supermapol.com/realspace/services/3D-China/rest/realspace/datas/%E4%B8%93%E9%A2%98%E5%9B%BE/config',//矢量 面 SCP
    SCP_VECTOR_LINE: 'http://www.supermapol.com/realspace/services/3D-China/rest/realspace/datas/Line/config',// 矢量 线 SCP
    SCP_VECTOR_TEXT: 'http://www.supermapol.com/realspace/services/3D-China/rest/realspace/datas/text/config',//矢量 文字 SCP
    SCP_POINTCLOUD: 'http://www.supermapol.com/realspace/services/3D-cloud/rest/realspace/datas/POINTCLOUD23/config', //点云 SCP
    SCENE_POINTCLOUD: 'http://www.supermapol.com/realspace/services/3D-cloud/rest/realspace',
    SCP_SGNS: 'http://www.supermapol.com/realspace/services/3D-SGNS/rest/realspace/datas/siguniang/config',//四姑娘山 SCP
    SCENE_SGNS: 'http://www.supermapol.com/realspace/services/3D-SGNS/rest/realspace', // 四姑娘山 场景
    SCP_OLYMPIC_TREE: 'http://www.supermapol.com/realspace/services/3D-WebGLOlympicGreen/rest/realspace/datas/Tree@OlympicGreen/config',//奥林匹克公园 树 SCP
    SCP_OLYMPIC_BUILD: 'http://www.supermapol.com/realspace/services/3D-WebGLOlympicGreen/rest/realspace/datas/Building@OlympicGreen/config',//奥林匹克公园 建筑物 SCP
    SCP_OLYMPIC_BILLBOARD: 'http://www.supermapol.com/realspace/services/3D-WebGLOlympicGreen/rest/realspace/datas/BillBoard@OlympicGreen/config',//奥林匹克公园 人物 SCP
    SCP_OLYMPIC_GROUND: 'http://www.supermapol.com/realspace/services/3D-WebGLOlympicGreen/rest/realspace/datas/Ground@OlympicGreen/config',//奥林匹克公园 地面 SCP
    SCP_OLYMPIC_WATER: 'http://www.supermapol.com/realspace/services/3D-WebGLOlympicGreen/rest/realspace/datas/Waters@OlympicGreen/config',//奥林匹克公园 水面 SCP
    SCENE_OLYMPIC: 'http://www.supermapol.com/realspace/services/3D-Olympic/rest/realspace',
    SCENE_OLYMPIC_GREEN: 'http://www.supermapol.com/realspace/services/3D-OlympicGreen/rest/realspace',
    SCP_XGPARK: 'http://www.supermapol.com/realspace/services/3D-yanmofenxi/rest/realspace/datas/sci_park/config',// 香港科技园 SCP
    SCENE_XGPARK: 'http://www.supermapol.com/realspace/services/3D-yanmofenxi/rest/realspace', // 香港科技园 场景
    SCP_PIPELINE: 'https://www.supermapol.com/realspace/services/3D-pipeline_s3m/rest/realspace/datas/NetWork@Pipe3D/config', //管线 SCP 失效
    SCP_HISTOGRAM1: 'http://www.supermapol.com/realspace/services/3D-Histogram/rest/realspace/datas/Point2D_3000_5000/config', //
    SCP_HISTOGRAM2: 'http://www.supermapol.com/realspace/services/3D-Histogram/rest/realspace/datas/Point2D_10000_max/config', //
    SCP_HISTOGRAM3: 'http://www.supermapol.com/realspace/services/3D-Histogram/rest/realspace/datas/Point2D_min_1000/config', //
    SCP_HISTOGRAM4: 'http://www.supermapol.com/realspace/services/3D-Histogram/rest/realspace/datas/Point2D_5000_10000/config',//
    SCP_HISTOGRAM5: 'http://www.supermapol.com/realspace/services/3D-Histogram/rest/realspace/datas/Point2D_1000_3000/config', //
    SCENE_HISTOGRAM: 'http://www.supermapol.com/realspace/services/3D-Histogram/rest/realspace',
    SCENE_CBD: 'http://www.supermapol.com/realspace/services/3D-CBD/rest/realspace', // CBD场景
    SCP_FCFH_QX: 'http://www.supermapol.com/realspace/services/3D-individualHouse/rest/realspace/datas/Config/config', //分层分户倾斜摄影图层
    SCP_FCFH_Vector: 'http://www.supermapol.com/realspace/services/3D-individualHouse/rest/realspace/datas/%E4%B8%93%E9%A2%98%E6%88%B7%E5%9E%8B%E7%BA%BF_split_1_1_%E6%88%B7%E5%9E%8B%E9%9D%A2/config', //分层分户矢量图层
    SCP_FCFH_VECTOR_EXTRUDE: 'http://www.supermapol.com/realspace/services/3D-individualHouse/rest/realspace/datas/%E4%B8%93%E9%A2%98%E6%88%B7%E5%9E%8B%E9%9D%A2_%E6%8B%89%E4%BC%B8/config', // 分层分户侧面拉伸数据
    SCP_FCFH_DATA: 'http://www.supermapol.com/realspace/services/data-individualHouse/rest/data', //分层分户数据服务
    SCP_WORLD_COUNTRY_VECTOR: 'http://www.supermapol.com/realspace/services/3D-Countries-World2/rest/realspace/datas/Countries_1@World/config', // 全球国家边界线的矢量
    SCENE_POLYLINEGROW_BUINDINGS: 'http://www.supermapol.com/realspace/services/3D-buildings1122/rest/realspace', // 光晕效果线数据,
    SCENE_TISHUJU: 'http://www.supermapol.com/realspace/services/3D-tishuju/rest/realspace', // 体数据场景
    BING_MAP_KEY: 'AqgBIfrBG50dl7Ykc9nANoj5UJnIxg5YyEZu-UE7sY_sHoZT1db1jGZAalBsU73w',
    SCENE_GTC_UINSIDE: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%86%85%E9%83%A8%E7%BB%93%E6%9E%84@%E5%AE%A4%E5%86%85/config',//u型BIM室内
    SCENE_GTC_UOUTSIDE: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%A4%96%E9%83%A8%E7%BB%93%E6%9E%84@%E5%AE%A4%E5%86%85/config',//u型BIM室外
    SCENE_GTC_UWINDOW: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/U%E5%9E%8B%E5%BB%BA%E7%AD%91%E7%AA%97@%E5%AE%A4%E5%86%85/config',//u型BIM窗
    SCENE_GTC_WALL9: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%90%88%E5%B9%B6%E5%89%8D%E5%A2%99@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config',//九号楼合并前墙
    SCENE_GTC_WINDOW9: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%90%88%E5%B9%B6%E5%89%8D%E7%AA%97@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config',//九号楼合并前窗
    SCENE_GTC_WINDOW9: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%90%88%E5%B9%B6%E5%89%8D%E7%BB%93%E6%9E%84%E5%9F%BA%E7%A1%80@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config',//九号楼合并前结构
    SCENE_GTC_WINDOW9: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%90%88%E5%B9%B6%E5%89%8D%E9%97%A8@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config',//九号楼合并前门
    SCENE_GTC_WINDOW9: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%90%88%E5%B9%B6%E5%89%8D%E6%A5%BC%E6%9D%BF@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config',//九号楼合并前楼板
    SCENE_GTC_FLOOR9: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E6%8B%89%E4%BD%8E%E6%A5%BC%E5%B1%82@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config',//九号楼楼层
    SCENE_GTC_LWINDOW9: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E6%8B%89%E4%BD%8E%E7%AA%97@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config',//九号楼拉低窗
    SCENE_GTC_LWALL9: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E6%8B%89%E4%BD%8E%E5%A2%99@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config',//九号楼拉低墙
    SCENE_GTC_LB9: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E6%8B%89%E4%BD%8E%E6%A5%BC%E6%9D%BF@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config',//九号楼拉低楼板
    SCENE_GTC_UNIT9: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%90%88%E5%B9%B6%E5%90%8E@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config',//合并九号楼
    SCENE_GTC_BUILDIBG: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/building_udb@building/config',//building_udb@building
    SCENE_GTC_HILL: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%B1%B1/config',//山
    SCENE_GTC_GROUND: 'http://www.supermapol.com/realspace/services/3D-data_all/rest/realspace/datas/%E5%9C%B0%E9%9D%A2/config',//地面
    SCENE_MODELUPDATE: 'http://www.supermapol.com/realspace/services/3D-MoXingGengXin/rest/realspace',//建筑分析区白模数据
    SCENE_CLIP: 'http://www.supermapol.com/realspace/services/3D-clip_fengbian/rest/realspace',//裁剪封边数据
    TOKEN_TIANDITU: '5628b0029e4be16383b14099ddd61020', // 天地图token
    SCENE_FEATUREVALUE: 'http://www.supermapol.com/realspace/services/3D-featureValue_building9/rest/realspace/datas/%E4%B9%9D%E5%8F%B7@%E4%B9%9D%E5%8F%B7%E6%A5%BC/config',//带特征值的九号楼缓存
};
var TDTURL_CONFIG = {
    TDT_IMG_W: "http://{s}.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0" +
        "&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
        "&style=default&format=tiles&tk=" + URL_CONFIG.TOKEN_TIANDITU   //在线天地图影像服务地址(球面墨卡托投影)
    , TDT_IMG_C: "http://{s}.tianditu.com/img_c/wmts?service=wmts&request=GetTile&version=1.0.0" +
        "&LAYER=img&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
        "&style=default&format=tiles&tk=" + URL_CONFIG.TOKEN_TIANDITU   //在线天地图影像服务地址(经纬度)
    , TDT_VEC_C: "http://{s}.tianditu.com/vec_c/wmts?service=wmts&request=GetTile&version=1.0.0" +
        "&LAYER=vec&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
        "&style=default&format=tiles&tk=" + URL_CONFIG.TOKEN_TIANDITU    //在线天地图矢量地图服务(经纬度)
    , TDT_CIA_C: "http://{s}.tianditu.com/cia_c/wmts?service=wmts&request=GetTile&version=1.0.0" +
        "&LAYER=cia&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
        "&style=default&format=tiles&tk=" + URL_CONFIG.TOKEN_TIANDITU       //在线天地图影像中文标记服务(经纬度)
    , TDT_CVA_C: "http://{s}.tianditu.com/cva_c/wmts?service=wmts&request=GetTile&version=1.0.0" +
        "&LAYER=cva&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
        "&style=default&format=tiles&tk=" + URL_CONFIG.TOKEN_TIANDITU      //在线天地图矢量中文标记服务(经纬度)
};
var TDTURL_CONFIG_FULL = {
    TDT_IMG_W: "http://{s}.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0" +
        "&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
        "&style=default&format=tiles&tk=" + URL_CONFIG.TOKEN_TIANDITU   //在线天地图影像服务地址(墨卡托投影)
    , TDT_VEC_W: "http://{s}.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0" +
        "&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
        "&style=default&format=tiles&tk=" + URL_CONFIG.TOKEN_TIANDITU   //在线天地图矢量地图服务(墨卡托投影)
    , TDT_CIA_W: "http://{s}.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0" +
        "&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
        "&style=default.jpg&tk=" + URL_CONFIG.TOKEN_TIANDITU          //在线天地图影像中文标记服务(墨卡托投影)
    , TDT_CVA_W: "http://{s}.tianditu.gov.cn/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0" +
        "&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
        "&style=default.jpg&tk=" + URL_CONFIG.TOKEN_TIANDITU           //在线天地图矢量中文标记服务(墨卡托投影)
    , TDT_IMG_C: "http://{s}.tianditu.gov.cn/img_c/wmts?service=wmts&request=GetTile&version=1.0.0" +
        "&LAYER=img&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
        "&style=default&format=tiles&tk=" + URL_CONFIG.TOKEN_TIANDITU   //在线天地图影像服务地址(经纬度)
    , TDT_VEC_C: "http://{s}.tianditu.gov.cn/vec_c/wmts?service=wmts&request=GetTile&version=1.0.0" +
        "&LAYER=vec&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
        "&style=default&format=tiles&tk=" + URL_CONFIG.TOKEN_TIANDITU    //在线天地图矢量地图服务(经纬度)
    , TDT_CIA_C: "http://{s}.tianditu.gov.cn/cia_c/wmts?service=wmts&request=GetTile&version=1.0.0" +
        "&LAYER=cia&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
        "&style=default&format=tiles&tk=" + URL_CONFIG.TOKEN_TIANDITU       //在线天地图影像中文标记服务(经纬度)
    , TDT_CVA_C: "http://{s}.tianditu.gov.cn/cva_c/wmts?service=wmts&request=GetTile&version=1.0.0" +
        "&LAYER=cva&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
        "&style=default&format=tiles&tk=" + URL_CONFIG.TOKEN_TIANDITU      //在线天地图矢量中文标记服务(经纬度)
    , TDT_TER_C: "http://{s}.tianditu.gov.cn/ter_c/wmts?service=wmts&request=GetTile&version=1.0.0" +
        "&LAYER=ter&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
        "&style=default&format=tiles&tk=" + URL_CONFIG.TOKEN_TIANDITU      //在线天地图地形晕渲(经纬度)
    , TDT_IBO_C: "http://{s}.tianditu.gov.cn/ter_c/wmts?service=wmts&request=GetTile&version=1.0.0" +
        "&LAYER=ibo&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
        "&style=default&format=tiles&tk=" + URL_CONFIG.TOKEN_TIANDITU
};

//点击查询属性的工作集
var selectQueryLayer = ["机电", "土建"];

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

};
//提示内容
var BIM_TOOLTIP = {
    EMPTY_BOX_TIP: "<p>点击模型,添加裁剪盒子</p>",
    EMPTY_DIXING_TIP: "<p>点击绘制开挖区域第一个点</p>",
    ONEMORE_DIXING_TIP: '<p>点击确定开挖区域中间点</p><p>右键单击结束绘制,进行开挖</p>',
    ERROR_DIXING_TIP: '<p>请绘制正确的多边形</p>',
    KUAIJIE_TIP: '<div class="kuaijiejiantishiDiv">快捷键提示框：（ctrl+alt+k）<br/>' +
        '场景出图：（ctrl+alt+p）<br/>'

        + ' 点选旋转（开始/关闭 都是这个键）：（ctrl+alt+f）<br/>'

        + '复位： （alt+z）<br/>'

        + '飞行漫游开始：（alt+r）<br/>'

        + '飞行漫游暂停：（alt+p）<br/>'

        + '飞行漫游结束：（alt+s）<br/><hr/>'
        + '鼠标控制方向：点击鼠标左键,然后滑动鼠标进行方向调整，滑轮可进行缩放<br/>'
        + '<br/>键盘控制：W 向前 ；S 向后；A 向左；D 向右；Q 向上；E 向下'
        + '</div>'

};
//飞行
var BIM_FLY = {
    WAITTIME: 1
};

//查询参数
var BIM_QUERY = {
    DATASET: ["JR2:机电地上", "JR1:机电地下", "TR1:土建地下", "TR2:土建地上"],
    QUERY_SQL_PARAM_WHERE: "ElementName like '%{0}%'",
    QUERY_SQL_MAXFEATURES: 200,
    QUERY_SQL_BYSMID_WHERE: "注释 like '{0}%' and Smid={1}"
};

//天地图配置
var BIM_WEB_MAP_TIANDITU_CONFIG = {
    MAXIMUMLEVEL: 16,
    TILEMAXTRIXLABELS: [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18",
        "19"
    ],
    SUBDOMAINS: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"]
};


var BIM_CAMERA_CONFIG = {
    HEIGHT: 5
};


export {
    URL_CONFIG,
    TDTURL_CONFIG,
    TDTURL_CONFIG_FULL,
    selectQueryLayer,
    EVENT_KEY,
    BIM_TOOLTIP,
    BIM_FLY,
    BIM_QUERY,
    BIM_WEB_MAP_TIANDITU_CONFIG,
    BIM_CAMERA_CONFIG,
}