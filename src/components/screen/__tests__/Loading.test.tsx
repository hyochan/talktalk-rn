import 'react-native';
import * as React from 'react';
import Loading from '../Loading';
import { ThemeProvider } from 'styled-components/native';
import { getString } from '../../../../STRINGS';
import theme from '../../../utils/theme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render, fireEvent } from 'react-native-testing-library';

const props = {
  navigation: {
    navigate: jest.fn(),
  },
  theme
};

const component: React.ReactElement = (
  <ThemeProvider theme={theme}>
    <Loading {...props}/>
  </ThemeProvider>
);

describe('[Loading] rendering test', () => {
  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});
