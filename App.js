import React from 'react';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk'
import  PlacesNavigation from './Navigation/PlacesNavigation';
import placeReducer from './store/places-reducer';

import ApiKeys from './constants/ApiKeys'
import * as firebase from 'firebase';
import authReducer from './store/auth-reducer';
import {SafeAreaView} from 'react-native';

const rootReducer=combineReducers({
  places:placeReducer,
  auth:authReducer
});
const store=createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {
  if (!firebase.apps.length) 
  {
    console.log('innnnnnnnnnn yess' +ApiKeys.FirebaseConfig.storageBucket);
    firebase.initializeApp(ApiKeys.FirebaseConfig); 
  }
  return (
    <Provider store={store}>
      
      <PlacesNavigation />
    </Provider>
  );
}

