// @flow
import React, { Component } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  View,
  FlatList,
  InteractionManager,
} from 'react-native';
import { NavigationScreenProp, NavigationStateRoute } from 'react-navigation';

import { ratio, colors } from '../../utils/Styles';
import { IC_MASK } from '../../utils/Icons';
import { getString } from '../../../STRINGS';
import Button from '../shared/Button';
import { UserConsumer } from '../../providers/User';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleTxt: {
    marginTop: 100,
    color: colors.dusk,
    fontSize: 24,
  },
  txtLogin: {
    fontSize: 14,
    color: 'white',
  },
  imgBtn: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 16,
  },
  viewUser: {
    marginTop: 60,
    alignItems: 'center',
  },
  txtUser: {
    fontSize: 16,
    color: colors.dusk,
    lineHeight: 48,
  },
  btnBottomWrapper: {
    position: 'absolute',
    bottom: 40,
  },
  btnLogin: {
    backgroundColor: colors.dodgerBlue,
    alignSelf: 'center',
    borderRadius: 4,
    width: 320,
    height: 52,

    alignItems: 'center',
    justifyContent: 'center',
  },
  btnNavigate: {
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 4,
    width: 320,
    height: 52,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = {
  store: any;
  navigation: NavigationScreenProp<NavigationStateRoute>;
};
type State = {
  isLoggingIn: boolean;
}

class Page extends Component<Props, State> {
  timer: any;

  state = {
    isLoggingIn: false,
  };

  constructor(props) {
    super(props)
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    return (
      <UserConsumer>
        {
          (user) => (
            <View style={styles.container}>
              <Text style={styles.titleTxt}>TalkTalk</Text>
              <View style={styles.viewUser}>
                <Text style={styles.txtUser}>{user.state.displayName}</Text>
                <Text style={styles.txtUser}>{user.state.age}</Text>
                <Text style={styles.txtUser}>{user.state.job}</Text>
              </View>
              <View style={styles.btnBottomWrapper}>
                <Button
                  isLoading={this.state.isLoggingIn}
                  onPress={() => {
                    this.setState({ isLoggingIn: true }, () => {
                      this.timer = setTimeout(() => {
                        user.actions.setUser('dooboolab', 30, 'developer');
                        this.setState({ isLoggingIn: false });
                      }, 1000);
                    });
                  }}
                  style={styles.btnLogin}
                  textStyle={styles.txtLogin}
                  imgLeftSrc={IC_MASK}
                  imgLeftStyle={styles.imgBtn}
                >{getString('LOGIN')}</Button>
                <Button
                  onPress={() => this.props.navigation.navigate('Temp') }
                  style={[
                    styles.btnNavigate,
                    {
                      marginTop: 15,
                    },
                  ]}
                  textStyle={{
                    color: colors.dodgerBlue,
                  }}
                >Navigate</Button>
              </View>
            </View>
          )
        }
      </UserConsumer>
    );
  }
}

export default Page;
