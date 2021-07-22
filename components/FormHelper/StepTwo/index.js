import React, { useState, useCallback } from 'react';
import * as style from './style';
import { Image, View, Platform } from 'react-native';
import Button from '../../Button';
import Input from '../../Input';
import Dropdown from '../../Dropdown';
import { withNavigation } from 'react-navigation';
import { setAlert } from '../../../actions/alert';
import { connect } from 'react-redux';
import Alert from '../../Alert';
import { onlyiOS } from '../../../utils/emojiIOS';
import KeyboardScrollView from '../../KeyboardScrollView';

const FormHelperStepTwo = (props) => {
    const formHelper = [
        {
            type: 'textarea',
            name: 'history',
            label: 'Raconter son histoire',
            placeholder:
                'Mon histoire est... (Votre traitement ? Vos études ? Des infos sur votre parcours ?)',
            password: false,
        },
    ];

    const lastStepForm = props.navigation.state.params;
    const updateField = (data, name) => {
        const result = { ...form, [name]: data };
        setForm(result);
    };
    const [form, setForm] = useState(lastStepForm);

    const validateForm = () => {
        if (form && form.history) {
            props.navigation.navigate('FormHelperStepThree', form);
        } else {
            props.setAlert('Veuillez remplir le champ', 'danger');
        }
    };

    return (
        <KeyboardScrollView>
            <style.reduceContainer>
                <style.bigtitle>
                    Devenir aidant {onlyiOS() ? '💪' : null}{' '}
                </style.bigtitle>
                <Alert />
                <style.spaceBet>
                    {formHelper.map((item, i) => {
                        return item.type === 'dropdown' ? (
                            <Dropdown
                                key={i}
                                zIndex={item.zIndex}
                                onChange={updateField}
                                input={item}
                            />
                        ) : (
                            <Input
                                key={i}
                                onChange={updateField}
                                input={item}
                            />
                        );
                    })}
                    <Button text="Suivant" onPress={() => validateForm()} />
                </style.spaceBet>
            </style.reduceContainer>
        </KeyboardScrollView>
    );
};

export default connect(null, { setAlert })(withNavigation(FormHelperStepTwo));
