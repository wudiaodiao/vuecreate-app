/*
 * @Author: your name
 * @Date: 2021-10-13 10:24:28
 * @LastEditTime: 2022-01-17 15:54:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ibms_ty/src/js/htmlToPdf.js
 */
// utils -> htmlToPdf.js
// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
  install(Vue, options) {
    Vue.config.globalProperties.getPdf = function() {
      var title = this.htmlTitle // 需要导出页面的标题，在导出的页面的data中声明 htmlTitle，具体看下方代码
      html2Canvas(document.querySelector('#pdfDom'), {
        // 需要导出页面内容的容器的 id 跟此处 "#pdfDom" 一致
        allowTaint: true,
        useCORS: true
      }).then(function(canvas) {
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        let pageHeight = (contentWidth / 592.28) * 841.89
        let leftHeight = contentHeight
        let position = 0
        let imgWidth = 595.28
        let imgHeight = (592.28 / contentWidth) * contentHeight
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        let PDF = new JsPDF('', 'pt', 'a4')
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save(title + '.pdf')
      })
    }

    // 获取截图
    Vue.config.globalProperties.getChartImg = async function(id) {
      return new Promise(function(resolve, reject) {
        var chartImgDom = document.querySelector(id)
        chartImgDom.style.backgroundColor = window.ExportBackgroundColor
        html2Canvas(chartImgDom).then(function(canvas) {
          canvas.toBlob(res => {
            var file = new File([res], 'chartsImg.png', { type: 'image/png' })
            resolve(file)
          })
        })
        chartImgDom.style.backgroundColor = ''
      })
    }

    // 预览文件
    Vue.config.globalProperties.previewChartImg = function(file) {
      handleChange(file)
    }

    async function handleChange(file) {
      if (file) {
        var previewSrc = await new Promise((resolve, reject) => {
          const fileReader = new FileReader()
          fileReader.readAsDataURL(file)
          fileReader.onload = () => resolve(fileReader.result)
          fileReader.onerror = err => reject(err)
        })
        handlePreview(previewSrc)
      }
    }

    // 预览
    function handlePreview(val) {
      if (val) {
        const image = new Image()
        image.src = val
        const imgWindow = window.open(val)
        imgWindow.document.write(image.outerHTML)
      }
    }
  }
}
