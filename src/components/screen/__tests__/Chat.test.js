import 'react-native';
import * as React from 'react';
import Chat from '../Chat';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme';

describe('rendering test', () => {
  const wrapper = shallow(
    <Chat />,
  );

  it('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('interaction', () => {
  let props
  let wrapper;
  beforeEach(() => {
    props = {
      navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
      },
    };
    wrapper = shallow(<Chat {...props} />);
  });
  it('should render chat item', () => {
    const spy = jest.spyOn(wrapper.instance(), 'renderItem');
    const item = {
      id: '0',
      sender: '0',
      img: null,
      message: 'hello',
      date: new Date(),
      isPeer: true,
    };
    wrapper.instance().renderItem({ item });
    expect(spy).toHaveBeenCalled();
  });
  it('should call sendChat', () => {
    const spy = jest.spyOn(wrapper.instance(), 'sendChat');
    wrapper.instance().sendChat();
    expect(spy).toHaveBeenCalled();
  });
  it('should call showMenu', () => {
    const spy = jest.spyOn(wrapper.instance(), 'showMenu');
    wrapper.instance().showMenu();
    expect(spy).toHaveBeenCalled();
  });
  it('should navigate when goBack is called', () => {
    const spy = jest.spyOn(wrapper.instance(), 'goBack');
    wrapper.instance().goBack();
    expect(spy).toHaveBeenCalled();
    expect(props.navigation.goBack).toHaveBeenCalled();
  });
  afterAll(() => {
    wrapper.instance().prototype.renderItem.mockRestore();
    wrapper.instance().prototype.sendChat.mockRestore();
    wrapper.instance().prototype.showMenu.mockRestore();
    wrapper.instance().prototype.goBack.mockRestore();
  });
});
