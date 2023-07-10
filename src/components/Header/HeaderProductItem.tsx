import { FC } from "react";
import { NavLink } from "react-router-dom";
import { SelectChangeEvent, Select, MenuItem, Box, Toolbar, Typography, Button } from "@mui/material";
import { Refresh, ArrowBack } from "@mui/icons-material";

import { IProductItem } from "../../interfaces/entities/IProject";
import { projects_path } from "../../contants/routes";


interface IProductItemComponent extends IProductItem {
    sortBy: string;
    setSortBy: (event: SelectChangeEvent<string>) => unknown;
    sortVariants: {id: string, text: string, tb: boolean}[];
    onUpdate: () => Promise<void>;
    isLoading: boolean;
}

const HeaderProductItem: FC<IProductItemComponent> = ({product_name, release_version, onUpdate, isLoading, sortBy, setSortBy, sortVariants}) => {

    return (
        <Toolbar sx={{display: "flex", padding: {xs: 2, sm: 0} ,flexDirection: {xs: "column", sm: "row"}, justifyContent: {xs: "center", sm: "space-between"}, gap: 2}}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: "calc(16px + 4 * (100vw / 1440))" }}>
                {product_name} {release_version}
            </Typography>
                <Select
                    value={sortBy}
                    label="Sort"
                    onChange={setSortBy}
                    sx={{maxWidth: "30%", width: "100%", color: "white", marginRight: 4, height: "50px", display: {xs: "none", md: "flex"}}}
                >
                    {sortVariants.map(e => {
                        return <MenuItem disabled={isLoading} key={e.text} value={e.text}>
                            {e.text}
                        </MenuItem>
                    })}
                </Select>
            <Box>
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
            </Box>
            
        </Toolbar>
    )
}

export default HeaderProductItem;