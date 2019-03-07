import 'react-native';
import * as React from 'react';
import ChatListItem from '../ChatListItem';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render, fireEvent } from 'react-native-testing-library';

let cnt = 0;
const onPress = () => {
  cnt++;
};
const component: React.Element<any> = <ChatListItem onPressPeerImage={onPress}/>;

describe('[ChatListItem] rendering test', () => {
  it('renders [peerMessage] as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[ChatListItem] interaction', () => {
  let rendered: renderer.ReactTestRenderer;
  let root: renderer.ReactTestInstance;
  let testingLib: any;

  beforeAll(() => {
    rendered = renderer.create(component);
    root = rendered.root;
    testingLib = render(component);
  });

  it('should fireEvent when peer image is pressed', () => {
    const touchPeerImage = testingLib.getByTestId('peer_image');
    fireEvent(touchPeerImage, 'press');
    expect(cnt).toEqual(1);
  });
});
