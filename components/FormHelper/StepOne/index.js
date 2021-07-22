import React, { useState, useEffect, useRef } from 'react';
import * as style from './style';
import { View,  Platform } from 'react-native';
import Button from '../../Button';
import Input from '../../Input';
import Dropdown from '../../Dropdown';
import Header from '../../Header';
import { withNavigation } from 'react-navigation';
import { setAlert } from '../../../actions/alert';
import { connect } from 'react-redux';
import Alert from '../../Alert';
import { onlyiOS } from '../../../utils/emojiIOS';
import getDiseases from '../../../utils/getDiseases';
import KeyboardScrollView from '../../KeyboardScrollView';
import { SafeAreaView } from 'react-native';
const FormHelperStepOne = (props) => {
    const typeForm = props.navigation.state.params.typeForm;

    const dropdownRef = useRef(null);
    const nameRef = useRef(null);
    const surnameRef = useRef(null);
    const pseudoRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const datebirthRef = useRef(null);
    const passwordConfirmRef = useRef(null);

    const [word_disease, setWordDisease] = useState('');
    const [form, setForm] = useState({ status_map: typeForm });
    const [formData, setFormData] = useState([
        {
            type: 'date_birth',
            name: 'date_birth',
            label: 'Date de naissance',
            placeholder: '10/11/1990',
            password: false,
        },
        {
            type: 'dropdown',
            name: 'diseases',
            label: 'Pathologie',
            value: [],
            zIndex: 8,
            password: false,
            multi: true,
        },
    ]);

    useEffect(() => {
        getDiseases().then((data) => {
            const newFormData = [...formData];
            newFormData[1].value = data;

            setFormData(newFormData);
        });
    }, []);

    const updateField = (data, name) => {
        const result = { ...form, [name]: data };
        setForm(result);
    };

    const test = (data, name) => {
        setWordDisease(data);
    };

    const regexValidDateBirth = RegExp('^([0-9]{2})/([0-9]{2})/([0-9]{4})$');

    const validateForm = () => {
        if (form && form.diseases && form.date_birth) {
            console.log(form.date_birth);
            if (regexValidDateBirth.test(form.date_birth)) {
                if (typeForm === 'helper') {
                    props.navigation.navigate('FormHelperStepTwo', {
                        ...form,
                        word_disease,
                    });
                } else {
                    props.navigation.navigate('FormHelperStepThree', {
                        ...form,
                        word_disease,
                    });
                }
            } else {
                props.setAlert(
                    'Veuillez renseigner votre date de naissancce sous le format suivant: jj/mm/aaaa',
                    'danger'
                );
            }
        } else {
            props.setAlert('Veuillez remplir tous les champs', 'danger');
        }
    };

    return (
        <KeyboardScrollView>
            <style.reduceContainer>
                <Header prevRoute="Map" />
                {typeForm === 'helper' ? (
                    <style.imgreplace
                        resizeMode="contain"
                        source={{uri: 'http://app.sunapp.fr/images/devenir_aidant.png'}}
                    />
                ) : (
                    <style.imgreplace
                        resizeMode="contain"
                        source={{uri: 'http://app.sunapp.fr/images/parrain.png'}}
                    />
                )}
                {typeForm === 'helper' ? null : (
                    <style.bigtitle>
                        {' '}
                        Être soutenu {onlyiOS() ? '😍' : null}
                    </style.bigtitle>
                )}
                <Alert />
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        {formData &&
                            formData.map((item, i) => {
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
                                    case 'date_birth':
                                        ref = datebirthRef;
                                        break;                   
                                    default:
                                        break;
                                }

                                return item.type === 'dropdown' ? (
                                    <Dropdown
                                        key={i}
                                        zIndex={item.zIndex}
                                        onChange={updateField}
                                        category={test}
                                        input={item}
                                       // ref={dropdownRef} 
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
                                                    email.current.focus();
                                                    break;
                                                case 'email':
                                                    passwordRef.current.focus();
                                                    break;
                                                case 'password':
                                                    passwordConfirmRef.current.focus();
                                                    break;
                                                case 'confirm_password':
                                                    validateForm();
                                                    break;
                                                case 'date_birth':
                                                    datebirthRef.current.focus();
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
                        <Button text="Suivant" onPress={() => validateForm()} />
                    </View>
                </SafeAreaView>
            </style.reduceContainer>
        </KeyboardScrollView>
    );
};

export default connect(null, { setAlert })(withNavigation(FormHelperStepOne));
