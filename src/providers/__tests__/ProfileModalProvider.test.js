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
    };
    providerWrapper = shallow(<ProfileModalProvider {...props}/>);
    modalWrapper = providerWrapper.find('#modal');
  });
  it('check actions with modal is null', () => {
    let instance = providerWrapper.instance();

    modalWrapper.props().onChatPressed();
    expect(props.navigation.navigate).toHaveBeenCalled();
    expect(instance.modal).toBeFalsy();

    instance.actions.setModal(null);
    expect(instance.modal).toEqual(null);
    expect(instance.modal).toBeFalsy();
  });

  it('check actions with modal has instance', () => {
    let instance = providerWrapper.instance();
    let modalMockFunc = {
      setUser: jest.fn(),
      open: jest.fn(),
      close: jest.fn(),
      showAddBtn: jest.fn(),
    }
    // ## got hint: 
    // - https://github.com/airbnb/enzyme/issues/361#issuecomment-397334665
    // - https://jestjs.io/docs/en/23.x/mock-functions#mocking-modules
    let modalElement = modalWrapper.getElement();
    modalElement.ref(modalMockFunc);
    expect(instance.modal).toBeTruthy();
    
    const modalSetUser = jest.spyOn(instance.modal, 'setUser');
    const modalOpened = jest.spyOn(instance.modal, 'open');
    const modalClosed = jest.spyOn(instance.modal, 'close');
    const modalShowAddBtn = jest.spyOn(instance.modal, 'showAddBtn');

    modalWrapper.props().onChatPressed();
    expect(modalClosed).toHaveBeenCalled();

    instance.actions.showModal(friend, true);
    expect(modalSetUser).toHaveBeenCalled();
    expect(modalOpened).toHaveBeenCalled();
    expect(modalShowAddBtn).toHaveBeenCalled();
    expect(instance.state.user).toEqual(friend);

    instance.actions.setModal(null);
    instance.actions.showModal(friend, true);
    expect(instance.modal).toBeFalsy();
  });
});
