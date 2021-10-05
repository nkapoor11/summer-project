/* eslint-disable react/prop-types */
import React from 'react';
import { Image, /*ImageBackground,*/ Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import FormButton from '../components/FormButton';

/*const styles = StyleSheet.create({
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
        color: '#000000', // formerly for Sign in: 7BDBCB
        marginTop: 16,
        marginBottom: 115,
        textDecorationLine: 'underline',   
    }
});*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
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
    fontSize: 18,
    color: '#000000',
    textDecorationLine: 'underline',
    marginTop: 16,
  },
  welcomeStyle: {
    fontFamily: 'Akkurat-Bold',
    fontSize: 30,
    color: '#000000',
    marginTop: 16,
    justifyContent: 'flex-end',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginLeft: 40,
    marginRight: 40,
  }
});

const Flex = () => {
  return (
    <View style={[styles.container, {
      // Try setting `flexDirection` to `"row"`.
      flexDirection: "column"
    }]}>
      <View style={{ flex: 3, backgroundColor: "red", marginTop: 20 }}>
        <Image
          source={{uri: "https://media-exp1.licdn.com/dms/image/C560BAQGso9sPjfG4AQ/company-logo_200_200/0/1586195836337?e=1629936000&v=beta&t=Wu79VCtL0uhVenuf5R5YWzQu_QzfeOI1CXWEfZmkRtA"}}
          style={{ width: 200, height: 200, marginTop: 45, }}
        />
        
      </View>
      <View style={{ flex: 1.5, backgroundColor: "darkorange",  }} >
        <Text style={styles.welcomeStyle}>Welcome to the closet of the future.</Text>
      </View>
      <View style={{ flex: 1, backgroundColor: "yellow", }} >
        <FormButton
            primary
            buttonTitle="Create an account" // formerly: Create Account
            //color="#ffffff"
            onPress={() =>
                navigation.navigate('AuthMethod', {
                    method: 'signup'
                })
            }
        />
      </View>
      <View style={{ flex: 1, backgroundColor: "green" }} >
          <Image
            source={require('../assets/images/onboarding/or.png')}
            style={{ width: 300, height: 50, marginTop: 16, }}
          />
      </View>
      <View style={{ flex: 1, backgroundColor: "blue" }} >
        <FormButton
              //primary
              buttonTitle="Continue with Apple" // formerly: Create Account
              //color="#ffffff"
              onPress={() =>
                  navigation.navigate('AuthMethod', {
                      method: 'signup'
                  })
              }
          />
      </View>
      <View style={{ flex: 1, backgroundColor: "indigo" }} >
        <FormButton
              //primary
              buttonTitle="Continue with Facebook" // formerly: Create Account
              // color="#ffffff"
              onPress={() =>
                  navigation.navigate('AuthMethod', {
                      method: 'signup'
                  })
              }
          />
      </View>
      <View style={{ flex: 1, backgroundColor: "violet" }} >
        <FormButton
              //primary
              buttonTitle="Continue with Google" // formerly: Create Account
              //color="#ffffff"
              onPress={() =>
                  navigation.navigate('AuthMethod', {
                      method: 'signup'
                  })
              }
          />
      </View>
      <View style={{ flex: 1, /*backgroundColor: "blue"*/ }}>
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
  );
};

/*return (
  <ImageBackground source={...} style={{width: '100%', height: '100%'}}>
    <Text>Inside</Text>
  </ImageBackground>
);*/

export default Flex;

/*export default function LandingScreen({ navigation }) {
    return (
        <ImageBackground
            source={require('../assets/images/onboarding/Onboarding.png')}
            style={styles.backgroundImage}
        >
            <FormButton
                //primary
                buttonTitle="Create an account" // formerly: Create Account
                // color="#ffffff"
                onPress={() =>
                    navigation.navigate('AuthMethod', {
                        method: 'signup'
                    })
                }
            />

            <FormButton
                //primary
                buttonTitle="Continue with Apple" // formerly: Create Account
                // color="#ffffff"
                onPress={() =>
                    navigation.navigate('AuthMethod', {
                        method: 'signup'
                    })
                }
            />

            <FormButton
                //primary
                buttonTitle="Continue with Facebook" // formerly: Create Account
                // color="#ffffff"
                onPress={() =>
                    navigation.navigate('AuthMethod', {
                        method: 'signup'
                    })
                }
            />

            <FormButton
                //primary
                buttonTitle="Continue with Google" // formerly: Create Account
                // color="#ffffff"
                onPress={() =>
                    navigation.navigate('AuthMethod', {
                        method: 'signup'
                    })
                }
            />

            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('AuthMethod', {
                        method: 'login'
                    })
                }
            >
                <Text style={styles.navButtonText}>I already have an account</Text>
                
            </TouchableOpacity>
        </ImageBackground>
    );

    // Sign in (turquoise) -> I already have an account (black, underlined)
} */
