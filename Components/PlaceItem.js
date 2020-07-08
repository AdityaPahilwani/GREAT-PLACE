import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,Platform ,Alert,Linking,Animated} from 'react-native';

import {Swipeable} from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import * as placesActions from '../store/places-action';
import { useDispatch } from 'react-redux';

// import {GestureHandler} from 'expo';
// const {Swipeable} = GestureHandler

const PlaceItem = props => {
 



// const LeftAction =(progress,dragX)=>{
//   const scale=dragX.interpolate({
//     inputRange:[0,100],
//     outputRange:[0,1],
//     extrapolate:'clamp'

//   })
//   return (
//           <TouchableOpacity onPress={()=>{
//             Alert.alert(
//               'ERROR',
//               'Left: '
//               [{text: 'OK'}]
//             );
//     }}>
//     <View style={styles.Leftaction}> 
//         <Animated.Text style={[styles.actionText,{transform:[{scale}]}]}> 
//           Edit
//         </Animated.Text>
//     </View>
//     </TouchableOpacity>
//   )
// };


const dispatch=useDispatch();


const deletePlace=()=>{
  const {id} = props.id;
  dispatch(placesActions.delete_place(id));
}

const RightAction =(progress,dragX)=>{
  const scale=dragX.interpolate({
    inputRange:[-100,0],
    outputRange:[1,0],
    extrapolate:'clamp'

  });
  return (
    <TouchableOpacity onPress={()=>{
      // Alert.alert('Warning!','Are you sure?',
      // {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
      // {text: 'OK', onPress: deletePlace},
      // { cancelable: true }
      // );
      Alert.alert('Warning', 'Are you sure?', [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        { text: "OK", onPress: () => { console.log("OK Pressed");
         const {id} = props;
         console.log(id);
          dispatch(placesActions.delete_place(id));
        } 
        }
        ],
        { cancelable: true });
    }}>
    <View style={styles.Rightaction}> 
        <Text style={styles.actionText}> 
          Delete
        </Text>
    </View>
    </TouchableOpacity>
  )
};








//   <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}> 
// <TouchableOpacity onPress={openGps} style={styles.placeItem}>
// {['#fdfbfb', '#ebedee']}
//#de6262 → #ffb88c
  return (
    <Swipeable
    renderRightActions={RightAction}
    >
    <TouchableOpacity onPress={props.onSelect} >
     <LinearGradient colors= {['#fdfbfb', '#ebedee']} style={styles.placeItem}> 
      <Image style={styles.image} source={{ uri: props.image }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.address}>{props.address}</Text>
      </View>
    </LinearGradient>
    </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30 ,
    flexDirection: 'row',
    alignItems: 'center',
    flex:1
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ccc',
    borderColor: Colors.primary,
    borderWidth: 1
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  title: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5
  },
  address: {
    color: '#666',
    fontSize: 16
  },
  Leftaction:{
    backgroundColor:'#388e3c',
    justifyContent:'center',
    flex:1,
    
  },
  Rightaction:{
    backgroundColor:'#dd2c00',
    justifyContent:'center',
    flex:1,
   
  },
  actionText:{
    color:'#fff',
    fontWeight:'600',
    padding:20
  },
  gradient: {
    flex: 1,

  },
});

export default PlaceItem;
