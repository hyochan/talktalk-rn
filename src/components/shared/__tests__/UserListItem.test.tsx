import 'react-native';
import * as React from 'react';
import UserListItem from '../UserListItem';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render, fireEvent } from 'react-native-testing-library';

let cnt = 0;
const onPress = () => {
  cnt++;
};
const component: React.ReactElement = <UserListItem onPress={onPress}/>;

describe('[UserListItem] rendering test', () => {
  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[UserListItem] interaction', () => {
  let rendered: renderer.ReactTestRenderer;
  let testingLib: any;

  beforeAll(() => {
    rendered = renderer.create(component);
    testingLib = render(component);
  });

  it('should fireEvent when peer image is pressed', () => {
    const touchBtn = testingLib.getByTestId('press_id');
    fireEvent(touchBtn, 'press');
    expect(cnt).toEqual(1);
  });
});
