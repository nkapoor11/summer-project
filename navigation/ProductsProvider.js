/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-array-constructor */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from './AuthProvider';

export const ProductsContext = createContext({});

export const ProductsProvider = ({ children }) => {
    const [bottoms, setBottoms] = useState(new Array());
    const [tops, setTops] = useState(new Array());
    const [products, setProducts] = useState(new Array());
    const [uploadedProduct, setUploadedProduct] = useState(null);
    const [productData, setProductData] = useState(null);
    const [notificationProducts, setNotificationProducts] = useState([]);
    const { user, tapId } = useContext(AuthContext);
    const currentlyViewedProduct = useRef(null);
    const currentScreen = useRef('Closet');

    useEffect(() => {
        if (uploadedProduct) {
            const subscriber = firestore()
                .collection('users')
                .doc(user.uid)
                .collection('products')
                .doc(uploadedProduct.id)
                .onSnapshot((documentSnapshot) => {
                    const product = { ...uploadedProduct, ...documentSnapshot.data() };
                    setProductData(product);
                });

            return () => subscriber();
        }
    }, [uploadedProduct]);

    useEffect(() => {
        if (user) {
            const subscriber = firestore()
                .collection('users')
                .doc(user.uid)
                .collection('products')
                .onSnapshot((querySnapshot) => {
                    const newProducts = [];
                    const newTops = [];
                    const newBottoms = [];
                    querySnapshot.forEach((documentSnapshot) => {
                        if (documentSnapshot.data().clean_image != null) {
                            const {
                                brand,
                                category,
                                clean_image,
                                image,
                                tags,
                                frequency,
                                id
                            } = documentSnapshot.data();
                            const product = {
                                brand,
                                category,
                                clean_image,
                                image,
                                tags,
                                frequency,
                                id
                            };
                            if (category === 'Top') {
                                newTops.push(product);
                                newProducts.push(product);
                            } else if (category === 'Bottom') {
                                newBottoms.push(product);
                                newProducts.push(product);
                            }
                        }
                    });

                    setTops(newTops);
                    setBottoms(newBottoms);
                    setProducts(newProducts);
                });

            return () => subscriber();
        }
    }, [user]);

    return (
        <ProductsContext.Provider
            value={{
                currentScreen,
                currentlyViewedProduct,
                bottoms,
                tops,
                uploadedProduct,
                setUploadedProduct,
                products,
                setProducts,
                productData,
                notificationProducts,
                setNotificationProducts,
                updateProductDetails: async (productId, productDetails) => {
                    try {
                        const userRef = firestore().collection('users').doc(user.uid);
                        const productsRef = userRef.collection('products');

                        productsRef.doc(productId).set(productDetails, { merge: true });
                    } catch (e) {
                        alert(e);
                    }
                },
                uploadPhotoToCollection: async (customerCode, imageURI) => {
                    try {
                        const userRef = firestore().collection('users').doc(customerCode);
                        const productsRef = userRef.collection('products');

                        if (productsRef) {
                            productsRef
                                .add({ image: imageURI, origin: 'closet' })
                                .then((documentRef) => {
                                    setUploadedProduct({
                                        id: documentRef.id,
                                        image: imageURI
                                    });
                                });
                            return uploadedProduct;
                        }
                        console.log('productsRef is null');

                        return 'productsRef is null';
                    } catch (e) {
                        alert(e);
                    }
                },
                updateNotificationProducts: async (ids) => {
                    try {
                        const userRef = firestore().collection('users').doc(`${tapId}`);
                        const productsRef = userRef.collection('pendingProducts');
                        let products = [];

                        ids.map((idx) => {
                            productsRef.doc(idx).onSnapshot((documentSnapshot) => {
                                const product = { id: idx, ...documentSnapshot.data() };
                                if (documentSnapshot) {
                                    products = [...products, product];
                                    setNotificationProducts(products);
                                }
                            });
                        });
                    } catch (e) {
                        alert(e);
                    }
                },
                deleteProduct: (idx) => {
                    const userRef = firestore().collection('users').doc(user.uid);
                    userRef.collection('products').doc(idx).delete();
                },
                archiveProduct: (idx, productData) => {
                    const userRef = firestore().collection('users').doc(`${tapId}`);
                    userRef.collection('productArchive').doc(idx).set(productData);
                    userRef.collection('pendingProducts').doc(idx).delete();
                },
                deleteProductFromPending: (idx) => {
                    const userRef = firestore().collection('users').doc(`${tapId}`);
                    userRef.collection('pendingProducts').doc(idx).delete();
                }
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
};
