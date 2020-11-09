import { Box } from "@material-ui/core";
import styled from "styled-components";
import background from "../../assets/background.svg";

export const StyledBox = styled(Box)`
  background-image: url(${background});
  height: 100vh;
  min-height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: fixed;
`;
