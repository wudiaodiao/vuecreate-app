/*
 * @Author: your name
 * @Date: 2020-11-04 17:53:38
 * @LastEditTime: 2021-11-23 15:25:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \IBMS\ibms\src\js\rem.js
 */
// rem等比适配配置文件
// 基准大小
const baseSize = 16
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 1920宽的缩放比例，可根据自己需要修改。
  //window.innerWidth

  const scale = document.documentElement.clientWidth / 1920
  // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
  document.documentElement.style.fontSize = baseSize * scale + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}



