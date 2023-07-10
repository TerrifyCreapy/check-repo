import {FC} from "react";
import { observer } from "mobx-react-lite";
import { IDebProject } from "../../interfaces/entities/IProject";
import { CircularProgress, ListItem, Typography, Grid } from "@mui/material";
import CallMergeIcon from '@mui/icons-material/CallMerge';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { getInfoColor, getStatusColor, getWarningColor } from "../../utils/getColor";
import MoreActions from "../MoreActions/MoreActions";
import ToRepository from "../ToRepository";

interface IProjectItem extends IDebProject {
    isAllLoading: boolean;
    onReload: (repository: string) => Promise<unknown>;
}

const ProjectItem: FC<IProjectItem> = ({
    repository, 
    found,
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
        fontSize: "20px", display: "flex", maxHeight: "24px"
    }

    const isSame = {
        color:  !isTheSame?"#ef5350": "#D3D3D3"
    }

    const iconsSize = {
        width: "24px",
        marginTop: "1px"
    }

    const menuItems = [
        {
            text: "reload",
            action: async () => {
                await onReload(repository);
            },
            disable: isAllLoading || !found
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
                sx={{fontSize: "calc(12px + 6 * (100vw/1440))"}}
            >
                name: {repository.split("/")[repository.split("/").length - 1]} {found? "": "not found"}
            </Typography>
            <Grid
                container
                spacing={0}
                columns={12}
            >
                <Grid
                    item
                    xs={12}
                    sm={6}
                    lg={3}
                    sx={{display: "flex", justifyContent: "center"}}
                >
                    <Typography
                        sx={infoConfig}
                        color={getWarningColor(merge_requests > 0)}
                    >
                        <CallMergeIcon sx={iconsSize}/> {isLoadingMR? <CircularProgress sx={{margin: "3px"}} size={18}/>: merge_requests} MR
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    lg={3}
                    sx={{display: "flex", justifyContent: "center"}}
                >
                    <Typography
                        sx={infoConfig}
                        color={getWarningColor(feature_branches > 0)}
                    >
                        <AltRouteIcon sx={iconsSize}/>  {isLoadingFB? <CircularProgress sx={{margin: "3px"}} size={18}/>: feature_branches} FB
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    lg={3}
                    sx={{display: "flex", justifyContent: "center"}}
                >
                <Typography
                        sx={infoConfig}
                    >
                    Dev {isLoadingSame? <CircularProgress sx={{margin: "3px"}} size={18}/>:<ArrowForwardIcon sx={isSame}/>} Master
                    </Typography>
               </Grid>
               <Grid
                    item
                    xs={12}
                    sm={6}
                    lg={3}
                    sx={{display: "flex", justifyContent: "center"}}
                >
                    <Typography
                        sx={infoConfig}
                        color={getStatusColor(pipelines.status)}
                    >
                        <RocketLaunchIcon sx={iconsSize}/> {isLoadingPipelines? <CircularProgress sx={{margin: "3px"}} size={18}/> :  pipelines.date === "null"? "": pipelines.date}
                    </Typography>
                </Grid>
                
            </Grid>
            <MoreActions menuItems={menuItems}/>
            <ToRepository repository={repository}/>
        </ListItem>
    )
}

export default observer(ProjectItem);