// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Animated,
} from 'react-native';

import type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
  ____ImageStyleProp_Internal as ImageStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import { Text } from 'react-native-animatable';

import { IC_ICON } from '../../utils/Icons';
import { animateRotateLoop } from '../../utils/Functions';
import { ratio, colors } from '../../utils/Styles';
import { getString } from '../../../STRINGS';

import styled from 'styled-components/native';

const StyledView - styled.View`
  background-color: transparent;
`;
const StyledContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AnimatedImage = Animated.createAnimatedComponent(Image);
const StyledAnimatedImage = styled(AnimatedImage)`
  width: 60;
  height: 60;
  margin-bottom: 16;
`;

const StyledTextLoading = styled.Text`
  animation: fadein;
  iteration-count: infinite;
  direction: alternate;
  color: colors.dodgerBlue;
  font-size: 16;
`;

type Props = {

};
type State = {

};

function Screen(props: Props, state: State) {
  const spinValue = new Animated.Value(0);

  const spin = this.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1260deg'],
  });

  return (
    <StyledView>
      <StyledContainer>
        <StyledAnimatedImage
          style = {{
            transform: [{
              rotate: this.spin
            }]
          }}
        />
        <StyledTextLoading>{getString('LOADING')}</StyledTextLoading>
      </StyledContainer>
    </StyledView>
  )
}

export default Screen;



// class Screen extends Component<Props, State> {
//   static navigationOptions = {
//     title: 'Title',
//   };


//   const spinValue = (value) => {
//     Animated.Value(value);
//   }
//   // spinValue = new Animated.Value(0);
  
  
  
//   spin = this.spinValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['0deg', '1260deg'],
//   });

  // constructor(props: Props) {
  //   super(props);
  // }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Animated.Image
//           source={IC_ICON}
//           style={{
//             width: 60,
//             height: 60,
//             marginBottom: 16,
//             transform: [{ rotate: this.spin }],
//           }}
//         />

//         <Text
//           animation='fadeIn'
//           iterationCount={'infinite'}
//           direction='alternate'
//           style={{
//             color: colors.dodgerBlue,
//             fontSize: 16,
//           }}
//         >
//           { getString('LOADING') }
//         </Text>
//       </View>
//     );
//   }
// }





// type Styles = {
//   container: ViewStyle,
// };

// const styles: Styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'transparent',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
