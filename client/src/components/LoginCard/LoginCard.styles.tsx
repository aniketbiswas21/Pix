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

export const BorderContainer = styled(Grid)`
  position: relative;
  margin-bottom: 1rem !important;
  margin-top: 2.5rem !important;
`;

export const Border = styled.span`
  width: 100%;
  height: 1px;
  background-color: #f1f5f8;
`;

export const BorderText = styled.span`
  margin-top: -1rem;
  font-size: 1.125rem;
  color: #606f7b;
`;

export const GoogleButton = styled(Button)`
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.06) !important;
  background-color: #ffffff !important;

  svg {
    width: 2.2rem;
    height: auto;
    object-fit: contain;
  }
`;
