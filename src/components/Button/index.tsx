import { Button } from "@mui/material";
import { FC } from "react";

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