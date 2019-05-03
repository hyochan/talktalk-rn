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
import { ThemeConsumer } from 'styled-components/native';

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
    <ThemeConsumer>
      {({ colors: { dodgerBlue }}) => (
        <StatusBar
          barStyle={statusColor}
          backgroundColor={dodgerBlue}
        />
      )}      
    </ThemeConsumer>
  );
}

Shared.defaultProps = {
  isDarkContent: false,
};

export default Shared;
