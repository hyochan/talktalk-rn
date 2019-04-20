import 'react-native';
import * as React from 'react';
import ChatroomListItem from '../ChatroomListItem';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render, fireEvent } from 'react-native-testing-library';

const component: React.ReactElement = <ChatroomListItem />;

describe('[ChatroomListItem] rendering test', () => {
  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});
