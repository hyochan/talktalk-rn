// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
} from 'react-native';

import type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
  ____ImageStyleProp_Internal as ImageStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

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

type Props = {

};
type State = {

};

class Screen extends Component<Props, State> {
  static navigationOptions = {
    title: 'Title',
  };

  render() {
    return (
      <ProfileModalConsumer>
        {
          (data) => {
            return (
              <View style={styles.container}>
                <Text>Friend</Text>
                <TouchableOpacity
                  onPress={() => data.actions.showModal({})}
                >
                  <Text>show profile</Text>
                </TouchableOpacity>
              </View>
            );
          }
        }
      </ProfileModalConsumer>
    );
  }
}

export default Screen;
