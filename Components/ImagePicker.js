import React,{useState} from 'react';
import {View,Button,Text,StyleSheet,Image,Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Colors from '../constants/Colors';
const imgPicker=props=>{
    const [pickedImage,setPickedImage]=useState('');
    
    const verifyPermissions=async ()=>{

      const result =await Permissions.askAsync(Permissions.CAMERA,Permissions.CAMERA_ROLL);
      if(result.status !== 'granted'){
          Alert.alert('Insufficient permissions','You need to grant camera permission',
          [{ text:'Okay'}]
          );
          return false;
      }
      return true;
    }
    const takeImageHandler=async ()=>{
        const hasPermission=await verifyPermissions();
        if(!hasPermission){
            return;
        }
        const image= await ImagePicker.launchCameraAsync({
            allowsEditing: true,
           // aspect:[16,9],
            quality:0.1
        });
        setPickedImage(image.uri);
        props.onImageTake(image.uri);
    }
    return(
        <View style={styles.ImagePicker}>
            <View style={styles.ImagePreview}>
                {
                pickedImage?        
                <Image style={styles.image}
                source={{uri:pickedImage}}
                />
                :
                <Text>No Image Picked Yet</Text>
                }
                

            </View>
            
            <Button 
            title="Take Image" color={Colors.primary}
            
            onPress={takeImageHandler}
            
            />
           
        </View> 
    )
}

const styles=StyleSheet.create({
    ImagePicker:{
       // alignItems:'center',
        marginBottom:20,
        width:'100%'
    },
    ImagePreview:{
        width:'100%',
        height:200,
        marginBottom:10,
        justifyContent:'center',
        alignItems:'center',
        borderColor:Colors.primary,
        borderWidth:1,
        padding:1
    },
    image:{
        width:'100%',
        height:'100%',
    }
});

export default imgPicker;