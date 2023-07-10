import { ChangeEvent, FC, useState, MouseEvent } from "react";
import { Avatar, Input, Menu, MenuItem, Toolbar, Typography, Button, IconButton } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from "@mui/icons-material/Add";

interface IHeaderProduct {
    onUpload: (event: ChangeEvent<HTMLInputElement>) => unknown;
    onLogout: () => unknown;
}

const HeaderProduct: FC<IHeaderProduct> = ({onUpload, onLogout}) => {

    const [anchorEl, setanchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    function onOpen(event: MouseEvent<HTMLButtonElement>) {
        setanchorEl(event.currentTarget);
    }

    function handleClick() {
        setanchorEl(null);
        onLogout();
    }

    function handleClose() {
        setanchorEl(null);
    }

    return (
        <Toolbar sx={{display: "flex", marginTop: {xs: 2, sm: 0} ,flexDirection: {xs: "column", sm: "row"}, justifyContent: {xs: "center", sm: "space-between"}, gap: 2}}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, lineHeight: "1"}}>
                Products
            </Typography>
            <Button 
                variant="contained"
                color="primary"
                component="label" 
                sx={{marginRight: {xs: 0, am: 2}}}
                ><AddIcon/><Input onChange={onUpload} hidden type="file" sx={{display: "none"}} />  
            </Button>
            <IconButton onClick={onOpen}>
                <Avatar sx={{fontSize: "19px"}}>
                    <PersonIcon/>
                </Avatar>
            </IconButton>
            
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClick}>Logout</MenuItem>
             </Menu>
        </Toolbar>
    )
}

export default HeaderProduct;