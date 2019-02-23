import { Animated } from 'react-native';
import * as React from 'react';
import SearchUser from '../SearchUser';
import { IC_BACK, IC_SEARCH, IC_ICON } from '../../../utils/Icons';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme';

jest.useFakeTimers(); // related to Animated Component

describe('[serachUser] rendering test', () => {
  const wrapper = shallow(
    <SearchUser />,
  );
  it('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('[serachUser] interaction', () => {
  let props;
  let wrapper;
  let outer;
  let context;
  let animatedFlatList;
  let txtInput;
  const inputData = {
    uid: '2',
    displayName: 'geoseong',
    photoURL: IC_BACK,
    statusMsg: 'healthy',
    isOnline: '',
    friends: '',
    Chatrooms: '',
    created: '',
    updated: '',
  };

  beforeEach(() => {
    jest.useFakeTimers(); // related to Animated Component
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
    outer = shallow(<SearchUser {...props} />);
    const Children = outer.props().children;
    wrapper = shallow(<Children {...props} />);
    animatedFlatList = wrapper.find('#animatedFlatlist');
    txtInput = wrapper.find('#styledInput');
  });
  describe('[serachUser] when friend name typed in TextInput', () => {
    it('if there has results: (onTxtChanged -> onSearch) and (renderItem)', () => {
      const spyOnTxtChanged = jest.spyOn(outer.instance(), 'onTxtChanged');
      const spyOnSearch = jest.spyOn(outer.instance(), 'onSearch');
      const spyRenderItem = jest.spyOn(outer.instance(), 'renderItem');
      
      animatedFlatList.props().keyExtractor(inputData, 0);
      animatedFlatList.props().renderItem({ item: inputData });
      txtInput.props().onChangeText(inputData.displayName);

      expect(spyOnTxtChanged).toHaveBeenCalled();
      expect(spyOnSearch).toHaveBeenCalled();
      expect(spyRenderItem).toHaveBeenCalled();
      expect(outer.instance().state.users[0].displayName).toEqual(inputData.displayName);

      outer.instance().onSearch('');
      expect(outer.instance().getContentContainerStyle()).toEqual(null);
    });
    it('if there has no results', () => {
      outer.instance().onSearch('noresult');
      expect(outer.instance().state.users.length).toEqual(0);
      expect(outer.instance().getContentContainerStyle()).toEqual({
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      });
    });
    it('[serachUser] see Animation is working well', () => {
      let scrollY = outer.instance().scrollY;
      expect(scrollY).toEqual(new Animated.Value(0));

      outer.instance().onTxtChanged('');
      let afterScrollY = new Animated.Value(0)
      Animated.timing(afterScrollY, {
        toValue: 100,
        duration: 500,
      }).start();
      setTimeout(() => {
        console.log('after scrollY', afterScrollY)
        expect(scrollY).toEqual(afterScrollY);
      }, 1000)
    });
  });
  describe('when profile modal clicked', () => {
    it('should call showProfileModal', () => {
      const spyShowProfileModal = jest.spyOn(outer.instance(), 'showProfileModal');
      const UserListItem = animatedFlatList.props().renderItem;
      const userListItemWrapper = shallow(<UserListItem {...props} />);

      userListItemWrapper.props().onPress();
      expect(spyShowProfileModal).toHaveBeenCalled();
    });
  });
});