
import React from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import Header from '../components/Home/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import home from '../screens/HomeScreen/Home';
import BottomBar from './BottomBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';



const BottomNavigation: React.FunctionComponent = () => {
    return (
        <>
            <NavigationContainer theme={DarkTheme}>
                <StatusBar barStyle="dark-content" />
                <BottomBar />
            </NavigationContainer>
        </>
    );
}
export default BottomNavigation;
