/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable no-array-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState, useContext, useRef } from 'react';
import { FlatList, KeyboardAvoidingView, Text, StyleSheet, View } from 'react-native';
import { Avatar, Card } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import { windowWidth } from '../utils/Dimensions';
import { AuthContext } from '../navigation/AuthProvider';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import useDebounce from '../hooks/useDebounce';

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center'
    },
    card: {
        width: windowWidth * 0.85,
        height: '65%',
        borderRadius: 20,
        paddingStart: 24,
        paddingEnd: 24,
        paddingTop: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        backgroundColor: '#E8ECEF',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        borderWidth: 3,
        margin: 5
    },
    itemContainer: { flex: 1, alignItems: 'center' },
    row: {
        flex: 1,
        justifyContent: 'space-around'
    },
    text: {
        fontSize: 24,
        marginBottom: 10
    },
    brandName: {
        color: 'black',
        alignSelf: 'center',
        flexShrink: 1
    }
});

export default function ChooseBrandsScreen({ route, navigation }) {
    const addedBrands = useRef(new Array());
    const [brand, setBrand] = useState('');
    const { register, uploadBrands } = useContext(AuthContext);
    const { user, username } = route.params;
    const [brands, setBrands] = useState(new Array());
    const [selectedBrands, setSelectedBrands] = useState(new Array());
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 800);

    useEffect(() => {
        if (debouncedSearchTerm) {
            setIsSearching(true);
            searchForBrands(debouncedSearchTerm).then((results) => {
                setIsSearching(false);
                parseResults(results);
            });
        }
    }, [debouncedSearchTerm]);

    const parseResults = (results) => {
        const brandsFromServer = new Array();
        results.data.map((result) => {
            const { name, logo } = result;
            const brand_id = brands.length + brandsFromServer.length + 1;

            const brandFromServer = {
                brand_id,
                brand: name,
                logo
            };

            brandsFromServer.push(brandFromServer);
        });

        setBrands([...brandsFromServer, ...brands]);
    };

    const searchForBrands = async (search) => {
        try {
            return await axios.request({
                method: 'get',
                url: `https://autocomplete.clearbit.com/v1/companies/suggest?query=${search}`
            });
        } catch (err) {
            console.log(err);
        }
    };

    const brandIsSelected = (item) => {
        return selectedBrands.some((brand) => item.brand_id === brand.brand_id);
    };

    const addOrRemoveBrand = (brand) => {
        console.log(`Selected Brands: ${JSON.stringify(selectedBrands)}`);
        if (brandIsSelected(brand)) {
            console.log(`Selected Brands includes: ${JSON.stringify(brand)}`);
            setSelectedBrands(
                selectedBrands.filter((item) => item.brand_id !== brand.brand_id)
            );
        } else {
            console.log(`Selected Brands does not include: ${JSON.stringify(brand)}`);
            setSelectedBrands([...selectedBrands, brand]);
        }
    };

    const Item = ({ brand_id, logo, brand, style }) => (
        <View style={styles.itemContainer}>
            <Avatar
                size="large"
                rounded
                source={{
                    uri: logo,
                    cache: 'force-cache'
                }}
                containerStyle={[styles.item, style]}
                onPress={() => addOrRemoveBrand({ brand_id, logo, brand })}
            />
            <Text style={styles.brandName}>{brand}</Text>
        </View>
    );

    const renderItem = ({ item }) => {
        const borderColor = brandIsSelected(item) ? '#7BDBCB' : 'black';
        return (
            <Item
                brand_id={item.brand_id}
                logo={item.logo}
                brand={item.brand}
                style={{
                    borderColor
                }}
            />
        );
    };

    useEffect(() => {
        firestore()
            .collection('brands')
            .orderBy('brand', 'asc')
            .get()
            .then((querySnapshot) => {
                const brandsFromServer = new Array();

                querySnapshot.forEach((documentSnapshot) => {
                    const { brand, brand_id, logo } = documentSnapshot.data();

                    const brandFromServer = {
                        brand,
                        brand_id,
                        logo
                    };

                    brandsFromServer.push(brandFromServer);
                });

                setBrands(brandsFromServer);
            });

        return setBrands(new Array());
    }, []);

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.text}>Choose 5 most worn brands</Text>
            <FormInput
                value={searchTerm.current}
                placeholderText="Search for a brand"
                onChangeText={(text) => setSearchTerm(text)}
                autoCapitalize="none"
                autoCorrect={false}
                rightIcon={require('../assets/images/search-glass/search-glass.png')}
            />
            <Card containerStyle={styles.card}>
                <FlatList
                    columnWrapperStyle={styles.row}
                    numColumns={3}
                    data={brands}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.brand_id}
                />
                <FormButton
                    primary
                    buttonTitle="Create Account"
                    onPress={() => register(selectedBrands, user, username)}
                />
            </Card>
        </KeyboardAvoidingView>
    );
}
