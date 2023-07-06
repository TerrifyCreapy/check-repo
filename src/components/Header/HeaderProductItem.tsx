import { ChangeEvent, FC, useState } from "react";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Refresh } from "@mui/icons-material";
import { IProductItem } from "../../interfaces/entities/IProject";

interface IProductItemComponent extends IProductItem {
    onUpdate: () => Promise<void>;
}

const HeaderProductItem: FC<IProductItemComponent> = ({product_name, release_version, onUpdate}) => {

    return (
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {product_name} {release_version}
            </Typography>
            <Button 
                variant="contained"
                color="primary"
                component="label" 
                onClick={onUpdate}
                ><Refresh/> </Button>
        </Toolbar>
    )
}

export default HeaderProductItem;