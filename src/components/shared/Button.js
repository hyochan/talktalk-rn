// @flow
import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
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
  btn: ViewStyle,
  btnDisabled: ViewStyle,
  txt: TextStyle,
  imgLeft: ImageStyle,
};

const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 4,
    borderWidth: 2,
    width: '100%',
    height: '100%',
    borderColor: 'white',

    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisabled: {
    backgroundColor: 'rgb(243,243,243)',
    alignSelf: 'center',
    borderRadius: 4,
    borderWidth: 2,
    width: '100%',
    height: '100%',
    borderColor: '#333',

    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 14,
    color: 'white',
  },
  imgLeft: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 16,
  },
});

type Props = {
  constainerStyle?: ViewStyle;
  isLoading?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  disabledStyle?: ViewStyle;
  textStyle?: TextStyle;
  imgLeftSrc?: any;
  imgLeftStyle?: ImageStyle;
  indicatorColor?: string;
  activeOpacity?: number;
  children?: any;
};

type State = {

};

class Button extends Component<Props, State> {
  static defaultProps: Props = {
    isLoading: false,
    isDisabled: false,
    style: styles.btn,
    textStyle: styles.txt,
    imgLeftStyle: styles.imgLeft,
    indicatorColor: 'white',
    activeOpacity: 0.5,
  };

  render() {
    if (this.props.isDisabled) {
      return (
        <View style={this.props.constainerStyle}>
          <View style={this.props.disabledStyle}>
            <Text style={this.props.textStyle}>{this.props.children}</Text>
          </View>
        </View>
      );
    }
    if (this.props.isLoading) {
      return (
        <View style={this.props.constainerStyle}>
          <View style={this.props.style}>
            <ActivityIndicator size='small' color={this.props.indicatorColor} />
          </View>
        </View>
      );
    }
    return (
      <View style={this.props.constainerStyle}>
        <TouchableOpacity
          activeOpacity={this.props.activeOpacity}
          onPress={this.props.onPress}
        >
          <View style={this.props.style}>
            {
              this.props.imgLeftSrc
                ? <Image
                  style={this.props.imgLeftStyle}
                  source={this.props.imgLeftSrc}
                />
                : null
            }
            <Text style={this.props.textStyle}>{this.props.children}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Button;
