// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  FlatList,
} from 'react-native';

import type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
  ____ImageStyleProp_Internal as ImageStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import EmptyListItem from '../shared/EmptyListItem';
import ChatroomListItem from '../shared/ChatroomListItem';
import { Chatroom } from '../../utils/Types';
import { ratio, colors } from '../../utils/Styles';
import { getString } from '../../../STRINGS';

type Styles = {
  container: ViewStyle,
}

const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = {
  navigation: any,
};
type State = {
  rooms: Chatroom[],
};

class Screen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      rooms: [
        {
          id: 1,
          img: null,
          displayName: 'dooboolab',
          msg: 'When are you finishing??',
          count: 6,
          date: new Date(0),
          status: true,
        },
        {
          id: 2,
          img: null,
          displayName: 'Byun8585',
          msg: 'Hi. This is student from react-native...',
          count: 0,
          date: new Date(0),
          status: false,
        },
      ],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={{
            alignSelf: 'stretch',
          }}
          contentContainerStyle={
            this.state.rooms.length === 0
              ? {
                flex: 1,
                alignSelf: 'stretch',
                alignItems: 'center',
                justifyContent: 'center',
              }
              : null
          }
          keyExtractor={(item, index) => index.toString()}
          data={this.state.rooms}
          renderItem={({ item }) => this.renderItem(item)}
          ListEmptyComponent={<EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>}
        />
      </View>
    );
  }

  renderItem = (item: Chatroom) => {
    return (
      <ChatroomListItem
        item={item}
        onPress={() => this.onItemClick(item.id)}
      />
    );
  }

  onItemClick = (itemId: string) => {
    this.props.navigation.navigate('Chat', { chatId: itemId });
  }
}

export default Screen;
