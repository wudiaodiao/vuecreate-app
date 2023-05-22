/*
 * @Author: your name
 * @Date: 2020-11-04 17:53:38
 * @LastEditTime: 2021-12-01 17:42:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ibms\src\js\Tools.js
 */
import { Message } from 'element-ui'

export default {
  //时间对象转字符串
  formatDate(date) {
    if (typeof date == 'string') {
      return date
    }
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    var d = date.getDate()
    d = d < 10 ? '0' + d : d
    return y + '-' + m + '-' + d
  },
  //Layer提示框
  LayerMsgInfo(msg) {
    Message.success({
      showClose: false,
      duration: 3000,
      message: msg,
      type: 'success',
      offset: 80
    })
  },

  LayerMsgErr(msg) {
    //警告提示框
    Message.warning({
      showClose: false,
      duration: 3000,
      message: msg,
      type: 'warning',
      offset: 80
    })
  },
   
  //返回时分
  getTimer() {
    var time = new Date()
    var h = time.getHours() //时
    h = h < 10 ? '0' + h : h //如果值小于1的话前面补零
    var m = time.getMinutes() //分
    m = m < 10 ? '0' + m : m
    // var s = time.getSeconds() //秒
    // s = s < 10 ? '0' + s : s
    return h + ':' + m
  },
  //年月日
  ymr() {
    //获取年月日
    //创建日期对象
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var dates = date.getDate()
    var arr = [
      '星期七',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六'
    ]
    var day = date.getDay()
    return year + '/' + month + '/' + dates + ' ' + arr[day]
  },
  timeFormat(Time) {
    if (Time == null) {

      return Time
    } else {
      return Time.split('T')
        .join(' ')
        .substring(0, 16)
    }
  },
  timeFormat2(Time) {
    if (Time == null) {

      return Time
    } else {
      return Time.split('T')
        .join(' ')
        .substring(0, 10)
    }
  },
  timeFormatAll(Time) {
    if (Time) {
      return Time.split('T')
        .join(' ')
        .substring(0, 19)
    } else {
      return Time
    }
  },

  accessControl(value, parameter) {
    return value.indexOf(parameter) != -1
    var falg = false
    for (let i in value) {
      let item = value[i].subMenu
      if (item) {
        if (this.accessControl(item, parameter)) return true
      } else {
        if (value[i].data) {
          value[i].data.find(findParaneter => {
            if (findParaneter.key == parameter && findParaneter.selected) {
              falg = findParaneter.selected
            }
          })
        }
      }
    }
    return falg
  },
  GetRequest(str) {
    var theRequest = new Object()

    var strs = str.split('&')
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }

    return theRequest
  },

  noImg(img) {
    var pos = img.lastIndexOf('.')
    var imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp']
    var extension = img
      .substr(pos)
      .toLowerCase()
      .replace(/(\s*$)/g, '')
    return imageExtensions.indexOf(extension) == -1
  },
  getTreeIds(id) {
    var ids = [];
    if (!id) return ids;

    let sep = '.';
    while (id) {
      let pos = id.lastIndexOf(sep);
      if (pos == -1 || pos == 0)
        break;
      
      id = id.substr(0, pos + 1);
      ids.splice(0, 0, id);
      id = id.substr(0, pos);
    }
    return ids;
  }
}
