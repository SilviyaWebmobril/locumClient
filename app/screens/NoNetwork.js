import React, {Component} from 'react';
import {Text, View, Image,Dimensions} from 'react-native';

export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static navigationOptions = {
        header: null
    }


    render() {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>

           <Text style={{fontSize:22,color:'#4C74E6',fontWeight:'bold'}}>Not Connected to internet</Text>

          </View>

        )
    }
}
