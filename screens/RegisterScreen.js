import * as WebBrowser from 'expo-web-browser';
import React from 'react';

import Register from '../components/Register';

export default function RegisterScreen() {
	return <Register />;
}

RegisterScreen.navigationOptions = {
	headerShown: null
};
