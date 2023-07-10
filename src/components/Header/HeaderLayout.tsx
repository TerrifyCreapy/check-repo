import { FC, ReactNode } from "react";
import { Container, AppBar, Box } from "@mui/material";

interface IHeaderLayout {
  children: ReactNode;
}

const HeaderLayout: FC<IHeaderLayout> = ({children}) => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        
          <AppBar position="static">
            <Container maxWidth="md" sx={{flexDirection: "column"}}>
              {children}
            </Container>
          </AppBar>
        
    </Box>
    )
}

export default HeaderLayout;