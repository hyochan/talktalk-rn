import 'react-native';
import * as React from 'react';
import Login, { styles } from '../Login';
import  { getString } from '../../../../STRINGS';
import TextInput from '../../shared/TextInput';
import Button from '../../shared/Button';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render, fireEvent } from 'react-native-testing-library';

const props = {
  navigation: {
    navigate: jest.fn(),
  },
};
const component: React.Element<any> = <Login {...props}/>;

describe('[Login] rendering test', () => {
  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[Login] interaction', () => {
  let rendered: renderer.ReactTestRenderer;
  let root: renderer.ReactTestInstance;
  let testingLib: any;

  beforeAll(() => {
    rendered = renderer.create(component);
    root = rendered.root;
    testingLib = render(component);
  });

  it('should invoke changeText event handler when email changed ', () => {
    const emailInput = testingLib.getByTestId('email_input');
    emailInput.props.onTextChanged('email test');
    expect(emailInput.props.txt).toEqual('email test');
  });

  it('should invoke changeText event handler when password changed ', () => {
    const passwordInput = testingLib.getByTestId('pw_input');
    passwordInput.props.onTextChanged('pw test');
    expect(passwordInput.props.txt).toEqual('pw test');
  });

  it('should simulate when [goToSignUp] is clicked', () => {
    const buttons = root.findAllByType(Button);
    buttons[0].props.onPress();
    expect(props.navigation.navigate).toBeCalledWith('SignUp');
  });

  it('should simulate when [onLogin] is clicked', () => {
    jest.useFakeTimers();
    const buttons = root.findAllByType(Button);
    fireEvent(testingLib.getByTestId('btnLogin'), 'press');

    expect(setTimeout).toHaveBeenCalledTimes(1);
    jest.runAllTimers();
    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(buttons[0].props.isLoading).toEqual(false);
  });

  it('should simulate when [goToForgotPw] is clicked', () => {
    const findPwBtn = testingLib.getByTestId('findPw');
    fireEvent(findPwBtn, 'press');
    expect(props.navigation.navigate).toHaveBeenCalledWith('FindPw');
  });
});