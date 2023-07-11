import { FC, ReactNode } from "react";
import { Grid, Typography } from "@mui/material";

interface  IInfoItem {
    children: ReactNode;
    color?: string;
}

const InfoItem: FC<IInfoItem> = ({children, color}) => {
    return(
        <Grid
                    item
                    xs={12}
                    sm={6}
                    lg={3}
                    sx={{display: "flex", justifyContent: "center"}}
                >
                    <Typography
                        sx={{fontSize: "20px", display: "flex", maxHeight: "24px"}}
                        color={color}
                    >
                        {children}
                    </Typography>
                </Grid>
    );
}


export default InfoItem;