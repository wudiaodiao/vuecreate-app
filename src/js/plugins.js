/*
 * @Author: your name
 * @Date: 2022-02-18 14:41:59
 * @LastEditTime: 2022-02-18 14:46:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /ibms_ty/src/js/ plugins.js
 */
export default {
  install(Vue) {
      // 防止重复点击
      Vue.directive('preventReClick', {
          inserted(el, binding) {
              el.addEventListener('click', () => {
                  if (!el.disabled) {
                      el.disabled = true;
                      setTimeout(() => {
                          el.disabled = false;
                      }, binding.value || 2000)
                  }
              })
          }
      })
  }
}
