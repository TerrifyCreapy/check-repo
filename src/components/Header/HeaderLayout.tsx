import { FC, ReactNode } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Container } from "@mui/material";

interface IHeaderLayout {
  children: ReactNode;
}

const HeaderLayout: FC<IHeaderLayout> = ({children}) => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        
          <AppBar position="static">
            <Container maxWidth="md">
              {children}
            </Container>
          </AppBar>
        
    </Box>
    )
}

export default HeaderLayout;