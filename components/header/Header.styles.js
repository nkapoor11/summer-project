import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const headerStyles = StyleSheet.create({
    container: {
        flex: 0.09,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20
    },
    containerB: {
        backgroundColor: 'white',
        flex: 0.06,
        padding: 20
    },
    left: {
        top: 5
    },
    leftIcon: {
        height: width / 10,
        width: width / 10,
        top: 20
    },
    right: {
        marginTop: 10,
        height: width / 8,
        width: width / 8,
        borderRadius: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.4,
        shadowRadius: 2.0
    },
    avatarImage: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: 100
    },
    title: {
        fontFamily: 'Akkurat-Bold',
        fontSize: 20
    },
    subTitle: {
        fontFamily: 'Akkurat-Bold',
        fontSize: 15,
        color: '#313638'
    },
    noteText: {
        fontFamily: 'Akkurat',
        fontSize: 12,
        color: '#313638'
    },
    titleCenter: {
        fontFamily: 'Akkurat-Bold',
        fontSize: 20,
        alignSelf: 'center',
        textAlign: 'center',
        bottom: 20
    },
    buttonText: {
        fontFamily: 'Akkurat-Bold',
        fontSize: 15,
        color: 'white'
    },
    scheduleContainer: {
        flex: 0.22,
        backgroundColor: '#4287f5'
    },
    scheduleLeft: {
        top: 10,

        justifyContent: 'center'
    },
    scheduleButton: {
        backgroundColor: '#333333',
        height: '30%',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.4,
        shadowRadius: 2.0
    }
});

export default headerStyles;
