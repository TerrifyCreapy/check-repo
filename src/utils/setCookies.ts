import Cookies from "universal-cookie";

export const cookie = new Cookies();

export function setCookie(name: string, value: string):void {
    const now = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(now.getMonth() === 11? 0:now.getMonth() + 1);
    cookie.set(name, value, {
        path: "/",
        expires: nextMonth,
        sameSite: "strict",
    })
};

export function removeCookie(...args: string[]):void {
    for(let arg of args) {
        cookie.remove(arg);
    }
    
}

export function getCookie(name: string): string {
    return cookie.get(name);
}