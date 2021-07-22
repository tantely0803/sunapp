import * as WebBrowser from 'expo-web-browser';
import React from 'react';

import Login from '../components/Login';

export default function LoginScreen() {
	return <Login />;
}

LoginScreen.navigationOptions = {
	headerShown: null
};
