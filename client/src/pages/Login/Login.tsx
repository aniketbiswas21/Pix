import React from "react";
import Toggle from "components/ToggleButton/ToggleButton";
import ThemeContext from "theme/ThemeContext";

const Login: React.FC = () => {
  return (
    <div>
      Login
      <ThemeContext.Consumer>
        {(toggleTheme) => <Toggle toggleTheme={toggleTheme} />}
      </ThemeContext.Consumer>
    </div>
  );
};

export default Login;
