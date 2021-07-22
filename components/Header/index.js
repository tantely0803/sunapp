import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import * as style from './style';

const Header = (props) => {
    return (
        <style.contentHeader {...props.style}>
            <View>
                {props.prevRoute ? (
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate(props.prevRoute);
                        }}
                    >
                        <Image
                            style={{ width: 28, height: 28 }}
                            source={require('../../assets/images/arrow-left.png')}
                        />
                    </TouchableOpacity>
                ) : null}
            </View>
            <View>
                {props.title ? (
                    <style.titleScreen>{props.title}</style.titleScreen>
                ) : null}
            </View>
            <View>
                {props.signal && props.receiver ? (
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate(
                                'SignalUser',
                                props.receiver
                            );
                        }}
                    >
                        <Image
                            style={{ width: 24, height: 24 }}
                            source={require('../../assets/images/alert-circle.png')}
                        />
                    </TouchableOpacity>
                ) : null}
            </View>
        </style.contentHeader>
    );
};

export default withNavigation(Header);
