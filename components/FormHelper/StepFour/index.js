import React, { useState, useCallback } from 'react';
import * as style from './style';
import { Image, View, Platform, AsyncStorage } from 'react-native';
import Button from '../../Button';
import Input from '../../Input';
import Dropdown from '../../Dropdown';
import { withNavigation } from 'react-navigation';

const FormHelperStepFour = (props) => {
    return (
        <style.container
            style={{ paddingTop: Platform.OS === 'ios' ? 0 : '8%' }}
        >
            <style.imgreplace
                resizeMode="cover"
                source={{uri: 'http://app.sunapp.fr/images/oh_nice.png'}}
            />
            <style.reduceContainer>
                <style.bigtitle>Oh nice !</style.bigtitle>
                {props.navigation.state.params &&
                props.navigation.state.params.status_map === 'helper' ? (
                    <React.Fragment>
                        <style.paragraph>
                            Ton profil est enregistré sur SUNMAP ! Les personnes
                            à la recherche d'un référent te contacteront
                            bientôt.
                        </style.paragraph>
                        <style.paragraph>
                            En attendant, tu peux aller discuter avec d’autres
                            experts comme toi !
                        </style.paragraph>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <style.paragraph>
                            Tu peux désormais trouver un expert de ta pathologie
                            afin qu’il réponde à toutes tes questions !
                        </style.paragraph>
                        <style.paragraph>
                            Ne t’inquiète surtout pas, tu ne seras jamais
                            visible sur la carte. Seuls les experts y sont
                            répertoriés !
                        </style.paragraph>
                    </React.Fragment>
                )}
            </style.reduceContainer>
            <style.buttonBottom>
                <Button
                    text="Suivant"
                    onPress={() => props.navigation.navigate('Map')}
                />
            </style.buttonBottom>
        </style.container>
    );
};

export default withNavigation(FormHelperStepFour);
