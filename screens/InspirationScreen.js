/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
        alignItems: 'center',
        backgroundColor: '#f5f5f1'
    },
    text: {
        fontSize: 20,
        color: '#333333'
    }
});

export default function InspirationScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.closetText}>Schedule screen coming soon</Text>
        </View>
    );
}
