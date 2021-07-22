import React, { useState, useCallback } from 'react';
import * as style from './style';
import { Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import Button from '../../Button';

import { withNavigation } from 'react-navigation';
import { setAlert } from '../../../actions/alert';
import { updateUser } from '../../../actions/auth';
import { connect } from 'react-redux';
import Alert from '../../Alert';
import * as  AssetUtils from 'expo-asset-utils';
import { Asset } from 'expo-asset';

class FormHelperStepThree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: null,
            pictureUrl: null,
        };
    }

    async valideForm() {
        if (this.state.picture) {
            await this.props.updateUser(
                {
                    ...this.props.navigation.state.params,
                    picture: this.state.picture,
                    map: true,
                },
                this.props.auth.user._id
            );
            await this.props.navigation.navigate('FormHelperStepFour', {
                ...this.props.navigation.state.params,
            });
        } else {
            this.props.setAlert(
                'Veuillez mettre une photo de profil',
                'danger'
            );
        }
    }

    render() {
        let { pictureUrl } = this.state;

        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Alert />
                <Image
                    source={
                        pictureUrl
                            ? { uri: pictureUrl }
                            : require('../../../assets/images/round.png')
                    }
                    style={{ width: 200, borderRadius: 100, height: 200 }}
                />
                <Button
                    onlyColor={true}
                    text="Ajouter une photo de profil"
                    onPress={this._pickImage}
                />


                <style.title2>Le chargement de la photo peut prendre quelques minutes</style.title2>

                <style.buttonBottom>
                    <Button text="Suivant" onPress={() => this.valideForm()} />
                </style.buttonBottom>
            </View>
        );
    }

    componentDidMount() {
        this.getPermissionAsync();
        console.log('hi');
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(
                Permissions.CAMERA_ROLL
            );
            if (status !== 'granted') {
                alert(
                    'Sorry, we need camera roll permissions to make this work!'
                );
            }
        }
    };

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {

            // const imageURI = Asset.fromModule(require('../../../assets/icon-app.png')).uri;
            // console.log(result.uri);
            // const base64url = await AssetUtils.base64forImageUriAsync(
            //     imageURI
            // );
            let base64Img = `data:image/jpg;base64,${result.base64}`;
            this.setState({ picture: [base64Img], pictureUrl: base64Img });    

             //https://snack.expo.io/rymMHDOFb       
            // const base64url = await AssetUtils.base64forImageUriAsync(
            //     result.uri
            // );
            // let base64Img = `data:image/jpg;base64,${base64url.data}`;
            // this.setState({ picture: [base64Img], pictureUrl: result.uri });
        }
    };
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, updateUser })(
    withNavigation(FormHelperStepThree)
);
