// @flow
import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

import type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
  ____ImageStyleProp_Internal as ImageStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import { Chat } from '../../utils/Types';
import { ratio, colors } from '../../utils/Styles';

type Styles = {
  wrapperPeer: ViewStyle,
  imgPeer: ImageStyle,
  txtPeerMsg: TextStyle,
  txtPeerDate: TextStyle,
  wrapperSelf: ViewStyle,
  txtMyDate: TextStyle,
  myGradient: ViewStyle,
  txtMyMsg: TextStyle,
};

const styles: Styles = StyleSheet.create({
  wrapperPeer: {
    minHeight: 48,
    width: '100%',
    marginTop: 20,

    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginRight: 8,
  },
  imgPeer: {
    width: 32,
    height: 32,
  },
  txtPeerMsg: {
    fontSize: 14,
    color: colors.dusk,
    marginRight: 8,
    backgroundColor: 'white',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgb(225,225,225)',
    padding: 12,
    shadowColor: colors.paleGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  txtPeerDate: {
    fontSize: 12,
    color: colors.cloudyBlue,
    marginRight: 20,
  },
  wrapperSelf: {
    minHeight: 48,
    width: '100%',
    marginTop: 20,

    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  txtMyDate: {
    fontSize: 12,
    color: colors.cloudyBlue,
    marginLeft: 20,
  },
  myGradient: {
    marginRight: 20,
    marginLeft: 8,
    borderRadius: 3,
  },
  txtMyMsg: {
    fontSize: 14,
    color: 'white',
    padding: 12,
  },
});

type Props = {
  style: ViewStyle,
  item: Chat,
};

type State = {

};

class Shared extends Component<Props, State> {
  static defaultProps: Props = {
    style: styles.wrapper,
    item: {
      id: '0',
      sender: '0',
      img: null,
      message: 'hello',
      date: new Date(),
      isPeer: true,
    },
  };

  render() {
    return (
      this.props.item.isPeer
        ? <View style={styles.wrapperPeer}>
          <View style={{ marginRight: 8 }}>
            {
              this.props.item.img
                ? <Image style={styles.img} source={this.props.item.img}/>
                : <Icon5 name="meh" size={40} color={colors.dusk} light/>
            }
          </View>
          <Text style={styles.txtPeerMsg}>{this.props.item.message}</Text>
          <Text style={styles.txtPeerDate}>
            {`${moment(this.props.item.date).hour()} : ${moment(this.props.item.date).minutes()}`}
          </Text>
        </View>
        : <View style={styles.wrapperSelf}>
          <Text style={styles.txtMyDate}>
            {`${moment(this.props.item.date).hour()} : ${moment(this.props.item.date).minutes()}`}
          </Text>
          <LinearGradient
            start={{ x: 0.2, y: 0.4 }} end={{ x: 1.0, y: 0.8 }}
            locations={[0, 0.85]}
            colors={['rgb(100,199,255)', colors.dodgerBlue]} style={styles.myGradient}>
            <Text style={styles.txtMyMsg}>{this.props.item.message}</Text>
          </LinearGradient>
        </View>
    );
  }
}

export default Shared;
