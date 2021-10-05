import React, { useState, useEffect, useContext } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

import scheduleStyle from '../scheduleStyle';
import style from './style';
import TimeDetail from '../component/timeDetail';
import { ScheduleMachineContext } from '../ScheduleProvider';
import Map from '../component/map/Map';

const recuringOptions = ['every week', 'bi-weekly'];

MapboxGL.setAccessToken(
    'pk.eyJ1IjoiYmF2MTQ1IiwiYSI6ImNrYWxudGdpZDBjNTcyeWxvdGtlZTJ2ZmUifQ.79lkyicOpGhe83ritcnPaw'
);

const Review = () => {
    useEffect(() => {
        MapboxGL.setTelemetryEnabled(false);
    }, []);
    const { current, send } = useContext(ScheduleMachineContext);
    const [recuringOption, setRecuringOption] = useState('');
    return (
        <>
            <View style={style.progressContainer}>
                <Image
                    source={require('../../../assets/images/progress/progress4.png')}
                />
            </View>

            <Map
                lng={current.context.schedulingDetails.dLng}
                lat={current.context.schedulingDetails.dLat}
            />

            <View style={{ margin: 20 }}>
                {/* Pick pick */}
                <TimeDetail
                    type="Pick-up"
                    address={current.context.schedulingDetails.pickupAddress}
                    date="Mon April 14"
                    time="8AM"
                    addressType="pickUp"
                />
                {/* Drop off */}
                <TimeDetail
                    type="Drop-off"
                    address={current.context.schedulingDetails.dropoffAddress}
                    date="Mon April 16"
                    time="8AM"
                    addressType="dropOff"
                />

                <Text style={style.h1Wmargin}>Services</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text
                        style={style.h2Wmargin}
                    >{`Subscription - ${current.context.schedulingDetails.subType} pound plan`}</Text>

                    <TouchableOpacity>
                        <Text style={style.t1Right}>Edit</Text>
                    </TouchableOpacity>
                </View>
                <Text style={style.h2Wmargin}>Special Instructions</Text>
                <TextInput
                    style={scheduleStyle.inputNoM}
                    placeholder="Add Special Instruction"
                    onChangeText={(text) =>
                        send('UPDATE_SCHEDULE_DETAILS', {
                            fieldType: 'specialInstruction',
                            fieldValue: text
                        })
                    }
                    value={current.context.schedulingDetails.specialInstruction}
                />
                {/* <TextInput
                style={scheduleStyle.input}
                onChangeText={onNoteChange}
                value={note}
                placeholder="Add Special Instruction"
            /> */}

                <View style={{ alignContent: 'center', marginTop: 15, marginBottom: 15 }}>
                    <Text style={style.h1}>Make it Recurring?</Text>
                    {recuringOptions.map((option) => (
                        <TouchableOpacity
                            onPress={() => {
                                // eslint-disable-next-line no-unused-expressions
                                option === recuringOption
                                    ? setRecuringOption('')
                                    : setRecuringOption(option);
                            }}
                            style={{ flexDirection: 'row', marginTop: 10 }}
                        >
                            <Image
                                source={
                                    recuringOption === option
                                        ? require('../../../assets/images/selectedBox/selectedBox.png')
                                        : require('../../../assets/images/unSelectedBox/unSelectedBox.png')
                                }
                            />
                            <Text>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <>
                    <Text style={style.h1Wmargin}>Payment Method</Text>
                    <Text style={{ lineHeight: 18 }}>
                        If Changed, your most recent selection will be your new default
                        payment method
                    </Text>
                </>
            </View>
        </>
    );
};

export default Review;
