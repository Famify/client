import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { WebViewLeaflet, WebViewLeafletEvents, AnimationType } from 'react-native-webview-leaflet'
import db from '../config/db'
import { useSelector } from 'react-redux'

export default function App() {
  const [webViewLeafletRef, setWebViewLeafletRef] = useState(null)
  const [mapCenterPosition, setMapCenterPosition] = useState({})
  const parent = useSelector(state => {
    state.user.data
  })
  let locations
  const getDuration = () => Math.floor(Math.random() * 3) + 1;
  const getDelay = () => Math.floor(Math.random()) * 0.5;
  const iterationCount = "infinite";

  function trackLocation() {
    db.ref('locations').on('value', function (snapshot) {
      const rawData = snapshot.val()
      const data = []
      for (let i = 0; i < rawData.length; i++) {
        if (rawData[i].familyId == parent.familyId) {
          let obj = {
            position: { lat: rawData[i].latitude, lng: rawData[i].longitude },
            icon: rawData[i].avatar,
            size: [32, 32],
            animation: {
              duration: getDuration(),
              delay: getDelay(),
              iterationCount,
              type: AnimationType.WAGGLE
            }
          }
          data.push(obj)
        }
      }
      locations = data
    })
  }

  useEffect(() => {
    trackLocation()
  }, [])

  return (
    <View style={styles.container}>
      <WebViewLeaflet
        ref={ref => setWebViewLeafletRef(ref)}
        backgroundColor={"green"}
        mapLayers={[
          {
            attribution:
              '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            baseLayerIsChecked: true,
            baseLayerName: "OpenStreetMap.Mapnik",
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          },
          {
            baseLayerName: "Mapbox",
            //url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            url: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicG90YWxsZWd0YSIsImEiOiJjazV1eDUydHAxZTI5M2xuNWgwZWhqbmU1In0.EpMhSp3imkXRtyoJcNPX-w`,
            attribution:
              "&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          }
        ]}
        mapMarkers={locations}
        mapCenterPosition={mapCenterPosition}
        zoom={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});