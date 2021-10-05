import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import style from './style';

const ScheduleItem = ({ orderId, type, date, status }) => {
    return (
        <TouchableOpacity style={style.container}>
            <View style={style.iconView}>
                <Image
                    style={style.statusIcon}
                    source={
                        status === 'Complete'
                            ? require('../../../../assets/images/check-mark/check-mark.png')
                            : require('../../../../assets/images/x-mark/x-mark.png')
                    }
                />
            </View>
            <View style={style.orderStatus}>
                <Text style={style.h1}>{`${type} (#${orderId})`}</Text>
                <Text style={style.h2}>
                    {status === 'Complete' ? date : 'Reschedule'}{' '}
                </Text>
            </View>
            <View style={style.iconView}>
                <Image
                    style={style.arrowRight}
                    source={require('../../../../assets/images/arrow-right/arrow-right.png')}
                />
            </View>
        </TouchableOpacity>
    );
};

ScheduleItem.propTypes = {
    orderId: PropTypes.number,
    type: PropTypes.string,
    date: PropTypes.string,
    status: PropTypes.string
};

export default ScheduleItem;
