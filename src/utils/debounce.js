/***
 * 防抖函数 在wait间隔时间内不再进行任何调用时，触发一次最后的调用（如:wait设置为300ms，一直点击，该函数一直不执行，只有在间隔了300ms不做任何点击后，才执行刚才的最后一次点击）
 * @ func 执行函数
 * @ wait 等待时间
 * @ {Boolean} immediate 是否立即执行
 * @ return {Function}
 */
export function debounce(func, wait, immediate) {
    let timeout = null
    return function (...args) {
        let context = this
        if (timeout) {
            clearTimeout(timeout)
        }
        if (immediate) {
            let callNow = !timeout
            timeout = setTimeout(() => {
                timeout = null
            }, wait)
            if (callNow) {
                func.apply(context, args)
            }
        } else {
            timeout = setTimeout(() => {
                func.apply(context, args)
            }, wait)
        }
    }
}