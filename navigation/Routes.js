/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { AuthContext } from './AuthProvider';
import { ProductsContext } from './ProductsProvider';
import Loading from '../components/Loading';

import { checkPermission } from '../utils/firebasePushNotification';

export default function Routes() {
    const { user, setUser, setTapId } = useContext(AuthContext);
    // eslint-disable-next-line no-unused-vars
    const { setUploadedProduct, uploadedProduct } = useContext(ProductsContext);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return () => subscriber();
    }, []);

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
        setLoading(false);
        checkPermission().then(() => {
            try {
                const validateUser = functions().httpsCallable('syncTap');
                validateUser({ userEmail: user.email, uid: user.uid });
            } catch (error) {
                //
            }
        });
        if (user) {
            firestore()
                .collection('users')
                .doc(user.uid)
                .get()
                .then((usr) => {
                    try {
                        setTapId(usr.data().tapId);
                    } catch (error) {
                        console.log(error);
                    }
                });
        }
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <NavigationContainer>{user ? <HomeStack /> : <AuthStack />}</NavigationContainer>
    );
}
