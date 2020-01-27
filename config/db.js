const firebase = require('firebase/app')
require('firebase/database')

import {
  FIRE_API_KEY,
  FIRE_AUTH_DOMAIN,
  FIRE_DATABASE_URL,
  FIRE_PROJECT_ID,
  FIRE_STORAGE_BUCKET,
  FIRE_MESSAGING_SENDER_ID
} from 'react-native-dotenv'

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

var db = firebase.database()
module.exports = db