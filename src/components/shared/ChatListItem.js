// @flow
import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';

import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

import type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
  ____ImageStyleProp_Internal as ImageStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import { Chat } from '../../models/Chat';
import { ratio, colors } from '../../utils/Styles';
import { User } from '../../models/User';

const StyledWrapperPeer = styled.View`
  min-height: 48;
  width: 100%;
  flexDirection: row;
  alignItems: flex-end;
  justifyContent: flex-start;
  margin-left: 20;
  margin-right: 8;
`;

const StyledImageSender = styled.Image`
  width: 32;
  height: 32;
`;

const StyledTextPeerMessage = styled.Text`
  font-size: 14;
  color: ${colors.dusk};
`;

const StyledTextPeerName = styled.Text`
  font-size: 12;
  color: ${colors.dusk};
  margin-bottom: 2;
`;

const StyledTextPeerDate = styled.Text`
  font-size: 12;
  color: ${colors.cloudyBlue};
  margin-right: 20;
`;

const StyledWrapperMy = styled.View`
  min-height: 48;
  width: 100%;
  margin-top: 20;

  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
`;

const StyledTextDate = styled.Text`
  font-size: 12;
  color: ${colors.cloudyBlue},
  margin-left: 20;
`;

const StyledTextMessage = styled.Text`
  font-size: 14;
  color: white;
`;

type Props = {
  item: Chat,
  prevItem?: Chat,
};

const myFakeUid = '2'; // TODO: temporary

function Shared(props: Props) {
  const isSamePeerMsg = props.prevItem && props.prevItem.sender.uid === props.item.sender.uid;
  return (
    props.item.sender.uid !== myFakeUid // peer message
    ? <StyledWrapperPeer style={{
      marginTop: isSamePeerMsg ? 0 : 20,
    }}>
      <View style={{ marginRight: 8 }}>
        {
          props.item.sender.photoURL !== ''
            ? <StyledImageSender source={props.item.sender.photoURL}/>
            : isSamePeerMsg
              ? <View style={{ width: 40 }} />
              : <Icon5 name="meh" size={40} color={colors.dusk} light/>
        }
      </View>
      <View style={{flexDirection: 'column' }}>
        {
          isSamePeerMsg
            ? <View/>
            : <StyledTextPeerName>{props.item.sender.displayName}</StyledTextPeerName>
        }
        <View style={{
          marginRight: 8,
          backgroundColor: 'white',
          borderRadius: 3,
          borderWidth: 1,
          borderColor: 'rgb(225,225,225)',
          padding: 12,
          shadowColor: colors.paleGray,
          shadowOffset: {
            width: 0,
            height: 2,
          },
        }}><StyledTextPeerMessage
          >{props.item.message}</StyledTextPeerMessage>
        </View>
      </View>
      <StyledTextPeerDate>
        {
          props.item.created
            ? `${moment(props.item.created).hour()} : ${moment(props.item.created).minutes()}`
            : '0 : 0'
        }
      </StyledTextPeerDate>
    </StyledWrapperPeer>
    : <StyledWrapperMy>
     <StyledTextDate>
        {
          props.item.created
            ? `${moment(props.item.created).hour()} : ${moment(props.item.created).minutes()}`
            : '0 : 0'
        }
      </StyledTextDate>
      <LinearGradient
        start={{ x: 0.2, y: 0.4 }} end={{ x: 1.0, y: 0.8 }}
        locations={[0, 0.85]}
        colors={['rgb(100,199,255)', colors.dodgerBlue]}
        style={{
          marginHorizontal: 20,
          marginLeft: 8,
          borderRadius: 3,
          padding: 12,
          borderRadius: 1,
          borderRadius: 3,
        }}>
        <StyledTextMessage>hello</StyledTextMessage>
      </LinearGradient>
    </StyledWrapperMy>
  );
}

Shared.defaultProps = {
  item: new Chat(
    '',
    new User('', '', '', ''),
    '',
  ),
};

export default Shared;
