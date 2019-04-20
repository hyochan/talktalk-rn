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

import { ratio, colors } from '../../utils/Styles';

interface IProps {
  isDarkContent: boolean;
}

interface IState {}

function Shared(props: IProps, state: IState) {
  const statusColor: 'default' | 'light-content' | 'dark-content' = Platform.OS === 'android'
    ? 'default'
    : props.isDarkContent
      ? 'dark-content'
      : 'light-content';
  return (
    <StatusBar
      barStyle={statusColor}
      backgroundColor={colors.dodgerBlue}
    />
  );
}

Shared.defaultProps = {
  isDarkContent: false,
};
export default Shared;
