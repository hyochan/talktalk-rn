// @flow
import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';

import type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
  ____ImageStyleProp_Internal as ImageStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import { ratio, colors } from '../../utils/Styles';

type Styles = {
  wrapper: ViewStyle,
};

const styles: Styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
});

type Props = {
  style: ViewStyle;
  children?: any;
};

function Shared(props: Props) {
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
