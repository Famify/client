import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import Constants from "expo-constants";
import { useSelector, useDispatch } from "react-redux";
import { getAllReward } from "../store/action/rewardAction";
import { withNavigation } from "react-navigation";
import Picture from "../assets";
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

function RewardDashboard({ navigation }) {
  const dispatch = useDispatch();
  const reward = useSelector(state => state.reward.rewardList);
  const addFamily = e => {
    navigation.navigate("title");
  };

  useEffect(() => {
    dispatch(getAllReward());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.bodyTop}>
        <Image
          source={Picture.challange3}
          style={{ width: "100%", resizeMode: "contain", flex: 1, transform:[{ translateY: 0 }] }}
        />
      </View>
      <View style={styles.bodyBottom}>
        <SafeAreaView style={styles.container}>
          {reward.length === 0 ? (
            <Text>There is no reward exist</Text>
          ) : (
            <FlatList
              data={reward}
              style={{ marginTop: 50 }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) =>
                index === family.length - 1 ? (
                  <View style={styles.containerCardOne}>
                    <View style={styles.card}>
                      <Image source={Picture.kidsBoy} style={styles.circle} />
                      <View style={styles.cardMid}>
                        <Text style={styles.fontCardName}>
                          {" "}
                          Angga Banny Ridwan Syahputra
                        </Text>
                        <Text style={styles.fontCardBirth}>
                          {" "}
                          22 January 2019{" "}
                        </Text>
                      </View>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "white",
                          maxWidth: 200,
                          borderRadius: 20,
                          height: 60,
                          flexDirection: "row",
                        }}
                      >
                        <Text style={styles.fontCardPoint}> 0 </Text>
                        <Image
                          source={Picture.medal}
                          style={styles.cardMedal}
                        />
                      </View>
                    </View>
                  </View>
                ) : (
                  <View style={styles.containerCard}>
                    <View style={styles.card}>
                      <Image source={Picture.kidsBoy} style={styles.circle} />
                      <View style={styles.cardMid}>
                        <Text style={styles.fontCardName}>
                          {" "}
                          Angga Banny Ridwan Syahputra
                        </Text>
                        <Text style={styles.fontCardBirth}>
                          {" "}
                          22 January 2019{" "}
                        </Text>
                      </View>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "white",
                          maxWidth: 200,
                          borderRadius: 20,
                          height: 60,
                          flexDirection: "row",
                        }}
                      >
                        <Text style={styles.fontCardPoint}> 0 </Text>
                        <Image
                          source={Picture.medal}
                          style={styles.cardMedal}
                        />
                      </View>
                    </View>
                  </View>
                )
              }
              keyExtractor={(item, index) => String(index)}
            />
          )}
        </SafeAreaView>
      </View>
      <View style={styles.famsBtn}>
        <TouchableOpacity style={styles.touchFamsBtn} onPress={addChallenge}>
          <View style={styles.addChallengeBtn}>
            <Ionicons
              name="ios-add"
              size={60}
              color="white"
              style={styles.plusIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default withNavigation(RewardDashboard);

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  plusIcon: {
    top: -2,
  },
  deadline:{
    fontFamily: "sf-light",
    fontSize: 12,
  },
  flatlist: {
    marginTop: 50,

  },
  touchFamsBtn: {
    height: 50,
    backgroundColor: "#4999CA",
    width: 50,
    borderRadius: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  famsBtn: {
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  addChallengeBtn: {
    justifyContent: "center",
    alignItems: "center",
  },
  bodyTop: {
    backgroundColor: "white",
    flex: 1 / 2,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bodyBottom: {
    backgroundColor: "#4FA5B6",
    flex: 1,
    width: 600,
    marginTop: -50,
    borderTopRightRadius: 350,
    borderTopLeftRadius: 350,
  },
  containerCardOne: {
    marginBottom: 80,
    marginTop: 10,
    alignItems: "center",
  },
  containerCard: {
    marginTop: 10,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#EDB805",
    paddingHorizontal: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  cardMid: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "wrap",
    maxWidth: 150,
    marginRight: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    resizeMode: 'cover'
  },
  circle: {
    backgroundColor: "white",
    height: 60,
    width: 60,
    borderRadius: 100,
    marginRight: 4,
  },
  fontCardName: {
    fontFamily: "sf-semibold",
    fontSize: 18,
  },
  fontCardBirth: {
    fontFamily: "sf-light",
    fontSize: 12,
    marginTop: -12,
  },
  fontCardPoint: {
    fontFamily: "sf-semibold",
    fontSize: 30,
    paddingLeft: 5,
  },
});
