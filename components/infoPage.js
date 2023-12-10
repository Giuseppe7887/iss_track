import { Text, View ,Button, StyleSheet,StatusBar,Image,TouchableOpacity} from "react-native";
import Box from "./Box";
import { MaterialCommunityIcons ,Feather} from "@expo/vector-icons";

const space1 = "../assets/space-1.gif"

function InfoPage({toggleInfoPage,issData}){
    

    const data = [
        new Date(issData.timestamp*1000).toLocaleTimeString().replace(/:\d{2}\s/, ' '),
        new Date(issData.timestamp*1000).toLocaleDateString()
    ];
    const visibilityIcon= [
        <Feather name={issData.visibility==="daylight"?"sun":"moon"} size={24} color="white" />
    ];

    return(
        <View style={styles.wrapper}>
            <View style={styles.topBanner}>
                <MaterialCommunityIcons style={styles.exitIcon} name="location-exit" size={30} color="white"  onPress={toggleInfoPage} />
            </View>
            <View style={styles.main}>
            {/*<Button  title="chiudi" onPress={toggleInfoPage}/>*/}

                <View style={styles.column}>
                    {
                        <>
                            <Box data={{title:"latitude",content:[issData.latitude]}}/>
                            <Box data={{title:"longitude",content:[issData.longitude]}}/>
                            <Box data={{title:"time",content:data}}/>
                        </>
                    }
                </View>
                <View style={styles.column}>
                    {
                        <>
                            <Box data={{title:"altitude",content:[issData.altitude.toFixed(2) + " km"]}}/>
                            <Box data={{title:"velocity",content:[issData.velocity.toFixed(2) + " km/h"]}}/>
                            <Box data={{title:"visibilty",content:visibilityIcon}}/>
                        </>
                    }
                </View>
                
            </View>
            <StatusBar style="light" backgroundColor='black' hidden/>
            <Image source={require(space1)} style={styles.spaceBg}/>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        width:"100%",
        height:"100%"
    },
    main:{
        width:"100%",
        height:"100%",
        justifyContent:"center",
        flexDirection:"row"
    },
    column:{
        height:"100%",
        width:"50%",
    },
    spaceBg:{
        position:"absolute",
        height:"100%",
        zIndex:-1
    },
    exitIcon:{
        marginRight:10,
        marginTop:10
    },
    topBanner:{
        width:"100%",
        height:"5%",
        justifyContent:"center",
        alignItems:"flex-end"
    }
})

export default InfoPage;