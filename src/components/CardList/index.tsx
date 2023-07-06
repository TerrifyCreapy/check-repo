import { Card, Container } from "@mui/material";
import { observer } from "mobx-react-lite";
import {FC, ReactNode} from "react";

interface ICardList {
    products: ReactNode[];
}

const CardList: FC<ICardList> = ({products}) => {
    return (
        <Card sx={{height: "100%", paddingTop: 3, maxWidth: "md", margin: "0 auto", marginTop: 3, overflow: "auto"}}>
            <Container maxWidth="md" sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                {products}
            </Container>
        </Card>
    )
}


export default observer(CardList);