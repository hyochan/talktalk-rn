import React from 'react';
import { AsyncStorage, View, Platform, StyleSheet } from 'react-native';
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';

import { commonNavigationOptions } from './MainStackNavigator';
import Login from '../screen/Login';
import SignUp from '../screen/SignUp';
import FindPw from '../screen/FindPw';
import { getString } from '../../../STRINGS';

const StackNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerStyle: {
          borderBottomWidth: 0,
        },
      },
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        title: getString('SIGNUP'),
      },
    },
    FindPw: {
      screen: FindPw,
      navigationOptions: {
        title: getString('FIND_PW'),
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
