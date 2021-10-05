import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const style = StyleSheet.create({
    listContainer: {
        backgroundColor: 'white',
        padding: 10
    },
    header: {
        padding: 10,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    h1: { fontFamily: 'Akkurat-Bold', fontSize: 20 },
    title: {
        fontFamily: 'Akkurat-Bold',
        fontSize: 25,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10
    },
    subText: { fontFamily: 'Akkurat', fontSize: 14 },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 5
    },
    serviceOption: {
        justifyContent: 'center',
        alignItems: 'center',
        height: width / 2.3,
        width: width / 2.3,
        backgroundColor: '#F6F6F6',
        borderRadius: 30,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.4,
        shadowRadius: 2.0
    },
    selectedServiceOption: {
        justifyContent: 'center',
        alignItems: 'center',
        height: width / 2.3,
        width: width / 2.3,
        backgroundColor: '#7BDBCB',
        borderRadius: 30,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.4,
        shadowRadius: 2.0
    },
    sOptionh1: { fontFamily: 'Akkurat-Bold', fontSize: 17 },
    sOptionh2: { fontFamily: 'Akkurat', fontSize: 12 },
    h1Wmargin: { fontFamily: 'Akkurat-Bold', fontSize: 20, marginBottom: 15 },
    h2Wmargin: {
        marginBottom: 5,
        fontFamily: 'Akkurat-Bold',
        fontSize: 15,
        color: '#333333'
    },
    t1Right: {
        fontFamily: 'Akkurat-Bold',
        fontSize: 12,
        color: '#333333',
        textAlign: 'right'
    }
});

export default style;
