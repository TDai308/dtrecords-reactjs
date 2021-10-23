import Cookie from "universal-cookie";

const cookie = new Cookie();

class CookieService {
    get(key:string) {
        return cookie.get(key);
    };

    set(key:string, value:string, option: Object) {
        return cookie.set(key,value,option);
    };

    remove(key:string) {
        return cookie.remove(key);
    };
}

export default new CookieService();

