import React,{useState,useEffect,useCallback} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Platform,Alert,SafeAreaView} from 'react-native';
import MapView,{Marker} from 'react-native-maps';
import Colors from '../constants/Colors'

const MapScreen=props=>{
    const initialLocation = props.navigation.getParam('initialLocation');
    

    console.log(initialLocation);
    const readonly=props.navigation.getParam('readonly');

    const [selectedLocation,setSelectedLocation] = useState(initialLocation);
    const mapRegion={
        latitude: initialLocation?initialLocation.lat: 23.068536,
        longitude:initialLocation?initialLocation.lng: 70.0786711,
        latitudeDelta: 0.0100,
        longitudeDelta: 0.0100
    }

    const selectLocationHandler = event =>{
        if(readonly){
            return;
        }
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        })
    }

    
    const savePickedLocation = useCallback(()=>{
        if(!selectedLocation) {
            Alert.alert('PICK A LOCATION PLEASE !','Can you please pick a location',
            [{ text:'Okay'}]
            );
            return;
        }
        props.navigation.navigate('NewPlace',{pickedLocation:selectedLocation});
    },[selectedLocation]);

    useEffect(()=>{
        props.navigation.setParams({saveLocation :savePickedLocation })
    },[savePickedLocation]);
       
    
    let markerCoordinates;

    if(selectedLocation) {
        markerCoordinates={
            latitude : selectedLocation.lat,
            longitude : selectedLocation.lng
        }
    }
    
    return(
        <MapView region={mapRegion} style={Styles.map} 
        onPress={selectLocationHandler}
        >
        {markerCoordinates && <Marker title='Picked Location' coordinate={markerCoordinates}></Marker>}    
        </MapView>
    );
};

MapScreen.navigationOptions = navData =>{
    const savefn=navData.navigation.getParam('saveLocation');
    const readonly=navData.navigation.getParam('readonly');
    if(readonly){
        return{};
    }
    return{
    headerRight: ()=>
        <TouchableOpacity style={Styles.headerButton} onPress={savefn}>
            <Text style={Styles.label}>Save</Text>
        </TouchableOpacity>
    };
};


const Styles=StyleSheet.create({
    map:{
        flex:1
    },
    label:{
        fontSize: 18,
        color:Platform.OS==='android'?'white':Colors.primary

    },
    headerButton:{
        marginHorizontal:20,
        
    }
});

export default MapScreen;