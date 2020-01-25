import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import Picture from "../assets/index";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../store/action/userAction";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import moment from "moment";
import * as ImagePicker from 'expo-image-picker';

export default function Register({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [birthday, setBirthday] = useState(moment(new Date()).format("MMMM D, YYYY"))
  const [birthdayStatus, setBirthStatus] = useState(false)
  const [image, setImage] = useState(null)
  const [imageSet, setStatusImageSet] = useState(false)

  const moveLogin = () => {
    navigation.navigate("login");
  };

  const inputUsername = input => {
    setUsername(input);
  };

  const inputEmail = input => {
    setEmail(input);
  };

  const inputPassword = input => {
    setPassword(input);
  };

  const submitRegister = () => {
    let payload = {
      username,
      email,
      password,
    };
    dispatch(userRegister(payload));
    // navigation.navigate("login");
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  
  const hideDatePicker = date => {
    setDatePickerVisibility(false);
    if ( new Date(date) >= new Date()) {
      alert('astagfirullah')
    } else {
      setBirthday(moment(new Date(date)).format(" D MMMM YYYY"))
      setBirthStatus(true)
    }
  };

  const handleConfirm = date => {
    hideDatePicker(date)
  };

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  const _pickImage = async () => {
    getPermissionAsync()
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    if (!result.cancelled) {
      setImage(result.uri);
      setStatusImageSet(true)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperFormWrapper}>
        <Text style={styles.title}>Sign Up</Text>
      </View>
      <View style={styles.downFormWrapper}>
        <Image source={Picture.register} style={styles.image} />
        <TextInput
          value={username}
          onChangeText={text => inputUsername(text)}
          style={styles.input}
          placeholder="username"
        />
        <View>
          {
            !birthdayStatus ? 
              <TouchableOpacity style={styles.birthBtn} onPress={showDatePicker}>
                <AntDesign name="calendar" size={25} color="#EE7600" style={{ marginRight: 5 }} />
                <Text style={styles.birthday}>BirthDay</Text>
              </TouchableOpacity>
            :
            <TouchableOpacity style={styles.birthBtn} onPress={showDatePicker}>
              <AntDesign name="calendar" size={25} color="#EE7600" style={{ marginRight: 5 }} />
              <Text style={styles.birthday}>{ birthday }</Text>
            </TouchableOpacity>
          }
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <TextInput
          value={password}
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={text => inputPassword(text)}
        />
        <TextInput
          value={email}
          onChangeText={text => inputEmail(text)}
          style={styles.input}
          placeholder="email"
        />
        {
          imageSet ? 
          <TouchableOpacity onPress={_pickImage}>
            <Image source={{uri: image}} style={{ width: 200, height: 200, borderRadius:30, marginTop: 15 }} />
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={_pickImage}>
            <View style={{ width: 200, height: 200, borderRadius:30, marginTop: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#efefef' }}>
              <MaterialCommunityIcons name="image-search" size={90} color="#EE7600" />
            </View>
          </TouchableOpacity>
        }
        <TouchableOpacity style={styles.submit} onPress={submitRegister}>
          <Text style={styles.register}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={moveLogin}>
          <Text style={styles.moveLogin}>Already have account ?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 30,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#512DA8",
  },
  birthBtn:{
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: "white",
    width: 250,
    borderRadius: 100,
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#512DA8",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.44,
    shadowRadius: 3,
    elevation: 5,
  },
  birthday : {
    color: "#EE7600",
    paddingVertical: 5,
    fontFamily: "sf-semibold",
    fontSize: 16,
    letterSpacing: 1.5,
  },
  upperFormWrapper: {
    flex: 1,
    width: "100%",
    paddingVertical: "10%",
    paddingHorizontal: "10%",
    backgroundColor: "#512DA8",
  },
  title: {
    fontFamily: "sf-semibold",
    fontSize: 36,
    color: "white",
    shadowColor: "white",
    shadowOffset: {
      width: 10,
      height: 3,
    },
    shadowOpacity: 0.44,
    shadowRadius: 3,
    elevation: 15,
  },
  downFormWrapper: {
    flex: 25,
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 200,
    borderBottomRightRadius: 200,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#512DA8",
  },
  input: {
    borderWidth: 1,
    width: "80%",
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "white",
    borderColor: "#512DA8",
    borderRadius: 100,
    borderWidth: 1.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.44,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: 250,
    height: 250,
    position: "absolute",
    top: -15,
  },
  submit: {
    backgroundColor: "#512DA8",
    width: "80%",
    borderRadius: 100,
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#512DA8",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.44,
    shadowRadius: 3,
    elevation: 5,
  },
  register: {
    color: "white",
    paddingVertical: 5,
    fontFamily: "sf-semibold",
    fontSize: 16,
    letterSpacing: 1.5,
  },
  moveLogin: {
    marginTop: 20,
    fontFamily: "sf-regular",
    fontSize: 14,
    color: "#512DA8",
  },
});
