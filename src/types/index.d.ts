export {}
declare module 'index'
declare module '@/js/htmlToPdf'
declare global {
    interface Window {
        ApiFileURL: any;//全局变量名
        ApiBaseURL: any;
        ImgFileURL: string;
        ExportBackgroundColor: string;
        ModelType: string;
        runTimer: any;
        ApiToken: ApiTokenclass;
    }
    interface ApiTokenclass {
        set: any;
        get: any;
    }
}