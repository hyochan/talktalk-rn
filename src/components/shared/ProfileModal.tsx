import LinearGradient from 'react-native-linear-gradient';
import React, {
  Component,
  useState,
  useImperativeHandle,
  forwardRef,
  Ref,
  RefObject,
} from 'react';
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
import styled from 'styled-components/native';

import { User } from '../../models/User';
import { IC_MASK } from '../../utils/Icons';
import { ratio, colors } from '../../utils/Styles';
import { getString } from '../../../STRINGS';

const StyledView = styled.View`
  marginTop: 40;
`;

const StyledViewBtns = styled.View`
  height: 80;
  align-self: stretch;
  background-color: white;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledViewBtnDivider = styled.View`
  width: 1;
  height: 80;
  background-color: ${colors.paleGray};
`;

const StyledTextDisplayName = styled.Text`
  font-size: 24;
  color: white;
  font-weight: bold;
  margin-top: 32;
  align-self: center;
`;

const StyledTextStatusMsg = styled.Text`
  font-size: 12;
  color: white;
  margin-top: 8;
  align-self: center;
`;

const StyledTextBtn = styled.Text`
  color: ${colors.dodgerBlue};
  font-size: 16;
`;

const StyledTextFriendAdded = styled.Text`
  color: white;
  font-size: 12;
  backround-color: ${colors.dusk};
  padding: 4;
`;

const StyledTextFriendAlreadyAdded = styled.Text`
  color: red;
  font-size: 12;
  background-color: ${colors.cloudyBlue};
  padding: 4;
`;

interface IProps {
  testID?: string;
  ref?: any;
  onChatPressed?: () => void;
}

// interface IRef extends RefObject<{}> {
//   open: () => void;
//   close: () => void;
//   addFriend: () => void;
//   deleteFriend: () => void;
// }

interface IStyles {
  wrapper: ViewStyle;
  viewBtn: ViewStyle;
}

const styles: IStyles = {
  wrapper: {
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    height: 320,
    width: '90%',

    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBtn: {
    width: '50%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const Shared = forwardRef<T, IProps>((props, ref) => {
  let modal: any;
  const [showAddBtn, setShowAddBtn] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isFriendAdded, setIsFriendAdded] = useState(false);
  const [isFriendAlreadyAdded, setIsFriendAlreadyAdded] = useState(false);
  const [user, setUser] = useState(new User());

  const open = () => {
    setIsFriendAdded(false);
    setIsFriendAlreadyAdded(false);
    if (modal) {
      modal.open();
    }
  };

  const close = () => {
    if (modal) {
      modal.close();
    }
  };

  const addFriend = () => {

  };

  const deleteFriend = () => {
    if (modal) {
      modal.close();
    }
  };

  useImperativeHandle(ref, () => ({
    open,
    close,
    setUser: (newUser: User) => {
      setUser(newUser);
    },
    showAddBtn: (flag: boolean) => {
      setShowAddBtn(flag);
    },
  }));

  return (
    <Modal
      ref={(v: any) => modal = v}
      backdropOpacity={0.075}
      entry={'top'}
      position={'center'}
      style={styles.wrapper}
    >
      <LinearGradient
        style={{
          height: 320,
          marginHorizontal: 20,
          alignSelf: 'stretch',

          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        start={{ x: 0.4, y: 0.6 }} end={{ x: 1.0, y: 0.8 }}
        locations={[0, 0.85]}
        colors={[colors.dodgerBlue, 'rgb(100,199,255)']}
      >
        <StyledView>
          <TouchableOpacity
            activeOpacity={0.5}
            // onPress={goToProfile}
          >
            {
              user.photoURL
                ? <Image style={{
                  alignSelf: 'center',
                }} source={{uri: user.photoURL}} />
                : <Icon5 name='meh' size={80} color={colors.dusk} light/>
            }
          </TouchableOpacity>
          <StyledTextDisplayName>{user.displayName}</StyledTextDisplayName>
          <StyledTextStatusMsg>{user.statusMsg}</StyledTextStatusMsg>
        </StyledView>
        {
          isFriendAdded
            ? <StyledTextFriendAdded>{getString('FRIEND_ADDED')}</StyledTextFriendAdded>
            : isFriendAlreadyAdded
              ? <StyledTextFriendAlreadyAdded>{getString('FRIEND_ALREADY_ADDED')}</StyledTextFriendAlreadyAdded>
              : null
        }
        <StyledViewBtns>
          <TouchableOpacity
            testID='btn-add-or-delete'
            activeOpacity={0.5}
            onPress={showAddBtn ? addFriend : deleteFriend}
            style={styles.viewBtn}
          >
            <View style={styles.viewBtn}>
              <StyledTextBtn>{
                showAddBtn ? getString('ADD_FRIEND') : getString('DELETE_FRIEND')
              }</StyledTextBtn>
            </View>
          </TouchableOpacity>
          <StyledViewBtnDivider />
          <TouchableOpacity
            testID='btn-chat'
            activeOpacity={0.5}
            onPress={props.onChatPressed}
            style={styles.viewBtn}
          >
            <View style={styles.viewBtn}>
              <StyledTextBtn>{getString('CHAT')}</StyledTextBtn>
            </View>
          </TouchableOpacity>
        </StyledViewBtns>
      </LinearGradient>
    </Modal>
  );
});

export default Shared;
