export interface IProductItem {
    product_id: string;
    internal_product_name: string;
    product_name: string;
    product_description: string;
    release_version: string;
    release_date: string;
}

export default interface IProject {
    product: IProductItem;
    x_deb_projects: Object;
}

export interface IStateProject extends IProject {
    x_deb_projects: IDebProject[];
}

export interface IDebProject {
    isLoading: boolean;
    repository: string;
    merge_requests: number;
    isLoadingMR: boolean;
    feature_branches: number;
    isLoadingFB:boolean;
    isTheSame: boolean;
    isLoadingSame: boolean;
    pipelines: {
        status: "success" | "processing" | "error",
        date: string;
    };
    isLoadingPipelines: boolean;
}