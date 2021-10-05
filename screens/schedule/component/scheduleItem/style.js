import { StyleSheet, Dimensions } from 'react-native';

const style = StyleSheet.create({
    container: {
        marginVertical: 8,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 30,
        flexDirection: 'row',
        height: 80,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.0
    },
    iconView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    statusIcon: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain'
    },
    arrowRight: { width: '60%', height: '60%', resizeMode: 'contain' },
    orderStatus: { flex: 4, justifyContent: 'center' },
    h1: { fontFamily: 'Akkurat-Bold', fontSize: 14 },
    h2: { fontFamily: 'Akkurat-Bold', fontSize: 12, color: '#333333' }
});

export default style;
