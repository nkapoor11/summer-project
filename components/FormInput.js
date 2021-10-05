/* eslint-disable react/prop-types */
import React from 'react';
import { View, Image, StyleSheet, TextInput } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 10,
        width: windowWidth * 0.75,
        height: windowHeight / 15,
        borderRadius: 30
    },
    rightImage: {
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        position: 'absolute',
        right: 20
    },
    input: {
        paddingStart: 28,
        color: 'black',
        fontFamily: 'Akkurat-Bold',
        fontSize: 18,
        width: '80%'
    }
});
export default function FormInput({ labelValue, placeholderText, rightIcon, ...rest }) {
    return (
        <View style={styles.container}>
            <TextInput
                value={labelValue}
                style={styles.input}
                numberOfLines={1}
                placeholder={placeholderText}
                placeholderTextColor="rgba(0, 0, 0, 0.3)"
                allowFontScaling
                {...rest}
            />
            {rightIcon && <Image source={rightIcon} style={styles.rightImage} />}
        </View>
    );
}
