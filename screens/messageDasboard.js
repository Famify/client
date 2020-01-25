import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView
} from "react-native";
import Picture from '../assets'
import moment from "moment";
import { FontAwesome } from '@expo/vector-icons'

export default function RegisterChild({ navigation }) {
  const [birthday, setBirthday] = useState(moment(new Date()).format("MMMM D, YYYY"))
  const [aviod, setAvoid] = useState(false)
  const [positionInput, setPositionInput] = useState(20)
  useState(()=>{

  },[])
  return (
    <View style={styles.container}>
    <KeyboardAvoidingView style={styles.containerBoard} behavior="position" enabled>
      <View style={styles.upperFormWrapper}>
        <Text style={styles.title}>Child Register</Text>
      </View>
      <SafeAreaView style={styles.downFormWrapper}>
        <ImageBackground source={ Picture.messageBackground } style={{width: '100%', height: '100%', position: 'absolute'}} />
        <ScrollView style={styles.scroolView}>
            <View style={{ marginTop: 20, marginLeft: 5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'white', borderTopLeftRadius: 25, borderBottomLeftRadius: 25 ,borderBottomRightRadius:0,height:55, width:55 }} >
                    <Image source={ Picture.kidsBoy } style={{ resizeMode: 'contain', width: "100%", height: '100%' }} />
                </View>
                <View style={{flexDirection: 'column'}} >
                    <Text style={{color:'black', backgroundColor: 'white', maxWidth: 290, paddingHorizontal: 5, paddingVertical:5, borderTopRightRadius: 20}} >anggabanny</Text>
                    <Text style={{color:'black', backgroundColor: 'grey',paddingHorizontal: 10,paddingVertical: 5, maxWidth: 290, borderBottomLeftRadius:7, borderBottomRightRadius:7}} >Message iddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddn i</Text>
                </View>
            </View>
            <View style={{ marginTop: 20, marginRight: 7, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <View style={{flexDirection: 'column'}} >
                    <Text style={{color:'black', backgroundColor: 'white', maxWidth: 290, paddingHorizontal: 5, paddingVertical:5, borderTopLeftRadius: 20, textAlign: 'right'}} >anggabanny</Text>
                    <Text style={{color:'black', backgroundColor: 'grey',paddingHorizontal: 10,paddingVertical: 5, maxWidth: 290, borderBottomLeftRadius:7, textAlign: 'right' ,borderBottomRightRadius:7}} >hai tampan</Text>
                </View>
                <View style={{ backgroundColor: 'white' ,borderBottomRightRadius:25, borderTopRightRadius:25,height:55, width:55 }} >
                    <Image source={ Picture.kidsBoy } style={{ resizeMode: 'contain', width: "100%", height: '100%' }} />
                </View>
            </View>
        </ScrollView>
        <View style={styles.downFormWrapperInput}>
                <TextInput style={styles.input} placeholder="Type a message" />
                <TouchableOpacity style={styles.submit}>
                    <FontAwesome name="send" size={30} color="white" />
                </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  upperFormWrapper: {
    flex: 1,
    width: "100%",
    paddingVertical: "10%",
    paddingHorizontal: "10%",
    backgroundColor: "#335F52",
  },
  title: {
    fontFamily: "sf-semibold",
    fontSize: 36,
    color: "white",
    shadowColor: "white",
    shadowOffset: {
      width: 10,
      height: 3,
    },
    shadowOpacity: 0.44,
    shadowRadius: 3,
    elevation: 15,
  },
  downFormWrapper: {
    flex: 20,
    backgroundColor: "white",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#512DA8",
  },
  downFormWrapperInput: {
    flex: 1/9,
    flexDirection: 'row',
    backgroundColor: "#335F52",
    width: "100%",
    borderColor: "#512DA8",
  },
  scroolView:{
    //   backgroundColor: "black",
      width: "100%",
      height: 80,
  },
  input: {
    width: 300,
    marginVertical: 7,
    paddingLeft: 10,
    marginLeft: 5,
    backgroundColor: "white",
    borderRadius: 10,
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
    // backgroundColor: "#EE7600",
    width: "15%",
    marginBottom: 20 ,
    borderRadius: 100,
    alignItems: "center",
    marginTop: 10,
    // shadowColor: "#512DA8",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.44,
    // shadowRadius: 3,
    // elevation: 5,
  },
  send:{}
});
