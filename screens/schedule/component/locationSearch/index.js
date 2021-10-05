import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';
import PropType from 'prop-types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import style from './style';

const LocationSearchModal = ({ send, type, show }) => {
    return (
        <Modal isVisible={show}>
            <View style={style.container}>
                <GooglePlacesAutocomplete
                    placeholder="Search"
                    fetchDetails
                    onPress={(data, details = null) => {
                        send('SET_LOCATION', {
                            addressType: type,
                            address: data,
                            addressDetails: details
                        });
                    }}
                    query={{
                        key: 'AIzaSyD-QH-ul3MRk5droeBNMkmWomX_kYefWhk',
                        language: 'en'
                    }}
                />

                <TouchableOpacity
                    style={style.whiteButton}
                    onPress={() => send('TOGGLE_SEARCH', { modalType: '' })}
                >
                    <Text style={style.blackButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

LocationSearchModal.propTypes = {
    send: PropType.func,
    type: PropType.string,
    show: PropType.bool
};

export default LocationSearchModal;
