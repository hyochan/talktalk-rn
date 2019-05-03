import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    screenWidth: number,
    screenHeight: number,
    ratio: number,
    statusBarHeight: number,
    colors: {
      background: string,
      dodgerBlue: string,
      dusk: string,
      blueyGray: string,
      cloudyBlue: string,
      greenishCyan: string,
      paleGray: string
    }
  }
}
