import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import Picture from "../assets/index";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import { parentUpdate, userLogout, getAllFamily } from "../store/action/userAction";
import { useDispatch, useSelector } from "react-redux";

export default function ParentSetting({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [birthday, setBirthday] = useState(
    moment(new Date()).format("MMMM D, YYYY")
  );
  const [birthdayStatus, setBirthStatus] = useState(false);
  const [image, setImage] = useState(null);
  const [imageSet, setStatusImageSet] = useState(false);

  useEffect(()=>{
    if (user.data.dateOfBirth) {
      setBirthday(moment(new Date(user.data.dateOfBirth)).format("MMMM D, YYYY") )
      setBirthStatus(true)
    }
    if (user.data.avatar) {
      setImage(user.data.avatar)
      setStatusImageSet(true)
    }
  },[user.data])

  useEffect(()=>{
    console.log(user.data);
  })

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = date => {
    setDatePickerVisibility(false);
    if (new Date(date) >= new Date()) {
      alert("astagfirullah");
    } else {
      setBirthday(moment(new Date(date)).format(" D MMMM YYYY"));
      setBirthStatus(true);
    }
  };

  const handleConfirm = date => {
    hideDatePicker(date);
  };

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const _pickImage = async () => {
    getPermissionAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setStatusImageSet(true);
    }
  };

  const submitHandle = () => {
    const payload = {
      dateOfBirth: birthday,
      avatar: image,
    };
    dispatch(
      parentUpdate({
        payload,
        token: user.token,
        id : user.data._id
      })
    );
    navigation.navigate('family')
    dispatch(getAllFamily({
      token: user.token
    }))
  };

  const logout = () => {
    dispatch(userLogout())
    navigation.navigate('login')
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperFormWrapper}></View>
        <SafeAreaView style={styles.downFormWrapper}>
            <Image
              source={Picture.backgroundTransparent}
              style={{
                width: "150%",
                position: "absolute",
                resizeMode: "contain",
                zIndex: 0,
              }}
            />
            <Image
              source={Picture.kidsGirl}
              style={{
                width: "30%",
                position: "absolute",
                resizeMode: "contain",
                zIndex: 3,
                bottom: -150,
                right: -10,
              }}
            />
              <View style={styles.downFormWrapper}>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  {imageSet ? (
                    <TouchableOpacity onPress={_pickImage}>
                      <Image
                        source={{ uri: image }}
                        style={{
                          width: 200,
                          height: 200,
                          borderRadius: 30,
                          marginTop: 15,
                        }}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={_pickImage}>
                      <View
                        style={{
                          width: 200,
                          height: 200,
                          borderRadius: 30,
                          marginTop: 15,
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#efefef",
                        }}
                      >
                        <MaterialCommunityIcons
                          name="image-search"
                          size={90}
                          color="#00BFFF"
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
                <View>
                  {!birthdayStatus ? (
                    <TouchableOpacity
                      style={styles.birthBtn}
                      onPress={showDatePicker}
                    >
                      <AntDesign
                        name="calendar"
                        size={25}
                        color="#00BFFF"
                        style={{ marginRight: 5 }}
                      />
                      <Text style={styles.birthday}>BirthDay</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.birthBtn}
                      onPress={showDatePicker}
                    >
                      <AntDesign
                        name="calendar"
                        size={25}
                        color="#00BFFF"
                        style={{ marginRight: 5 }}
                      />
                      <Text style={styles.birthday}>{birthday}</Text>
                    </TouchableOpacity>
                  )}
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                </View>
                <TouchableOpacity style={styles.submit} onPress={submitHandle}>
                  <Text style={styles.register}>Submit</Text>
                </TouchableOpacity>
                <View style={{ justifyContent: 'flex-end', flex: 1 }} >
                  <TouchableOpacity style={styles.logout} onPress={logout}>
                    <Text style={styles.register}>Logout</Text>
                  </TouchableOpacity>
                </View>
              </View>
          </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 30,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  upperFormWrapper: {
    flex: 1,
    width: "100%",
    paddingVertical: "4%",
    paddingHorizontal: "10%",
    backgroundColor: "#00BFFF",
    borderBottomRightRadius: 30,
    zIndex: 2,
  },
  title: {
    fontFamily: "sf-semibold",
    fontSize: 30,
    color: "white",
    shadowColor: "white",
    marginTop: 7,
    shadowOffset: {
      width: 10,
      height: 3,
    },
    shadowOpacity: 0.44,
    shadowRadius: 3,
    elevation: 15,
  },
  logout: {
    backgroundColor: "#DB5C5D",
    width: "40%",
    paddingHorizontal: 40,
    marginBottom: 20,
    borderRadius: 100,
    alignItems: "center",
    marginTop: 50,
    shadowColor: "#512DA8",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.44,
    shadowRadius: 3,
    elevation: 5,
  },
  downFormWrapper: {
    flex: 25,
    // backgroundColor: "white",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#512DA8",
  },
  scroolView: {
    zIndex: 2,
    flex: 25,
    // backgroundColor: "white",
    width: "100%",
  },
  input: {
    textAlign: "center",
    borderWidth: 1,
    width: "80%",
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginVertical: 5,
    backgroundColor: "white",
    borderColor: "#00BFFF",
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
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginTop: -60,
  },
  submit: {
    backgroundColor: "#00BFFF",
    width: "70%",
    marginBottom: 20,
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
  birthBtn: {
    justifyContent: "center",
    flexDirection: "row",
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
  register: {
    color: "white",
    paddingVertical: 5,
    fontFamily: "sf-semibold",
    fontSize: 16,
    letterSpacing: 1.5,
  },
  birthday: {
    color: "#00BFFF",
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
