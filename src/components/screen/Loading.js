// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Animated,
} from 'react-native';

import type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
  ____ImageStyleProp_Internal as ImageStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import { Text } from 'react-native-animatable';

import { IC_ICON } from '../../utils/Icons';
import { animateRotateLoop } from '../../utils/Functions';
import { ratio, colors } from '../../utils/Styles';
import { getString } from '../../../STRINGS';

type Styles = {
  container: ViewStyle,
};

const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = {

};
type State = {

};

class Screen extends Component<Props, State> {
  static navigationOptions = {
    title: 'Title',
  };
  spinValue = new Animated.Value(0);
  spin = this.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1260deg'],
  });

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.Image
          source={IC_ICON}
          style={{
            width: 60,
            height: 60,
            marginBottom: 16,
            transform: [{ rotate: this.spin }],
          }}
        />
        <Text
          animation='fadeIn'
          iterationCount={'infinite'}
          direction='alternate'
          style={{
            color: colors.dodgerBlue,
            fontSize: 16,
          }}
        >
          { getString('LOADING') }
        </Text>
      </View>
    );
  }
}

export default Screen;
