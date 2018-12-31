// @flow
import React, { Component } from 'react';
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
    borderWidth: 1,
    borderColor: colors.paleGray,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

type User = {
  img: string | null;
  displayName: string;
  statusMsg: string;
};

type Props = {
  style: ViewStyle;
  user: User;
  onPress?: () => void;
  onLongPress?: () => void;
};

type State = {

};

class Shared extends Component<Props, State> {
  static defaultProps: Props = {
    style: styles.wrapper,
    user: {
      img: null,
      displayName: '',
      statusMsg: '',
    },
  };

  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={this.props.onPress}
          onLongPress={this.props.onLongPress}
        >
          <View style={this.props.style}>
            {
              this.props.user.img
                ? <Image style={styles.img} source={this.props.user.img}/>
                : <Icon5 name="meh" size={40} color={colors.dusk} light/>
            }
            <Text style={styles.txt}>{this.props.user.displayName}</Text>
            {
              this.props.user.statusMsg
                ? <Text style={styles.txtRight}>{this.props.user.statusMsg}</Text>
                : <View/>
            }
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Shared;
