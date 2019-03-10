// @flow
import React, {
  Component,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  Keyboard,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import styled from 'styled-components/native';

import { Header } from 'react-navigation';

import type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
  ____ImageStyleProp_Internal as ImageStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import ChatListItem from '../shared/ChatListItem';
import EmptyListItem from '../shared/EmptyListItem';
import Button from '../shared/Button';

import { Chatroom } from '../../models/Chatroom';
import { IC_SMILE } from '../../utils/Icons';
import { ratio, colors } from '../../utils/Styles';
import { getString } from '../../../STRINGS';
import { Chat } from '../../models/Chat';
import { User } from '../../models/User';

const StyledContainer = styled.SafeAreaView`
  flex: 1;
  background-color: white;
  flex-direction: column;
  align-items: center;
`;

const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-self: stretch;

  flex-direction: column;
  align-items: center;
`;

const StyledViewChat = styled.View`
  width: 100%;
  border-top-width: 0.5;
  border-color: rgb(225,225,225);
  background-color: white;
  min-height: 52;
  max-height: 100;

  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const StyledInputChat = styled.TextInput`
  width: 80%;
  font-size: 14;
  margin-right: 20;
  padding-left: 48;
  color: black;
`;

const StyledTouchMenu = styled.TouchableOpacity`
  position: absolute;
  left: 10;
  height: 100%;
  minWidth: 20;
  justifyContent: center;
`;

const StyledViewBottom = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const StyledViewMenu = styled.View`
  height: 258;
  background-color: green;
`;

type Styles = {
  btnSend: ViewStyle,
  txtSend: TextStyle,
};

const styles: Styles = StyleSheet.create({
  btnSend: {
    right: 8,
    backgroundColor: colors.dodgerBlue,
    borderRadius: 4,
    width: 60,
    height: 36,

    alignItems: 'center',
    justifyContent: 'center',
  },
  txtSend: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});

type Props = {
  navigation: any;
};
type State = {
  isLoading: boolean,
  showMenu: boolean,
  message: string,
  chats: Chat[],
};

function Screen(props: Props, state: State) {
  let keyboardDidShowListener: any;
  let keyboardDidHideListener: any;

  const input1 = useRef(null);
  const input2 = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([
    new Chat(
      '',
      new User(
        '0',
        'sender111',
        '',
      ),
      'hello1',
    ),
    new Chat(
      '',
      new User(
        '0',
        'sender111',
        '',
      ),
      'Hello2. This is long message. This is long message. This is long message. This is long message. This is long message. This is long message. This is long message. This is long message. This is long message. This is long message. This is long message.',
    ),
    new Chat(
      '',
      new User(
        '1',
        'sender2222',
        '',
      ),
      'hello',
    ),
    new Chat(
      '',
      new User(
        '2',
        'sender2222',
        '',
      ),
      'hello',
    ),
    new Chat(
      '',
      new User(
        '2',
        'sender2222',
        '',
      ),
      'hello. This is my long message. This is my long message. This is my long message. This is my long message. This is my long message. This is my long message. This is my long message. This is my long message. This is my long message.',
    ),
  ]);

  useEffect(() => {
    if (showMenu) {
      Keyboard.dismiss();
    } else {
      if (input1 && input1.current) {
        input1.current.focus();
      }
    }
  }, [showMenu]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', (e) => {
      console.log('keyboardHeight', e.endCoordinates.height);
    });
    return () => {
      if (keyboardDidShowListener) {
        keyboardDidShowListener.remove();
      }
    };
  });

  const renderItem = ({ item, index } : any) => {
    return (
      <ChatListItem
        prevItem={index > 0 ? chats[ index - 1 ] : null}
        item={item}
      />
    );
  };

  const sendChat = () => {
    console.log('sendChat');
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <StyledContainer>
      <StyledKeyboardAvoidingView
        keyboardVerticalOffset = {Header.HEIGHT + 24}
        behavior={Platform.select({
          'android': null,
          'ios': 'padding',
        })}
      >
        <FlatList
          style={{ alignSelf: 'stretch' }}
          contentContainerStyle={
            chats.length === 0
              ? {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }
              : null
          }
          keyExtractor={(item, index) => index.toString()}
          data={chats}
          renderItem={renderItem}
          ListEmptyComponent={<EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>}
        />
        {
          !showMenu
            ? <StyledViewChat>
              <StyledInputChat
                ref={input1}
                onFocus={() => setShowMenu(false)}
                multiline={true}
                placeholder={ getString('WRITE_MESSAGE') }
                placeholderTextColor={ colors.cloudyBlue }
                value={message}
                defaultValue={message}
                onChangeText={(text) => setMessage(text)}
              />
              <StyledTouchMenu
                onPress={() => setShowMenu(true)}
              >
                <Image style={{
                  width: 20,
                  height: 20,
                }} source={IC_SMILE}/>
              </StyledTouchMenu>
              <Button
                isLoading={isLoading}
                onPress={sendChat}
                style={styles.btnSend}
                textStyle={styles.txtSend}
              >{getString('SEND')}</Button>
            </StyledViewChat>
            : null
        }
      </StyledKeyboardAvoidingView>
      {
        showMenu
          ? <StyledViewBottom>
            <StyledViewChat>
              <StyledInputChat
                ref={input2}
                onFocus={() => setShowMenu(false)}
                multiline={true}
                placeholder={ getString('WRITE_MESSAGE') }
                placeholderTextColor={ colors.cloudyBlue }
                value={message}
                defaultValue={message}
              />
              <StyledTouchMenu
                onPress={() => setShowMenu(false)}
              >
                <Image style={{
                  width: 20,
                  height: 20,
                }} source={IC_SMILE}/>
              </StyledTouchMenu>
              <Button
                isLoading={isLoading}
                onPress={sendChat}
                style={styles.btnSend}
                textStyle={styles.txtSend}
              >{getString('SEND')}</Button>
            </StyledViewChat>
            <StyledViewMenu />
          </StyledViewBottom>
          : null
      }
    </StyledContainer>
  );
}

export default Screen;
