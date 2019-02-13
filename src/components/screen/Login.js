// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
  ____ImageStyleProp_Internal as ImageStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import TextInput from '../shared/TextInput';
import Button from '../shared/Button';
import StatusBar from '../shared/StatusBar';

import { IC_ICON } from '../../utils/Icons';
import { statusBarHeight, ratio, colors } from '../../utils/Styles';
import { getString } from '../../../STRINGS';

import styled from 'styled-components/native';

const StyledScollView = styled.ScrollView`
  background-color: white;
`;

const StyledContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const StyledIconWrapper = styled.View`
  position: absolute;
  top: 76;
  left: 40;

  flex-direction: column;
  align-items: flex-start;
`;

const StyledIcon = styled.Image`
  width: 60;
  height: 60;
`;

const StyledIconText = styled.Text`
  color: ${colors.dusk},
  font-size: 20;
  font-weight: bold;
  margin-top: 8;
`;

const StyledInputWrapper = styled.View`
  margin-top: 260;
  width: 78%;
  height: 300;

  flex-direction: column;
  align-items: center;
`;

const StyledButtonWrapper = styled.View`
  align-self: stretch;
  margin-top: 20;
  height: 60;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledButtonSignup = styled.View`
  background-color: transparent;
  border-radisu: 4;
  border-width: 1;
  height: 100%;
  width: 100%;

  border-color: ${colors.dodgerBlue};
  align-items: center;
  justify-content: center;
`;

const StyledTextSignup = styled.Text`
  font-size: 16;
  font-weight: bold;
  color: ${colors.dodgerBlue};
`;

const StyledButtonLogin = styled.View`
  background-color: ${colors.dodgerBlue};
  border-color: ${colors.dodgerBlue};
  border-radius: 4;
  border-width: 1;
  height: 60;
  shadow-color: ${colors.dodgerBlue};
  showdow-offset: {
    width: 0;
    height: 10;
  };
  shadow-radius: 4;
  shadow-opacity: 0.3;
  align-items: center;
  justify-content: center;
`;

const StyledTextLogin = styled.TextInput`
  font-size: 16;
  font-weight: bold;
  color: white;
`;

const StyledTextForgotPw = styled.Text`
  font-size: 12;
  color: ${colors.dodgerBlue};
  text-decoration-line: underline;
`;

const StyledTextCopyright = styled.Text`
  margin-top: 80;
  font-size: 12;
  color: ${colors.cloudyBlue};
`;

type Props = {
  navigation: any;
};
type State = {
  isLoggingIn: boolean;
  email: string;
  pw: string;
};

class Screen extends Component<Props, State> {
  static navigationOptions = {
    headerStyle: {
      borderBottomWidth: 0,
    }
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoggingIn: false,
      email: '',
      pw: '',
    };
  }

  render() {
    return (
      <SafeAreaView>
        <StyledScollView>
          <StatusBar isDarkContent={true}/>
          <StyledContainer>
            <StyledIconWrapper>
              <StyledIcon source={IC_ICON}/>
              <StyledIconText>{getString('HELLO')}.</StyledIconText>
            </StyledIconWrapper>
            <StyledInputWrapper>
              <TextInput
                // txtLabel={ getString('EMAIL') }
                txtHint={ getString('EMAIL') }
                txt={ this.state.email }
                onTextChanged={ (text) => this.onTextChanged('EMAIL', text)}
              />
              <TextInput
                style={{ marginTop: 8 }}
                // txtLabel={ getString('EMAIL') }
                txtHint={ getString('PASSWORD') }
                txt={ this.state.pw }
                onTextChanged={ (text) => this.onTextChanged('PW', text)}
                isPassword={ true }
              />
              <StyledButtonWrapper>
                <Button
                  id='signup'
                  constainerStyle={{ flex: 1 }}
                  onPress={() => this.goToSignup()}
                  isWhite
                >{getString('SIGN_UP')}</Button>
                <View style={{ width: 8 }}/>
                <Button
                  id='login'
                  constainerStyle={{ flex: 1 }}
                  isLoading={this.state.isLoggingIn}
                  onPress={() => this.onLogin()}
                >{getString('LOGIN')}</Button>
              </StyledButtonWrapper>
              <View style={{ height: 16 }} />
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => this.goToFindPw()}
              >
                <StyledTextForgotPw>{getString('FORGOT_PW')}</StyledTextForgotPw>
              </TouchableOpacity>
              <StyledTextCopyright>copyright by dooboolab.com</StyledTextCopyright>
            </StyledInputWrapper>
          </StyledContainer>
        </StyledScollView>
      </SafeAreaView>
    );
  }

  onTextChanged = (type: string, text: string) => {
    switch (type) {
      case 'EMAIL':
        this.setState({ email: text });
        return;
      case 'PW':
        this.setState({ pw: text });
    }
  }

  goToSignup = () => {
    this.props.navigation.navigate('Signup');
    // this.props.navigation.navigate('Signup');
  }
  goToFindPw = () => {
    this.props.navigation.navigate('FindPw');
  }

  onLogin = () => {
    this.setState({ isLoggingIn: true }, () => {
      try {
      } catch (err) {
        // Alert.alert(getString('ERROR'), err.message);
      } finally {
        this.setState({ isLoggingIn: false });
      }
    });
  }
}

export default Screen;
