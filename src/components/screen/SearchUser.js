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
import { ProfileConsumer } from '../../providers/ProfileProvider';

type Styles = {
  container: ViewStyle,
};

const styles: Styles = StyleSheet.create({
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
      <ProfileConsumer>
        {
          (data) => {
            <View style={styles.container}>
              <Text>SearchUser</Text>
              <TouchableOpacity
                onPress={() => data.actions.showModal()}
              >
              </TouchableOpacity>
            </View>;
          }
        }
      </ProfileConsumer>
    );
  }
}

export default Screen;
