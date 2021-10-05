/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import UploadButton from './UploadButton';
import { AuthContext } from '../navigation/AuthProvider';
import { ProductsContext } from '../navigation/ProductsProvider';

import { deleteItemFromFirestore, getQueryStringParams, uploadProgress } from '../utils';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: 'auto',
        marginBottom: 100
    },
    whiteButtonContainer: {
        borderRadius: 10,
        backgroundColor: '#FFFFFF40'
    },
    button: {
        borderRadius: 10
    }
});
export default function PDPMenu({ isVisible, hide, navigation }) {
    const { user } = useContext(AuthContext);
    const { currentlyViewedProduct } = useContext(ProductsContext);

    const deleteItem = () => {
        hide();
        deleteItemFromFirestore(currentlyViewedProduct.current.id, user._user.uid);
        navigation.goBack();
    };

    const editDetails = () => {
        hide();
    };

    const sendToLaundry = () => {
        hide();
        // TODO: Link to Laundry app
    };

    return (
        <View>
            <Modal style={styles.container} isVisible={isVisible}>
                <View style={styles.whiteButtonContainer}>
                    {/* <UploadButton top buttonTitle="Edit Details" onPress={editDetails} />
          <UploadButton middle buttonTitle="Send to Fitted Laundry" /> */}
                    <UploadButton
                        style={styles.button}
                        bottom
                        buttonTitle="Delete from closet"
                        onPress={deleteItem}
                    />
                </View>
                <UploadButton buttonTitle="Cancel" onPress={hide} />
            </Modal>
        </View>
    );
}
