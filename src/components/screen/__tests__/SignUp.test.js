import 'react-native';
import * as React from 'react';
import SignUp from '../SignUp';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render, fireEvent } from 'react-native-testing-library';

const props = {
  navigation: {
    navigate: jest.fn(),
  },
};
const component: React.Element<any> = <SignUp {...props}/>;

describe('[SignUp] rendering test', () => {
  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[SignUp] interaction', () => {
  let rendered: renderer.ReactTestRenderer;
  let root: renderer.ReactTestInstance;
  let testingLib: any;

  beforeAll(() => {
    rendered = renderer.create(component);
    root = rendered.root;
    testingLib = render(component);
  });

  it('should changeText when email changed', () => {
    const emailInput = testingLib.getByTestId('email_input');
    emailInput.props.onTextChanged('email test');
    expect(emailInput.props.txt).toEqual('email test');
  });

  it('should changeText when password changed', () => {
    const passwordInput = testingLib.getByTestId('pw_input');
    passwordInput.props.onTextChanged('pw test');
    expect(passwordInput.props.txt).toEqual('pw test');
  });

  it('should changeText when name changed', () => {
    const nameInput = testingLib.getByTestId('name_input');
    nameInput.props.onTextChanged('name test');
    expect(nameInput.props.txt).toEqual('name test');
  });

  it('should changeText when status changed', () => {
    const statusInput = testingLib.getByTestId('status_input');
    statusInput.props.onTextChanged('status test');
    expect(statusInput.props.txt).toEqual('status test');
  })

  it('should simulate when [onRegister] clicked', () => {
    const registerBtn = testingLib.getByTestId('register');
    fireEvent(registerBtn, 'press');
    expect(registerBtn.props.isLoading).toEqual(false);
    registerBtn.props.onPress();
    expect(registerBtn.props.isLoading).toEqual(true);
  });
});
