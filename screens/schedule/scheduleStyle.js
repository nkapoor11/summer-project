import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const scheduleStyle = StyleSheet.create({
    button: {
        backgroundColor: '#333333',
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
    orderButton: {
        backgroundColor: '#F2C2CF',
        height: width / 7,
        width: width / 1.8,
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
        alignSelf: 'center',
        borderWidth: 1
    },
    buttonText: {
        fontFamily: 'Akkurat-Bold',
        fontSize: 15,
        color: 'white'
    },
    blackButtonText: {
        fontFamily: 'Akkurat-Bold',
        fontSize: 15,
        color: 'black'
    },
    orderButtonText: {
        fontFamily: 'Akkurat-Bold',
        fontSize: 15
    },
    subscription: {
        flexDirection: 'row',
        height: 80,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#F6F6F6',
        borderRadius: 15,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.4,
        shadowRadius: 2.0
    },
    selectedSubscription: {
        flexDirection: 'row',
        height: 80,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#F5E0A0',
        borderRadius: 15,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.4,
        shadowRadius: 2.0
    },
    subh1: {
        fontFamily: 'Akkurat-Bold',
        fontSize: 40,
        textAlign: 'center',
        justifyContent: 'center'
    },
    subh2: { fontFamily: 'Akkurat-Bold', fontSize: 20, justifyContent: 'center' },
    subh2right: {
        fontFamily: 'Akkurat-Bold',
        fontSize: 20,
        justifyContent: 'center',
        textAlign: 'right'
    },
    subh3: { fontFamily: 'Akkurat', fontSize: 15 },
    subh3Bold: { fontFamily: 'Akkurat-Bold', fontSize: 15 },
    subh3right: { fontFamily: 'Akkurat', fontSize: 15, textAlign: 'right' },
    input: {
        height: 40,
        marginLeft: 20,
        marginRight: 20,
        margin: 10,
        borderWidth: 0.5,
        borderColor: '#C5C5C5',
        color: '#6B6B6B',
        padding: 10
    },
    inputNoM: {
        height: 40,
        marginTop: 10,
        borderWidth: 0.5,
        borderColor: '#C5C5C5',
        color: '#6B6B6B',
        padding: 10
    },
    availabilityButton: {
        backgroundColor: 'white',
        width: width / 3,
        height: width / 6,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.4,
        shadowRadius: 2.0
    },
    selectedAvailabilityButton: {
        backgroundColor: '#7BDBCB',
        width: width / 3,
        height: width / 6,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.4,
        shadowRadius: 2.0
    },
    calendarContainer: {
        width: '100%',
        backgroundColor: '#F7F7FA',
        marginTop: 50,
        marginBottom: 20
    },
    centerAlignedRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    quickTimeSummary: {
        margin: 15
    },
    lightSub5: {
        fontFamily: 'Akkurat',
        fontSize: 13,
        textAlign: 'center',
        color: '#999999'
    },
    lightSub3: {
        fontFamily: 'Akkurat',
        fontSize: 15,
        textAlign: 'center',
        color: '#666666'
    }
});

export default scheduleStyle;
