import React from 'react';
import { createStackNavigator } from 'react-navigation';
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';

import { commonNavigationOptions } from './MainStackNavigator';
import Login from '../screen/Login';
import SignUp from '../screen/SignUp';
import FindPw from '../screen/FindPw';
import { getString } from '../../../STRINGS';
import theme from '../../utils/theme';

const { colors: { background, title } } = theme;

const StackNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerStyle: {
          backgroundColor: background,
          borderBottomWidth: 0,
        },
      },
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        title: getString('SIGNUP'),
        headerStyle: {
          backgroundColor: background,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          color: title,
        },
      },
    },
    FindPw: {
      screen: FindPw,
      navigationOptions: {
        title: getString('FIND_PW'),
        headerStyle: {
          backgroundColor: background,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          color: title,
        },
      },
    },
  },
  {
    initialRouteName: 'Login',
    navigationOptions: commonNavigationOptions,
    transitionConfig: () => ({ screenInterpolator: StackViewStyleInterpolator.forHorizontal }),
  },
);

export default StackNavigator;
