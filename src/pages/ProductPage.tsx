import {FC, ReactNode, useEffect} from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import useStore from "../hooks/useStore";
import Loader from "../components/Loader";
import HeaderLayout from "../components/Header/HeaderLayout";
import HeaderProductItem from "../components/Header/HeaderProductItem";
import CardList from "../components/CardList";
import ProjectItem from "../components/ProjectItem";
import { IDebProject } from "../interfaces/entities/IProject";

const ProductPage: FC = () => {
    const {id} = useParams();
    const {productStore} = useStore();

    useEffect(() => {
        productStore.loadProduct(id);
    },[]);

    if(!productStore.product || productStore.isLoading) return <Loader/>

    const deb_projects = productStore.product.x_deb_projects;

    let debian: ReactNode[] = deb_projects.map((e: IDebProject) => <ProjectItem key={e.repository} {...e}/>);

    async function onUpdate() {
        await productStore.checkProjects();
    }

    return (
        <>
            <HeaderLayout>
                <HeaderProductItem onUpdate={onUpdate} {...productStore.product.product}/>
            </HeaderLayout>
            <CardList products={debian}/>
        </>
    )
}

export default observer(ProductPage);