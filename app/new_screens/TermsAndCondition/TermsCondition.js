import React ,{ useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet,ActivityIndicator} from 'react-native';
import { WebView } from 'react-native-webview';

const TermsAndCondition = (props) => {

    const [loading,setLoading] = useState(true);

    const hideSpinner = () =>{

        setLoading(false)
    }

    return(
      
        <View style={{flex:1}}>
            <WebView
                onLoad={hideSpinner}
                source={{ uri:'http://webmobril.org/dev/locum/api/api_pages?page_id=2'}}
                style={{ marginTop: 10 }}
                
            />
            {loading && (
                <View
                style={[
                StyleSheet.absoluteFill,
                { backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }
                ]}
                >
                    <ActivityIndicator size="large" />
                </View>
            )}
        </View>
    
    )
}


export default TermsAndCondition ;