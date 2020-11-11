interface theme {
  body: string;
  text: string;
  toggleBorder: string;
  gradient: string;
}

export const lightTheme: theme = {
  body: "#E2E2E2",
  text: "#363537",
  toggleBorder: "#FFF",
  gradient: "linear-gradient(#39598A, #79D7ED)",
};

export const darkTheme: theme = {
  body: "#183d5d",
  text: "#FAFAFA",
  toggleBorder: "#6B8096",
  gradient: "linear-gradient(#091236, #1E215D)",
};
