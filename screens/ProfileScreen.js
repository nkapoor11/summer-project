/* eslint-disable camelcase */
/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    FlatList,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Alert
} from 'react-native';
import { Avatar, Card, Accessory } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import FastImage from 'react-native-fast-image';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { ProductsContext } from '../navigation/ProductsProvider';
import { windowWidth } from '../utils/Dimensions';

import { uploadFileToFireBase, uploadProgress } from '../utils';

const styles = StyleSheet.create({
    bottomCard: {
        width: windowWidth * 0.9,
        minHeight: 160,
        borderRadius: 20,
        paddingStart: 16,
        paddingEnd: 16,
        paddingTop: 24
    },
    card: {
        width: windowWidth * 0.9,
        borderRadius: 20,
        paddingStart: 16,
        paddingEnd: 16,
        paddingTop: 24
    },
    cardPhoto: {
        alignSelf: 'center',
        borderWidth: 2
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
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
        alignSelf: 'flex-start',
        width: '85%'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    },
    spinner: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 24,
        marginBottom: 10
    },
    toastStyle: {
        backgroundColor: 'transparent'
    },
    item: {
        borderWidth: 3,
        margin: 5
    },
    itemContainer: { flex: 1, alignItems: 'center' },
    rowWrapper: {
        flex: 1,
        justifyContent: 'space-around'
    },
    center: {
        alignSelf: 'center'
    }
});

