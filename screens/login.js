import React from "react";
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
import { withNavigation } from "react-navigation";

function Login({ navigation }) {
  const moveRegister = () => {
    navigation.navigate("register");
  };

  const handleSubmit = () => {
    navigation.navigate("child dashboard");
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperFormWrapper}>
        <Text style={styles.title}>Sign In</Text>
      </View>
      <View style={styles.downFormWrapper}>
        <Image source={Picture.register} style={styles.image} />
        <TextInput style={styles.input} placeholder="username or email" />
        <TextInput style={styles.input} placeholder="family code" />
        <TextInput style={styles.input} placeholder="password" />
        <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
          <Text style={styles.login}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={moveRegister}>
          <Text
            style={{
              marginTop: 20,
              fontFamily: "sf-regular",
              fontSize: 14,
              color: "#512DA8",
            }}
          >
            Don't have account ?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default withNavigation(Login);

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 30,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#512DA8",
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
  login: {
    color: "white",
    paddingVertical: 5,
    fontFamily: "sf-semibold",
    fontSize: 16,
    letterSpacing: 1.5,
  },
});
