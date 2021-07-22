import React, { useState, useCallback } from 'react';
import * as style from './style';
import { Image, View, Platform } from 'react-native';
import Input from '../Input';
import Button from '../Button';
import Alert from '../Alert';
import { withNavigation } from 'react-navigation';
import Header from '../Header';
import { updateUser } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import auth from '../../reducers/auth';

const ModifyPassword = (props) => {
	const formPassword = [
		{
			name: 'password',
			type: 'password',
			label: 'Mot de passe',
			placeholder: '••••••••',
			password: true
		},
		{
			name: 'confirm_password',
			type: 'confirm_password',
			label: 'Confirmation du mot de passe',
			placeholder: '••••••••',
			password: true
		}
	];
	const [ form, setForm ] = useState(null);
	const updateField = (data, name) => {
		const result = { ...form, [name]: data };
		setForm(result);
	};
	const validateForm = () => {
		if (form && form.password && form.confirm_password) {
			if (form.password === form.confirm_password) {
				props.updateUser(form, props.auth.user._id);
			} else {
				props.setAlert('Les deux mot de passe ne correspondent pas', 'danger');
			}
		} else {
			props.setAlert('Veuillez remplir les champs', 'danger');
		}
	};

	return (
		<style.container style={{ paddingTop: Platform.OS === 'ios' ? 0 : '8%' }}>
			<style.reduceContainer>
				<Header prevRoute="Settings" />
				<Alert />
				{formPassword.map((item, i) => {
					return <Input key={i} onChange={updateField} input={item} />;
				})}
				<Button text="Suivant" onPress={() => validateForm()} />
			</style.reduceContainer>
		</style.container>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { setAlert, updateUser })(withNavigation(ModifyPassword));
