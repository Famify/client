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
import Picture from "../assets";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { getAllFamily } from "../store/action/userAction";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";

function FamilyDashboard({ navigation }) {
  const dispatch = useDispatch();
  const family = useSelector(state => state.user.family);
  const user = useSelector(state => state.user);

  const addFamily = e => {
    navigation.navigate("add family form");
  };

  useEffect(() => {
    dispatch(getAllFamily());
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
        <SafeAreaView style={styles.containerSafe}>
          {family.length === 0 ? (
            <Text
              style={{ fontSize: 24, fontFamily: "sf-medium", color: "white" }}
            >
              No family
            </Text>
          ) : (
            <FlatList
              data={family}
              style={{ marginTop: 50, width: "60%" }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity style={styles.containerCardOne}>
                  <View
                    style={styles.card}
                    onPress={() => alert(`id : ${item._id}`)}
                  >
                    {
                      item.avatar ? 
                      <Image source={{ uri: item.avatar }} style={styles.circle} /> :
                      <Image source={ Picture.kidsBoy } style={styles.circle} />
                    }
                    <View style={styles.cardMid}>
                      <Text style={styles.fontCardName}>
                        {item.username} ({item.role})
                      </Text>
                      <Text style={styles.fontCardBirth}>
                        {moment(item.dateOfBirth).format("LL")}
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
                      {item.role === "child" && (
                        <>
                          <Text style={styles.fontCardPoint}>{item.point}</Text>
                          <Image
                            source={Picture.medal}
                            style={styles.cardMedal}
                          />
                        </>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => String(index)}
            />
          )}
        </SafeAreaView>
      </View>
      <View style={styles.famsBtn}>
        {user.data.role === "parent" && (
          <TouchableOpacity style={styles.touchFamsBtn} onPress={addFamily}>
            <View style={styles.addFamilyBtn}>
              <Ionicons
                name="ios-add"
                size={60}
                color="white"
                style={styles.plusIcon}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default withNavigation(FamilyDashboard);

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  containerSafe: {
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
  setting: {
    top: 5,
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
    zIndex: 99,
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
  containerCard: {
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
    alignItems: "flex-start",
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
