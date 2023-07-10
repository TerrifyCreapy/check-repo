import { FC } from "react";

import { Button } from "@mui/material";


interface IButton {
    text: string;
    onClick?: () => Promise<void>;
}

const ButtonComponent: FC<IButton> = ({onClick, text}) => {
    return(
        <Button onClick={onClick}>
            {text}
        </Button>
    );
}

export default ButtonComponent;