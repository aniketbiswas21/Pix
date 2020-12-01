import React, { useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import {
  Border,
  BorderContainer,
  BorderText,
  Flex,
  GoogleButton,
  TextContainer,
} from "components/LoginCard/LoginCard.styles";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "redux/type";
import { RegisterButton, RegisterCardBox } from "./RegisterCard.styles";
import { ReactComponent as GoogleIcon } from "../../assets/google.svg";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const RegisterCard: React.FC = () => {
  const [user, setUser] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const authError = useSelector((state: RootState) => state.auth?.authError);
  const { name, email, password } = user;
  // eslint-disable-next-line
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setUser({ ...user, [event.target.id]: event.target.value });
  };
  return (
    <>
      <RegisterCardBox elevation={5}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            <Flex>
              <span>&nbsp;Register</span>
            </Flex>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <span>
              Already have an account?&nbsp;
              <Link to="/" style={{ color: "#C2028D" }}>
                Login
              </Link>
            </span>
          </Grid>
          <TextContainer item xs={10}>
            <TextField
              variant="outlined"
              fullWidth
              label="Name"
              value={name}
              id="name"
              onChange={(event) => {
                onChange(event);
              }}
              error={name !== "" && (name.length < 5 || name.trim().length < 5)}
              helperText={
                name !== "" &&
                (name.length < 5 || name.trim().length < 5) &&
                "First Name should be of atleast 5 characters"
              }
            />
          </TextContainer>
          <TextContainer item xs={10}>
            <TextField
              variant="outlined"
              fullWidth
              label="Email"
              value={email}
              id="email"
              onChange={(event) => {
                onChange(event);
              }}
              error={email !== "" && emailRegex.test(email) === false}
              helperText={
                email !== "" &&
                emailRegex.test(email) === false &&
                "Please enter a valid email"
              }
            />
          </TextContainer>
          <TextContainer item xs={10}>
            <TextField
              variant="outlined"
              fullWidth
              label="Password"
              type="password"
              value={password}
              id="password"
              onChange={(event) => {
                onChange(event);
              }}
              error={
                password !== "" &&
                (password.length < 6 || password.trim().length < 6)
              }
              helperText={
                password !== "" &&
                (password.length < 6 || password.trim().length < 6) &&
                "Password should be atleast 6 characters"
              }
            />
          </TextContainer>
          <TextContainer item xs={10}>
            <TextField
              variant="outlined"
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              id="confirmPassword"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              error={confirmPassword !== "" && confirmPassword !== password}
              helperText={
                confirmPassword !== "" &&
                confirmPassword !== password &&
                "Passwords did not match"
              }
            />
          </TextContainer>
          <Grid container item xs={10} justify="center">
            <RegisterButton variant="contained" fullWidth>
              Register
            </RegisterButton>
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
      </RegisterCardBox>
    </>
  );
};

export default RegisterCard;
