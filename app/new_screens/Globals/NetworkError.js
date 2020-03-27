import React from 'react';
import {Text, View, Image,Dimensions} from 'react-native';

const NetworkError =  (props)  => {
    
    return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>

         <Text style={{fontSize:22,color:'#4C74E6',fontWeight:'bold', fontFamily:'Roboto-Light',}}>Not Connected to internet</Text>

        </View>

      );
}

export default NetworkError ;