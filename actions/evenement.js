import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { EVENT_SUCCESS, EVENT_FAIL, BASE_URL, ALL_EVENTS } from './types';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';
import { spaceLongitudeAndLatitude } from './utils';

export const createEvenement = ({
    title,
    startDate,
    startTime,
    endDate,
    endTime,
    address,
    description,
    userId,
}) => async (dispatch) => {
    const valueAuth = await AsyncStorage.getItem('token');

    if (AsyncStorage.getItem('token')) {
        await setAuthToken(valueAuth);
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({
        title,
        startDate,
        startTime,
        endTime,
        endDate,
        address,
        description,
        userId,
    });

    try {
        const res = await axios.post(BASE_URL + '/api/events', body, config);
        await dispatch({
            type: EVENT_SUCCESS,
            payload: res.data,
        });
        dispatch(
            setAlert('Votre événement a été créé avec succès !', 'success')
        );
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: EVENT_FAIL,
        });
    }
};

export const getAllEvents = () => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await axios.get(BASE_URL + '/api/events', config);

        await dispatch({
            type: ALL_EVENTS,
            payload: spaceLongitudeAndLatitude(res.data.reverse()),
        });
    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: EVENT_FAIL,
        });
    }
};
