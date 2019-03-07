// @flow
import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ScrollView,
} from 'react-native';

import styled from 'styled-components/native';

import type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
  ____ImageStyleProp_Internal as ImageStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import TextInput from '../shared/TextInput';
import Button from '../shared/Button';
import StatusBar from '../shared/StatusBar';

import { ratio, colors } from '../../utils/Styles';
import { getString } from '../../../STRINGS';

const StyledContainer = styled.View`
  flex:1;
  background-color: white;
  flex-direction: column;
  align-items: center;
`;

const StyledScrollView = styled.ScrollView`
  align-self: stretch;
`;

const StyledWrapper = styled.View`
  margin-top: 40;
  width: 78%;

  flex-direction: column;
  align-items: center;
`;

const StyledButtonWrapper = styled.View`
  margin-top: 24;
  width: 100%;
  align-items: flex-end;
`;

type Props = {
  navigation: any;
};
type State = {
  isRegistering: boolean;
  email: string;
  pw: string;
  displayName: string;
  statusMsg: string;
};

function Screen(props: Props, state: State) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    if (isRegistering) {
      setIsRegistering(false);
    }
  }, [isRegistering]);

  const onRegister = () => {
    setIsRegistering(true);
  };

  const onTextChanged = (type: string, text: string) => {
    switch (type) {
      case 'EMAIL':
        setEmail(text);
        break;
      case 'PW':
        setPw(text);
        break;
      case 'NAME':
        setDisplayName(text);
        break;
      case 'STATUS_MSG':
        setStatusMsg(text);
        break;
    }
  };

  return (
    <StyledContainer>
      <StatusBar isDarkContent={true}/>
      <StyledScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StyledWrapper>
          <TextInput
            testID='email_input'
            style={{ marginTop: 8 }}
            txtLabel={getString('EMAIL')}
            txtHint={ getString('EMAIL') }
            txt={ email }
            onTextChanged={ (text) => onTextChanged('EMAIL', text)}
          />
          <TextInput
            testID='pw_input'
            style={{ marginTop: 24 }}
            txtLabel={ getString('PASSWORD') }
            txtHint={ getString('PASSWORD') }
            txt={ pw }
            onTextChanged={ (text) => onTextChanged('PW', text)}
            isPassword={ true }
          />
          <TextInput
            testID='name_input'
            style={{ marginTop: 24 }}
            txtLabel={getString('NAME')}
            txtHint={ getString('NAME') }
            txt={ displayName }
            onTextChanged={ (text) => onTextChanged('NAME', text)}
          />
          <TextInput
            testID='status_input'
            style={{ marginTop: 24 }}
            txtLabel={getString('STATUS_MSG')}
            txtHint={ getString('STATUS_MSG') }
            txt={ statusMsg }
            onTextChanged={ (text) => onTextChanged('STATUS_MSG', text)}
          />
          <StyledButtonWrapper>
            <Button
              testID='register'
              isLoading={isRegistering}
              onPress={() => onRegister()}
            >{getString('REGISTER')}</Button>
          </StyledButtonWrapper>
        </StyledWrapper>
      </StyledScrollView>
    </StyledContainer>
  );
}

export default Screen;
