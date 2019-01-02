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
  Platform,
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
    minHeight: 52,
    maxHeight: 100,

    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  inputChat: {
    width: '80%',
    fontSize: 14,
    marginRight: 20,
    paddingLeft: 48,
    color: 'black',
  },
  touchMenu: {
    position: 'absolute',
    left: 10,
    height: '100%',
    minWidth: 20,
    justifyContent: 'center',
  },
  imgMenu: {
    width: 20,
    height: 20,
  },
  btnSend: {
    right: 8,
    backgroundColor: colors.dodgerBlue,
    borderRadius: 4,
    width: 60,
    height: 36,

    alignItems: 'center',
    justifyContent: 'center',
  },
  txtSend: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 5,
    paddingVertical: 10,
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
  message: string,
};

class Screen extends Component<Props, State> {
  static navigationOptions = {
    title: getString('CHAT'),
  };

  input1: any;
  input2: any;
  keyboardDidShowListener: any;
  keyboardDidHideListener: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      showMenu: false,
      message: '',
      chats: [
        {
          id: '0',
          sender: '0',
          img: null,
          message: 'hello',
          date: new Date(0),
          isPeer: true,
        },
        {
          id: '1',
          sender: '1',
          img: null,
          message: 'hello',
          date: new Date(0),
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
          behavior={Platform.select({
            'android': null,
            'ios': 'padding',
          })}
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
                  multiline={true}
                  placeholder={ getString('WRITE_MESSAGE') }
                  placeholderTextColor={ colors.cloudyBlue }
                  value={this.state.message}
                  defaultValue={this.state.message}
                  onChangeText={(text) => this.setState({ message: text })}
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
                  multiline={true}
                  onFocus={() => this.setState({ showMenu: false }, () => {
                    if (this.input1) {
                      this.input1.focus();
                    }
                  })}
                  style={styles.inputChat}
                  placeholder={ getString('WRITE_MESSAGE') }
                  placeholderTextColor={ colors.cloudyBlue }
                  value={this.state.message}
                  defaultValue={this.state.message}
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

  renderItem = ({ item } : any) => {
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
