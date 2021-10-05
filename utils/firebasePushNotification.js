import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const saveTokenToDatabase = async (token) => {
    // Add FCM token to the users database
    console.log('SETTING TOKEN ');
    const userId = auth().currentUser.uid;
    await firestore()
        .collection('users')
        .doc(userId)
        .update({
            tokens: firestore.FieldValue.arrayUnion(token)
        });
};
const getToken = async () => {
    // Get current device's FCM token

    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
        fcmToken = await messaging().getToken();
        if (fcmToken) {
            saveTokenToDatabase(fcmToken);
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
    saveTokenToDatabase(fcmToken);
};
const requestPermission = async () => {
    // Request permission to send push notifications

    try {
        await messaging().requestPermission();
        // User authorized
        getToken();
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('permission rejected');
    }
};
export const checkPermission = async () => {
    // Check for user's permissions on the app's push notification

    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        getToken();
    } else {
        requestPermission();
    }
};

export const getTokensFromDatabase = async () => {
    // Retrieve user's FCM tokens from database

    const userId = auth().currentUser.uid;
    let tokens = [];
    await firestore()
        .collection('users')
        .doc(userId)
        .get()
        .then((usr) => {
            tokens = usr.data().tokens;
        });
    return tokens;
};
