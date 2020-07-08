import {createAppContainer,createSwitchNavigator} from 'react-navigation';

import {createStackNavigator,HeaderTitle} from 'react-navigation-stack'
import {Platform} from 'react-native'
import Colors from '../constants/Colors'
import PlacesListScreen from '../screens/PlaceListScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';
import StartupScreen from '../screens/StartupScreen';
import AuthNavigator from '../screens/user/AuthScreen';

const PlaceNavigator=createStackNavigator({
    Places : PlacesListScreen,
    PlaceDetail : PlaceDetailScreen,
    NewPlace : NewPlaceScreen,
    Map : MapScreen
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Platform.OS === 'android' ? Colors.primary :''
        },
        headerTintColor:Platform.OS === 'android' ? 'white' :Colors.primary
    }
});

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Place: PlaceNavigator
  });

export default createAppContainer(MainNavigator);