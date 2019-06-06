import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
// import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import { withTheme } from 'styled-components';

import MainTabNavigator, { MainTabNavigationOptions } from './MainTabNavigator';
import ProfileUpdate from '../screen/ProfileUpdate';
import SearchUser from '../screen/SearchUser';
import Chat from '../screen/Chat';
import StatusBar from '../shared/StatusBar';
import { ProfileModalProvider } from '../../providers/ProfileModalProvider';
import { getString } from '../../../STRINGS';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

const routeConfig = {
  Main: { screen: MainTabNavigator, navigationOptions: MainTabNavigationOptions },
  ProfileUpdate: {
    screen: ProfileUpdate,
    navigationOptions: ({ navigation, screenProps }) => {
      const { theme } = screenProps;
      return ({
        title: getString('MY_PROFILE'),
        headerStyle: {
          backgroundColor: theme.colors.background,
          borderBottomColor: theme.colors.border,
        },
        headerTitleStyle: {
          color: theme.colors.title,
        },
        headerRight: (
          <View style={{
            marginRight: 16,
          }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('Setting')}
            >
              <Icon5 name='cog' size={20} color={theme.colors.dodgerBlue} light={true}/>
            </TouchableOpacity>
          </View>
        ),
      });
    },
  },
  SearchUser: {
    screen: SearchUser,
    navigationOptions: ({ screenProps }) => {
      const { theme } = screenProps;
      return {
        title: 'Search User',
        headerStyle: {
          backgroundColor: theme.colors.background,
          borderBottomColor: theme.colors.border,
        },
        headerTitleStyle: {
          color: theme.colors.title,
        },
      };
    },
  },
  Chat: {
    screen: Chat,
    navigationOptions: ({ screenProps }) => {
      const { theme } = screenProps;
      return {
        title: getString('CHAT'),
        headerStyle: {
          backgroundColor: theme.colors.background,
          borderBottomColor: theme.colors.border,
        },
        headerTitleStyle: {
          color: theme.colors.title,
        },
      };
    },
  },
};

const navigatorConfig = {
  initialRouteName: 'Main',
  gesturesEnabled: true,
  // transitionConfig: () => ({ screenInterpolator: StackViewStyleInterpolator.forHorizontal }),
};

const MainStackNavigator = createStackNavigator(routeConfig, navigatorConfig);

class RootNavigator extends React.Component<any, any> {
  private static router = MainStackNavigator.router;

  public render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <StatusBar isDarkContent={true}/>
        <ProfileModalProvider navigation={this.props.navigation}>
          <MainStackNavigator
            navigation={this.props.navigation}
            screenProps={{ theme: this.props.theme }}
          />
        </ProfileModalProvider>
      </View>
    );
  }
}

export default withTheme(RootNavigator);
