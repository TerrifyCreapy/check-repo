import { useContext } from "react";
import { StoreProvider } from "..";



export default function useStore() {
    const rootStore = useContext(StoreProvider);
    return rootStore;
}