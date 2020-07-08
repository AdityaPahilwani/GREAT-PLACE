import React,{useState,useEffect} from 'react';
import {View,Button,StyleSheet,Text,ActivityIndicator,Alert} from 'react-native';
import Colors from '../constants/Colors'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapPreview from './MapPreview'


const LocationPicker= props => {
    const [pickedLocation,setPickedLocation] = useState();
    
    const [isFetching,setIsFetching]=useState(false);
    
    const mapPickedLocation = props.navigation.getParam('pickedLocation')
    
    const {onLocationPicker} = props;

    useEffect(()=>{
        if(mapPickedLocation){
            setPickedLocation(mapPickedLocation)
            onLocationPicker(mapPickedLocation);
        }
    },[mapPickedLocation,onLocationPicker])

    const verifyPermissions=async ()=>{

        const result = await Permissions.askAsync(Permissions.LOCATION);
        if(result.status !== 'granted'){
            Alert.alert('Insufficient permissions','You need to grant camera permission',
            [{ text:'Okay'}]
            );
            return false;
        }
        return true;
      }

    const getLocationHandler = async() =>{
       const hasPermission= await verifyPermissions();
       if(!hasPermission)
       {
           return;
       }
       try{
        setIsFetching(true);
        const location = await Location.getCurrentPositionAsync({})
     //   console.log(location);
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        });


        onLocationPicker({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        });
       
        }
       
       catch(err)
       {
        console.log(err);
        Alert.alert('Could not fetch loaction','Please try again later or pick a location on the map',
        [{ text:'Okay'}]
        );
       }
      
       setIsFetching(false);
    };

    const pickOnMapHandler=async()=>{
      //  getLocationHandler();
        await getLocationHandler();
        if(pickedLocation)
        {
        props.navigation.navigate('Map',
        {
            initialLocation:pickedLocation
        })
        }
    };

    return (
        <View style={styles.locationPicker}>
            <MapPreview style={styles.mapPreview}
            onPress={pickOnMapHandler}
            location={pickedLocation}>
            {isFetching ?
             (<ActivityIndicator size="large" color={Colors.primary}  /> )
            :(<Text>No Location chosen yet</Text> )
             }   
             
            </MapPreview>
            <View style={styles.actions}>
            <Button title="Get User Location" color={Colors.primary}
            onPress={getLocationHandler}
            />
            <Button title="Pick on map" color={Colors.primary}
            onPress={pickOnMapHandler}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    locationPicker:{
        marginBottom :15, 
    },
    mapPreview:{
        marginBottom :10,
        width:'100%',
        height:150,
        borderColor:Colors.primary,
        borderWidth: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    actions:{
        marginTop:10,
        flexDirection:'row',
        justifyContent:'space-around',
        width:'100%'

    }
});

export default LocationPicker;