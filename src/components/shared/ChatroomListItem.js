// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

import type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
  ____ImageStyleProp_Internal as ImageStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import { Chatroom } from '../../utils/Types';
import { colors } from '../../utils/Styles';

type Styles = {
  container: ViewStyle,
  wrapper: ViewStyle,
  status: ViewStyle,
  imgWrapper: ViewStyle,
  img: ImageStyle,
  viewContent: ViewStyle,
  viewTop: ViewStyle,
  txtDisplayName: TextStyle,
  viewCount: ViewStyle,
  txtCount: TextStyle,
  viewBottom: ViewStyle,
  txtMsg: TextStyle,
  txtDate: TextStyle,
};

const styles: Styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  wrapper: {
    backgroundColor: 'white',
    height: 80,
    borderBottomWidth: 1,
    borderColor: 'rgb(247,248,251)',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  status: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.greenishCyan,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: 'white',
  },
  imgWrapper: {
    marginHorizontal: 20,
  },
  img: {
    width: 40,
    height: 40,
  },
  viewContent: {
    flexDirection: 'column',
    flex: 1,
    paddingRight: 20,
  },
  viewTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtDisplayName: {
    fontSize: 14,
    color: colors.dusk,
  },
  viewCount: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(80,227,194)',
  },
  txtCount: {
    fontSize: 10,
    color: 'white',
  },
  viewBottom: {
    marginTop: 8,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtMsg: {
    fontSize: 12,
    color: colors.dusk,
    maxWidth: 150,
  },
  txtDate: {
    fontSize: 12,
    color: colors.blueyGray,
    textAlign: 'right',
  },
});

type Props = {
  style?: ViewStyle;
  item: Chatroom;
  onPress?: () => void;
};

type State = {

};

class Shared extends Component<Props, State> {
  static defaultProps: Props = {
    style: styles.wrapper,
    item: {
      id: '',
      img: null,
      displayName: '',
      msg: '',
      count: '',
      date: null,
      status: false,
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={this.props.onPress}
        >
          <View style={this.props.style}>
            <View style={styles.imgWrapper}>
              {
                this.props.item.img
                  ? <Image style={styles.img} source={this.props.item.img}/>
                  : <Icon5 name="meh" size={40} color={colors.dusk} light/>
              }
              {
                this.props.item.status
                  ? <View style={styles.status}/>
                  : <View/>
              }
            </View>
            <View style={styles.viewContent}>
              <View style={styles.viewTop}>
                <Text style={styles.txtDisplayName}>{this.props.item.displayName}</Text>
                {
                  this.props.item.count
                    ? <View style={styles.viewCount}>
                      <Text style={styles.txtCount}>{this.props.item.count}</Text>
                    </View>
                    : <View/>
                }
              </View>
              <View style={styles.viewBottom}>
                <Text style={styles.txtMsg}>{this.props.item.msg}</Text>
                <Text style={styles.txtDate}>{moment(this.props.item.date).fromNow()}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Shared;
