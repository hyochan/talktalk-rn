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
  text: TextStyle,
};

const styles: Styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  text: {
    fontSize: 14 * ratio,
    color: 'rgb(155,155,155)',
    alignSelf: 'center',
  },
});

type Props = {
  style: ViewStyle;
  children?: any;
};

type State = {

};

class Shared extends Component<Props, State> {
  static defaultProps: Props = {
    style: styles.wrapper,
  };

  render() {
    return (
      <View
        style={this.props.style}
      >
        <Text
          style={[
            styles.text,
          ]}
        >{this.props.children}</Text>
      </View>
    );
  }
}

export default Shared;
