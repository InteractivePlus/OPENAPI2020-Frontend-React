export function textSelect(element) {
    // const start = 0;
    // const end = element.value.length;

    //element.setSelectionRange(start, end);
    try {
        element.focus();
    } catch (e) {
        console.log(element)
    }
}

export function removeDefaultBehavior(event) {
    event = event || window.event; //用于IE
    if (event.preventDefault) event.preventDefault(); //标准技术
    if (event.returnValue) event.returnValue = false; //IE

    // 阻止事件冒泡
    if (event.stopPropagation) {
        event.stopPropagation();
    }
    return false; //用于处理使用对象属性注册的处理程序
}

export function isFunction(any) {
    return typeof any === "function";
}
