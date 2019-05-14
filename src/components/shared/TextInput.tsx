import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  ViewStyle,
  TextStyle,
} from 'react-native';
import theme from '../../utils/theme';

const {
  colors: {
    blueyGray,
    dodgerBlue,
    text,
  },
} = theme;

interface IStyles {
  wrapper: ViewStyle;
  label: ViewStyle;
  labelFocus: TextStyle;
  input: ViewStyle;
  inputFocus: TextStyle;
}

const styles: IStyles = StyleSheet.create({
  wrapper: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  label: {
    color: blueyGray,
    marginBottom: 8,
    fontSize: 12,
  },
  labelFocus: {
    color: dodgerBlue,
    marginBottom: 8,
    fontSize: 12,
  },
  input: {
    alignSelf: 'stretch',
    color: text,
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
    color: text,
    fontSize: 16,
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: dodgerBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

interface IProps {
  testID?: string;
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
}

interface IState {
  focused: boolean;
}

function Shared(props: IProps, state: IState) {
  const [focused, setFocused] = useState(false);

  const renderTxtLabel = () => {
    if (props.txtLabel) {
      return (
        <Text style={focused ? props.labelStyleFocus : props.labelStyle}>
          {props.txtLabel}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={[
      styles.wrapper,
      props.style,
    ]}>
      {renderTxtLabel()}
      <TextInput
        style={[
          focused ? styles.inputFocus : styles.input,
          props.inputStyle,
        ]}
        underlineColorAndroid='transparent' // android fix
        autoCapitalize='none'
        autoCorrect={false}
        multiline={props.multiline}
        onChangeText={props.onTextChanged}
        value={props.txt}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={props.txtHint}
        placeholderTextColor={props.placeholderTextColor}
        // onSubmitEditing={this.props.onSubmitEditing}
        returnKeyType={props.returnKeyType}
        secureTextEntry={props.isPassword}
      />
    </View>
  );
}

Shared.defaultProps = {
  style: styles.wrapper,
  labelStyle: styles.label,
  labelStyleFocus: styles.labelFocus,
};

export default Shared;
