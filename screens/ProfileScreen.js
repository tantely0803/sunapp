import * as WebBrowser from 'expo-web-browser';
import React from 'react';

import Profile from '../components/Profile';

export default function ProfileScreen() {
	return <Profile />;
}

ProfileScreen.navigationOptions = {
	headerShown: null
};
