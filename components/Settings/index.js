import React, { useState, useCallback } from 'react';
import * as style from './style';
import { Image, View, Platform, Alert } from 'react-native';
import Input from '../Input';
import Button from '../Button';
import { withNavigation } from 'react-navigation';
import Header from '../Header';
import { logout, deleteUser } from '../../actions/auth';
import { connect } from 'react-redux';
import auth from '../../reducers/auth';

const Settings = (props) => {
	const deleteUser = () => {
		Alert.alert(
			'Supprimer son compte',
			'Êtes-vous sûr de vouloir supprimer votre compte ?',
			[
				{ text: 'Oui', onPress: () => props.deleteUser(props.auth.user._id) },
				{ text: 'Annuler', onPress: () => console.log('Cancel delete'), style: 'cancel' }
			],
			{ cancelable: false }
		);
	};
	return (
		<style.container style={{ paddingTop: Platform.OS === 'ios' ? 0 : '8%' }}>
			<style.reduceContainer>
				<style.groupLink onPress={() => props.navigation.navigate('ModifyPassword')}>
					<style.textLink>Changer de mot de passe</style.textLink>
					<style.arrowRight source={require('../../assets/images/arrow-right.png')} />
				</style.groupLink>
				<style.groupLink onPress={() => props.navigation.navigate('Profile')}>
					<style.textLink>Modifier mes données</style.textLink>
					<style.arrowRight source={require('../../assets/images/arrow-right.png')} />
				</style.groupLink>
				<style.groupLink onPress={() => deleteUser()}>
					<style.textLink>Supprimer mon compte</style.textLink>
					<style.arrowRight source={require('../../assets/images/arrow-right.png')} />
				</style.groupLink>
			</style.reduceContainer>
			<style.containerButtonBottom>
				<Button
					onlyBorder
					text="Déconnexion"
					onPress={() => {
						props.logout();
						props.navigation.navigate('Login');
					}}
				/>
			</style.containerButtonBottom>
		</style.container>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout, deleteUser })(withNavigation(Settings));
