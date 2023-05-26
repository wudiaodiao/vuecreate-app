export {}
declare module 'index'
declare module '@/js/htmlToPdf'
declare global {
    interface Window {
        ApiFileURL: any;//全局变量名
        ApiBaseURL: any;
    }
}