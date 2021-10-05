import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import style from './style';
import { ScheduleMachineContext } from '../../ScheduleProvider';
import LocationSearchModal from '../locationSearch';

const TimeDetail = ({ type, address, date, time, addressType }) => {
    const { current, send } = useContext(ScheduleMachineContext);
    return (
        <View style={style.container}>
            <LocationSearchModal
                send={send}
                type={addressType}
                show={current.context.showSearchModal}
            />
            <Text style={style.h1}>{type}</Text>
            <Text style={style.h2}>Address</Text>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <Text style={style.adress}>{address}</Text>

                <TouchableOpacity
                    onPress={() => send('TOGGLE_SEARCH', { modalType: addressType })}
                >
                    <Text style={style.t1Right}>Edit</Text>
                </TouchableOpacity>
            </View>
            <Text style={style.h2}>Date / Time</Text>
            <Text style={style.adress}>{`${date} - ${time}`}</Text>
        </View>
    );
};

TimeDetail.propTypes = {
    type: PropTypes.string,
    address: PropTypes.string,
    time: PropTypes.string,
    date: PropTypes.string,
    addressType: PropTypes.string
};

export default TimeDetail;
