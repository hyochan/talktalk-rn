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

import StatusBar from '../shared/StatusBar';
import UserListItem from '../shared/UserListItem';
import EmptyListItem from '../shared/EmptyListItem';

import { getString } from '../../../STRINGS';
import { ratio, colors } from '../../utils/Styles';
import { ProfileModalConsumer } from '../../providers/ProfileModalProvider';

type Styles = {
  container: ViewStyle,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Friend = {
  img: string | null;
  displayName: string;
  statusMsg: string;
}

type Props = {

};

type State = {
  friends: Friend[],
};

class Screen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      friends: [
        {
          img: null,
          displayName: 'test',
          statusMsg: 'status',
        },
      ],
    };
  }

  render() {
    return (
      <ProfileModalConsumer>
        {
          (data) => {
            return (
              <View style={styles.container}>
                <StatusBar isDarkContent={false}/>
                <FlatList
                  style={{
                    alignSelf: 'stretch',
                  }}
                  contentContainerStyle={
                    this.state.friends.length === 0
                      ? {
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }
                      : null
                  }
                  keyExtractor={(item, index) => index.toString()}
                  data={this.state.friends}
                  renderItem={({ item }) => this.renderItem(item, data)}
                  ListEmptyComponent={<EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>}
                />
              </View>
              // <View style={styles.container}>
              //   <Text>Friend</Text>
              //   <TouchableOpacity
              //     onPress={() => data.actions.showModal({})}
              //   >
              //     <Text>show profile</Text>
              //   </TouchableOpacity>
              // </View>
            );
          }
        }
      </ProfileModalConsumer>
    );
  }

  renderItem = (item: Friend, data: any) => {
    console.log('user', item);
    return (
      <UserListItem
        id='user'
        user={item}
        onPress={() => this.showProfileModal(item, data)}
      />
    );
  }

  showProfileModal = (item: Friend, data:any) => {
    data.actions.showModal(item);
  }
}

export default Screen;
