import {View,Text,StyleSheet,PixelRatio} from 'react-native';


    
const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale;


function Box({data}){
    return(
        <View style={styles.main}>
            <View style={styles.textWrapper}> 
                <Text style={styles.title}>{data.title}</Text>
                {
                    data.content.map(x=><Text  key={x} style={styles.dato}>{x}</Text>)
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        width:"90%",
        height:150,
        margin:"2.5%",
        borderColor:"white",
        justifyContent:"center",
        alignItems:"center"
    },
    title:{
        color:"white",
        fontSize:getFontSize(25),
        marginBottom:getFontSize(10)
    },
    dato:{
        color:"white",
        fontSize:getFontSize(15)
    },
    textWrapper:{
        alignItems:"center",
        justifyContent:"enter",
    }
})  

export default Box;

{/*
shadowColor: "white",
        shadowOffset: {
	        width: 2,
	        height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 2,
    */}