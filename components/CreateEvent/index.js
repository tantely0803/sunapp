import React, { useState, Fragment, useEffect } from 'react';
import * as style from './style';
import { Text, View, TouchableOpacity } from 'react-native';
import Button from '../Button';
import Input from '../Input';
import Header from '../Header';
import Alert from '../Alert';
import { withNavigation } from 'react-navigation';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { frCA } from 'date-fns/locale';
import { connect } from 'react-redux';
import { createEvenement } from '../../actions/evenement';
import auth from '../../reducers/auth';
import KeyboardScrollView from '../KeyboardScrollView';

const CreateEvent = ({ createEvenement, auth, navigation }) => {
    const formEvent = [
        {
            type: 'title',
            name: 'title',
            label: 'Titre de la proposition',
            placeholder: 'Aide pour les courses',
            password: false,
        },
        {
            type: 'address',
            name: 'address',
            label: 'Adresse',
            placeholder: '',
            password: false,
        },
        {
            type: 'textarea',
            name: 'description',
            label: 'Description de la proposition',
            placeholder: "J'aide pour les courses",
            password: false,
        },
    ];

    const [timeStart, setTimeStart] = useState(new Date());
    const [textTimeStart, setTextTimeStart] = useState(
        format(timeStart, 'HH:mm', { locale: frCA })
    );
    const [dateStart, setDateStart] = useState(new Date());
    const [textDateStart, setTextDateStart] = useState(
        format(dateStart, 'dd / MM / yyyy', { locale: frCA })
    );

    const [timeEnd, setTimeEnd] = useState(new Date());
    const [textTimeEnd, setTextTimeEnd] = useState(
        format(timeEnd, 'HH:mm', { locale: frCA })
    );
    const [dateEnd, setDateEnd] = useState(new Date());
    const [textDateEnd, setTextDateEnd] = useState(
        format(dateEnd, 'dd / MM / yyyy', { locale: frCA })
    );

    const [selectedDate, setSelectedDate] = useState('dateStart');

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [modeSecond, setSecondMode] = useState('date');
    const [showSecond, setSecondShow] = useState(false);

    const onChange = (event, value) => {
        const currentDate = value || dateStart;

        switch (selectedDate) {
            case 'timeStart':
                setTimeStart(currentDate);
                setTextTimeStart(
                    format(currentDate, 'HH:mm', { locale: frCA })
                );
                break;
            case 'timeEnd':
                setTimeEnd(currentDate);
                setTextTimeEnd(format(currentDate, 'HH:mm', { locale: frCA }));
                break;
            case 'dateStart':
                setDateStart(currentDate);
                setTextDateStart(
                    format(currentDate, 'dd / MM / yyyy', { locale: frCA })
                );
                break;
            case 'dateEnd':
                setDateEnd(currentDate);
                setTextDateEnd(
                    format(currentDate, 'dd / MM / yyyy', { locale: frCA })
                );
        }

        if (selectedDate === 'timeStart' || selectedDate === 'dateStart') {
            setShow(Platform.OS === 'ios' ? true : false);
        } else {
            setSecondShow(Platform.OS === 'ios' ? true : false);
        }
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showSecondMode = (currentMode) => {
        setSecondShow(true);
        setSecondMode(currentMode);
    };

    const showDatepicker = (contentDate) => {
        if (contentDate === 'dateStart') {
            showMode('date');
        } else {
            showSecondMode('date');
        }
        setSelectedDate(contentDate);
    };

    const showTimepicker = (contentTime) => {
        if (contentTime === 'timeStart') {
            showMode('time');
        } else {
            showSecondMode('time');
        }
        setSelectedDate(contentTime);
    };

    const updateField = (data, name) => {
        const result = { ...form, [name]: data };
        setForm(result);
    };
    const [form, setForm] = useState();
    const [formData, setFormData] = useState(formEvent);

    return (
        <KeyboardScrollView>
            <style.reduceContainer>
                <Header prevRoute="Main" />
                <style.bigtitle>Créer la proposition</style.bigtitle>
                <Alert />
                {formData &&
                    formData.map((item, i) => {
                        if (i === 0) {
                            return (
                                <View key={i}>
                                    <Input
                                        onChange={updateField}
                                        input={item}
                                    />
                                    <style.littleTextGray>
                                        par l'association Blabla
                                    </style.littleTextGray>
                                </View>
                            );
                        } else if (i === 1) {
                            // Here the datepicker and timepicker
                            // Change Localization soon
                            // REFACTO + EX
                            return (
                                <View key={i}>
                                    <style.label>
                                        Début de l'événement
                                    </style.label>
                                    <style.contentInputHour>
                                        <TouchableOpacity
                                            onPress={() =>
                                                showDatepicker('dateStart')
                                            }
                                        >
                                            <Text>{textDateStart}</Text>
                                        </TouchableOpacity>
                                        {/* <TouchableOpacity  hidden heure carte 
                                            onPress={() =>
                                                showTimepicker('timeStart')
                                            }
                                        >
                                            <Text>{textTimeStart}</Text>
                                        </TouchableOpacity> */}
                                    </style.contentInputHour>
                                    {show && (
                                        <Fragment>
                                            <DateTimePicker
                                                locale="fr-FR"
                                                testID="dateTimePicker"
                                                timeZoneOffsetInMinutes={60}
                                                value={
                                                    selectedDate === 'timeStart'
                                                        ? timeStart
                                                        : dateStart
                                                }
                                                mode={mode}
                                                is24Hour={true}
                                                display="default"
                                                onChange={onChange}
                                            />
                                            <Button
                                                text="Terminé!"
                                                onPress={() => setShow(false)}
                                            />
                                        </Fragment>
                                    )}

                                    <Input
                                        onChange={updateField}
                                        input={item}
                                    />
                                </View>
                            );
                        } else {
                            return (
                                <Input
                                    key={i}
                                    onChange={updateField}
                                    input={item}
                                />
                            );
                        }
                    })}
                <Button
                    text="Créer la proposition"
                    onPress={() => {
                        createEvenement({
                            ...form,
                            startTime: textTimeStart,
                            startDate: textDateStart,
                            userId: auth.user._id,
                        });
                        navigation.navigate('Home');
                    }}
                />
            </style.reduceContainer>
        </KeyboardScrollView>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { createEvenement })(
    withNavigation(CreateEvent)
);
