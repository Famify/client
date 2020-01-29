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
import { withNavigation } from "react-navigation";
import Picture from "../assets";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { getMyChallenge } from '../store/action/challengeAction'
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

function ChallengeDashboard({ navigation }) {
  const dispatch = useDispatch()
  const myChallengeList = useSelector(state => state.challenge.mychallengeList);

  useEffect(() => {
    dispatch(getMyChallenge());
  }, []);

  const history = () => {
    navigation.navigate("history challenge");
  };

  return (
    <View style={styles.container}>
        <View style={styles.historyBtn}>
          <TouchableOpacity style={styles.touchHistoryBtn} onPress={history}>
            <View style={styles.addChallengeBtn}>
              <MaterialCommunityIcons
                name="history"
                size={40}
                color="white"
                style={styles.historyIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
      <View style={styles.bodyBottom}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={myChallengeList}
            style={styles.flatlist}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
                index === myChallengeList.length -1 ? (
                  <View style={styles.containerCardOne}>
                  <View style={styles.card}>
                    <View style={styles.cardMid}>
                      <Text style={styles.fontCardName}>
                        { item.title }
                      </Text>
                      <Text style={styles.fontCardBirth}>
                        { item.description }
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
                      <Image source={{ uri: item.image }} style={styles.image} />
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 20, borderBottomRightRadius: 20, borderBottomLeftRadius: 20}} >
                    <View style={{ justifyContent: 'flex-end' , flexDirection: 'row', alignItems: 'center', marginRight: 10}} >
                      <MaterialCommunityIcons name="medal" size={20} color="black" style={{ marginRight: 2 }} />
                      <Text style={styles.deadline}>
                        { item.points } Point
                      </Text>
                    </View>
                    <View style={{ justifyContent: 'flex-end' , flexDirection: 'row', alignItems: 'center',}} >
                      <MaterialCommunityIcons name="calendar-clock" size={20} color="black" style={{ marginRight: 2 }} />
                      <Text style={styles.deadline}>
                        {moment(item.deadline).format("LL")}
                      </Text>
                    </View>
                  </View>
                  <View style={{ justifyContent: 'flex-end' , flexDirection: 'row', alignItems: 'center', marginRight: 10}} >
                    <MaterialCommunityIcons name="whistle" size={20} color="black" style={{ marginRight: 2 }} />
                    <Text style={styles.deadline}>
                      { item.status }
                    </Text>
                  </View>
                </View>
                ) : (
                  <View style={styles.containerCard}>
                  <View style={styles.card}>
                    <View style={styles.cardMid}>
                      <Text style={styles.fontCardName}>
                        { item.title }
                      </Text>
                      <Text style={styles.fontCardBirth}>
                        { item.description }
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
                      <Image source={{ uri: item.image }} style={styles.image} />
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', width: 295, borderBottomRightRadius: 20, borderBottomLeftRadius: 20}} >
                    <View style={{ justifyContent: 'flex-end' , flexDirection: 'row', alignItems: 'center', marginRight: 10}} >
                      <MaterialCommunityIcons name="medal" size={20} color="black" style={{ marginRight: 2 }} />
                      <Text style={styles.deadline}>
                        { item.points } Point
                      </Text>
                    </View>
                    <View style={{ justifyContent: 'flex-end' , flexDirection: 'row', alignItems: 'center',}} >
                      <MaterialCommunityIcons name="calendar-clock" size={20} color="black" style={{ marginRight: 2 }} />
                      <Text style={styles.deadline}>
                      {moment(item.deadline).format("LL")}
                      </Text>
                    </View>
                  </View>
                  <View style={{ justifyContent: 'flex-end' , flexDirection: 'row', alignItems: 'center', marginRight: 10}} >
                    <MaterialCommunityIcons name="whistle" size={20} color="black" style={{ marginRight: 2 }} />
                    <Text style={styles.deadline}>
                      { item.status }
                    </Text>
                  </View>
                </View>
                )
            )}
            keyExtractor={(item, index) => String(index)}
          />
        </SafeAreaView>
      </View>
    </View>
  );
}

export default withNavigation(ChallengeDashboard);

const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight,
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
  },
  historyIcon: {
    top: 3,
    right: 1.5
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
    backgroundColor: "#f95e5a",
    flex: 1,
    width: 600,
    // borderBottomRightRadius: 450,
    // borderTopLeftRadius: 350,
  },
  containerCardOne: {
    marginBottom: 80,
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#ceccfc",
    borderRadius: 20
  },
  containerCard: {
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#ceccfc",
    borderRadius: 20
  },
  card: {
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
