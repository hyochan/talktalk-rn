import React from 'react';
import { AsyncStorage, View, Platform, StyleSheet } from 'react-native';
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';

import { commonNavigationOptions } from './MainStackNavigator';
import Login from '../screen/Login';
import Signup from '../screen/Signup';
import FindPw from '../screen/FindPw';

const StackNavigator = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
    FindPw: { screen: FindPw },
  },
  {
    initialRouteName: 'FindPw',
    navigationOptions: commonNavigationOptions,
    transitionConfig: () => ({ screenInterpolator: StackViewStyleInterpolator.forHorizontal }),
  },
);

export default StackNavigator;
