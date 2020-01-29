import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { withNavigation } from "react-navigation";
import Constants from "expo-constants";
import Picture from "../assets/index";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import db from "../config/db";

function ChildDashboard({ navigation }) {
  const user = useSelector(state => state.user.data);

  const family = () => {
    navigation.navigate("family child");
  };

  const child = useSelector(state => {
    return state.user.data;
  });

  function addLocation(latitude, longitude) {
    db.ref(`locations/${child._id}`)
      .set({
        longitude,
        latitude,
        familyId: child.familyId,
        avatar: child.avatar,
        name: child.username,
      })
      .then(data => { })
      .catch(err => {
        alert(JSON.stringify(err));
      });
  }

  const findCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = JSON.stringify(position.coords.latitude);
        const longitude = JSON.stringify(position.coords.longitude);

        addLocation(latitude, longitude);
      },
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 }
    );
  };

  const challenge = () => {
    navigation.navigate("challenge child", { back: user.role });
  };

  const reward = () => {
    navigation.navigate("reward child", { back: user.role });
  };

  useEffect(() => {
    findCurrentLocation();
  });

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: 'white', height: 90, width: "100%", flexDirection: 'row' }}>
      {user.avatar ? (
        <Image
          source={{ uri: user.avatar }}
          style={styles.circle}
        />
        ) : (
        <Image
          source={{ uri: "https://storage.googleapis.com/famify_bucket/1580270232285-default.png" }}
          style={styles.circle}
        />
      )}
      <View style={{ flexDirection: 'column', justifyContent: 'center', marginLeft: 5 }}>
        <Text style={styles.fontCardRole}>
          <Text style={styles.fontCardName}>
            Hi, {user.username} !
          </Text>
        </Text>
        <Text style={styles.fontCardRole2}>
          {user.role}
        </Text>
      </View>
      </View>
      <LinearGradient
        style={styles.topWrapper}
        colors={["white", "white"]}
      ></LinearGradient>
      <ImageBackground
        style={styles.downWraper}
        source={Picture.parentDashboard}
      >
        <Image
          style={{
            width: "85%",
            height: "90%",
            resizeMode: "contain",
            position: "absolute",
            top: -360,
            left: 40,
          }}
          source={Picture.family3}
        />
        <ScrollView
          horizontal={true}
          style={{
            marginTop: 50,
            marginBottom: -50,
            flex: 4,
          }}
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity onPress={family}>
            <LinearGradient
              colors={["#004D40", "#9575CD"]}
              style={styles.gradientCard}
            >
              <Image source={Picture.family2} style={styles.firstSecond} />
              <Text style={styles.titleCard}>Family</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={challenge}>
            <LinearGradient
              style={styles.gradientCard}
              colors={["#FF3D00", "#9575CD"]}
            >
              <Image source={Picture.challange1} style={styles.firstSecond} />
              <Text style={styles.titleCard}>Challenges</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={reward}>
            <LinearGradient
              style={styles.gradientCard}
              colors={["#FFFF00", "#9575CD"]}
            >
              <Image source={Picture.challange2} style={styles.third} />
              <Text style={styles.titleCard}>Rewards</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
        <View
          style={{
            flex: 1 / 2,
            marginBottom: 100,
            marginTop: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: "90%",
            }}
            onPress={() => {
              // alert("CLICK")
              navigation.navigate("message", { back: user.role })
            }}
          >
            <LinearGradient
              style={styles.gradientChat}
              colors={["#4FC3F7", "#00796B"]}
            >
              <Image source={Picture.chat1} style={styles.imageChat} />
              <Text style={styles.titleChat}>Chat Room</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

export default withNavigation(ChildDashboard);

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
    flex: 7,
  },
  topWrapper: {
    flex: 3,
    width: "100%",
  },
  downWraper: {
    flex: 4,
    width: "100%",
    marginTop: -260,
    marginBottom: -100,
    resizeMode: "contain",
    backgroundColor: "white",
  },
  firstSecond: {
    width: "70%",
    resizeMode: "contain",
  },
  fontCardName: {
    fontSize: 20,
  },
  fontCardRole: {
    fontFamily: "sf-semibold",
    fontSize: 15,
    marginTop: 5,
    marginLeft: 5
  },
  fontCardRole2: {
    fontFamily: "sf-semibold",
    fontSize: 15,
    marginTop: -15,
    marginLeft: 5
  },
  third: {
    width: "70%",
    height: "50%",
    resizeMode: "contain",
  },
  gradientCard: {
    height: 300,
    width: 200,
    borderRadius: 75,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.48,
    shadowRadius: 12,
    elevation: 5,
  },
  gradientChat: {
    width: "100%",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.48,
    shadowRadius: 12,
    elevation: 5,
  },
  titleCard: {
    zIndex: 5,
    position: "absolute",
    bottom: 30,
    fontFamily: "sf-medium",
    fontSize: 20,
    letterSpacing: 2,
    color: "white",
  },
  imageChat: {
    width: "20%",
    height: "50%",
  },
  titleChat: {
    fontSize: 20,
    fontFamily: "sf-medium",
    letterSpacing: 2,
    color: "white",
  },
  circle: {
    backgroundColor: "white",
    height: 60,
    width: 60,
    borderRadius: 100,
    marginLeft: 10,
    marginTop: 15,
    borderWidth: 2,
    borderColor: 'teal'
  },
});
