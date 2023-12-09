import { View,Text,StyleSheet,StatusBar } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"


function BottomTab({follow,toggleFollow,toggleInfoPage}){
    return(
        <View style={styles.bottomTab}>
            <View style={styles.textWrapper}>
                {/*<Text style={styles.bottomTabText}>latitude: {issData.latitude}</Text>
                <Text style={styles.bottomTabText}>longitude: {issData.longitude}</Text>*/}
            </View>
            <View style={styles.iconWrapper}>
                <View style={styles.wrapper}>
                    <MaterialCommunityIcons  onPress={toggleInfoPage} name="information-outline" size={35} color="black" />
                    <Text>info</Text>
                </View>
                <View style={styles.wrapper}>
                    <MaterialCommunityIcons onPress={toggleFollow} name="map-marker-circle" size={35} color={follow?"white":"black"}/>
                    <Text>center</Text>
                </View>
            </View>
    <       StatusBar style="light" backgroundColor='black' hidden/>
      </View>
    )
}

const styles = StyleSheet.create({
    bottomTab:{
        width:"100%",
        height:"10%",
        backgroundColor:"transparent",
        position:"absolute",
        bottom:0,
        justifyContent:"center",
        padding:10,
        flexDirection:"row"
      },
      bottomTabText:{
        padding:2
      },
      textWrapper:{
        width:"70%"
      },
      iconWrapper:{
        width:"30%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around"
      },
      wrapper:{
        alignItems:"center",
        justifyContent:"center"
      }
})

export default BottomTab;