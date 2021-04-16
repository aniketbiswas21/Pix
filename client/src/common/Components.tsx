// * Components used througout the application

import { OutlinedInput, TextField } from "@material-ui/core";
import styled from "styled-components";

interface ThemeFlexProps {
  alignItems?: "stretch" | "center" | "flex-start" | "flex-end" | "baseline";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "stretch";
  width?: string;
  height?: string;
}

export const FlexRow = styled.div<ThemeFlexProps>`
  display: flex;
  flex-direction: row;
  align-items: ${(props: ThemeFlexProps) => props.alignItems};
  justify-content: ${(props: ThemeFlexProps) => props.justifyContent};
  width: ${(props: ThemeFlexProps) =>
    props.width ? props.width : "fit-content"};
  height: ${(props: ThemeFlexProps) => props.height};
`;

export const FlexCol = styled.div<ThemeFlexProps>`
  display: flex;
  flex-direction: column;
  align-items: ${(props: ThemeFlexProps) => props.alignItems};
  justify-content: ${(props: ThemeFlexProps) => props.justifyContent};
  width: ${(props: ThemeFlexProps) =>
    props.width ? props.width : "fit-content"};
  height: ${(props: ThemeFlexProps) => props.height};
`;

export const InputField = styled(OutlinedInput)`
  .MuiOutlinedInput-input,
  .MuiOutlinedInput-inputAdornedEnd {
    background-color: ${({ theme }) => (theme.darkMode ? "#3a3b3c" : "#fff")};
    color: ${({ theme }) => theme.text};
  }
  .MuiFormLabel-root {
    color: ${({ theme }) => theme.text};
  }
`;

export const InputTextField = styled(TextField)`
  .MuiOutlinedInput-input,
  .MuiOutlinedInput-inputAdornedEnd {
    background-color: ${({ theme }) => (theme.darkMode ? "#3a3b3c" : "#fff")};
    color: ${({ theme }) => theme.text};
  }
  .MuiFormLabel-root {
    color: ${({ theme }) => theme.text};
  }
`;
