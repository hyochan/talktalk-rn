import LinearGradient from 'react-native-linear-gradient';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  ViewStyle,
  ImageStyle,
  TextStyle,
  ImageSourcePropType,
} from 'react-native';
import Modal from 'react-native-modalbox';

import Icon5 from 'react-native-vector-icons/FontAwesome5';
import { User } from '../../models/User';
import { IC_MASK } from '../../utils/Icons';
import { ratio, colors } from '../../utils/Styles';
import { getString } from '../../../STRINGS';

type Styles = {
  modal: ViewStyle;
  wrapper: ViewStyle;
  view: ViewStyle;
  viewBtns: ViewStyle;
  viewBtnDivider: ViewStyle;
  viewBtn: ViewStyle;
  img: ImageStyle;
  txtDisplayName: TextStyle;
  txtStatusMsg: TextStyle;
  txtBtn: TextStyle;
  txtFriendAdded: TextStyle;
  txtFriendAlreadyAdded: TextStyle;
};

const styles: Styles = StyleSheet.create({
  modal: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    height: 320,

    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    height: 320,
    marginHorizontal: 20,
    alignSelf: 'stretch',

    alignItems: 'center',
    justifyContent: 'space-between',
  },
  view: {
    marginTop: 40,
  },
  viewBtns: {
    height: 80,
    alignSelf: 'stretch',
    backgroundColor: 'white',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewBtnDivider: {
    width: 1,
    height: 80,
    backgroundColor: colors.paleGray,
  },
  viewBtn: {
    width: '50%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    alignSelf: 'center',
  },
  txtDisplayName: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 32,
    alignSelf: 'center',
  },
  txtStatusMsg: {
    fontSize: 12,
    color: 'white',
    marginTop: 8,
    alignSelf: 'center',
  },
  txtBtn: {
    color: colors.dodgerBlue,
    fontSize: 16,
  },
  txtFriendAdded: {
    color: 'white',
    fontSize: 12,
    backgroundColor: colors.dusk,
    padding: 4,
  },
  txtFriendAlreadyAdded: {
    color: 'red',
    fontSize: 12,
    backgroundColor: colors.cloudyBlue,
    padding: 4,
  },
});

type Props = {
  style?: ViewStyle;
  onChatPressed?: () => void;
};

type State = {
  showAddBtn: boolean;
  isAdding: boolean;
  isFriendAdded: boolean;
  isFriendAlreadyAdded: boolean;
  user: User;
};

class Shared extends Component<Props, State> {
  static defaultProps: Props = {
    style: styles.wrapper,
  };

  modal: any;

  constructor(props) {
    super(props);
    this.state = {
      showAddBtn: true,
      isAdding: false,
      isFriendAdded: false,
      isFriendAlreadyAdded: false,
      user: new User(),
    };
  }

  render() {
    return (
      <Modal
        ref={(v) => this.modal = v}
        backdropOpacity={0.075}
        entry={'top'}
        position={'center'}
        style={styles.modal}
      >
        <LinearGradient
          style={this.props.style}
          start={{ x: 0.4, y: 0.6 }} end={{ x: 1.0, y: 0.8 }}
          locations={[0, 0.85]}
          colors={[colors.dodgerBlue, 'rgb(100,199,255)']}>
          <View style={styles.view}>
            <TouchableOpacity
              activeOpacity={0.5}
              // onPress={this.goToUpdateProfile}
            >
              {
                this.state.user.img
                  ? <Image style={styles.img} source={this.state.user.img}/>
                  : <Icon5 name="meh" size={80} color={colors.dusk} light/>
              }
            </TouchableOpacity>
            <Text style={styles.txtDisplayName}>{this.state.user.displayName}</Text>
            <Text style={styles.txtStatusMsg}>{this.state.user.statusMsg}</Text>
          </View>
          {
            this.state.isFriendAdded
              ? <Text style={styles.txtFriendAdded}>{getString('FRIEND_ADDED')}</Text>
              : this.state.isFriendAlreadyAdded
                ? <Text style={styles.txtFriendAlreadyAdded}>{getString('FRIEND_ALREADY_ADDED')}</Text>
                : null
          }
          <View style={styles.viewBtns}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={this.state.showAddBtn ? this.addFriend : this.deleteFriend}
              style={styles.viewBtn}
            >
              <View style={styles.viewBtn}>
                <Text style={styles.txtBtn}>{
                  this.state.showAddBtn ? getString('ADD_FRIEND') : getString('DELETE_FRIEND')
                }</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.viewBtnDivider}/>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={this.props.onChatPressed}
              style={styles.viewBtn}
            >
              <View style={styles.viewBtn}>
                <Text style={styles.txtBtn}>{getString('CHAT')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>
    );
  }

  setUser = (user: User) => {
    this.setState({
      user,
    });
  }

  open = () => {
    this.setState({
      isFriendAdded: false,
      isFriendAlreadyAdded: false,
    }, () => {
      this.modal.open();
    });
  }

  close = () => {
    this.modal.close();
  }

  showAddBtn = (flag: boolean) => {
    this.setState({ showAddBtn: flag });
  }

  addFriend = () => {

  }

  deleteFriend = () => {
    this.modal.close();
  }
}

export default Shared;
