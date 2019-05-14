// @flow
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import Icon5, { FA5Style } from 'react-native-vector-icons/FontAwesome5';
import { ThemeProps, withTheme, DefaultTheme } from 'styled-components/native';
import { User as Friend } from '../../models/User';
import theme from '../../utils/theme';

const {
  colors: {
    background,
    border,
    subBorder,
    text,
  },
} = theme;

interface IStyles {
  container: ViewStyle;
  wrapper: ViewStyle;
  img: ImageStyle;
  txt: TextStyle;
  txtRight: TextStyle;
}

const styles: IStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  wrapper: {
    backgroundColor: background,
    height: 80,
    borderBottomWidth: 1,
    borderColor: border,
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
    color: text,
  },
  txtRight: {
    position: 'absolute',
    right: 20,
    fontSize: 12,
    color: text,
    maxWidth: 134.2,
    borderWidth: 0.3,
    borderColor: subBorder,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

interface IProps extends ThemeProps<DefaultTheme> {
  testID?: string;
  testObj?: any;
  style?: ViewStyle;
  user: Friend;
  onPress?: () => void;
  onLongPress?: () => void;
}

function Shared({
  onPress,
  onLongPress,
  style,
  user: {
    photoURL,
    displayName,
    statusMsg,
  },
  theme: {
    colors: {
      dusk: Dusk,
    },
  },
}: IProps) {
  const photoURLObj = typeof photoURL === 'string'
    ? { uri: photoURL }
    : photoURL;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID='press_id'
        activeOpacity={0.5}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        <View style={style}>
          {photoURL
            ? <Image style={styles.img} source={photoURLObj}/>
            : <Icon5 name='meh' size={40} color={text} light/>
          }
          <Text style={styles.txt}>{displayName}</Text>
          {statusMsg
            ? <Text style={styles.txtRight}>{statusMsg}</Text>
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
    isOnline: false,
    friends: [],
    chatrooms: [],
    created: undefined,
    updated: undefined,
  },
};
export default withTheme(Shared);
