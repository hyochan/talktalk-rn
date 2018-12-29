// @flow
import React, { Component } from 'react';
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

type State = {

};

class Shared extends Component<Props, State> {
  static defaultProps: Props = {
    isDarkContent: false,
  };

  render() {
    const statusColor: 'default' | 'light-content' | 'dark-content' = Platform.OS === 'android'
      ? 'default'
      : this.props.isDarkContent
        ? 'dark-content'
        : 'light-content';
    return (
      <StatusBar
        barStyle={statusColor}
        backgroundColor={colors.darkBlue}
      />
    );
  }
}

export default Shared;
