import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import moment from "moment";
import Constants from "expo-constants";
import { withNavigation } from "react-navigation";
import { useDispatch, useSelector } from "react-redux";
import { getAllChallenge } from "../store/action/challengeAction";
import Picture from "../assets";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

function ChallengeDashboard({ navigation }) {
  const dispatch = useDispatch();
  const challengeList = useSelector(state => state.challenge.challengeList);

  const addChallenge = () => {
    navigation.navigate("add challenge");
  };

  const challangeDetail = id => {
    alert(`id : ${id}`);
  };

  useEffect(() => {
    dispatch(getAllChallenge());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.bodyTop}>
        <Image
          source={Picture.challange1}
          style={{
            width: "100%",
            resizeMode: "contain",
            flex: 1,
            transform: [{ translateY: 10 }],
          }}
        />
      </View>
      <View style={styles.bodyBottom}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={challengeList}
            style={styles.flatlist}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
              index === challengeList.length - 1 ? (
                <View style={styles.containerCardOne}>
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => challangeDetail(item._id)}
                  >
                    <Image
                      source={{ uri: `${item.image}` }}
                      style={styles.circle}
                    />
                    <View style={styles.cardMid}>
                      <Text style={styles.fontCardName}>{item.title}</Text>
                      <Text style={styles.fontCardBirth}>
                        {moment(item.deadline).format("LL")}
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        maxWidth: 200,
                        flexDirection: "row",
                      }}
                    >
                      <Text style={styles.fontCardPoint}>{item.points}</Text>
                      <Image source={Picture.medal} style={styles.cardMedal} />
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.containerCard}>
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => challangeDetail(item._id)}
                  >
                    <Image
                      source={{ uri: `${item.image}` }}
                      style={styles.circle}
                    />
                    <View style={styles.cardMid}>
                      <Text style={styles.fontCardName}>{item.title}</Text>
                      <Text style={styles.fontCardBirth}>
                        {moment(item.deadline).format("LL")}
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        maxWidth: 200,
                        flexDirection: "row",
                      }}
                    >
                      <Text style={styles.fontCardPoint}>{item.points}</Text>
                      <Image source={Picture.medal} style={styles.cardMedal} />
                    </View>
                  </TouchableOpacity>
                </View>
              )
            }
            keyExtractor={(item, index) => String(index)}
          />
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

export default withNavigation(ChallengeDashboard);

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  plusIcon: {
    top: -2,
  },
  deadline: {
    fontFamily: "sf-light",
    fontSize: 12,
  },
  flatlist: {
    marginTop: 50,
    width: "60%",
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
    backgroundColor: "#F7CA3F",
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
    backgroundColor: "#ceccfc",
    paddingHorizontal: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    width: "80%",
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
    resizeMode: "cover",
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
