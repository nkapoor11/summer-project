/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { UploadPickerButtonContainer } from '../styles';

const styles = StyleSheet.create({
    buttonText: {
        fontFamily: 'Akkurat-Bold',
        fontSize: 23,
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center'
    }
});
export default function UploadButton({ buttonTitle, ...rest }) {
    return (
        <UploadPickerButtonContainer
            underlayColor={rest.primary ? '0000007F' : '#7bdbcb40'}
            {...rest}
        >
            <Text style={styles.buttonText}>{buttonTitle}</Text>
        </UploadPickerButtonContainer>
    );
}
