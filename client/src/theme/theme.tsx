interface theme {
  body: string;
  text: string;
  cardBackground: string;
  secondaryColor: string;
  toggleBorder: string;
  gradient: string;
  darkMode: boolean;
}

export const lightTheme: theme = {
  body: "#F0F2F5",
  text: "#363537",
  cardBackground: "#FFF",
  secondaryColor: "#986FF7",
  toggleBorder: "#FFF",
  gradient: "linear-gradient(#39598A, #79D7ED)",
  darkMode: false,
};

export const darkTheme: theme = {
  body: "#18191A",
  text: "#FAFAFA",
  cardBackground: "#242526",
  secondaryColor: "#986FF7",
  toggleBorder: "#6B8096",
  gradient: "linear-gradient(#091236, #1E215D)",
  darkMode: true,
};
