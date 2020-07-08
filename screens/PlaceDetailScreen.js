import React,{useEffect} from 'react';
import {View,Text,StyleSheet,ScrollView,Image,TouchableOpacity,Share,Linking} from 'react-native';
import MapPreview from '../Components/MapPreview';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../Components/HeaderButton';
import {useSelector} from 'react-redux';
import Colors from '../constants/Colors';
import {Feather} from '@expo/vector-icons'
const PlaceDetailScreen=props=>{


    const placeId = props.navigation.getParam('placeId');
    const selectedPlace = useSelector(state => 
        state.places.places.find(place=>place.id === placeId)
        );
    
        const selectedLocation = {lat : selectedPlace.lat,lng : selectedPlace.lng};

        const showMapHandler = () =>{
            props.navigation.navigate('Map',{readonly: true,initialLocation : selectedLocation})
        }



        const  onShare = async () => {
          try {
            const result = await Share.share({
              message:
                'https://maps.google.com/?q=' + selectedLocation.lat + ',' +selectedLocation.lng
            });
      
          } catch (error) {
            alert(error.message);
          }
        };
        
       const navigate = () => {
          var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:'
          // var url = scheme + selectedLocation.lat + ',' +selectedLocation.lng
          var url = 'google.navigation:q='+ selectedLocation.lat + ',' +selectedLocation.lng
         // var url='geo: ' + selectedLocation.lat + ',' +selectedLocation.lng
       //   openExternalApp(url)
       console.log(url);
          Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            } else {
              Alert.alert(
                'ERROR',
                'Unable to open: ' + url,
                [
                  {text: 'OK'},
                ]
              );
            }
          });
        }


        useEffect(() => {
          props.navigation.setParams({ share: onShare});
        }, []);



    return(
       
       <View style={styles.container}>
       <Image  source={ {uri: selectedPlace.imageUri }}
       style={{ flex: 1,
       width: null,
       height: null,
       resizeMode: 'contain'}}
       />
       <View style={styles.bottomView}>
         <View style={styles.center}>
        <Text style={styles.title} numberOfLines={1}>{selectedPlace.title}</Text>
        </View>
        <ScrollView>
       
          <Text style={styles.text}>
          {selectedPlace.description}
          </Text>
          <TouchableOpacity style={styles.button} onPress={navigate}>
          <Text style={styles.text}> Navigate</Text>
          <Feather name="navigation" size={20} color="white" />
          </TouchableOpacity>
        </ScrollView>
       </View>
      
       </View>
       
    );
};

PlaceDetailScreen.navigationOptions=navData=>{
  const shareFn = navData.navigation.getParam('share');
    return{
        headerTitle:navData.navigation.getParam('placeTitle'),
        headerRight: ()=>
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Item"  iconName={'share-2'} onPress={shareFn}
           
           //   navData.navigation.navigate('NewPlace')
        />
        </HeaderButtons>
    };
};


const styles=StyleSheet.create({
  container: {
    flex: 1,
  },

  bottomView: {
    position: 'absolute',
    width:'100%',
    height: 250,
   // alignItems: 'center',
    bottom:0,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
  },
  title:{
    color:'white',
    fontSize:26,
   // fontFamily:'Menlo-Bold',
    padding:8
  },
  text:{
    color:'white',
    fontSize:18,
    padding:8,
    
  },
  button:{
    //width:400,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:Colors.primary,
    borderRadius:15,
    marginHorizontal:40,
    flexDirection:'row',
    padding:20,
    margin:20
  },
  center:{
    justifyContent:'center',alignItems:'center'
  }
});

export default PlaceDetailScreen;