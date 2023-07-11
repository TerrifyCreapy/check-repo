import {FC} from "react";
import { Grid } from "@mui/material";
import CallMergeIcon from "@mui/icons-material/CallMerge";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { getWarningColor, getStatusColor } from "../../utils/getColor";
import InfoLoader from "../Loader/InfoLoader";
import InfoItem from "../InfoItem";

interface IRepositoryInfo {
    merge_requests: number;
    isLoadingMR: boolean;
    feature_branches: number;
    isLoadingFB: boolean;
    isTheSame: boolean;
    isLoadingSame: boolean;
    pipelines: {status: "success"|"processing"|"error", date: string};
    isLoadingPipelines: boolean;
    currentLoading: string;
    repository: string;
}

const RepositoryInfo: FC<IRepositoryInfo> = ({
    repository,
    merge_requests,
    isLoadingMR,
    feature_branches,
    isLoadingFB,
    isTheSame,
    isLoadingSame,
    pipelines,
    isLoadingPipelines,
    currentLoading
}) => {

    const isSame = {
        color:  isTheSame?"#ef5350": "#D3D3D3"
    }

    const iconsSize = {
        width: "24px",
        marginTop: "1px"
    }

    return(
        <Grid
                container
                spacing={0}
                columns={12}
            >
                <InfoItem color={getWarningColor(merge_requests > 0)}>
                    <CallMergeIcon sx={iconsSize}/> {isLoadingMR? currentLoading === repository? <InfoLoader/>: "-": merge_requests} MR
                </InfoItem> 
                <InfoItem color={getWarningColor(feature_branches > 0)}>
                    <AltRouteIcon sx={iconsSize}/>  {isLoadingFB? currentLoading === repository? <InfoLoader/>: "-": feature_branches} FB
                </InfoItem>
                <InfoItem>
                    Dev {isLoadingSame? currentLoading === repository? <InfoLoader/>: "-":<ArrowForwardIcon sx={isSame}/>} Master
                </InfoItem>
                <InfoItem color={getStatusColor(pipelines.status)}>  
                    <RocketLaunchIcon sx={iconsSize}/> {isLoadingPipelines? currentLoading === repository? <InfoLoader/>: "-":  pipelines.date === "null"? "": pipelines.date}
                </InfoItem>
            </Grid>
    );
}

export default RepositoryInfo;