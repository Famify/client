import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, View, Button } from "react-native";
import {
  INFINITE_ANIMATION_ITERATIONS,
  LatLng,
  WebViewLeaflet,
  WebViewLeafletEvents,
  WebviewLeafletMessage,
  AnimationType,
  MapShapeType
} from "react-native-webview-leaflet";
const mapboxToken = 'pk.eyJ1IjoicG90YWxsZWd0YSIsImEiOiJjazV1eDUydHAxZTI5M2xuNWgwZWhqbmU1In0.EpMhSp3imkXRtyoJcNPX-w'
import lodashSample from "lodash.sample";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import db from '../config/db'
import { useSelector } from 'react-redux'

const getDuration = () => Math.floor(Math.random() * 3) + 1;
const getDelay = () => Math.floor(Math.random()) * 0.5;
const iterationCount = "infinite";

export default function App() {
  const parent = useSelector(state => {
    return state.user.data
  })
  const [locations, setLocations] = useState([])

  function trackLocation() {
    db.ref('locations').on('value', function (snapshot) {
      const object = snapshot.val()
      const rawData = Object.values(object)
      const data = []
      for (let i = 0; i < rawData.length; i++) {
        if (rawData[i].familyId == parent.familyId) {
          let obj = {
            position: { lat: rawData[i].latitude, lng: rawData[i].longitude },
            icon: rawData[i].avatar,
            name: rawData[i].name,
          }
          data.push(obj)
        }
      }
      setLocations(data)

    })
  }

  useEffect(() => {
    trackLocation()
  }, [])

  const [mapCenterPosition, setMapCenterPosition] = useState({
    lat: -6.273000,
    lng: 106.827072
  });
  const [webViewLeafletRef, setWebViewLeafletRef] = useState(null);

  const onMessageReceived = (message) => {
    switch (message.event) {
      case WebViewLeafletEvents.ON_MAP_MARKER_CLICKED:
        Alert.alert(
          `${message.payload.mapMarkerID || "unknown"} ada disini`
        );

        break;
      case WebViewLeafletEvents.ON_MAP_TOUCHED:
        // const position = message.payload
        //   .touchLatLng;
        // Alert.alert(`Anda menyentuh posisi:`, `${position.lat}, ${position.lng}`);
        // break;
      default:
      // console.log("App received", message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your children's location</Text>
      </View>
      <View style={{ flex: 1 }}>
        {
          <WebViewLeaflet
            ref={(ref) => {
              setWebViewLeafletRef(ref);
            }}
            backgroundColor={"green"}
            onMessageReceived={onMessageReceived}
            mapLayers={[
              {
                baseLayerName: "Mapbox",
                //url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                baseLayerIsChecked: true,
                url: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
                // attribution:
                  // "&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              },
              {
                // attribution:
                //   '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                baseLayerName: "OpenStreetMap.Mapnik",
                url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              }
            ]}
            mapMarkers={[
              ...locations.map(location => {
                return {
                  id: location.name.replace(" ", "-"),
                  position: location.position,
                  icon: location.icon,
                  animation: {
                    duration: getDuration(),
                    delay: getDelay(),
                    iterationCount,
                    type: AnimationType.WAGGLE
                  },
                  size: [32, 32]
                };
              }),
            ]}
            mapCenterPosition={mapCenterPosition}
            zoom={12}
          />
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    height: 60,
    backgroundColor: "dodgerblue",
    paddingHorizontal: 10,
    paddingTop: 30,
    width: "100%"
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600"
  },
  mapControls: {
    backgroundColor: "rgba(255,255,255,.5)",
    borderRadius: 5,
    bottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    marginHorizontal: 10,
    padding: 7,
    position: "absolute",
    right: 0
  },
  mapButton: {
    alignItems: "center",
    height: 42,
    justifyContent: "center",
    width: 42
  },
  mapButtonEmoji: {
    fontSize: 28
  }
});