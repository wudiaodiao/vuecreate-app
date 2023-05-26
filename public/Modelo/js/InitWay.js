// 初始化测量工具
function initDis() {
  // rulers.push(new Modelo.View.Tool.MeasureLines(viewer));
  rulers.push(new Modelo.View.Tool.MeasureLineStrip(viewer))
  rulers.push(new Modelo.View.Tool.MeasureArea(viewer))
  rulers.push(new Modelo.View.Tool.MeasureLine(viewer))
  // rulers.push(new Modelo.View.Tool.MeasureLineFan(viewer));
  // rulers.push(new Modelo.View.Tool.MeasureAngle(viewer));

  for (let i = 0; i < rulers.length; i++) {
    viewer.addTool(rulers[i])
    rulers[i].setEnabled(false)
    rulers[i].setUnit('m')
  }
}
// 开始测量
function disClick(key) {
  for (let i = 0; i < rulers.length; i++) {
    rulers[i].setEnabled(false)
  }
  selectElementTool.setEnabled(true)
  if (key != 4) {
    rulers[key - 1].setEnabled(true)
    selectElementTool.setEnabled(false)
    viewer.invalidate()
  }
}
// 动画效果gltf
function initAnimation(flag) {
  if (flag) {
    if (!person) {
      var path = gasPath['path0']
      person = new Modelo.View.Pawn(
        'person',
        viewer.getResourceManager(),
        viewer.getMaterialManager()
      )

      // Load local gltf file with animation info. Note: Modelo3d only support gltf 2.0 version for now.
      person.loadGltfModel('static/Modelo/gltf/scene.gltf').then(function() {
        viewer.getScene().addPawn(person, false)
        // Get the available animations.
        var skeleton = person.getSkeletons()[0]
        var animation = skeleton.getAnimations()[1]
        // Set skeleton animation speed. 模型动画速度
        animation.setSpeed(0.02)
        // Start animation.
        skeleton.doAnimation(animation)

        // Set the scaling and rotation of the person so that it can move forwad.
        person.setScaling(1.5, 1.5, 1.5)
        person.rotate(3.1416, [0, 0, 1], [0, 0, 0])

        var pathFollowingAnimator = new Modelo.View.PathFollowingAnimator(
          viewer,
          path
        )
        // Attach the person to the path following animation.
        pathFollowingAnimator.addPawn(person, false)
        // Set the path following animation speed. 模型在行进路线的速度
        pathFollowingAnimator.setSpeed(0.02)
        pathFollowingAnimator.start()
      })
    }
  } else {
    if (person) {
      viewer.getScene().removePawn(person)
      person = null
    }
  }
}
// 楼层和专业变化，透视等
function opcModel(opc) {
  // 设置边线
  // viewer.setEffectEnabled("Sketch", true);
  // viewer.setEffectParameter("Sketch", "detail", 1);
  // viewer.setEffectParameter("Sketch", "contrast", 1);
  // viewer.setEffectParameter("Sketch", "color", [0, 0, 0]);
  // 设置模型
  // viewer.setEffectParameter("Sketch", "colored", true);
  // viewer.setEffectParameter("Sketch", "surfaceColor", [0.5, 0.5, 0.5, 0.2]);

  //------------------------------
  if (opc) {
    viewer.setEffectEnabled('Sketch', true)
    viewer.setEffectParameter('Sketch', 'color', [
      220 / 255.0,
      220 / 255.0,
      220 / 255.0
    ])
    // viewer.setEffectParameter("Sketch", "colored", true);
    viewer.setEffectParameter('Sketch', 'surfaceColor', [0.75, 0.75, 0.75, 0.3])
    viewer.setEffectParameter('Sketch', 'transparents', true)
    viewer.setEffectParameter('Sketch', 'contrast', 30)
    viewer.setEffectParameter('Sketch', 'detail', 10)
  } else {
    viewer.setEffectEnabled('Sketch', false)
    viewer.setEffectEnabled('Sketch', false)
  }
}
function initloadWatch() {
  var path = gasPath['path0']
  animateRibbon = new Modelo.View.Visualize.AnimatingRibbon(
    viewer.getRenderScene()
  )
  animateRibbon.setEnabled(true)
  viewer.getScene().addVisualize(animateRibbon)
  animateRibbon.setParameter('width', 10)
  animateRibbon.setParameter('unitLenght', 1)
  animateRibbon.setParameter('speed', -1)
  animateRibbon.setParameter('platteTexture', 'static/Modelo/images/platte.png')
  animateRibbon.addRibbon(path)
  animateRibbon.setEnabled(false)
}
// 动态路线
function loadWatch(flag) {
  initAnimation(flag)
  animateRibbon.setEnabled(flag)
  return
  {
    // 批量路线图
    if (ribbonGroups) {
      Object.keys(gasPath).map(key => {
        let ribbonGroup = null
        const points = gasPath[key].map(point => [point[0], point[1], point[2]])

        if (ribbonGroups[key]) {
          ribbonGroup = ribbonGroups[key].group
          let visualize = viewer.getScene().getVisualize(ribbonGroup.name)
          visualize.setEnabled(!visualize.isEnabled())
          // viewer.getScene().removeVisualize(ribbonGroup)
        }
      })
      // ribbonGroups = null;
      return
    }

    ribbonGroups = {}
    const plattes = {
      path0: 'static/Modelo/images/arrowLine.png',
      path1: 'static/Modelo/images/arrowLine.png'
    }
    Object.keys(gasPath).map(key => {
      let ribbonGroup = null
      const points = gasPath[key].map(point => [point[0], point[1], point[2]])

      if (ribbonGroups[key]) {
        ribbonGroup = ribbonGroups[key].group
      } else {
        ribbonGroup = new Modelo.View.Visualize.AnimatingRibbon(
          viewer.getRenderScene()
        )
        ribbonGroup.setEnabled(true)
        viewer.getScene().addVisualize(ribbonGroup)
        ribbonGroup.setParameter('width', 15)
        ribbonGroup.setParameter('unitLenght', 70)
        ribbonGroup.setParameter('speed', -0.5)
        ribbonGroup.setParameter('platteTexture', plattes[key])
        ribbonGroups[key] = {
          group: ribbonGroup,
          ribbons: null
        }
      }
      ribbonGroups[key].ribbons = ribbonGroup.addRibbon(points)
    })
  }
}
// 鼠标点击自动隐藏构件功能 // 高亮 颜色自定义参照模袋示例 2D-3D
function clickHighlight(flag) {
  // 鼠标点击自动隐藏构件功能
  selectElementTool.setCloseUpEnabled(flag)
  selectElementTool.setHighlightEnabled(flag)
}
// 光源展示
function sunLight(flag) {
  viewer.setLightingLatitude(0.4) // 0-π/2 纬度;
  viewer.setLightingLongitude(0.4) // 0-2π 经度;
  viewer.setLightingIntensity(flag) // 0-1 强度;
}
// 初始化漫游
function initCameraNav() {
  // 设置阴影
  viewer.setSpecularEnabled(true)
  viewer.setShadowEnabled(true)
  viewer.setLightingLatitude(0.4) // 0-π/2 纬度;
  viewer.setLightingLongitude(0.4) // 0-2π 经度;

  selectElementTool = new Modelo.View.Tool.SelectElements(viewer)
  //添加构件选择工具以打开鼠标光标选择选项
  viewer.addTool(selectElementTool)
  selectElementTool.setEnabled(true)
  // 关闭鼠标点击自动隐藏构件功能
  selectElementTool.setCloseUpEnabled(false)
  selectElementTool.setHighlightEnabled(false)

  //通过使用鼠标点击事件，来获得鼠标在三维中的位置,然后把返回的点放入关键帧点列中
  viewer.getEventEmitter().on('onPointPicked', point => {
    // gasPath["path0"].push([point[0], point[1], point[2]]);

    sendMessage('sendBimPosIdLay', {
      point: `${point[0]},${point[1]},${point[2]}`
    })
    // console.log(camera.getData())
    console.log(`${point[0]},${point[1]},${point[2]}`)

    // keyPoints.push([point[0], point[1], point[2] + 6]);
    if (ctrl_focus) {
      alert([point[0], point[1], point[2]])
    }
  })
  // 当模型被选中的时候
  viewer.getEventEmitter().on('onElementSelected', elementNames1 => {
    changeElementColor(elementNames1)

    sendMessage('sendBimPosIdLay', {
      elementId: elementNames1[0]
    })

    selectedElements = elementNames1
    // Restore the element's colors.
    console.log(elementNames1[0])
    // 点击染色
    // if (ctrl_focus) {
    //   changeMaterialColor(elementNames1)
    //   elementId1.push(elementNames1[0])
    //   console.log(elementId1)
    // }
    sendMessage('informationShow', {
      value: false
    })
    if (elementNames1.length != 0) {
      searchProperties(elementNames1[0]).then(modelInfo => {
        modelInfo.unshift({
          name: 'ElementId',
          numValue: null,
          strValue: elementNames1[0]
        })
        sendMessage('GetBimProperty', {
          modelInfo,
          elementId: elementNames1[0]
        })
      })
    }
  })

  viewer.setSmartCullingEnabled(false)
}
function cameraLocation() {
  cameraInfo = {
    at: [387.5868225097656, 304.4556579589844, 68.5624008178711],
    distance: 1586.3307136924877,
    fov: 46,
    phi: 0.22851687870707715,
    theta: -11.007534305233255
  }
  setTimeout(() => {
    camera.setData(cameraInfo, false)
  }, 800)
}
// 还原
function originState() {
  cameraNavFlag = true
  toggleFly()
  toggleFlyCircle(0)
  explode(false)
  // loadWatch(false) // 需放在opcMpdel之上
  opcModel(false)
  disClick(4)
  sunLight(true)
  clickHighlight(false)
  changeTreeEvent(checkedFloors, checkedSubjects)

  cameraInfo = {
    at: [387.5868225097656, 304.4556579589844, 68.5624008178711],
    distance: 1586.3307136924877,
    fov: 46,
    phi: 0.22851687870707715,
    theta: -11.007534305233255
  }
  setTimeout(() => {
    camera.setData(cameraInfo, false)
  }, 2000)
}
function distanceVector(v1, v2) {
  var dx = v1[0] - v2[0]
  var dy = v1[1] - v2[1]
  var dz = v1[2] - v2[2]

  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}
