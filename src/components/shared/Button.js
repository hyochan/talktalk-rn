// @flow
import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
} from 'react-native';
import styled from 'styled-components/native';

import { ratio, colors } from '../../utils/Styles';

const StyledContainer = styled.View`
  flex: 1;
`;

const StyledButton = styled.View`
  background-color: ${colors.dodgerBlue};
  border-color: ${colors.dodgerBlue};
  border-radius: 4;
  border-width: 1;
  shadow-color: ${colors.dodgerBlue};
  shadow-radius: 4;
  shadow-opacity: 0.3;
  align-items: center;
  justify-content: center;
`;

const StyledButtonWhite = styled(StyledButton)`
  background-color: white;
  shadow-radius: 0;
  shadow-opacity: 0.0;
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

const StyledText = styled.Text`
  font-size: 14;
  font-weight: bold;
  color: ${colors.dodgerBlue};
`;

const StyledTextWhite = styled(StyledText)`
  color: white;
`;

const StyledImageLeft = styled.Image`
  width: 24;
  height: 24;
  position: absolute;
  left: 16;
`;

type Props = {
  isWhite?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
  imgLeftSrc?: any;
  indicatorColor?: string;
  activeOpacity?: number;
  children?: any;
  width?: number;
  height?: number;
};

type State = {

};

class Button extends Component<Props, State> {
  static defaultProps: Props = {
    isWhite: false,
    isLoading: false,
    isDisabled: false,
    indicatorColor: 'white',
    activeOpacity: 0.5,
    width: 136,
    height: 60,
  };

  render() {
    if (this.props.isDisabled) {
      return (
        <StyledContainer>
          <StyledButtonDisabled>
            <StyledText>{this.props.children}</StyledText>
          </StyledButtonDisabled>
        </StyledContainer>
      );
    }
    if (this.props.isLoading) {
      return (
        <StyledContainer>
          <StyledButton>
            <ActivityIndicator size='small' color={this.props.indicatorColor} />
          </StyledButton>
        </StyledContainer>
      );
    }
    return (
      <StyledContainer>
        <TouchableOpacity
          activeOpacity={this.props.activeOpacity}
          onPress={this.props.onPress}
        >
          {
            !this.props.isWhite
              ? <StyledButton>
                {this.renderContent()}
              </StyledButton>
              : <StyledButtonWhite>
                {this.renderContent()}
              </StyledButtonWhite>
          }
        </TouchableOpacity>
      </StyledContainer>
    );
  }

  renderContent = () => {
    return <View style={{
      width: this.props.width,
      height: this.props.height,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {
        this.props.imgLeftSrc
          ? <StyledImageLeft
            source={this.props.imgLeftSrc}
          />
          : null
      }
      { this.renderText() }
    </View>;
  }

  renderText = () => {
    return (
      this.props.isWhite
        ? <StyledText>{this.props.children}</StyledText>
        : <StyledTextWhite>{this.props.children}</StyledTextWhite>
    );
  }
}

export default Button;
