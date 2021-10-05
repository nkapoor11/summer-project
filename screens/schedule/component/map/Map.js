import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { View, Image } from 'react-native';
import PropType from 'prop-types';
import style from './style';

const Map = ({ lng, lat }) => {
    return (
        <View style={style.container}>
            <MapboxGL.MapView style={style.map}>
                <MapboxGL.Camera centerCoordinate={[lng, lat]} zoomLevel={15} />
                <MapboxGL.MarkerView coordinate={[lng, lat]}>
                    <Image
                        style={{ height: 60, width: 60, resizeMode: 'contain' }}
                        source={require('../../../../assets/images/fittedLogo/fittedLogo.png')}
                    />
                </MapboxGL.MarkerView>
            </MapboxGL.MapView>
        </View>
    );
};

Map.propTypes = {
    lng: PropType.string,
    lat: PropType.string
};

export default Map;
