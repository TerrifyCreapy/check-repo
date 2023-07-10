import axios from "axios";
import { baseURLAuth, baseURLAPI } from "../contants/url";


export const authInstance = axios.create({
    baseURL: baseURLAuth,
    withCredentials: false,
})

export const instance = axios.create({
    baseURL: baseURLAPI,
});