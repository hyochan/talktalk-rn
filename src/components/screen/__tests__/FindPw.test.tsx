import 'react-native';
import * as React from 'react';
import FindPw from '../FindPw';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render, fireEvent } from 'react-native-testing-library';

const props = {
  navigation: {
    navigate: jest.fn(),
  },
};
const component: React.ReactElement = <FindPw {...props}/>;

describe('[FindPw] rendering test', () => {
  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[FindPw] interaction', () => {
  let rendered: renderer.ReactTestRenderer;
  let root: renderer.ReactTestInstance;
  let testingLib: any;

  beforeAll(() => {
    rendered = renderer.create(component);
    root = rendered.root;
    testingLib = render(component);
  });

  it('should invoke changeText event handler when email changed ', () => {
    const emailInput = testingLib.getByTestId('input_email');
    emailInput.props.onTextChanged('email test');
    expect(emailInput.props.txt).toEqual('email test');
  });

  it('should call [sendLink] on button click', () => {
    const btnSendLink = testingLib.getByTestId('btnSendLink');
    fireEvent(btnSendLink, 'press');
    expect(btnSendLink.props.isLoading).toEqual(false);
    btnSendLink.props.onPress();
    expect(btnSendLink.props.isLoading).toEqual(true);
  });
});
