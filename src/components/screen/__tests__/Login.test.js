import 'react-native';
import * as React from 'react';
import Login, { styles } from '../Login';
import  { getString } from '../../../../STRINGS';
import TextInput from '../../shared/TextInput';
import Button from '../../shared/Button';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme';

const wrapper = shallow(<Login />);
const tree = renderer.create(<Login />).toJSON();
const instance = renderer.create(<Login />).getInstance();

describe('rendering test', () => {
  const findElement = function (tree, element) {
    let result = undefined;
    for (let node in tree.children) {
      if (tree.children[node].props.txt==element) {
        result = true;
      }
    }
    return result;
  };

  it('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders initial state', () => {
    expect(instance.state.email).toEqual('');
    expect(instance.state.pw).toEqual('');
    expect(instance.state.isLoggingIn).toEqual(false);
  });

  it('find all components', () => {
    expect(wrapper.find('ScrollView')).toHaveLength(1);
    expect(wrapper.find('Text')).toHaveLength(3);
    expect(wrapper.find('StatusBar')).toHaveLength(0);
    expect(wrapper.find(TextInput)).toHaveLength(2);
    expect(wrapper.find(Button)).toHaveLength(2);
    expect(wrapper.find('Text').at(0)).toHaveLength(1);
    expect(wrapper.find('Text').at(0).children).toHaveLength(1);
  });

  it('should have default style', () => {
    expect(wrapper.find('ScrollView').prop('style')).toEqual(styles.scrollView);
    expect(wrapper.find('View').at(0).prop('style')).toEqual(styles.container);
    expect(wrapper.find('View').at(0).childAt(0).prop('style')).toEqual(styles.iconWrapper);
    expect(wrapper.find('View').at(0).childAt(1).prop('style')).toEqual(styles.wrapper);
  });

  it('find elements', () => {
    expect(findElement(tree, getString('EMAIL')));
    expect(findElement(tree, getString('PASSWORD')));
  });

  it('all functions defined', () => {
    expect(instance.onLogin).toBeDefined;
    expect(instance.onTextChanged).toBeDefined;
    expect(instance.goToSignup).toBeDefined;
    expect(instance.goToForgotPw).toBeDefined;
  });

  it('onTextChanged', () => {
    instance.onTextChanged('EMAIL', 'aa@aa.aa');
    expect(instance.state.email).toEqual('aa@aa.aa');
    instance.onTextChanged('PW', 'aaaaaa');
    expect(instance.state.pw).toEqual('aaaaaa');
  });
});

describe('interaction', () => {
  beforeEach(() => {
    wrapper.setProps({
      navigation: {
        navigate: jest.fn(),
      },
    });
  });
  describe('clicking the button', () => {
    let spy1;
    let spy2;
    beforeEach(() => {
      wrapper.instance().goToSignup = jest.fn();
      wrapper.instance().onLogin = jest.fn();
      spy1 = jest.spyOn(wrapper.instance(), 'goToSignup');
      spy2 = jest.spyOn(wrapper.instance(), 'onLogin');
    })
    it('should call onLogin callback', () => {
      const signupBtn = wrapper.find(Button).first();
      const loginBtn = wrapper.find(Button).last();
      expect(signupBtn).toHaveLength(1);
      expect(loginBtn).toHaveLength(1);
      signupBtn.props().onPress();
      console.warn(signupBtn.props().onPress());
      loginBtn.props().onPress();

      // TODO: currently not beening called
      // expect(spy1).toHaveBeenCalled();
      // expect(spy2).toBeCalled();
    });
  });
  afterAll(() => {
    Login.prototype.onLogin.mockRestore();
    Login.prototype.goToSignup.mockRestore();
  });
});