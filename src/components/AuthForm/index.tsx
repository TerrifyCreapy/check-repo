import {FC, useState, ChangeEvent} from "react";
import InputAuth from "../Input";
import ButtonComponent from "../Button";

interface IAuthForm {
    onSubmit: (email: string, password: string) => Promise<void>;
}

const AuthForm: FC<IAuthForm> = ({onSubmit}) => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function onChangeEmail(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }
    function onChangePassword(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    async function onClick() {
        await onSubmit(email, password);
    }

    return(
        <>
        <InputAuth
                        placeholder="Email..."
                            value={email}
                            onChange={onChangeEmail}
                        />
                        <InputAuth
                            placeholder="Password..."
                            value={password}
                            onChange={onChangePassword}
                            type="password"
                        />
                        <ButtonComponent text="Sign in" onClick={onClick}/>
                        </>
    );
}

export default AuthForm;