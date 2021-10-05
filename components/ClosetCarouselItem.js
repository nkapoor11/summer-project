/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState, useContext } from 'react';
import {
    Image,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Card } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { windowWidth } from '../utils/Dimensions';
import FormButton from './FormButton';
import { HomeContext } from '../navigation/HomeStack';

const styles = StyleSheet.create({
    container: {
        width: '100%'
        // backgroundColor: 'blue'
        // width: windowWidth
    },
    card: {
        width: windowWidth * 0.85,
        borderRadius: 20,
        paddingStart: 24,
        paddingEnd: 24,
        paddingTop: 16,
        paddingBottom: 30,
        alignSelf: 'center'
    },
    imageStyle: {
        marginTop: 12
    },
    labelStyle: {
        marginTop: 16,
        fontFamily: 'Akkurat-Bold',
        fontSize: 18,
        opacity: 0.3,
        alignSelf: 'flex-start'
    },
    valueStyle: {
        marginTop: 4,
        fontFamily: 'Akkurat-Bold',
        fontSize: 24,
        color: 'black',
        alignSelf: 'flex-start'
    },
    productImage: {
        borderColor: 'black',
        borderWidth: 1.5,
        width: 150,
        height: 150,
        alignSelf: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spinner: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.9,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        alignSelf: 'center',
        marginTop: 30
    },
    del: {
        alignSelf: 'center',
        marginTop: 5,
        backgroundColor: '#f6f6f6',
        borderColor: '#7bdbcb',
        borderWidth: 2
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        marginTop: 4,
        fontFamily: 'Akkurat-Bold',
        fontSize: 24,
        color: 'black',
        alignSelf: 'flex-start',
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    inputAndroid: {
        marginTop: 4,
        fontFamily: 'Akkurat-Bold',
        fontSize: 24,
        color: 'black',
        alignSelf: 'flex-start',
        paddingRight: 30 // to ensure the text is never behind the icon
    }
});

export default function ClosetCarouselItem({
    imageURI,
    mode,
    saveItem,
    deleteItem,
    product
}) {
    const [selectedValue, setSelectedValue] = useState('1-2 times / week');
    const [brandValue, onChangeBrand] = useState('');
    const [placeholder, setPlaceholder] = useState('Please enter brand');
    const imageSource = useRef(null);
    const productTitle = useRef('Clothing');
    const { send } = useContext(HomeContext);
    useEffect(() => {
        if (product) {
            if (product.brand) {
                onChangeBrand(product.brand);
            }
            imageSource.current =
                product.clean_image !== null && product.clean_image !== undefined
                    ? product.clean_image
                    : imageURI;
            productTitle.current =
                product?.tags &&
                product?.tags?.Category &&
                product?.tags?.Category.length > 0
                    ? product?.tags?.Category[0] === 'UpperBodyGarment'
                        ? 'Top'
                        : 'Bottom'
                    : 'Clothing';
            if (product.clean_image !== null && product.clean_image !== undefined) {
                send('DONE');
            }
        }
        return function cleanUp() {
            onChangeBrand('');
            setSelectedValue('1-2 times / week');
            setPlaceholder('Please enter brand');
        };
    }, [product]);

    return (
        <View style={styles.container}>
            <Card containerStyle={styles.card} title={productTitle.current}>
                <FastImage
                    style={styles.productImage}
                    source={{ uri: imageSource.current }}
                />
                <Text style={styles.labelStyle}>Brand</Text>
                <TouchableOpacity style={styles.row}>
                    <TextInput
                        style={styles.valueStyle}
                        onChangeText={(text) => onChangeBrand(text)}
                        value={brandValue}
                        autoCapitalize="words"
                        placeholder={placeholder}
                        placeholderTextColor="black"
                        onFocus={() => setPlaceholder('')}
                    />
                    <Image
                        style={styles.imageStyle}
                        source={require('../assets/images/edit-pencil/edit-pencil.png')}
                    />
                </TouchableOpacity>
                <Text style={styles.labelStyle}>Frequency Worn</Text>
                <RNPickerSelect
                    placeholder={{}}
                    value={selectedValue}
                    useNativeAndroidPickerStyle={false}
                    style={pickerSelectStyles}
                    onValueChange={(value) => setSelectedValue(value)}
                    items={[
                        { label: '1-2 times / week', value: '1-2 times / week' },
                        { label: 'Weekly', value: 'Weekly' },
                        { label: 'Bi-Weekly', value: 'Bi-Weekly' },
                        { label: 'Monthly', value: 'Monthly' },
                        { label: 'Rarely', value: 'Rarely' }
                    ]}
                    Icon={() => {
                        return (
                            <Image
                                style={styles.imageStyle}
                                source={require('../assets/images/arrow-right/arrow-right.png')}
                            />
                        );
                    }}
                />
                <Text style={styles.labelStyle}>Category</Text>
                <View style={styles.row}>
                    <Text style={styles.valueStyle}>
                        {product !== null && product !== undefined && product.category
                            ? product.category
                            : 'Clothing'}
                    </Text>
                    <Image
                        source={require('../assets/images/arrow-right/arrow-right.png')}
                    />
                </View>
                <Text style={styles.labelStyle}>Occassion</Text>
                <View style={styles.row}>
                    <Text style={styles.valueStyle}>
                        {product !== null &&
                        product !== undefined &&
                        product?.tags?.Occasion &&
                        product?.tags?.Occasion.length > 0
                            ? product?.tags?.Occasion[0]
                            : 'N/A'}
                    </Text>
                    <Image
                        source={require('../assets/images/arrow-right/arrow-right.png')}
                    />
                </View>
            </Card>
            <FormButton
                style={styles.btn}
                add
                buttonTitle={mode}
                onPress={() => {
                    send('ADD');
                    saveItem(selectedValue, brandValue);
                }}
            />
            <FormButton
                style={styles.del}
                add
                del
                buttonTitle="Delete"
                onPress={() => {
                    send('DELETE');
                    deleteItem();
                }}
            />
            {product && !product.clean_image && (
                <ActivityIndicator size="large" color="#0000ff" style={styles.spinner} />
            )}
        </View>
    );
}
