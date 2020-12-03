import { Button, Grid, Paper } from "@material-ui/core";
import { LoginCardBox } from "components/LoginCard/LoginCard.styles";
import styled from "styled-components";
import { mobile, tablet } from "theme/breakpoints";

export const SubHeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 2%;
  span {
    font-size: 1rem;
    margin-top: auto;
    line-height: 1.2rem;
    font-weight: 400;
    ${mobile} {
      font-size: 0.8rem;
    }
  }
`;

export const OTPCardBox = styled(LoginCardBox)`
  margin-top: 6rem;
`;
