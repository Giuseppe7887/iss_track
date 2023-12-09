// ux
import axios from 'axios';
import { useEffect, useState } from 'react';

// UI
import MapView,{Marker} from 'react-native-maps';
import { FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Modal, StyleSheet, Text, View,SafeAreaView} from 'react-native';


// components
import BottomTab from './components/bottomTab';
import InfoPage from './components/infoPage';


const URL = "https://api.wheretheiss.at/v1/satellites/25544";
const REFRESH_MILLIS = 10000;
const CAM = {
  latitudeDelta:30,
  longitudeDelta:30
}

export default function App() {
  let [issData,setIssData] = useState({altitude:0, daynum: 0, footprint: 0, id: 0, latitude: 0, longitude: 0, name: "", solar_lat:0, solar_lon: 0, timestamp:0, units: "", velocity:0, visibility: ""});
  let [follow,setFollow] = useState(true);
  let [infoPageData,setInfoPageData] = useState({show:false});

  function update(){
    axios.get(URL,{headers:{"Cache-Control":"no-cache"}}).then(res=>{
      setIssData(res.data);
      // console.log(res.headers);
    }).catch(err=>{
      console.log(err.message);
    })
  } 
  useEffect(()=>{
    // update();
    setInterval(() => {
      update();
    }, REFRESH_MILLIS);
  },[]);

   
  return (
    issData.altitude ?
    <SafeAreaView style={styles.container}>
        <MapView 
        region={follow && {latitude:Number(issData.latitude),longitude:Number(issData.longitude), latitudeDelta: CAM.latitudeDelta, longitudeDelta: CAM.longitudeDelta}}
        style={styles.map} 
        initialRegion={{latitude:Number(issData.latitude),longitude:Number(issData.longitude), latitudeDelta: CAM.latitudeDelta, longitudeDelta: CAM.longitudeDelta}}>
            <Marker coordinate={{latitude:issData.latitude,longitude:issData.longitude}} >
              <FontAwesome5 name="satellite" size={30} color="rgba(255,255,255,0.9)" style={styles.icon}/>
            </Marker>
        </MapView>
    <BottomTab  toggleInfoPage={()=>setInfoPageData({...infoPageData,show:!infoPageData.show})} follow={follow} toggleFollow={()=>setFollow(!follow)} />
    <Modal animationType='slide' visible={infoPageData.show}>
      <InfoPage issData={issData} toggleInfoPage={()=>setInfoPageData({...infoPageData,show:!infoPageData.show})}/>
    </Modal>
    <StatusBar style="light" backgroundColor='black' hidden/>
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
  }
});
