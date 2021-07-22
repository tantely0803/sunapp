import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import FormHelperStepOneScreen from '../screens/FormHelperStepOneScreen';
import FormHelperStepTwoScreen from '../screens/FormHelperStepTwoScreen';
import FormHelperStepThreeScreen from '../screens/FormHelperStepThreeScreen';
import FormHelperStepFourScreen from '../screens/FormHelperStepFourScreen';
import FirstStepRegisterScreen from '../screens/FirstStepRegisterScreen';
import ForgetPassword from '../components/ForgetPassword/index';
import RulesScreen from '../screens/RulesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MainTabNavigator from './MainTabNavigator';
import CreateEventScreen from '../screens/CreateEventScreen';
import MessageScreen from '../screens/MessageScreen';
import ModifyPasswordScreen from '../screens/ModifyPasswordScreen';
import SignalUserScreen from '../screens/SignalUserScreen';

export default createAppContainer(
	createSwitchNavigator(
		{
			Login: LoginScreen,
			ModifyPassword: ModifyPasswordScreen,
			FirstStepRegister: FirstStepRegisterScreen,
			FormHelperStepOne: FormHelperStepOneScreen,
			FormHelperStepTwo: FormHelperStepTwoScreen,
			SignalUser: SignalUserScreen,
			FormHelperStepThree: FormHelperStepThreeScreen,
			FormHelperStepFour: FormHelperStepFourScreen,
			Register: RegisterScreen,
			CreateEvent: CreateEventScreen,
			Message: MessageScreen,
			Profile: ProfileScreen,
			Rules: RulesScreen,
			ForgetPassword : ForgetPassword,
			Main: MainTabNavigator
		},
		{
			initialRouteName: 'Login'
		}
	)
);
