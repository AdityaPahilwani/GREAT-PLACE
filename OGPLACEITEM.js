import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,Platform ,Alert,Linking,Animated} from 'react-native';

import {Swipeable} from 'react-native-gesture-handler';
import Colors from '../constants/Colors';

// import {GestureHandler} from 'expo';
// const {Swipeable} = GestureHandler

const PlaceItem = props => {
  openGps = () => {
  
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:'
    var url = scheme + props.lat +','+props.lng
    url = 'google.navigation:q='+ props.lat +','+props.lng
    console.log(url);
    openExternalApp(url)
  }

openExternalApp = (url) => {
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

const LeftAction =(progress,dragX)=>{
  const scale=dragX.interpolate({
    inputRange:[0,100],
    outputRange:[0,1],
    extrapolate:'clamp'

  })
  return (
          <TouchableOpacity onPress={()=>{
            Alert.alert(
              'ERROR',
              'Left: '
              [{text: 'OK'}]
            );
    }}>
    <View style={styles.Leftaction}> 
        <Animated.Text style={[styles.actionText,{transform:[{scale}]}]}> 
          Edit
        </Animated.Text>
    </View>
    </TouchableOpacity>
  )
};
const RightAction =(progress,dragX)=>{
  const scale=dragX.interpolate({
    inputRange:[-100,0],
    outputRange:[1,0],
    extrapolate:'clamp'

  })
  return (
    <TouchableOpacity onPress={()=>{
      Alert.alert(
        'ERROR',
        'Right: '
        [{text: 'OK'}]
      );
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
  return (
    <Swipeable
    renderLeftActions={LeftAction}
    renderRightActions={RightAction}
    >
    <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
      <Image style={styles.image} source={{ uri: props.image }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.address}>{props.address}</Text>
      </View>
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
  }
});

export default PlaceItem;
