import React, { useState } from "react";
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import {
  Border,
  Flex,
  LoginButton,
  LoginCardBox,
  TextContainer,
  BorderContainer,
  BorderText,
  GoogleButton,
} from "./LoginCard.styles";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { ReactComponent as GoogleIcon } from "../../assets/google.svg";

const LoginCard: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <>
      <LoginCardBox elevation={5}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            <Flex>
              <span>&nbsp;Login</span>
            </Flex>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <span>
              New here?{" "}
              <Link to="/register" style={{ color: "#C2028D" }}>
                Register
              </Link>
            </span>
          </Grid>
          <TextContainer item xs={10}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="email" color="secondary">
                Email
              </InputLabel>
              <OutlinedInput
                id="email"
                color="secondary"
                fullWidth
                labelWidth={40}
              />
            </FormControl>
          </TextContainer>
          <TextContainer item xs={10}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="password" color="secondary">
                Password
              </InputLabel>
              <OutlinedInput
                id="password"
                color="secondary"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
          </TextContainer>
          <Grid container item xs={10} justify="center">
            <LoginButton variant="contained" fullWidth>
              Login
            </LoginButton>
          </Grid>
          <BorderContainer container item xs={10} justify="center">
            <Border />
            <BorderText>or</BorderText>
          </BorderContainer>
          <Grid item container xs={10}>
            <GoogleButton
              variant="contained"
              fullWidth
              startIcon={<GoogleIcon />}
            >
              Continue with Google
            </GoogleButton>
          </Grid>
        </Grid>
      </LoginCardBox>
    </>
  );
};

export default LoginCard;
