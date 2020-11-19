import { Button, Grid, Paper } from "@material-ui/core";
import styled from "styled-components";
import { mobile, tablet } from "theme/breakpoints";

export const LoginCardBox = styled(Paper)`
  height: fit-content;
  width: 500px;
  border-radius: 15px !important;
  padding-bottom: 2rem;
  ${mobile} {
    height: 95%;
    width: 95%;
    margin: auto;
  }
  ${tablet} {
    height: 100%;
    width: 70%;
    margin: auto;
  }
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
    letter-spacing: 1px;
  }
`;

export const TextContainer = styled(Grid)``;

export const LoginButton = styled(Button)`
  background-color: #c2028d !important;
  color: #ffffff !important;
  height: 50px;
  &:hover,
  &:focus {
    transform: translateY(-0.25em);
    transition: all 0.25s;
  }
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
  &:hover,
  &:focus {
    transform: translateY(-0.25em);
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.06) !important;
    transition: all 0.25s;
  }
`;
