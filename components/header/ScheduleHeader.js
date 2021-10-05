import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useSpring, animated } from 'react-spring';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import { ScheduleMachineContext } from '../../screens/schedule/ScheduleProvider';
import headerStyles from './Header.styles';
import { AuthContext } from '../../navigation/AuthProvider';

const ScheduleHeader = ({ navigation, homeMachineSend }) => {
    const { current, send } = useContext(ScheduleMachineContext);
    const { user } = useContext(AuthContext);
    const AnimatedView = animated(View);
    const springProps = useSpring({
        // config: { mass: 2, tension: 200, friction: 25 },
        // opacity: 1,
        // from: { opacity: 0, flex: 0, backgroundColor: 'white' },
        // flex: 0.2,
        backgroundColor: '#7BDBCB',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: 25,
        height: 200,
        reset: true
    });

    const renderTitle = () => {
        switch (true) {
            case current.matches('selectingService'):
                return 'Selecting Service';
            case current.matches('viewingSpecificOrder'):
            case current.matches('selectingPickUp'):
            case current.matches('selectingDropOff'):
            case current.matches('selectingSpecs'):
                return 'Schedule';
            case current.matches('reviewing'):
                return 'Review Order';

            default:
                break;
        }
    };

    const renderContent = () => {
        switch (true) {
            case current.matches('idle'):
            case current.matches('submitting'):
            case current.matches('viewingOrders'):
                return (
                    <>
                        <AnimatedView style={springProps}>
                            <View style={headerStyles.scheduleLeft}>
                                <Text style={headerStyles.title}>
                                    Hey {user.displayName},
                                </Text>
                                <Text style={headerStyles.subTitle}>
                                    Ready to do some Laundry?
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        // setReverse(true);
                                        send('SCHEDULE');
                                    }}
                                    style={headerStyles.scheduleButton}
                                >
                                    <Text style={headerStyles.buttonText}>Schedule</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={headerStyles.right}
                                onPress={() => {
                                    homeMachineSend('VIEW_PROFILE');
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
                        </AnimatedView>
                    </>
                );
            case current.matches('viewingSpecificOrder'):
            case current.matches('selectingService'):
            case current.matches('selectingPickUp'):
            case current.matches('selectingDropOff'):
            case current.matches('selectingSpecs'):
            case current.matches('reviewing'):
            case current.matches('failed'):
                return (
                    <View style={headerStyles.containerB}>
                        <TouchableOpacity
                            style={headerStyles.leftIcon}
                            onPress={() =>
                                current.matches('selectingService')
                                    ? send('CANCEL')
                                    : send('BACK')
                            }
                        >
                            <Image
                                source={require('../../assets/images/arrow-left/arrow-left.png')}
                            />
                        </TouchableOpacity>

                        <Text style={headerStyles.titleCenter}>{renderTitle()}</Text>
                    </View>
                );

            default:
                break;
        }
    };
    return <>{renderContent()}</>;
};
ScheduleHeader.propTypes = {
    navigation: PropTypes.any,
    homeMachineSend: PropTypes.object
};

export default ScheduleHeader;
