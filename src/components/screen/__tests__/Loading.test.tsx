import 'react-native';
import * as React from 'react';
import Loading from '../Loading';
import { ThemeProvider } from 'styled-components/native';
import { getString } from '../../../../STRINGS';
import theme from '../../../utils/theme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render, fireEvent, waitForElement } from 'react-native-testing-library';

jest.mock('Animated', () => {
  return {
    loop: jest.fn(() => {
      return {
        start: jest.fn(),
        reset: jest.fn()
      };
    }),
    timing: jest.fn(() => {
      return {
        start: jest.fn(),
      };
    }),
    Value: jest.fn(() => {
      return {
        interpolate: jest.fn(),
      };
    }),
    createAnimatedComponent: (Component) => Component,
  };
});

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
  it('renders as expected', async (done) => {
    const { toJSON } = render(component);
    const loading = await waitForElement(() => toJSON());
    expect(loading).toMatchSnapshot();
    done();
  });
});
