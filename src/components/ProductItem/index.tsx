import { MouseEvent, FC, useState, useId } from "react";
import { Button, ListItem, Typography } from "@mui/material";
import { IProductItem } from "../../interfaces/entities/IProject";
import { MoreVert } from "@mui/icons-material";
import ContextMenu from "../ContextMenu";
import { NavLink } from "react-router-dom";
import { projects_path } from "../../contants/routes";

interface IproductItem extends IProductItem {
    onRemove: (id: string) => unknown;
}

const ProductItem: FC<IproductItem> = ({internal_product_name, product_description, product_name, release_version, release_date, product_id, onRemove}) => {

    const [anchorEl, setEnchorEl] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState<boolean>(Boolean(anchorEl));

    const contextMenuID = useId();

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
        setEnchorEl(event.currentTarget);
        setOpen(Boolean(event.currentTarget));
    }

    function onClose() {
        setEnchorEl(null);
        setOpen(false);
    }

    const menuItems = [
        {
            text: "remove", 
            action: () => onRemove(product_id),
        }
    ]

    return (
        <ListItem sx={{flexDirection: "column", alignItems: "flex-start"}}>
            <NavLink to={projects_path + `/${product_id}`}>
                <Typography component="div">
                    {product_name}
                </Typography>
                <Typography component="p">
                    {product_description}
                </Typography>
                <Typography>
                    {internal_product_name} {release_version} {release_date}
                </Typography>
                
            </NavLink>
            <Button
                    id={contextMenuID}
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "20px",
                        height: "20px"
                    }}
                >
                    <MoreVert/>
                </Button>
                <ContextMenu anchorEl={anchorEl} linkId={contextMenuID} onClose={onClose} opened={open} menuItems={menuItems}/>
        </ListItem>
    )
};

export default ProductItem;