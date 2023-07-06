import { makeAutoObservable } from "mobx";
import UserStore from "./UserStore";
import ProductsStore from "./ProductsStore";
import ProductStore from "./ProductStore";

export type rootType = typeof RootStore;

export default class RootStore {
    userStore: UserStore;
    productsStore: ProductsStore;
    productStore: ProductStore;
    constructor() {
        makeAutoObservable(this);
        this.userStore = new UserStore();
        this.productsStore = new ProductsStore();
        this.productStore = new ProductStore();
        console.debug(this);
    }
}