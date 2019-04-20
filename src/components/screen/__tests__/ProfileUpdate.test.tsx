import 'react-native';
import * as React from 'react';
import ProfileUpdate from '../ProfileUpdate';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render, fireEvent } from 'react-native-testing-library';

describe('rendering test', () => {
  const props = {
    navigation: {
      navigate: jest.fn(),
    },
  };
  const component: React.ReactElement = <ProfileUpdate {...props} />;

  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('interaction', () => {
  let rendered: renderer.ReactTestRenderer;
  let root: renderer.ReactTestInstance;
  let testingLib: any;
  let props: any;
  let component: React.ReactElement;

  beforeAll(() => {
    rendered = renderer.create(component);
    root = rendered.root;
  });

  beforeEach(() => {
    props = {
      navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
      },
    };
    component = <ProfileUpdate {...props} />;
    testingLib = render(component);
  });

  it('should fireEvent when update button pressed', () => {
    fireEvent(testingLib.getByTestId('update_btn'), 'press');
    // expect(props.navigation.goBack).toHaveBeenCalledTimes(1);
  });

  it('should fireEvent when logout button pressed', () => {
    fireEvent(testingLib.getByTestId('logout_btn'), 'press');
    expect(props.navigation.navigate).toHaveBeenCalledWith('AuthStackNavigator');
  });

  it('should changeText when display name changed', () => {
    const inputName = testingLib.getByTestId('input_name');
    inputName.props.onTextChanged('name');
    expect(inputName.props.txt).toEqual('name');
  });

  it('should changeText when status message changed', () => {
    const inputStatus = testingLib.getByTestId('input_status');
    inputStatus.props.onTextChanged('status');
    expect(inputStatus.props.txt).toEqual('status');
  });
});
