import React, { useContext, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScheduleMachineContext } from './ScheduleProvider';
import scheduleStyle from './scheduleStyle';
import ScheduleList from './screens/ScheduleList';
import SelectingService from './screens/SelectingService';
import PickUp from './screens/PickUp';
import DropOff from './screens/DropOff';
import Review from './screens/Review';
import { pricingModalTypes } from './constants';
import Header from '../../components/header/Header';
import { MainMachineContext } from '../../navigation/MainMachineProvider';

const Scheduler = ({ navigation }) => {
    const { current, send } = useContext(ScheduleMachineContext);
    const mainContext = useContext(MainMachineContext);

    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollToPosition(0, 0);
    }, [current.value]);

    const renderContent = () => {
        switch (true) {
            case current.matches('idle'):
            case current.matches('submitting'):
                return <Text>LOADING</Text>;
            case current.matches('viewingOrders'):
                return <ScheduleList />;
            case current.matches('viewingSpecificOrder'):
                return <Text>Specific Order View</Text>;
            case current.matches('selectingService'):
                return <SelectingService />;
            case current.matches('selectingPickUp'):
                return <PickUp />;
            case current.matches('selectingDropOff'):
                return <DropOff />;
            case current.matches('selectingSpecs'):
                return <Text>Selecting Specs</Text>;
            case current.matches('reviewing'):
                return <Review />;
            case current.matches('failed'):
                return <Text>Failed</Text>;

            default:
                break;
        }
    };
    const renderButton = () => {
        switch (true) {
            case current.matches('selectingService'):
                return (
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-around' }}
                    >
                        <TouchableOpacity
                            onPress={() =>
                                send('TOGGLE', { modalType: pricingModalTypes.ALL })
                            }
                            style={scheduleStyle.whiteButton}
                        >
                            <Text style={scheduleStyle.blackButtonText}>See Pricing</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => send('NEXT')}
                            style={scheduleStyle.button}
                        >
                            <Text style={scheduleStyle.buttonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                );
            case current.matches('viewingSpecificOrder'):
            case current.matches('selectingPickUp'):
            case current.matches('selectingDropOff'):
                return (
                    <TouchableOpacity
                        onPress={() => send('NEXT')}
                        style={scheduleStyle.button}
                    >
                        <Text style={scheduleStyle.buttonText}>Continue</Text>
                    </TouchableOpacity>
                );
            case current.matches('selectingSpecs'):
                return (
                    <TouchableOpacity
                        onPress={() => send('NEXT')}
                        style={scheduleStyle.button}
                    >
                        <Text style={scheduleStyle.buttonText}>Review Order</Text>
                    </TouchableOpacity>
                );
            case current.matches('reviewing'):
                return (
                    <TouchableOpacity
                        onPress={() => send('NEXT')}
                        style={scheduleStyle.orderButton}
                    >
                        <Text style={scheduleStyle.orderButtonText}>
                            Place Order - $83.99
                        </Text>
                    </TouchableOpacity>
                );
            case current.matches('failed'):
            default:
                break;
        }
    };
    return (
        <KeyboardAwareScrollView
            ref={scrollRef}
            style={{ flex: 1, backgroundColor: 'white' }}
            keyboardShouldPersistTaps="always"
        >
            <Header current={mainContext.current} navigation={navigation} send={send} />
            {renderContent()}
            {renderButton()}
        </KeyboardAwareScrollView>
    );
};

export default Scheduler;
