import React ,{ useState, useEffect } from 'react' ;
import {View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';



const SearchLocation = (props) => {

    const jobs_coordinates =  useSelector(state => state.search_job.search_jobs_list);
    let  region1 = {
        latitude: 3.148561,
        longitude: 101.652778,
        latitudeDelta: 0.2,
        longitudeDelta: 0.9
      };

      const LATITUDE_DELTA = 0.3;
      const LONGITUDE_DELTA = 0.3;

      const [region ,setRegion] = useState(region1);

      const getCurrentPosition = () => {
        try {
            Geolocation.getCurrentPosition(
            (position) => {
              const region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              };
              setRegion(region);
            },
            (error) => {
              //TODO: better design
              console.log("error on map",error);
            }
          );
        } catch(e) {
          alert(e.message || "");
        }
      };

      useEffect(() => {
        getCurrentPosition();
         
      }, []);

      const onNext =  () => {

            props.navigation.navigate('JobList');
      }

    return(
        <View style={{ flex:1 }}>

            {/* <MapView
              provider={PROVIDER_GOOGLE}
              style={{
                // top: 0,
                // left: 0,
                // right: 0,
                // bottom: 0,
                // position: 'absolute'
                width:"100%",
                height:"100%"
              }}
              
              minZoomLevel={11}
              region={region}
              showsUserLocation={true}
              //followUserLocation={true}
            
            >

              {jobs_coordinates.map((marker, index) => (
                <Marker
                  coordinate={marker.coordinates}
                  image={require('../assets/clinic/map-pin.png')}
                  title={marker.job_location}
                  key={index}
                />
              ))}

            </MapView> */}

            <TouchableOpacity
              onPress={onNext}
              style={styles.submitButton}>
              <Text style={styles.submitText}>Next</Text>
            </TouchableOpacity>

          </View>

     
    )

}



let styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
  
    },
    submitButton: {
      width: '80%',
      marginTop: 10,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: '#4C74E6',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#fff',
      marginTop: 40,
      alignSelf: 'flex-end',
      position: 'absolute',
      marginBottom: 10,
      bottom: 65,
      right: 35
      //right:(Dimensions.get('window').width * 50) / 100
  
    },
    submitText: {
      fontFamily:'roboto-bold',
      color: 'white',
      textAlign: 'center',
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 20,
    },
  
  })
  

export default SearchLocation;