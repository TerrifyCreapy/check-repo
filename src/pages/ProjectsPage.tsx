import {ChangeEvent, FC, useEffect, ReactNode} from "react";
import { observer } from "mobx-react-lite";
import { Container } from "@mui/material";

import useStore from "../hooks/useStore";
import HeaderLayout from "../components/Header/HeaderLayout";
import HeaderProduct from "../components/Header/HeaderProduct";
import CardList from "../components/CardList";
import ProductItem from "../components/ProductItem";
import IProject from "../interfaces/entities/IProject";
import { useNavigate } from "react-router-dom";
import { auth_path } from "../contants/routes";

const ProjectsPage: FC = () => {

    const {productsStore, userStore} = useStore();
    const navigate = useNavigate();

    function onUploadFile(event: ChangeEvent<HTMLInputElement>) {
        if(!event.target.files || event.target.files.length !== 1) return;
        productsStore.uploadProduct(event.target.files[0]);
    }

    function onLogout() {
        const success = userStore.logout();
        if(success) navigate(auth_path);
    }

    function onRemove(id: string) {
        productsStore.removeProject(id);
    }

    useEffect(() => {
        productsStore.loadProducts();
    }, []);

    const products: ReactNode[] = productsStore.products.map((e: IProject) => <ProductItem key={e.product.product_id + e.product.product_name + e.product.release_date} onRemove={onRemove} {...e.product}/>);

    return(
        <>
            <HeaderLayout>
                <HeaderProduct onLogout={onLogout} onUpload={onUploadFile}/>
            </HeaderLayout>
            <Container maxWidth="md" sx={{marginTop: 3, height: "calc(100vh - 100px)"}}>
                <CardList products={products}/>
            </Container>
            
        </>
    )
}

export default observer(ProjectsPage);