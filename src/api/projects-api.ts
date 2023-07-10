import { instance } from "./base";
import { getCookie } from "../utils/setCookies";
import { makeLink } from "../utils/makeLink";
import { getStatus } from "../utils/getStatus";
import { getDate } from "../utils/getDate";

export default class ProjectsAPI {
    public static async isRepository(repository: string): Promise<boolean> {
        try {
            const link = makeLink(repository);
            await instance.get(`/projects/${link}`, {
                headers: {
                    "Authorization": `Bearer ${getCookie("access_token")}`
                }
            });
            return true;
        }
        catch(e: any) {
            return false;
        }
    }
    public static async getMergeRequests(repository:string):Promise<number> {
        try {
            const link = makeLink(repository);
            const {data} = await instance.get<any[]>(`/projects/${link}/merge_requests?state=opened`, {
                headers: {
                    "Authorization": `Bearer ${getCookie("access_token")}`
                }
            });
            return data.length;
        }
        catch(e) {
            return 0;
        }
    }
    public static async getFeatureBranches(repository: string): Promise<number> {
        try {
            const link = makeLink(repository);
            const {data} = await instance.get<{name: string}[]>(`/projects/${link}/repository/branches`, {
                headers: {
                    "Authorization": `Bearer ${getCookie("access_token")}`
                }
            });
            let cnt = 0;
            for(let i = 0; i < data.length; i++) {
                if((data[i].name as string).toLowerCase().startsWith("feature")) cnt++;
            }
            return cnt;
        }
        catch(e) {
            return 0;
        }
    }
    public static async isTheSame(repository: string): Promise<boolean> {
        try {
            const link = makeLink(repository);
            const {data} = await instance.get<{commit: any[], commits: any[], diffs: any[]}>(`/projects/${link}/repository/compare?from=master&to=dev`, {
                headers: {
                    "Authorization": `Bearer ${getCookie("access_token")}`
                }
            });

            if(!data.commit && !data.commits.length && !data.diffs.length) {
                return true;
            }
            else {
                return false;
            }
        }
        catch(e) {
            return true;
        }
    }
    public static async getPipeLinesStatus(repository: string): Promise<{status: "success" | "error" | "processing", date: string | null}> {
        try {
            const link = makeLink(repository);
            const {data} = await instance.get<{status: string, updated_at: string}[]>(`/projects/${link}/pipelines?ref=master`, {
                headers: {
                    "Authorization": `Bearer ${getCookie("access_token")}`
                }
            });
            const status = data.length === 0? "success" : getStatus(data[data.length-1]);
            const date = data.length === 0? "null": getDate(data[data.length-1].updated_at);
            return {status, date};
        }
        catch(e) {
            return {status: "success", date: getDate("null")};
        }
    }

}