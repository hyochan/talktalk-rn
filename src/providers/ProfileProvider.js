import React, { createContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const ProfileContext = createContext();

export const ProfileConsumer = ProfileContext.Consumer;

export class ProfileProvider extends React.Component {
  static modal;

  state = {
    user: null,
  };

  actions = {
    setModal: (v) => {
      console.log('setModal', v);
      this.modal = v;
    },
    showModal: (user) => {
      console.log('showModal');
      this.setState({ user }, () => {
        if (this.state.profileModal) {
          console.log('openModal');
          this.modal.showAddBtn(true);
          this.modal.open();
        }
      });
    },
    onChatPressed: (navigation) => {
      if (this.modal) {
        this.modal.close();
      }
      navigation.navigate('Chat');
    }
  };

  render() {
    const { state, actions, modal } = this;
    const value = { state, actions, modal };
    return (
      <ProfileContext.Provider value={value}>
        {this.props.children}
      </ProfileContext.Provider>
    );
  }
}
