import { EVENT_SUCCESS, ALL_EVENTS } from '../actions/types';
import { AsyncStorage } from 'react-native';

const initialState = {
	loading: true,
	event: null,
	events: []
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case EVENT_SUCCESS:
			return {
				...state,
				...payload,
				loading: false
			};
		case ALL_EVENTS:
			return {
				...state,
				events: payload,
				loading: false
			};
		default:
			return state;
	}
}
