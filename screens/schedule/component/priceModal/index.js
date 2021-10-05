import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';
import PropType from 'prop-types';
import style from './style';
import ItemPrice from './ItemPrice';
import { pricingModalTypes, priceDetails } from '../../constants';
import PriceDetails from './PriceDetails';

const renderContent = (send, type) => {
    switch (true) {
        case type === pricingModalTypes.ALL:
            return (
                <>
                    <Text style={style.h1}>Pricing</Text>
                    <View style={style.p}>
                        <Text style={style.bodyText}>
                            Heads up! There is a 48 hour turnaround time in your area.
                        </Text>
                    </View>
                    <View style={style.p}>
                        <Text style={style.bodyText}>
                            The minimum pick-up size is $15, and there is a $15 missed
                            pick-up fee.
                        </Text>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={style.h2}>Laundry</Text>
                        <ItemPrice item="Pay as You Go" price="$1.75" />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={style.h2}>Dry Cleaning</Text>
                        <ItemPrice item="2-Piece Suit" price="$1.75" />
                        <ItemPrice item="Button Up" price="$1.75" />
                        <ItemPrice item="Blazer" price="$1.75" />
                        <ItemPrice item="Sports Coat" price="$1.75" />
                        <ItemPrice item="Pants" price="$1.75" />
                        <ItemPrice item="Shorts" price="$1.75" />
                        <ItemPrice item="Shirts/Blouse" price="$1.75" />
                        <ItemPrice item="Dress" price="$1.75" />
                        <ItemPrice item="Sweater" price="$1.75" />
                        <ItemPrice item="Winder Coat" price="$1.75" />
                    </View>
                </>
            );
        case type === pricingModalTypes.THIRTY:
            return (
                <PriceDetails
                    breakdown={priceDetails.THIRTY.breakdown}
                    pickUp={priceDetails.THIRTY.pickUp}
                    pounds={priceDetails.THIRTY.pounds}
                    fee={priceDetails.THIRTY.fee}
                />
            );
        case type === pricingModalTypes.SIXTY:
            return (
                <PriceDetails
                    breakdown={priceDetails.SIXTY.breakdown}
                    pickUp={priceDetails.SIXTY.pickUp}
                    pounds={priceDetails.SIXTY.pounds}
                    fee={priceDetails.SIXTY.fee}
                />
            );
        case type === pricingModalTypes.NINETY:
            return (
                <PriceDetails
                    breakdown={priceDetails.NINETY.breakdown}
                    pickUp={priceDetails.NINETY.pickUp}
                    pounds={priceDetails.NINETY.pounds}
                    fee={priceDetails.NINETY.fee}
                />
            );

        default:
            break;
    }
};

const PricingModal = ({ show, send, type }) => {
    return (
        <>
            <Modal animationType="slide" isVisible={show}>
                <View style={style.container}>
                    {renderContent(send, type)}
                    <TouchableOpacity
                        style={style.buttonContainer}
                        onPress={() => send('TOGGLE', { modalType: '' })}
                    >
                        <Text style={style.buttonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    );
};

PricingModal.propTypes = {
    send: PropType.func,
    show: PropType.bool,
    type: PropType.string
};

export default PricingModal;
