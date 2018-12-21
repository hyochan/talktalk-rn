import 'react-native';
import * as React from 'react';
import Signup from '../Signup';
// import appStore from '../../../stores/appStore';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme';

describe('rendering test', () => {
  const wrapper = shallow(
    <Signup />,
    // <Signup store={appStore}/>,
  );

  it('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
