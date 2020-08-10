import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {View ,TouchableOpacity,Text,Image,StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-navigation';

const MyHeader =(props) => {

    return (
    <>
    <LinearGradient   
        colors= {["#4E73E6","#9456CE"]}
        start= {{x: 0.0, y: 0.5}}
        end= {{ x: 0.6, y: 0.4 }} >
    <SafeAreaView  />
    </LinearGradient>
    <LinearGradient   
        style={{ height:60,}}
        colors= {["#4E73E6","#9456CE"]}
        start= {{x: 0.0, y: 0.5}}
        end= {{ x: 0.6, y: 0.4 }} >

        <View  style={{flexDirection:"row",padding:20}}>
            {props.title === 'Home'
            ?
                <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                    <Image style={{ width: 20, height: 20, }} source={require('../assets/clinic/menu-options.png')} />
                </TouchableOpacity>
            :
                <TouchableOpacity onPress={() =>  {props.value === 0 ? props.navigation.pop() : props.navigation.goBack()}}>
                    <Image style={{ width: 20, height: 20, }} source={require('../assets/clinic/left-arrow.png')} />
                </TouchableOpacity>
            }
           

          
        <Text style={styles.userNameStyle}>{props.title}</Text>
          
      </View>
    </LinearGradient>
    </>
    
    )
}

const styles = StyleSheet.create({

    userNameStyle:{
        flex:1,
       
        textAlign:"center",
        fontSize:18,
        alignSelf:"center",
        color:'white',
        fontWeight:"bold",
        fontFamily:'Roboto-Bold'
    }
})

export default MyHeader;