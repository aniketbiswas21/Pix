import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";
import axios from "axios";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Routes from "./routes/index";
import { darkTheme, lightTheme } from "theme/theme";
import { GlobalStyles } from "theme/global";
import useDarkMode from "hooks/useDarkMode";
import ThemeContext from "theme/ThemeContext";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
const queryClient = new QueryClient();

const App: React.FC = () => {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <div />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
        </PersistGate>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
