import React, { useState, useEffect, useRef } from 'react';
import * as style from './style';
import { Platform } from 'react-native';
import Input from '../Input';
import Button from '../Button';
import Alert from '../Alert';
import { withNavigation } from 'react-navigation';
import Dropdown from '../Dropdown';
import Header from '../Header';
import { formAsso, formPatients } from './dataForm';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { connect } from 'react-redux';
import { BENEVOLE } from '../../utils/constants';
import getDiseases from '../../utils/getDiseases';
import KeyboardScrollView from '../KeyboardScrollView';

const Register = (props) => {
    const dropdownRef = useRef(null);
    const nameRef = useRef(null);
    const surnameRef = useRef(null);
    const pseudoRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmRef = useRef(null);

    const typeForm = props.navigation.state.params.typeForm;

    const updateField = (data, name) => {
        const result = { ...form, [name]: data };
        setForm(result);
    };

    const checkUser = () => {
        if (form.password && form.password === form.confirm_password) {
            if (form.status === BENEVOLE) {
                props.register(
                    { ...form, word_disease, status_map: 'Bénévole' },
                    props.navigation
                );
            } else {
                props.register({ ...form, word_disease }, props.navigation);
            }
            //props.navigation.navigate('Rules');
        } else {
            props.setAlert(
                'Les deux mot de passe ne correspondent pas',
                'danger'
            );
        }
    };

    const test = (data, name) => {
        setWordDisease(data);
    };

    const [word_disease, setWordDisease] = useState('');
    const [form, setForm] = useState({ status: typeForm });

    const isFormPatient =
        typeForm === 'Patient' ||
        typeForm === 'Entourage' ||
        typeForm === 'Bénévole';
    
   

    const [showForm, setShowForm] = useState(
        isFormPatient ? formPatients : formAsso
    );

    useEffect(() => {
        getDiseases().then((data) => {
            const newForm = [...showForm];

            isFormPatient ? ''  : newForm[2].value = data;

            //newForm[isFormPatient ? 1 : 2].value = data;

            setShowForm(newForm);
        });
    },[]);

    return (
        <KeyboardScrollView>
            <style.reduceContainer>
                <Header prevRoute="FirstStepRegister" />
                <Alert />
                <style.spacetop>
                    {showForm.map((item, i) => {
                       console.log(item);
                        console.log("------");
                        console.log(i);
                        let ref = null;
                        switch (item.name) {
                            case 'name':
                                ref = nameRef;
                                break;

                            case 'surname':
                                ref = surnameRef;
                                break;
                            case 'pseudo':
                                ref = pseudoRef;
                                break;
                            case 'email':
                                ref = emailRef;
                                break;
                            case 'password':
                                ref = passwordRef;
                                break;
                            case 'confirm_password':
                                ref = passwordConfirmRef;
                                break;
                            default:
                                break;
                        }

                        return item.type === 'dropdown' ? (
                            <Dropdown
                                key={i}
                                zIndex={100}
                                onChange={updateField}
                                input={item}
                                category={test}
                            />
                        ) : (
                            <Input
                                key={i}
                                onChange={updateField}
                                input={item}
                                ref={ref}
                                onSubmitEditing={() => {
                                    switch (item.name) {
                                        case 'name':
                                            surnameRef.current.focus();
                                            break;

                                        case 'surname':
                                            pseudoRef.current.focus();
                                            break;
                                        case 'pseudo':
                                            emailRef.current.focus();
                                            break;
                                        case 'email':
                                            passwordRef.current.focus();
                                            break;
                                        case 'password':
                                            passwordConfirmRef.current.focus();
                                            break;
                                        case 'confirm_password':
                                            checkUser();
                                            break;
                                        default:
                                            break;
                                    }
                                }}
                                returnKeyType={'next'}
                                blurOnSubmit={false}
                            />
                        );
                    })}
                    <Button text="Créer un compte" onPress={checkUser} />
                    <style.goregister
                        onPress={() => props.navigation.navigate('Login')}
                    >
                        <style.textbutton>
                            J'ai déjà un compte chez SUN{' '}
                        </style.textbutton>
                        <style.textpurple>Connexion</style.textpurple>
                    </style.goregister>
                </style.spacetop>
            </style.reduceContainer>
        </KeyboardScrollView>
    );
};

export default connect(null, { setAlert, register })(withNavigation(Register));
