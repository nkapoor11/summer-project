import React, { useContext, createContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import UploadConfirmScreen from '../screens/UploadConfirmScreen';
import ClosetItemScreen from '../screens/ClosetItemScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { ProductsContext } from './ProductsProvider';
import ToastAddNotificationItems from '../components/ToastAddNotificationItems';
import { MainMachineContext } from './MainMachineProvider';
import ScheduleProvider from '../screens/schedule/ScheduleProvider';

const styles = StyleSheet.create({
    doneButton: {
        color: '#7BDACB',
        fontSize: 20,
        marginHorizontal: 20
    },
    cancelButton: {
        fontSize: 20,
        marginHorizontal: 20
    }
});
export const HomeContext = createContext({});
const Stack = createStackNavigator();
// eslint-disable-next-line no-empty-pattern
export default function HomeStack({}) {
    const {
        notificationProducts,
        updateProductDetails,
        deleteProductFromPending
    } = useContext(ProductsContext);
    const { current, send } = useContext(MainMachineContext);

    const renderContent = () => {
        switch (true) {
            case current.matches('load'):
                return <Text>LOADING</Text>;
            case current.matches('idle'):
            case current.matches('uploadingItem'):
            case current.matches('processingImage'):
            case current.matches('editingUpload'):
            case current.matches('viewingProfile'):
            case current.matches('viewingAllItems'):
                return (
                    <Stack.Navigator initialRouteName="HomeScreen">
                        <Stack.Screen
                            name="HomeScreen"
                            options={() => ({
                                headerShown: false
                            })}
                        >
                            {(props) => <HomeScreen {...props} send={send} />}
                        </Stack.Screen>
                        <Stack.Screen
                            name="UploadConfirmScreen"
                            component={UploadConfirmScreen}
                        />
                        <Stack.Screen
                            name="ClosetItemScreen"
                            component={ClosetItemScreen}
                            options={({ navigation, route }) => {
                                // eslint-disable-next-line no-use-before-define
                                const plural = () => (amountOfItems > 1 ? 's' : '');
                                const notification = route.params.isNotification;
                                const { amountOfItems } = route.params;
                                const notificationTitle = `${amountOfItems} Item${plural()}`;
                                return {
                                    headerTitle: notification ? notificationTitle : null,
                                    headerTintColor: 'black',
                                    headerTitleAlign: 'center',
                                    headerRight: notification
                                        ? () => (
                                              <TouchableOpacity
                                                  onPress={() => {
                                                      notificationProducts.forEach(
                                                          (item) => {
                                                              try {
                                                                  updateProductDetails(
                                                                      item.id,
                                                                      item
                                                                  );
                                                                  deleteProductFromPending(
                                                                      item.id
                                                                  );
                                                              } catch (error) {
                                                                  //
                                                              }
                                                          }
                                                      );
                                                      navigation.navigate('HomeScreen');
                                                      ToastAddNotificationItems(
                                                          amountOfItems
                                                      );
                                                  }}
                                              >
                                                  <Text style={styles.doneButton}>
                                                      Add All
                                                  </Text>
                                              </TouchableOpacity>
                                          )
                                        : null,
                                    headerLeft: () => (
                                        <TouchableOpacity
                                            onPress={() => navigation.goBack(null)}
                                        >
                                            <Text style={styles.cancelButton}>
                                                Cancel
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                };
                            }}
                        />
                        <Stack.Screen
                            name="ProfileScreen"
                            options={{
                                headerBackTitleVisible: false,
                                headerTintColor: 'black',
                                headerTitle: 'Profile',
                                headerStyle: {
                                    backgroundColor: 'white',
                                    elevation: 0,
                                    shadowOpacity: 0,
                                    shadowColor: 'transparent',
                                    borderBottomWidth: 0
                                }
                            }}
                        >
                            {(props) => <ProfileScreen {...props} />}
                        </Stack.Screen>
                    </Stack.Navigator>
                );
            case current.matches('failed'):
                return <Text>FAILED</Text>;
            default:
                return <Text>SOME THING IS REALLY WRONG</Text>;
        }
    };

    return (
        <>
            <HomeContext.Provider value={{ send, current }}>
                <ScheduleProvider>{renderContent(send)}</ScheduleProvider>
            </HomeContext.Provider>
        </>
    );
}
