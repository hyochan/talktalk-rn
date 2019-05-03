import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';

import styled, { css } from 'styled-components/native';

import moment from 'moment';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

import { Chatroom } from '../../models/Chatroom';
import { colors } from '../../utils/Styles';
import { Chat } from '../../models/Chat';
import { User } from '../../models/User';
import { BaseButton } from 'react-native-gesture-handler';

interface IStyles {
  wrapper: ViewStyle;
}

const styles: IStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    height: 80,
    borderBottomWidth: 1,
    borderColor: 'rgb(247,248,251)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});

const StyledStatus = styled.View`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${colors.greenishCyan};
  right: 0;
  bottom: 0;
  border-width: 2px;
  border-color: white;
`;

const StyledViewContent = styled.View`
  flex-direction: column;
  flex: 1;
  padding-right: 20px;
`;

const StyledViewTop = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledTextDisplayName = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: ${colors.dusk};
`;

const StyledViewCount = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background-color: rgb(80, 227, 194);
`;

const StyledTextCount = styled.Text`
  font-size: 10;
  color: white;
`;

const StyledViewBottom = styled.View`
  margin-top: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledTextMessage = styled.Text<{ lastChatCnt: number }>`
  font-size: 12px;
  color: ${colors.dusk};
  max-width: 150px;
  ${({ lastChatCnt }) => lastChatCnt ? 'font-weight: bold;' : ''}
`;

const StyledTextDate = styled.Text`
  font-size: 12px;
  color: ${colors.blueyGray};
  text-align: right;
`;

const StyledImage = styled.Image`
  width: 40px;
  height: 40px;
`

interface IProps {
  testID?: string;
  style?: ViewStyle;
  item: Chatroom;
  onPress?: () => void;
}

function Shared({
  item: {
    lastChat: {
      sender: {
        photoURL,
        isOnline,
        displayName
      },
      message,
      created
    },
    lastChatCnt
  },
  style,
  onPress
}: IProps) {
  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
      >
        <View style={style}>
          <View style={{ marginHorizontal: 20 }}>
            {photoURL
              ? <StyledImage source={{ uri: photoURL }} />
              : <Icon5 name='meh' size={40} color={colors.dusk} light/>
            }
            {isOnline
              ? <StyledStatus />
              : <View/>
            }
          </View>
          <StyledViewContent>
            <StyledViewTop>
              <StyledTextDisplayName>{displayName}</StyledTextDisplayName>
              {lastChatCnt !== 0
                ? (
                  <StyledViewContent>
                    <StyledTextCount>{lastChatCnt}</StyledTextCount>
                  </StyledViewContent>
                ) : (
                  <View/>
              )}
            </StyledViewTop>
            <StyledViewBottom>
              <StyledTextMessage
                numberOfLines={2}
                lastChatCnt={lastChatCnt}
              >
                {message}
              </StyledTextMessage>
              <StyledTextDate>
                {created
                  ? moment(created).fromNow()
                  : 'nan'
                }
              </StyledTextDate>
            </StyledViewBottom>
          </StyledViewContent>
        </View>
      </TouchableOpacity>
    </View>
  );
}

Shared.defaultProps = {
  style: styles.wrapper,
  item: new Chatroom(
    '',
    new Chat(
      '',
      new User('', '', '', ''),
      '',
    ),
  ),
};

export default Shared;
