import {FC} from "react";
import { Link } from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface IToRepository {
    repository: string;
}

const ToRepository: FC<IToRepository> = ({repository}) => {
    return(
        <Link href={"https://gitlab.com/" + repository} target="_blank" sx={{position: "absolute", right: 5, bottom: 0}}><OpenInNewIcon/></Link>
    );

}

export default ToRepository;