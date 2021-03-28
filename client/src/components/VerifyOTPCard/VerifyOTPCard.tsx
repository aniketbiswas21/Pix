import React, { useState } from "react";
import { Grid, Grow, TextField } from "@material-ui/core";
import {
  Flex,
  LoginButton,
  TextContainer,
} from "../LoginCard/LoginCard.styles";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/type";
import {
  OTPCardBox,
  RegenerateText,
  SubHeadingContainer,
} from "./VerifyOTPCard.styles";
import { clearOtpError, verifyOtp } from "redux/actions/otpActions";
import { useHistory } from "react-router";
import { useMutation } from "react-query";
import axios from "utils/axios";

const VerifyOTPCard: React.FC = () => {
  const [error, setError] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const dispatch = useDispatch();
  const otpState = useSelector((state: RootState) => state.otp);
  const { push } = useHistory();
  const regenerateOTP = useMutation((regenerate) =>
    axios.put("/auth/regenerate-otp", regenerate)
  );

  const resetError = (): void => {
    setError(false);
  };
  const onChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setOtp(event.target.value);
  };
  const onSubmit = async (): Promise<void> => {
    if (otp.length !== 6 || otp.trim().length !== 6) {
      setError(true);
    } else {
      await dispatch(verifyOtp(otp));
      if (otpState?.success === true) {
        push("/home");
      }
    }
  };
  return (
    <>
      <OTPCardBox elevation={5}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            <Flex>
              <span>&nbsp;Verify OTP</span>
            </Flex>
          </Grid>
          <Grid item xs={12}>
            <SubHeadingContainer>
              <span>Please enter the 6 digit OTP sent to your email id.</span>
            </SubHeadingContainer>
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
                  Please fill the OTP correctly
                </Alert>
              </Grow>
            </Grid>
          )}
          {otpState?.error && (
            <Grid item xs={10}>
              <Grow in={true}>
                <Alert
                  variant="filled"
                  severity="error"
                  onClose={() => {
                    dispatch(clearOtpError());
                  }}
                >
                  {otpState?.error.message}
                </Alert>
              </Grow>
            </Grid>
          )}
          {regenerateOTP.isSuccess === true && (
            <Grid item xs={10}>
              <Grow in={true}>
                <Alert variant="filled" onClose={() => {}} severity="success">
                  Successfully regenerated OTP
                </Alert>
              </Grow>
            </Grid>
          )}
          <TextContainer item xs={10}>
            <TextField
              variant="outlined"
              fullWidth
              label="OTP"
              value={otp}
              id="otp"
              onChange={(event) => {
                onChange(event);
              }}
              error={otp !== "" && (otp.length < 6 || otp.trim().length < 6)}
              color="secondary"
              helperText={
                otp !== "" &&
                (otp.length < 6 || otp.trim().length < 6) &&
                "Please enter a 6 digit valid otp"
              }
            />
          </TextContainer>
          <Grid item xs={10}>
            <RegenerateText
              onClick={() => {
                regenerateOTP.mutate();
              }}
            >
              Regenerate OTP
            </RegenerateText>
          </Grid>
          <Grid container item xs={10} justify="center">
            <LoginButton
              variant="contained"
              fullWidth
              onClick={() => {
                onSubmit();
              }}
            >
              Verify OTP
            </LoginButton>
          </Grid>
        </Grid>
      </OTPCardBox>
    </>
  );
};

export default VerifyOTPCard;
