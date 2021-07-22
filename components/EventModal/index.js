import React from 'react';
import * as style from './style';
import { Image } from 'react-native';

const EventModal = ({ data, index, onPress, profilePicture }) => {
    const { address, startDate, startTime, title, picture } = data;

    return (
        <style.contentEvent
            onPress={() => onPress(data)}
            firstEvent={index === 0 ? true : false}
        >
            <style.contentImageDesc>
                <style.name littleSize>{ title.length > 40 ? `${title.substring(0, 37)}...` : title}</style.name>
                {picture ? (
                    <style.imageasso source={{ uri: picture[0].url }} />
                ) : (
                    <style.imageasso
                        source={
                            !profilePicture
                                ? require('../../assets/images/avatar-profile.png')
                                : { uri: profilePicture }
                        }
                    />
                )}
            </style.contentImageDesc>
            <style.contentAdress>
                <Image
                    style={{ height: 20, width: 18, marginRight: 10 }}
                    source={require('../../assets/images/location.png')}
                />
                <style.adress>{address}</style.adress>
            </style.contentAdress>
            <style.contentInformationEvent>
                <style.bgColor color="#FED601">
                    <Image
                        style={{ height: 20, width: 18, marginRight: 10 }}
                        source={require('../../assets/images/calendar.png')}
                    />
                    <style.textInfo>{startDate.trim()}</style.textInfo>
                </style.bgColor>
                {/* <style.bgColor color="#6EDB8E">
					<Image
						style={{ height: 20, width: 18, marginRight: 10 }}
						source={require('../../assets/images/clock.png')}
					/>
					<style.textInfo>{startTime}</style.textInfo>
				</style.bgColor> */}
            </style.contentInformationEvent>
        </style.contentEvent>
    );
};

export default EventModal;
