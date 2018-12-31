import React from 'react';
import { Image, Text } from 'react-native';

const createAnimatableComponent = (Component) => (
  class AnimatableComponent extends React.Component {
    render() {
      return <Component/>;
    }
  }
);

const initializeRegistryWithDefinitions = jest.fn();

export {
  createAnimatableComponent,
  initializeRegistryWithDefinitions,
  Image,
  Text,
};
