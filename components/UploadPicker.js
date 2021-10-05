/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useRef, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
import UploadButton from './UploadButton';
import { HomeContext } from '../navigation/HomeStack';

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
    textContainer: {
        borderRadius: 10
    }
});

export default function UploadPicker({ isVisible, hide, navigation }) {
    const { send } = useContext(HomeContext);
    const imagePickerResponse = useRef(null);

    const confirmSelection = () => {
        send('UPLOAD_ITEM');
        hide();
        navigation.navigate('UploadConfirmScreen', {
            imageResponse: imagePickerResponse.current
        });
    };

    const showImagePicker = () => {
        ImagePicker.showImagePicker({ quality: 0.7 }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                imagePickerResponse.current = response;
                confirmSelection();
            }
        });
    };

    return (
        <View>
            <Modal style={styles.container} isVisible={isVisible}>
                <View style={styles.whiteButtonContainer}>
                    {/* <UploadButton top buttonTitle="Facebook" />
          <UploadButton middle buttonTitle="Instagram" /> */}
                    <UploadButton
                        style={styles.textContainer}
                        middle
                        buttonTitle="Upload"
                        onPress={showImagePicker}
                    />
                </View>
                <UploadButton buttonTitle="Cancel" onPress={hide} />
            </Modal>
        </View>
    );
}
