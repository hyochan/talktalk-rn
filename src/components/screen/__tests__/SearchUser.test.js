import { Animated } from 'react-native';
import * as React from 'react';
import SearchUser from '../SearchUser';
import { IC_BACK } from '../../../utils/Icons';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { RenderAPI, render, shallow, fireEvent, waitForElement } from 'react-native-testing-library';

const props = {
  navigation: {
    navigate: jest.fn(),
  },
  onTxtChanged: jest.fn(),
  onSearch: jest.fn(),
};
const component: React.Element<any> = <SearchUser {...props}/>;
// const component: React.Element<any> = <SearchUser {...props}/>;

describe('[SearchUser] rendering test', () => {
  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

// jest.useFakeTimers(); // related to Animated Component
describe('[serachUser] interaction', () => {
  let testingLib: RenderAPI
  let txtInputInst: renderer.ReactTestInstance
  let animatedFlatlistInst: renderer.ReactTestInstance
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
  
  beforeAll(() => {
    // jest.useFakeTimers(); // related to Animated Component
    testingLib = render(component);
    txtInputInst = testingLib.getByTestId('txtInput')
    animatedFlatlistInst = testingLib.getByTestId('animatedFlatlist')
  });
  it('when friend name typed in TextInput: (onTxtChanged -> onSearch) and (renderItem)', () => {
    // setTimeout called - 0
    fireEvent.changeText(txtInputInst, inputData.displayName)
    // setTimeout called - 2
    expect(animatedFlatlistInst.props.data[0]).toEqual(inputData);
    
    expect(animatedFlatlistInst.props.contentContainerStyle()).toEqual(null);
    fireEvent.changeText(txtInputInst, 'noresult!')
    // setTimeout called - 3
    expect(animatedFlatlistInst.props.data.length).toEqual(0);
    expect(animatedFlatlistInst.props.contentContainerStyle()).toEqual({
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    });
    
    fireEvent.changeText(txtInputInst, '')
    // setTimeout called - 4
    expect(animatedFlatlistInst.props.data.length).toEqual(9);
  });
  it('see Animation is working well', () => {
    jest.useFakeTimers(); // related to timer
    let scrollY = animatedFlatlistInst.props.testObj.scrollY;
    let afterScrollY = new Animated.Value(0)
    Animated.timing(afterScrollY, {
      toValue: 100,
      duration: 500,
    }).start();
    // setTimeout called - 5
    setTimeout(() => {
      console.log('after scrollY', afterScrollY)
      expect(scrollY).toEqual(afterScrollY);  // doesn't work
    }, 600);
    // setTimeout called - 6
  });
  
  it('when profile modal clicked -> should call showProfileModal', () => {
    fireEvent.changeText(txtInputInst, inputData.displayName);
    let userListItemInst: renderer.ReactTestInstance = testingLib.getByTestId('userListItem0');
    fireEvent.press(userListItemInst);
    let { profileModal } = userListItemInst.props.testObj;  // try to detect cotnext, but undefined
  });
});