// 第三方视角飞行 动画
function toggleAnimate() {
  var path = keyPoints

  // { // 单条路线图
  //     if (!animateRibbon1) {
  //         // Add Animating ribbon below the person to show the walking path.
  //         animateRibbon1 = new Modelo.View.Visualize.AnimatingRibbon(viewer.getRenderScene());
  //         animateRibbon1.setEnabled(true);
  //         viewer.getScene().addVisualize(animateRibbon1);
  //         animateRibbon1.setParameter("width", 10);
  //         animateRibbon1.setParameter("unitLenght", 1);
  //         animateRibbon1.setParameter("speed", -1);
  //         animateRibbon1.setParameter("platteTexture", "static/Modelo/images/platte.png");
  //         animateRibbon1.addRibbon(path);
  //     } else {
  //         animateRibbon1.setEnabled(!animateRibbon1.isEnabled());
  //     }
  // }

  if (person1) {
    viewer.getScene().removePawn(person1)
    person1 = null
    return
  }
  person1 = new Modelo.View.Pawn(
    'person1',
    viewer.getResourceManager(),
    viewer.getMaterialManager()
  )

  // Load local gltf file with animation info. Note: Modelo3d only support gltf 2.0 version for now.
  person1.loadGltfModel('static/Modelo/gltf/scene.gltf').then(function() {
    viewer.getScene().addPawn(person1, false)
    // Get the available animations.
    var skeleton = person1.getSkeletons()[0]
    var animation = skeleton.getAnimations()[1]

    // Set skeleton animation speed. 模型动画速度
    animation.setSpeed(0.02)
    // Start animation.
    skeleton.doAnimation(animation)

    // Set the scaling and rotation of the person1 so that it can move forwad.
    person1.setScaling(1.5, 1.5, 1.5)
    person1.rotate(3.1416, [0, 0, 1], [0, 0, 0])

    var pathFollowingAnimator = new Modelo.View.PathFollowingAnimator(
      viewer,
      path
    )
    // Attach the person1 to the path following animation.
    pathFollowingAnimator.addPawn(person1, false)
    // Set the path following animation speed. 模型在行进路线的速度
    pathFollowingAnimator.setSpeed(0.03)
    pathFollowingAnimator.start()
  })
}
// 飞行
function toggleFly() {
  // toggleAnimate();

  console.log(distanceVector(keyPoints[0], keyPoints[1]))
  console.log(distanceVector(keyPoints[1], keyPoints[2]))
  if (!cameraNavFlag && keyPoints.length > 2) {
    cameraNavigator.setSpeed(2.18)
    cameraNavigator.setRotationDuration(4)
    cameraNavigator.clearKeyPoints()

    keyPoints.forEach(function(keyPoint) {
      cameraNavigator.addKeyPoint(keyPoint)
    })
    selectElementTool.pick([], false)
    cameraNavigator.start()
    console.log(cameraNavigator)
    // keyPoints = [];
    cameraNavFlag = true
  } else {
    cameraNavigator.stop()
    cameraNavFlag = false
  }
}
// 旋转
function step() {
  // 相机动作
  const camera1 = viewer.getRenderScene().getCamera()
  camera1.rotate(2, 0)
  viewer.invalidate()
  circleIndex = requestAnimationFrame(step)
  if (circleFlag) {
    cancelAnimationFrame(circleIndex)
  }
}
// 初始光源效果
function initModelLight() {
  // viewer.setEffectEnabled("Glow", true);

  // viewer.getScene().setElementsColor(["Z83Eoj1R+0/9330900", "Z83Eoj1R+9327661/630150", "Z83Eoj1R+9335402/633466", "Z83Eoj1R+9331710/633466"], [1.0, 1.0, 0.0]);
  // viewer.getRenderScene().getEffect("Glow").addElements(["Z83Eoj1R+0/9330900", "Z83Eoj1R+9327661/630150", "Z83Eoj1R+9335402/633466", "Z83Eoj1R+9331710/633466"], {
  //     emissiveColor: [1.0, 1.0, 0.0]
  // });
  // viewer.setEffectParameter("Glow", "intensity", 0.5)

  viewer.setEffectEnabled('Highlight', true)
  viewer
    .getRenderScene()
    .getEffect('Highlight')
    .addElements(['Z8WlZZrA+23/789831'], {
      emissiveColor: [0.0, 1.0, 0.0]
    })
  viewer.setEffectParameter('Highlight', 'intensity', 0.5)
  viewer.setEffectParameter('Highlight', 'radius', 2.5)
}
// 报警闪烁
function initEventColor(ids) {
  eventElementIds = ids
  var flagShuo = false
  var time = 0
  function animate(now) {
    requestAnimationFrame(animate)
    time++
    if (time % 10 == 0) {
      if (flagShuo) {
        // viewer.setEffectParameter("Highlight", "intensity", 0.7);

        viewer
          .getScene()
          .setElementsColor(ids, [255 / 255, 150 / 255, 150 / 255])
      } else {
        // viewer.setEffectParameter("Highlight", "intensity", 0.4);

        viewer.getScene().setElementsColor(ids, [255 / 255, 58 / 255, 58 / 255])
      }
      flagShuo = !flagShuo
      viewer.invalidate()
    }
    if (time == 10000) {
      time = 0
    }
  }
  animate()
}

