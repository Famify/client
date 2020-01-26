// @flow
import React from 'react'
import { View, KeyboardAvoidingView } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat' // 0.3.0
import Fire from '../config/Fire'

class Chat extends React.Component {

  // static navigationOptions = ({ navigation }) => ({
  //   title: (navigation.state.params || {}).name || 'Chat!',
  // });

  state = {
    messages: [],
  };

  get user() {
    return {
      name: 'User',
      _id: Fire.shared.uid,
    };
  }

  render() {
    return (
      // <KeyboardAvoidingView behavior="padding" enabled>
        <GiftedChat
          messages={this.state.messages}
          onSend={Fire.shared.send}
          user={this.user}
        />
      /* </KeyboardAvoidingView> */
    );
  }

  componentDidMount() {
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    Fire.shared.off();
  }
}

export default Chat;
