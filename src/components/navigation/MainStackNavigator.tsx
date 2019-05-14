import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';

import MainTabNavigator, { MainTabNavigationOptions } from './MainTabNavigator';
import ProfileUpdate from '../screen/ProfileUpdate';
import SearchUser from '../screen/SearchUser';
import Chat from '../screen/Chat';
import StatusBar from '../shared/StatusBar';
import theme from '../../utils/theme';
import { ProfileModalProvider } from '../../providers/ProfileModalProvider';
import { getString } from '../../../STRINGS';

const { colors: { background, title, border } } = theme;

const routeConfig = {
  Main: { screen: MainTabNavigator, navigationOptions: MainTabNavigationOptions },
  ProfileUpdate: {
    screen: ProfileUpdate,
    navigationOptions: {
      title: getString('MY_PROFILE'),
      headerStyle: {
        backgroundColor: background,
        borderBottomColor: border,
      },
      headerTitleStyle: {
        color: title,
      },
    },
  },
  SearchUser: {
    screen: SearchUser,
    navigationOptions: {
      title: 'Search User',
      headerStyle: {
        backgroundColor: background,
        borderBottomColor: border,
      },
      headerTitleStyle: {
        color: title,
      },
    },
  },
  Chat: {
    screen: Chat,
    navigationOptions: {
      title: getString('CHAT'),
      headerStyle: {
        backgroundColor: background,
        borderBottomColor: border,
      },
      headerTitleStyle: {
        color: title,
      },
    },
  },
};

const navigatorConfig = {
  initialRouteName: 'Main',
  gesturesEnabled: true,
  transitionConfig: () => ({ screenInterpolator: StackViewStyleInterpolator.forHorizontal }),
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
          />
        </ProfileModalProvider>
      </View>
    );
  }
}

export default RootNavigator;
