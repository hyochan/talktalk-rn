import 'react-native';
import * as React from 'react';
import { ProfileModalProvider, ProfileModalContext } from '../ProfileModalProvider';
import ProfileModal from '../../components/shared/ProfileModal';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render, fireEvent } from 'react-native-testing-library';

const props = {
  navigation: {
    navigate: jest.fn(),
  },
};

describe('[ProfileModalProvider] rendering test', () => {
  let json: renderer.ReactTestRendererJSON;
  const component: React.ReactElement = <ProfileModalProvider { ...props } />;

  it('component and snapshot matches', () => {
    json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[ProfileModalProvider] interactions', () => {
  const component = <ProfileModalProvider { ...props } />;
  let rendered: renderer.ReactTestRenderer;
  let testingLib: any;

  beforeAll(() => {
    rendered = renderer.create(component);
    testingLib = render(component);
  });

  it('should find [ProfileModal] and navigate [onChatPressed]', () => {
    const profileModal = testingLib.getByTestId('modal');
    expect(profileModal).toBeDefined();

    profileModal.props.onChatPressed();
    expect(props.navigation.navigate).toHaveBeenCalledWith('Chat');
  });
});
