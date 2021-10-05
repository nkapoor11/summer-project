/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback, useContext } from 'react';
import {
    Dimensions,
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    VirtualizedList
} from 'react-native';

import FastImage from 'react-native-fast-image';
import { send } from 'xstate';
import { ProductsContext } from '../navigation/ProductsProvider';

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    button: {
        margin: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        marginRight: 10
    },
    titleRow: {
        alignItems: 'baseline',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    text: {
        fontFamily: 'Akkurat-Bold',
        fontSize: 36,
        color: '#000',
        marginLeft: 10
    },
    image: {
        width: '85%',
        height: '85%',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 10,
        shadowRadius: 2
    },

    buttonImage: {
        resizeMode: 'contain'
    },
    virtualizedStyle: {
        backgroundColor: 'white'
    }
});

function Item({ brand, id, category, clean_image, frequency, section, onSelect }) {
    const productInfo = { brand, id, category, clean_image, frequency, section };
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                marginTop: 20,
                width: windowWidth / 3,
                height: windowWidth / 3,
                justifyContent: 'center',
                alignContent: 'center'
            }}
            onPress={() => onSelect(productInfo)}
        >
            <FastImage
                style={styles.image}
                source={{
                    uri: clean_image
                }}
            />
        </TouchableOpacity>
    );
}

export default function ClothingCategoryScreen({ route, navigation, current }) {
    const { bottoms, tops } = useContext(ProductsContext);
    const { productType } = route.params;
    // eslint-disable-next-line no-param-reassign
    current.context.categoryScreen = productType;

    const onSelect = useCallback((productInfo) => {
        navigation.navigate('ProductDisplayPageScreen', {
            productInfo
        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <VirtualizedList
                style={styles.virtualizedStyle}
                data={productType === 'Tops' ? tops : bottoms}
                numColumns={3}
                keyExtractor={(item, index) => `key${index}`}
                getItem={(data, index) => data[index]}
                getItemCount={(data) => data.length}
                contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start'
                }}
                renderItem={({ item }) => (
                    <Item
                        brand={item.brand}
                        category={item.category}
                        frequency={item.frequency}
                        clean_image={item.clean_image}
                        id={item.id}
                        section={productType}
                        onSelect={onSelect}
                    />
                )}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}
