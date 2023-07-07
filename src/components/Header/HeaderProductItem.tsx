import { FC, useState, Dispatch, SetStateAction } from "react";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Refresh } from "@mui/icons-material";
import { IProductItem } from "../../interfaces/entities/IProject";
import { ArrowBack } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { projects_path } from "../../contants/routes";
import { SelectChangeEvent, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface IProductItemComponent extends IProductItem {
    sortBy: string;
    setSortBy: (event: SelectChangeEvent<string>) => unknown;
    sortVariants: {id: string, text: string, tb: boolean}[];
    onUpdate: () => Promise<void>;
    isLoading: boolean;
}

const HeaderProductItem: FC<IProductItemComponent> = ({product_name, release_version, onUpdate, isLoading, sortBy, setSortBy, sortVariants}) => {

    return (
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {product_name} {release_version}
            </Typography>
                <Select
                    value={sortBy}
                    label="Sort"
                    onChange={setSortBy}
                    sx={{maxWidth: "30%", width: "100%", color: "white", marginRight: 4, height: "50px"}}
                >
                    {sortVariants.map(e => {
                        return <MenuItem disabled={isLoading} key={e.text} value={e.text}>
                            {e.text}
                        </MenuItem>
                    })}
                </Select>
            
            <Button 
                variant="contained"
                color="primary"
                component="label" 
                onClick={onUpdate}
                disabled={isLoading}
                >
                    <Refresh/>
            </Button>
            <Button 
                variant="contained"
                color="primary"
                component={NavLink} 
                to={projects_path}
                onClick={onUpdate}
                sx={{marginLeft: 3}}
                >
                    <ArrowBack/> 
            </Button>
        </Toolbar>
    )
}

export default HeaderProductItem;