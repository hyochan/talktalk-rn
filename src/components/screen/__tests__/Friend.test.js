import 'react-native';
import * as React from 'react';
import Friend from '../Friend';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render, fireEvent } from 'react-native-testing-library';

const props = {
  navigation: {
    navigate: jest.fn(),
  },
};
const component: React.Element<any> = <Friend {...props}/>;

describe('[Friend] rendering test', () => {
  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[Friend] interaction', () => {
  let rendered: renderer.ReactTestRenderer;
  let root: renderer.ReactTestInstance;
  let testingLib: any;

  beforeAll(() => {
    rendered = renderer.create(component);
    root = rendered.root;
    testingLib = render(component);
  });

  it('should dispatch [show-modal] when user is pressed', () => {
    const user = testingLib.getByTestId('user');
    fireEvent(user, 'press');
  });
});
