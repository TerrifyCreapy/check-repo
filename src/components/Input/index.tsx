import { ChangeEvent, FC } from "react";
import { Input } from "@mui/material";

interface IInput {
    placeholder: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    type?: "text" | "password";
}

const InputAuth: FC<IInput> = ({placeholder, value, onChange, type = "text"}) => {
    return (
        <Input 
            color="primary"
            value={value}
            onChange={onChange} 
            placeholder={placeholder}
            type={type}
        />
    )
};

export default InputAuth;