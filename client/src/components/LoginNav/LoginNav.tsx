import React from "react";
import { Grid } from "@material-ui/core";
import CameraIcon from "../../assets/camera.svg";
import { LogoText, Nav, NavToggle } from "./LoginNav.styles";
import Toggle from "components/ToggleButton/ToggleButton";
import ThemeContext from "theme/ThemeContext";

const LoginNav: React.FC = () => {
  return (
    <>
      <Nav container spacing={0}>
        <Grid item xs={12}>
          <Grid container spacing={0} justify="space-around">
            <Grid item xs={6} xl={5}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={CameraIcon} alt="pix-logo" />
                <LogoText>Pix</LogoText>
              </div>
            </Grid>
            <NavToggle item xs={6} xl={5}>
              <ThemeContext.Consumer>
                {(toggleTheme) => <Toggle toggleTheme={toggleTheme} />}
              </ThemeContext.Consumer>
            </NavToggle>
          </Grid>
        </Grid>
      </Nav>
    </>
  );
};

export default LoginNav;
