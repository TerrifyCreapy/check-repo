import { ChangeEvent, FC, useState } from "react";
import { Input, InputAdornment } from "@mui/material";
import { PanoramaFishEye } from "@mui/icons-material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface IInput {
    placeholder: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    type?: "text" | "password";
}

const InputAuth: FC<IInput> = ({placeholder, value, onChange, type = "text"}) => {

    const [currentType, setCurrentType] = useState<string>(type);

    function toggleVisible() {
        setCurrentType(value => value ==="password"? "text":"password");
    }

    function endIcon(type: string, defaultType: string) {

        const config = {
            cursor: "pointer", 
            transition: "all .3s ease-in-out", 
            ":hover": {
                color: "rgba(0,0,0,1)"
            }
        }

        if(type === "password" && defaultType === "password") {
            return (
                <InputAdornment position="end" onClick={toggleVisible} sx={config}>
                    <Visibility/>
                </InputAdornment>
            );
        }
        else if(type === "text" && defaultType === "password") {
            return(
                <InputAdornment position="end" onClick={toggleVisible} sx={config}>
                    <VisibilityOff/>
                </InputAdornment> 
            );
        }
        else {
            return null;
        }
    }

    return (
        <Input 
            color="primary"
            value={value}
            onChange={onChange} 
            placeholder={placeholder}
            type={currentType}
            endAdornment={
                endIcon(currentType, type)
            }
        />
    )
};

export default InputAuth;