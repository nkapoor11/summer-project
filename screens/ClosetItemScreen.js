/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { windowWidth } from '../utils/Dimensions';
import ClosetCarouselItem from '../components/ClosetCarouselItem';
import { ProductsContext } from '../navigation/ProductsProvider';
import ToastAddNotificationItems from '../components/ToastAddNotificationItems';

const styles = StyleSheet.create({
    container: {
        paddingTop: 35,
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});

export default function ClosetItemScreen({ route, navigation }) {
    const carouselRef = useRef(null);
    const { imageURI, mode, isNotification, amountOfItems } = route.params;
    const {
        deleteProductFromPending,
        archiveProduct,
        notificationProducts,
        productData,
        updateProductDetails
    } = useContext(ProductsContext);
    const [productList, setProductList] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded && amountOfItems === notificationProducts.length) {
            setProductList(notificationProducts);
            setLoaded(true);
        }
    }, [notificationProducts]);

    useEffect(() => {
        const headerTitle = mode === 'Add' ? 'Add to Closet' : 'Edit Details';
        navigation.setOptions({
            title: headerTitle
        });
    }, [mode, navigation]);

    const actionButtonPress = (frequency, brand, product) => {
        if (mode === 'Add') {
            addToCloset(frequency, brand, product);
        } else {
            editDetails(frequency, brand, product);
        }
    };

    const editDetails = (selectedValue, brandValue, product) => {
        updateProductDetails(product.id, {
            brand: brandValue,
            frequency: selectedValue
        });
        const cleanImage = product.clean_image;

        const productInfo = { brandValue, productTitle, cleanImage, selectedValue };
        navigation.navigate('ProductDisplayPageScreen', {
            productInfo
        });
    };

    const addToCloset = async (selectedValue, brandValue, product) => {
        removeItemFromNotificationList(product);
        await updateProductDetails(product.id, product);
        await deleteProductFromPending(product.id);
        ToastAddNotificationItems(1);
    };

    const deleteItem = async (item) => {
        removeItemFromNotificationList(item);
        await archiveProduct(item.id, item);
    };

    const removeItemFromNotificationList = (item) => {
        const newProductList = productList;
        const removeIndex = newProductList.indexOf(item);
        newProductList.splice(removeIndex, 1);
        setProductList(newProductList);

        carouselRef.current.triggerRenderingHack();

        if (productList.length === 0) {
            navigation.navigate('HomeScreen');
        }
    };

    const _renderItem = ({ item }) => {
        return (
            <ClosetCarouselItem
                product={item}
                imageURI={item ? item.image : imageURI}
                mode={mode}
                saveItem={(freq, brand) => actionButtonPress(freq, brand, item)}
                deleteItem={() => deleteItem(item)}
            />
        );
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView>
                <Carousel
                    data={isNotification ? productList : [productData]}
                    renderItem={_renderItem}
                    sliderWidth={windowWidth}
                    itemWidth={windowWidth}
                    inactiveSlideOpacity={1}
                    ref={carouselRef}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
