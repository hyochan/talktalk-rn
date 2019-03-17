// @flow
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View,
  Platform,
  StatusBar,
} from 'react-native';

import type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
  ____ImageStyleProp_Internal as ImageStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import { ratio, colors } from '../../utils/Styles';

type Props = {
  isDarkContent: boolean,
};

type State = {};

function Shared(props: Props, state: State) {
  const statusColor: 'default' | 'light-content' | 'dark-content' = Platform.OS === 'android'
    ? 'default'
    : props.isDarkContent
      ? 'dark-content'
      : 'light-content';
  return (
    <StatusBar
      barStyle={statusColor}
      backgroundColor={colors.darkBlue}
    />
  );
}

Shared.defaultProps = {
  isDarkContent: false,
};
export default Shared;
