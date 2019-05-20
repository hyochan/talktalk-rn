import React, { useReducer } from 'react';
import { AppContext } from '../contexts/AppContext';
import { ThemeType } from '../utils/theme';

interface IProps {
  children?: any;
}

interface IState {
  theme: ThemeType;
}

interface IAction {
  type: 'change-theme-mode';
  payload: IState;
}

const initialState: IState = {
  theme: ThemeType.LIGHT,
};

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'change-theme-mode':
      return {
        ...state,
        theme: action.payload.theme,
      };
    default:
      return state;
  }
};

function AppProvider(props: IProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
}

export { AppProvider };
