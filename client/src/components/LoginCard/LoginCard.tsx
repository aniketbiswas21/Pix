import React, { useState } from "react";
import {
  FormControl,
  Grid,
  Grow,
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
import useLoginForm from "hooks/useLoginForm";
import { Alert } from "@material-ui/lab";
import { useSelector } from "react-redux";
import { RootState } from "redux/type";

const LoginCard: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const authError = useSelector((state: RootState) => state.auth?.authError);
  const { email, password } = user;
  const [error, validate, resetError] = useLoginForm(user);
  // eslint-disable-next-line
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const onChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setUser({ ...user, [event.target.id]: event.target.value });
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
          {error && (
            <Grid item xs={10}>
              <Grow in={true}>
                <Alert
                  variant="filled"
                  severity="error"
                  onClose={() => {
                    resetError();
                  }}
                >
                  Please fill the details correctly
                </Alert>
              </Grow>
            </Grid>
          )}
          {authError?.success === false && (
            <Grid item xs={10}>
              <Grow in={true}>
                <Alert
                  variant="filled"
                  severity="error"
                  onClose={() => {
                    resetError();
                  }}
                >
                  Invalid Credentials
                </Alert>
              </Grow>
            </Grid>
          )}
          <TextContainer item xs={10}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="email" color="secondary">
                Email
              </InputLabel>
              <OutlinedInput
                id="email"
                value={email}
                color="secondary"
                fullWidth
                labelWidth={40}
                onChange={(event) => onChange(event)}
                error={email !== "" && emailRegex.test(email) === false}
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
                value={password}
                color="secondary"
                type={showPassword ? "text" : "password"}
                onChange={(event) => onChange(event)}
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
            <LoginButton
              variant="contained"
              fullWidth
              onClick={() => validate()}
            >
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
