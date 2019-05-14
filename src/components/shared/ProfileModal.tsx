import LinearGradient from 'react-native-linear-gradient';
import React, {
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  ViewStyle,
} from 'react-native';
import Modal from 'react-native-modalbox';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import styled, { ThemeProps, DefaultTheme, withTheme } from 'styled-components/native';
import { User } from '../../models/User';
import { getString } from '../../../STRINGS';

const StyledView = styled.View`
  margin-top: 40px;
`;

const StyledViewBtns = styled.View`
  height: 80px;
  align-self: stretch;
  background-color: ${({ theme }) => theme.colors.subBackground};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledViewBtnDivider = styled.View`
  width: 1px;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.subBorder};
`;

const StyledTextDisplayName = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  margin-top: 32px;
  align-self: center;
`;

const StyledTextStatusMsg = styled.Text`
  font-size: 12px;
  color: white;
  margin-top: 8px;
  align-self: center;
`;

const StyledTextBtn = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
`;

const StyledTextFriendAdded = styled.Text`
  color: white;
  font-size: 12px;
  background-color: ${({ theme: { colors: { dusk } } }) => dusk};
  padding: 4px;
`;

const StyledTextFriendAlreadyAdded = styled.Text`
  color: red;
  font-size: 12px;
  background-color: ${({ theme: { colors: { cloudyBlue } } }) => cloudyBlue};
  padding: 4px;
`;

interface IProps extends ThemeProps<DefaultTheme> {
  testID?: string;
  ref?: any;
  onChatPressed?: () => void;
}

interface IRef {
  open: () => void;
  close: () => void;
  setUser: (user: User) => void;
  showAddBtn: (show: boolean) => void;
}

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

const Shared = forwardRef<IRef, IProps>((props, ref) => {
  let modal: any;
  const [showAddBtn, setShowAddBtn] = useState(true);
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
  const {
    photoURL,
    displayName,
    statusMsg,
  } = user;
  const {
    theme: {
      colors: {
        dusk,
        dodgerBlue,
      },
    },
  } = props;
  const imageURL = typeof photoURL === 'string' ? { uri: photoURL } : photoURL;
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
        colors={[dodgerBlue, 'rgb(100,199,255)']}
      >
        <StyledView>
          <TouchableOpacity
            activeOpacity={0.5}
            // onPress={goToProfile}
          >
            {photoURL
              ? <Image
                style={{ alignSelf: 'center' }}
                source={imageURL}
              />
              : <Icon5 name='meh' size={80} color={dusk} light/>
            }
          </TouchableOpacity>
          <StyledTextDisplayName>{displayName}</StyledTextDisplayName>
          <StyledTextStatusMsg>{statusMsg}</StyledTextStatusMsg>
        </StyledView>
        {isFriendAdded
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

export default withTheme(Shared);
