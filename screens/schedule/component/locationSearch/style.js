import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50
    },
    whiteButton: {
        backgroundColor: 'white',
        height: width / 7,
        width: width / 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.4,
        shadowRadius: 2.0,
        alignSelf: 'center'
    },
    blackButtonText: {
        fontFamily: 'Akkurat-Bold',
        fontSize: 15,
        color: 'black'
    }
});

export default style;
