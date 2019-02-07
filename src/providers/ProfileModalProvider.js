import React, { createContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { User as Friend } from '../models/User';
import ProfileModal from '../components/shared/ProfileModal';
import { ProfileModalContext } from './ProfileModalContext';

const ProfileModalConsumer = ProfileModalContext.Consumer;

class ProfileModalProvider extends React.Component {
  static modal: ProfileModal;

  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

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
          id="modal"
          ref={(v) => {
            this.modal = v;
          }}
          onChatPressed={ () => this.actions.onChatPressed(this.props.navigation) }
        />
      </ProfileModalContext.Provider>
    );
  }
}

export { ProfileModalConsumer, ProfileModalProvider };
