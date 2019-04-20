import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
} from 'react-native';

import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

import { Chat } from '../../models/Chat';
import { ratio, colors, screenWidth } from '../../utils/Styles';
import { User } from '../../models/User';

const StyledWrapperPeer = styled.View`
  min-height: 48;
  flexDirection: row;
  alignItems: flex-start;
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

  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
`;

const StyledTextDate = styled.Text`
  font-size: 12;
  color: ${colors.cloudyBlue},
  margin-top: 4;
  margin-right: 20;
`;

const StyledTextMessage = styled.Text`
  font-size: 14;
  color: white;
`;

interface IProps {
  item: Chat;
  prevItem?: Chat;
  onPressPeerImage?: VoidFunction;
}

const myFakeUid = '2'; // TODO: temporary

function Shared(props: IProps) {
  const isSamePeerMsg = props.prevItem && props.prevItem.sender.uid === props.item.sender.uid;
  return (
    props.item.sender.uid !== myFakeUid // peer message
      ? <StyledWrapperPeer style={{
        marginTop: isSamePeerMsg ? 0 : 20,
        marginRight: 80,
      }}>
        <View style={{ marginRight: 8 }}>
          <TouchableOpacity
            testID='peer_image'
            onPress={props.onPressPeerImage}
          >
            {
              props.item.sender.photoURL !== ''
                ? <StyledImageSender source={props.item.sender.photoURL}/>
                : isSamePeerMsg
                  ? <View style={{ width: 40 }} />
                  : <Icon5 name='meh' size={40} color={colors.dusk} light/>
            }
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column' }}>
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
            marginVertical: 4,
          }}><StyledTextPeerMessage
            >{props.item.message}</StyledTextPeerMessage>
          </View>
          <StyledTextPeerDate>
            {
              props.item.created
                ? `${moment(props.item.created).hour()} : ${moment(props.item.created).minutes()}`
                : '0 : 0'
            }
          </StyledTextPeerDate>
        </View>
      </StyledWrapperPeer>
      : <StyledWrapperMy>
        <LinearGradient
          start={{ x: 0.2, y: 0.4 }} end={{ x: 1.0, y: 0.8 }}
          locations={[0, 0.85]}
          colors={['rgb(100,152,212)', colors.dodgerBlue]}
          style={{
            marginHorizontal: 20,
            marginLeft: 8,
            padding: 12,
            borderRadius: 3,
          }}>
          <StyledTextMessage>{props.item.message}</StyledTextMessage>
        </LinearGradient>
        <StyledTextDate>
          {
            props.item.created
              ? `${moment(props.item.created).hour()} : ${moment(props.item.created).minutes()}`
              : '0 : 0'
          }
        </StyledTextDate>
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
