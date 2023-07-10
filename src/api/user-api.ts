import { getCookie, setCookie } from "../utils/setCookies";
import {authInstance, instance} from "./base";
import { IAuthResponse } from "../interfaces/entities/IAuthResponse";
import { IUser } from "../interfaces/entities/IUserEntity";


export default class UserApi {
    public static async login(email: string, password: string): Promise<boolean>{
        try {
            const d = new FormData();
            d.append("grant_type", "password");
            d.append("username", email);
            d.append("password", password);
            const {data} = await authInstance.post<IAuthResponse>("/", d);


            if(data) {
                setCookie("refresh_token", data.refresh_token);
                setCookie("access_token", data.access_token);
            }
            return true;
        }
        catch(e) {
            return false;
        }
        
    }
    public static async getMe(): Promise<IUser | null> {
        try {
            const token = getCookie("access_token");
            if(!token) return null;
            const {data} = await instance.get<IUser>("/user", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            return data;
        }
        catch(e) {
            return null;
        }
    }
    public static async refresh():Promise<boolean> {
        try {
            const refresh = getCookie("refresh_token");
            if(!refresh) return false;
            const send = new FormData();
            send.append("grant_type", "refresh_token");
            send.append("refresh_token", refresh);
            send.append("scope", "api");

            

            const {data} = await authInstance.post<IAuthResponse>("/", send);
            if(data) {
                setCookie("refresh_token", data.refresh_token);
                setCookie("access_token", data.access_token);
            }
            return true;
        }
        catch(e) {
            return false;
        }
    }
}