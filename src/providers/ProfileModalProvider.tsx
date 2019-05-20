import React, { useContext, useReducer, useRef } from 'react';
import { User as Friend } from '../models/User';
import ProfileModal from '../components/shared/ProfileModal';
import { ProfileModalContext } from '../contexts/ProfileModalContext';
import { ThemeProvider } from 'styled-components/native';
import createTheme, { ThemeType } from '../utils/theme';
import { AppContext } from '../contexts/AppContext';

interface IProps {
  navigation: any;
  children?: any;
}

interface IState {
  user: Partial<Friend>;
  deleteMode: boolean;
}

interface IAction {
  type: 'show-modal';
  payload: IState;
}

const initialState: IState = {
  user: {
    uid: '',
    displayName: '',
    photoURL: '',
    statusMsg: '',
  },
  deleteMode: false,
};

let modal: any;

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'show-modal':
      if (modal && modal.current) {
        modal.current.setUser(action.payload.user);
        modal.current.showAddBtn(!action.payload.deleteMode);
        modal.current.open();
      }
      return {
        ...state,
        user: action.payload.user,
        deleteMode: !action.payload.deleteMode,
      };
    default:
      return state;
  }
};

function ProfileModalProvider(props: IProps) {
  modal = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  const appValue = useContext(AppContext);
  return (
    <ThemeProvider theme={createTheme(appValue.state.theme)}>
      <ProfileModalContext.Provider value={value}>
        {props.children}
        <ProfileModal
          testID='modal'
          ref={modal}
          onChatPressed={() => {
            if (modal && modal.current) {
              modal.current.close();
            }
            props.navigation.navigate('Chat');
          }}
        />
      </ProfileModalContext.Provider>
    </ThemeProvider>
  );
}

export { ProfileModalContext, ProfileModalProvider };
