import { Route } from "react-router-dom";
import { IBrowserRouter } from "../interfaces/common/IBrowserRouter";
import { ReactNode } from "react";

export function mapRoutes(routes: IBrowserRouter[]) {
    return routes.map((route: IBrowserRouter) => {
        let elem = route.element as ReactNode;
        if(!route.outlets) {
            return <Route
                key={route.path}
                path={route.path}
                element={elem}
            />
        }
        else {
            let outlets = mapRoutes(route.outlets);
            return <Route
                key={route.path}
                path={route.path}
                element={elem}
            >
                {outlets}
            </Route>
        }
    })
}