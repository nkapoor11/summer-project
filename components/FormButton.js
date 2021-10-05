/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { FormButtonContainer } from '../styles';

const styles = StyleSheet.create({
    buttonText: {
        fontFamily: 'Akkurat-Bold',
        fontSize: 18,
        lineHeight: 36,
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 10
    },
    delText: {
        color: '#ffffff', // BBD8F2, 7bdbcb
        lineHeight: 30
    }
});
export default function FormButton({ buttonTitle, ...rest }) { // specify color (white, blue, etc)
    return (
        <FormButtonContainer {...rest}>
            <Text
                style={
                    rest.del
                        ? { ...styles.buttonText, ...styles.delText }
                        : styles.buttonText
                }
            >
                {buttonTitle}
            </Text>
        </FormButtonContainer>
    );
}
