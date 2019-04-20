import React, { Component, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  FlatList,
} from 'react-native';
import { NavigationScreenProp, NavigationStateRoute } from 'react-navigation';

import EmptyListItem from '../shared/EmptyListItem';
import ChatroomListItem from '../shared/ChatroomListItem';
import { ratio, colors } from '../../utils/Styles';
import { getString } from '../../../STRINGS';
import { Chatroom } from '../../models/Chatroom';
import { Chat } from '../../models/Chat';
import { User } from '../../models/User';

import styled from 'styled-components/native';

const StyledContainer = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface IProps {
  navigation: any;
}

interface IState {
  rooms: Chatroom[];
}

const initRooms = [
  new Chatroom(
    '',
    new Chat(
      '',
      new User('sender_uid1', 'dooboolab', '', 'I am fine', true),
      'How are you?',
    ),
    6,
  ),
  new Chatroom(
    '',
    new Chat(
      '',
      new User('sender_uid2', 'Byun8585', '', 'hello folks', false),
      'Hi. This is student from react-native-seoul. Nice to meet you.',
    ),
    0,
  ),
];

function Screen(props: IProps, state: IState) {
  const [rooms, setRooms] = useState(initRooms);
  const onItemClick = (itemId: string) => {
    props.navigation.navigate('Chat', { chatId: itemId });
  };
  const renderItem = (item: Chatroom, index: number) => {
    return (
      <ChatroomListItem
        testID={`listitem${index}`}
        item={item}
        onPress={() => onItemClick(item.id)}
      />
    );
  };
  return (
    <StyledContainer>
      <FlatList
        style={{
          alignSelf: 'stretch',
        }}
        contentContainerStyle={
          rooms.length === 0
            ? {
              flex: 1,
              alignSelf: 'stretch',
              alignItems: 'center',
              justifyContent: 'center',
            }
            : null
        }
        keyExtractor={(item, index) => index.toString()}
        data={rooms}
        renderItem={({ item, index }) => renderItem(item, index)}
        ListEmptyComponent={<EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>}
      />
    </StyledContainer>
  );
}
export default Screen;
