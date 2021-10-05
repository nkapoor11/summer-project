/* eslint-disable no-return-assign */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ProductsContext } from '../../navigation/ProductsProvider';
import styles from './style';

export default function ProductDisplayPageScreen({ route }) {
    const { productInfo } = route.params;
    const { currentScreen, currentlyViewedProduct } = useContext(ProductsContext);

    useEffect(() => {
        currentlyViewedProduct.current = productInfo;
        currentScreen.current = 'PDP';

        return () => (currentScreen.current = 'Closet');
    }, [currentlyViewedProduct]);

    return (
        <View style={styles.container}>
            <Text style={styles.labelStyle}>{productInfo.section}</Text>

            <FastImage
                style={styles.productImage}
                source={{
                    uri: productInfo.clean_image
                }}
            />

            <View style={styles.row}>
                <Text style={styles.labelStyle}>Brand:</Text>
                <Text style={styles.valueStyle}>{productInfo.brand}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.labelStyle}>Frequency Worn:</Text>
                <Text style={styles.valueStyle}>{productInfo.frequency}</Text>
            </View>
            {/* <Text style={styles.headerStyle}>You may also like</Text> */}
        </View>
    );
}
