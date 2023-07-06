import Cookies from "universal-cookie";
import { makeLink } from "../utils/makeLink";
import axios from "axios";
import { getStatus } from "../utils/getStatus";

const cookie = new Cookies();

export default class ProjectsAPI {
    public static async getMergeRequests(repository:string):Promise<number> {
        try {
            const link = makeLink(repository);
            console.log(cookie.get("access_token"));
            const {data} = await axios.get(`https://gitlab.com/api/v4/projects/${link}/merge_requests?state=opened`, {
                headers: {
                    "Authorization": `Bearer ${cookie.get("access_token")}`
                }
            });
            return data.length;
        }
        catch(e) {
            console.error(e);
        }
        return 0;
    }
    public static async getFeatureBranches(repository: string): Promise<number> {
        try {
            const link = makeLink(repository);
            const {data} = await axios.get(`https://gitlab.com/api/v4/projects/${link}/repository/branches`, {
                headers: {
                    "Authorization": `Bearer ${cookie.get("access_token")}`
                }
            });
            let cnt = 0;
            for(let i = 0; i < data.length; i++) {
                if((data[i].name as string).toLowerCase().startsWith("feature")) cnt++;
            }
            return cnt;
        }
        catch(e) {
            console.error(e);
            return 0;
        }
    }
    public static async isTheSame(repository: string): Promise<boolean> {
        try {
            const link = makeLink(repository);
            const {data} = await axios.get(`https://gitlab.com/api/v4/projects/${link}/repository/compare?from=main&to=dev`, {
                headers: {
                    "Authorization": `Bearer ${cookie.get("access_token")}`
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
            console.error(e);
            return false;
        }
    }
    public static async getPipeLinesStatus(repository: string): Promise<"success" | "error" | "processing"> {
        try {
            const link = makeLink(repository);
            const {data} = await axios.get(`https://gitlab.com/api/v4/projects/${link}/pipelines`, {
                headers: {
                    "Authorization": `Bearer ${cookie.get("access_token")}`
                }
            });
            const status = getStatus(data);
            return status;
        }
        catch(e) {
            console.error(e);
            return "error";
        }
    }
}