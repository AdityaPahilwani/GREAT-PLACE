import React from 'react';
import {Platform} from 'react-native';
import { HeaderButton} from 'react-navigation-header-buttons';
import {Ionicons,AntDesign,Feather} from '@expo/vector-icons'
import Colors from '../constants/Colors'
const CustomHeaderButton=props=>{
    return <HeaderButton {...props}
            IconComponent={Ionicons,AntDesign,Feather}
           
            iconSize={30}
            color={Platform.OS==='android'?'white':Colors.primary}
    />
};

export default CustomHeaderButton;