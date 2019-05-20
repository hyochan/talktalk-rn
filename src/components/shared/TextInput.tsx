import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import styled from 'styled-components/native';

interface IStyles {
  wrapper: ViewStyle;
}

const StyledLabelText = styled.Text<{ focused: boolean }>`
  color: ${({ focused, theme }) => focused ? theme.colors.dodgerBlue : theme.colors.blueyGray};
  margin-bottom: 8px;
  font-size: 12px;
`;

const StyledTextInput = styled.TextInput<{ focused: boolean }>`
  margin-bottom: 8px;
  align-self: stretch;
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  padding: 22px 20px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.dodgerBlue};
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const styles: IStyles = StyleSheet.create({
  wrapper: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
        <StyledLabelText focused={focused}>
          {props.txtLabel}
        </StyledLabelText>
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
      <StyledTextInput
        focused={focused}
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
