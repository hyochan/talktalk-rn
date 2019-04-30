import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Image,
  Text,
  View,
} from 'react-native';
import styled from 'styled-components/native';

import { ratio, colors } from '../../utils/Styles';

interface IStyledElement {
  white?: boolean;
};

interface IButtonContainer {
  width: number;
  height: number;
};

interface IProps {
  testID: string;
  containerStyle: ViewStyle;
  isWhite: boolean;
  isLoading: boolean;
  isDisabled: boolean;
  onPress: () => void;
  imgLeftSrc: any;
  indicatorColor: string;
  activeOpacity: number;
  children: any;
  width: number;
  height: number;
}

const StyledContainer = styled.View`
  flex: 1;
`;

const StyledButtonContainer = styled.View<IButtonContainer>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.View<IStyledElement>`
  background-color: ${({ white }) => white ? 'white' : colors.dodgerBlue};
  border-color: ${colors.dodgerBlue};
  border-radius: 4;
  border-width: 1;
  shadow-color: ${colors.dodgerBlue};
  shadow-radius: ${({ white }) => white ? 0 : 4};
  shadow-opacity: ${({ white }) => white ? 0.0 : 0.3};
  align-items: center;
  justify-content: center;
`;

const StyledButtonDisabled = styled.View`
  background-color: rgb(243,243,243);
  align-self: center;
  border-radius: 4;
  border-width: 2;
  border-color: #333;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text<IStyledElement>`
  font-size: 14;
  font-weight: bold;
  color: ${({ white }) => white ? 'white' : colors.dodgerBlue};
`;

const StyledImageLeft = styled.Image`
  width: 24;
  height: 24;
  position: absolute;
  left: 16;
`;

function Button({
  isDisabled,
  isWhite,
  activeOpacity,
  onPress,
  isLoading,
  width,
  height,
  indicatorColor,
  imgLeftSrc,
  children
}: Partial<IProps>) { 
  return (
    <StyledContainer>
      {isDisabled ? (
        <StyledButtonDisabled>
          <StyledText>{children}</StyledText>
        </StyledButtonDisabled>
      ) : (
        <TouchableOpacity
          testID="press_id"
          activeOpacity={activeOpacity}
          onPress={onPress}
        >
          <StyledButton white={isWhite}>
            <StyledButtonContainer
              width={width}
              height={height}
            >
              {isLoading
                ? <ActivityIndicator size='small' color={indicatorColor} />
                : imgLeftSrc && <StyledImageLeft source={imgLeftSrc} />
              }
              {!isLoading && (
                <StyledText white={!isWhite}>{children}</StyledText>
              )}
            </StyledButtonContainer>
          </StyledButton>            
        </TouchableOpacity>
      )}      
    </StyledContainer>
  );
}

Button.defaultProps = {
  isWhite: false,
  isLoading: false,
  isDisabled: false,
  indicatorColor: 'white',
  activeOpacity: 0.5,
  width: 136,
  height: 60,
};

export default Button;
