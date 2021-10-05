/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import { useSpring, animated } from 'react-spring';
import { AuthContext } from '../../navigation/AuthProvider';
import headerStyles from './Header.styles';
import ScheduleHeader from './ScheduleHeader';
import { ProductsContext } from '../../navigation/ProductsProvider';

const Header = ({ navigation, screen, send, current }) => {
    const { products } = useContext(ProductsContext);
    const { user } = useContext(AuthContext);
    const AnimatedView = animated(View);
    const springProps = useSpring({
        // config: { mass: 2, tension: 200, friction: 25 },
        // opacity: 1,
        // from: { opacity: 0, height: 0, backgroundColor: 'white' },
        backgroundColor: '#F2C2CF',
        justifyContent: 'space-around',
        //  reset: true,
        height: 200,
        alignItems: 'center',
        padding: 20,
        paddingBottom: 5,
        borderWidth: 1,
        borderColor: '#BEBEBE'
    });

    const renderHeader = () => {
        switch (true) {
            case screen === 'ClosetScreen':
                return (
                    <AnimatedView style={springProps}>
                        {/* add a condition for back arrow */}
                        <View
                            style={{
                                paddingTop: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignContent: 'center',
                                alignItems: 'center',
                                width: '100%'
                            }}
                        >
                            <View style={headerStyles.left}>
                                <Text style={headerStyles.title}>Welcome Back,</Text>
                                <Text style={headerStyles.subTitle}>
                                    {user.displayName}
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={headerStyles.right}
                                onPress={() => {
                                    send('VIEW_PROFILE');
                                    navigation.navigate('ProfileScreen');
                                }}
                            >
                                <FastImage
                                    style={headerStyles.avatarImage}
                                    source={
                                        user.photoURL
                                            ? { uri: user.photoURL }
                                            : require('../../assets/images/profile/profile.png')
                                    }
                                />
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{
                                marginTop: 10,
                                height: '50%',
                                width: '100%',
                                marginBottom: 10,
                                justifyContent: 'space-around',
                                flexDirection: 'row'
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    width: '40%',
                                    borderRadius: 20,
                                    justifyContent: 'center',
                                    paddingLeft: 15,
                                    borderWidth: 1
                                }}
                            >
                                <Text style={headerStyles.subTitle}>
                                    {products.length} Items
                                </Text>
                                <Text style={headerStyles.noteText}>in closet</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Schedule');
                                    send('CHANGE_TAB', { tab: 'Schedule' });
                                }}
                                style={{
                                    backgroundColor: '#7BDBCB',
                                    width: '40%',
                                    borderRadius: 20,
                                    padding: 15,
                                    borderWidth: 1,
                                    justifyContent: 'center'
                                }}
                            >
                                <Text style={headerStyles.subTitle}>Schedule a </Text>
                                <Text style={headerStyles.subTitle}>pickup</Text>
                            </TouchableOpacity>
                        </View>
                    </AnimatedView>
                );
            case current.context.tab === 'Schedule':
                return <ScheduleHeader navigation={navigation} homeMachineSend={send} />;

            default:
                return (
                    <View style={headerStyles.container}>
                        <TouchableOpacity
                            style={headerStyles.leftIcon}
                            onPress={() => {
                                send('BACK');
                                navigation.navigate('HomeScreen');
                            }}
                        >
                            <Image
                                source={require('../../assets/images/arrow-left/arrow-left.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={headerStyles.right}
                            onPress={() => {
                                send('VIEW_PROFILE');
                                navigation.navigate('ProfileScreen');
                            }}
                        >
                            <FastImage
                                style={headerStyles.avatarImage}
                                source={
                                    user.photoURL
                                        ? { uri: user.photoURL }
                                        : require('../../assets/images/profile/profile.png')
                                }
                            />
                        </TouchableOpacity>
                    </View>
                );
        }
    };

    return <>{renderHeader()}</>;
};

Header.propTypes = {
    navigation: PropTypes.any,
    screen: PropTypes.string,
    current: PropTypes.object,
    send: PropTypes.func
};

export default Header;
