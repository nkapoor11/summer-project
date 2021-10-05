import Toast from 'react-native-tiny-toast';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    toastStyle: {
        backgroundColor: '#7BDACB',
        borderRadius: 15,
        height: 200,
        width: 200
    },
    toastText: {
        color: '#010101',
        fontWeight: 'bold',
        marginTop: 10
    }
});
export default function ToastAddNotificationItems(totalOfItems) {
    const plural = totalOfItems > 1 ? 's' : '';
    return Toast.showSuccess(
        `${totalOfItems} Item${plural} successfully added to closet.`,
        {
            imgSource: require('../assets/images/checkmark.png'),
            position: Toast.position.CENTER,
            containerStyle: styles.toastStyle,
            textStyle: styles.toastText
        }
    );
}
