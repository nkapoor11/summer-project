import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { Platform } from 'react-native';

const FireBaseStorage = storage();

export const imagePickerOptions = {
    noData: true
};

export const deleteItemFromFirestore = (productId, userId) => {
    firestore()
        .collection('users')
        .doc(userId)
        .collection('products')
        .doc(productId)
        .delete()
        .then(() => {
            // eslint-disable-next-line no-console
            console.log(`Product ${productId} deleted`);
        });
};

export const getFileLocalPath = (response) => {
    const { uri } = response;
    let path = response.uri;

    if (Platform.OS === 'ios') {
        path = `~${path.substring(path.indexOf('/Documents'))}`;
    }
    return Platform.OS === 'android' ? path : uri;
};

export const getQueryStringParams = (query) => {
    return query
        ? (/^[?#]/.test(query) ? query.slice(1) : query)
              .split('&')
              .reduce((params, param) => {
                  const [key, value] = param.split('=');
                  // eslint-disable-next-line no-param-reassign
                  params[key] = value
                      ? decodeURIComponent(value.replace(/\+/g, ' '))
                      : '';
                  return params;
              }, {})
        : {};
};

// eslint-disable-next-line consistent-return
export const createStorageReferenceToFile = (response, bucket) => {
    let { fileName } = response;
    const path = response.uri;
    if (!fileName) {
        fileName = path.split('/').pop();
    }
    if (bucket) {
        bucket.ref(fileName);
    } else {
        return FireBaseStorage.ref(fileName);
    }
};

export const uploadFileToFireBase = (imagePickerResponse, bucket) => {
    const fileSource = getFileLocalPath(imagePickerResponse);
    const storageRef = createStorageReferenceToFile(imagePickerResponse, bucket);

    return storageRef.putFile(fileSource);
};

export const uploadProgress = (ratio) => Math.round(ratio * 100);
