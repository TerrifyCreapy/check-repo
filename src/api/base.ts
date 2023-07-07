import axios from "axios";
import Cookies from "universal-cookie";
import { baseURLAuth, baseURLAPI } from "../contants/url";


export const cookie = new Cookies();

export const authInstance = axios.create({
    baseURL: baseURLAuth,
    withCredentials: false,
})

export const instance = axios.create({
    baseURL: baseURLAPI,
});