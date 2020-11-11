import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";

const theme = createMuiTheme({
  palette: {
    background: {
      drawer: "#6e43a3",
    },

    type: "light",
    primary: {
      main: purple[500],
    },
    secondary: {
      main: "#f44336",
    },
  },
});

export default theme;
