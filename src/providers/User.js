import React, { createContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const UserContext = createContext();

export const UserConsumer = UserContext.Consumer;

export class UserProvider extends React.Component {
  state = {
    displayName: 'displayName',
    age: 0,
    job: 'job',
  };

  actions = {
    setUser: (displayName?: string, age?: number, job?: string) => {
      this.setState({
        displayName,
        age,
        job,
      });
    }
  };

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