// 更改某种材质的element的颜色
function changeMaterialColor(elementNames1) {
  // 获取随机颜色值
  var randomColor = [Math.random(), Math.random(), Math.random()]
  if (elementNames1) {
    elementNames1.forEach(function(elementName) {
      // 获取elementName对应的材质名称（全局唯一）
      var materialsNames = viewer
        .getScene()
        .getElementMaterialNames(elementName)
      if (materialsNames) {
        materialsNames.forEach(function(materialName) {
          // 对每个材质名称，设置其颜色值
          viewer.setMaterialParameter(materialName, 'color', randomColor)
        })
      }
    })
  }
}
// 更改某个构件的颜色
function changeElementColor(elementIds) {
  if (selectElementNow != null && selectElementNow.length != 0) {
    // viewer.getScene().setElementsColor(selectElementNow, null)
    viewer
      .getRenderScene()
      .getEffect('Glow')
      .removeElements(selectElementNow)
  }
  selectElementNow = []
  if (elementIds.length > 0 && eventElementIds.indexOf(elementIds[0]) != -1) {
    return
  }
  selectElementNow = elementIds
  viewer.setEffectEnabled('Glow', true)
  viewer
    .getRenderScene()
    .getEffect('Glow')
    .addElements(elementIds, {
      emissiveColor: [1.0, 1.0, 1.0]
    })
  viewer.setEffectParameter('Glow', 'intensity', 0.2)
}

