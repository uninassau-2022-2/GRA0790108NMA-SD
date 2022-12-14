import React from "react";
import "./App.css";
import AppTopBar from "./components/AppBar";
import { createTheme, ThemeProvider } from "@mui/material";
import Router from "./router";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9F00FF",
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AppTopBar />
        <Router />
      </ThemeProvider>
    </div>
  );
}

export default App;
