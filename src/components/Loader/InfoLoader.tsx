import { FC } from "react";
import { CircularProgress } from "@mui/material";


const InfoLoader: FC = () => {
    return (
        <CircularProgress sx={{margin: "3px"}} size={18}/>
    )
}

export default InfoLoader;