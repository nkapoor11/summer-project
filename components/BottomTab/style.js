import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: 75,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 5.0
    },
    addButton: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: 10,

        justifyContent: 'center',
        alignItems: 'center'
    },
    addButtonRotated: {
        position: 'absolute',
        bottom: 50,
        margin: 'auto'
    },
    image: {
        width: 50,
        resizeMode: 'contain'
    },
    imageRotated: {
        transform: [{ rotate: '45deg' }]
    },
    addButtonsContainer: {
        flexDirection: 'row',
        position: 'absolute'
    },
    itemButton: {
        position: 'absolute',
        right: 40,
        bottom: 80
    },
    lookButton: {
        position: 'absolute',
        left: 40,
        bottom: 80
    },
    toggledMenu: {
        flex: 1,
        width: 175,
        position: 'absolute',
        bottom: 20,
        margin: 'auto'
    },
    navKyeContainer: {
        backgroundColor: 'red'
    },
    bottomContainer: {
        backgroundColor: 'white',
        flex: 0.077,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 5,
        borderTopColor: '#F0F0F0',
        borderTopWidth: 1
    },
    navItemContainer: {
        width: 70,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;
