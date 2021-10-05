import React, { useContext } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import style from './style';
import Subscription from '../Subscription';
import PricingModal from '../component/priceModal';
import { ScheduleMachineContext } from '../ScheduleProvider';

const subscriptionData = [
    {
        pounds: 30,
        cost: '$12.50/wk',
        savings: '$3/mo'
    },
    {
        pounds: 60,
        cost: '$24.25/wk',
        savings: '$8/mo'
    },
    {
        pounds: 90,
        cost: '$35.50/wk',
        savings: '$16/mo'
    }
];

const SelectingService = () => {
    const { current, send } = useContext(ScheduleMachineContext);
    return (
        <>
            <PricingModal
                show={current.context.showPricingModal}
                send={send}
                type={current.context.priceModalType}
            />
            <View style={style.progressContainer}>
                <Image
                    source={require('../../../assets/images/progress/progress1.png')}
                />
            </View>

            <Text style={style.title}>Pay as You Go</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity
                    style={
                        current.context.schedulingDetails.type === 'Laundry'
                            ? style.selectedServiceOption
                            : style.serviceOption
                    }
                    onPress={() =>
                        send('UPDATE_SCHEDULE_DETAILS', {
                            fieldType: 'type',
                            fieldValue: 'Laundry'
                        })
                    }
                >
                    {current.context.schedulingDetails.type === 'Laundry' ? (
                        <Image
                            source={require('../../../assets/images/check/check.png')}
                        />
                    ) : (
                        <></>
                    )}
                    <Text style={style.sOptionh1}>Laundry</Text>
                    <Text style={style.sOptionh2}>$1.50 / pound</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={
                        current.context.schedulingDetails.type === 'Dry Cleaning'
                            ? style.selectedServiceOption
                            : style.serviceOption
                    }
                    onPress={() =>
                        send('UPDATE_SCHEDULE_DETAILS', {
                            fieldType: 'type',
                            fieldValue: 'Dry Cleaning'
                        })
                    }
                >
                    {current.context.schedulingDetails.type === 'Dry Cleaning' ? (
                        <Image
                            source={require('../../../assets/images/check/check.png')}
                        />
                    ) : (
                        <></>
                    )}

                    <Text style={style.sOptionh1}>Dry Cleaning</Text>
                    <Text style={style.sOptionh2}>Pricing Varies</Text>
                </TouchableOpacity>
            </View>
            <Text style={style.title}>Monthly Laundry</Text>
            <Text style={style.title}>Subscription</Text>
            {subscriptionData.map((subData) => (
                <Subscription
                    pounds={subData.pounds}
                    cost={subData.cost}
                    savings={subData.savings}
                    selectedSub={current.context.schedulingDetails.subType}
                    send={send}
                />
            ))}
            {/* <TextInput
                style={scheduleStyle.input}
                onChangeText={onNoteChange}
                value={note}
                placeholder="Add Special Instruction"
            /> */}
        </>
    );
};

export default SelectingService;
