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
  flex: 1;
  background-color: white;
  flex-direction: column;
  align-items: center;
`;

const StyledScrollView = styled.ScrollView`
  align-self: stretch;
`;

const StyledScrollViewContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const StyledWrapper = styled.View`
  margin-top: 40;
  width: 78%;
`;

const StyledButtonWrapper = styled.View`
  width: 100%;
  align-items: flex-end;
  margin-top: 16;
`;

type Props = {
  navigation: any,
};
type State = {
  email: string,
  isLoading: boolean,
};

function Screen(props: Props) {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (isLoading) {
      setLoading(false);
    }
  }, [isLoading]);

  const onTextChanged = (type: string, text: string) => {
    switch (type) {
      case 'EMAIL':
        setEmail(text);
        break;
    }
  };

  const onSendLink = () => {
    console.log('onSendLink');
    setLoading(true);
  };

  return (
    <StyledContainer>
      <StatusBar isDarkContent={false}/>
      <StyledScrollView
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StyledWrapper>
          <TextInput
            testID='input_email'
            style={{ marginTop: 8 * ratio }}
            txtLabel={getString('EMAIL')}
            txtHint={ getString('EMAIL') }
            txt={ email }
            onTextChanged={ (text) => onTextChanged('EMAIL', text)}
            isPassword={ true }
          />
          <StyledButtonWrapper>
            <Button
              testID='btnSendLink'
              isLoading={isLoading}
              onPress={() => onSendLink()}
            >{getString('SEND_LINK')}</Button>
          </StyledButtonWrapper>
        </StyledWrapper>
      </StyledScrollView>
    </StyledContainer>
  );
}

export default Screen;
