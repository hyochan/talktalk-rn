// @flow
import React, { Component } from 'react';
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

type Styles = {
  container: ViewStyle,
  scrollView: ViewStyle,
  scrollViewContainer: ViewStyle,
  wrapper: ViewStyle,
  btnWrapper: ViewStyle,
};

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

class Screen extends Component<Props, State> {
  static navigationOptions = {
    title: getString('SIGNUP'),
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isRegistering: false,
      email: '',
      pw: '',
      displayName: '',
      statusMsg: '',
    };
  }

  render() {
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
              style={{ marginTop: 8 }}
              txtLabel={getString('EMAIL')}
              txtHint={ getString('EMAIL') }
              txt={ this.state.email }
              onTextChanged={ (text) => this.onTextChanged('EMAIL', text)}
            />
            <TextInput
              style={{ marginTop: 24 }}
              txtLabel={ getString('PASSWORD') }
              txtHint={ getString('PASSWORD') }
              txt={ this.state.pw }
              onTextChanged={ (text) => this.onTextChanged('PW', text)}
              isPassword={ true }
            />
            <TextInput
              style={{ marginTop: 24 }}
              txtLabel={getString('NAME')}
              txtHint={ getString('NAME') }
              txt={ this.state.displayName }
              onTextChanged={ (text) => this.onTextChanged('NAME', text)}
            />
            <TextInput
              style={{ marginTop: 24 }}
              txtLabel={getString('STATUS_MSG')}
              txtHint={ getString('STATUS_MSG') }
              txt={ this.state.statusMsg }
              onTextChanged={ (text) => this.onTextChanged('STATUS_MSG', text)}
            />
            <StyledButtonWrapper>
              <Button
                id='register'
                isLoading={this.state.isRegistering}
                onPress={() => this.onRegister()}
              >{getString('REGISTER')}</Button>
            </StyledButtonWrapper>
          </StyledWrapper>
        </StyledScrollView>
      </StyledContainer>
    );
  }

  onRegister = () => {
    this.setState({ isRegistering: true }, () => {
      this.setState({ isRegistering: false });
    });
  }

  onTextChanged = (type: string, text: string) => {
    switch (type) {
      case 'EMAIL':
        this.setState({ email: text });
        break;
      case 'PW':
        this.setState({ pw: text });
        break;
      case 'NAME':
        this.setState({ displayName: text });
        break;
      case 'STATUS_MSG':
        this.setState({ statusMsg: text });
        break;
    }
  }
}

export default Screen;
