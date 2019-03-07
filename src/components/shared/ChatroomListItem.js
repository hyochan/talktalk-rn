// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
  ____ImageStyleProp_Internal as ImageStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import styled from 'styled-components/native';

import moment from 'moment';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

import { Chatroom } from '../../models/Chatroom';
import { colors } from '../../utils/Styles';
import { Chat } from '../../models/Chat';
import { User } from '../../models/User';
import { BaseButton } from 'react-native-gesture-handler';

type Styles = {
  container: ViewStyle,
  wrapper: ViewStyle,
  status: ViewStyle,
  imgWrapper: ViewStyle,
  img: ImageStyle,
  viewContent: ViewStyle,
  viewTop: ViewStyle,
  txtDisplayName: TextStyle,
  viewCount: ViewStyle,
  txtCount: TextStyle,
  viewBottom: ViewStyle,
  txtMsg: TextStyle,
  txtDate: TextStyle,
};

const styles: Styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    height: 80,
    borderBottomWidth: 1,
    borderColor: 'rgb(247,248,251)',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  txtMsg: {
    fontSize: 12,
    color: colors.dusk,
    maxWidth: 150,
  },
  txtDate: {
    fontSize: 12,
    color: colors.blueyGray,
    textAlign: 'right',
  },
});

const StyledWrapper = styled.View`
  background-color: white;
  height: 80;
  border-bottom-width: 1;
  border-color: rgb(247,248,251);

  flexDirection: row;
  alignItems: center;
  justifyContent: flex-start;
`;

const StyledStatus = styled.View`
  position: absolute;
  width: 12;
  height: 12;
  borderRadius: 6;
  backgroundColor: ${colors.greenishCyan};
  right: 0;
  bottom: 0;
  border-width: 2;
  border-color: white;
`;

const StyledViewContent = styled.View`
  flex-direction: column;
  flex: 1;
  padding-right: 20;
`;

const StyledViewTop = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledTextDisplayName = styled.Text`
  font-weight: bold;
  font-size: 14;
  color: ${colors.dusk};
`;

const StyledViewCount = styled.View`
  width: 16;
  height: 16;
  border-radius: 8;
  justify-content: center;
  align-items: center;
  background-color: rgb(80, 227, 194);
`;

const StyledTextCount = styled.Text`
  font-size: 10;
  color: white;
`;

const StyledViewBottom = styled.View`
  margin-top: 8;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledTextMessage = styled.Text`
  font-size: 12;
  color: ${colors.dusk};
  max-width: 150;
`;

const StyledTextDate = styled.Text`
  font-size: 12;
  color: ${colors.blueyGray};
  text-align: right;
`;

type Props = {
  style?: ViewStyle;
  item: Chatroom;
  onPress?: () => void;
};

function Shared(props: Props) {
  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={props.onPress}
      >
        <View style={props.style}>
          <View style={{
            marginHorizontal: 20,
          }}>
            {
              props.item.lastChat.sender.img
                ? <Image style={{
                  width: 40,
                  height: 40,
                }} source={props.item.img}/>
                : <Icon5 name="meh" size={40} color={colors.dusk} light/>
            }
            {
              props.item.lastChat.sender.isOnline
                ? <StyledStatus/>
                : <View/>
            }
          </View>
          <StyledViewContent>
            <StyledViewTop>
              <StyledTextDisplayName>{props.item.lastChat.sender.displayName}</StyledTextDisplayName>
              {
                props.item.lastChatCnt !== 0
                  ? <StyledViewContent>
                    <StyledTextCount>{props.item.lastChatCnt}</StyledTextCount>
                  </StyledViewContent>
                  : <View/>
              }
            </StyledViewTop>
            <StyledViewBottom>
              <Text
                numberOfLines={2}
                style={[
                  styles.txtMsg,
                  props.item.lastChatCnt !== 0 // Have unread message status
                    ? { fontWeight: 'bold' }
                    : { }
                ]}
              >{props.item.lastChat.message}</Text>
              <Text style={styles.txtDate}>{
                props.item.lastChat.created
                  ? moment(props.item.lastChat.created).fromNow()
                  : 'nan'
              }</Text>
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
