// @flow
import React from 'react'
import { View, KeyboardAvoidingView, ImageBackground } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat' // 0.3.0
import Fire from '../config/Fire'
import { connect } from 'react-redux'

class Chat extends React.Component {

  state = {
    messages: [],
  };

  get user() {
    return {
      name: this.props.username,
      _id: Fire.shared.uid,
      familyId: this.props.familyId,
      avatar: this.props.avatar
    };
  }

  render() {
    return (
      <ImageBackground 
      style={{ flex: 1 }}
      source={{uri:"https://cdn.pixabay.com/photo/2016/04/15/04/02/water-1330252_960_720.jpg"}}
      >
        <GiftedChat
          messages={this.state.messages}
          onSend={Fire.shared.send}
          user={this.user}
          renderUsernameOnMessage={true}
        />
        {
          Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
        }
      </ImageBackground>
    );
  }

  componentDidMount() {
    Fire.shared.on(message => {
      if (message.user.familyId == this.props.familyId) {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, message),
        }))
      }
    })
  }

  componentWillUnmount() {
    Fire.shared.off();
  }
}

const mapStateToProps = state => {
  return {
    familyId: state.user.data.familyId,
    username: state.user.data.username,
    avatar: state.user.data.avatar ? state.user.data.avatar : ''
  }
}

export default connect(mapStateToProps)(Chat);
