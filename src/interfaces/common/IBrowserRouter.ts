export interface IBrowserRouter {
    path: string;
    exact: boolean;
    element: unknown;
    outlets?: IBrowserRouter[];
}