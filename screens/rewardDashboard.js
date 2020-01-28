import React, { useEffect } from "react";
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
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

function RewardDashboard({ navigation }) {
  const dispatch = useDispatch();
  const reward = useSelector(state => state.reward.rewardList);
  const user = useSelector(state => state.user.data);

  const addReward = e => {
    navigation.navigate("title reward");
  };

  const detailReward = id => {
    navigation.navigate("detail reward", { id });
  };

  const history = () => {
    navigation.navigate("history reward");
  };
  
  useEffect(() => {
    dispatch(getAllReward());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.bodyTop}>
        <Image
          source={Picture.familyScreen}
          style={{ width: "80%", resizeMode: "contain", flex: 1 }}
        />
        {user.role === "child" && (
          <View style={styles.historyBtn}>
            <TouchableOpacity style={styles.touchHistoryBtn} onPress={history}>
              <View style={{ alignSelf: 'center' }}>
                <MaterialCommunityIcons
                  name="history"
                  size={40}
                  color="white"
                  style={styles.historyIcon}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.bodyBottom}>
        <SafeAreaView style={styles.containerScroll}>
          {reward.length === 0 ? (
            <Text>There is no reward exist</Text>
          ) : (
            <FlatList
              data={reward}
              style={{ marginTop: 50, width: "60%" }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.containerCardOne}
                  onPress={() => detailReward(item._id)}
                >
                  <View style={styles.card}>
                    <Image
                      source={{ uri: `${item.image}` }}
                      style={styles.circle}
                    />
                    <View style={styles.cardMid}>
                      <Text style={styles.fontCardName}>{item.title}</Text>
                      <Text style={styles.fontCardBirth}>
                        {item.description}
                      </Text>
                      {item.status ? (
                        <Text
                          style={{ color: "green", fontFamily: "sf-medium" }}
                        >
                          Unclaimed
                        </Text>
                      ) : (
                        <Text style={{ color: "red", fontFamily: "sf-medium" }}>
                          Claimed
                        </Text>
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
          )}
        </SafeAreaView>
      </View>
      {user.role === "parent" && (
        <View style={styles.famsBtn}>
          <TouchableOpacity style={styles.touchFamsBtn} onPress={addReward}>
            <View style={styles.addFamilyBtn}>
              <Ionicons
                name="ios-add"
                size={60}
                color="white"
                style={styles.plusIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
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
    width: "100%",
  },
  containerScroll: {
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
  historyIcon: {
    top: 3,
    right: 1.5,
  },
  touchHistoryBtn: {
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
  historyBtn: {
    justifyContent: "center",
    position: "absolute",
    bottom: 160,
    right: 30,
  },
  deadline: {
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
  addFamilyBtn: {
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
