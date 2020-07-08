export const ADD_PLACE='ADD_PLACE';
export const SET_PLACE='SET_PLACE';
export const DELETE_PLACE='DELETE_PLACE';

import * as FileSystem from 'expo-file-system';
import * as firebase from 'firebase';
import Place from '../Model/place';
import ENV from '../env'

export const addPlace=(title,image,location,description)=>{
   // const fileName=image.split('/').pop() creates an array bu splittinf with / then pops the last element
   return async (dispatch, getState) => {
    // any async code you want!
    const token = getState().auth.token;
    const userId = getState().auth.userId;
     /*   const response=await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`);

        if(!Response.ok){
            throw new Error('SOmething went wrong');
        }

        const resData = await response.json();
        //console.log(resData);
        const address = resData.results[0].formatted_address; 

*/


    // const response = await fetch(image);
    // const blob = await response.blob();
    // var ref = firebase.storage().ref("images/").child(title);
    // const picurl= await ref.put(blob);
    // url=await ref.getDownloadURL();
        
    let id1=userId+location.lat+location.lng+' ';
    console.log(image);
    const response = await fetch(image);
    const blob = await response.blob();
    var ref = firebase.storage().ref(`${userId}`).child(id1);
    const picurl= await ref.put(blob);
    url=await ref.getDownloadURL();
    //console.log(url);

        //address won't work because of api
        const fileName=image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;
        console.log(newPath);
        try {
        //   await FileSystem.moveAsync({
        //     from:image,
        //     to:newPath
        //     });
        const response = await fetch(
            `https://great-places-6195f.firebaseio.com/GREAT/${userId}.json?auth=${token}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
             //   id:id1,
                title,
                image:url,
                address:'Dummy Address',
                lat:location.lat,
                lng:location.lng,
                description
              })
            }
          );
          if (!response.ok) {
            throw new Error('Something went wrong!');
        }
    
        const resData = await response.json();
        
              //  console.log(dbResult);
                dispatch({type:ADD_PLACE,placeData:{
                    id:resData.name,
                    title:title,
                    image:url,
                   // address:address
                    address:'Dummy Address',
                    coords:{
                       lat:location.lat,
                       lng:location.lng
                    },
                    description:description

            }
    })
    //db.insertId console log dbresult it will give unique id in that field
            }
        catch(err)
        {
            console.log(err);
            throw err;
        }
        
    }
};


// export const loadPlaces=()=>{
//     return async dispatch=>{
//         try{
//             const dbResult =await fetchPlace();
//          //   console.log(dbResult);
//             dispatch({type:SET_PLACE,places:dbResult.rows._array});
//         } catch(err) {
//             throw err;
//         }
       
      
//     }
// }

export const loadPlaces = () => {
    return async (dispatch, getState) => {
      // any async code you want!
      const userId = getState().auth.userId;
      const token = getState().auth.token;
      try {
        const response = await fetch(
            `https://great-places-6195f.firebaseio.com/GREAT/${userId}.json`,
        );
  
        if (!response.ok) {
            const errData = await response.json();
            console.log(errData);
          throw new Error('Something went wrong! to get');
        }
  
        const resData = await response.json();
        const loadedPlaces = [];
  
        for (const key in resData) {
            loadedPlaces.push(
            new Place(
              key,
              resData[key].title,
              resData[key].image,
              resData[key].address,
              resData[key].lat,
              resData[key].lng,
              resData[key].description
            )
          );
        }
        console.log(loadedPlaces);
        dispatch({
          type: SET_PLACE,
          place: loadedPlaces
          
        });
      } catch (err) {
        // send to custom analytics server
        throw err;
      }
    };
};


export const  delete_place = placeId => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const response = await fetch(
      `https://great-places-6195f.firebaseio.com/GREAT/${userId}/${placeId}.json?auth=${token}`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    console.log('h');
    dispatch({ type: DELETE_PLACE, pid: placeId });
  };
};