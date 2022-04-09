import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "rgba(75,192,192,1)",
          boxShadow: "none",
        },
      },
    },
  },
});
