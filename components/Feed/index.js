import React, { useState, useCallback } from 'react';
import * as style from './style';
import { Image, View, Platform, AsyncStorage, Linking } from 'react-native';
import Input from '../Input';
import Button from '../Button';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';
import { onlyiOS } from '../../utils/emojiIOS';
const Feed = (props) => {
	loadUser();
	const scrollMainMenu = [
		{
			image_url:  "http://app.sunapp.fr/images/map2.png" ,
			href: 'Map'
		},
		{
			image_url: "http://app.sunapp.fr/images/event.png" ,
			href: 'CreateEvent'
		},
		{
			image_url: "http://app.sunapp.fr/images/msg1.png" ,
			href: 'Conversation'
		}
	];

	const scrollPub = [
		{
			image_url: require('../../assets/images/feed/pub3.png'),
			href: 'pub1'
		}
	];

	const onPress = (url) => {
		Linking.openURL(url).catch((err) => console.error('An error occurred', err));
		return false;
		};

	return (
		<style.container style={{ paddingTop: Platform.OS === 'ios' ? 0 : '8%' }}>
			<style.reduceContainer>
				<style.header>
					<style.surnametxt>Hello {props.auth.user !== null ? props.auth.user.name : null} {onlyiOS() ? '✌️' : null}️</style.surnametxt>
					<TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
						{props.auth.user ? props.auth.user.picture[0] ? (
							<style.imgavatar resizeMode="cover" source={{ uri: props.auth.user.picture[0].url }} />
						) : (
							<style.imgavatar
								resizeMode="cover"
								source={require('../../assets/images/avatar-profile.png')}
							/>
						) : (
							<style.imgavatar
								resizeMode="cover"
								source={require('../../assets/images/avatar-profile.png')}
							/>
						)}
					</TouchableOpacity>
				</style.header>

				{/* Main menu */}
				<style.contentHorizontal horizontal={true} showsHorizontalScrollIndicator={false}>
					{scrollMainMenu.map((item, i) => (
						<style.buttonImage
							first={i === 0 ? true : false}
							key={i}
							onPress={() => props.navigation.navigate(item.href)}
						>
							<style.img resizeMode="cover" source={{ uri : item.image_url }} />
						</style.buttonImage>
					))}
				</style.contentHorizontal>


				

				{/* Options menu */}
				{/* <style.title>Options</style.title>
				<style.contentHorizontal horizontal={true} showsHorizontalScrollIndicator={false}>
					<style.buttonImage first={true} onPress={() => props.navigation.navigate('Rules')}>
						<style.imgoptions
							resizeMode="cover"
							source={require('../../assets/images/feed/options1.png')}
						/>
					</style.buttonImage>
					<style.buttonImage
						onPress={() => Linking.openURL("mailto:contact@sunapp.fr?subject=J'ai une question!")}
					>
						<style.imgoptions
							resizeMode="cover"
							source={require('../../assets/images/feed/options2.png')}
						/>
					</style.buttonImage>
					<style.buttonImage
						onPress={() => Linking.openURL("mailto:contact@sunapp.fr?subject=J'ai une question!")}
					>
						<style.imgoptions
							resizeMode="cover"
							source={require('../../assets/images/feed/options3.png')}
						/>
					</style.buttonImage>
				</style.contentHorizontal> */}

				<style.title2></style.title2>

				{/* Main pub */}
				<style.contentHorizontal horizontal={true} showsHorizontalScrollIndicator={false}>
					
							{scrollPub.map((item, i) => (
								<style.buttonImage
									first={i === 0 ? true : false}
									key={i}
									onPress={() => onPress("http://www.pub.sunapp.fr/app")  }
								>
									<style.imgpub resizeMode="cover" source={{uri: 'http://app.sunapp.fr/pub/pub1.png'}} />
									
								</style.buttonImage>
								 
							))}

				</style.contentHorizontal>


			</style.reduceContainer>
		</style.container>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { loadUser })(withNavigation(Feed));
