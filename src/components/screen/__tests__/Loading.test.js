import 'react-native';
import * as React from 'react';
import Loading from '../Loading';

import { getString } from '../../../../STRINGS';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
ipmort { render, fireEvent } from 'react-native-testing-library';

const props = {
  navigation: {
    navigate: jest.fn(),
  },
};

const component: React.Element<any> = <Loading {...props}/>;

describe('[Loading] rendering test', () => {
  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});
