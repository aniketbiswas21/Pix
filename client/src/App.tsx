import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Routes from "./routes";
import { darkTheme, lightTheme } from "theme/theme";
import { GlobalStyles } from "theme/global";
import useDarkMode from "hooks/useDarkMode";
import ThemeContext from "theme/ThemeContext";

const App: React.FC = () => {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <div />;
  }
  return (
    <ThemeProvider theme={themeMode}>
      <ThemeContext.Provider value={toggleTheme}>
        <GlobalStyles />
        <div className="App">
          <Router>
            <Routes />
          </Router>
        </div>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

export default App;
