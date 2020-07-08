import {ADD_PLACE,SET_PLACE,DELETE_PLACE} from '../store/places-action'
import Place from '../Model/place';
const initialState ={
    places:[]
};

export default (state =initialState,action)=>{
    switch(action.type){

        case SET_PLACE:
            return{
                places:action.place
            };
        case ADD_PLACE:
          
            const newPlace=new Place(
                action.placeData.id.toString(),
                action.placeData.title,
                action.placeData.image,
                action.placeData.address,
                action.placeData.coords.lat,
                action.placeData.coords.lng,
                action.placeData.description
                
                );
         //   console.log(newPlace);
            
            return{
                ...state,
                places:state.places.concat(newPlace)
            };
      case DELETE_PLACE:
          console.log(action.pid);
      return {
        ...state,
        places: state.places.filter(
          places => places.id !== action.pid
        )
      };
        default:
            return state;
    }
    
}