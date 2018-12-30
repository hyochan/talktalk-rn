// @flow
import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
} from 'react-native';

import type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
  ____ImageStyleProp_Internal as ImageStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import { ratio, colors } from '../../utils/Styles';

type Styles = {
  wrapper: ViewStyle,
  label: ViewStyle,
  labelFocus: TextStyle,
  input: ViewStyle,
  inputFocus: TextStyle,
};

const styles: Styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'stretch',

    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  label: {
    color: colors.blueyGray,
    marginBottom: 8,
    fontSize: 12,
  },
  labelFocus: {
    color: colors.dodgerBlue,
    marginBottom: 8,
    fontSize: 12,
  },
  input: {
    alignSelf: 'stretch',
    color: colors.dusk,
    fontSize: 16,
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgb(233,237,244)',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputFocus: {
    alignSelf: 'stretch',
    color: colors.dusk,
    fontSize: 16,
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.dodgerBlue,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

type Props = {
  style?: ViewStyle;
  labelStyle?: TextStyle;
  labelStyleFocus?: TextStyle;
  placeholderTextColor?: string;
  inputStyle?: TextStyle;
  isPassword?: boolean;
  multiline?: boolean;
  txtLabel?: string;
  txtHint?: string;
  txt?: string;
  onFocus?: () => void;
  onTextChanged?: (text: string) => void;
  onSubmitEditing?: (text: string) => void;
  returnKeyType?: any;
};

type State = {
  focused: boolean;
};

class Shared extends Component<Props, State> {
  static defaultProps: Props = {
    style: styles.wrapper,
  };

  state = {
    focused: false,
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={[
        styles.wrapper,
        this.props.style,
      ]}>
        { this.renderTxtLabel() }
        <TextInput
          style={[
            this.state.focused ? styles.inputFocus : styles.input,
            this.props.inputStyle,
          ]}
          underlineColorAndroid='transparent' // android fix
          autoCapitalize='none'
          autoCorrect={false}
          multiline={this.props.multiline}
          onChangeText={this.props.onTextChanged}
          value={this.props.txt}
          onFocus={ () => this.setState({ focused: true }) }
          onBlur={ () => this.setState({ focused: false }) }
          placeholder={this.props.txtHint}
          placeholderTextColor={this.props.placeholderTextColor}
          onSubmitEditing={this.props.onSubmitEditing}
          returnKeyType={this.props.returnKeyType}
          secureTextEntry={this.props.isPassword}
        />
      </View>
    );
  }

  renderTxtLabel = () => {
    if (this.props.txtLabel) {
      return (
        <Text style={this.state.focused ? this.props.labelStyleFocus : this.props.labelStyle}>
          {this.props.txtLabel}
        </Text>
      );
    }
    return null;
  }
}

export default Shared;
