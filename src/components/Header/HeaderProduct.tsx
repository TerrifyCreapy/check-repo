import { ChangeEvent, FC, useState, MouseEvent } from "react";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from "@mui/icons-material/Add";
import { Avatar, Input, Menu, MenuItem, IconButton } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

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
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Products
            </Typography>
            <Button 
                variant="contained"
                color="primary"
                component="label" 
                sx={{marginRight: 2}}
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