import { AsyncStorage } from 'react-native';
import axios from 'axios';
import {
    ALL_USERS_FAIL,
    ALL_USERS_SUCCESS,
    BASE_URL,
    EXPO_PUSH_NOTIFICATION_URL,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import { spaceLongitudeAndLatitude } from './utils';

const JSON_HEADERS = {
    'Content-Type': 'application/json',
};

const CONFIG = {
    headers: JSON_HEADERS,
};

export const getAllUsers = (statusMap, _id) => async (dispatch) => {
    try {
        const res = await axios.get(
            BASE_URL + `/api/users/${statusMap}/${_id}`,
            CONFIG
        );

        await dispatch({
            type: ALL_USERS_SUCCESS,
            payload: spaceLongitudeAndLatitude(
                res.data.filter((r) => !!r.coords)
            ),
        });
    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: ALL_USERS_FAIL,
        });
    }
};

export const signalUser = (user_send, user_signal, reason) => async (
    dispatch
) => {
    const valueAuth = await AsyncStorage.getItem('token');

    if (AsyncStorage.getItem('token')) {
        await setAuthToken(valueAuth);
    }

    const body = JSON.stringify({
        user_send,
        user_signal,
        reason,
    });

    try {
        const res = await axios.post(BASE_URL + `/api/signal`, body, CONFIG);
        dispatch(setAlert('Utilisateur signalé !', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: ALL_USERS_FAIL,
        });
    }
};

export const setUserPushToken = async (token) => {
    const valueAuth = await AsyncStorage.getItem('token');

    if (!valueAuth) return;

    await setAuthToken(valueAuth);

    axios
        .post(
            `${BASE_URL}/api/push-token`,
            {
                token,
            },
            CONFIG
        )
        .catch((err) => {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach((error) => setAlert(error.msg, 'danger'));
            }
        });
};

export const getUserPushToken = async (userId) => {
    const valueAuth = await AsyncStorage.getItem('token');

    if (!valueAuth) return;

    await setAuthToken(valueAuth);

    console.log(userId);

    return axios
        .get(
            `${BASE_URL}/api/push-token/${userId}`,
            {
                token,
            },
            CONFIG
        )
        .then((res) => {
            return Promise.resolve(res.data.pushToken);
        })
        .catch((err) => {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach((error) => setAlert(error.msg, 'danger'));
            }
        });
};

const DEFAULT_NOTIFICATION = {
    to: '',
    sound: 'default',
    title: '',
    body: '',
    data: {},
    _displayInForeground: true,
};

export const sendNotificationTo = async (config = DEFAULT_NOTIFICATION) => {
    const notification = {
        ...DEFAULT_NOTIFICATION,
        ...config,
    };

    return axios
        .post(EXPO_PUSH_NOTIFICATION_URL, notification, {
            headers: {
                ...JSON_HEADERS,
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
            },
        })
        .then((res) => {
            console.log('sendNotificationTo res: ', res);

            return true;
        })
        .catch((err) => {
            console.log('sendNotificationTo err: ', err);
        });
};

export const updateCoords = async (coords) => {
    if (!coords || !coords.latitude || !coords.longitude)
        throw new Error(
            'updateCoords: You need to provide every agument: latitude and longitude'
        );

    const valueAuth = await AsyncStorage.getItem('token');

    if (!valueAuth) return;

    await setAuthToken(valueAuth);

    axios.put(`${BASE_URL}/api/users/user`, coords).catch((err) => {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => setAlert(error.msg, 'danger'));
        }
    });
};