// 分层爆炸
function explode(flag) {
  if (flag) {
    var building_01exp = []
    var idx = 0
    console.log(building_exp)
    for (const key in building_exp) {
      // 外立面单独处理
      if (key == 9) {
        for (let j = 0; j < building_exp[key].length; j++) {
          building_exp[key] && building_01exp.push([500, 500, 0])
        }
      } else {
        for (let j = 0; j < building_exp[key].length; j++) {
          building_exp[key] && building_01exp.push([-300, -300, idx * 50.2])
        }
      }
      idx++
    }
    // 末尾添加
    for (let i = 0; i < building_others.length; i++) {
      building_01exp.push([0, 0, 0])
    }
    console.log(building, building_01exp)
    viewer.enterExplodedView(building, building_01exp)
  } else {
    viewer.quitExplodedView()
    selectElementTool.pick([], false)
    // changeTreeEvent(checkedFloors, checkedSubjects)
  }
}

// 搜索树 旋转
function toggleFlyCircle(stop) {
  circleFlag = stop == 0 ? true : !circleFlag
  window.requestAnimationFrame(step)
}

//获取构建详细信息
async function searchProperties(searchElementIdValue) {
  // 展示模型信息
  // Modelo.Model.getBBox(modelId).then(t=>{
  //     console.log(t);
  // })
  let modelInfo = []
  await Modelo.BIM.getElementProperties(
    modelId,
    searchElementIdValue,
    offlinemodel_path
  )
    .then(properties => {
      console.log(properties)
      modelInfo = properties
    })
    .catch(e => {
      console.log('queryElementBIMErr: ' + e)
    })

  return modelInfo
}

