/**
 * @file 通用工具函数库
 * @version v1.0
 */
export function isEmpty(obj) {
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
}