import 'react-native';
import * as React from 'react';
import SearchUser from '../SearchUser';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme';

describe('rendering test', () => {
  const wrapper = shallow(
    <SearchUser />,
  );

  it('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('context', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    const context = {
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
    const outer = shallow(<SearchUser />);
    const Children = outer.props().children;
    wrapper = shallow(<Children {...props} />);
  });

  it('renders context', () => {
    expect(wrapper.find('TouchableOpacity')).toHaveLength(1);
  });

  it('should call showModal on click', () => {
    const showProfileBtn = wrapper.find('TouchableOpacity');
    showProfileBtn.props().onPress();
    expect(props.actions.showModal).toHaveBeenCalled();
  });
});
