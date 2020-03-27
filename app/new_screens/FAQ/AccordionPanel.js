import React, { Component } from 'react';

import { Platform, LayoutAnimation, StyleSheet, View, Text,Image, ScrollView, UIManager, TouchableOpacity } from 'react-native';
import HTML from 'react-native-render-html';
export default class AccordionPanel extends Component {

  constructor() {

    super();

    this.state = {

      updated_Height: 0

    }
  }

  componentWillReceiveProps(update_Props) {
    if (update_Props.item.expanded) {
      this.setState(() => {
        return {
          updated_Height: null
        }
      });
    }
    else {
      this.setState(() => {
        return {
          updated_Height: 0
        }
      });
    }
  }

  shouldComponentUpdate(update_Props, nextState) {

    if (update_Props.item.expanded !== this.props.item.expanded) {

      return true;

    }

    return false;

  }

  render() {

    return (

      <View style={styles.Panel_Holder}>

        <TouchableOpacity activeOpacity={0.7} onPress={this.props.onClickFunction} style={styles.Btn}>
            <View  style={{flexDirection:"row",justifyContent:"flex-start",marginLeft:5,alignItems:"center"}}>
            <Image source={require('../assets/nav/plus.png')} style={{width:20,height:20,marginRight:10}}/>
            <Text style={styles.Panel_Button_Text}>{this.props.item.question} </Text>

            </View>

          
        </TouchableOpacity>

        <View style={{ height: this.state.updated_Height, overflow: 'hidden',marginLeft:30 }}>

        <HTML style={styles.Panel_text} html={this.props.item.answer}  />
         
        </View>

      </View>

    );
  }
}
const styles = StyleSheet.create({
  
    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },
  
    Panel_text: {
      fontFamily:"roboto-light",
      fontSize: 18,
      color: '#000',
      padding: 10,
      marginLeft:20
    },
  
    Panel_Button_Text: {
      fontFamily:"roboto-light",
      textAlign: 'left',
      color: '#fff',
      fontSize: 15
    },
  
    Panel_Holder: {
      borderWidth: 1,
      borderColor: '#FF6F00',
      marginVertical: 5
    },
  
    Btn: {
      padding: 10,
      backgroundColor: '#FF6F00'
    }
  
  });