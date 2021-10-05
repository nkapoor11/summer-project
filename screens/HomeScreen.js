/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClosetStack from '../navigation/ClosetStack';
import BottomTabBar from '../components/BottomTab/BottomTabBar';
import { AuthContext } from '../navigation/AuthProvider';
import useFirebaseNotification from '../hooks/useFirebaseNotification';
import { ProductsContext } from '../navigation/ProductsProvider';
import ClosetScreen from './ClosetScreen';
import InspirationScreen from './InspirationScreen';
import Scheduler from './schedule';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
    closetText: {
        marginBottom: 'auto',
        marginTop: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'baseline',
        backgroundColor: 'white'
    },
    text: {
        fontSize: 20,
        color: '#333333'
    },
    search: {
        resizeMode: 'contain',
        height: 19,
        width: 19,
        marginLeft: 4
    },
    profile: {
        marginRight: 20,
        borderWidth: 2
    },
    profileWithoutBorder: {
        flex: 2,
        marginRight: 20
    }
});

export default function HomeScreen({ route, navigation, send }) {
    useFirebaseNotification();

    const [search, setSearchTerm] = useState('');
    const { user } = useContext(AuthContext);
    const { currentScreen } = useContext(ProductsContext);

    const updateSearch = useCallback(
        (search) => {
            setSearchTerm(search);
        },
        [search]
    );

    return (
        //  eslint-disable-next-line react/jsx-props-no-spreading
        <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
            <Tab.Screen
                name="Closet"
                component={ClosetStack}
                initialParams={{ showSuccess: route.params?.showSuccess }}
            />
            <Tab.Screen name="Schedule" component={Scheduler} />
        </Tab.Navigator>
    );
}
