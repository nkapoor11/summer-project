/* eslint-disable react/prop-types */
import React from 'react';
import { Image, ImageBackground, Text, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import FormButton from '../components/FormButton';
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    navButtonText: {
        fontFamily: 'Akkurat-Bold',
        fontSize: 18,
        lineHeight: 23,
        color: '#7BDBCB', // formerly for Sign in: 7BDBCB
        marginTop: 16,
        marginBottom: 115
        //textDecorationLine: 'underline',   
    },
    welcomeStyle: {
      fontFamily: 'Akkurat-Bold',
      fontSize: 28,
      color: '#000000',
      marginTop: 10,
      justifyContent: 'flex-end',
      alignItems: 'center',
      textAlign: 'center',
      textAlignVertical: 'center',
      marginLeft: 25,
      marginRight: 25,
    },
    navButtonText: {
      fontFamily: 'Akkurat-Bold',
      fontSize: 18,
      lineHeight: 23,
      color: '#000000', // black color text. formerly for Sign in: 7BDBCB
      marginTop: 16,
      marginBottom: 115,
      textDecorationLine: 'underline',   
    },
    basic: {
      fontFamily: 'Akkurat-Bold',
      fontSize: 15,
      color: '#000000',
      textDecorationLine: 'underline',
      marginTop: 0,
    }
});

export default function LandingScreen({ navigation }) {
    return (
        <View style={{ flex: 1, padding: 40, backgroundColor: 'yellow' }}>
          <View
            style={{
              flex: 1, 
              backgroundColor: '#000000',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {/* logo */}
            <View
              style={{
                width: windowWidth / 2,
                height: windowWidth / 2.2,
                backgroundColor: '#ffffff',
                marginBottom: 10
              }}
            >
              <Image
                source={require('../assets/images/onboarding/Fitted/FittedLogoWhite.png')}
                style={{ width: windowWidth / 2.0, height: windowWidth / 2.7, marginTop: 10 }}
              />
            </View>
            <View
              style={{
                backgroundColor: '#ffffff', //'#53917E',
                width: '100%',
                height: windowWidth / 5,
              }}
            >
              <Text style={styles.welcomeStyle}>Welcome to the closet of the future.</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1.4, 
              backgroundColor: '#FC440F', 
              justifyContent: 'space-evenly'
            }}
          >
            
            <View style={{ height: 60, backgroundColor: '#48ACF0', textAlign: 'center', justifyContent: 'center',
    alignItems: 'center' }} >
              <TouchableOpacity
                onPress={() =>
                    navigation.navigate('AuthMethod', {
                        method: 'signup'
                    })
                }
              >
                <Image
                  source={require('../assets/images/onboarding/CreateAccount/Group433.png')}
                  style={{ width: 250, height: 55, marginTop: 10, textAlign: 'center',  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ height: 60, backgroundColor: '#48ACF0', textAlign: 'center', justifyContent: 'center',
    alignItems: 'center' }} >
              <TouchableOpacity
                onPress={() =>
                    navigation.navigate('AuthMethod', {
                        method: 'signup'
                    })
                }
              >
                <Image
                  source={require('../assets/images/onboarding/or.png')}
                  style={{ width: 250, height: 40, marginTop: 0, }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ height: 60, backgroundColor: '#48ACF0', textAlign: 'center', justifyContent: 'center',
    alignItems: 'center' }} >
              <TouchableOpacity
                onPress={() =>
                    navigation.navigate('AuthMethod', {
                        method: 'signup'
                    })
                }
              >
                <Image
                  source={require('../assets/images/onboarding/Apple/Group733.png')}
                  style={{ width: 245, height: 47, marginTop: 0, textAlign: 'center' }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ height: 60, backgroundColor: '#48ACF0', textAlign: 'center', justifyContent: 'center',
    alignItems: 'center' }} >
              <TouchableOpacity
                onPress={() =>
                    navigation.navigate('AuthMethod', {
                        method: 'signup'
                    })
                }
              >
                <Image
                  source={require('../assets/images/onboarding/Facebook/Group741.png')}
                  style={{ width: 245, height: 47, marginTop: 0, textAlign: 'center' }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ height: 60, backgroundColor: '#48ACF0', textAlign: 'center', justifyContent: 'center',
    alignItems: 'center' }} >
              <TouchableOpacity
                onPress={() =>
                    navigation.navigate('AuthMethod', {
                        method: 'signup'
                    })
                }
              >
                <Image
                  source={require('../assets/images/onboarding/Google/Group743.png')}
                  style={{ width: 245, height: 47, marginTop: 0, textAlign: 'center' }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ height: 60, backgroundColor: '#48ACF0', textAlign: 'center', justifyContent: 'center',
    alignItems: 'center' }} >
              <TouchableOpacity
                onPress={() =>
                    navigation.navigate('AuthMethod', {
                        method: 'login'
                    })
                }
              >
                <Text style={styles.basic/*styles.navButtonText*/}>I already have an account</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
    );
}
//Sign in (turquoise) -> I already have an account (black, underlined)
/*<Image
                source={require('../assets/images/onboarding/CreateAccount/Group433.png')}
                style={{ width: windowWidth / 1.5, height: windowWidth / 7, marginTop: 10 }}
            /> */