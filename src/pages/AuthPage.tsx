import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {Grid, Card} from "@mui/material";
import {ToastContainer, toast } from "react-toastify";

import useStore from "../hooks/useStore";

import { projects_path } from "../contants/routes";
import AuthForm from "../components/AuthForm";


const AuthPage: FC = () => {

    const {userStore} = useStore();

    const navigate = useNavigate();

    async function onSubmit(email: string, password: string) {
        const data = await userStore.login(email, password);
        if(data) {
            navigate(projects_path);
        }
        else {
            toast("Not right email or password!");
        }
    }

    

    useEffect(() => {
        if(!userStore.isLoading && userStore.isAuth) navigate(projects_path)
    }, [navigate, userStore.isAuth, userStore.isLoading])


    return (
        <>
            <Grid 
                container
                alignItems="center"
                justifyContent="center"
                spacing={0}
                sx={{minHeight: "100vh"}}
                >
                <Grid item>
                    <Card sx={{padding: 3, display: "flex", flexDirection: "column", gap: 2, maxWidth: 500}}>
                        <AuthForm onSubmit={onSubmit}/>
                    </Card>
                </Grid>
            </Grid>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
        
        
    );
};

export default AuthPage;