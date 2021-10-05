/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { KeyboardAvoidingView, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E8ECEF',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 24,
        marginBottom: 10
    }
});

export default function UsernameScreen({ route, navigation }) {
    const { user } = route.params;
    const [username, setUsername] = useState('');

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.text}>Choose a username.</Text>
            <FormInput
                value={username}
                placeholderText="Username"
                // eslint-disable-next-line no-shadow
                onChangeText={(username) => setUsername(username)}
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="username"
            />
            <FormButton
                buttonTitle="Continue"
                onPress={() =>
                    navigation.navigate('ChooseBrandsScreen', {
                        user,
                        username
                    })
                }
            />
        </KeyboardAvoidingView>
    );
}
