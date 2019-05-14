import * as styledComponents from 'styled-components/native';
import ThemeInterface from './theme';

const {
  default: styled,
  css,
  ThemeProvider,
} = styledComponents as styledComponents.ReactNativeThemedStyledComponentsModule<typeof ThemeInterface>;

export { css, ThemeProvider };
export default styled;
