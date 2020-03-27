import React ,{useState, useEffect} from 'react';
import {View ,ActivityIndicator, StyleSheet} from 'react-native';

const MyActivityIndicator = (props) => {

    return (
        <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: 'rgba(255, 255, 255, 0.9)', justifyContent: 'center' }
        ]}
        >
        <ActivityIndicator
            animating={true}
            color='#4C74E6'
            style={styles.indicator}
            size="large"
        />
        </View>
    );
}

const styles = StyleSheet.create({
    indicator: {
        
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 80
	}

});

export default MyActivityIndicator;