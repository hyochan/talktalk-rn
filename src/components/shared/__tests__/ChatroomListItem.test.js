import 'react-native';
import * as React from 'react';
import ChatroomListItem from '../ChatroomListItem';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme';

describe('rendering test', () => {
  const wrapper = shallow(
    <ChatroomListItem />,
  );

  it('should render as expected', () => {
    expect(wrapper).toMatchSnapshot();
    // wrapper.setProps({ filled: false });
    // expect(wrapper).toMatchSnapshot();
  });
});
