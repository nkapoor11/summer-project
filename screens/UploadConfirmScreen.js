/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useContext, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { ProductsContext } from '../navigation/ProductsProvider';
import { ClickableTextComponent, ProgressBar } from '../styles';
import { windowWidth } from '../utils/Dimensions';
import { HomeContext } from '../navigation/HomeStack';

import { uploadFileToFireBase, uploadProgress } from '../utils';

export default function UploadConfirmScreen({ route, navigation }) {
    const [confirming, setConfirming] = useState(false);
    const { user } = useContext(AuthContext);
    const { send } = useContext(HomeContext);
    // eslint-disable-next-line no-unused-vars
    const [imageURI, setImageURI] = useState(null);
    const { imageResponse } = route.params;
    const { uploadPhotoToCollection } = useContext(ProductsContext);

    const [upload, setUpload] = useState({
        loading: false,
        progress: 0
    });

    const monitorFileUpload = (task) => {
        let uploadComplete = false;
        task.on('state_changed', null, null, (snapshot) => {
            const progress = uploadProgress(
                snapshot.bytesTransferred / snapshot.totalBytes
            );
            switch (snapshot.state) {
                case 'running':
                    setImageURI(null);
                    setUpload({ loading: true, progress });
                    break;
                case 'success':
                    setConfirming(false);
                    snapshot.ref.getDownloadURL().then((downloadURL) => {
                        setImageURI(downloadURL);
                        setUpload({ loading: false });
                        if (uploadComplete === true) {
                            task.then(() => {
                                console.log('upload complete ');
                                console.log(downloadURL);
                                uploadPhotoToCollection(user.uid, downloadURL).then(
                                    navigation.navigate('ClosetItemScreen', {
                                        imageURI: downloadURL,
                                        mode: 'Add'
                                    })
                                );
                            });
                        }
                        uploadComplete = true;
                    });
                    break;
                case 'failure':
                    setConfirming(false);
                    break;
                default:
                    break;
            }
        });
    };

    const confirmUpload = () => {
        send('CONFIRM');
        setConfirming(true);
        const uploadTask = uploadFileToFireBase(imageResponse);
        monitorFileUpload(uploadTask);
    };

    return (
        <View style={styles.confirmModal}>
            {upload.loading && (
                <>
                    <ProgressBar bar={upload.progress} />
                </>
            )}
            {imageResponse && (
                <Image style={styles.confirmImage} source={{ uri: imageResponse.uri }} />
            )}
            <View style={styles.confirmButtonRow}>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {
                        send('CANCEL');
                        navigation.goBack();
                    }}
                >
                    <ClickableTextComponent>Cancel</ClickableTextComponent>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={confirmUpload}
                    disabled={confirming}
                >
                    <ClickableTextComponent primary>Confirm</ClickableTextComponent>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cancelButton: {
        left: 20
    },
    confirmButton: {
        right: 20
    },
    confirmButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    confirmImage: {
        height: windowWidth,
        width: windowWidth
    },
    confirmModal: {
        flex: 1,
        backgroundColor: 'black',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    }
});