export default function ProfileScreen() {
    const {
        logout,
        profilePicturesBucket,
        updateEmail,
        updateUsername,
        updateProfilePicture,
        user
    } = useContext(AuthContext);
    const { products } = useContext(ProductsContext);
    const [, setImageURI] = useState(null);
    const imagePickerResponse = useRef(null);
    const [usernameValue, setUsernameValue] = useState();
    const [emailValue, setEmailValue] = useState();
    const [brands, setBrands] = useState([]);
    const [profileImageURL, setProfileImageUrl] = useState(user.photoURL);

    const getBrands = async () => {
        await firestore()
            .collection('users')
            .doc(user.uid)
            .get()
            .then((documentSnapshot) => {
                console.log('User exists: ', documentSnapshot.exists);

                if (documentSnapshot.exists) {
                    const updatedBrands = [];
                    const userData = documentSnapshot.data();
                    const { brands } = userData;

                    brands.map((download) => {
                        const { brand, brand_id, logo } = download;
                        const brandFromServer = {
                            brand,
                            brand_id,
                            logo
                        };

                        console.log(brandFromServer);
                        updatedBrands.push(brandFromServer);
                    });

                    setBrands(updatedBrands);
                }
            });
    };

    useEffect(() => {
        if (user) {
            getBrands();
        } else {
            console.log('No user');
        }
    }, [user]);

    const [, setUpload] = useState({
        loading: false,
        progress: 0
    });

    const changeEmail = (email) => {
        setEmailValue(email);
        updateEmail(email);
    };

    const updateUserName = (userName) => {
        setUsernameValue(userName);
        updateUsername(userName);
    };

    const showImagePicker = () => {
        ImagePicker.showImagePicker({ quality: 0.6 }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                imagePickerResponse.current = response;
                const uploadTask = uploadFileToFireBase(
                    imagePickerResponse.current,
                    profilePicturesBucket
                );
                monitorFileUpload(uploadTask);
            }
        });
    };

    const monitorFileUpload = (task) => {
        task.on('state_changed', (snapshot) => {
            const progress = uploadProgress(
                snapshot.bytesTransferred / snapshot.totalBytes
            );
            switch (snapshot.state) {
                case 'running':
                    setImageURI(null);
                    setUpload({ loading: true, progress });
                    break;
                case 'success':
                    snapshot.ref.getDownloadURL().then((downloadURL) => {
                        setImageURI(downloadURL);
                        setUpload({ loading: false });
                        updateProfilePicture(downloadURL);
                        setProfileImageUrl(downloadURL);
                    });
                    break;
                default:
                    break;
            }
        });
    };

    const synTapData = () => {
        const validateUser = functions().httpsCallable('validateTapUser');
        validateUser({ userEmail: user.email, uid: user.uid }).then((response) => {
            switch (response.data.status) {
                case 204:
                case 304:
                case 200:
                    Alert.alert(response.data.message);
                    break;
                default:
                // code block
            }
        });
    };

    const Item = ({ logo, brand }) => (
        <View style={styles.itemContainer}>
            <Avatar
                size="large"
                rounded
                source={{
                    uri: logo,
                    cache: 'force-cache'
                }}
                containerStyle={styles.item}
            />
            <Text style={styles.brandName}>{brand}</Text>
        </View>
    );

    const renderItem = ({ item }) => {
        return <Item id={item.brand_id} logo={item.logo} name={item.brand} />;
    };

    return (
        <View style={styles.container}>
            <ScrollView nestedScrollEnabled>
                <Card containerStyle={styles.card}>
                    {user.photoURL && (
                        <Avatar
                            size="large"
                            rounded
                            source={{
                                uri: profileImageURL
                            }}
                            ImageComponent={FastImage}
                            containerStyle={styles.cardPhoto}
                            onPress={showImagePicker}
                        >
                            <Accessory
                                size={20}
                                onPress={showImagePicker}
                                containerStyle={styles.accessory}
                            />
                        </Avatar>
                    )}
                    {user.photoURL == null && (
                        <Avatar
                            size="large"
                            rounded
                            source={require('../assets/images/profile/profile.png')}
                            ImageComponent={FastImage}
                            containerStyle={styles.cardPhoto}
                            onPress={showImagePicker}
                        >
                            <Accessory
                                size={20}
                                onPress={showImagePicker}
                                containerStyle={styles.accessory}
                            />
                        </Avatar>
                    )}
                    <Text style={styles.labelStyle}>Username</Text>
                    <TouchableOpacity style={styles.row}>
                        <TextInput
                            style={styles.valueStyle}
                            onChangeText={(text) => updateUserName(text)}
                            value={usernameValue}
                            autoCapitalize="none"
                            placeholder={user.displayName}
                            placeholderTextColor="black"
                            editable={false}
                        />
                        {/* <Image
              style={styles.imageStyle}
              source={require('../assets/images/edit-pencil/edit-pencil.png')}
            /> */}
                    </TouchableOpacity>
                    <Text style={styles.labelStyle}>Email</Text>
                    <TouchableOpacity style={styles.row}>
                        <TextInput
                            style={styles.valueStyle}
                            onChangeText={(text) => changeEmail(text)}
                            value={emailValue}
                            autoCapitalize="none"
                            placeholder={user.email}
                            placeholderTextColor="black"
                            autoCompleteType="email"
                            editable={false}
                        />
                        {/* <Image
              style={styles.imageStyle}
              source={require('../assets/images/edit-pencil/edit-pencil.png')}
            /> */}
                    </TouchableOpacity>
                    {/* <Text style={styles.labelStyle}>Password</Text>
          <TouchableOpacity style={styles.row}>
            <TextInput
              secureTextEntry={true}
              style={styles.valueStyle}
              onChangeText={(text) => changePassword(text)}
              value={passwordValue}
              autoCompleteType="password"
              placeholder={'password'}
              placeholderTextColor={'black'}
            />
            <Image
              style={styles.imageStyle}
              source={require('../assets/images/edit-pencil/edit-pencil.png')}
            />
          </TouchableOpacity> */}
                    <Text style={styles.labelStyle}>Number of items in Closet</Text>
                    <TouchableOpacity style={styles.row}>
                        <TextInput
                            style={styles.valueStyle}
                            value={`${products.length}`}
                            editable={false}
                        />
                    </TouchableOpacity>
                </Card>
                <Card containerStyle={styles.bottomCard}>
                    <View style={styles.row}>
                        <Text style={styles.labelStyle}>Most Worn Brands</Text>
                        {/* <Image
              style={styles.imageStyle}
              source={require('../assets/images/edit-pencil/edit-pencil.png')}
            /> */}
                    </View>
                    <SafeAreaView>
                        <FlatList
                            columnWrapperStyle={styles.rowWrapper}
                            numColumns={3}
                            data={brands}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.brand_id}
                        />
                    </SafeAreaView>
                </Card>
                {/* <FormButton
                    style={styles.center}
                    primary
                    buttonTitle="Sync Tap"
                    onPress={synTapData}
                /> */}
                <FormButton
                    style={styles.center}
                    primary
                    buttonTitle="Sign out"
                    onPress={logout}
                />
            </ScrollView>
        </View>
    );
}
