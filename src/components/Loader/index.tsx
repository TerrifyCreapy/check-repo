import { CircularProgress, Grid } from "@mui/material";
import { FC } from "react";

const Loader: FC = () => {
    return (
        <Grid
            container
            spacing={0}
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            >
            <Grid>
                <CircularProgress size={120}/>
            </Grid>
        </Grid>
        
    )
}

export default Loader;