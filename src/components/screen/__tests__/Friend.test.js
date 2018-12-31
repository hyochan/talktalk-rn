import 'react-native';
import * as React from 'react';
import Friend from '../Friend';
import UserListItem from '../../shared/UserListItem';
import EmptyListItem from '../../shared/EmptyListItem';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme';

describe('rendering test', () => {
  const wrapper = shallow(<Friend />);

  it('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('context', () => {
  let outer;
  let props;
  let wrapper;
  let context;

  beforeEach(() => {
    context = {
      state: {
        user: null,
      },
      actions: {
        setModal: jest.fn(),
        showModal: jest.fn(),
        onChatPressed: jest.fn(),
      }
    }
    props = {
      navigation: {
        navigate: jest.fn(),
      },
      ...context,
    };
    outer = shallow(<Friend />);
    const Children = outer.props().children;
    wrapper = shallow(<Children {...props} />);
  });
  it('should render item and call showProfileModal when pressed', () => {
    const spy = jest.spyOn(outer.instance(), 'showProfileModal');
    const item = {
      img: null,
      displayName: '',
      statusMsg: '',
    };
    const rendered = outer.instance().renderItem(item, context);
    expect(outer.find(UserListItem).last()).toHaveLength(1);
    rendered.props.onPress();
    expect(spy).toHaveBeenCalled();
  });
  it('should call showModal on item click', () => {
    const items = [{
      img: null,
      displayName: '',
      statusMsg: '',
    }];
    outer.instance().showProfileModal(items, context);
    expect(props.actions.showModal).toHaveBeenCalled();
  });
});
