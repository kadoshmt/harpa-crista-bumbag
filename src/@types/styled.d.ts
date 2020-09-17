import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      primaryLight: string;
      primary: string;
      primaryDark: string;

      text: string;
      textSecondary: string;
      textInPrimary: string;

      background: string;
      backgroundSecondary: string;

      inputBackground: string;
      lines: string;
    };

    font: {
      family: string;
      sizes: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
    };
  }
}
