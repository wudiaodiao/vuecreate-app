<template>
  <div>
    <div id="player" style="display: none"></div>

    <div class="btn" @click="addCustomPOI">添加一个POI点</div>
    <div class="btn btn2" @click="CheckVersion">检查版本号</div>
    <div class="btn btn3" @click="logout">退出</div>
    <div class="btn btn4" @click="Scene().CameraRotate()">旋转</div>
    <div class="btn btn5" @click="Scene().ResetCamera()">回到初始镜头</div>
    <div class="btn btn6" @click="Scene().CameraMove()">镜头随着路径移动</div>
    <div class="btn btn7" @click="Scene().CameraMoveState()">控制镜头</div>
    <div class="btn btn8" @click="Control().LightTime()">控制时间</div>
    <div class="btn btn9" @click="Control().WeatherChange()">控制天气</div>
    <div class="btn btn10" @click="Control().MeasureTool()">
      开启(关闭)测量工具
    </div>
    <div class="btn btn11" @click="Control().SwitchCrystal()">
      开启(关闭)水晶体
    </div>
    <div class="btn btn12" @click="Control().CrystalHotrange()">
      开启(关闭)水晶体热区
    </div>
    <div class="btn btn13" @click="Control().Effect()">添加特效</div>
    <div class="btn btn14" @click="Control().BlockMove()">添加/删除覆盖物</div>
    <div class="btn btn15" @click="Control().BlockState()">覆盖物状态</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 本地云渲染测试地址
      cloudurl: 'https://vizservice.51hitech.com', //云渲染服务地址 ①本地IP: http://172.31.9.21:8889, ②域名: https://vizservice.51hitech.com
      ProjectID: '5f5994158ce8231104e458df', //项目ID, 在云渲染客户端上获得
      UserName: 'testAppz2SAti', //用户名, 在云渲染客户端上获得
      Password: 'h6prr0W_5RazAGPw', //密码, 在云渲染客户端上获得
      cloudRender: '',
      weather: [
        'sunny', //晴天
        'cloudy', //多云
        'rainy', //雨天
        'snowy', //雪天
      ],
      weathNum: 0,
      showNum: 0,
      cameraState: 'continue',
      startMeasure: false,
      crystalNum: 0,
      crystalState: false,
      effectState: false,
      carVisible: false,
      bmstate: false
    }
  },
  mounted() {
    this.cloudRender = new cloudRenderer('player', 0)

    // 启动云渲染
    this.GetUrlStartRenderCloud()

    // 事件注册
    this.cloudRender.SuperAPI(
      'RegisterCloudResponse',
      this.myHandleResponseFunction
    )
  },
  methods: {
    // 添加自定义POI点
    AddSelfPOI() {
      let customPOIdata = {
        id: 'customPOI_ID', //POI id
        coord_type: 0, //坐标类型(0: 经纬度坐标，1: cad坐标)
        cad_mapkey: '', //CAD基准点的Key值, 项目中约定
        coord: '113.332458,23.123613', //POI点的坐标
        coord_z: 0, //高度(米)
        always_show_label: true, //是否永远显示title, true:显示提示文本(默认), false:不显示提示文本
        show_label_range: '0, 6000', //此POI点显示title的摄像机距离范围(单位米, 范围最小距离, 范围最大距离; 在此范围内显示, 超出范围隐藏title;注意: always_show_label 属性优先于此属性)
        sort_order: false, //是否开启遮挡排序(根据POI真实3D位置开启遮挡排序,注:只与其他开启排序的POI之间进行排序, 开启此排序会消耗性能(最多60个POI同时开启排序))
        state: 'state_1', //与marker之中images中的define_state对应
        marker: {
          size: '100, 228', //Marker大小(宽, 高 单位:像素)
          images: [
            {
              define_state: 'state_1',
              normal_url:
                'http://superapi.51hitech.com/doc-static/images/static/markerNormal.png', //normal时图片url地址
              activate_url:
                'http://superapi.51hitech.com/doc-static/images/static/markerActive.png', //hover, active时图片url地址
              //本地图片地址: "file:///D:/xxx/markerNormal.png"
            },
            {
              define_state: 'state_2',
              normal_url:
                'http://superapi.51hitech.com/doc-static/images/static/markerNormal2.png',
              activate_url:
                'http://superapi.51hitech.com/doc-static/images/static/markerActive2.png',
            },
          ],
        },
        label: {
          bg_image_url:
            'http://superapi.51hitech.com/doc-static/images/static/LabelBg.png', //label背景图片url地址 本地图片地址: "file:///D:/xxx/LabelBg.png"
          size: '100,44', //label大小(宽, 高 单位:像素)
          offset: '50,200', //整个label左上角相对于Marker的中心点(整个Marker的底部、中间位置)的偏移(x,y 单位 像素), 注: x为正向右, y为正向上
          text: '标题\r内容文本', //label中的文本内容
          font_color: 'fafafaff', //label中文本颜色: HEXA格式
          text_boxsize: '90,34', //label中文本框的大小 (宽, 高 单位:像素)
          text_offset: '10,5', //label中文本框左上角相对于label左上角的margin偏移(x,y 单位像素), 注: x为正向右, y为正向下
        },
        window: {
          url:
            'http://superapi.51hitech.com/doc-static/images/static/echarts.html', //本地地址:"file:///Z:/xxx/echarts.html", 注: 视频内容, 仅支持webm, ogg格式的视频
          size: '520,350', //window大小(宽, 高 单位:像素)
          offset: '50,180', //window左上角相对于Marker的中心点(整个Marker的底部、中间位置)的偏移(x,y 单位 像素), 注: x为正向右, y为正向上
        },
      }

      this.cloudRender.SuperAPI('RemoveAllPOI')
      this.cloudRender.SuperAPI('AddCustomPOI', customPOIdata)
      setTimeout(
        () =>
          this.cloudRender.SuperAPI('FocusPOI', {
            id: 'customPOI_ID',
            distance: 1800,
          }),
        5e2
      )
    },
    Scene() {
      let _this = this
      return {
        // 镜头绕场景中心点旋转
        CameraRotate() {
          let jsonData = {
            time: 50,
            //相机旋转一周所需要的时间, 单位(秒)
            direction: 'clockwise',
            //clockwise:顺时针;
            //anticlockwise:逆时针;
            //stop:停止旋转
          }
          _this.cloudRender.SuperAPI('SetCameraRotate', jsonData)
        },
        // 镜头随着路径移动
        CameraMove() {
          let movecamerainfo = {
            time: 10, //镜头移动总整时长(单位为秒)
            coord_type: 0,
            cad_mapkey: '',
            points: [
              {
                coord: '113.296303,23.115423',
                arm_distance: 500,
              },
              {
                coord: '113.301628,23.115328',
                arm_distance: 500,
              },
              {
                coord: '113.306992,23.115108',
                arm_distance: 500,
              },
              {
                coord: '113.314209,23.115164',
                arm_distance: 500,
              },
              {
                coord: '113.32132,23.114849',
                arm_distance: 500,
              },
              {
                coord: '113.330284,23.113728',
                arm_distance: 500,
              },
              {
                coord: '113.335907,23.112986',
                arm_distance: 500,
              },
            ],
          }

          setTimeout(
            () => _this.cloudRender.SuperAPI('SetCameraMove', movecamerainfo),
            5e2
          )
        },
        // 回到场景初始镜头
        ResetCamera() {
          _this.cloudRender.SuperAPI('ResetCamera')
        },
        // 控制镜头移动状态
        CameraMoveState() {
          if (_this.cameraState == 'continue') {
            _this.cameraState = 'pause'
          } else {
            _this.cameraState = 'continue'
          }
          let jsonData = {
            state: _this.cameraState,
            //pause:暂停移动;
            //continue:继续移动;
            //stop:停止移动, 释放焦点
          }
          _this.cloudRender.SuperAPI('SetCameraMoveState', jsonData)
        },
      }
    },

    GetUrlStartRenderCloud() {
      fetch(`${this.cloudurl}/autoLogin`, {
        method: 'POST',
        body: `username=${this.UserName}&pwd=${this.Password}`,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.token) {
            fetch(`${this.cloudurl}/Renderers/Any/${this.ProjectID}`, {
              method: 'POST',
              headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${json.token}`,
              },
              //初始化云渲染输出分辨率, 可选, 默认以云渲染客户端设置的分辨率输出
              body: `width=${window.innerWidth}&height=${window.innerHeight}`,
            })
              .then((res) => res.json())
              .then((json) => {
                if (json.url) {
                  // 存储url
                  this.$store.commit('setsuperUrl', json.url)
                  // 启动云渲染
                  this.cloudRender.SuperAPI('StartRenderCloud', json.url)
                } else {
                  this.logout()
                }
              })
          }
        })
        .catch((error) => {
        })
    },
    CheckVersion() {
      this.cloudRender.SuperAPI('superAPI')
    },
    logout() {
      document.querySelector('.btn').classList.remove('show')
      this.cloudRender.SuperAPI('StopRenderCloud')
    },
    Control() {
      let _this = this
      return {
        BlockState() {

          let jsonData = {
            id: 'effect_id', //移动的覆盖物id
            type: 'scene_effect', //移动的覆盖物类型 (poi, scene_effect, viewshed)
            play: _this.bmstate, //true:继续移动; false:暂停移动;
          }
          _this.bmstate = !_this.bmstate;

          _this.cloudRender.SuperAPI('PlayCoverMoveState', jsonData)
        },
        BlockMove() {
          _this.carVisible = !_this.carVisible
          if (!_this.carVisible) {
            _this.cloudRender.SuperAPI('RemoveAllPath')
            _this.cloudRender.SuperAPI('RemoveAllEffect')
            return
          }
          let jsonData = {
            attach_id: 'effect_id',
            //要移动的覆盖物id (POI, 场景特效; 需提前创建完毕)
            attach_type: 'scene_effect',
            //要移动的覆盖物类型 (poi, scene_effect, viewshed)
            be_attach_id: 'Path_id',
            //依附的覆盖物id (路径, 区域, 圆形区域; 需提前创建完毕)
            be_attach_type: 'path',
            //依附的覆盖物类型 (path, range, circular_range)
            speed: 180, //移动速度 (米/秒)
            loop: true, //是否循环
            reverse: false, //是否反向移动
          }

          setTimeout(() => _this.cloudRender.SuperAPI('CoverToMove', jsonData), 1e3)

          // 路径
          let Pathdata = {
            id: 'Path_id',
            coord_type: 0,
            cad_mapkey: '',
            type: 'dashed_dot',
            color: 'ff7700',
            width: 30,
            points: [
              {
                coord: '113.352448,23.126602',
                coord_z: 10,
              },
              {
                coord: '113.340408,23.12858',
                coord_z: 300,
              },
              {
                coord: '113.322662,23.129566',
                coord_z: 10,
              },
              {
                coord: '113.322723,23.125698',
                coord_z: 10,
              },
              {
                coord: '113.33828,23.124474',
                coord_z: 200,
              },
              {
                coord: '113.351349,23.121122',
                coord_z: 10,
              },
              {
                coord: '113.352448,23.126602',
                coord_z: 10,
              },
            ],
          }

          _this.cloudRender.SuperAPI('AddPath', Pathdata)

          // 小车特效
          let effectmovedata = {
            id: 'effect_id',
            coord_type: 0,
            cad_mapkey: '',
            type: 'vehicle_car',
            scale: 80,
            coord: '113.352448,23.126602',
            coord_z: 0,
            rotate: 0,
            title_text: '',
            title_face_to_camera: true,
          }

          _this.cloudRender.SuperAPI('AddEffect', effectmovedata)


          // 设置视角
          let camerainfo = {
            coord_type: 0,
            cad_mapkey: '',
            center_coord: '113.333997,23.123551',
            arm_distance: 2400,
            pitch: 47,
            yaw: 54,
            fly: false,
          }
          _this.cloudRender.SuperAPI('SetCameraInfo', camerainfo)
        },
        Effect() {
          _this.effectState = !_this.effectState
          if (!_this.effectState) {
            _this.cloudRender.SuperAPI('RemoveAllEffect')
            return
          }
          let effectdata = {
            id: 'effect_id_0', //场景特效id
            coord_type: 0, //坐标类型(0: 经纬度坐标, 1: cad坐标)
            cad_mapkey: '', //CAD基准点Key值, 项目中约定
            type: 'maker_site', //场景特效类型(none, vehicle_car, shield, fire, arrow, alarm, circle, pyramid, marker_cube, marker_pyramid, maker_site, tool_wrench, weather_tornado, circle_glass, circle_compass, circle_outside, circle_inside, circle_scan, circle_diffuse, circle_area, maker_cone)
            scale: 50, //特效直径(米)
            coord: '113.319374,23.10841',
            coord_z: -5, //高度(米)
            rotate: 0, //特效绕纵向旋转角度(0-360)
            title_text: '地标建筑',
            title_face_to_camera: true,
          }

          _this.cloudRender.SuperAPI('AddEffect', effectdata)

          let effectdata2 = {
            id: 'effect_id_1',
            coord_type: 0,
            cad_mapkey: '',
            type: 'shield',
            scale: 80,
            coord: '113.319992,23.104469',
            coord_z: 15,
            rotate: 0,
            title_text: ['特效标题,0066ffff,70,br', '特效副标题,00ff00ff,50'],
            title_face_to_camera: true,
          }

          _this.cloudRender.SuperAPI('AddEffect', effectdata2)
          setTimeout(
            () =>
              _this.cloudRender.SuperAPI('FocusEffect', {
                id: 'effect_id_1',
                distance: 2000,
              }),
            5e2
          )
        },
        CrystalHotrange() {
          _this.crystalState = !_this.crystalState
          let jsonData = {
            coord_type: 0, //坐标类型(0:经纬度坐标, 1:cad坐标)
            cad_mapkey: '', //CAD基准点Key值, 项目中约定
            coord: '113.333221,23.122967', //热区坐标 lng,lat
            coord_z: 0, //热区高度(米)
            color: 'ff0000', //热区颜色(HEX颜色值)
            radius: 2000, //半径(米)
            show: _this.crystalState, //true:显示; false:隐藏
          }

          _this.cloudRender.SuperAPI('SetCrystalHotrange', jsonData)
        },
        SwitchCrystal() {
          _this.crystalNum++
          _this.crystalNum = _this.crystalNum % 5
          let list = ['blue', 'white', 'blue', 'yellow', 'false']
          let jsonData = {
            state: list[_this.crystalNum],
            //white: 白色水晶体;
            //blue: 蓝色水晶体;
            //yellow: 黄色水晶体;
            //false: 关闭水晶体
          }

          _this.cloudRender.SuperAPI('SwitchCrystal', jsonData)
        },
        MeasureTool() {
          _this.startMeasure = !_this.startMeasure
          if (_this.startMeasure) {
            let jsonData = {
              coord_type: '0', //坐标类型(0:经纬度, 1:cad)
              cad_mapkey: 'default', //CAD基准点Key值, 项目中约定
            }

            _this.cloudRender.SuperAPI('StartMeasureTool', jsonData, (e) => {
            })
          } else {
            _this.cloudRender.SuperAPI('EndMeasureTool')
          }
        },
        WeatherChange() {
          _this.weathNum++
          _this.weathNum = _this.weathNum % 4

          let jsonData = {
            env_weather: _this.weather[_this.weathNum],
            //sunny: 晴天;
            //cloudy: 多云;
            //rainy: 雨天;
            //snowy: 雪天
          }
          _this.cloudRender.SuperAPI('SetEnvWeather', jsonData)
        },
        LightTime() {
          _this.showNum++
          _this.showNum = _this.showNum % 24
          let jsondata = {
            env_time: `${
              _this.showNum < 10 ? '0' + _this.showNum : _this.showNum
            }:00`,
          }
          _this.cloudRender.SuperAPI('SetEnvTime', jsondata)
        },
      }
    },
    InitEvent() {
      // this.AddSelfPOI();
      this.Control().WeatherChange()
      this.Control().LightTime()
    },
    // 事件注册函数
    myHandleResponseFunction(data) {
      let jsonObject = JSON.parse(data)
      switch (jsonObject.func_name) {
        case 'APIAlready':
          //云渲染场景加载完成 业务逻辑...

          document.querySelector('.btn').classList.add('show')
          document.querySelector('.btn4').classList.add('show')
          document.querySelector('.btn3').classList.add('show')
          document.querySelector('.btn2').classList.add('show')
          document.querySelector('.btn5').classList.add('show')
          document.querySelector('.btn6').classList.add('show')
          document.querySelector('.btn7').classList.add('show')
          document.querySelector('.btn9').classList.add('show')
          document.querySelector('.btn8').classList.add('show')
          document.querySelector('.btn10').classList.add('show')
          document.querySelector('.btn11').classList.add('show')
          document.querySelector('.btn12').classList.add('show')
          document.querySelector('.btn13').classList.add('show')
          document.querySelector('.btn14').classList.add('show')
          document.querySelector('.btn15').classList.add('show')
          this.InitEvent()
          break

        case 'OnPOIClick':
          // 返回一个点击POI的ID值
          break
      }
      return data
    },
    // 添加自定义POI点
    addCustomPOI() {
      let customPOIdata = {
        id: 'customPOI_ID',
        coord_type: '0',
        cad_mapkey: '',
        coord: '113.319626,23.140392',
        coord_z: '0',
        always_show_label: 'true',
        show_label_range: '0,8000',
        sort_order: 'false',
        state: 'state_1',
        marker: {
          size: '100,228',
          images: [
            {
              define_state: 'state_1',
              normal_url:
                'http://superapi.51hitech.com/doc-static/images/static/markerNormal.png',
              activate_url:
                'http://superapi.51hitech.com/doc-static/images/static/markerActive.png',
            },
          ],
        },
        label: {
          bg_image_url:
            'http://superapi.51hitech.com/doc-static/images/static/LabelBg.png',
          size: '140,54',
          offset: '50,204',
          text: 'lable标题',
          font_color: 'f9f9f9ff',
          text_boxsize: '140,44',
          text_offset: '0,5',
        },
        window: {
          url:
            'http://superapi.51hitech.com/doc-static/images/static/echarts.html',
          size: '520,350',
          offset: '50,180',
        },
      }

      this.cloudRender.SuperAPI('RemoveAllPOI')
      this.cloudRender.SuperAPI('AddCustomPOI', customPOIdata)
      setTimeout(
        () => this.cloudRender.SuperAPI('FocusPOI', 'customPOI_ID', 1800),
        5e2
      )
    },
  },
  computed: {},

  unmounted() {},
}
</script>

<style lang="scss" scoped>
.btn {
  position: fixed;
  right: 30px;
  top: 30px;
  color: #fff;
  background: #0a8;
  border: 1px solid #0a8;
  padding: 10px 30px;
  outline: none;
  font-size: 16px;
  cursor: pointer;
  z-index: 20000;
  display: none;
}

.btn2 {
  top: 90px;
}
.btn3 {
  top: 150px;
}
.btn4 {
  top: 210px;
}
.btn5 {
  top: 270px;
}
.btn6 {
  top: 330px;
}
.btn7 {
  top: 390px;
}
.btn8 {
  top: 450px;
}
.btn9 {
  top: 510px;
}
.btn10 {
  top: 570px;
}
.btn11 {
  top: 630px;
}
.btn12 {
  top: 690px;
}
.btn13 {
  top: 750px;
}
.btn14 {
  top: 810px;
}
.btn15 {
  top: 870px;
}

.btn.show,
.btn2.show,
.btn3.show,
.btn4.show,
.btn5.show,
.btn6.show,
.btn7.show,
.btn8.show,
.btn9.show,
.btn10.show,
.btn11.show,
.btn12.show,
.btn13.show,
.btn14.show,
.btn15.show {
  display: inline-block;
}
</style>
