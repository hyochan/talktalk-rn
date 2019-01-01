// @flow
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';

import { Header } from 'react-navigation';

import type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
  ____ImageStyleProp_Internal as ImageStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import ChatListItem from '../shared/ChatListItem';
import EmptyListItem from '../shared/EmptyListItem';
import Button from '../shared/Button';

import { Chatroom } from '../../utils/Types';
import { IC_SMILE } from '../../utils/Icons';
import { ratio, colors } from '../../utils/Styles';
import { getString } from '../../../STRINGS';

type Styles = {
  container: ViewStyle,
  content: ViewStyle,
  viewChat: ViewStyle,
  inputChat: TextStyle,
  touchMenu: ViewStyle,
  imgMenu: ImageStyle,
  btnSend: ViewStyle,
  txtSend: TextStyle,
  viewBottom: ViewStyle,
  viewMenu: ViewStyle,
};

const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',

    flexDirection: 'column',
    alignItems: 'center',
  },
  viewChat: {
    width: '100%',
    borderTopWidth: 0.5,
    borderColor: 'rgb(225,225,225)',
    height: 52 * ratio,

    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  inputChat: {
    width: '80%',
    fontSize: 14 * ratio,
    marginRight: 20 * ratio,
    paddingLeft: 48 * ratio,
  },
  touchMenu: {
    position: 'absolute',
    left: 10,
    height: '100%',
    minWidth: 20 * ratio,
    justifyContent: 'center',
  },
  imgMenu: {
    width: 20 * ratio,
    height: 20 * ratio,
  },
  btnSend: {
    right: 8 * ratio,
    backgroundColor: colors.dodgerBlue,
    borderRadius: 4 * ratio,
    width: 60 * ratio,
    height: 36 * ratio,

    alignItems: 'center',
    justifyContent: 'center',
  },
  txtSend: {
    fontSize: 14 * ratio,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 5 * ratio,
    paddingVertical: 10 * ratio,
  },
  viewBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  viewMenu: {
    height: 258,
    backgroundColor: 'green',
  },
});

type Props = {
  navigation: any;
};
type State = {
  chats: any,
  showMenu: boolean,
  isLoading: boolean,
};

class Screen extends Component<Props, State> {
  static navigationOptions = {
    title: getString('CHAT'),
  };

  input1: any;
  input2: any;
  keyboardDidShowListener: any;
  keyboardDidHideListener: any;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showMenu: false,
      chats: [
        {
          id: '0',
          sender: '0',
          img: null,
          message: 'hello',
          date: new Date(),
          isPeer: true,
        },
        {
          id: '1',
          sender: '1',
          img: null,
          message: 'hello',
          date: new Date(),
          isPeer: false,
        },
      ],
    };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      console.log('keyboardHeight', e.endCoordinates.height);
    });
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          keyboardVerticalOffset = {Header.HEIGHT + 24}
          behavior='padding'
          style={ styles.content }
        >
          <FlatList
            style={{
              alignSelf: 'stretch',
            }}
            contentContainerStyle={
              this.state.chats.length === 0
                ? {
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }
                : null
            }
            keyExtractor={(item, index) => index.toString()}
            data={this.state.chats}
            renderItem={this.renderItem}
            ListEmptyComponent={<EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>}
          />
          {
            !this.state.showMenu
              ? <View
                style={styles.viewChat}
              >
                <TextInput
                  ref={(v) => this.input1 = v}
                  style={styles.inputChat}
                  placeholder={ getString('WRITE_MESSAGE') }
                  placeholderTextColor={ colors.cloudyBlue }
                />
                <TouchableOpacity
                  style={styles.touchMenu}
                  onPress={this.showMenu}
                >
                  <Image style={styles.imgMenu} source={IC_SMILE}/>
                </TouchableOpacity>
                <Button
                  isLoading={this.state.isLoading}
                  onPress={this.sendChat}
                  style={styles.btnSend}
                  textStyle={styles.txtSend}
                >{getString('SEND')}</Button>
              </View>
              : null
          }
        </KeyboardAvoidingView>
        {
          this.state.showMenu
            ? <View style={styles.viewBottom}>
              <View style={styles.viewChat}>
                <TextInput
                  ref={(v) => this.input2 = v}
                  onFocus={() => this.setState({ showMenu: false }, () => {
                    if (this.input1) {
                      this.input1.focus();
                    }
                  })}
                  style={styles.inputChat}
                  placeholder={ getString('WRITE_MESSAGE') }
                  placeholderTextColor={ colors.cloudyBlue }
                />
                <TouchableOpacity
                  style={styles.touchMenu}
                  onPress={this.showMenu}
                >
                  <Image style={styles.imgMenu} source={IC_SMILE}/>
                </TouchableOpacity>
                <Button
                  isLoading={this.state.isLoading}
                  onPress={this.sendChat}
                  style={styles.btnSend}
                  textStyle={styles.txtSend}
                >{getString('SEND')}</Button>
              </View>
              <View style={styles.viewMenu}/>
            </View>
            : null
        }
      </SafeAreaView>
    );
  }

  renderItem = ({ item }) => {
    return (
      <ChatListItem
        item={item}
      />
    );
  }

  sendChat = () => {
    console.log('sendChat');
  }

  showMenu = () => {
    console.log('showMenu');
    Keyboard.dismiss();
    this.setState({
      showMenu: !this.state.showMenu,
    });
  }

  goBack = () => {
    this.props.navigation.goBack();
  }
}

export default Screen;
