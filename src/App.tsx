import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";


import "./styles/reset.scss";
import { Routes, Route } from "react-router-dom";
import { mapRoutes } from "./utils/mapRoutes";
import { private_routes, routes } from "./routes";
import useStore from "./hooks/useStore";
import Loader from "./components/Loader";

const App: FC = () => {
  const {userStore} = useStore();

  useEffect(() => {
    userStore.refresh();
    userStore.getMe();
  }, [])

  if(userStore.isLoading) return <Loader/>;

  return (
    <div className="App">
      <Routes>
        {mapRoutes(routes)}
        {userStore.isAuth && mapRoutes(private_routes)}
        <Route
          path="*"
          element={<div>Not found page</div>}
        />
      </Routes>
    </div>
  );
}

export default observer(App);
