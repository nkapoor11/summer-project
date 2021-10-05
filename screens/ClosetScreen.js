/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
    VirtualizedList,
    View,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Text,
    ActivityIndicator
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-tiny-toast';
import useModal from '../hooks/useModal';
import PDPMenu from '../components/PDPMenu';
import UploadPicker from '../components/UploadPicker';
import { ProductsContext } from '../navigation/ProductsProvider';
import { ClickableTextComponent } from '../styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingBottom: 5,
        paddingTop: 5
    },
    displayTypeButton: {
        marginStart: 16,
        marginBottom: 6,
        marginEnd: 16,
        justifyContent: 'flex-end'
    },
    image: {
        width: 102,
        height: 102
    },
    item: {
        marginStart: 5,
        marginEnd: 5,
        marginBottom: 2,
        width: 128,
        height: 128,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 20,
        shadowRadius: 2.0
    },
    looksButton: {
        margin: 16
    },
    menu: {
        left: 16
    },
    row: {
        flex: 1,
        justifyContent: 'space-around',
        alignSelf: 'flex-start'
    },
    sectionHeaderRow: {
        flexDirection: 'row'
    },
    text: {
        fontSize: 20,
        color: '#333333'
    }
});

function Item({ brand, category, id, clean_image, frequency, section, onSelect, index }) {
    const productInfo = { brand, category, id, clean_image, frequency, section };
    const isLoading = true;
    return (
        <TouchableOpacity onPress={() => onSelect(productInfo)} style={styles.item}>
            <FastImage
                style={styles.image}
                source={{
                    uri: clean_image
                }}
            />
        </TouchableOpacity>
    );
}

export default function ClosetScreen({ route, navigation, send }) {
    const { bottoms, currentScreen, tops } = useContext(ProductsContext);
    const [displayType, setDisplayType] = useState('Items');
    const [clothingTops, setClothingTops] = useState([]);
    const { isShowing, toggle } = useModal();
    const [menuToggled, setMenuToggled] = useState(false);
    const [showAddButtons, setShowAddButtons] = useState(false);

    useEffect(() => {
        currentScreen.current = 'Closet';
        if (route.params?.showSuccess) {
            Toast.show('', {
                imgSource: require('../assets/images/item-added/item-added.png')
            });
        }
    }, []);

    const onSelect = useCallback((productInfo) => {
        navigation.navigate('ProductDisplayPageScreen', {
            productInfo
        });
    }, []);

    const sectionHeaderPress = useCallback((section) => {
        navigation.navigate('ClothingCategoryScreen', {
            productType: section
        });
    });

    useEffect(() => {
        if (tops) {
            setClothingTops(tops);
        }
    }, [tops]);

    const showTops = clothingTops.length > 0;
    const showBottoms = bottoms.length > 0;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonsRow}>
                <TouchableOpacity onPress={() => setDisplayType('Items')}>
                    <ClickableTextComponent
                        header={displayType === 'Items'}
                        inactiveHeader={displayType === 'Looks'}
                    >
                        Items
                    </ClickableTextComponent>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setMenuToggled(!menuToggled);
                        toggle();
                    }}
                >
                    <FastImage
                        style={{ width: 30, height: 30 }}
                        source={require('../assets/images/addIcon/addIcon.png')}
                    />
                </TouchableOpacity>
                {/* <TouchableOpacity
                    style={styles.looksButton}
                    onPress={() => setDisplayType('Looks')}
                >
                    <ClickableTextComponent
                        inactiveHeader={displayType == 'Items'}
                        header={displayType == 'Looks'}
                    >
                        Looks
                    </ClickableTextComponent>
                </TouchableOpacity> */}
            </View>
            {showTops && (
                <View>
                    <View style={styles.sectionHeaderRow}>
                        <TouchableOpacity
                            style={styles.displayTypeButton}
                            onPress={() => {
                                // send('VIEW_ALL');
                                sectionHeaderPress('Tops');
                            }}
                        >
                            <ClickableTextComponent subHeader>
                                Tops
                            </ClickableTextComponent>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.displayTypeButton}
                            onPress={() => {
                                // send('VIEW_ALL');
                                sectionHeaderPress('Tops');
                            }}
                        >
                            <ClickableTextComponent seeAll style={styles.clickableText}>
                                See All
                            </ClickableTextComponent>
                        </TouchableOpacity>
                    </View>
                    <VirtualizedList
                        data={clothingTops}
                        initialNumToRender={2}
                        horizontal
                        keyExtractor={(item, index) => `key${index}`}
                        getItem={(data, index) => data[index]}
                        getItemCount={(data) => data.length}
                        renderItem={({ item, index }) => (
                            <Item
                                brand={item.brand}
                                category={item.category}
                                frequency={item.frequency}
                                clean_image={item.clean_image}
                                id={item.id}
                                section="Tops"
                                onSelect={onSelect}
                                index={index}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator
                    />
                </View>
            )}
            {showBottoms && (
                <View>
                    <View style={styles.sectionHeaderRow}>
                        <TouchableOpacity
                            style={styles.displayTypeButton}
                            onPress={() => sectionHeaderPress('Bottoms')}
                        >
                            <ClickableTextComponent subHeader>
                                Bottoms
                            </ClickableTextComponent>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.displayTypeButton}
                            onPress={() => sectionHeaderPress('Bottoms')}
                        >
                            <ClickableTextComponent seeAll>
                                See All
                            </ClickableTextComponent>
                        </TouchableOpacity>
                    </View>
                    <VirtualizedList
                        data={bottoms}
                        initialNumToRender={2}
                        horizontal
                        keyExtractor={(item, index) => `key${index}`}
                        getItem={(data, index) => data[index]}
                        getItemCount={(data) => data.length}
                        renderItem={({ item }) => (
                            <Item
                                brand={item.brand}
                                category={item.category}
                                frequency={item.frequency}
                                clean_image={item.clean_image}
                                id={item.id}
                                section="Bottoms"
                                onSelect={onSelect}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator
                    />
                </View>
            )}
            {isShowing && currentScreen.current === 'PDP' && (
                <PDPMenu
                    isVisible={isShowing}
                    hide={toggle}
                    style={styles.toggledMenu}
                    navigation={navigation}
                />
            )}
            {isShowing && currentScreen.current === 'Closet' && (
                <UploadPicker
                    isVisible={isShowing}
                    hide={toggle}
                    style={styles.toggledMenu}
                    navigation={navigation}
                />
            )}
        </SafeAreaView>
    );
}
