import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Animated,
} from 'react-native';

import { Text } from 'react-native-animatable';

import { IC_ICON } from '../../utils/Icons';
import { animateRotateLoop } from '../../utils/Functions';
import { ratio, colors } from '../../utils/Styles';
import { getString } from '../../../STRINGS';

import styled from 'styled-components/native';

const StyledView = styled.View`
  background-color: transparent;
`;

const StyledContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AnimatedImage = Animated.createAnimatedComponent(Image);
const StyledAnimatedImage = styled(AnimatedImage)`
  width: 60;
  height: 60;
  margin-top: 500;
`;

interface IProps {

}

interface IState {

}

function Screen(props: IProps, state: IState) {
  const spinValue = new Animated.Value(0);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1260deg'],
  });

  return (
    <StyledView>
      <StyledContainer>
        <StyledAnimatedImage
          source={IC_ICON}
          style={{
            transform: [{
              rotate: spin,
            }],
          }}
        />
        <Text
          animation='fadeIn'
          iterationCount={'infinite'}
          direction='alternate'
          style={{
            color: colors.dodgerBlue,
            fontSize: 16,
          }}
        >
          { getString('LOADING') }
        </Text>
      </StyledContainer>
    </StyledView>
  );
}

export default Screen;
