import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE,
    BASE_URL,
    UPDATE_USER,
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Auth User Redirect
export const RedirectUserAuth = (navigation) => async (dispatch) => {
    const valueAuth = await AsyncStorage.getItem('token');

    if (AsyncStorage.getItem('token')) {
        await setAuthToken(valueAuth);
    }

    try {
        const res = await axios.get(BASE_URL + '/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
        navigation.navigate('Home');
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// Load User
export const loadUser = () => async (dispatch) => {
    const valueAuth = await AsyncStorage.getItem('token');

    if (AsyncStorage.getItem('token')) {
        await setAuthToken(valueAuth);
    }

    try {
        const res = await axios.get(BASE_URL + '/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// Register User
export const register = (
    {
        status,
        pseudo,
        surname,
        name,
        email,
        password,
        address,
        disease,
        name_president,
    },
    navigation
) => async (dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({
        status,
        pseudo,
        surname,
        name,
        email,
        password,
        address,
        disease,
        name_president,
    });

    


    try {

        console.log(body);

        console.log("ato"); 


        if (status === 'Association') {
            const res = await axios.post(
                BASE_URL + '/api/users/user/asso',
                body,
                config
            );
            await dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });

            await dispatch(loadUser());
        } else {

            console.log("io"); 
            const res = await axios.post(
                BASE_URL + '/api/users/user/helper',
                body,
                config
            );

            await dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });
            
        }
        await navigation.navigate('Rules');
    } catch (err) {
        const errors = err.response.data.errors;

        console.log("erreur");

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: REGISTER_FAIL,
        });
    }
};

// Login User
export const login = (email, password, navigation) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(BASE_URL + '/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });

        dispatch(loadUser());

        navigation.navigate('Home');
    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

// Update User
export const updateUser = (form, userID) => async (dispatch) => {
    const valueAuth = await AsyncStorage.getItem('token');

    if (AsyncStorage.getItem('token')) {
        await setAuthToken(valueAuth);
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': valueAuth,
        },
    };
    const body = JSON.stringify(form);
    try {
        const res = await axios.post(
            BASE_URL + `/api/users/user/${userID}`,
            body,
            config
        );
        dispatch({
            type: UPDATE_USER,
            payload: res.data,
        });

        dispatch(setAlert('Profil mis à jour avec succcès !', 'success'));
    } catch (err) {
        console.log('Auth err: ', err);
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL,
        });
    }
};


// Find User by email 
export const findUserbyEmail = (email , navigation) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    };
    try {
        const res = await axios.get(
            BASE_URL + `/api/users/user/email/${email}`,
            config
        );

       
        console.log(res.data.token);
       

        //  console.log(navigation);
        //  console.log("NAVIGATION 3 ")
        navigation.navigate('ForgetPassword' , {  step : 'VERIFY' , code : res.data.token } );
       
       
    } catch (err) {

        //const errors = err.response.data.errors;

        const error = err.response.data.error;
       
        dispatch(setAlert(error, 'danger'));
           
        navigation.navigate('ForgetPassword' , {  step : 'REQUEST_LINK'} );
    }
};


// check code reset Password 
export const checkcodeResetPassword = ( email , code , password ,  navigation) => async (dispatch) => {
   
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const res = await axios.get(
        BASE_URL + `/api/users/user/code/${email}/${code}/${password}`,
        config
        );

    
        console.log(res.data.success);
        //console.log("......");    
         console.log(navigation);
        //  console.log("NAVIGATION 3 ")
        dispatch(setAlert("Votre mot de passe a été mise à jour", 'info'));

       navigation.navigate('Login');
       
       
    } catch (err) {

        const error = err.response.data.error;

        dispatch(setAlert(error, 'danger'));
        
        navigation.navigate('ForgetPassword' , {  step : 'VERIFY'} );
    }
};


// Update User
export const deleteUser = (userID) => async (dispatch) => {
    const valueAuth = await AsyncStorage.getItem('token');

    if (AsyncStorage.getItem('token')) {
        await setAuthToken(valueAuth);
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': valueAuth,
        },
    };
    try {
        const res = await axios.delete(
            BASE_URL + `/api/users/${userID}`,
            config
        );
        dispatch({
            type: LOGOUT,
            payload: res.data,
        });
        dispatch({ type: CLEAR_PROFILE });
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
    }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
};
