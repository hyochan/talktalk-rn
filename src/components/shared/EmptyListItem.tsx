import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View,
  ViewStyle,
} from 'react-native';

interface IStyles {
  wrapper: ViewStyle;
}

const styles: IStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
});

interface IProps {
  style: ViewStyle;
  children?: any;
}

function Shared(props: IProps) {
  return (
    <View
      style={props.style}
    >
      <Text
        style={{
          fontSize: 14,
          color: 'rgb(155,155,155)',
          alignSelf: 'center',
        }}
      >{props.children}</Text>
    </View>
  );
}

Shared.defaultProps = {
  style: styles.wrapper,
};

export default Shared;
