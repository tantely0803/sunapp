import React from 'react';
import { Platform, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import ConversationScreen from '../screens/ConversationScreen';
import SettingsScreen from '../screens/SettingsScreen';

import * as style from '../styles/global';

const config = Platform.select({
	default: {}
});

const HomeStack = createStackNavigator(
	{
		Home: HomeScreen
	},
	config
);

HomeStack.navigationOptions = {
	tabBarLabel: '',
	tabBarIcon: ({ focused }) => <style.icon resizeMode={'contain'} source={require('../assets/images/tab/home.png')} />
};

HomeStack.path = '';




const MapStack = createStackNavigator(
	{
		Map: MapScreen
	},
	config
);

MapStack.navigationOptions = {
	tabBarLabel: '',
	tabBarIcon: ({ focused }) => <style.icon resizeMode={'contain'} source={require('../assets/images/tab/map.png')} />
};

MapStack.path = '';





const ConversationStack = createStackNavigator(
	{
		Conversation: ConversationScreen
	},
	config
);

ConversationStack.navigationOptions = {
	tabBarLabel: '',
	tabBarIcon: ({ focused }) => (
		<style.icon resizeMode={'contain'}  source={require('../assets/images/tab/msg.png')} />
	)
};

ConversationStack.path = '';




const SettingsStack = createStackNavigator(
	{
		Settings: SettingsScreen
	},
	config
);

SettingsStack.navigationOptions = {
	tabBarLabel: '',
	tabBarIcon: ({ focused }) => (
		<style.icon resizeMode={'contain'} source={require('../assets/images/tab/params.png')} />
	)
};

SettingsStack.path = '';




const tabNavigator = createBottomTabNavigator(
	{
		HomeStack,
		MapStack,
        ConversationStack,
        SettingsStack
	},
	{
		tabBarOptions: { showLabel: false }
	}
);

tabNavigator.path = '';

export default tabNavigator;
