import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FormHelperStepOne from '../components/FormHelper/StepOne';

export default function FormHelperStepOneScreen() {
	return <FormHelperStepOne />;
}

FormHelperStepOneScreen.navigationOptions = {
	headerShown: null
};
