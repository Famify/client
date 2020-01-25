import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Picker,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function ImageReward(props) {
  const [pict, setPict] = useState("");
  const [poin, setPoin] = useState();

  const listPoin = [5, 10, 15, 20, 25];

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
      aspect: [6, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result.uri);
      setPict(result.uri);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{
          marginTop: 10,
          flex: 1,
          width: "100%",
          padding: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 30, fontFamily: "sf-medium" }}>
          Image and Point
        </Text>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: "70%",
              height: 250,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            {!pict ? (
              <Ionicons
                name="ios-images"
                size={150}
                color="#512DA8"
                style={{ marginRight: 10 }}
              />
            ) : (
              <Image
                source={{ uri: `${pict}` }}
                style={{ width: "100%", height: "100%", resizeMode: "cover" }}
              />
            )}
          </View>
          <TouchableOpacity
            style={styles.pickImage}
            onPress={getPermissionAsync}
          >
            <Text style={styles.pickText}>Pick Image</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "80%",
            marginTop: 40,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ backgroundColor: "#7CB342", borderRadius: 50 }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "sf-medium",
                paddingHorizontal: 20,
                paddingVertical: 5,
                color: "white",
              }}
            >
              Set Point
            </Text>
          </View>
          <Picker
            selectedValue={poin}
            style={{ width: "50%", fontFamily: "sf-medium" }}
            onValueChange={(value, index) => {
              setPoin(value);
            }}
          >
            <Picker.Item label="5" value={5} />
            <Picker.Item label="10" value={10} />
            <Picker.Item label="15" value={15} />
            <Picker.Item label="20" value={20} />
            <Picker.Item label="25" value={25} />
          </Picker>
        </View>
      </View>
      <View style={{ flex: 1 / 3, width: "80%", alignItems: "flex-end" }}>
        <TouchableOpacity style={styles.submit}>
          <Text style={styles.next}>Submit Challenge</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  submit: {
    backgroundColor: "#DD2C00",
    width: "50%",
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
  pickImage: {
    backgroundColor: "#7CB342",
    width: "40%",
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
  pickText: {
    color: "white",
    paddingVertical: 5,
    fontFamily: "sf-semibold",
    fontSize: 16,
    letterSpacing: 1.5,
  },
  next: {
    color: "white",
    paddingVertical: 5,
    fontFamily: "sf-semibold",
    fontSize: 16,
    letterSpacing: 1.5,
  },
});
