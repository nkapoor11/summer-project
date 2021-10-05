import { StyleSheet } from 'react-native';
import { windowWidth } from '../../utils/Dimensions';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: windowWidth / 12
    },

    labelStyle: {
        //  marginStart: 36,
        fontFamily: 'Akkurat-Bold',
        fontSize: 18,
        opacity: 0.3
    },
    valueStyle: {
        marginStart: 8,
        fontFamily: 'Akkurat-Bold',
        fontSize: 18
    },
    productImage: {
        width: windowWidth / 1.2,
        height: windowWidth / 1.2,
        borderWidth: 0.25,
        // borderColor: '',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 20,
        shadowRadius: 3.0
    },
    row: {
        //   marginTop: 16,
        flexDirection: 'row'
    },
    imageContainer: {}
});

export default styles;
