import { makeAutoObservable } from "mobx";
import { IDebProject, IStateProject } from "../interfaces/entities/IProject";
import localforage from "localforage";
import ProjectsAPI from "../api/projects-api";

export default class ProductStore {
    product: IStateProject | null = null;
    isLoading: boolean = false;
    currentLoading: string = "";
    constructor() {
        makeAutoObservable(this);
    }

    setCurrentLoading(repo: string) {
        this.currentLoading = repo;
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
                                found: true,
                                merge_requests: 0,
                                isLoadingMR: true,
                                feature_branches: 0,
                                isLoadingFB: true,
                                isTheSame: true,
                                isLoadingSame: true,
                                pipelines: {
                                    status: "success",
                                    date: "null"
                                },
                                isLoadingPipelines: true,
                                isLoading: true,
                            }
                        })
                    ]
                    this.setProduct(element);
                    await this.checkProjects();
                    this.setLoading(false);
                }
            });
    };

    setFound(repository: string, bool: boolean) {
        if(this.product) {
            this.product.x_deb_projects = this.product.x_deb_projects.map(e => e.repository === repository?{...e, found: bool,}: e);
        }
    }

    setMergeRequest(repository: string, num: number) {
        if(this.product) {
            this.product.x_deb_projects = this.product.x_deb_projects.map(e => e.repository === repository?{...e, merge_requests: num, isLoadingMR: false}: e);
        }
    }


    setFeatureBranches(repository: string, num: number) {
        if(this.product) {
            this.product.x_deb_projects = this.product.x_deb_projects.map(e => e.repository === repository? {...e, feature_branches: num, isLoadingFB: false}: e);
        }
    }

    setTheSame(repository: string, bool: boolean) {
        if(this.product) {
            this.product.x_deb_projects = this.product.x_deb_projects.map(e => e.repository === repository? {...e, isTheSame: bool, isLoadingSame: false}: e);
        }
    }

    setPipelines(repository: string, status: "success" | "processing" | "error", date: string) {
        if(this.product) {
            this.product.x_deb_projects = this.product.x_deb_projects.map(e => e.repository === repository? {...e, pipelines: {status, date}, isLoadingPipelines: false}: e);
        }
    }

    setLoadingRepository(repository:string, bool:boolean) {
        if(this.product) {
            this.product.x_deb_projects = this.product.x_deb_projects.map(e => e.repository === repository? {...e, isLoading: bool}: e);
        }
    }

    setAllLoading() {
        if(this.product) {
            this.product.x_deb_projects = this.product.x_deb_projects.map(e => {return {
                ...e,
                isLoading: true,
                isLoadingMR: true,
                isLoadingFB: true,
                isLoadingPipelines:true,
                isLoadingSame: true,
            }});
        }
    }

    setLoadingProject(repository: string, bool: boolean) {
        if(this.product) {
            this.setCurrentLoading(repository);
            this.product.x_deb_projects = this.product.x_deb_projects.map(e => {
                if(e.repository === repository) {
                    return {...e, 
                        isLoading: bool,
                        isLoadingMR: bool,
                        isLoadingFB: bool,
                        isLoadingPipelines:bool,
                        isLoadingSame: bool,
                    };
                }
                else {
                    return e;
                }
            });
            this.setCurrentLoading("");
        }
    }


    async checkOneProject(repository: string) {
        try {
            this.setLoading(true);
            if(!this.product) return;
            this.setLoadingProject(repository, true);
            this.setLoadingRepository(repository, true);
            let res: number | boolean | {status: "success" | "processing" | "error", date: string | null}= await ProjectsAPI.getMergeRequests(repository);
            this.setMergeRequest(repository, res);
            res = await ProjectsAPI.getFeatureBranches(repository);
            this.setFeatureBranches(repository, res);
            res = await ProjectsAPI.isTheSame(repository);
            this.setTheSame(repository, res);
            res = await ProjectsAPI.getPipeLinesStatus(repository);
            this.setPipelines(repository, res.status, `${res.date}`);
            this.setLoadingRepository(repository, false);
            this.setLoading(false);

        }
        catch(e) {
            console.error(e);
        }
    }

    stop() {
        this.product = null;
    }

    async checkProjects() {
        try {
            this.setLoading(true);
            if(!this.product) return;
            this.setAllLoading();
            
            for(let i = 0; i < this.product.x_deb_projects.length; i++) {
                
                if(!this.product) return;
                const tempRepo = this.product.x_deb_projects[i].repository;
                this.setCurrentLoading(tempRepo);
                if(!this.product.x_deb_projects[i].found) {
                    this.setLoadingProject(tempRepo, false);
                    continue;
                };
                const isRepo = await ProjectsAPI.isRepository(tempRepo);
                if(!isRepo) {
                    this.setLoadingProject(tempRepo, false);
                    this.setFound(tempRepo, false);
                    continue;
                }
                this.setLoadingRepository(tempRepo, true);
                let res: number | boolean | {status: "success" | "processing" | "error", date: string | null}= await ProjectsAPI.getMergeRequests(tempRepo);
                this.setMergeRequest(tempRepo, res);
                res = await ProjectsAPI.getFeatureBranches(tempRepo);
                this.setFeatureBranches(tempRepo, res);
                res = await ProjectsAPI.isTheSame(tempRepo);
                this.setTheSame(tempRepo, res);
                res = await ProjectsAPI.getPipeLinesStatus(tempRepo);
                this.setPipelines(tempRepo, res.status, `${res.date}`);
                this.setLoadingRepository(tempRepo, false);
            }
            this.setLoading(false);
            this.setCurrentLoading("");
        }
        catch(e) {
            return;
        }
    }

    sortBy(sortType: string, tb: boolean) { //tb -> top to bottom
        try{
            if(!this.product) return;
            switch (sortType) {
                case "byName": {
                    const array = [...this.product.x_deb_projects];
                    array.sort((a: IDebProject, b: IDebProject) => {
                        const repA = a.repository.split("/")[a.repository.split("/").length-1];
                        const repB = b.repository.split("/")[b.repository.split("/").length-1];
                        return repA > repB? 1: 0;
                    });
                    if(!tb) array.reverse()
                    this.setProduct({product: this.product.product, x_deb_projects: array});
                    return;
                }
                case "byProblems": {
                    const array = [...this.product.x_deb_projects];
                    array.sort((a:IDebProject, b:IDebProject) => {
                        if(a.pipelines.status === "error" && a.pipelines.status !== "error") return 0;
                        else if(a.pipelines.status === "error" && a.pipelines.status !== "error") return 1;
                        else {
                            let cntProblemsA = a.merge_requests + a.feature_branches + Number(a.isTheSame);
                            let cntPRoblemsB = b.merge_requests + b.feature_branches + Number(b.isTheSame);
                            return cntProblemsA - cntPRoblemsB;
                        }
                    });
                    if(!tb) array.reverse();
                    this.setProduct({product: this.product.product, x_deb_projects: array});
                    return;
                }
            }
        }
        catch(e) {
            return;
        }
    }
}