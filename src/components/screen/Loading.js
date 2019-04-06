// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Animated,
} from 'react-native';

import type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
  ____ImageStyleProp_Internal as ImageStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

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
  margin-bottom: 16;
`;

const StyledTextLoading = styled.Text`
  animation: fadein;
  iteration-count: infinite;
  direction: alternate;
  color: colors.dodgerBlue;
  font-size: 16;
`;

type Props = {

};
type State = {

};

function Screen(props: Props, state: State) {
  const spinValue = new Animated.Value(0);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1260deg'],
  });

  return (
    <StyledView>
      <StyledContainer>
        <StyledAnimatedImage
          style = {{
            transform: [{
              rotate: spin
            }]
          }}
        />
        <StyledTextLoading>{getString('LOADING')}</StyledTextLoading>
      </StyledContainer>
    </StyledView>
  );
}

export default Screen;
