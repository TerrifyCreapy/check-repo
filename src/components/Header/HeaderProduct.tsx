import { ChangeEvent, FC, useState } from "react";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from "@mui/icons-material/Add";
import { Input } from "@mui/material";

interface IHeaderProduct {
    onUpload: (event: ChangeEvent<HTMLInputElement>) => unknown;
}

const HeaderProduct: FC<IHeaderProduct> = ({onUpload}) => {

    return (
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Products
            </Typography>
            <Button 
                variant="contained"
                color="primary"
                component="label" 
                ><AddIcon/><Input onChange={onUpload} hidden type="file" sx={{display: "none"}} />  </Button>
        </Toolbar>
    )
}

export default HeaderProduct;