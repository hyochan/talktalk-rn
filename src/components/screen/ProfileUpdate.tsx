// @flow
import React, {
  Component,
  useState,
  useEffect,
} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { NavigationScreenProp, NavigationStateRoute } from 'react-navigation';
import Icon5, { FA5Style } from 'react-native-vector-icons/FontAwesome5';

import styled from 'styled-components/native';

import Button from '../shared/Button';
import TextInput from '../shared/TextInput';
import { IC_MASK } from '../../utils/Icons';

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

const StyledWrapper = styled.View`
  margin-top: 48;
  width: 78%;

  flex-direction: column;
  align-items: center;
`;

const StyledBtnWrapper = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-top: 24;
  margin-bottom: 48;
`;

interface IProps {
  navigation: NavigationScreenProp<NavigationStateRoute<any>>;
}

interface IState {
  isUpdating: boolean;
  displayName: string;
  statusMsg: string;
  photoURL: string;
}

function Screen(props: IProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    if (isUpdating) {
      try {
        props.navigation.goBack();
      } catch (err) {
        console.error(err);
      } finally {
        setIsUpdating(false);
      }
    }
  }, [isUpdating]);

  const onLogout = () => {
    props.navigation.navigate('AuthStackNavigator');
  };

  const onUpdate = () => {
    setIsUpdating(true);
  };

  const onTextChanged = (type: string, text: string) => {
    switch (type) {
      case 'DISPLAY_NAME':
        setDisplayName(text);
        break;
      case 'STATUS_MSG':
        setStatusMsg(text);
        break;
    }
  };

  const onPressImg = () => {
  };

  return (
    <StyledContainer>
      <StyledScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StyledWrapper>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={onPressImg}
          >
            <Icon5 name='meh' size={80} color={colors.dusk} light/>
          </TouchableOpacity>
          <TextInput
            testID='input_name'
            style={{ marginTop: 80 }}
            txtLabel={getString('NAME')}
            txtHint={ getString('NAME') }
            txt={ displayName }
            onTextChanged={ (text) => onTextChanged('DISPLAY_NAME', text)}
          />
          <TextInput
            testID='input_status'
            style={{ marginTop: 24 }}
            txtLabel={getString('STATUS_MSG')}
            txtHint={ getString('STATUS_MSG') }
            txt={ statusMsg }
            onTextChanged={ (text) => onTextChanged('STATUS_MSG', text)}
          />
          <StyledBtnWrapper>
            <Button
              testID='logout_btn'
              onPress={() => onLogout()}
              isWhite
            >{getString('LOGOUT')}</Button>
            <View style={{ width: 8 }}/>
            <Button
              testID='update_btn'
              isLoading={isUpdating}
              onPress={() => onUpdate()}
            >{getString('UPDATE')}</Button>
          </StyledBtnWrapper>
        </StyledWrapper>
      </StyledScrollView>
    </StyledContainer>
  );
}

export default Screen;
