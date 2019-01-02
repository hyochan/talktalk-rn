import 'react-native';
import * as React from 'react';
import ProfileModal from '../ProfileModal';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme';

describe('rendering test', () => {
  const wrapper = shallow(
    <ProfileModal />,
  );

  it('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
    // wrapper.setProps({ filled: false });
    // expect(wrapper).toMatchSnapshot();
  });

  // it('simulate onPress', () => {
  //   let cnt = 1;
  //   const onPress = () => {
  //     cnt++;
  //   };

  //   wrapper.setProps({ onPress: () => onPress()});
  //   expect(wrapper).toMatchSnapshot();

  //   wrapper.first().props().onPress();
  //   expect(cnt).toBe(2);
  // });
});

describe('interaction', () => {
  let wrapper;
  beforeEach(() => {
    const input = {
      open: jest.fn(),
      close: jest.fn(),
    };
    wrapper = shallow(<ProfileModal />);
    wrapper.instance().modal = input;
  });
  describe('should setUser', () => {
    it('should call setUser callback', () => {
      wrapper.instance().setUser({});
    });
    it('should call open', () => {
      wrapper.instance().open();
      expect(wrapper.instance().state.isFriendAdded).toBe(false);
      expect(wrapper.instance().state.isFriendAlreadyAdded).toBe(false);
    });
    it('should call showAddBtn', () => {
      wrapper.instance().showAddBtn(false);
      expect(wrapper.instance().state.showAddBtn).toBe(false);
      wrapper.instance().showAddBtn(true);
      expect(wrapper.instance().state.showAddBtn).toBe(true);
    });
    it('should call addFriend', () => {
      wrapper.instance().addFriend();
    });
    it('should call deleteFriend', () => {
      wrapper.instance().deleteFriend();
    });
  });
});
