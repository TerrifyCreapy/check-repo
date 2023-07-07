import {FC} from "react";
import { observer } from "mobx-react-lite";
import { IDebProject } from "../../interfaces/entities/IProject";
import { CircularProgress, ListItem, Typography } from "@mui/material";
import CallMergeIcon from '@mui/icons-material/CallMerge';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { getInfoColor, getStatusColor, getWarningColor } from "../../utils/getColor";
import MoreActions from "../MoreActions/MoreActions";

interface IProjectItem extends IDebProject {
    isAllLoading: boolean;
    onReload: (repository: string) => Promise<unknown>;
}

const ProjectItem: FC<IProjectItem> = ({
    repository, 
    merge_requests, 
    feature_branches, 
    isTheSame, 
    pipelines, 
    isLoading,
    isLoadingFB,
    isLoadingMR,
    isLoadingPipelines,
    isLoadingSame,
    isAllLoading,
    onReload,
}) => {


    const infoConfig = {
        fontSize: "20px", display: "flex", alignItems: "center"
    }

    const isSame = {
        color:  !isTheSame?"#ef5350": "#D3D3D3"
    }

    const iconsSize = {
        width: "24px"
    }

    const menuItems = [
        {
            text: "to repository",
            action: () => {
                const newWindow = window.open("https://gitlab.com/" + repository, '_blank', 'noopener,noreferrer');
                if(newWindow) newWindow.opener = null;
            },

        },
        {
            text: "reload",
            action: async () => {
                await onReload(repository);
            },
            disable: isAllLoading
        }

    ];

    return(
        <ListItem
            sx={{
                border: "5px solid",
                borderColor: isLoading? "rgba(0,0,0,.2)": getInfoColor(merge_requests, feature_branches, isTheSame, pipelines.status),
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "flex-start",
            }}
        >
            <Typography
                component="div"
            >
                {repository}
            </Typography>
            <Typography
                component="h6"
                sx={{
                    display: "flex",
                    height: "24px",
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "100%"
                }}
            >
                <Typography
                    component="div"
                    sx={infoConfig}
                    color={getWarningColor(merge_requests > 0)}
                >
                    <CallMergeIcon sx={iconsSize}/> {isLoadingMR? <CircularProgress size={20}/>: merge_requests} MR
                </Typography>
                <Typography
                    component="div"
                    sx={infoConfig}
                    color={getWarningColor(feature_branches > 0)}
                >
                    <AltRouteIcon sx={iconsSize}/>  {isLoadingFB? <CircularProgress size={20}/>: feature_branches} FB
                </Typography>
                <Typography
                    component="div"
                    sx={infoConfig}
                >
                   Dev {isLoadingSame? <CircularProgress size={20}/>:<ArrowForwardIcon sx={isSame}/>} Master
                </Typography>
                <Typography
                    component="div"
                    sx={infoConfig}
                    color={getStatusColor(pipelines.status)}
                >
                    <RocketLaunchIcon sx={iconsSize}/> {pipelines.date === "null"? "": pipelines.date}
                </Typography>
            </Typography>
            <MoreActions menuItems={menuItems}/>
        </ListItem>
    )
}

export default observer(ProjectItem);