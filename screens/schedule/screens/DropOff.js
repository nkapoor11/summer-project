import React, { useState, useContext } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import style from './style';
import scheduleStyle from '../scheduleStyle';
import { ScheduleMachineContext } from '../ScheduleProvider';
import LocationSearchModal from '../component/locationSearch';
import Map from '../component/map/Map';

const DropOff = () => {
    const [selectedDayObject, setSelectedDayObject] = useState({});
    const availableTimes = ['7am-8am', '10am-1pm', '1pm-2pm', '4pm-5pm'];
    const [selectedTime, setSelectedTime] = useState('');
    const { current, send } = useContext(ScheduleMachineContext);
    return (
        <View style={{ flex: 1 }}>
            <View style={style.progressContainer}>
                <Image
                    source={require('../../../assets/images/progress/progress3.png')}
                />
            </View>
            <Text style={style.title}>Drop-off</Text>
            <LocationSearchModal
                send={send}
                type="dropOff"
                show={current.context.showSearchModal}
            />
            {current.context.schedulingDetails.dLng &&
            current.context.schedulingDetails.dLat ? (
                <Map
                    lng={current.context.schedulingDetails.dLng}
                    lat={current.context.schedulingDetails.dLat}
                />
            ) : null}

            <Text
                style={{
                    margin: 20,
                    marginBottom: 15,
                    fontFamily: 'Akkurat-Bold',
                    fontSize: 15,
                    color: '#333333'
                }}
            >
                Address
            </Text>
            <View
                style={{
                    marginLeft: 20,
                    marginRight: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <Text
                    style={{
                        fontFamily: 'Akkurat-Bold',
                        fontSize: 12,
                        color: '#333333',
                        width: '35%'
                    }}
                >
                    {current.context.schedulingDetails.dropoffAddress}
                </Text>

                <TouchableOpacity
                    onPress={() => send('TOGGLE_SEARCH', { modalType: 'dropOff' })}
                >
                    <Text
                        style={{
                            fontFamily: 'Akkurat-Bold',
                            fontSize: 12,
                            color: '#333333',
                            textAlign: 'right'
                        }}
                    >
                        Edit
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={scheduleStyle.calendarContainer}>
                {/* Pick up and Drop off  */}
                <View style={scheduleStyle.centerAlignedRow}>
                    <View style={scheduleStyle.quickTimeSummary}>
                        <Text style={scheduleStyle.lightSub5}>Pick-up</Text>
                        <Text style={scheduleStyle.lightSub3}>some time</Text>
                    </View>
                    <Image
                        source={require('../../../assets/images/longRightArrow/longRightArrow.png')}
                    />
                    <View style={scheduleStyle.quickTimeSummary}>
                        <Text style={scheduleStyle.lightSub5}> Drop-off</Text>
                        <Text style={scheduleStyle.lightSub3}>some time</Text>
                    </View>
                </View>
                <Calendar
                    theme={{ backgroundColor: '#F7F7FA', calendarBackground: '#F7F7FA' }}
                    markedDates={selectedDayObject}
                    onDayPress={(day) =>
                        setSelectedDayObject({
                            [day.dateString]: {
                                marked: true,
                                selected: true,
                                selectedColor: '#7BDBCB',
                                day: day.day,
                                month: day.month
                            }
                        })
                    }
                />

                <ScrollView flexDirection="row" horizontal>
                    {availableTimes.map((time) => (
                        <TouchableOpacity
                            style={
                                time === selectedTime
                                    ? scheduleStyle.selectedAvailabilityButton
                                    : scheduleStyle.availabilityButton
                            }
                            onPress={() => setSelectedTime(time)}
                        >
                            <Text style={scheduleStyle.subh3Bold}>{time}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default DropOff;
