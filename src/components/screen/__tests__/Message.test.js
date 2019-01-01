import 'react-native';
import * as React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme';

import Message from '../Message';
import ChatroomListItem from '../../shared/ChatroomListItem';

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
    const item = [
      {
        id: 1,
        img: null,
        displayName: 'dooboolab',
        msg: 'When are you finishing??',
        count: 6,
        date: new Date(),
        status: true,
      },
      {
        id: 2,
        img: null,
        displayName: 'Byun8585',
        msg: 'Hi. This is student from react-native...',
        count: 0,
        date: new Date(),
        status: false,
      },
    ];
    const rendered = wrapper.instance().renderItem(item);
    expect(wrapper.find(ChatroomListItem).last()).toHaveLength(1);
  });
  it('should navigate on item click', () => {
    wrapper.instance().onItemClick('aaaaaa');
    expect(props.navigation.navigate).toHaveBeenCalledWith('Chat', {"chatId": "aaaaaa"});
  });
});
