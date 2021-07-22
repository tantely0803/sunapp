import React, { useState, useCallback, useRef } from 'react';
import * as style from './style';
import { View, Platform } from 'react-native';
import Input from '../Input';
import Button from '../Button';
import Alert from '../Alert';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { login, RedirectUserAuth } from '../../actions/auth';
import { passwordInput } from '../Input/style';
import KeyboardScrollView from '../KeyboardScrollView';

const Login = ({ navigation, setAlert, login, RedirectUserAuth }) => {
    const passwordRef = useRef(null);

    const formLogin = [
        {
            type: 'email',
            name: 'email',
            label: 'Adresse email',
            placeholder: 'ex: sun@gmail.com',
            password: false,
        },
        {
            type: 'password',
            name: 'password',
            label: 'Mot de passe',
            placeholder: '••••••••',
            password: true,
        },
    ];

    const updateField = (data, type) => {
        const result = { ...form, [type]: data };
        setForm(result);
    };

    RedirectUserAuth(navigation);

    const checkUser = () => {
        if (form.email && form.password) {
            if (form.email.length > 0 && form.password.length > 0) {
                login(form.email, form.password, navigation);
            } else {
                setAlert('Veuillez remplir les champs vides', 'danger');
            }
        } else {
            setAlert('Veuillez remplir les champs vides', 'danger');
        }
    };

    const [form, setForm] = useState({});

    return (
        <KeyboardScrollView>
            <style.reduceContainer>
                <style.logo
                    resizeMode="contain"
                    source={{uri: 'http://app.sunapp.fr/images/logo2.png'}}
                />
                <style.hi>Hi!</style.hi>
                <View>
                    <Alert />
                    {formLogin.map((item, i) => (
                        <Input
                            key={i}
                            onChange={updateField}
                            input={item}
                            
                            onSubmitEditing={() => {
                                switch (item.name) {
                                    case 'email':
                                        passwordRef.current.focus();
                                        break;
                                    case 'password':
                                        checkUser();
                                        break;
                                }
                            }}
                            returnKeyType={item.name === 'email' ? 'next' : 'none'}
                            blurOnSubmit={item.name !== 'email'}
                        />
                    ))}
                    <Button text="Se connecter" onPress={checkUser} />
                </View>
                <style.goregister>
                    <style.textbutton  onPress={() => navigation.navigate('FirstStepRegister')}>Nouveau chez SUN ?</style.textbutton>
                    <style.textpurple  onPress={() => navigation.navigate('FirstStepRegister')} >Créer ton compte</style.textpurple>
                    <style.textbutton></style.textbutton>
                    <style.textpurple  onPress={() => navigation.navigate('ForgetPassword' , {  step : 'REQUEST_LINK' , code : 'null' } )}>Mot de passe oublié</style.textpurple>
                   
                </style.goregister>
               
                <View style={{ flex: 1 }} />
            </style.reduceContainer>
        </KeyboardScrollView>
    );
};

export default connect(null, { setAlert, login, RedirectUserAuth })(
    withNavigation(Login)
);
