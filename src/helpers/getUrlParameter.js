/**
 * @file 获得URL通过"?"后缀传的参数
 * @version v1.0
 */
export function getUrlParameter(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}
