import React, { createContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Friend } from '../utils/Types';
import ProfileModal from '../components/shared/ProfileModal';

const ProfileModalContext = createContext();

export const ProfileModalConsumer = ProfileModalContext.Consumer;

export class ProfileModalProvider extends React.Component {
  static modal: ProfileModal;

  state = {
    user: null,
  };

  actions = {
    setModal: (v) => {
      this.modal = v;
    },
    showModal: (user: Friend, deleteMode?: boolean) => {
      this.setState({ user }, () => {
        this.modal.setUser(user);
        if (this.modal) {
          this.modal.showAddBtn(!deleteMode);
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
      <ProfileModalContext.Provider value={value}>
        {this.props.children}
        <ProfileModal
          ref={(v) => {
            this.modal = v;
          }}
          onChatPressed={ () => this.actions.onChatPressed(this.props.navigation) }
        />
      </ProfileModalContext.Provider>
    );
  }
}
