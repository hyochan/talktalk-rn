// @flow
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon5, { FA5Style } from 'react-native-vector-icons/FontAwesome5';

import type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
  ____ImageStyleProp_Internal as ImageStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import { ratio, colors } from '../../utils/Styles';
import { User as Friend } from '../../models/User';

type Styles = {
  container: ViewStyle,
  wrapper: ViewStyle,
  img: ImageStyle,
  txt: TextStyle,
  txtRight: TextStyle,
};

const styles: Styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  wrapper: {
    backgroundColor: 'white',
    height: 80,
    borderBottomWidth: 1,
    borderColor: 'rgb(245,245,245)',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  img: {
    width: 40,
    height: 40,
  },
  txt: {
    marginLeft: 12,
    width: 100,
    fontSize: 14,
    color: colors.dusk,
  },
  txtRight: {
    position: 'absolute',
    right: 20,
    fontSize: 12,
    color: colors.dusk,
    maxWidth: 134.2,
    borderWidth: 0.3,
    borderColor: colors.paleGray,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

type Props = {
  style: ViewStyle;
  user: Friend;
  onPress?: () => void;
  onLongPress?: () => void;
};

type State = {};

function Shared(props: Props, state: State) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID='press_id'
        activeOpacity={0.5}
        onPress={props.onPress}
        onLongPress={props.onLongPress}
      >
        <View style={props.style}>
          {
            props.user.photoURL
              ? <Image style={styles.img} source={props.user.photoURL}/>
              : <Icon5 name="meh" size={40} color={colors.dusk} light/>
          }
          <Text style={styles.txt}>{props.user.displayName}</Text>
          {
            props.user.statusMsg
              ? <Text style={styles.txtRight}>{props.user.statusMsg}</Text>
              : <View/>
          }
        </View>
      </TouchableOpacity>
    </View>
  );
}

Shared.defaultProps = {
  style: styles.wrapper,
  user: {
    uid: '',
    displayName: '',
    photoURL: null,
    statusMsg: '',
    isOnline: '',
    friends: '',
    Chatrooms: '',
    created: '',
    updated: '',
  },
};
export default Shared;
