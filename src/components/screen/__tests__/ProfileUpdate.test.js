import 'react-native';
import * as React from 'react';
import ProfileUpdate from '../ProfileUpdate';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme';

describe('rendering test', () => {
  const wrapper = shallow(
    <ProfileUpdate />,
  );

  it('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('interaction', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = {
      navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
      },
    };
    wrapper = shallow(<ProfileUpdate {...props} />);
  });
  describe('clicking the button', () => {
    it('should call onLogout callback', () => {
      const spy = jest.spyOn(wrapper.instance(), 'onLogout');
      const btn = wrapper.find('#logout');
      btn.props().onPress();
      expect(spy).toHaveBeenCalled();
      expect(props.navigation.navigate).toHaveBeenCalledWith('AuthStackNavigator');
    });
  });
  describe('onUpdate', () => {
    it('should navigate when onUpdate callback', () => {
      const spy = jest.spyOn(wrapper.instance(), 'onUpdate');
      const btn = wrapper.find('#update');
      btn.props().onPress();
      expect(spy).toHaveBeenCalled();
      expect(wrapper.instance().state.isUpdating).toEqual(false);
      expect(props.navigation.goBack).toHaveBeenCalledTimes(1);
    });
  });
  describe('change text', () => {
    it('should change state onTextChanged', () => {
      const instance = wrapper.instance();
      instance.onTextChanged('DISPLAY_NAME', 'my_name');
      expect(instance.state.displayName).toEqual('my_name');
      instance.onTextChanged('STATUS_MSG', 'aaaaaa');
      expect(instance.state.statusMsg).toEqual('aaaaaa');
    });
  });
  afterAll(() => {
    wrapper.instance().prototype.onLogout.mockRestore();
    wrapper.instance().prototype.onUpdate.mockRestore();
  });
});
