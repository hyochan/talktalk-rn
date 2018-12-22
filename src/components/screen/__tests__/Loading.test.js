import 'react-native';
import * as React from 'react';
import Loading from '../Loading';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme';

describe('rendering test', () => {
  const wrapper = shallow(
    <Loading />,
  );

  it('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
