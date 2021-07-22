import React, { useState, useCallback } from 'react';
import * as style from './style';
import { Image, View, Platform, TouchableOpacity } from 'react-native';
import Input from '../Input';
import Button from '../Button';
import { withNavigation } from 'react-navigation';
import Header from '../Header';
import Alert from '../Alert';
import { signalUser } from '../../actions/users';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import auth from '../../reducers/auth';

const SignalUser = (props) => {
	const [ reason, setReason ] = useState(null);

	const allProblems = [
		'Ses messages sont inappropriés',
		'Insulte / propos raciste',
		'Apologie du terrorisme',
		'Il se fait passer pour moi ou pour quelqu’un d’autre'
	];

	const validForm = () => {
		if (reason) {
			props.signalUser(props.auth.user._id, props.navigation.state.params._id, reason);
		} else {
			props.setAlert('Veuillez fournir une raison', 'error');
		}
	};

	return (
		<style.container sstyle={{ paddingTop: Platform.OS === 'ios' ? 0 : '8%' }}>
			<style.reduceContainer>
				<Header prevRoute={'Conversation'} />
				<Alert />
				<style.textCenter>
					{' '}
					Aidez-nous à comprendre le problème avec{' '}
					<style.bold>
						{props.navigation.state.params.name + ' ' + props.navigation.state.params.surname}
					</style.bold>
				</style.textCenter>
				<style.listChoice>
					{allProblems.map((problem, i) => (
						<style.buttonChoice active={reason === problem} key={i} onPress={() => setReason(problem)}>
							<style.choice>{problem}</style.choice>
						</style.buttonChoice>
					))}
				</style.listChoice>
			</style.reduceContainer>
			<style.containerButtonBottom>
				<Button
					text="Signaler"
					onPress={() => {
						validForm();
					}}
				/>
			</style.containerButtonBottom>
		</style.container>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { signalUser, setAlert })(withNavigation(SignalUser));
