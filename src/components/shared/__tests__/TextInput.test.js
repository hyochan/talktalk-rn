import 'react-native';
import * as React from 'react';
import TextInput from '../TextInput';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render, fireEvent } from 'react-native-testing-library';

const component: React.Element<any> = <TextInput />;

describe('[TextInput] rendering test', () => {
  it('renders [enabled] as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});
