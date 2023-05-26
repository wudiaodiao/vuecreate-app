// 扬子江离线
async function initTree() {
  let elementssss = []
  var bimTree = await Modelo.BIM.getTreeInfo(modelId, offlinemodel_path)
  localBimTree = bimTree
  console.log(bimTree)

  let models = bimTree.models
  let levels = bimTree.levels
  let categories = bimTree.categories
  let families = bimTree.families
  let types = bimTree.types
  let elements = bimTree.elements
  elementssss = elements
  checkedFloors = []
  checkedSubjects = []
  allSubjects = []
  floorTreeList = [] // 列表
  systemTreeList = []
  {
    // 获取floors
    // 获取数据
    let floor = {
      children: [],
      label: '楼层',
      id: [],
      key: '楼层',
      ischeck: true
    }
    let nums = []

    floor.children.push({
      children: [],
      label: 'B1F',
      id: [],
      key: 'B1F',
      ischeck: true
    })
    checkedFloors.push('B1F')
    floor.children.push({
      children: [],
      label: '地面',
      id: [],
      key: '地面',
      ischeck: true
    })
    checkedFloors.push('地面')
    for (let i = 1; i <= 7; i++) {
      var key = i + 'F'
      floor.children.push({
        children: [],
        label: i + 'F',
        id: [],
        key: key,
        ischeck: true
      })
      checkedFloors.push(key)
    }
    floor.children.push({
      children: [],
      label: '外立面',
      id: [],
      key: '外立面',
      ischeck: true
    })
    checkedFloors.push('外立面')

    for (const key in levels) {
      let level = levels[key]
      let model = models[level.modelId]

      let names = model.name
        .replace('简_', '')
        .replace('.fbx', '')
        .replace('_车位', '')
        .replace('_区域', '')
        .replace('主体_', '')
        .replace('_小路', '')
        .replace('_夹层', '')
        .replace('地块', '地面')

      var tmpIdx = floor.children.findIndex(a => a && a.label == names)
      if (tmpIdx != -1) {
        floor.children[tmpIdx].id.push(level.id)
      }

      /// 处理 floorTreeDic 字典(结构'Floor':[levelid])
      var currentFloorName = floor.children[tmpIdx].label
      if (floorTreeDic.hasOwnProperty(currentFloorName)) {
        floorTreeDic[currentFloorName].push(key)
      } else {
        floorTreeDic[currentFloorName] = [key]
      }
    }

    floorTreeList.push(floor)
    console.log(floorTreeList, 'floors-levels')
  }
  {
    let systemClone = {
      children: [],
      label: '专业',
      id: [],
      ischeck: false,
      key: 'subject-0'
    }

    systemClone.children.push({
      children: [],
      label: '建筑工程',
      id: [],
      ischeck: true,
      key: '建筑工程'
    })

    for (const key in elements) {
      let element = elements[key]
      systemClone.children[0].id.push(element.id)
    }
    subjectTreeDic['建筑工程'] = systemClone.children[0].id
    checkedSubjects.push('建筑工程')

    var selfSubjects = selfPoints['Subject']
    selfSubjects = selfSubjects.reverse()
    selfSubjects.forEach(element => {
      systemClone.children.unshift({
        children: [],
        label: element,
        id: [],
        ischeck: false,
        key: element
      })
    })

    systemTreeList.push(systemClone)
    console.log(systemTreeList, 'subjects-families')
  }

  var selfSubject = selfPoints['Subject']
  allSubjects = allSubjects.concat(selfSubject)
  allSubjects = allSubjects.concat(checkedSubjects)
  sendMessage('initTree', {
    floorTreeList,
    systemTreeList,
    checkedFloors,
    checkedSubjects,
    allSubjects
  })
  // 初始化爆炸数据
  initExplode()
  console.log('elements.length : ' + Object.keys(bimTree.elements).length)
}
// 扬子江
function onload() {
  Modelo.init({ endpoint: 'https://build-portal.modeloapp.com', appToken })

  viewer = new Modelo.View.Viewer3D('modelContainer', {
    useWebGL2: true
  }) // ,{stencil: true} 边框
  camera = viewer.getCamera()
  cameraNavigator = new Modelo.View.Tool.CameraNavigator(viewer)
  // viewer.setRenderingLinesEnabled(true);
  viewer
    .loadModel(
      modelId,
      {
        onProgress: progress => {
          var c = document.getElementById('progress')
          c.innerHTML = 'Loading...'
          if (progress == 1) {
            c.style.display = 'none'
          }
        },
        cameraInfo
      },
      true,
      true,
      offlinemodel_path
    )
    .then(function() {
      sendMessage('onloadEnd', {
        value: false
      })

      viewer.addInput(new Modelo.View.Input.Mouse(viewer))
      viewer.addInput(new Modelo.View.Input.Touch(viewer))

      var cameraManipulator = camera.getManipulator()
      cameraManipulator.setInputSensitivity({ keyForward: 0.003 })
      //   Add mouse to control camera
      initDis()
      // 创建漫游点位
      initCameraNav()

      initKeyBoard()
      // initloadWatch()
      // initAnimation()
      // 打点

      // 报警闪烁
      // initEventColor();
      // 灯光
      // initModelLight();
      viewer.setBackgroundColor([0, 0, 0, 0])
    })
    .catch(function(errmsg) {
      console.log(errmsg)
    })
}

