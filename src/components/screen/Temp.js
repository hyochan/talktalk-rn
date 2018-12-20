// @flow
import React, { Component } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  View,
  FlatList,
  InteractionManager,
} from 'react-native';

import { ratio } from '../../utils/Styles';
import {
  IC_MASK,
} from '../../utils/Icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = {
}

type State = {
}

class Page extends Component<Props, State> {
  static navigationOptions = {
    headerTitle: <Text style={{
      fontSize: 18,
    }}>Temp</Text>,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Temporary Page</Text>
      </View>
    );
  }
}

export default Page;
