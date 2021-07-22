import { ALL_USERS_FAIL, ALL_USERS_SUCCESS } from '../actions/types';
import { AsyncStorage } from 'react-native';

const initialState = {
    loading: true,
    users: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ALL_USERS_SUCCESS:
            return {
                ...state,
                users: payload,
                loading: false,
            };
        case ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}
