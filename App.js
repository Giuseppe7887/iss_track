import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View,SafeAreaView} from 'react-native';
import MapView,{Marker} from 'react-native-maps';
import { FontAwesome5,Ionicons } from '@expo/vector-icons';


const URL = "https://api.wheretheiss.at/v1/satellites/25544";
const REFRESH_MILLIS = 5000;
const CAM = {
  latitudeDelta:30,
  longitudeDelta:30
}

export default function App() {
  let [issData,setIssData] = useState({altitude:0, daynum: 0, footprint: 0, id: 0, latitude: 0, longitude: 0, name: "", solar_lat:0, solar_lon: 0, timestamp:0, units: "", velocity:0, visibility: ""});
  
  function update(){
    axios.get(URL,{headers:{"Cache-Control":"no-cache"}}).then(res=>{
      setIssData(res.data)
    }).catch(err=>{
      console.log(err.message);
    })
  } 
  useEffect(()=>{
    update();
    setInterval(() => {
      update();
    }, REFRESH_MILLIS);
  },[]);

  
  return (
    issData.altitude ?
    <SafeAreaView style={styles.container}>
        <MapView 
        style={styles.map} 
        initialRegion={{latitude:Number(issData.latitude),longitude:Number(issData.longitude), latitudeDelta: CAM.latitudeDelta, longitudeDelta: CAM.longitudeDelta}}>
            <Marker coordinate={{latitude:issData.latitude,longitude:issData.longitude}} >
              <FontAwesome5 name="satellite" size={30} color="rgba(255,255,255,0.9)" style={styles.icon}/>
            </Marker>
        </MapView>
    <View style={styles.bottomTab}>
      <View>
      <Text style={styles.bottomTabText}>latitude: {issData.latitude}</Text>
      <Text style={styles.bottomTabText}>longitude: {issData.longitude}</Text>
      </View>
      <FontAwesome5 name="info-circle" style={{position:"absolute",right:20}} size={25} color="grey"/>
    </View>
    </SafeAreaView>:
    <View style={styles.loadingPage}>
      <Text style={styles.loadingText}>loading..</Text>
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
  map:{
    width:"100%",
    height:"100%"
  },
  icon:{
    backgroundColor:"rgba(0,0,0,0.2)",
    padding:10,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:100
  },
  loadingPage:{
    height:"100%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center"
  },
  loadingText:{
    fontSize:30
  },
  bottomTab:{
    width:"100%",
    height:"10%",
    backgroundColor:"white",
    position:"absolute",
    bottom:0,
    justifyContent:"center",
    padding:10
  },
  bottomTabText:{
    padding:2
  }
});
