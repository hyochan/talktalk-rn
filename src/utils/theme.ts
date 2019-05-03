import { Dimensions, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { DefaultTheme } from 'styled-components';

const { width, height } = Dimensions.get('window');
let calRatio = width <= height ? 16 * (width / height) : 16 * (height / width);
if (width <= height) {
  if (calRatio < 9) {
    calRatio = width / 9;
  } else {
    calRatio = height / 18;
  }
} else {
  if (calRatio < 9) {
    calRatio = height / 9;
  } else {
    calRatio = width / 18;
  }
}

const theme: DefaultTheme = {
  screenWidth: width,
  screenHeight: height,
  ratio: calRatio / (360 / 9),
  statusBarHeight: getStatusBarHeight(true),
  colors: {
    background: '#e3e3e3',
    dodgerBlue: 'rgb(58,139,255)',
    dusk: 'rgb(65,77,107)',
    blueyGray: 'rgb(134,154,183)',
    cloudyBlue: 'rgb(175,194,219)',
    greenishCyan: 'rgb(80,227,194)',
    paleGray: 'rgb(233,237,244)',
  }
};

export default theme;