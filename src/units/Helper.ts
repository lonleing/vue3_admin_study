import { ref } from "vue"
const queueList: (() => void)[] = []

let hasResizeEvent = false
export function isMobile (callback?: () => void) {
    const flag = ref(isMobileNoRef() || (!isMobileNoRef() && window.innerWidth < 1100))
    queueList.push(function () {
        if (window.innerWidth < 800 && !flag.value) {
            flag.value = true
        } else if (window.innerWidth >= 800 && flag.value) {
            flag.value = false
        }
        if (callback) callback()
    })
    if (!hasResizeEvent) {
        hasResizeEvent = true
        addEventListener('resize', function () {
            queueList.forEach(callbackItem => {
                callbackItem()
            })
        })
    }
    return flag
}

export function isMobileNoRef () {
    const rule = /(?:phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    let flag = rule.test(navigator.userAgent)
    if (window.innerWidth < 1100 && !flag) {
        flag = true
    } else if (window.innerWidth >= 1100 && flag) {
        flag = false
    }
    return flag
}