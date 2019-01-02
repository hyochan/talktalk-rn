// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
  ____ImageStyleProp_Internal as ImageStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import TextInput from '../shared/TextInput';
import Button from '../shared/Button';
import StatusBar from '../shared/StatusBar';

import { IC_ICON } from '../../utils/Icons';
import { statusBarHeight, ratio, colors } from '../../utils/Styles';
import { getString } from '../../../STRINGS';

type Styles = {
  scrollView: ViewStyle,
  container: ViewStyle,
  iconWrapper: ViewStyle,
  icon: ImageStyle,
  iconTxt: TextStyle,
  wrapper: ViewStyle,
  viewBtnWrapper: ViewStyle,
  btnSignup: ViewStyle,
  txtSignUp: TextStyle,
  btnLogin: ViewStyle,
  txtLogin: TextStyle,
  touchForgotPw: ViewStyle,
  txtForgotPw: TextStyle,
  txtCopyright: TextStyle,
}

export const styles: Styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,

    flexDirection: 'column',
    alignItems: 'center',
  },
  iconWrapper: {
    position: 'absolute',
    top: 76,
    left: 40,

    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  icon: {
    width: 60,
    height: 60,
  },
  iconTxt: {
    color: colors.dusk,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  wrapper: {
    marginTop: 260,
    width: '78%',
    height: 300,

    flexDirection: 'column',
    alignItems: 'center',
  },
  viewBtnWrapper: {
    alignSelf: 'stretch',
    marginTop: 20,
    height: 60,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnSignup: {
    backgroundColor: 'transparent',
    borderRadius: 4,
    borderWidth: 1,
    height: '100%',
    width: '100%',
    borderColor: colors.dodgerBlue,

    alignItems: 'center',
    justifyContent: 'center',
  },
  txtSignUp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dodgerBlue,
  },
  btnLogin: {
    backgroundColor: colors.dodgerBlue,
    borderColor: colors.dodgerBlue,
    borderRadius: 4,
    borderWidth: 1,
    height: 60,
    shadowColor: colors.dodgerBlue,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 4,
    shadowOpacity: 0.3,

    alignItems: 'center',
    justifyContent: 'center',
  },
  txtLogin: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  touchForgotPw: {
    marginTop: 20,
  },
  txtForgotPw: {
    fontSize: 12,
    color: colors.dodgerBlue,
    textDecorationLine: 'underline',
  },
  txtCopyright: {
    marginTop: 80,
    fontSize: 12,
    color: colors.cloudyBlue,
  },
});

type Props = {
  navigation: any;
};
type State = {
  isLoggingIn: boolean;
  email: string;
  pw: string;
};

class Screen extends Component<Props, State> {
  static navigationOptions = {
    headerStyle: {
      borderBottomWidth: 0,
    }
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoggingIn: false,
      email: '',
      pw: '',
    };
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <StatusBar isDarkContent={true}/>
        <View style={styles.container}>
          <View style={styles.iconWrapper}>
            <Image style={styles.icon} source={IC_ICON}/>
            <Text style={styles.iconTxt}>{getString('HELLO')}.</Text>
          </View>
          <View style={styles.wrapper}>
            <TextInput
              // txtLabel={ getString('EMAIL') }
              txtHint={ getString('EMAIL') }
              txt={ this.state.email }
              onTextChanged={ (text) => this.onTextChanged('EMAIL', text)}
            />
            <TextInput
              style={{ marginTop: 8 }}
              // txtLabel={ getString('EMAIL') }
              txtHint={ getString('PASSWORD') }
              txt={ this.state.pw }
              onTextChanged={ (text) => this.onTextChanged('PW', text)}
              isPassword={ true }
            />
            <View style={styles.viewBtnWrapper}>
              <Button
                id='signup'
                constainerStyle={{ flex: 1 }}
                onPress={() => this.goToSignup()}
                style={styles.btnSignup}
                textStyle={styles.txtSignUp}
              >{getString('SIGNUP')}</Button>
              <View style={{ width: 8 }}/>
              <Button
                id='login'
                constainerStyle={{ flex: 1 }}
                isLoading={this.state.isLoggingIn}
                onPress={() => this.onLogin()}
                style={styles.btnLogin}
                textStyle={styles.txtLogin}
              >{getString('LOGIN')}</Button>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => this.goToFindPw()}
              style={styles.touchForgotPw}
            >
              <Text style={styles.txtForgotPw}>{getString('FORGOT_PW')}</Text>
            </TouchableOpacity>
            <Text style={styles.txtCopyright}>copyright by dooboolab.com</Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  onTextChanged = (type: string, text: string) => {
    switch (type) {
      case 'EMAIL':
        this.setState({ email: text });
        return;
      case 'PW':
        this.setState({ pw: text });
    }
  }

  goToSignup = () => {
    this.props.navigation.navigate('Signup');
    // this.props.navigation.navigate('Signup');
  }
  goToFindPw = () => {
    this.props.navigation.navigate('FindPw');
  }

  onLogin = () => {
    this.setState({ isLoggingIn: true }, () => {
      try {
      } catch (err) {
        // Alert.alert(getString('ERROR'), err.message);
      } finally {
        this.setState({ isLoggingIn: false });
      }
    });
  }
}

export default Screen;
