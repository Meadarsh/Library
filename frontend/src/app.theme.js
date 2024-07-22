import { createTheme } from "@mui/material";

export const themeOptions = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ffffff',
      background:'#F9F8F6'
    },
  },
  typography: {
    fontFamily: 'EB Garamond, serif',
  },
});
