import axios from "axios";
import Cookies from "universal-cookie";
import {authInstance, instance} from "./base";
import { IAuthResponse } from "../interfaces/entities/IAuthResponse";
import { IUser } from "../interfaces/entities/IUserEntity";

const cookies = new Cookies();

export default class UserApi {
    public static async login(email: string, password: string): Promise<boolean>{
        try {
            const d = new FormData();
            d.append("grant_type", "password");
            d.append("username", email);
            d.append("password", password);
            const {data} = await authInstance.post<IAuthResponse>("/", d);

            const now = new Date();
            const nextMonth = new Date();
            nextMonth.setMonth(now.getMonth() === 11? 0:now.getMonth() + 1);

            if(data) {
                cookies.set("refresh_token", data.refresh_token, {
                    path: "/",
                    expires: nextMonth
                });
                cookies.set("access_token", data.access_token, {
                    path: "/",
                    expires: nextMonth
                });
            }
            return true;
        }
        catch(e) {
            console.error(e);
            return false;
        }
        
    }
    public static async getMe(): Promise<IUser | null> {
        try {
            const token = cookies.get("access_token");
            if(!token) return null;
            const {data} = await axios.get("https://gitlab.com/api/v4/user", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(data);
            return data as IUser;
        }
        catch(e) {
            console.log(e);
            return null;
        }
    }
    public static async refresh():Promise<boolean> {
        try {
            const refresh = cookies.get("refresh_token");
            if(!refresh) return false;
            const send = new FormData();
            send.append("grant_type", "refresh_token");
            send.append("refresh_token", refresh);
            send.append("scope", "api");

            const now = new Date();
            const nextMonth = new Date();
            nextMonth.setMonth(now.getMonth() === 11? 0:now.getMonth() + 1);

            const {data} = await authInstance.post<IAuthResponse>("/", send);
            if(data) {
                cookies.set("refresh_token", data.refresh_token, {
                    path: "/",
                    expires: nextMonth
                });
                cookies.set("access_token", data.access_token, {
                    path: "/",
                    expires: nextMonth
                });
            }
            return true;
        }
        catch(e) {
            return false;
        }
    }
}