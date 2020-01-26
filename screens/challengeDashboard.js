import React, { useEffect } from "react";
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
  const id = "5e2c74a2ccd987128a26a5eb";

  const addChallenge = () => {
    navigation.navigate("add challenge");
  };

  const challangeDetail = payload => {
    if (
      (payload.status === "claimed" || payload.status === "finished") &&
      payload.owner === id
    ) {
      navigation.navigate("detail", { id: payload.id });
    } else if (payload.status === "unclaimed") {
      navigation.navigate("detail", { id: payload.id });
    } else {
      alert("Challenge has been claimed");
    }
  };

  useEffect(() => {
    dispatch(getAllChallenge());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.bodyTop}>
        <Image
          source={Picture.familyScreen}
          style={{ width: "80%", resizeMode: "contain", flex: 1 }}
        />
      </View>
      <View style={styles.bodyBottom}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={challengeList}
            style={{ marginTop: 50, width: "60%" }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.containerCardOne}
                onPress={() =>
                  challangeDetail({
                    id: item._id,
                    status: item.status,
                    owner: item.childId,
                  })
                }
              >
                <View style={styles.card}>
                  <Image
                    source={{ uri: `${item.image}` }}
                    style={styles.circle}
                  />
                  <View style={styles.cardMid}>
                    <Text style={styles.fontCardName}>{item.title}</Text>
                    <Text style={styles.fontCardBirth}>
                      {moment(item.deadline).format("LL")}
                    </Text>
                    {item.status === "unclaimed" ? (
                      <Text
                        style={{
                          color: "green",
                          fontSize: 14,
                          fontFamily: "sf-regular",
                        }}
                      >
                        {item.status}
                      </Text>
                    ) : (
                      item.status === "claimed" ||
                      (item.status === "finished" && (
                        <Text
                          style={{
                            color: "red",
                            fontSize: 14,
                            fontFamily: "sf-regular",
                          }}
                        >
                          claimed
                        </Text>
                      ))
                    )}
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
                    <Text style={styles.fontCardPoint}>{item.points}</Text>
                    <Image source={Picture.medal} style={styles.cardMedal} />
                  </View>
                </View>
              </TouchableOpacity>
            )}
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
    marginBottom: 20,
  },
  plusIcon: {
    top: -2,
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
    backgroundColor: "#7E549E",
    flex: 1,
    width: 600,
    marginTop: -50,
    borderTopRightRadius: 350,
    borderTopLeftRadius: 350,
  },
  containerCardOne: {
    marginTop: 10,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#ceccfc",
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    width: "100%",
  },
  cardMid: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    maxWidth: 150,
    marginRight: 5,
  },
  cardMedal: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginTop: -30,
    marginLeft: -10,
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
