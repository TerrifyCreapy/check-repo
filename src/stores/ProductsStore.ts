import { makeAutoObservable } from "mobx";
import { onRead } from "../utils/readFile";
import IProject from "../interfaces/entities/IProject";
import localforage from "localforage";

export default class ProductsStore {
    products: IProject[] = [];
    isLoading: boolean = false;
    constructor(){
        makeAutoObservable(this);
    }
    setIsLoading(bool:boolean) {
        this.isLoading = bool;
    }
    setProducts(products: IProject[]) {
        this.products = products;
    }
    addProduct(product: IProject) {
        this.products.push(product);
    }
    removeProject(id: string) {
        try {
            const newProducts = this.products.filter(e => e.product.product_id !== id);
            this.setProducts(newProducts);
            localforage.getItem("products")
                .then(result => {
                    if(Array.isArray(result)) {
                        localforage.setItem("products", result.filter(e => e.product.product_id !== id));
                    }
                    
                })
                .catch(err => {
                    console.error(err);
                    localforage.setItem("products", [])
                });
        }
        catch(e) {
            console.error(e);
        }
        
    }


    getOne(id: string) {
        try {
            this.setIsLoading(true);
            localforage.getItem("products")
                .then(result =>{
                    if(Array.isArray(result) && result.length > 0) {
                        this.setProducts(result.filter((e: IProject) => e.product.product_id === id));
                        this.setIsLoading(false);
                    }
                });
        }
        catch(e) {
            this.setProducts([]);
            this.setIsLoading(false);
        }
    }

    loadProducts() {
        try {
            localforage.getItem("products")
                .then(result => {
                    if(Array.isArray(result)) {
                        this.setProducts(result);
                    } 
                })
        }
        catch(e) {
            console.error(e);
        }
    }

    useData(data: string) {
        try {
            const parsed = JSON.parse(data);
            let productData = {
                product: parsed.product,
                x_deb_projects: parsed.x_deb_projects
            }
            this.addProduct(productData);
            localforage.getItem("products")
                .then((result) => {
                    if(Array.isArray(result)) {
                        localforage.setItem("products", [...result, productData]);
                    }
                    else {
                        localforage.setItem("products", [productData]);
                    }
                })
                .catch(err => {
                    localforage.setItem("products", [productData.product]);
                });
        }
        catch(e) {
            console.error(e);
        }
    }

    uploadProduct(file: File) {
        try {
            onRead(file, this.useData.bind(this));
        }
        catch(e) {
            console.error(e);
        }
    }
}