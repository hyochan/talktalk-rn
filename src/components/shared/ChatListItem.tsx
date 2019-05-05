import React, { FC } from 'react';
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

import styled, { ThemeProps, DefaultTheme, withTheme } from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import { Chat } from '../../models/Chat';
import { User } from '../../models/User';

const StyledWrapperPeer = styled.View<{ isSame: boolean }>`
  min-height: 48px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 20px;
  margin-right: 8px;
  margin-top: ${({ isSame }) => isSame ? 0 : 20}px;
`;

const StyledImageSender = styled.Image`
  width: 32;
  height: 32;
`;

const StyledTextPeerMessageContainer = styled.View`
  margin-right: 8px;
  background-color: white;
  border-radius: 3px;
  border-width: 1px;
  border-color: rgb(225,225,225);
  padding: 12px;
  shadow-color: ${({ theme: { colors: { paleGray }}}) => paleGray};
  shadow-offset: 0 2px;
  margin-vertical: 4px;
`;

const StyledTextPeerMessage = styled.Text`
  font-size: 14px;
  color: ${({ theme: { colors: { dusk }}}) => dusk};
`;

const StyledTextPeerName = styled.Text`
  font-size: 12px;
  color: ${({ theme: { colors: { dusk }}}) => dusk};
  margin-bottom: 2px;
`;

const StyledTextPeerDate = styled.Text`
  font-size: 12px;
  color: ${({ theme: { colors: { cloudyBlue }}}) => cloudyBlue};
  margin-right: 20px;
`;

const StyledWrapperMy = styled.View`
  min-height: 48px;
  width: 100%;
  margin-top: 20px;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
`;

const StyledTextDate = styled.Text`
  font-size: 12;
  color: ${({ theme: { colors: { cloudyBlue }}}) => cloudyBlue};
  margin-top: 4;
  margin-right: 20;
`;

const StyledTextMessage = styled.Text`
  font-size: 14;
  color: white;
`;

const StyledLinearGradient = styled(LinearGradient)`
  margin-horizontal: 20px;
  margin-left: 8px;
  padding: 12px;
  border-radius: 3px;
`;

interface IProps extends ThemeProps<DefaultTheme> {
  item: Chat;
  prevItem?: Chat;
  onPressPeerImage?: VoidFunction;
}

interface IImageSenderProps {
  photoURL?: string;
  isSamePeerMsg: boolean;
  dusk: string;
}

const myFakeUid = '2'; // TODO: temporary

const ImageSenderComp: FC<IImageSenderProps> = ({ photoURL, isSamePeerMsg, dusk }) => {
  if (photoURL !== '') {
    return <StyledImageSender source={{ uri: photoURL }} />
  } else if (isSamePeerMsg) {
    return <View style={{ width: 40 }} />
  }
  return <Icon5 name='meh' size={40} color={dusk} light />
}

function Shared({
  item: {
    sender: { 
      uid,
      displayName,
      photoURL
    },
    message,
    created
  },
  prevItem,
  onPressPeerImage,
  theme: { 
    colors: { 
      dusk,
      dodgerBlue
    }
  }
}: IProps) {
  const isSamePeerMsg = prevItem && prevItem.sender.uid === uid;
  if (uid !== myFakeUid) {  // peer message
    return (
      <StyledWrapperPeer isSame={isSamePeerMsg}>
        <View style={{ marginRight: 8 }}>
          <TouchableOpacity
            testID='peer_image'
            onPress={onPressPeerImage}
          >
            <ImageSenderComp
              photoURL={photoURL}
              isSamePeerMsg={isSamePeerMsg}
              dusk={dusk}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column' }}>
          {isSamePeerMsg
            ? <View/>
            : <StyledTextPeerName>{displayName}</StyledTextPeerName>
          }
          <StyledTextPeerMessageContainer>
            <StyledTextPeerMessage>{message}</StyledTextPeerMessage>
          </StyledTextPeerMessageContainer>
          <StyledTextPeerDate>
            {created
              ? `${moment(created).hour()} : ${moment(created).minutes()}`
              : '0 : 0'
            }
          </StyledTextPeerDate>
        </View>
      </StyledWrapperPeer>
    );
  }
  return (
    <StyledWrapperMy>
      <StyledLinearGradient
        start={{ x: 0.2, y: 0.4 }}
        end={{ x: 1.0, y: 0.8 }}
        locations={[0, 0.85]}
        colors={['rgb(100,152,212)', dodgerBlue]}
      >
        <StyledTextMessage>{message}</StyledTextMessage>
      </StyledLinearGradient>
      <StyledTextDate>
        {created
          ? `${moment(created).hour()} : ${moment(created).minutes()}`
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

export default withTheme(Shared);
