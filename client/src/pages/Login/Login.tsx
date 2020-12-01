import React from "react";
import { LoginBody, StyledBox } from "./Login.styles";
import LoginNav from "components/LoginNav/LoginNav";
import { Grid } from "@material-ui/core";
import LoginCard from "components/LoginCard/LoginCard";
import { useHistory } from "react-router-dom";
import RegisterCard from "components/RegisterCard/RegisterCard";

const Login: React.FC = () => {
  const history = useHistory();

  const renderCard: () => JSX.Element = () => {
    if (history.location.pathname === "/") {
      return <LoginCard />;
    } else if (history.location.pathname === "/register") {
      return <RegisterCard />;
    } else {
      return <LoginCard />;
    }
  };
  return (
    <StyledBox>
      <LoginNav />
      <LoginBody item xs={12}>
        <Grid item xs={12}>
          {renderCard()}
        </Grid>
      </LoginBody>
    </StyledBox>
  );
};

export default Login;
