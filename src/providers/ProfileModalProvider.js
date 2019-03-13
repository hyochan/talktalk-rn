import React, { Component, useReducer, useState, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { User as Friend } from '../models/User';
import ProfileModal from '../components/shared/ProfileModal';
import { ProfileModalContext } from '../contexts/ProfileModalContext';

const ProfileModalConsumer = ProfileModalContext.Consumer;

type Props = {
  navigation: NavigationScreenProps,
};

type State = {
  user: Friend[],
};

const initialState: State = {
  user: {
    displayName: '',
    age: 0,
    job: '',
  },
};

let modal: any;

const reducer = (state, action) => {
  switch (action.type) {
    case 'show-modal':
      if (modal && modal.current) {
        modal.current.setUser(action.payload.user);
        modal.current.showAddBtn(!action.payload.deleteMode);
        modal.current.open();
      }
      return {
        ...state,
        user: action.payload.user,
        deleteMode: !action.payload.deleteMode,
      };
  }
};

function ProfileModalProvider(props: Props) {
  modal = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <ProfileModalContext.Provider value={value}>
      {props.children}
      <ProfileModal
        testID="modal"
        ref={modal}
        onChatPressed={() => {
          if (modal && modal.current) {
            modal.current.close();
          }
          props.navigation.navigate('Chat');
        }}
      />
    </ProfileModalContext.Provider>
  );
}

export { ProfileModalConsumer, ProfileModalContext, ProfileModalProvider };
