import { REGISTER_SUCCESS, UPDATE_USER, USER_LOADED, LOGIN_SUCCESS, LOGOUT, ACCOUNT_DELETED } from '../actions/types';
import { AsyncStorage } from 'react-native';

const initialState = {
	token: AsyncStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload
			};
		case REGISTER_SUCCESS:
			AsyncStorage.setItem('token', payload.token);
			return {
				...state,
				user: payload.user,
				isAuthenticated: true,
				loading: false
			};
		case UPDATE_USER:
			return {
				...state,
				user: payload,
				isAuthenticated: true,
				loading: false
			};
		case LOGIN_SUCCESS:
			AsyncStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false
			};
		case ACCOUNT_DELETED:
			AsyncStorage.removeItem('token');

			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null
			};
		case LOGOUT:
			AsyncStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null
			};
		default:
			return state;
	}
}
