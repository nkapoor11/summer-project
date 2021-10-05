import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PropType from 'prop-types';
import scheduleStyle from './scheduleStyle';
import { pricingModalTypes } from './constants';

const getType = (pouds) => {
    if (pouds === 30) return pricingModalTypes.THIRTY;
    if (pouds === 60) return pricingModalTypes.SIXTY;
    if (pouds === 90) return pricingModalTypes.NINETY;
};

const Subscription = ({ pounds, cost, savings, selectedSub, send }) => {
    return (
        <TouchableOpacity
            style={
                selectedSub === pounds
                    ? scheduleStyle.selectedSubscription
                    : scheduleStyle.subscription
            }
            onPress={() =>
                send('UPDATE_SCHEDULE_DETAILS', {
                    fieldType: 'subType',
                    fieldValue: pounds
                })
            }
        >
            <View
                style={{
                    width: '15%',
                    justifyContent: 'center'
                }}
            >
                <Text style={scheduleStyle.subh1}>{pounds}</Text>
            </View>
            <View
                style={{
                    width: '60%',
                    justifyContent: 'center'
                }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Text style={scheduleStyle.subh2}>Pounds</Text>
                    <TouchableOpacity
                        onPress={() => send('TOGGLE', { modalType: getType(pounds) })}
                        style={{
                            marginLeft: 8,

                            justifyContent: 'center'
                        }}
                    >
                        <Image
                            source={require('../../assets/images/questionMark/questionMark.png')}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={scheduleStyle.subh3}>{cost}</Text>
            </View>
            <View
                style={{
                    width: '25%',
                    justifyContent: 'center'
                }}
            >
                <Text style={scheduleStyle.subh3right}>save</Text>
                <Text style={scheduleStyle.subh2right}>{savings}</Text>
            </View>
        </TouchableOpacity>
    );
};

Subscription.propTypes = {
    pounds: PropType.number,
    cost: PropType.string,
    savings: PropType.string,
    selectedSub: PropType.string,
    send: PropType.func
};

export default Subscription;
