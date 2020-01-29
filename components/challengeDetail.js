import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  getChallenge,
  claimChallenge,
  finishChallenge,
  getAllChallenge,
} from "../store/action/challengeAction";
import { addPoin, getAllFamily } from "../store/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { withNavigation } from "react-navigation";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import Fire from "../config/Fire";
import Picture from "../assets/index";

function ChallengeDetail({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);
  const family = useSelector(state => state.user.family);
  const challenge = useSelector(state => state.challenge);
  const currentChallenge = useSelector(state => state.challenge.data);
  const [done, setDone] = useState(true);

  const getClaimChallenge = async id => {
    setDone(false);
    await dispatch(claimChallenge({ id, family: family }));
    await dispatch(getAllChallenge());
    setDone(true);
    navigation.goBack();
  };

  const getDoneChallenge = async (id, points, childId) => {
    setDone(false);
    await dispatch(finishChallenge({ id }));
    await dispatch(getAllChallenge());
    await dispatch(addPoin({ data: points, childId }));
    setDone(true);
    navigation.goBack()
  };

  useEffect(() => {
    let id = navigation.state.params.id;
    dispatch(getChallenge({ id }));
    dispatch(getAllFamily());
  }, []);

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
    <View style={{ flex: 1 }}>
      {challenge.loading ? null : (
        <View
          style={{
            flex: 1,
            backgroundColor: "blue",
          }}
        >
          <ImageBackground
            style={{
              flex: 1 / 2,
              resizeMode: "contain",
            }}
            source={{ uri: `${currentChallenge.image}` }}
            blurRadius={5}
          >
            <LinearGradient
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              colors={["transparent", "black"]}
            >
              <Image
                source={{ uri: `${currentChallenge.image}` }}
                style={{
                  width: 200,
                  height: 300,
                  borderRadius: 5,
                  resizeMode: "contain",
                }}
              />
            </LinearGradient>
          </ImageBackground>
          <View
            style={{
              flex: 1,
              backgroundColor: "black",
              justifyContent: "flex-start",
              alignItems: "center",
              height: 300,
              maxHeight: "100%",
            }}
          >
            <ScrollView style={{ flex: 1 / 2, paddingBottom: 50 }}>
              <View style={{ alignItems: "center", height: 600 }}>
                <Text
                  style={{
                    fontSize: 40,
                    fontFamily: "sf-medium",
                    color: "white",
                  }}
                >
                  {currentChallenge.title}
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontFamily: "sf-light",
                    width: "80%",
                    textAlign: "center",
                  }}
                >
                  {currentChallenge.description}
                </Text>
                <View
                  style={{
                    width: "80%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 30,
                  }}
                >
                  <View
                    style={{
                      width: "50%",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        fontFamily: "sf-semibold",
                      }}
                    >
                      Deadline
                    </Text>
                    <Text
                      style={{
                        fontSize: 25,
                        color: "yellow",
                        textAlign: "center",
                      }}
                    >
                      {moment(currentChallenge.deadline).format("LL")}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "50%",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        fontFamily: "sf-semibold",
                      }}
                    >
                      Poin
                    </Text>
                    <Text
                      style={{
                        fontSize: 25,
                        color: "yellow",
                        textAlign: "center",
                      }}
                    >
                      {currentChallenge.points}
                    </Text>
                  </View>
                </View>
                {user.role === "parent" && (
                  <TouchableOpacity
                    style={{
                      marginTop: 30,
                      backgroundColor: "green",
                      borderRadius: 20,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 8,
                      },
                      shadowOpacity: 0.46,
                      shadowRadius: 11.14,
                      elevation: 17,
                    }}
                    onPress={() => {
                      Fire.shared.send([
                        {
                          image: currentChallenge.image
                            ? currentChallenge.image
                            : "",
                          text: `${currentChallenge.title} — link to challenge: ${navigation.state.params.id}`,
                          user: {
                            _id: Fire.shared.uid,
                            familyId: user.familyId,
                            username: user.username,
                            avatar: user.avatar ? user.avatar : "",
                          },
                        },
                      ]);
                      navigation.navigate("message");
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        fontFamily: "sf-semibold",
                        letterSpacing: 2,
                      }}
                    >
                      Share to chat
                    </Text>
                  </TouchableOpacity>
                )}
                {currentChallenge.status === "unclaimed" &&
                user.role === "child" ? (
                  <TouchableOpacity
                    style={{
                      marginTop: 30,
                      backgroundColor: "green",
                      borderRadius: 20,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 8,
                      },
                      shadowOpacity: 0.46,
                      shadowRadius: 11.14,
                      elevation: 17,
                    }}
                    onPress={() => getClaimChallenge(currentChallenge._id)}
                  >
                    <Text
                      style={{
                        color: "white",
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        fontFamily: "sf-semibold",
                        letterSpacing: 2,
                      }}
                    >
                      Take Challenge
                    </Text>
                  </TouchableOpacity>
                ) : currentChallenge.status === "claimed" &&
                  user.role === "parent" ? (
                  <TouchableOpacity
                    style={{
                      marginTop: 30,
                      backgroundColor: "yellow",
                      borderRadius: 20,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 8,
                      },
                      shadowOpacity: 0.46,
                      shadowRadius: 11.14,
                      elevation: 17,
                    }}
                    onPress={() =>
                      getDoneChallenge(
                        currentChallenge._id,
                        currentChallenge.points,
                        currentChallenge.childId
                      )
                    }
                  >
                    <Text
                      style={{
                        color: "black",
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        fontFamily: "sf-semibold",
                        letterSpacing: 2,
                      }}
                    >
                      Done
                    </Text>
                  </TouchableOpacity>
                ) : user.role === "child" &&
                  currentChallenge.status === "finished" ? (
                  <TouchableOpacity
                    style={{
                      marginTop: 30,
                      backgroundColor: "red",
                      borderRadius: 20,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 8,
                      },
                      shadowOpacity: 0.46,
                      shadowRadius: 11.14,
                      elevation: 17,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        fontFamily: "sf-semibold",
                        letterSpacing: 2,
                      }}
                    >
                      Finished
                    </Text>
                  </TouchableOpacity>
                ) : (
                  user.role === "child" &&
                  currentChallenge.status === "claimed" && (
                    <TouchableOpacity
                      style={{
                        marginTop: 30,
                        backgroundColor: "yellow",
                        borderRadius: 20,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 8,
                        },
                        shadowOpacity: 0.46,
                        shadowRadius: 11.14,
                        elevation: 17,
                      }}
                    >
                      <Text
                        style={{
                          color: "black",
                          paddingVertical: 10,
                          paddingHorizontal: 20,
                          fontFamily: "sf-semibold",
                          letterSpacing: 2,
                        }}
                      >
                        OnProgress
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
}

export default withNavigation(ChallengeDetail);
