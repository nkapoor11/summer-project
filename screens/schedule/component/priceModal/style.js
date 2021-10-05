import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 20
    },
    h1: {
        fontFamily: 'Akkurat-Bold',
        fontSize: 24,
        marginBottom: 15,
        alignSelf: 'center',
        textAlign: 'center'
    },
    h2: {
        fontFamily: 'Akkurat-Bold',
        fontSize: 18,
        marginBottom: 3
    },
    bodyText: { fontFamily: 'Akkurat', fontSize: 13 },
    buttonContainer: {
        width: '70%',
        height: 50,
        backgroundColor: 'black',
        borderRadius: 30,
        marginBottom: 10,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    buttonText: {
        fontFamily: 'Akkurat-Bold',
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        alignSelf: 'center'
    },

    priceText: {
        flex: 1,
        marginLeft: 5,
        fontFamily: 'Akkurat-Bold',
        fontSize: 15,
        textAlign: 'right'
    },
    ellipsis: {
        flex: 5,
        overflow: 'hidden',
        fontFamily: 'Akkurat-Bold'
    },
    itemPriceContainer: {
        width: '100%',
        height: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    p: {
        marginBottom: 10
    }
});

export default style;
