import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import Picture from "../assets/index";
import { useDispatch, useSelector } from "react-redux";
import {
  parentRegister,
  clearError,
  clearRegisterStatus,
  checkLogin,
} from "../store/action/userAction";

export default function Register({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(true);

  const dispatch = useDispatch();
  const { register, isLogin, loading, error, data } = useSelector(
    state => state.user
  );

  const moveLogin = () => {
    dispatch(clearError());
    navigation.navigate("login");
  };

  useEffect(() => {
    dispatch(checkLogin());
  }, []);

  useEffect(() => {
    if (isLogin) {
      navigation.navigate(`${data.role} dashboard`);
    }
  }, [isLogin]);

  useEffect(() => {
    if (register) {
      navigation.navigate("login");
      dispatch(clearRegisterStatus());
      Alert.alert(
        "Success!",
        `Register Success`,
        [{ text: "OK", onPress: () => dispatch(clearError()) }],
        { cancelable: false }
      );
    }
  }, [register]);

  const inputUsername = input => {
    setUsername(input);
  };

  const inputEmail = input => {
    setEmail(input);
  };

  const inputPassword = input => {
    setPassword(input);
  };

  const submitRegister = async () => {
    let payload = {
      username,
      email,
      password,
    };
    setDone(false);
    dispatch(parentRegister(payload));
    setDone(true);
  };

  if (!done) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Image
          source={Picture.loading}
          style={{ width: "100%", resizeMode: "contain" }}
        />
        <Image
          source={Picture.loading3}
          style={{
            width: "100%",
            position: "absolute",
            resizeMode: "contain",
            bottom: 10,
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <View style={styles.upperFormWrapper}>
            <Text style={styles.title}>Sign Up</Text>
          </View>
          <KeyboardAvoidingView
            style={styles.downFormWrapper}
            enabled
            behavior="padding"
          >
            <Image source={Picture.register} style={styles.image} />
            <TextInput
              value={username}
              onChangeText={text => inputUsername(text)}
              style={styles.input}
              placeholder="username"
              autoCapitalize="none"
            />
            <TextInput
              value={password}
              style={styles.input}
              placeholder="password"
              secureTextEntry={true}
              onChangeText={text => inputPassword(text)}
              autoCapitalize="none"
            />
            <TextInput
              value={email}
              onChangeText={text => inputEmail(text)}
              style={styles.input}
              placeholder="email"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.submit} onPress={submitRegister}>
              <Text style={styles.register}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={moveLogin}>
              <Text style={styles.moveLogin}>Already have account ?</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </>
      ) : error ? (
        <>
          {Alert.alert(
            "Warning!",
            `${error}`,
            [{ text: "OK", onPress: () => dispatch(clearError()) }],
            { cancelable: false }
          )}
          <View style={styles.upperFormWrapper}>
            <Text style={styles.title}>Sign Up</Text>
          </View>
          <KeyboardAvoidingView
            style={styles.downFormWrapper}
            enabled
            behavior="padding"
          >
            <Image source={Picture.register} style={styles.image} />
            <TextInput
              value={username}
              onChangeText={text => inputUsername(text)}
              style={styles.input}
              placeholder="username"
              autoCapitalize="none"
            />
            <TextInput
              value={password}
              style={styles.input}
              placeholder="password"
              secureTextEntry={true}
              onChangeText={text => inputPassword(text)}
              autoCapitalize="none"
            />
            <TextInput
              value={email}
              onChangeText={text => inputEmail(text)}
              style={styles.input}
              placeholder="email"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.submit} onPress={submitRegister}>
              <Text style={styles.register}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={moveLogin}>
              <Text style={styles.moveLogin}>Already have account ?</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </>
      ) : (
        <>
          <View style={styles.upperFormWrapper}>
            <Text style={styles.title}>Sign Up</Text>
          </View>
          <KeyboardAvoidingView
            style={styles.downFormWrapper}
            enabled
            behavior="padding"
          >
            <Image source={Picture.register} style={styles.image} />
            <TextInput
              value={username}
              onChangeText={text => inputUsername(text)}
              style={styles.input}
              placeholder="username"
              autoCapitalize="none"
            />
            <TextInput
              value={password}
              style={styles.input}
              placeholder="password"
              secureTextEntry={true}
              onChangeText={text => inputPassword(text)}
              autoCapitalize="none"
            />
            <TextInput
              value={email}
              onChangeText={text => inputEmail(text)}
              style={styles.input}
              placeholder="email"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.submit} onPress={submitRegister}>
              <Text style={styles.register}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={moveLogin}>
              <Text style={styles.moveLogin}>Already have account ?</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    width: "100%",
    backgroundColor: "#512DA8",
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
  birthday: {
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
