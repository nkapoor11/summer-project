/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-alert */
/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { KeyboardAvoidingView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { AuthContext } from '../navigation/AuthProvider';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E8ECEF',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    forgotPassword: {
        flexDirection: 'row'
    },
    forgotText: {
        fontFamily: 'Akkurat-Bold',
        fontSize: 14
    },
    reset: {
        color: '#7BDBCB',
        fontFamily: 'Akkurat-Bold',
        fontSize: 14
    },
    text: {
        fontSize: 24,
        marginBottom: 10
    }
});

export default function LoginSignupScreen({ route, navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const { forgotPassword, login } = useContext(AuthContext);
    const { method } = route.params;

    const dispatchLogin = (email, password) => {
        if (!checkValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!checkValidPassword(password)) {
            alert('Please enter a valid password.');
            return;
        }

        method === 'signup'
            ? navigation.navigate('UsernameScreen', {
                  user: { email, password }
              })
            : login(email, password);
    };

    const resetPassword = () => {
        if (!checkValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        forgotPassword(email);
    };

    const validateEmail = (email) => {
        checkValidEmail(email);
        setEmail(email);
    };

    const checkValidEmail = (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        // eslint-disable-next-line no-unused-vars
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const valid = expression.test(String(email)?.toLowerCase());
        setEmailValid(valid);
        return valid;
    };

    const checkValidPassword = (password) => {
        let valid = true;
        if (password.length < 7) {
            valid = false;
        }
        return valid;
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.text}>Enter email and password.</Text>
            <FormInput
                value={email}
                placeholderText="Email"
                onChangeText={(email) => validateEmail(email)}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                autoCompleteType="email"
                rightIcon={
                    emailValid
                        ? require('../assets/images/check-green-circle/check-green-circle.png')
                        : null
                }
            />
            <FormInput
                value={password}
                placeholderText="Password"
                autoCompleteType="password"
                onChangeText={(userPassword) => setPassword(userPassword)}
                secureTextEntry
            />
            <FormButton
                buttonTitle="Continue"
                onPress={() => dispatchLogin(email, password)}
            />
            {method === 'login' && (
                <TouchableOpacity
                    style={styles.forgotPassword}
                    onPress={() => resetPassword()}
                >
                    <Text style={styles.forgotText}>Forgot password? </Text>
                    <Text style={styles.reset}>Reset</Text>
                </TouchableOpacity>
            )}
        </KeyboardAvoidingView>
    );
}
