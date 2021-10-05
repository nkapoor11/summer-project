import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginSignupScreen from '../screens/LoginSignupScreen';
import LandingScreen from '../screens/LandingScreen';
import AuthMethodScreen from '../screens/AuthMethodScreen';
import UsernameScreen from '../screens/UsernameScreen';
import ChooseBrandsScreen from '../screens/ChooseBrandsScreen';

const Stack = createStackNavigator();
// replace "Landing" with whatever page your working on, like "LoginSignup"
export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Landing"> 
            <Stack.Screen
                name="Landing"
                component={LandingScreen}
                options={{ header: () => null }}
            />
            <Stack.Screen
                name="AuthMethod"
                component={AuthMethodScreen}
                options={{
                    title: 'Create account',
                    headerBackTitleVisible: false,
                    headerTintColor: 'black'
                }}
            />
            <Stack.Screen
                name="LoginSignup"
                component={LoginSignupScreen}
                options={{
                    title: 'Create account',
                    headerBackTitleVisible: false,
                    headerTintColor: 'black'
                }}
            />
            <Stack.Screen
                name="UsernameScreen"
                component={UsernameScreen}
                options={{
                    title: 'Create account',
                    headerBackTitleVisible: false,
                    headerTintColor: 'black'
                }}
            />
            <Stack.Screen
                name="ChooseBrandsScreen"
                component={ChooseBrandsScreen}
                options={{
                    title: 'Create account',
                    headerBackTitleVisible: false,
                    headerTintColor: 'black'
                }}
            />
        </Stack.Navigator>
    );
}
