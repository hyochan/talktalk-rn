// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  TextInput,
  Animated,
  FlatList,
} from 'react-native';
import { getString } from '../../../STRINGS';
import { User as Friend } from '../../models/User';
import { IC_BACK, IC_SEARCH, IC_ICON } from '../../utils/Icons';

import type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
  ____ImageStyleProp_Internal as ImageStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import { ratio, colors } from '../../utils/Styles';
import { ProfileModalConsumer } from '../../providers/ProfileModalProvider';
import EmptyListItem from '../shared/EmptyListItem';
import UserListItem from '../shared/UserListItem';

type Styles = {
  container: ViewStyle,
  viewSearch: ViewStyle,
  imgSearch: ViewStyle,
};

const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewSearch: {
    width: '100%',
    justifyContent: 'center',
    // backgroundColor: colors.dodgerBlue,
    overflow: 'hidden',
  },
  imgSearch: {
    position: 'absolute',
    width: 16,
    height: 16,
    left: 30,
    top: 18,
  },
});
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

type Props = {
  navigation: any;
};
type State = {
  users: Friend[]
};

class Screen extends Component<Props, State> {
  static navigationOptions = {
    title: 'Search User',
  };

  scrollY = new Animated.Value(0);
  searchTxt: string = '';
  users: Friend[];

  constructor(props: Props) {
    super(props);
    this.state = {
      users: [
        {
          img: null,
          displayName: 'test',
          statusMsg: 'status',
        },
        {
          img: IC_BACK,
          displayName: 'geoseong',
          statusMsg: 'healthy',
        },
        {
          img: IC_ICON,
          displayName: 'hyochan',
          statusMsg: 'healthy',
        },
      ],
    };
  }

  async componentDidMount() {
    /**
     * @author geoseong
     * @name db_getAllUser()
     * @description get user data from server. it commented because server isn't implemented yet.
     */
    // this.users = await db_getAllUser();
    // this.setState({ users: this.users });
    this.users = this.state.users;
  }

  renderItem = (item: Friend, data: any) => {
    return (
      <UserListItem
        id='user'
        user={item}
        onPress={() => this.showProfileModal(item, data)}
      />
    );
  }
  showProfileModal = (item: Friend, data: any) => {
    data.actions.showModal(item, true);
  }
  onItemClick = (item: string) => {
    // console.log(item);
    this.props.navigation.navigate('Profile', { user: item });
  }
  onTxtChanged = (txt: string) => {
    this.searchTxt = txt;
    this.onSearch();
  }
  onSearch = () => {
    console.log('onSearch:', this.searchTxt);
    if (this.searchTxt === '') {
      this.setState({ users: this.users });
    } else {
      this.setState({ users: this.users.filter((item) => item.displayName.includes(this.searchTxt)) });
    }
  }

  render() {
    return (
      <ProfileModalConsumer>
        {
          (data) => {
            return (
              <View style={styles.container}>
                <Animated.View style={[
                  styles.viewSearch,
                  {
                    height: 50,
                    transform: [{
                      translateY: this.scrollY.interpolate({
                        inputRange: [-50, 0, 50, 100],
                        outputRange: [0, 0, -50, -50],
                      })
                    }],
                  }
                ]}>
                  <Animated.View style={{
                    position: 'absolute',
                    width: '100%',
                    paddingHorizontal: 20,
                    height: 50,
                    opacity: this.scrollY.interpolate({
                      inputRange: [-50, 0, 50, 100],
                      outputRange: [1, 1, 0, 0],
                    })
                  }}>
                    <TextInput
                      onChangeText={(text) => this.onTxtChanged(text)}
                      underlineColorAndroid='transparent' // android fix
                      autoCapitalize='none'
                      autoCorrect={false}
                      multiline={false}
                      // value={this.searchTxt}
                      style={{
                        width: '100%',
                        height: 30,
                        top: 10,
                        backgroundColor: 'rgb(247,248,251)',
                        // backgroundColor: 'white',
                        borderRadius: 4,
                        paddingLeft: 34,
                        paddingRight: 10
                      }}
                      onSubmitEditing={this.onSearch}
                      defaultValue={this.searchTxt}
                    />
                    <Image source={IC_SEARCH} style={styles.imgSearch}/>
                  </Animated.View>
                </Animated.View>
                <AnimatedFlatList
                  style={{
                    width: '100%',
                    height: '100%',
                    marginBottom: -50,
                    transform: [{
                      translateY: this.scrollY.interpolate({
                        inputRange: [-50, 0, 50, 100],
                        outputRange: [0, 0, -50, -50],
                      })
                    }],
                  }}
                  contentContainerStyle={
                    this.state.users.length === 0
                      ? {
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }
                      : null
                  }
                  keyExtractor={(item, index) => index.toString()}
                  data={this.state.users}
                  renderItem={({ item }) => this.renderItem(item, data)}
                  ListEmptyComponent={<EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>}
                />
              </View>
            );
          }
        }
      </ProfileModalConsumer>
    );
  }
}

export default Screen;
