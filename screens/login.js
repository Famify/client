import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Picker,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import Picture from "../assets/index";
import { withNavigation } from "react-navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  parentLogin,
  childLogin,
  clearError,
} from "../store/action/userAction";

function Login({ navigation }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginBy, setLoginBy] = useState("parent");
  const user = useSelector(state => state.user);
  const [done, setDone] = useState(true);

  const moveRegister = () => {
    dispatch(clearError());
    navigation.navigate("register");
  };

  useEffect(() => {
    if (user.isLogin) {
      if (user.data.role) {
        navigation.navigate(`${user.data.role} dashboard`);
        dispatch(clearError())
      }
    }
  }, [user.isLogin]);

  const handleSubmit = async () => {
    const payload = {
      identity: username,
      password,
    };
    setDone(false);
    if (loginBy === "parent") {
      await dispatch(parentLogin(payload));
    } else {
      await dispatch(childLogin(payload));
    }
    setDone(true);
  };

  const inputUsername = input => {
    setUsername(input);
  };

  const inputPassword = input => {
    setPassword(input);
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
      {user.loading ? (
         <>
         <View style={styles.upperFormWrapper}>
           <Text style={styles.title}>Sign In</Text>
         </View>
         <KeyboardAvoidingView
           style={styles.downFormWrapper}
           enabled
           behavior="padding"
         >
           <Image source={Picture.logoFamify} style={styles.image} />
           <TextInput
             style={styles.input1}
             placeholder="username or email"
             onChangeText={text => inputUsername(text)}
             value={username}
             autoCapitalize="none"
           />
           <TextInput
             style={styles.input}
             placeholder="password"
             onChangeText={text => setPassword(text)}
             secureTextEntry={true}
             autoCapitalize="none"
           />
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
           <Picker
             selectedValue={loginBy}
             style={{ height: 50, width: 140 }}
             onValueChange={(itemValue, itemIndex) => setLoginBy(itemValue)}
           >
             <Picker.Item label="Parent" value="parent" />
             <Picker.Item label="Children" value="children" />
           </Picker>
         </KeyboardAvoidingView>
       </>
      ) : user.error ? (
        <>
          {Alert.alert(
            "Warning!",
            `${user.error}`,
            [{ text: "OK", onPress: () => dispatch(clearError()) }],
            { cancelable: false }
          )}
          <View style={styles.upperFormWrapper}>
            <Text style={styles.title}>Sign In</Text>
          </View>
          <KeyboardAvoidingView
            style={styles.downFormWrapper}
            enabled
            behavior="padding"
          >
            <Image source={Picture.logoFamify} style={styles.image} />
            <TextInput
              style={styles.input1}
              placeholder="username or email"
              onChangeText={text => inputUsername(text)}
              value={username}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="password"
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              autoCapitalize="none"
            />
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
            <Picker
              selectedValue={loginBy}
              style={{ height: 50, width: 140 }}
              onValueChange={(itemValue, itemIndex) => setLoginBy(itemValue)}
            >
              <Picker.Item label="Parent" value="parent" />
              <Picker.Item label="Children" value="children" />
            </Picker>
          </KeyboardAvoidingView>
        </>
      ) : (
        <>
          <View style={styles.upperFormWrapper}>
            <Text style={styles.title}>Sign In</Text>
          </View>
          <KeyboardAvoidingView
            style={styles.downFormWrapper}
            enabled
            behavior="padding"
          >
            <Image source={Picture.logoFamify} style={styles.image} />
            <TextInput
              style={styles.input1}
              placeholder="username or email"
              onChangeText={text => inputUsername(text)}
              value={username}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="password"
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              autoCapitalize="none"
            />
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
            <Picker
              selectedValue={loginBy}
              style={{ height: 50, width: 140 }}
              onValueChange={(itemValue, itemIndex) => setLoginBy(itemValue)}
            >
              <Picker.Item label="Parent" value="parent" />
              <Picker.Item label="Children" value="children" />
            </Picker>
          </KeyboardAvoidingView>
        </>
      )}
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
    width: 280,
    height: 250,
    top: -60,
    resizeMode: 'contain'
  },
  input1: {
    borderWidth: 1,
    width: "80%",
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: -140,
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
