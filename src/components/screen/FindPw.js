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
    marginTop: 40 * ratio,
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
    borderRadius: 4 * ratio,
    borderWidth: 1 * ratio,
    width: 136 * ratio,
    height: 60 * ratio,
    marginLeft: 4 * ratio,
    marginTop: 24 * ratio,
    marginBottom: 48 * ratio,
    shadowColor: colors.dodgerBlue,
    shadowOffset: {
      width: 0,
      height: 10 * ratio,
    },
    shadowRadius: 4 * ratio,
    shadowOpacity: 0.3,

    alignItems: 'center',
    justifyContent: 'center',
  },
  txtRegister: {
    fontSize: 16 * ratio,
    fontWeight: 'bold',
    color: 'white',
  },
});

type Props = {
  navigation: any,
};
type State = {
  email: string,
  isLoading: boolean,
};

class Screen extends Component<Props, State> {
  static navigationOptions = {
    title: getString('FIND_PW'),
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar isDarkContent={false}/>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <View style={styles.wrapper}>
            <TextInput
              style={{ marginTop: 8 * ratio }}
              txtLabel={getString('EMAIL')}
              txtHint={ getString('EMAIL') }
              txt={ this.state.email }
              onTextChanged={ (text) => this.onTextChanged('EMAIL', text)}
              isPassword={ true }
            />
            <View style={styles.btnWrapper}>
              <Button
                id='send_link'
                isLoading={this.state.isLoading}
                onPress={() => this.onSendLink()}
                style={styles.btnRegister}
                textStyle={styles.txtRegister}
              >{getString('SEND_LINK')}</Button>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  onTextChanged = (type: string, text: string) => {
    switch (type) {
      case 'EMAIL':
        this.setState({ email: text });
        break;
    }
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  onSendLink = () => {
    console.log('onSendLink');
    this.setState({
      isLoading: true,
    }, async() => {
      this.setState({ isLoading: false });
    });
  }
}

export default Screen;
