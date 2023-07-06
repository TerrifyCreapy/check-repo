import { auth_path, product_path, projects_path } from "../contants/routes";
import { IBrowserRouter } from "../interfaces/common/IBrowserRouter";

import AuthPage from "../pages/AuthPage";
import ProductPage from "../pages/ProductPage";
import ProjectsPage from "../pages/ProjectsPage"; 

export const routes: IBrowserRouter[] = [
    {
        path: auth_path,
        exact: true,
        element: <AuthPage/>
    }
]

export const private_routes: IBrowserRouter[] = [
    {
        path: projects_path,
        exact: true,
        element: <ProjectsPage/>
    },
    {
        path: product_path,
        exact: true,
        element: <ProductPage/>
    }
]