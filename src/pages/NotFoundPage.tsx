import { Button, Grid, Typography } from "@mui/material";
import {FC} from "react";
import { NavLink } from "react-router-dom";
import useStore from "../hooks/useStore";
import { auth_path, projects_path } from "../contants/routes";

const NotFoundPage: FC = () => {

    const {userStore} = useStore();

    return(
        <Grid
            container
            spacing={0}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{height: "100%"}}
        >
            <Grid item sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Typography>
                    This page wouldn't be found! ={"("}
                </Typography>
                <Button
                    component={NavLink}
                    to={userStore.isAuth?projects_path:auth_path}
                >
                    Back to {userStore.isAuth? "projects": "authorization"}
                </Button>
            </Grid>
        </Grid>
    );
}

export default NotFoundPage;