import React, { Component, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { NavigationScreenProp, NavigationStateRoute } from 'react-navigation';

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

const StyledButtonSignUp = styled.View`
  background-color: transparent;
  border-radisu: 4;
  border-width: 1;
  height: 100%;
  width: 100%;

  border-color: ${colors.dodgerBlue};
  align-items: center;
  justify-content: center;
`;

const StyledTextSignUp = styled.Text`
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

interface IProps {
  navigation: any;
}

interface IState {
  isLoggingIn: boolean;
  email: string;
  pw: string;
}

function Screen(props: IProps, state: IState) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  let timer: any;

  const onTextChanged = (type: string, text: string) => {
    switch (type) {
      case 'EMAIL':
        setEmail(text);
        break;
      case 'PW':
        setPw(text);
        break;
    }
  };

  const goToSignUp = () => {
    props.navigation.navigate('SignUp');
    // props.navigation.navigate('SignUp');
  };

  const goToFindPw = () => {
    props.navigation.navigate('FindPw');
  };

  const onLogin = () => {
    setIsLoggingIn(true);
    timer = setTimeout(() => {
      setIsLoggingIn(false);
      clearTimeout(timer);
    }, 1000);
  };

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
              testID='email_input'
              // txtLabel={ getString('EMAIL') }
              txtHint={ getString('EMAIL') }
              txt={ email }
              onTextChanged={ (text) => onTextChanged('EMAIL', text)}
            />
            <TextInput
              testID='pw_input'
              style={{ marginTop: 8 }}
              // txtLabel={ getString('EMAIL') }
              txtHint={ getString('PASSWORD') }
              txt={ pw }
              onTextChanged={ (text) => onTextChanged('PW', text)}
              isPassword={ true }
            />
            <StyledButtonWrapper>
              <Button
                testID='btnSignUp'
                containerStyle={{ flex: 1 }}
                onPress={() => goToSignUp()}
                isWhite
              >{getString('SIGN_UP')}</Button>
              <View style={{ width: 8 }}/>
              <Button
                testID='btnLogin'
                containerStyle={{ flex: 1 }}
                isLoading={isLoggingIn}
                onPress={() => onLogin()}
              >{getString('LOGIN')}</Button>
            </StyledButtonWrapper>
            <View style={{ height: 16 }} />
            <TouchableOpacity
              testID='findPw'
              activeOpacity={0.5}
              onPress={() => goToFindPw()}
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

export default Screen;
