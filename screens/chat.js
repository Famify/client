// @flow
import React from 'react'
import { KeyboardAvoidingView, ImageBackground } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat' // 0.3.0
import Fire from '../config/Fire'
import { connect } from 'react-redux'
import Picture from '../assets'

class Chat extends React.Component {
  state = {
    messages: [],
  };

  get user() {
    return {
      name: this.props.username,
      _id: Fire.shared.uid,
      familyId: this.props.familyId,
      avatar: this.props.avatar,
    };
  }

  render() {
    const displayedMessages = this.state.messages.slice().sort((a, b) => b.timestamp - a.timestamp)

    return (
      <ImageBackground style={{ flex: 1 }} source={Picture.messageBackground}>
        <GiftedChat
          messages={displayedMessages}
          onSend={Fire.shared.send}
          user={this.user}
          renderUsernameOnMessage={true}
        />
        {Platform.OS === "android" && (
          <KeyboardAvoidingView behavior="padding" />
        )}
      </ImageBackground>
    );
  }

  componentDidMount() {
    Fire.shared.on(message => {
      if (message.user.familyId == this.props.familyId) {
        console.log('---MESSAGE YG AKAN DIAPPEND---', message);
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, message),
          // messages: [...previousState.messages, message]
        }));
      }
    });
  }

  componentWillUnmount() {
    Fire.shared.off();
  }
}

const mapStateToProps = state => {
  return {
    familyId: state.user.data.familyId,
    username: state.user.data.username,
    avatar: state.user.data.avatar ? state.user.data.avatar : "",
  };
};

export default connect(mapStateToProps)(Chat);
