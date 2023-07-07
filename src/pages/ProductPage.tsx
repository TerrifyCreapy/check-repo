import { FC, ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import useStore from "../hooks/useStore";
import Loader from "../components/Loader";
import HeaderLayout from "../components/Header/HeaderLayout";
import HeaderProductItem from "../components/Header/HeaderProductItem";
import CardList from "../components/CardList";
import ProjectItem from "../components/ProjectItem";
import { IDebProject } from "../interfaces/entities/IProject";
import { SelectChangeEvent } from "@mui/material";

const ProductPage: FC = () => {
    const { id } = useParams();
    const { productStore } = useStore();
    const [sortBy, setSortBy] = useState<string>("Sort by name (A-Z)");

    const sortVariants = [
        {
            id: "byName",
            text: "Sort by name (A-Z)",
            tb: true,
        },
        {
            id: "byName",
            text: "Sort by name (Z-A)",
            tb: false,
        },
        {
            id: "byProblems",
            text: "Sort by problems (more-less)",
            tb: false,
        },
        {
            id: "byProblems",
            text: "SSort by problems (less-more)",
            tb: true,
        },
    ];

    useEffect(() => {
        productStore.loadProduct(id);
        return function () {
            productStore.stop();
        };
    }, []);

    if (!productStore.product) return <Loader />;

    async function onReload(repository: string) {
        await productStore.checkOneProject(repository);
    }

    function onChangeSortBy(event: SelectChangeEvent<string>) {
        setSortBy(event.target.value as string);
        const sortBy = sortVariants.filter(
            (e) => e.text === event.target.value,
        )[0];
        productStore.sortBy(sortBy.id, sortBy.tb);
    }

    const deb_projects = productStore.product.x_deb_projects;

    const debian: ReactNode[] = deb_projects.map((e: IDebProject) => (
        <ProjectItem
            isAllLoading={productStore.isLoading}
            onReload={onReload}
            key={e.repository}
            {...e}
        />
    ));

    async function onUpdate() {
        await productStore.checkProjects();
    }

    return (
        <>
            <HeaderLayout>
                <HeaderProductItem
                    sortBy={sortBy}
                    setSortBy={onChangeSortBy}
                    sortVariants={sortVariants}
                    isLoading={productStore.isLoading}
                    onUpdate={onUpdate}
                    {...productStore.product.product}
                />
            </HeaderLayout>
            <CardList products={debian} />
        </>
    );
};

export default observer(ProductPage);
