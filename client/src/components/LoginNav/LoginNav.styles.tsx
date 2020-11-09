import { Grid } from "@material-ui/core";
import styled from "styled-components";

export const Nav = styled(Grid)`
  height: 100px;
  padding-top: 10px;
  img {
    height: auto;
    width: 3rem;
    object-fit: contain;
  }
`;

export const LogoText = styled.div`
  font-family: "Big Shoulders Stencil Text", sans-serif;
  font-size: 2.2rem;
  margin-top: auto;
  padding-left: 0.5rem;
  font-weight: 900;
  letter-spacing: 3px;
`;

export const NavToggle = styled(Grid)`
  display: flex;
  justify-content: flex-end;
  padding-left: 30%;
`;
