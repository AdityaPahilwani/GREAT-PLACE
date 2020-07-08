import React,{useState, useCallback,useReducer} from 'react';
import {View,Text,StyleSheet,TextInput,ScrollView,Button} from 'react-native';
import { exp } from 'react-native-reanimated';
import Colors from '../constants/Colors'
import {useDispatch} from 'react-redux';
import ImagePicker from '../Components/ImagePicker';
import LocationPicker from '../Components/LocationPicker';
import * as PlacesActions from '../store/places-action';
import * as firebase from 'firebase';
const NewPlaceScreen=props=>{
    const [titleValue,setTitleValue]=useState('');
    const [image,setImage]=useState('');
    const [description,setDesctiption]=useState('');
    const [selectedLocation,SetSelectedLocation] = useState();
    
    const dispatch=useDispatch();
    const titleChangeHandler=text=>{
        setTitleValue(text);
    }
    // const UPDATE_URL = 'UPDATE';
    // const UrlReducer = (state,action) =>{
    //     if(action.type === UPDATE_URL) {
    //       //  console.log(action.value+'kamine');
    //        return{ urlfirebase:action.value }
            
    //     }
    // }
    // const [urlState,dispatchUrlState] = useReducer(UrlReducer,{
    //     urlfirebase :'' 
    // })

    const saveHandler=async()=>{
       
//        await uploadImage(image,titleValue);
        //console.log(urlState.urlfirebase+'hey yoo');
        dispatch(PlacesActions.addPlace(titleValue,image,selectedLocation,description));
        props.navigation.goBack();
       
    }

    const imageTakenHandler= imagePath=>{
        console.log(image);
        setImage(imagePath);
     
    }
    const descriptionChangeHandler=text=>{
        setDesctiption(text);
    }
    const locationPickedHandler = useCallback(location =>{
        SetSelectedLocation(location);
    },[])
    
    
    // let url;
    // const uploadImage = async (uri, imageName) => {
    //     const response = await fetch(uri);
    //     const blob = await response.blob();
    //     var ref = firebase.storage().ref("images/").child(imageName);
    //     const picurl= await ref.put(blob);
    //     url=await ref.getDownloadURL();
    //     dispatchUrlState({type:UPDATE_URL,
    //         value:url
    //         })
    //    }
      
    return(
        <ScrollView>
        <View style={Styles.form}>
            <Text style={Styles.label}>Title</Text>
            <TextInput style={Styles.textInput}
            value={titleValue}
            onChangeText={titleChangeHandler}
            />
            <Text style={Styles.label}>Description</Text>
            <TextInput style={Styles.input}
            value={description}
            onChangeText={descriptionChangeHandler}
            multiline={true}
            />
            <Text style={Styles.label}>Image</Text>
            <ImagePicker
            onImageTake={imageTakenHandler}
            />
            <Text style={Styles.label}>Address</Text>
            <LocationPicker 
            onLocationPicker={locationPickedHandler}
            navigation={props.navigation} />
            <Button title="Save Place" color={Colors.primary}
            onPress={saveHandler}
            />
           
        </View>
        </ScrollView>
    );
};

NewPlaceScreen.navigationOptions=navData=>{
    return{
        headerTitle:'Add Place'
    }
}

const Styles=StyleSheet.create({
    form:{
        margin:30
    },
    label:{
        fontSize: 18,
        marginBottom:15
    },
    textInput:{
        borderBottomWidth:1,
        borderBottomColor:Colors.primary,
        marginBottom:15,
        paddingVertical:4,
        paddingHorizontal:2
    },
    input: {
        height:100,
        borderBottomColor:Colors.primary,
        borderBottomWidth:1,
        marginBottom:15,
        paddingVertical:4,
        paddingHorizontal:2,
        
    },
});

export default NewPlaceScreen;