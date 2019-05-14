import React, { useState, useEffect } from 'react';
import styled, { withTheme, ThemeProps, DefaultTheme } from 'styled-components/native';
import TextInput from '../shared/TextInput';
import Button from '../shared/Button';
import StatusBar from '../shared/StatusBar';
import { getString } from '../../../STRINGS';

const StyledContainer = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
  flex-direction: column;
  align-items: center;
`;

const StyledScrollView = styled.ScrollView`
  align-self: stretch;
`;

const StyledWrapper = styled.View`
  margin-top: 40px;
  width: 78%;
`;

const StyledButtonWrapper = styled.View`
  width: 100%;
  align-items: flex-end;
  margin-top: 16px;
`;

interface IProps extends ThemeProps<DefaultTheme> {
  navigation: any;
}

interface IState {
  email: string;
  isLoading: boolean;
}

function Screen(props: IProps) {
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
    setLoading(true);
  };

  const { theme } = props;

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
            style={{ marginTop: 8 * theme.ratio }}
            txtLabel={getString('EMAIL')}
            txtHint={ getString('EMAIL') }
            txt={ email }
            onTextChanged={ (text) => onTextChanged('EMAIL', text)}
            placeholderTextColor={theme.colors.text}
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

export default withTheme(Screen);
