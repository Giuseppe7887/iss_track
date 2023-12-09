import { Text, View ,Button, StyleSheet,StatusBar} from "react-native";
import Box from "./Box";

function InfoPage({toggleInfoPage}){
    return(
        <View style={styles.main}>
            <Button  title="chiudi" onPress={toggleInfoPage}/>
            <Box/>
            <StatusBar style="light" backgroundColor='black' hidden/>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        backgroundColor:"white",
        width:"100%",
        height:"100%",
        justifyContent:"center"
    }
})

export default InfoPage;