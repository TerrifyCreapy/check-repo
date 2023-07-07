import { makeAutoObservable } from "mobx";
import { IUser } from "../interfaces/entities/IUserEntity";
import UserApi from "../api/user-api";
import { cookie } from "../api/base";

export default class UserStore {
    user: IUser | null;
    isAuth: boolean;
    isLoading: boolean;
    constructor() {
        makeAutoObservable(this);
        this.user = null;
        this.isAuth = false;
        this.isLoading = false;
    }

    setUser(user: IUser | null) {
        try {
            this.user = user;
        }   
        catch(e) {
            console.error(e);
        }
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setIsAuth(bool: boolean) {
        this.isAuth = bool;
    }

    async login(email: string, password: string) {
        try {
            const success = await UserApi.login(email, password);
            if(!success) throw new Error("Not success request!");
            const user = await UserApi.getMe();
            this.setUser(user);
            if(user) this.setIsAuth(true);
            return true;
        }
        catch(e) {
            console.error(e);
            return false;
        }
    }

    logout(): boolean {
        try {
            cookie.remove("access_token");
            cookie.remove("refresh_token");
            this.setIsAuth(false);
            return true;
        }
        catch(e) {
            console.error(e);
            return false;
        }
    }

    async getMe() {
        try {
            this.setLoading(true);
            await this.refresh();
            const user = await UserApi.getMe();
            this.setUser(user);
            this.setLoading(false);
            if(user) this.setIsAuth(true);
        }
        catch(e) {
            console.error(e);
        }
    }

    async refresh() {
        try {
            const success = await UserApi.refresh();
        }
        catch(e) {
            console.error(e);
        }
    }
}