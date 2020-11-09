import { Button, Grid, Paper } from "@material-ui/core";
import styled from "styled-components";

export const LoginCardBox = styled(Paper)`
  height: 500px;
  width: 500px;
  border-radius: 15px !important;
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 2%;
  span {
    font-size: 2.4rem;
    margin-top: auto;
    line-height: 2.6rem;
    font-weight: 600;
    /* color: #607d8b; */
    letter-spacing: 1px;
  }
  /* img {
    height: 2.6rem;
    margin-top: auto;
  } */
`;

export const TextContainer = styled(Grid)``;

export const LoginButton = styled(Button)`
  background-color: #c2028d !important;
  color: #ffffff !important;
  height: 50px;
`;

export const Border = styled.div`
  border: 0 solid #dae1e7;
`;
