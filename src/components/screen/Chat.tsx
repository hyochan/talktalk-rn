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
import { NavigationScreenProp, NavigationStateRoute } from 'react-navigation';

import styled from 'styled-components/native';

import { Header } from 'react-navigation';
import Icon5, { FA5Style } from 'react-native-vector-icons/FontAwesome5';

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
  background-color: ${colors.paleGray};
  flex-direction: row;
  flex-wrap: wrap;
`;

interface IProps {
  navigation: NavigationScreenProp<NavigationStateRoute<any>>;
}

interface IState {
  isLoading: boolean;
  showMenu: boolean;
  message: string;
  chats: Chat[];
}

function Screen(props: IProps, state: IState) {
  let keyboardShowListener: any;

  const input1 = useRef(null);
  const input2 = useRef(null);
  const [keyboardHeight, setKeyboardHeight] = useState(258);
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
      'Hello2. This is long message. This is long message. This is long message.This is long message. This is long message. This is long message. This is long message. This is long message. This is long message. This is long message. This is long message.',
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
    keyboardShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    return () => {
      if (keyboardShowListener) {
        keyboardShowListener.remove();
      }
    };
  });

  const renderItem = ({ item, index }: any) => {
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

  return (
    <StyledContainer>
      <StyledKeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + 24}
        behavior={Platform.select({
          android: null,
          ios: 'padding',
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
                testID='input_chat'
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
                testID='touch_menu'
                onPress={() => setShowMenu(true)}
              >
                <Image style={{
                  width: 20,
                  height: 20,
                }} source={IC_SMILE}/>
              </StyledTouchMenu>
              <Button
                testID='btn_chat'
                isLoading={isLoading}
                onPress={sendChat}
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
                testID='touch_menu'
                onPress={() => setShowMenu(false)}
              >
                <Image style={{
                  width: 20,
                  height: 20,
                }} source={IC_SMILE}/>
              </StyledTouchMenu>
              <Button
                testID='btn_chat'
                isLoading={isLoading}
                onPress={sendChat}
              >{getString('SEND')}</Button>
            </StyledViewChat>
            <StyledViewMenu style={{
              height: keyboardHeight,
            }}>
              <View style={{
                flexDirection: 'row',
                marginTop: 10,
              }}>
                <TouchableOpacity
                  style={{
                    marginLeft: 16,
                    marginTop: 2,
                    width: 60,
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Icon5 name='camera' size={36} color={colors.dusk} light/>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginLeft: 16,
                    marginTop: 4,
                    width: 60,
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Icon5 name='image' size={40} color={colors.dusk} light/>
                </TouchableOpacity>
              </View>
            </StyledViewMenu>
          </StyledViewBottom>
          : null
      }
    </StyledContainer>
  );
}

export default Screen;
