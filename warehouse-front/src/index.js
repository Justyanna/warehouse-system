import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CssBaseline } from "@material-ui/core";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./utils/theme";

const BookStoreApp = () => (
  <CssBaseline>
    <Router>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </CssBaseline>
);

ReactDOM.render(<BookStoreApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
