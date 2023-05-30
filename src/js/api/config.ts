/*
 * @Author: your name
 * @Date: 2020-11-09 20:45:22
 * @LastEditTime: 2022-03-07 17:52:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \IBMS\ibms\public\config.js
 */

// 本地
// window.ApiBaseURL = "http://192.168.1.6/ZEYY_MMS/";
// window.ApiFileURL = "http://192.168.1.6/ZEYY_FS/";

// 测试环境
window.ApiBaseURL = "http://116.62.58.28/EB_MMS/";
// window.ApiBaseURL = "https://60.191.103.119:8898/MMS/";
window.ApiFileURL = "http://116.62.58.28/ZEYY_FS/";
window.ImgFileURL = 'http://116.62.58.28/ZEYY_SSO/scan.html';
window.ExportBackgroundColor = '#808080'

window.ModelType = 'modaiyun' // superMap modaiyun modaiyun_offline
window.runTimer // 设备运行状态定时器
window.ApiToken = {
    set: function(token: string) {
        localStorage.setItem('IBMSToken', token)
    },
    get: function() {
        return localStorage.getItem('IBMSToken')
    }
}