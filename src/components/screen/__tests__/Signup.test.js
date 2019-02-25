import 'react-native';
import * as React from 'react';
import Signup from '../Signup';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render, fireEvent } from 'react-native-testing-library';

const props = {
  navigation: {
    navigate: jest.fn(),
  },
};
const component: React.Element<any> = <Signup {...props}/>;

describe('[Signup] rendering test', () => {
  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[Signup] interaction', () => {
  // let renderResult: RenderResult;
  // beforeEach(() => {
  //   renderResult = render(component);
  // });
  // it('should simulate [onRegister] when [Button] has been pressed', () => {
  //   const btnInstance: ReactTestInstance = renderResult.getByTestId('register');
  //   fireEvent(btnInstance, 'press');
  //   console.log(btnInstance);
  // });
});

describe('interaction', () => {
  // let props;
  // let wrapper;
  // beforeEach(() => {
  //   props = {
  //     navigation: {
  //       navigate: jest.fn(),
  //     },
  //   };
  //   wrapper = shallow(<Signup {...props} />);
  // });
  // describe('clicking the button', () => {
  //   it('should call onRegister callback', () => {
  //     const spy = jest.spyOn(wrapper.instance(), 'onRegister');
  //     const btn = wrapper.find('#register');
  //     btn.props().onPress();
  //     expect(spy).toHaveBeenCalled();
  //     expect(wrapper.instance().state.isRegistering).toEqual(false);
  //     // wrapper.update();
  //     // expect(wrapper.instance().state.isRegistering).toEqual(false);
  //   });
  // });
  // describe('change text', () => {
  //   it('should change state onTextChanged', () => {
  //     const instance = wrapper.instance();
  //     instance.onTextChanged('EMAIL', 'aa@aa.aa');
  //     expect(instance.state.email).toEqual('aa@aa.aa');
  //     instance.onTextChanged('PW', 'aaaaaa');
  //     expect(instance.state.pw).toEqual('aaaaaa');
  //     instance.onTextChanged('NAME', 'aaaaaa');
  //     expect(instance.state.displayName).toEqual('aaaaaa');
  //     instance.onTextChanged('STATUS_MSG', 'aaaaaa');
  //     expect(instance.state.statusMsg).toEqual('aaaaaa');
  //   });
  // });
  // afterAll(() => {
  //   wrapper.instance().prototype.onRegister.mockRestore();
  // });
});
