import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';

import * as Sentry from 'sentry-expo';


import {
    AsyncStorage,
    Platform,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import { Provider } from 'react-redux';

import AppNavigator from './navigation/AppNavigator';

import store from './store';
import { loadUser } from './actions/auth';
import { setUserPushToken } from './actions/users';
import setAuthToken from './utils/setAuthToken';



Sentry.init({
    dsn: 'https://a8617cf99fc6495b8830989b5a0e01b6@o925029.ingest.sentry.io/5873607',
    enableInExpoDevelopment: true,
    debug: false, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
  });

// Access any @sentry/react-native exports via:
//Sentry.Native.BrowserIntegrations

// Access any @sentry/browser exports via:
//Sentry.Browser.BrowserClient()

//Sentry.nativeCrash();


const loadUserStore = async () => {
    const valueAuth = await AsyncStorage.getItem('token');

    if (AsyncStorage.getItem('token')) {
        await setAuthToken(valueAuth);
        await store.dispatch(loadUser());
    }
};

export default function App(props) {
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    useEffect(() => {

        loadUserStore();
        
    }, []);

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadingComplete)}
            />
        );
    } else {
        return (
            <View style={styles.container}>
                <Provider store={store}>
                    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                    <AppNavigator />
                </Provider>
            </View>
        );
    }
}

async function loadResourcesAsync() {
    await Font.loadAsync({
        'rubik-bold': require('./assets/fonts/Rubik-Bold.ttf'),
        'rubik-black': require('./assets/fonts/Rubik-Black.ttf'),
        'rubik-medium': require('./assets/fonts/Rubik-Medium.ttf'),
        'rubik-regular': require('./assets/fonts/Rubik-Regular.ttf'),
        'rubik-light': require('./assets/fonts/Rubik-Light.ttf'),
    });
}

function handleLoadingError(error) {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
