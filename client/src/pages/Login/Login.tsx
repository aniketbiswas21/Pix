import React from "react";
import { LoginBody, StyledBox } from "./Login.styles";
import LoginNav from "components/LoginNav/LoginNav";
import { Grid } from "@material-ui/core";
import LoginCard from "components/LoginCard/LoginCard";

const Login: React.FC = () => {
  return (
    <StyledBox>
      <LoginNav />
      <LoginBody item xs={12}>
        <Grid item xs={12}>
          <LoginCard />
        </Grid>
      </LoginBody>
    </StyledBox>
  );
};

export default Login;