// 默认的键盘按键移动模型
function initKeyBoard() {
  var cameraManipulator = new Modelo.View.Tool.CameraManipulator(viewer)
  viewer.addTool(cameraManipulator)

  var keyboard = new Modelo.View.Input.Keyboard(viewer)
  viewer.addInput(keyboard)

  keyboard.addKeyUpListener(keyboard => {
    console.log(camera.getData())
    if (keyboard.keyCode === 27) {
      // Esc
      viewer.destroy()
    } else if (keyboard.keyCode === 77) {
      // M
      console.log(camera.core.eye)
      console.log(camera.getData())
    } else if (keyboard.keyCode === 65) {
      // A
      // var tmp = camera.getData();
      // tmp.distance = 1;
      // camera.setData(tmp,false);
    } else if (keyboard.keyCode === 16) {
      // Shift
      selectElementTool.setCloseUpEnabled(false)
      // cameraManipulator.setInputSensitivity({ mousePan: 1 })
      // cameraManipulator.setInputSensitivity({ mouseRotate: 1 })
      // cameraManipulator.setInputSensitivity({ mouseZoom: 1 })
      // cameraManipulator.setInputSensitivity({ keyPan: 1 })
      // cameraManipulator.setInputSensitivity({ keyForward: 1 })
    } else if (keyboard.keyCode === 17) {
      // Ctrl
      ctrl_focus = false
    } else if (keyboard.keyCode === 18) {
      // Alt
      isPointRoll = false
    }
  })
  keyboard.addKeyDownListener(keyboard => {
    if (keyboard.keyCode === 16) {
      //shift
      selectElementTool.setCloseUpEnabled(true)
      // cameraManipulator.setInputSensitivity({ mousePan: 0.01 })
      // cameraManipulator.setInputSensitivity({ mouseRotate: 0.01 })
      // cameraManipulator.setInputSensitivity({ mouseZoom: 0.02 })
      // cameraManipulator.setInputSensitivity({ keyPan: 0.01 })
      // cameraManipulator.setInputSensitivity({ keyForward: 0.01 })
    } else if (keyboard.keyCode === 17) {
      // Ctrl
      ctrl_focus = true
    } else if (keyboard.keyCode === 18) {
      // Alt
      isPointRoll = true
    } else if (keyboard.keyCode === 80) {
      // P
      if (ctrl_focus) {
        isPointShow = !isPointShow
      }
    }
  })
}

