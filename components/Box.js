import {View,Text,StyleSheet} from 'react-native';

function Box(){
    return(
        <View style={styles.main}>
            <Text>dato</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        width:"40%",
        borderColor:"black",
        height:100,
        borderWidth:1
    }
})

export default Box;