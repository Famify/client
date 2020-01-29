import firebase from "firebase"; // 4.8.1
import React from 'react'
import {
  FIRE_API_KEY,
  FIRE_AUTH_DOMAIN,
  FIRE_DATABASE_URL,
  FIRE_PROJECT_ID,
  FIRE_STORAGE_BUCKET,
  FIRE_MESSAGING_SENDER_ID
} from 'react-native-dotenv'
import TextLink from '../components/textLink'

class Fire {
  constructor() {
    this.init();
    this.observeAuth();
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: FIRE_API_KEY,
        authDomain: FIRE_AUTH_DOMAIN,
        databaseURL: FIRE_DATABASE_URL,
        projectId: FIRE_PROJECT_ID,
        storageBucket: FIRE_STORAGE_BUCKET,
        messagingSenderId: FIRE_MESSAGING_SENDER_ID
      });
    }
  };

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref("messages");
  }

  parse = snapshot => {
    let { timestamp: numberStamp, text, user, image } = snapshot.val()

    const textMessage = () => {

      let chunks, navigateTo, id
      if (text.includes(':') && text.includes('—') && text.includes('link to')) {
        const firstChunk = text.split('—')
        chunks = [firstChunk[0], ...firstChunk[1].split(':')]

        navigateTo = chunks[1].trim().includes("challenge")
          ? "detail challenge"
          : navigateTo = chunks[1].trim().includes("reward")
            ? "detail reward" : null
        id = chunks[2].trim()

        return <TextLink
          navigateTo={navigateTo}
          text={text}
          id={id}
        />
      }

      return text
    }

    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text: text ? textMessage() : '',
      image: image ? image : '',
      user
    };
    return message;
  };

  on = callback =>
    this.ref
      .limitToLast(20)
      .on("child_added", snapshot => {
        callback(this.parse(snapshot))
      });

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {

      const { text, user, image } = messages[i];
      let displayedImage = image ? image : ''

      const message = {
        image: displayedImage,
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  sendImage = messages => {
    for (let i = 0; i < messages.length; i++) {

      const { user, image } = messages[i];
      let displayedImage = image ? image : ''

      const message = {
        image: displayedImage,
        user,
        text: '',
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  }

  append = message => this.ref.push(message);

  // close the connection to the Backend
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;