// 打点
function setPoint() {
  console.log(selfPoints)
  var body = document.querySelector('body')

  var imgs = []
  var points = selfPoints['Point']
  var idx = 0
  for (const subject in points) {
    for (const floor in points[subject]) {
      const elements = points[subject][floor]

      elements.forEach(element => {
        var img = document.createElement('img')
        img.setAttribute('src', 'static/Modelo/images/' + element.img)
        img.setAttribute('id', 'img_' + idx++)
        img.setAttribute('class', 'point_css')
        img.onclick = function(e) {
          // setPointEchoXYZ(element.location)
          sendMessage('GetBimProperty', {
            modelInfo: '',
            elementId: element.elementId
          })
        }
        body.appendChild(img)
        imgs.push(img)

        var label = document.createElement('label')
        label.setAttribute('id', 'label_' + (idx - 1))
        label.setAttribute('class', 'point_label_css')
        label.innerHTML = element.equipmentName
        label.onclick = function(e) {
          sendMessage('GetBimProperty', {
            modelInfo: '',
            elementId: element.elementId
          })
        }
        body.appendChild(label)
      })
    }
  }

  viewer.setUpdateCallback(function() {
    var idx = 0

    for (const subject in points) {
      for (const floor in points[subject]) {
        const elements = points[subject][floor]

        elements.forEach(element => {
          var imgId = 'img_' + idx++
          var position2D = viewer.getCamera().project(element.location)
          document.getElementById(imgId).style.left = position2D[0] + 'px'
          document.getElementById(imgId).style.top = position2D[1] + 'px'
          document.getElementById(imgId).style.display = element.isShow
            ? 'block'
            : 'none'

          var labelId = 'label_' + (idx - 1)
          document.getElementById(labelId).style.left =
            position2D[0] - 20 + 'px'
          document.getElementById(labelId).style.top = position2D[1] + 20 + 'px'
          document.getElementById(labelId).style.display = element.isShow
            ? 'block'
            : 'none'
        })
      }
    }
  })
}

function initSelfPointData(list) {
  selfPoints['Subject'].forEach(p => {
    selfPoints['Point'][p] = {}
    selfPoints['Floor'].forEach(k => {
      selfPoints['Point'][p][k] = []
    })
  })

  list.forEach(p => {
    var pos = p.position.split(',')
    if (pos.length == 3) {
      selfPoints['Point'][p.subject][p.floor].push({
        location: [pos[0], pos[1], pos[2]],
        img: p.image1,
        elementId: p.elementId,
        equipmentName: p.equipmentName,
        isShow: false
      })
    }
  })

  list.forEach(element => {})
  console.log(selfPoints, 'selfPoints -- ')
  setPoint()
}

// 下载
// Modelo.Model.get(modelId).then(res => {
//     res.convertedUrls.forEach(data => {
//         window.open(data.url);
//     });
// })
