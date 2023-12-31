import {FC} from "react";
import { NavLink } from "react-router-dom";

import { ListItem, Typography } from "@mui/material";
import { IProductItem } from "../../interfaces/entities/IProject";

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
            gap: 2,
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
                <Typography component="div" sx={{fontWeight: "bold", fontSize: "calc(24px + 16 * (100vw / 1440))"}}>
                    {product_name}
                </Typography>
                <Typography component="p" sx={{maxWidth: "90%", fontSize: "calc(12px + 6 * (100vw / 1440))", wordWrap: "balance", wordBreak: "break-word"}}>
                    {product_description}
                </Typography>
                <Typography component="div" sx={{marginTop: 2}}>
                    Internal name: {internal_product_name}
                </Typography> 
                <Typography component="div">
                    release version: {release_version}
                </Typography> 
                <Typography component="div">
                    release date: {release_date}
                </Typography> 
            </NavLink>
            <MoreActions menuItems={menuItems}/>
        </ListItem>
    )
};

export default ProductItem;