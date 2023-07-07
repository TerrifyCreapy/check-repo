import {FC, useId, useState, MouseEvent} from "react";
import { Button } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import ContextMenu from "../ContextMenu";

interface IMoreActions {
    menuItems: {text: string, action: () => unknown; disable?: boolean}[]
}

const MoreActions: FC<IMoreActions> = ({menuItems}) => {
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
    return (
        <>
            <Button
                    id={contextMenuID}
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{
                        position: "absolute",
                        top: 10,
                        right: 0,
                        zIndex: 3,
                        width: "20px",
                        height: "20px"
                    }}
                >
                    <MoreVert/>
            </Button>
            <ContextMenu anchorEl={anchorEl} linkId={contextMenuID} onClose={onClose} opened={open} menuItems={menuItems}/>
        </>
    );
};

export default MoreActions;
