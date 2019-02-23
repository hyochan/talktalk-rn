// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  TextInput,
  Animated,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { getString } from '../../../STRINGS';
import { User as Friend } from '../../models/User';
import { IC_BACK, IC_SEARCH, IC_ICON } from '../../utils/Icons';

import type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
  ____ImageStyleProp_Internal as ImageStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import { ratio, colors } from '../../utils/Styles';
import { ProfileModalConsumer } from '../../providers/ProfileModalProvider';
import EmptyListItem from '../shared/EmptyListItem';
import UserListItem from '../shared/UserListItem';

import styled from 'styled-components/native';

const userSampleData = [
  {
    uid: '1', displayName: 'test', photoURL: null, statusMsg: 'status', isOnline: '', friends: '', Chatrooms: '', created: '', updated: '',
  },
  {
    uid: '2', displayName: 'geoseong', photoURL: IC_BACK, statusMsg: 'healthy', isOnline: '', friends: '', Chatrooms: '', created: '', updated: '',
  },
  {
    uid: '3', displayName: 'hyochan', photoURL: IC_ICON, statusMsg: 'healthy', isOnline: '', friends: '', Chatrooms: '', created: '', updated: '',
  },
  {
    uid: '4', displayName: 'test', photoURL: null, statusMsg: 'status', isOnline: '', friends: '', Chatrooms: '', created: '', updated: '',
  },
  {
    uid: '5', displayName: 'geoseong', photoURL: IC_BACK, statusMsg: 'healthy', isOnline: '', friends: '', Chatrooms: '', created: '', updated: '',
  },
  {
    uid: '6', displayName: 'hyochan', photoURL: IC_ICON, statusMsg: 'healthy', isOnline: '', friends: '', Chatrooms: '', created: '', updated: '',
  },
  {
    uid: '7', displayName: 'test', photoURL: null, statusMsg: 'status', isOnline: '', friends: '', Chatrooms: '', created: '', updated: '',
  },
  {
    uid: '8', displayName: 'geoseong', photoURL: IC_BACK, statusMsg: 'healthy', isOnline: '', friends: '', Chatrooms: '', created: '', updated: '',
  },
  {
    uid: '9', displayName: 'hyochan', photoURL: IC_ICON, statusMsg: 'healthy', isOnline: '', friends: '', Chatrooms: '', created: '', updated: '',
  },
];
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;
const StyledContainer = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StyledSearchView = styled.View`
  width: 100%;
  height: 50;
  justify-content: center;
  overflow: hidden;
`;
const StyledAnimatedFlatList = styled(AnimatedFlatList)`
  width: 100%;
  height: 100%;
`;
const StyledTextInputWrapper = styled.View`
  width: 100%;
  height: 50;
  position: absolute;
  padding-horizontal: 20;
`;
const StyledTextInput = styled.TextInput`
  width: 100%;
  height: 30;
  top: 10;
  background-color: rgb(247,248,251);
  border-radius: 4;
  padding-left: 34;
  padding-right: 10;
`;
const StyledSearchImage = styled.Image`
  width: 16;
  height: 16;
  position: absolute;
  top: 18;
  left: 30;
`;

type Props = {

};
type State = {
  users: Friend[],
  searchedUsers: Friend[],
};

class Screen extends Component<Props, State> {
  static navigationOptions = {
    title: 'Search User',
  };

  scrollY = new Animated.Value(0);
  constructor(props: Props) {
    super(props);
    this.state = {
      searchedUsers: userSampleData,
      users: userSampleData,
    };
  }

  renderItem = (item: Friend, data: any) => {
    return (
      <UserListItem
        id='user'
        user={item}
        onPress={() => this.showProfileModal(item, data)}
      />
    );
  }
  showProfileModal = (item: Friend, data: any) => {
    data.actions.showModal(item, true);
  }
  onTxtChanged = (txt: string) => {
    this.onSearch(txt);
    this.scrollY.setValue(0);
    Animated.timing(this.scrollY, {
      toValue: 100,
      duration: 500,
    }).start();
  }
  onSearch = (txt: string) => {
    const searchedUser = (txt === '')
      ? this.state.searchedUsers
      : this.state.searchedUsers.filter((item) => item.displayName.includes(txt));
    this.setState({ users: searchedUser });
  }
  getContentContainerStyle = () => {
    return this.state.users.length === 0
      ? {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }
      : null;
  }
  render() {
    return (
      <ProfileModalConsumer>
        { (data) => {
          return (
            <StyledSafeAreaView>
              <StyledContainer>
                <StyledSearchView>
                  <StyledTextInputWrapper>
                    <StyledTextInput
                      id="styledInput"
                      onChangeText={(text) => this.onTxtChanged(text)}
                      underlineColorAndroid='transparent' // android fix
                      autoCapitalize='none'
                      autoCorrect={false}
                      multiline={false}
                      // value={this.searchTxt}
                      defaultValue={''}
                    />
                    <StyledSearchImage source={IC_SEARCH} />
                  </StyledTextInputWrapper>
                </StyledSearchView>
                <StyledAnimatedFlatList
                  id='animatedFlatlist'
                  style={{
                    transform: [{
                      translateY: this.scrollY.interpolate({
                        inputRange: [0, 50, 100],
                        outputRange: [0, 25, 0],
                      })
                    }]
                  }}
                  contentContainerStyle={this.getContentContainerStyle}
                  keyExtractor={(item, index) => index.toString()}
                  data={this.state.users}
                  renderItem={({ item }) => this.renderItem(item, data)}
                  ListEmptyComponent={<EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>}
                />
              </StyledContainer>
            </StyledSafeAreaView>
          );
        }}
      </ProfileModalConsumer>
    );
  }
}

export default Screen;
