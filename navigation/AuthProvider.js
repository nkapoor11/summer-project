/* eslint-disable array-callback-return */
/* eslint-disable no-useless-catch */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import {
    AccessToken,
    LoginManager,
    GraphRequest,
    GraphRequestManager
} from 'react-native-fbsdk';

export const AuthContext = createContext({});
export const profilePicturesBucket = firebase
    .app()
    .storage('gs://fitted-profile-pictures');

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [tapId, setTapId] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                tapId,
                setTapId,
                login: async (email, password) => {
                    try {
                        const credential = auth.EmailAuthProvider.credential(
                            email,
                            password
                        );
                        await signInOrLink(
                            auth.EmailAuthProvider.PROVIDER_ID,
                            credential,
                            email
                        );
                    } catch (e) {
                        console.log(e);
                    }
                },
                forgotPassword: async (email) => {
                    try {
                        await auth()
                            .sendPasswordResetEmail(email)
                            .then((user) =>
                                alert('Please check your email to reset your password')
                            );
                    } catch (e) {
                        alert(e);
                    }
                },
                loginFB: async () => {
                    try {
                        const result = await LoginManager.logInWithPermissions([
                            'public_profile',
                            'email'
                        ]);

                        if (result.isCancelled) {
                            console.log('User cancelled the login process');
                            return;
                        }

                        let credential;
                        _responseInfoCallback = (error, result) => {
                            if (error) {
                                console.log(error.message);
                            } else {
                                return signInOrLink(
                                    auth.FacebookAuthProvider.PROVIDER_ID,
                                    credential,
                                    result.email
                                );
                            }
                        };

                        const token = await AccessToken.getCurrentAccessToken();
                        if (!token) {
                            // eslint-disable-next-line no-throw-literal
                            throw 'Something went wrong obtaining access token';
                        }
                        credential = auth.FacebookAuthProvider.credential(
                            token.accessToken
                        );

                        const infoRequest = new GraphRequest(
                            '/me?fields=name,email',
                            null,
                            _responseInfoCallback
                        );
                        new GraphRequestManager().addRequest(infoRequest).start();
                    } catch (error) {
                        console.log(error.message);
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut();
                    } catch (e) {
                        console.error(e);
                    }
                },
                register: async (brands, user, username) => {
                    try {
                        const { email, password } = user;
                        const credential = auth.EmailAuthProvider.credential(
                            email,
                            password
                        );
                        const registeredUser = await registerOrLink(
                            auth.EmailAuthProvider.PROVIDER_ID,
                            credential,
                            email
                        );

                        const {
                            user: { uid }
                        } = registeredUser;
                        console.log(`UID: ${uid}`);

                        setUsername(username);
                        setBrands(uid, brands);
                    } catch (e) {
                        console.log(e);
                    }
                },
                updateEmail: async (email) => {
                    await auth()
                        .currentUser.updateEmail(email)
                        .then(() => {
                            const userRef = firestore().collection('users').doc(user.uid);
                            userRef.set({ email }, { merge: true });
                        });
                },
                updatePassword: async (password) => {
                    await auth().currentUser.updatePassword(password);
                },
                updateUsername: async (username) => {
                    try {
                        await auth()
                            .currentUser.updateProfile({
                                displayName: username
                            })
                            .then(() => (user.displayName = username));
                    } catch (e) {
                        console.log(e);
                    }
                },
                updateProfilePicture: async (photoURL) => {
                    try {
                        await auth()
                            .currentUser.updateProfile({ photoURL })
                            .then(() => (user.photoURL = photoURL))
                            .then(() => {
                                const userRef = firestore()
                                    .collection('users')
                                    .doc(user.uid);
                                userRef.set({ photoURL }, { merge: true });
                            });
                    } catch (e) {
                        console.error(e);
                    }
                },
                uploadBrands: async (brands) => {
                    const userRef = firestore().collection('users').doc(user.uid);
                    userRef.set({ brands }, { merge: true });
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const registerOrLink = async (provider, credential, email) => {
    saveCredential(provider, credential);
    const user = await auth()
        .createUserWithEmailAndPassword(credential.token, credential.secret)
        .catch(async (error) => {
            try {
                if (error.code !== 'auth/email-already-in-use') {
                    throw error;
                }
                const methods = await auth().fetchSignInMethodsForEmail(email);
                const oldCred = await getCredential(methods[0]);
                const prevUser = await auth().signInWithCredential(oldCred);
                auth().currentUser.linkWithCredential(credential);
            } catch (error) {
                throw error;
            }
        });

    console.log(`User: ${JSON.stringify(user)}`);

    return user;
};

const setUsername = async (username) => {
    try {
        await auth().currentUser.updateProfile({
            displayName: username
        });
    } catch (e) {
        console.log(e);
    }
};

const setBrands = async (uid, brands) => {
    try {
        const userRef = firestore().collection('users').doc(uid);
        userRef.set({ brands }, { merge: true });

        addBrandToFirestore(brands);
    } catch (e) {
        console.log(e);
    }
};

const addBrandToFirestore = (brands) => {
    const brandsRef = firestore().collection('brands');

    brands.map((brand) => {
        const querySnapshot = brandsRef.where('brand', '==', brand.brand).limit(1).get();

        if (querySnapshot.empty) {
            console.log(`${brand} not yet in database`);
            firestore().collection('brands').add(brand);
        } else {
            console.log(`${brand} already in database`);
        }
    });
};

const signInOrLink = async (provider, credential, email) => {
    saveCredential(provider, credential);
    await auth()
        .signInWithCredential(credential)
        .catch(async (error) => {
            try {
                if (error.code !== 'auth/account-exists-with-different-credential') {
                    throw error;
                }
                const methods = await auth().fetchSignInMethodsForEmail(email);
                const oldCred = await getCredential(methods[0]);
                const prevUser = await auth().signInWithCredential(oldCred);
                auth().currentUser.linkWithCredential(credential);
            } catch (error) {
                throw error;
            }
        });
};

const saveCredential = async (provider, credential) => {
    try {
        const saveData = JSON.stringify([credential.token, credential.secret]);
        await AsyncStorage.setItem(provider, saveData);
    } catch (error) {
        throw error;
    }
};

const getCredential = async (provider) => {
    try {
        const value = await AsyncStorage.getItem(provider);
        if (value !== null) {
            const [token, secret] = JSON.parse(value);
            return getProvider(provider).credential(token, secret);
        }
    } catch (error) {
        throw error;
    }
};

const getProvider = (providerId) => {
    switch (providerId) {
        case auth.EmailAuthProvider.PROVIDER_ID:
            return auth.EmailAuthProvider;
        case auth.FacebookAuthProvider.PROVIDER_ID:
            return auth.FacebookAuthProvider;
        default:
            throw new Error(`No provider implemented for ${providerId}`);
    }
};

const updateUsername = (username) => {};
