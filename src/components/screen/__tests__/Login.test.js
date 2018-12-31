import 'react-native';
import * as React from 'react';
import Login, { styles } from '../Login';
import  { getString } from '../../../../STRINGS';
import TextInput from '../../shared/TextInput';
import Button from '../../shared/Button';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme';

let props;
let wrapper;
let tree;
let instance;

describe('rendering test', () => {
  beforeEach(() => {
    props = {
      navigation: {
        navigate: jest.fn(),
      },
    };
    wrapper = shallow(<Login {...props} />);
    tree = renderer.create(<Login {...props} />).toJSON();
    instance = renderer.create(<Login {...props} />).getInstance();
  });
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
    props = {
      navigation: {
        navigate: jest.fn(),
      },
    };
    wrapper = shallow(<Login {...props} />);
    tree = renderer.create(<Login {...props} />).toJSON();
    instance = renderer.create(<Login {...props} />).getInstance();
  });
  describe('clicking the button', () => {
    it('should call onLogin callback', () => {
      const spy = jest.spyOn(wrapper.instance(), 'onLogin');
      const loginBtn = wrapper.find('#login');
      loginBtn.props().onPress();
      expect(spy).toHaveBeenCalled();
      expect(wrapper.instance().state.isLoggingIn).toEqual(false);
      // wrapper.update();
      // expect(wrapper.instance().state.isLoggingIn).toEqual(true);
      // wrapper.update();
      // expect(wrapper.instance().state.isLoggingIn).toEqual(false);
    });
    it('should call goToSignup callback', () => {
      const spy = jest.spyOn(wrapper.instance(), 'goToSignup');
      const signupBtn = wrapper.find('#signup');
      signupBtn.props().onPress();
      expect(spy).toBeCalled();
      expect(props.navigation.navigate).toHaveBeenCalledWith('Signup');
    });
    it('should call goToForgotPw callack', () => {
      const findPwBtn = wrapper.find('#find_pw');
      findPwBtn.props().onPress();
      expect(props.navigation.navigate).toHaveBeenCalledWith('FindPw');
    });
  });
  afterAll(() => {
    Login.prototype.onLogin.mockRestore();
    Login.prototype.goToSignup.mockRestore();
  });
});