import 'react-native';
import * as React from 'react';
import Chat, { styles } from '../Chat';
import  { getString } from '../../../../STRINGS';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render, fireEvent } from 'react-native-testing-library';

const props = {
  navigation: {
    navigate: jest.fn(),
  },
};
const component: React.Element<any> = <Chat {...props}/>;

describe('[Chat] rendering test', () => {
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

  it('should invoke changeText event handler when message changed', () => {
    const textInput = testingLib.getByTestId('input_chat');
    jest.useFakeTimers();
    jest.runAllTimers();
    fireEvent.changeText(textInput, 'chat test');
    expect(textInput.props.value).toEqual('chat test');
  });

  it('should call [setShowMenu] when focused', () => {
    const textInput = testingLib.getByTestId('input_chat');
    textInput.props.onFocus();
  });

  it('should [showMenu] when touch pressed', () => {
    let touchMenu = testingLib.getByTestId('touch_menu');
    fireEvent(touchMenu, 'press');

    touchMenu = testingLib.getByTestId('touch_menu');
    fireEvent(touchMenu, 'press');
  });

  it('should call [setShowMenu] when focused', () => {
    const touchMenu = testingLib.getByTestId('touch_menu');
    fireEvent(touchMenu, 'press');
  });

  it('should [sendChat] when pressing button', () => {
    let chatBtn = testingLib.getByTestId('btn_chat');
    fireEvent(chatBtn, 'press');

    const touchMenu = testingLib.getByTestId('touch_menu');
    fireEvent(touchMenu, 'press');

    chatBtn = testingLib.getByTestId('btn_chat');
    fireEvent(chatBtn, 'press');
  });
});