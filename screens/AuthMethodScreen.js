/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

export default function AuthMethodScreen({ route, navigation }) {
    const { loginFB } = useContext(AuthContext);
    const { method } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {method === 'signup' ? "Let's get started!" : 'Welcome back!'}
            </Text>
            <FormButton
                primary
                buttonTitle={
                    method === 'signup' ? 'Sign up with email' : 'Sign in with email'
                }
                onPress={() =>
                    navigation.navigate('LoginSignup', {
                        method
                    })
                }
            />
            <FormButton
                buttonTitle={
                    method === 'signup'
                        ? 'Sign up with Facebook'
                        : 'Sign in with Facebook'
                }
                onPress={() => loginFB()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E8ECEF',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'space-between'
    },
    text: {
        fontFamily: 'Akkurat-Bold',
        fontSize: 24,
        lineHeight: 30,
        marginBottom: 10
    }
});
