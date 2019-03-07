import React from 'react';
import { AsyncStorage, View, Platform, StyleSheet } from 'react-native';
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';

import { commonNavigationOptions } from './MainStackNavigator';
import Login from '../screen/Login';
import Signup from '../screen/Signup';
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
    Signup: {
      screen: Signup,
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
