import React, { useContext } from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import style from './style';
import { MainMachineContext } from '../../navigation/MainMachineProvider';

const NavItem = ({ image, title, onPress }) => {
    const { current, send } = useContext(MainMachineContext);
    return (
        <TouchableOpacity
            onPress={() => {
                if (current.context.tab !== title) {
                    try {
                        current.context.nav.goBack();
                    } catch (error) {
                        //
                    }
                    onPress(title);
                    send('CHANGE_TAB', { tab: title });
                }
            }}
            style={style.navItemContainer}
        >
            <Image
                style={{
                    tintColor: current.context.tab === title ? '#7BDBCB' : '#222',
                    width: 25,
                    height: 25,
                    resizeMode: 'contain'
                }}
                source={image}
            />
            <Text
                style={{
                    color: current.context.tab === title ? '#7BDBCB' : '#222',
                    fontFamily: 'Akkurat-Bold',
                    fontSize: 15
                }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

NavItem.propTypes = {
    image: PropTypes.number,
    title: PropTypes.string,
    onPress: PropTypes.func
};

export default NavItem;