//获取key code
function getFlagForKeyCode(keyCode) {
  switch (keyCode) {
    case EVENT_KEY.KEY_W:
      return 'moveForward'
    case EVENT_KEY.KEY_S:
      return 'moveBackward'
    case EVENT_KEY.KEY_Q:
      return 'moveUp'
    case EVENT_KEY.KEY_E:
      return 'moveDown'
    case EVENT_KEY.KEY_D:
      return 'moveRight'
    case EVENT_KEY.KEY_A:
      return 'moveLeft'
    default:
      return undefined
  }
}

// 将数组转化为字典
function changeDic1(floors, floorTreeDic) {
  let res = {}

  floors.forEach(i => {
    if (floorTreeDic.hasOwnProperty(i)) {
      floorTreeDic[i].forEach(p => {
        res[p] = 1
      })
    }
  })

  return res
}
// 将数组转化为字典
function changeDic2(subjects, subjectTreeDic) {
  let res = {}

  subjects.forEach(i => {
    if (subjectTreeDic.hasOwnProperty(i)) {
      subjectTreeDic[i].forEach(p => {
        res[p] = 1
      })
    }
  })

  return res
}

function dealPointSubject(floors, subjects) {
  var points = selfPoints['Point']
  for (const subject in points) {
    for (const floor in points[subject]) {
      const elements = points[subject][floor]

      elements.forEach(element => {
        if (
          subjects.findIndex(p => p == subject) != -1 &&
          floors.findIndex(p => p == floor) != -1
        ) {
          element.isShow = true
        } else {
          element.isShow = false
        }
      })
    }
  }
}

// 将数组转化为字典 供分层爆炸使用
function initExplode() {
  let floorsDic = {}
  let list = floorTreeList[0].children

  list.forEach((model, idx) => {
    model.id.forEach(id => {
      floorsDic[id] = idx
    })
    model.children.forEach((m, idxx) => {
      m.id.forEach(d => {
        floorsDic[d] = idxx
      })
    })
  })

  let elements = localBimTree.elements
  let types = localBimTree.types
  let families = localBimTree.families
  let categories = localBimTree.categories
  let levels = localBimTree.levels
  let models = localBimTree.models
  for (const key in elements) {
    let element = elements[key]
    let type = types[element.typeId]
    let family = families[type.familyId]
    let category = categories[family.categoryId]
    let level = levels[category.levelId]
    let model = models[level.modelId]

    if (floorsDic.hasOwnProperty(level.id)) {
      if (!building_exp[floorsDic[level.id]]) {
        building_exp[floorsDic[level.id]] = []
      }
      building_exp[floorsDic[level.id]].push([key]) // 楼层填满
    } else {
      building_others.push([key]) // 未找到的构建
    }
  }
  console.log(floorsDic)
  for (const key in building_exp) {
    for (let j = 0; j < building_exp[key].length; j++) {
      building_exp[key] && building.push(building_exp[key][j])
    }
  }
  for (let i = 0; i < building_others.length; i++) {
    building.push(building_others[i])
  }
}

