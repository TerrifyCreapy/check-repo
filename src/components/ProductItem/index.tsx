import { MouseEvent, FC, useState, useId } from "react";
import { Button, ListItem, Typography } from "@mui/material";
import { IProductItem } from "../../interfaces/entities/IProject";
import { MoreVert } from "@mui/icons-material";
import ContextMenu from "../ContextMenu";
import { NavLink } from "react-router-dom";
import { projects_path } from "../../contants/routes";
import MoreActions from "../MoreActions/MoreActions";

interface IproductItem extends IProductItem {
    onRemove: (id: string) => unknown;
}

const ProductItem: FC<IproductItem> = ({internal_product_name, product_description, product_name, release_version, release_date, product_id, onRemove}) => {

    

    const menuItems = [
        {
            text: "remove", 
            action: () => onRemove(product_id),
        }
    ]

    return (
        <ListItem sx={{
            flexDirection: "column", 
            alignItems: "flex-start", 
            transition: "all .3s linear",
            ":hover": {backgroundColor: "#dedede"},
            " > *": {
                textDecoration: "none", 
                color: "black"}, 
                " > a": {
                    display: "block", 
                    width: "100%"
                    }
            }
        }>
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
            <MoreActions menuItems={menuItems}/>
        </ListItem>
    )
};

export default ProductItem;