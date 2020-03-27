
import React, { Component } from 'react';
import AccordionPanel from './AccordionPanel';
import NetInfo from "@react-native-community/netinfo";
import { showMessage } from '../Globals/Globals';

import { Platform, LayoutAnimation,SafeAreaView, StyleSheet,ActivityIndicator, TouchableWithoutFeedback,Image,View, Text, ScrollView, UIManager, TouchableOpacity } from 'react-native';
export default class FrequentlyAskedQues extends Component {

    

    constructor() {
      super();
      this.state ={
        AccordionData:[],
        loading_status:true
      }
  
      if (Platform.OS === 'android') {
  
        UIManager.setLayoutAnimationEnabledExperimental(true)
  
      }
  
  
    }


    componentDidMount() {

        this.fetch();


    }

   fetch() {

		NetInfo.isConnected.fetch().then(isConnected => {
			if (!isConnected) {
				this.props.navigation.navigate("NoNetwork")
				return;
			}
			else {

				this.setState({ loading_status: true })

				fetch('http://webmobril.org/dev/locum/api/faqs', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'multipart/form-data',
					},
				

				}).then((response) => response.json())
					.then((responseJson) => {
						this.setState({ loading_status: false })

						if (responseJson.status === 'success') {
							if (responseJson.data.length > 0) {

                                let array =  [...responseJson.data] ;
                                
                                array.forEach(item =>{

                                   Object.assign(item,{expanded:false});
                                })
                                console.log("array..",array);
								this.setState({ AccordionData: responseJson.data });


							}
							else {
								showMessage(0, "No FAQ found!", 'FAQ', true, false);

							}




						}
						else {
							showMessage(0, responseJson.message, 'FAQ', true, false);

						}



					}).catch((error) => {
						console.error(error);
					});
			}

		})

	}
  
    update_Layout = (index) => {
  
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  
      const array = this.state.AccordionData.map((item) => {
  
        const newItem = Object.assign({}, item);
  
        newItem.expanded = false;
  
        return newItem;
      });
  
      array[index].expanded = true;
  
      this.setState(() => {
        return {
          AccordionData: array
        }
      });
    }
  
    render() {

      if (this.state.loading_status) {
        return (
          <ActivityIndicator
            animating={true}
            style={styles.indicator}
            size="large"
          />
        );
      }
      return (
        <View style={{flex:1}}>
        <SafeAreaView style={{  backgroundColor: '#4C74E6'}} />
        
            
          <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}>
            {
              this.state.AccordionData.map((item, key) =>
                (
                  <AccordionPanel key={key} onClickFunction={this.update_Layout.bind(this, key)} item={item} />
                ))
            }
          </ScrollView>
  
       
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
  
    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      
    },
  
    Panel_text: {
      fontFamily:"Roboto-Light",
      fontSize: 18,
      color: '#000',
      padding: 10
    },
  
    Panel_Button_Text: {
      fontFamily:"Roboto-Light",
      textAlign: 'center',
      color: '#fff',
      fontSize: 21
    },
  
    Panel_Holder: {
      borderWidth: 1,
      borderColor: '#FF6F00',
      marginVertical: 5
    },
  
    Btn: {
      padding: 10,
      backgroundColor: '#FF6F00'
    },
    indicator: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 80
    }
  
  });