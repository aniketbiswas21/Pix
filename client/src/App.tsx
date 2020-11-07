import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Routes from "./routes";
import "./App.css";
import { lightTheme } from "theme/theme";
import { GlobalStyles } from "theme/global";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <div className="App">
        <Router>
          <Routes />
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
