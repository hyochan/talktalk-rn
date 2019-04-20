import 'react-native';
import * as React from 'react';
import StatusBar from '../StatusBar';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render, fireEvent } from 'react-native-testing-library';

const component: React.ReactElement = <StatusBar />;

describe('[UserListItem] rendering test', () => {
  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
  it('renders [isDarkContent] as expected', () => {
    const disabledComponent: React.ReactElement = <StatusBar isDarkContent={true}/>;
    const json = renderer.create(disabledComponent).toJSON();
    expect(json).toMatchSnapshot();
  });
});
