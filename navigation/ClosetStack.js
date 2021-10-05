/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import {
    createStackNavigator,
    HeaderTitle,
    HeaderBackButton
} from '@react-navigation/stack';
import { Text } from 'react-native';
import ClosetScreen from '../screens/ClosetScreen';
import ProductDisplayPageScreen from '../screens/productDisplay/ProductDisplayPageScreen';
import ClothingCategoryScreen from '../screens/ClothingCategoryScreen';
import Header from '../components/header/Header';
import { MainMachineContext } from './MainMachineProvider';

const Stack = createStackNavigator();

export default function ClosetStack({ navigation }) {
    const { current, send } = useContext(MainMachineContext);
    return (
        <Stack.Navigator initialRouteName="ClosetScreen" headerMode="screen">
            <Stack.Screen
                name="ClosetScreen"
                component={ClosetScreen}
                options={{
                    header: () => (
                        <Header
                            screen="ClosetScreen"
                            send={send}
                            navigation={navigation}
                        />
                    )
                }}
            />
            <Stack.Screen
                name="ProductDisplayPageScreen"
                component={ProductDisplayPageScreen}
                options={{
                    headerTintColor: 'black',
                    headerTitle: ' ',
                    headerBackTitle: ' '
                }}
            />
            <Stack.Screen
                name="ClothingCategoryScreen"
                options={{
                    headerTintColor: 'black',
                    headerTitle: () => (
                        <Text
                            style={{
                                fontSize: 30,
                                fontWeight: 'bold',
                                fontFamily: 'Akkurat-Bold'
                            }}
                        >
                            {current.context.categoryScreen}
                        </Text>
                    ),

                    headerBackTitle: ' '
                }}
            >
                {(props) => <ClothingCategoryScreen {...props} current={current} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
