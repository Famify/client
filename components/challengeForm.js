import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function ChallengeForm(props) {
  const [image, setImage] = useState(
    "https://assets.materialup.com/uploads/66952ab5-a470-4bff-8b4d-6558c412d354/preview.png"
  );

  const getPermissionAsync = async () => {
    if (Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      } else {
        _pickImage();
      }
    }
  };

  const _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [8, 12],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View
      style={{
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        marginTop: Constants.statusBarHeight,
      }}
    >
      <View style={{ flex: 1 / 4, backgroundColor: "red", width: "100%" }}>
        <Text>Ini background</Text>
      </View>
      <ScrollView style={{ flex: 2, width: "100%" }}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "90%",
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 30, fontFamily: "sf-semibold" }}>
              New Challenge
            </Text>
            <View
              style={{
                width: "100%",
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <TextInput style={styles.input} placeholder="title" />
              <TextInput style={styles.input} placeholder="description" />
              <TextInput style={styles.input} placeholder="poin" />
              <Image
                source={{ uri: `${image}` }}
                style={{ width: 300, height: 300, resizeMode: "contain" }}
              />
              <TouchableOpacity
                style={styles.submit}
                onPress={getPermissionAsync}
              >
                <Text style={styles.addChallenge}>Add Image</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submit}>
                <Text style={styles.addChallenge}>Create Challenge</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
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
  addChallenge: {
    color: "white",
    paddingVertical: 5,
    fontFamily: "sf-semibold",
    fontSize: 16,
    letterSpacing: 1.5,
  },
});
