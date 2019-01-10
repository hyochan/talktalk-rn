// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
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

import { ratio, colors } from '../../utils/Styles';
import { getString } from '../../../STRINGS';

type Styles = {
  container: ViewStyle,
  scrollView: ViewStyle,
  scrollViewContainer: ViewStyle,
  wrapper: ViewStyle,
  btnWrapper: ViewStyle,
  btnRegister: ViewStyle,
  txtRegister: TextStyle,
};

const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  scrollView: {
    alignSelf: 'stretch',
  },
  scrollViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    marginTop: 40,
    width: '78%',

    flexDirection: 'column',
    alignItems: 'center',
  },
  btnWrapper: {
    width: '100%',
    alignItems: 'flex-end',
  },
  btnRegister: {
    backgroundColor: colors.dodgerBlue,
    borderColor: colors.dodgerBlue,
    borderRadius: 4,
    borderWidth: 1,
    width: 136,
    height: 60,
    marginLeft: 4,
    marginTop: 24,
    marginBottom: 48,
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
  txtRegister: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

type Props = {
  navigation: any;
};
type State = {
  isRegistering: boolean;
  email: string;
  pw: string;
  displayName: string;
  statusMsg: string;
};

class Screen extends Component<Props, State> {
  static navigationOptions = {
    title: getString('SIGNUP'),
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isRegistering: false,
      email: '',
      pw: '',
      displayName: '',
      statusMsg: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar isDarkContent={true}/>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <View style={styles.wrapper}>
            <TextInput
              style={{ marginTop: 8 }}
              txtLabel={getString('EMAIL')}
              txtHint={ getString('EMAIL') }
              txt={ this.state.email }
              onTextChanged={ (text) => this.onTextChanged('EMAIL', text)}
            />
            <TextInput
              style={{ marginTop: 24 }}
              txtLabel={ getString('PASSWORD') }
              txtHint={ getString('PASSWORD') }
              txt={ this.state.pw }
              onTextChanged={ (text) => this.onTextChanged('PW', text)}
              isPassword={ true }
            />
            <TextInput
              style={{ marginTop: 24 }}
              txtLabel={getString('NAME')}
              txtHint={ getString('NAME') }
              txt={ this.state.displayName }
              onTextChanged={ (text) => this.onTextChanged('NAME', text)}
            />
            <TextInput
              style={{ marginTop: 24 }}
              txtLabel={getString('STATUS_MSG')}
              txtHint={ getString('STATUS_MSG') }
              txt={ this.state.statusMsg }
              onTextChanged={ (text) => this.onTextChanged('STATUS_MSG', text)}
            />
            <View style={styles.btnWrapper}>
              <Button
                id='register'
                isLoading={this.state.isRegistering}
                onPress={() => this.onRegister()}
                style={styles.btnRegister}
                textStyle={styles.txtRegister}
              >{getString('REGISTER')}</Button>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  onRegister = () => {
    this.setState({ isRegistering: true }, () => {
      this.setState({ isRegistering: false });
    });
  }

  onTextChanged = (type: string, text: string) => {
    switch (type) {
      case 'EMAIL':
        this.setState({ email: text });
        break;
      case 'PW':
        this.setState({ pw: text });
        break;
      case 'NAME':
        this.setState({ displayName: text });
        break;
      case 'STATUS_MSG':
        this.setState({ statusMsg: text });
        break;
    }
  }
}

export default Screen;
