// Toggle.js
import React from "react";
import { ReactComponent as MoonIcon } from "../../assets/moon.svg";
import { ReactComponent as SunIcon } from "../../assets/sun.svg";
import { ToggleContainer } from "./ToggleButton.styles";

interface Props {
  toggleTheme: () => void;
}

const Toggle: React.FC<Props> = ({ toggleTheme }) => {
  return (
    <ToggleContainer onClick={toggleTheme}>
      <SunIcon />
      <MoonIcon />
    </ToggleContainer>
  );
};

export default Toggle;
