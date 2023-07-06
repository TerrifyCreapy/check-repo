import {FC} from "react";
import { observer } from "mobx-react-lite";
import { IDebProject } from "../../interfaces/entities/IProject";
import { ListItem, Typography } from "@mui/material";
import CallMergeIcon from '@mui/icons-material/CallMerge';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { getStatusColor, getWarningColor } from "../../utils/getColor";

const ProjectItem: FC<IDebProject> = ({repository, merge_requests, feature_branches, isTheSame, pipelines}) => {


    const infoConfig = {
        fontSize: "20px", display: "flex", alignItems: "center"
    }

    const isSame = {
        color:  !isTheSame?"#ef5350": "#D3D3D3"
    }

    const iconsSize = {
        width: "24px"
    }

    return(
        <ListItem
            sx={{
                border: "1px solid",
                borderColor: "#757ce8",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "flex-start"
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
                    <CallMergeIcon sx={iconsSize}/> {merge_requests} MR
                </Typography>
                <Typography
                    component="div"
                    sx={infoConfig}
                    color={getWarningColor(feature_branches > 0)}
                >
                    <FeaturedPlayListIcon sx={iconsSize}/>  {feature_branches} FB
                </Typography>
                <Typography
                    component="div"
                    sx={infoConfig}
                >
                   Dev <ArrowForwardIcon sx={isSame}/> Master
                </Typography>
                <Typography
                    component="div"
                    sx={infoConfig}
                    color={getStatusColor(pipelines)}
                >
                    <RocketLaunchIcon sx={iconsSize}/>  pipelines
                </Typography>
                
                
            </Typography>
        </ListItem>
    )
}

export default observer(ProjectItem);