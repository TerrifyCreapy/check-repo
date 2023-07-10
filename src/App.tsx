import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Routes, Route } from "react-router-dom";
import { mapRoutes } from "./utils/mapRoutes";
import { private_routes, routes } from "./routes";
import useStore from "./hooks/useStore";
import Loader from "./components/Loader";
import NotFoundPage from "./pages/NotFoundPage";

import "react-toastify/dist/ReactToastify.css";
import "./styles/reset.scss";

const App: FC = () => {
    const { userStore } = useStore();

    useEffect(() => {
        userStore.refresh();
        userStore.getMe();
    }, [userStore]);

    if (userStore.isLoading) return <Loader />;

    return (
        <Routes>
            {mapRoutes(routes)}
            {userStore.isAuth && mapRoutes(private_routes)}
            <Route path="*" element={<NotFoundPage/>} />
        </Routes>
    );
};

export default observer(App);
