/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';

import { View } from 'react-native';

import ClosetImage from '../../assets/images/home/home.png';
import ScheduleImage from '../../assets/images/Schedule/Schedule.png';

import styles from './style';
import NavItem from './NavItem';

export default function BottomTabBar({ state, descriptors, navigation, route }) {
    const onPress = (label) => {
        navigation.navigate(label);
    };

    return (
        <View style={styles.bottomContainer}>
            <NavItem onPress={onPress} image={ClosetImage} title="Closet" />
            <NavItem onPress={onPress} image={ScheduleImage} title="Schedule" />
        </View>
    );
}
