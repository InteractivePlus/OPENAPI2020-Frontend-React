/**
 * @file 通用工具函数库
 * @version v1.0
 */
//判断是否为空
export function isEmpty(obj) {
    try {
        if (typeof obj == "undefined" || obj == null || obj === "") {
            return true;
        } else {
            return false;
        }
    }
    catch (err) {
        return false;
    }
}

//判断是否是URL
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
const httpUrlReg = /^http(s)?:\/\//
export const isHttpUrl = (path) => httpUrlReg.test(path);
//获取页面参数
// export const getPageQuery = () => parse(window.location.href.split('?')[1]);
