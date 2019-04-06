// @flow
import React, { Component, useState, useContext } from 'react';
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
import { NavigationScreenProps } from 'react-navigation';
import { getString } from '../../../STRINGS';
import { User as Friend } from '../../models/User';
import { IC_BACK, IC_SEARCH, IC_ICON } from '../../utils/Icons';

import type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
  ____ImageStyleProp_Internal as ImageStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import { ratio, colors } from '../../utils/Styles';
import { ProfileModalContext } from '../../providers/ProfileModalProvider';
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
  navigation: NavigationScreenProps,
};
type State = {
  users: Friend[],
  searchedUsers: Friend[],
};

Screen.navigationOptions = {
  title: 'Search User',
};
function Screen(props: Props) {
  const profileModal = React.useContext(ProfileModalContext);
  const [searchedUsers, setSearchedUsers] = useState(userSampleData);
  const [users, setUsers] = useState(userSampleData);
  const scrollY = new Animated.Value(0);

  const renderItem = ({ item }: Friend) => {
    return (
      <UserListItem
        testID='userListItem'
        user={item}
        onPress={() => {
          if (profileModal && profileModal.dispatch) {
            profileModal.dispatch({
              type: 'show-modal',
              payload: { user: item, deleteMode: true },
            });
          }
        }}
      />
    );
  };
  const onTxtChanged = (txt: string) => {
    onSearch(txt);
    scrollY.setValue(0);
    Animated.timing(scrollY, {
      toValue: 100,
      duration: 500,
    }).start();
  };
  const onSearch = (txt: string) => {
    const searchedUser = (txt === '')
      ? searchedUsers
      : searchedUsers.filter((item) => item.displayName.includes(txt));
    setUsers(searchedUser);
  };
  const getContentContainerStyle = () => {
    return users.length === 0
      ? {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }
      : null;
  };
  return (
    <StyledSafeAreaView>
      <StyledContainer>
        <StyledSearchView>
          <StyledTextInputWrapper>
            <StyledTextInput
              testID="styledInput"
              onChangeText={onTxtChanged}
              underlineColorAndroid='transparent' // android fix
              autoCapitalize='none'
              autoCorrect={false}
              multiline={false}
              defaultValue={''}
            />
            <StyledSearchImage source={IC_SEARCH} />
          </StyledTextInputWrapper>
        </StyledSearchView>
        <StyledAnimatedFlatList
          testID='animatedFlatlist'
          style={{
            transform: [{
              translateY: scrollY.interpolate({
                inputRange: [0, 50, 100],
                outputRange: [0, 25, 0],
              })
            }]
          }}
          contentContainerStyle={getContentContainerStyle}
          keyExtractor={(item, index) => index.toString()}
          data={users}
          renderItem={renderItem}
          ListEmptyComponent={<EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>}
        />
      </StyledContainer>
    </StyledSafeAreaView>
  );
}

export default Screen;
