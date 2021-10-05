import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import style from './style';
import ScheduleItem from '../component/scheduleItem/index';

const listMock = [
    {
        orderId: 23458345,
        type: 'Laundry',
        date: 'Jan 4 - Jan 21',
        status: 'Complete'
    },
    {
        orderId: 45642752,
        type: 'Laundry',
        date: 'Jan 4 - Jan 21',
        status: 'Complete'
    },
    {
        orderId: 8342643,
        type: 'Dry Clean',
        date: 'Jan 4 - Jan 21',
        status: 'Complete'
    },
    {
        orderId: 26904296,
        type: 'Laundry',
        date: 'Jan 4 - Jan 21',
        status: 'Failed'
    },
    {
        orderId: 4290623460,
        type: 'Dry Clean',
        date: 'Jan 4 - Jan 21',
        status: 'Failed'
    },
    {
        orderId: 29046820,
        type: 'Dry Clean',
        date: 'Jan 4 - Jan 21',
        status: 'Complete'
    },
    {
        orderId: 34324666,
        type: 'Laundry',
        date: 'Jan 4 - Jan 21',
        status: 'Complete'
    },
    {
        orderId: 6462666,
        type: 'Laundry',
        date: 'Jan 4 - Jan 21',
        status: 'Complete'
    },
    {
        orderId: 86544546,
        type: 'Laundry',
        date: 'Jan 4 - Jan 21',
        status: 'Complete'
    },
    {
        orderId: 8649458,
        type: 'Dry Clean',
        date: 'Jan 4 - Jan 21',
        status: 'Complete'
    },
    {
        orderId: 23458345,
        type: 'Laundry',
        date: 'Jan 4 - Jan 21',
        status: 'Complete'
    }
];

const ScheduleList = () => {
    return (
        <>
            <View style={style.header}>
                <Text style={style.h1}>Current Order</Text>
                <Text style={style.subText}>View</Text>
            </View>
            <ScrollView contentContainerStyle={style.listContainer}>
                {listMock.map((order) => (
                    <ScheduleItem
                        orderId={order.orderId}
                        type={order.type}
                        date={order.date}
                        status={order.status}
                    />
                ))}
            </ScrollView>
        </>
    );
};

export default ScheduleList;
