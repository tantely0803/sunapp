import React, { useState, useCallback } from 'react';
import * as style from './style';
import { Platform } from 'react-native';
import Button from '../Button';
import { withNavigation } from 'react-navigation';
import Dropdown from '../Dropdown';
import Header from '../Header';

const FirstStepRegister = (props) => {
	const formData = {
		type: 'dropdown',
		name: 'statut',
		label: 'Votre statut',
		value: [ 'Patient', 'Entourage'],
		//value: [ 'Patient', 'Entourage', 'Association', 'Bénévole' ],
		password: false
	};

	const [ form, setForm ] = useState(formData.value[0]);

	const updateField = (data, name) => {
		setForm(data);

		console.log(data);
		
	};

	const checkUser = () => {
		props.navigation.navigate('Register', { typeForm: form });
	};

	return (
		<style.container style={{ paddingTop: Platform.OS === 'ios' ? 0 : '8%' }}>
			<Header prevRoute="Login" />
			<style.contentForm>
				<Dropdown input={formData} zIndex={1000} onChange={updateField} />
			</style.contentForm>
			<style.group>
				<Button text="Suivant" onPress={checkUser} />
				<style.goregister onPress={() => props.navigation.navigate('Login')}>
					<style.textbutton>J'ai déjà un compte chez SUN </style.textbutton>
					<style.textpurple>Connexion</style.textpurple>
				</style.goregister>
			</style.group>
		</style.container>
	);
};

export default withNavigation(FirstStepRegister);
