import React,{useEffect,useCallback} from 'react';
import {View,Text,StyleSheet,Platform,FlatList,TouchableOpacity,ScrollView,Alert} from 'react-native';
import { exp } from 'react-native-reanimated';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../Components/HeaderButton';
import {useSelector,useDispatch} from 'react-redux';
import {Ionicons} from '@expo/vector-icons'
import Colors from '../constants/Colors'
import PlaceItem from '../Components/PlaceItem';
import * as placesActions from '../store/places-action';
import * as authActions from '../store/auth';
import {SwipeableFlatList} from 'react-native-swipeable-flat-list';
const PlaceListScreen=props=>{
    const places = useSelector(state => state.places.places);
    const dispatch = useDispatch();
    const logout=useCallback(()=>{
       


        Alert.alert('Logout', 'Are you sure?', [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            { text: "OK", onPress: () => { 
                dispatch(authActions.logout());
                props.navigation.navigate('Auth');
            } 
            }
            ],
            { cancelable: true });











        },[dispatch]
    );
    useEffect(()=>{
        dispatch(placesActions.loadPlaces());
        props.navigation.setParams({log:logout});
       
    },[dispatch])


    
    return(
        <View style={styles.container}>
       <FlatList
       data={places}
       keyExtractor={item => item.id}
       renderItem={itemData =>(
        <PlaceItem 
        onSelect={()=>{
            console.log(itemData.item.imageUri);
            props.navigation.navigate('PlaceDetail',{
            placeTitle:itemData.item.title,
            placeId:itemData.item.id
            })
        }}
        address={itemData.item.address}
        title={itemData.item.title}
        image={itemData.item.imageUri}
        lat={itemData.item.lat}
        lng={itemData.item.lng}
        id={itemData.item.id}
        />
        
       )
       }
    >
    </FlatList>
    <TouchableOpacity onPress={() => {props.navigation.navigate('NewPlace')}} style={styles.fab}>
        <Text style={styles.fabIcon}>
        <Ionicons name="md-add" size={35} color="white" />
       </Text>
    </TouchableOpacity>
    </View>
    );
};

PlaceListScreen.navigationOptions=navData=>{
    const logout = navData.navigation.getParam('log');
    return{
        headerTitle:'All Places',
        headerRight: ()=>
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Item"  iconName={'user'} onPress={logout}/>
        </HeaderButtons>
        
    };
};

const styles=StyleSheet.create({
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor:'black'
      },
      container: {
        flex: 1,
      },
      fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor:Colors.primary,
        borderRadius: 30,
        elevation: 8,
        
      }
});

export default PlaceListScreen;