// 楼层或专业改变时的事件
function changeTreeEvent(floors, subjects) {
  dealPointSubject(floors, subjects)
  // floorTreeList,systemTreeList
  // 从该两个列表中寻找到所有符合要求的对应的ids。
  let floorsDic = changeDic1(floors, floorTreeDic)
  let subjectsDic = changeDic2(subjects, subjectTreeDic)

  let show = []
  let hide = []

  let elements = localBimTree.elements
  let types = localBimTree.types
  let families = localBimTree.families
  let categories = localBimTree.categories
  let levels = localBimTree.levels
  let models = localBimTree.models

  for (const key in elements) {
    let element = elements[key]
    let type = types[element.typeId]
    let family = families[type.familyId]
    let category = categories[family.categoryId]
    let level = levels[category.levelId]
    let model = models[level.modelId]
    // 必须保证楼层和专业同时选中才能展示
    if (
      subjectsDic.hasOwnProperty(element.id) &&
      floorsDic.hasOwnProperty(level.id)
    ) {
      show.push(key)
    } else {
      hide.push(key)
    }
  }

  viewer.getScene().setElementsVisibility(hide, false)
  viewer.getScene().setElementsVisibility(show, true)
  viewer.invalidate()
  // insertDB()
}

// 获取运行监控数据
function getTreeData() {
  while (true) {
    if (checkedFloors) {
      sendMessage('initTree', {
        floorTreeList,
        systemTreeList,
        checkedFloors,
        checkedSubjects
      })
      break
    }
  }
}

// 设备回显 - 对应构件
function setPointEcho(id) {
  if (!id || id.length == 0) return
  // id = [] superMap  id = string modaiyun
  changeElementColor([id])

  // 设备回显Modelo代码 // 文档： https://api-doc.modeloapp.com/modelo.view.tool.selectelements
  selectElementTool.setCloseUpEnabled(true)
  // selectElementTool.setHighlightEnabled(true);
  // let elementId = "Z8WLeLrA+0/6140481";
  //Z8WLeLrA+0/6140481 Z8WLeLrA+0/6360320
  selectElementTool.pick([id], true)
  searchProperties(id).then(modelInfo => {
    sendMessage('GetBimProperty', {
      modelInfo,
      elementId: id
    })
  })

  // selectElementTool.setHighlightEnabled(false);
  selectElementTool.setCloseUpEnabled(false)
  console.log(selectElementTool)
}

function setSelfPointEcho(elementId) {
  var points = selfPoints['Point']
  for (const subject in points) {
    for (const floor in points[subject]) {
      const elements = points[subject][floor]

      elements.forEach(element => {
        element.isShow = false
        if (element.elementId == elementId) {
          element.isShow = true
          console.log(subject, floor, element)
          // setPointEchoXYZ(element.location)
        }
      })
    }
  }
}
// 设备回显 - 对应坐标 -- 自定义图标回显功能
function setPointEchoXYZ(position) {
  var car = camera.getData()
  car.at = position
  car.distance = 20
  camera.setData(car, false)
}
function setPointEchoMB() {
  var car = {
    at: [362.6410720045167, 404.93464879065846, -18.02013972798653],
    distance: 1586.3307136924877,
    fov: 46,
    phi: 1.0709168787070773,
    theta: 1.5723363091259166
  }

  camera.setData(car, false)
}

// 获取构件材质 MaterialAdhoc MaterialPbr(该材质能实现反光效果)
function getModelMaterial() {
  var list = viewer.getScene().getModelMaterialNames().Z83Eoj1R
  var pbr = 0
  var adhoc = 0
  for (var i = 0; i < list.length; i++) {
    if (viewer.getScene().getMaterialType(list[i]) == 'MaterialAdhoc') {
      adhoc++
    } else {
      pbr++
    }
  }
  console.log('pbr:' + pbr + '  ---  ' + 'adhoc:' + adhoc)
}

// 发送消息给父窗口
function sendMessage(cmd, params) {
  window.parent.postMessage(
    {
      cmd: cmd,
      params: params
    },
    origin
  )
}
