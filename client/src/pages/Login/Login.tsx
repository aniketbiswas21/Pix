import React from "react";
import { StyledBox } from "./Login.styles";
import LoginNav from "components/LoginNav/LoginNav";

const Login: React.FC = () => {
  return (
    <StyledBox>
      <LoginNav />
    </StyledBox>
  );
};

export default Login;
