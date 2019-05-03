import 'react-native';
import * as React from 'react';
import StatusBar from '../StatusBar';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../../utils/theme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render, fireEvent } from 'react-native-testing-library';

const props = {
  isDarkContent: false,
  theme
}

const component: React.ReactElement = (
  <ThemeProvider theme={theme}>
    <StatusBar {...props} />
  </ThemeProvider>
);

describe('[UserListItem] rendering test', () => {
  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
  it('renders [isDarkContent] as expected', () => {
    const disabledComponent: React.ReactElement = (
      <ThemeProvider theme={theme}>
        <StatusBar {...props} />
      </ThemeProvider>
    );
    const json = renderer.create(disabledComponent).toJSON();
    expect(json).toMatchSnapshot();
  });
});
