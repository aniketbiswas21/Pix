// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    body: string;
    text: string;
    cardBackground: string;
    secondaryColor: string;
    toggleBorder: string;
    gradient: string;
    darkMode: boolean;
  }
}
