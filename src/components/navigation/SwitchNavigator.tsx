import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import NotFound from '../screen/NotFound';
import Loading from '../screen/Loading';
import AuthStackNavigator from './AuthStackNavigator';
import MainStackNavigator from './MainStackNavigator';

const SwitchNavigator = createSwitchNavigator(
  {
    NotFound,
    Loading,
    AuthStackNavigator,
    MainStackNavigator,
  },
  {
    initialRouteName: 'MainStackNavigator',
  },
);

const AppContainer = createAppContainer(SwitchNavigator);
export default AppContainer;
