import { makeAutoObservable } from "mobx";
import IProject, { IStateProject } from "../interfaces/entities/IProject";
import localforage from "localforage";
import ProjectsAPI from "../api/projects-api";

export default class ProductStore {
    product: IStateProject | null = null;
    isLoading: boolean = false;
    constructor() {
        makeAutoObservable(this);
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setProduct(product: IStateProject) {
        this.product = product;
    }

    loadProduct(id: string) {
        this.setLoading(true);
        localforage.getItem("products")
            .then(async (result) => {
                if(Array.isArray(result) && result.length > 0) {

                    let element = result.filter(e => e.product.product_id === id)[0];

                    element.x_deb_projects = [
                        ...Object.keys(element.x_deb_projects).map(e => {
                            return {
                                repository: element.x_deb_projects[e],
                                merge_requests: 0,
                                feature_branches: 0,
                                isTheSame: true,
                                pipelines: "success"
                            }
                        })
                    ]
                    this.setProduct(element);
                    await this.checkProjects();
                    this.setLoading(false);
                }
            });
    };

    setMergeRequest(repository: string, num: number) {
        if(this.product) {
            this.product.x_deb_projects = this.product.x_deb_projects.map(e => e.repository === repository?{...e, merge_requests: num}: e);
        }
    }

    setFeatureBranches(repository: string, num: number) {
        if(this.product) {
            this.product.x_deb_projects = this.product.x_deb_projects.map(e => e.repository === repository? {...e, feature_branches: num}: e);
        }
    }

    setTheSame(repository: string, bool: boolean) {
        if(this.product) {
            this.product.x_deb_projects = this.product.x_deb_projects.map(e => e.repository === repository? {...e, isTheSame: bool}: e);
        }
    }

    setPipelines(repository: string, status: "success" | "processing" | "error") {
        if(this.product) {
            this.product.x_deb_projects = this.product.x_deb_projects.map(e => e.repository === repository? {...e, pipelines: status}: e);
        }
    }

    async checkProjects() {
        try {
            this.setLoading(true);
            if(!this.product) return;
            for(let i = 0; i < this.product.x_deb_projects.length; i++) {
                const tempRepo = this.product.x_deb_projects[i].repository;
                let res: number | boolean | "success" | "processing" | "error"= await ProjectsAPI.getMergeRequests(tempRepo);
                this.setMergeRequest(tempRepo, res);
                res = await ProjectsAPI.getFeatureBranches(tempRepo);
                this.setFeatureBranches(tempRepo, res);
                res = await ProjectsAPI.isTheSame(tempRepo);
                this.setTheSame(tempRepo, res);
                res = await ProjectsAPI.getPipeLinesStatus(tempRepo);
                this.setPipelines(tempRepo, res);
            }
            this.setLoading(false);
        }
        catch(e) {
            console.error(e);
        }
    }
}