import 'react-native';
import * as React from 'react';
import Signup from '../Signup';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme';

describe('rendering test', () => {
  const wrapper = shallow(
    <Signup />,
  );

  it('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
