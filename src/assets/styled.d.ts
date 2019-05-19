import 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: string;
      gray: string;
      primary: string;
    };
    font: {
      size: {
        l: string;
        m: string;
        s: string;
      };
      family: {
        roboto: string;
      };
    };
  }
}
