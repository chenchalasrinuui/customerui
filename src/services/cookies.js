
import { getDate, getPrevDate } from "./functions"
import { getCookiesObj } from "./functions"
export class AppCookies {
    static setCookie(key, value, days) {
        if (days) {
            document.cookie = `${key}=${value};expires=${getDate(days)}`
        } else {
            document.cookie = `${key}=${value}`
        }
    }
    static getCookie(key) {
        const cookieObj = getCookiesObj();
        return cookieObj[key]
    }

    static getAllCookies() {
        return getCookiesObj();
    }
    static deleteCookie(key) {
        document.cookie = `${key}=;expires=${getPrevDate()}`

    }
    static clear() {
        const cookiesObj = getCookiesObj();
        for (const key in cookiesObj) {
            document.cookie = `${key}=;expires=${getPrevDate()}`
        }
    }
    static isUserLoggedIn() {
        const { uid } = getCookiesObj()
        return uid ? true : false
    }
}

