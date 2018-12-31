import 'react-native';
import * as React from 'react';
import Signup from '../Signup';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme';

describe('rendering test', () => {
  const wrapper = shallow(
    <Signup />,
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
      },
    };
    wrapper = shallow(<Signup {...props} />);
  });
  describe('clicking the button', () => {
    it('should call onRegister callback', () => {
      const spy = jest.spyOn(wrapper.instance(), 'onRegister');
      const btn = wrapper.find('#register');
      btn.props().onPress();
      expect(spy).toHaveBeenCalled();
      expect(wrapper.instance().state.isRegistering).toEqual(false);
      // wrapper.update();
      // expect(wrapper.instance().state.isRegistering).toEqual(false);
    });
  });
  describe('change text', () => {
    it('should change state onTextChanged', () => {
      const instance = wrapper.instance();
      instance.onTextChanged('EMAIL', 'aa@aa.aa');
      expect(instance.state.email).toEqual('aa@aa.aa');
      instance.onTextChanged('PW', 'aaaaaa');
      expect(instance.state.pw).toEqual('aaaaaa');
      instance.onTextChanged('NAME', 'aaaaaa');
      expect(instance.state.displayName).toEqual('aaaaaa');
      instance.onTextChanged('STATUS_MSG', 'aaaaaa');
      expect(instance.state.statusMsg).toEqual('aaaaaa');
    });
  });
  afterAll(() => {
    wrapper.instance().prototype.onRegister.mockRestore();
  });
});
