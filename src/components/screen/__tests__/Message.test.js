import 'react-native';
import * as React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme';

import Message from '../Message';
import ChatroomListItem from '../../shared/ChatroomListItem';
import { Chatroom } from '../../../models/Chatroom';
import { Chat } from '../../../models/Chat';
import { User } from '../../../models/User';

describe('rendering test', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      navigation: {
        navigate: jest.fn(),
      },
    };
    wrapper = shallow(<Message {...props} />);
  });
  it('should render as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render item', () => {
    const item = new Chatroom(
      '',
      new Chat(
        '',
        new User('sender_uid1', 'dooboolab', '', 'I am fine', true),
        'How are you?',
      ),
      6,
    );
    const rendered = wrapper.instance().renderItem(item);
    expect(wrapper.find(ChatroomListItem).last()).toHaveLength(1);
    const shallowRendered = shallow(rendered);
    shallowRendered.instance().props.onPress('aaaaaa');
  });
  it('should navigate on item click', () => {
    wrapper.instance().onItemClick('aaaaaa');
    expect(props.navigation.navigate).toHaveBeenCalledWith('Chat', {"chatId": "aaaaaa"});
  });
});
