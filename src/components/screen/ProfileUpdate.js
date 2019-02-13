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
import Icon5, { FA5Style } from 'react-native-vector-icons/FontAwesome5';

import styled from 'styled-components/native';

import type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
  ____ImageStyleProp_Internal as ImageStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import Button from '../shared/Button';
import TextInput from '../shared/TextInput';
import { IC_MASK } from '../../utils/Icons';

import { ratio, colors } from '../../utils/Styles';
import { getString } from '../../../STRINGS';

type Styles = {
  container: ViewStyle,
  scrollView: ViewStyle,
  scrollViewContainer: ViewStyle,
  wrapper: ViewStyle,
  btnWrapper: ViewStyle,
  btnLogout: ViewStyle,
  txtLogout: TextStyle,
  btnUpdate: ViewStyle,
  txtUpdate: TextStyle,
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
    marginTop: 48,
    width: '78%',

    flexDirection: 'column',
    alignItems: 'center',
  },
  btnWrapper: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 48,
  },
  btnLogout: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 4,
    borderWidth: 1,
    width: 136,
    height: 60,
    borderColor: colors.dodgerBlue,
    marginRight: 4,

    alignItems: 'center',
    justifyContent: 'center',
  },
  txtLogout: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dodgerBlue,
  },
  btnUpdate: {
    backgroundColor: colors.dodgerBlue,
    borderColor: colors.dodgerBlue,
    borderRadius: 4,
    borderWidth: 1,
    width: 136,
    height: 60,
    marginLeft: 4,
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
  txtUpdate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

type Props = {
  navigation: any,
};
type State = {
  isUpdating: boolean;
  displayName: string;
  statusMsg: string;
  photoURL: string;
};

class Screen extends Component<Props, State> {
  static navigationOptions = {
    title: getString('MY_PROFILE'),
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isUpdating: false,
      displayName: '',
      statusMsg: '',
      photoURL: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <View style={styles.wrapper}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={this.onPressImg}
            >
              <Icon5 name="meh" size={80} color={colors.dusk} light/>
            </TouchableOpacity>
            <TextInput
              style={{ marginTop: 80 }}
              txtLabel={getString('NAME')}
              txtHint={ getString('NAME') }
              txt={ this.state.displayName }
              onTextChanged={ (text) => this.onTextChanged('DISPLAY_NAME', text)}
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
                id='logout'
                onPress={() => this.onLogout()}
                isWhite
              >{getString('LOGOUT')}</Button>
              <View style={{ width: 8 }}/>
              <Button
                id='update'
                isLoading={this.state.isUpdating}
                onPress={() => this.onUpdate()}
              >{getString('UPDATE')}</Button>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  onLogout = () => {
    this.props.navigation.navigate('AuthStackNavigator');
  }

  onUpdate = () => {
    this.setState({ isUpdating: true }, () => {
      try {
        this.props.navigation.goBack();
      } catch (err) {
        console.error(err);
      } finally {
        this.setState({ isUpdating: false });
      }
    });
  }

  onTextChanged = (type: string, text: string) => {
    switch (type) {
      case 'DISPLAY_NAME':
        this.setState({ displayName: text });
        break;
      case 'STATUS_MSG':
        this.setState({ statusMsg: text });
        break;
    }
  }

  onPressImg = () => {
  }
}

export default Screen;
