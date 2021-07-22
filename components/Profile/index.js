import React, { useState, useEffect } from 'react';
import * as style from './style';
import { Image, View, Platform, SafeAreaView } from 'react-native';
import Button from '../Button';
import Header from '../Header';
import { withNavigation } from 'react-navigation';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux';
import {
    ASSOCIATION,
    ENTOURAGE,
    PATIENT,
    BENEVOLE,
} from '../../utils/constants';
import { updateUser } from '../../actions/auth';
import Alert from '../Alert';
import AssetUtils from 'expo-asset-utils';
import Dropdown from '../Dropdown';
import getDiseases from '../../utils/getDiseases';
import KeyboardScrollView from '../KeyboardScrollView';

const Profile = ({ auth, updateUser, navigation }) => {
    // Change form if asso or user
    const [form, setForm] = useState({});
    const [picture, setPicture] = useState(null);
    const [pictureUri, setPictureUri] = useState(null);

    useEffect(() => {
        getPermissionAsync();
    });

    const [name, setName] = useState(auth.user.name);
    const [surname, setSurname] = useState(auth.user.surname);
    const [namePresident, setNamePresident] = useState(
        auth.user.name_president
    );
    const [email, setEmail] = useState(auth.user.email);
    const [pseudo, setPseudo] = useState(auth.user.pseudo);
    const [history, setHistory] = useState(auth.user.history);
    const [address, setAddress] = useState(auth.user.address);
    const [status, setStatus] = useState(auth.user.status);
    const [diseases, setDiseases] = useState(auth.user.diseases);

    const [dropdownInput, setDropdownInput] = useState({
        type: 'dropdown',
        name: 'diseases',
        label: 'Pathologies',
        value: [],
        password: false,
        multi: true,
    });

    useEffect(() => {
        getDiseases().then((data) => {
            const newDropdownInput = { ...dropdownInput };
            newDropdownInput.value = data;

            setDropdownInput(newDropdownInput);
        });
    }, []);

    const _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            const base64url = await AssetUtils.base64forImageUriAsync(
                result.uri
            );
            let base64Img = `data:image/jpg;base64,${base64url.data}`;
            setPicture([base64Img]);
            setPictureUri(result.uri);
        }
    };

    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(
                Permissions.CAMERA_ROLL
            );
            if (status !== 'granted') {
                alert(
                    'Nous avons besoin de la permission de la caméra pour le bon fonctionnement !'
                );
            }
        }
    };

    const submitForm = () => {
        if (auth.user.status === ASSOCIATION) {
            if (picture) {
                const form = {
                    name,
                    namePresident,
                    email,
                    history,
                    address,
                    picture,
                    diseases,
                };
                updateUser(form, auth.user._id);
            } else {
                const form = {
                    name,
                    namePresident,
                    email,
                    history,
                    address,
                    diseases,
                };
                updateUser(form, auth.user._id);
            }
        } else {
            if (picture) {
                const form = {
                    name,
                    surname,
                    pseudo,
                    email,
                    history,
                    status,
                    picture,
                    diseases,
                };
                updateUser(form, auth.user._id);
            } else {
                const form = {
                    name,
                    surname,
                    pseudo,
                    email,
                    history,
                    status,
                    diseases,
                };
                updateUser(form, auth.user._id);
            }
        }
    };

    return auth.isAuthenticated ? (
        <KeyboardScrollView>
            <style.reduceContainer>
                <Header prevRoute="Main" />
                <Alert />
                <style.centerItems>
                    {pictureUri ? (
                        <Image
                            source={{ uri: pictureUri }}
                            style={{
                                width: 100,
                                borderRadius: 100,
                                height: 100,
                            }}
                        />
                    ) : auth.user.picture[0] ? (
                        <style.avatarimg
                            source={{ uri: auth.user.picture[0].url }}
                        />
                    ) : (
                        <style.avatarimg
                            source={require('../../assets/images/avatar-profile.png')}
                        />
                    )}
                    <Button
                        onlyColor={true}
                        text="Modifier la photo de profil"
                        onPress={() => _pickImage()}
                    />
                </style.centerItems>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        {auth.user.status === ENTOURAGE ||
                        auth.user.status === PATIENT ||
                        auth.user.status === BENEVOLE ? (
                            <>
                                <style.groupInput>
                                    <style.label>Prénom</style.label>
                                    <style.input
                                        placeholder={''}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        value={name}
                                        onChangeText={(text) => setName(text)}
                                    />
                                </style.groupInput>
                                <style.groupInput>
                                    <style.label>Nom</style.label>
                                    <style.input
                                        placeholder={''}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        value={surname}
                                        onChangeText={(text) =>
                                            setSurname(text)
                                        }
                                    />
                                </style.groupInput>
                                <style.groupInput>
                                    <style.label>Pseudo</style.label>
                                    <style.input
                                        placeholder={''}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        value={pseudo}
                                        onChangeText={(text) => setPseudo(text)}
                                    />
                                </style.groupInput>

                                <Dropdown
                                    zIndex={1000}
                                    onChange={(data, _) => {
                                        setDiseases([...data]);
                                    }}
                                    input={dropdownInput}
                                    defaultValues={auth.user.diseases}
                                    category={() => {}}
                                />

                                <style.groupInput>
                                    <style.label>Votre email</style.label>
                                    <style.input
                                        placeholder={''}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        value={email}
                                        onChangeText={(text) => setEmail(text)}
                                    />
                                </style.groupInput>
                                <style.groupInput>
                                    <style.label>Votre histoire</style.label>
                                    <style.input
                                        placeholder={''}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        value={history}
                                        multine={true}
                                        onChangeText={(text) =>
                                            setHistory(text)
                                        }
                                    />
                                </style.groupInput>
                            </>
                        ) : (
                            <>
                                <style.groupInput>
                                    <style.label>Nom</style.label>
                                    <style.input
                                        placeholder={''}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        value={name}
                                        onChangeText={(text) => setName(text)}
                                    />
                                </style.groupInput>
                                <style.groupInput>
                                    <style.label>Nom du président</style.label>
                                    <style.input
                                        placeholder={''}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        value={namePresident}
                                        onChangeText={(text) =>
                                            setNamePresident(text)
                                        }
                                    />
                                </style.groupInput>
                                <style.groupInput>
                                    <style.label>Votre email</style.label>
                                    <style.input
                                        placeholder={''}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        value={email}
                                        onChangeText={(text) => setEmail(text)}
                                    />
                                </style.groupInput>
                                <style.groupInput>
                                    <style.label>Votre adresse</style.label>
                                    <style.input
                                        placeholder={''}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        value={address}
                                        onChangeText={(text) =>
                                            setAddress(text)
                                        }
                                    />
                                </style.groupInput>
                                <style.groupInput>
                                    <style.label>Votre histoire</style.label>
                                    <style.input
                                        placeholder={''}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        value={history}
                                        multine={true}
                                        onChangeText={(text) =>
                                            setHistory(text)
                                        }
                                    />
                                </style.groupInput>
                            </>
                        )}
                        <Button
                            text="Terminé"
                            onPress={() => {
                                submitForm();
                                navigation.navigate('Home');
                            }}
                        />
                        <style.breakline />
                    </View>
                </SafeAreaView>
            </style.reduceContainer>
        </KeyboardScrollView>
    ) : null;
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { updateUser })(
    withNavigation(Profile)
);
