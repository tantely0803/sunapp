import React, { useEffect } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Feed from '../components/Feed';

import { setUserPushToken } from '../actions/users';

const registerPushNotifications = async () => {
    if (!Constants.isDevice) return;

    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
            Permissions.NOTIFICATIONS
        );
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        alert(
            "Une erreur s'est produit lors de l'activation des notifications"
        );
        return;
    }

    token = await Notifications.getExpoPushTokenAsync();

    console.log(".........");
    console.log(token.data);
    console.log(".........");

    setUserPushToken(token.data);

    // if (Platform.OS === 'android') {
    //     Notifications.createChannelAndroidAsync('default', {
    //         name: 'default',
    //         sound: true,
    //         priority: 'max',
    //         vibrate: [0, 250, 250, 250],
    //     });
    // }


    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
};

export default function HomeScreen() {
    useEffect(() => {
        registerPushNotifications();
    }, []);
    return <Feed />;
}

HomeScreen.navigationOptions = {
    headerShown: null,
};
