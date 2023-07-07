import { FC, useState, ChangeEvent, useEffect } from "react";
import {Grid, Card} from "@mui/material";
import InputAuth from "../components/Input";
import ButtonComponent from "../components/Button";

import useStore from "../hooks/useStore";
import { useNavigate } from "react-router-dom";
import { projects_path } from "../contants/routes";
import {ToastContainer  ,toast } from "react-toastify";

const AuthPage: FC = () => {

    const {userStore} = useStore();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function onChangeEmail(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }
    function onChangePassword(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    const navigate = useNavigate();

    async function onSubmit() {
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
    }, [])


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
                        <InputAuth
                            placeholder="Email..."
                            value={email}
                            onChange={onChangeEmail}
                        />
                        <InputAuth
                            placeholder="Password..."
                            value={password}
                            onChange={onChangePassword}
                            type="password"
                        />
                        <ButtonComponent text="Sign in" onClick={onSubmit}/>
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