import 'react-native';
import * as React from 'react';
import FindPw from '../FindPw';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme';

describe('rendering test', () => {
  const wrapper = shallow(
    <FindPw />,
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
    wrapper = shallow(<FindPw {...props} />);
  });
  describe('clicking the button', () => {
    it('should call onSendLink callback', () => {
      const spy = jest.spyOn(wrapper.instance(), 'onSendLink');
      const btn = wrapper.find('#send_link');
      btn.props().onPress();
      expect(spy).toHaveBeenCalled();
    });
  });
  describe('goBack', () => {
    it('should navigate when goBack callback', () => {
      const instance = wrapper.instance();
      instance.goBack();
      expect(props.navigation.goBack).toHaveBeenCalledTimes(1);
    });
  });
  describe('change text', () => {
    it('should change state onTextChanged', () => {
      const instance = wrapper.instance();
      instance.onTextChanged('EMAIL', 'aa@aa.aa');
      expect(instance.state.email).toEqual('aa@aa.aa');
    });
  });
  afterAll(() => {
    wrapper.instance().prototype.onSendLink.mockRestore();
  });
});
