import React from 'react';
import { AsyncStorage, View, Platform, StyleSheet } from 'react-native';
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
// import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';

import MainTabNavigator, { MainTabNavigationOptions } from './MainTabNavigator';
import Login from '../screen/Login';
import Signup from '../screen/Signup';
import FindPw from '../screen/FindPw';
import ProfileUpdate from '../screen/ProfileUpdate';
import SearchUser from '../screen/SearchUser';
import Chat from '../screen/Chat';
import NotFound from '../screen/NotFound';
import ProfileModal from '../shared/ProfileModal';
import { colors } from '../../utils/Styles';
import { ProfileProvider, ProfileConsumer } from '../../providers/ProfileProvider';

const routeConfig = {
  Main: { screen: MainTabNavigator, navigationOptions: MainTabNavigationOptions },
  ProfileUpdate: { screen: ProfileUpdate },
  SearchUser: { screen: SearchUser },
  Chat: { screen: Chat },
  NotFound: { screen: NotFound },
};

export const commonNavigationOptions = {
  headerBackTitle: null,
  headerStyle: {
    backgroundColor: colors.dodgerBlue,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
    elevation: 0,
  },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white',
};

const navigatorConfig = {
  initialRouteName: 'Main',
  gesturesEnabled: true,
  transitionConfig: () => ({ screenInterpolator: StackViewStyleInterpolator.forHorizontal }),
  navigationOptions: commonNavigationOptions,
};

const MainStackNavigator = createStackNavigator(routeConfig, navigatorConfig);

class RootNavigator extends React.Component<any, any> {
  static router = MainStackNavigator.router;

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <ProfileProvider>
          <MainStackNavigator
            navigation={this.props.navigation}
          />
          {/* ref is called */}
          <ProfileModal
            ref={(v) => {
              console.log('v', v);
            }}
          />;
          {/* ref is not called */}
          <ProfileConsumer>
            {
              (data) => {
                console.log(data);
                <ProfileModal
                  ref={(v) => {
                    console.log('v', v);
                    data.modal = v;
                  }}
                  onChat={ () => data.actions.onChatPressed(this.props.navigation) }
                />;
              }
            }
          </ProfileConsumer>
        </ProfileProvider>
      </View>
    );
  }
}

export default RootNavigator;
