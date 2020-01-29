// @flow
import React from 'react'
import { KeyboardAvoidingView, ImageBackground, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat' // 0.3.0
import Fire from '../config/Fire'
import { connect } from 'react-redux'
import Picture from '../assets'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import * as ImagePicker from "expo-image-picker"
import axios from "../config/axios"
import { AsyncStorage } from "react-native"

class Chat extends React.Component {
  state = {
    messages: [],
    renderPickImageActive: false
  };

  get user() {
    return {
      name: this.props.username,
      _id: Fire.shared.uid,
      familyId: this.props.familyId,
      avatar: this.props.avatar,
    };
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }

  cameraPick = async () => {
    let cameraPick = await ImagePicker.launchCameraAsync({
      allowsEditing: true
    })

    if (!cameraPick.cancelled) {
      this.setState({ renderPickImageActive: false })
      this.postImage(cameraPick.uri)
    }
  }

  libraryPick = async () => {
    let libraryPick = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!libraryPick.cancelled) {
      this.setState({ renderPickImageActive: false })
      this.postImage(libraryPick.uri)
    }
  }

  postImage = async (imageUri) => {
    try {
      if (imageUri) {
        let data = new FormData()
        data.append('image', {
          uri: imageUri,
          name: `${imageUri}`,
          type: "image/jpg"
        })

        const token = await AsyncStorage.getItem("token")
        const response = await axios({
          url: "/image",
          method: "POST",
          data,
          headers: {
            access_token: token,
            "Content-Type": "multipart/form data"
          }
        })

        Fire.shared.sendImage([
          {
            image: response.data,
            user: this.user
          }
        ])

      } else {
        alert('Gambar harus dimasukkan.')
      }

    } catch (error) {
      alert(JSON.stringify(error))
    }
  }

  renderPickImageOptions = () => {
    return (
      <View
        style={this.styles.pickImageOptionsContainer}
      >
        <TouchableOpacity
          style={this.styles.pickImageOptionsButton}
          onPress={this.libraryPick}
        >
          <Text>Choose from library</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={this.styles.pickImageOptionsButton}
          onPress={this.cameraPick}
        >
          <Text>Take a camera picture</Text>
        </TouchableOpacity>
      </View>
    )
  }

  toggleRenderPickImageActive = () => {
    this.state.renderPickImageActive
      ? this.setState({ renderPickImageActive: false })
      : this.setState({ renderPickImageActive: true })
  }

  render() {
    const displayedMessages = this.state.messages.slice().sort((a, b) => b.timestamp - a.timestamp)
    const { navigate } = this.props.navigation

    return (
      <>
        <View
          style={this.styles.mainContainer}
        >
          <TouchableOpacity
            onPress={() => { navigate(`${this.props.role} dashboard`) }}
            style={{ marginLeft: 10 }}
          >
            <MaterialIcon name="arrow-back" size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.toggleRenderPickImageActive}
            style={{ marginRight: 10 }}
          >
            <MaterialIcon name="photo-camera" size={30} />
          </TouchableOpacity>
        </View>
        {
          this.state.renderPickImageActive && this.renderPickImageOptions()
        }
        <ImageBackground style={{ flex: 1 }} source={Picture.messageBackground}>
          <GiftedChat
            messages={displayedMessages}
            onSend={Fire.shared.send}
            user={this.user}
            renderUsernameOnMessage={true}
          />
        </ImageBackground>
        {Platform.OS === "android" && (
          <KeyboardAvoidingView behavior="padding" />
        )}
      </>
    );
  }

  styles = StyleSheet.create({
    mainContainer: {
      height: 50, marginTop: 15, paddingHorizontal: 10, justifyContent: 'space-between', flexDirection: "row", alignItems: "center"
    },
    pickImageOptionsContainer: {
      flexDirection: "row", justifyContent: "space-around", paddingBottom: 10
    },
    pickImageOptionsButton: {
      borderWidth: 0.5, padding: 10, borderRadius: 10, borderColor: "gray"
    }
  })

  componentDidMount() {
    Fire.shared.on(message => {
      if (message.user.familyId == this.props.familyId) {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, message),
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
    role: state.user.data.role
  };
};

export default connect(mapStateToProps)(Chat);
