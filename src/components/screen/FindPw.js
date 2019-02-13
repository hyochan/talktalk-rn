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

class Screen extends Component<Props, State> {
  static navigationOptions = {
    title: getString('FIND_PW'),
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
    };
  }

  render() {
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
              style={{ marginTop: 8 * ratio }}
              txtLabel={getString('EMAIL')}
              txtHint={ getString('EMAIL') }
              txt={ this.state.email }
              onTextChanged={ (text) => this.onTextChanged('EMAIL', text)}
              isPassword={ true }
            />
            <StyledButtonWrapper>
              <Button
                id='send_link'
                isLoading={this.state.isLoading}
                onPress={() => this.onSendLink()}
              >{getString('SEND_LINK')}</Button>
            </StyledButtonWrapper>
          </StyledWrapper>
        </StyledScrollView>
      </StyledContainer>
    );
  }

  onTextChanged = (type: string, text: string) => {
    switch (type) {
      case 'EMAIL':
        this.setState({ email: text });
        break;
    }
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  onSendLink = () => {
    console.log('onSendLink');
    this.setState({
      isLoading: true,
    }, async() => {
      this.setState({ isLoading: false });
    });
  }
}

export default Screen;
