import React, { createContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ProfileModal from '../components/shared/ProfileModal';

const ProfileModalContext = createContext();

export const ProfileModalConsumer = ProfileModalContext.Consumer;

export class ProfileModalProvider extends React.Component {
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
        if (this.modal) {
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
      <ProfileModalContext.Provider value={value}>
        {this.props.children}
        <ProfileModal
          ref={(v) => {
            console.log('v', v);
            this.modal = v;
          }}
          onChatPressed={ () => this.actions.onChatPressed(this.props.navigation) }
        />
      </ProfileModalContext.Provider>
    );
  }
}
