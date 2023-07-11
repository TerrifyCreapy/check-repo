import {FC} from "react";
import { observer } from "mobx-react-lite";
import { IDebProject } from "../../interfaces/entities/IProject";
import { ListItem, Typography } from "@mui/material";
import { getInfoColor, getStatusColor} from "../../utils/getColor";
import MoreActions from "../MoreActions/MoreActions";
import ToRepository from "../ToRepository";
import RepositoryInfo from "../RepositoryInfo";

interface IProjectItem extends IDebProject {
    isAllLoading: boolean;
    currentLoading: string;
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
    currentLoading,
    onReload,
}) => {


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
                sx={{fontSize: "calc(12px + 6 * (100vw/1440))", color: found? "black": getStatusColor("error")}}
            >
                name: {repository.split("/")[repository.split("/").length - 1]} {found? "": "not found"}
            </Typography>
            <RepositoryInfo
                feature_branches={feature_branches}
                merge_requests={merge_requests}
                isLoadingFB={isLoadingFB}
                isLoadingMR={isLoadingMR}
                isLoadingPipelines={isLoadingPipelines}
                isLoadingSame={isLoadingSame}
                isTheSame={isTheSame}
                pipelines={pipelines}
                currentLoading={currentLoading}
                repository={repository}
            />
            <MoreActions menuItems={menuItems}/>
            <ToRepository repository={repository}/>
        </ListItem>
    )
}

export default observer(ProjectItem);