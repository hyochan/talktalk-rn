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

import { Chat } from '../../models/Chat';
import { ratio, colors } from '../../utils/Styles';
import { User } from '../../models/User';

type Styles = {
  wrapperPeer: ViewStyle,
  wrapperPeerMsg: ViewStyle,
  imgPeer: ImageStyle,
  txtPeerName: TextStyle,
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

    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginRight: 8,
  },
  wrapperPeerMsg: {
    flexDirection: 'column',
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
  txtPeerName: {
    fontSize: 12,
    color: colors.dusk,
    marginBottom: 2,
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
  item: Chat,
  prevItem?: Chat,
};

const myFakeUid = '2'; // TODO: temporary
class Shared extends Component<Props> {
  static defaultProps: Props = {
    item: new Chat(
      '',
      new User('', '', '', ''),
      '',
      new Date(0),
      new Date(0),
    ),
  };

  render() {
    const isSamePeerMsg = this.props.prevItem && this.props.prevItem.sender.uid === this.props.item.sender.uid;
    return (
      this.props.item.sender.uid !== myFakeUid // peer message
        ? <View style={[
          styles.wrapperPeer,
          {
            marginTop: isSamePeerMsg ? 0 : 20,
          }
        ]}>
          <View style={{ marginRight: 8 }}>
            {
              this.props.item.sender.photoURL !== ''
                ? <Image style={styles.imgPeer} source={this.props.item.sender.photoURL}/>
                : isSamePeerMsg
                  ? <View style={{ width: 40 }} />
                  : <Icon5 name="meh" size={40} color={colors.dusk} light/>
            }
          </View>
          <View style={styles.wrapperPeerMsg}>
            {
              isSamePeerMsg
                ? <View/>
                : <Text style={styles.txtPeerName}>{this.props.item.sender.displayName}</Text>
            }
            <Text style={styles.txtPeerMsg}>{this.props.item.message}</Text>
          </View>
          <Text style={styles.txtPeerDate}>
            {`${moment(this.props.item.created).hour()} : ${moment(this.props.item.created).minutes()}`}
          </Text>
        </View>
        : <View style={styles.wrapperSelf}>
          <Text style={styles.txtMyDate}>
            {`${moment(this.props.item.created).hour()} : ${moment(this.props.item.created).minutes()}`}
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
