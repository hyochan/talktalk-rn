import 'react-native';
import * as React from 'react';
import { ProfileModalProvider } from '../ProfileModalProvider';
import ProfileModal from '../../components/shared/ProfileModal';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { shallow, render, mount } from 'enzyme';

describe('[ProfileModalProvider] rendering test', () => {
  const wrapper = shallow(<ProfileModalProvider/>);
  it('[ProfileModalProvider] renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('[ProfileModalProvider] interaction', () => {
  let props;
  let providerWrapper;
  let modalWrapper;
  const friend = {
    uid: '2',
    displayName: 'geoseong',
    photoURL: null,
    statusMsg: 'healthy',
    isOnline: '',
    friends: '',
    Chatrooms: '',
    created: '',
    updated: '',
  };

  beforeEach(() => {
    props = {
      navigation: {
        navigate: jest.fn(),
      },
      state: {
        user: null,
      },
      actions: {
        setModal: jest.fn(),
        showModal: jest.fn(),
        onChatPressed: jest.fn(),
      }
    };
    providerWrapper = shallow(<ProfileModalProvider {...props}/>);
    modalWrapper = providerWrapper.find('#modal');
  });
  it('check actions', () => {
    modalWrapper.props().onChatPressed();
    expect(props.navigation.navigate).toHaveBeenCalled();
  });
});
