import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import style from './style';

const ItemPrice = ({ item, price }) => {
    return (
        <View style={style.itemPriceContainer}>
            <Text style={style.bodyText}>{item}</Text>
            <Text style={style.ellipsis}>
                ......................................................................
            </Text>
            <Text style={style.priceText}>{price}</Text>
        </View>
    );
};

ItemPrice.propTypes = {
    item: PropTypes.string,
    price: PropTypes.string
};

export default ItemPrice;
