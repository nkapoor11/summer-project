import React from 'react';
import { Text } from 'react-native';
import PropType from 'prop-types';
import style from './style';

const PriceDetails = ({ breakdown, pickUp, pounds, fee }) => {
    return (
        <>
            <Text style={style.h1}>{breakdown} Pound Subscription Breakdown</Text>
            <Text style={style.p}>
                <Text style={style.bodyText}>
                    Subscriptions lock your service in at a discounted rate. You can
                    schedule to
                </Text>
                <Text style={{ fontFamily: 'Akkurat-Bold', fontSize: 13 }}>{pickUp}</Text>
            </Text>

            <Text style={style.p}>
                <Text style={{ fontFamily: 'Akkurat-Bold', fontSize: 13 }}>{pounds}</Text>
                <Text style={style.bodyText}>
                    of unused weight can be rolled over into the next month.
                </Text>
            </Text>
            <Text style={style.p}>
                <Text style={style.bodyText}>
                    If you go over the alloted weight per month, there is a
                </Text>
                <Text style={{ fontFamily: 'Akkurat-Bold', fontSize: 13 }}>{fee}</Text>
            </Text>
        </>
    );
};

PriceDetails.propTypes = {
    breakdown: PropType.number,
    pickUp: PropType.string,
    pounds: PropType.string,
    fee: PropType.string
};

export default PriceDetails;
