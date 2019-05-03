import React from 'react';
import {
  Platform,
  Image,
  View,
  Text,
  AsyncStorage,
  BackHandler,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import {
  StackActions,
  TabBarTop,
  NavigationAction,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import Icon5, { FA5Style } from 'react-native-vector-icons/FontAwesome5';
import theme from '../../utils/theme';
import { getString } from '../../../STRINGS';
import Friend from '../screen/Friend';
import Message from '../screen/Message';

const {
  statusBarHeight,
  colors: {
    dodgerBlue
  }
} = theme;

interface IStyles {
  container: ViewStyle;
  imgHeaderLeft: ImageStyle;
  txt: TextStyle;
  txtSub: TextStyle;
}

const styles: IStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight, // false to get height of android too.
  },
  imgHeaderLeft: {
    marginLeft: 20,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderColor: 'white',
    borderWidth: 1,
  },
  txt: {
    color: 'white',
    fontSize: 15,
  },
  txtSub: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
});

const MainTabNavigator = createMaterialTopTabNavigator(
  {
    Friend: { screen: Friend },
    Message: { screen: Message },
  },
  {
    navigationOptions: ({ navigation, screenProps }) => ({
      tabBarVisible: true,
      tabBarLabel: ({ focused }) => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case 'Friend':
            return <Text style={[styles.txt, { opacity: focused ? 1 : 0.8 }]}>
              {getString('FRIEND')}  <Text style={styles.txtSub}>24</Text>
            </Text>;
          case 'Message':
            return <Text style={[styles.txt, { opacity: focused ? 1 : 0.8 }]}>
              {getString('MESSAGE')}  <Text style={styles.txtSub}>8</Text>
            </Text>;
        }
        return null;
      },
    }),
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: 'white',
      },
      style: {
        height: 44,
        justifyContent: 'center',
        backgroundColor: dodgerBlue,
        borderTopColor: 'transparent',
        borderTopWidth: 0,
        elevation: 0,
      },
    },
  },
);

export default MainTabNavigator;

export const MainTabNavigationOptions = ({ navigation }) => ({
  title: 'Talk Talk',
  headerLeft: (
    <View style={{
      marginLeft: 16,
    }}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate('ProfileUpdate')}
      >
        <Icon5 name='user-circle' size={20} color={dodgerBlue} light={true}/>
      </TouchableOpacity>
    </View>
  ),
  headerRight: (
    <View style={{
      marginRight: 16,
    }}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate('SearchUser')}
      >
        <Icon5 name='search-plus' size={20} color={dodgerBlue} light={true}/>
      </TouchableOpacity>
    </View>
  )
});
