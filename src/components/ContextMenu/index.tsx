import {FC, MouseEvent} from "react";
import {Menu, MenuItem} from "@mui/material";

interface IContextItem {
    text: string;
    action: () => unknown;
}

interface IContextMenu {
    opened: boolean;
    onClose: () => unknown;
    anchorEl: null | HTMLElement;
    linkId: string;
    menuItems: IContextItem[]
}

const ContextMenu: FC<IContextMenu> = ({opened, onClose, anchorEl, linkId, menuItems}) => {

    return (
        <Menu
        id={linkId}
        anchorEl={anchorEl}
        open={opened}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {menuItems.map(e => {
            return <MenuItem key={e.text} onClick={() => {
                onClose();
                e.action();
            }}>{e.text}</MenuItem>
        })}
      </Menu>
    )
}


export default ContextMenu;