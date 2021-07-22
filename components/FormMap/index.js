import React, { Component, createRef } from 'react';
import * as style from './style';
import {
    View,
    Image,
    Easing,
    Platform,
    Animated,
    Alert,
    Text,
    AsyncStorage,
} from 'react-native';
import Button from '../Button';
import { withNavigation } from 'react-navigation';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EventModal from '../EventModal';
import { connect } from 'react-redux';
import { getAllEvents } from '../../actions/evenement';
import { getAllUsers } from '../../actions/users';
import { BASE_URL } from '../../actions/types';
import axios from 'axios';
import { updateUser } from '../../actions/auth';
import { updateCoords } from '../../actions/users';
import { onlyiOS } from '../../utils/emojiIOS';
import { colors } from '../../styles/constants';

const CARD_OPEN_POSITION = hp('0%');
const CARD_HIDE_POSITION = hp('100%');

class FormMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCardOpen: false,
            isLoading: true,
            location: null,
            latitudeDelta: 0.05,
            longitudeDelta: 0.03,
            errorMessage: null,
            //state pour le filtre de recherche (à mettre à jour sur la V2)
            filterValue: 'All',
            //state pour la recherche par textinput dans Search (à mettre à jour sur la V2)
            stories: null,
            currentEvent: null,
            currentUser: null,
            users: null,
            events: null,
            mapView: false,
        };
        this.position = new Animated.Value(0);
        this.positionEvent = new Animated.Value(0);
        this.map = createRef();
    }

    async componentDidMount() {
        if (this.props.auth.user.date_birth) {
            this.getLocationAsync();
            this.props.getAllUsers(
                this.props.auth.user.status_map,
                this.props.auth.user._id
            );
            this.props.getAllEvents();
        }
        const mapView = await AsyncStorage.getItem('mapView');
        this.setState({ mapView });
    }

    getLocationAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission refusée',
                isLoading: false,
            });
        } else {
            const location = await Location.getCurrentPositionAsync({});
            this.props.updateUser(
                {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                },
                this.props.auth.user._id
            );
            this.setState({
                location: location,
                isLoading: false,
            });
        }
    };

    setOpenPosition = (value, data) => {
        if (data) {
            this.setState({ currentUser: data });
        }
        Animated.timing(this.position, {
            duration: 1000,
            toValue: value,
            easing: Easing.bezier(0.075, 0.82, 0.165, 1),
            useNativeDriver: true,
        }).start();
    };

    createConversation = async (id, friendId) => {
        try {
            const valueAuth = await AsyncStorage.getItem('token');
            const response = await axios.post(
                `${BASE_URL}/api/conversations`,
                {
                    id: id,
                    friendId: friendId,
                },
                {
                    headers: { 'x-auth-token': valueAuth },
                }
            );
            // conversation already exists ( in that case, _id is not set by the api response which answer appoximatively : "A conversation already exists"  )
            // if (!response.data._id) {
            //   return null;
            // }
            // conversation created, we continue
            const conversation = {
                id: response.data._id,
            };

            try {
                const response = await axios.get(
                    `${BASE_URL}/api/users/user/${friendId}/select`
                );
                conversation.friendId = friendId;
                conversation.name = response.data.name;
                conversation.picture = response.data.picture
                    ? response.data.picture
                    : require('../../assets/images/avatar-profile.png');

                return conversation;
            } catch (e) {
                Alert.alert(
                    'Attention',
                    'Story : axios createConversation user request error : ' +
                        e.message
                );
                console.log({ error: e.message });
            }
        } catch (e) {
            Alert.alert(
                'Attention',
                'Story : axios create conversation request error : ' + e.message
            );
        }
    };

    navigateToChatList = async (event) => {
        const friendId = event
            ? this.state.currentEvent.user._id
            : this.state.currentUser._id;

        // Fetch or create Conversation between app user and friend !
        const conversation = await this.createConversation(
            this.props.auth.user._id,
            friendId
        );

     

        // Navigate to ChatListScreen with fromStory "true"
        this.props.navigation.navigate('Conversation', {
            friendId: friendId,
            conversation: conversation,
        });
    };

    setOpenPositionEvent = (value, data) => {
        if (data) {
            this.setState({ currentEvent: data });
        }
        Animated.timing(this.positionEvent, {
            duration: 1000,
            toValue: value,
            easing: Easing.bezier(0.075, 0.82, 0.165, 1),
            useNativeDriver: true,
        }).start();
    };

    getCardStyle = () => {
        return {
            backgroundColor: '#ffffff',
            width: wp('100%'),
            height: hp('95%'),
            zIndex: 3,

            borderRadius: 45,
            position: 'absolute',
            left: 0,
            right: 0,
        };
    };

    getCropImage = (url) => {
        const baseImage =
            'https://res.cloudinary.com/sun-app/image/upload/w_100,h_100,r_max/';
        let urlImage = url.substr(47);
        return baseImage + urlImage.replace('.jpg', '.png');
    };

    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            try {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: 0.3,
                            longitudeDelta: 0.3,
                        });
                    },
                    (error) => {
                        switch (error.code) {
                            case 1:
                                Alert.alert(
                                    '',
                                    'Vous devez activer la localisation'
                                );

                                break;
                            default:
                                Alert.alert(
                                    '',
                                    'Erreur lors de la detection de la position'
                                );
                        }
                    }
                );
            } catch (e) {
                alert(e.message || '');
                reject(e);
            }
        });
    }

    setRegion(region) {
        this.map.current.animateToRegion(region);
    }

    render() {
        const splittedBirthDate = this.state.currentUser
            ? this.state.currentUser.date_birth.split('/')
            : [];
        const currentUserAge = this.state.currentUser
            ? Math.floor(
                  (new Date() -
                      new Date(
                          `${splittedBirthDate[1]}/${splittedBirthDate[0]}/${splittedBirthDate[2]}`
                      )) /
                      (1000 * 3600 * 24 * 365.25)
              )
            : 0;

        const togglePopupUser = this.position.interpolate({
            inputRange: [0, 1],
            outputRange: [CARD_HIDE_POSITION, CARD_OPEN_POSITION],
        });

        const togglePopupEvent = this.positionEvent.interpolate({
            inputRange: [0, 1],
            outputRange: [CARD_HIDE_POSITION, CARD_OPEN_POSITION],
        });
        return (
            <style.container
                style={{
                    paddingTop: Platform.OS === 'ios' ? 0 : '8%',
                    paddingLeft: Platform.OS === 'ios' ? 0 : '8%',
                    paddingRight: Platform.OS === 'ios' ? 0 : '8%',
                }}
            >
                {!this.props.auth.user.status_map ? (
                    
                    <style.scroll>
                        <style.imgreplace
                            resizeMode="contain"
                            source={{uri: 'http://app.sunapp.fr/images/welcome_sunmap.png'}}
                        />

                        {this.props.auth.user.status == 'Entourage' ? 
                        
                        <style.reduceContainer>
                            <style.bigtitle>
                                Bienvenue sur SUNMAP {onlyiOS() ? '☀️' : null} !
                                
                            </style.bigtitle>
                            <style.paragraph>
                                Via sa carte intéractive qui référence tous les
                                patients-expert et proches-expert, trouvez enfin
                                des personnes capables de répondre à toutes vos
                                questions.
                            </style.paragraph>
                            <style.paragraph>
                                Seuls les experts de leur maladie et leurs
                                proches sont répertoriés sur cette carte.
                            </style.paragraph>
                            <style.paragraph>
                                L’anonymat est importante chez SUN !
                            </style.paragraph>

                            <Button text="Suivant"  onPress={() =>
                                    this.props.navigation.navigate(
                                        'FormHelperStepOne',
                                        { typeForm: 'entourage' }
                                    )
                                }  />

                            
                            
                        </style.reduceContainer>
                        
                        : 
                   
                        <style.reduceContainer>
                            <style.bigtitle>
                                Bienvenue sur SUNMAP {onlyiOS() ? '☀️' : null} !
                                
                            </style.bigtitle>
                            <style.paragraph>
                                Via sa carte intéractive qui référence tous les
                                patients-expert et proches-expert, trouvez enfin
                                des personnes capables de répondre à toutes vos
                                questions.
                            </style.paragraph>
                            <style.paragraph>
                                Seuls les experts de leur maladie et leurs
                                proches sont répertoriés sur cette carte.
                            </style.paragraph>
                            <style.paragraph>
                                L’anonymat est importante chez SUN !
                            </style.paragraph>
                            <Button
                                text={`Je veux être aidé et aider ! ${
                                    onlyiOS() ? '💪' : ''
                                }`}
                                onlyBorder={true}
                                onPress={() =>
                                    this.props.navigation.navigate(
                                        'FormHelperStepOne',
                                        { typeForm: 'helper' }
                                    )
                                }
                            />
                            <Button
                                text={`J’ai juste besoin d'aide ! ${
                                    onlyiOS() ? '😍' : ''
                                }`}
                                onlyBorder={true}
                                onPress={() =>
                                    this.props.navigation.navigate(
                                        'FormHelperStepOne',
                                        { typeForm: 'supported' }
                                    )
                                }
                            />
                            
                        </style.reduceContainer>

                        }


                    </style.scroll>
                ) : this.state.errorMessage && !this.state.location ? (
                    <Text>{this.state.errorMessage}</Text>
                ) : (
                    <>
                        <MapView
                            onMapReady={async (_) => {
                                const coords = await this.getCurrentPosition();
                                updateCoords({
                                    latitude: coords.latitude,
                                    longitude: coords.longitude,
                                });
                                this.setRegion(coords);
                            }}
                            clusterColor={colors.primary}
                            clusterFontFamily={'rubik-medium'}
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                height: hp('100%'),
                            }}
                            provider="google"
                            initialRegion={{
                                latitude: 48.866667,
                                longitude: 2.333333,
                                latitudeDelta: 2,
                                longitudeDelta: 2,
                            }}
                            maxZoomLevel={18.1}
                            showsUserLocation={true}
                            followsUserLocation={true}
                            followsUserLocation={true}
                            showsBuildings={false}
                            loadingEnabled={true}
                            ref={this.map}
                        >
                            {this.props.users.users &&
                                this.props.users.users.map((user) => {
                                    return user.coords ? (
                                            <Marker
                                                key={user._id}
                                                onPress={() =>
                                                    this.setOpenPosition(1, user)
                                                }
                                                coordinate={{
                                                    latitude: parseFloat(
                                                        user.coords.latitude
                                                    ),
                                                    longitude: parseFloat(
                                                        user.coords.longitude
                                                    ),
                                                }}
                                                image={
                                                    user.picture[0]
                                                        ? {
                                                              uri: this.getCropImage(
                                                                  user.picture[0]
                                                                      .url
                                                              ),
                                                          }
                                                        : require('../../assets/images/avatar-map.png')
                                                }
                                            />
                                    ) : null;
                                })}
                            {this.props.events.events
                                ? this.props.events.events.map((event) => {
                                      return (
                                          <Marker
                                              key={event._id}
                                              coordinate={{
                                                  latitude:
                                                      event.coords.latitude +
                                                      0.0001,
                                                  longitude:
                                                      event.coords.longitude,
                                              }}
                                              onPress={() =>
                                                  this.setOpenPositionEvent(
                                                      1,
                                                      event
                                                  )
                                              }
                                              image={
                                                  onlyiOS()
                                                      ? require('../../assets/images/event-position-ios.png')
                                                      : require('../../assets/images/event-position-android.png')
                                              }
                                          />
                                      );
                                  })
                                : null}
                        </MapView>
                        {this.props.events.events ? (
                            <style.contentEvents
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                            >
                                {this.props.events.events.map((event, i) => {
                                    return (
                                        <EventModal
                                            key={i}
                                            data={event}
                                            index={i}
                                            // profilePicture={ mile jerena fa ts arako 
                                            //     event.user.picture.length > 0
                                            ////         ? event.user.picture[0]
                                            //               .secure_url
                                            //         : null
                                            // }
                                            onPress={(data) =>
                                                this.setOpenPositionEvent(
                                                    1,
                                                    data
                                                )
                                            }
                                        />
                                    );
                                })}
                            </style.contentEvents>
                        ) : null}
                    </>
                )}
                {/* <style.searchContainer>
					<style.inputSearch placeholder="Trouver un event / association" />
					<style.iconSearch source={require('../../assets/images/search.png')} />
				</style.searchContainer> */}
                {/* POPUP POUR LES USERS */}
                {this.state.currentUser ? (
                    <Animated.View
                        style={[
                            this.getCardStyle(),
                            {
                                transform: [{ translateY: togglePopupUser }],
                            },
                        ]}
                    >
                        <style.scroll
                            horizontal={false}
                            nestedScrollEnabled={true}
                        >
                            <style.buttonClose
                                onPress={() => this.setOpenPosition(0, null)}
                            >
                                <style.close
                                    source={require('../../assets/images/close.png')}
                                />
                            </style.buttonClose>
                            <style.column>
                                {this.state.currentUser.picture[0] ? (
                                    <style.avatar
                                        source={{
                                            uri: this.state.currentUser
                                                .picture[0].url,
                                        }}
                                    />
                                ) : (
                                    <style.avatar
                                        source={require('../../assets/images/avatar-profile.png')}
                                    />
                                )}
                                <style.oldUser>{`${currentUserAge} ans`}</style.oldUser>
                                <style.name>
                                    {this.state.currentUser.name}
                                </style.name>
                                <style.textDisease>
                                    {this.state.currentUser.diseases.map(
                                        (disease, i) => (

                                            (i === 0) ? (
                                                <Text key={i}>{disease}  </Text>
                                            ) : this.state.currentUser.diseases.length  === i+1 ? (
                                                 <Text key={i}> • {disease}</Text>
                                            ) : (
                                                <Text key={i}>• {disease} </Text>
                                            )
                                            
                                               
                                            
                                        )
                                    )}{' '}
                                    / {this.state.currentUser.status}
                                </style.textDisease>
                            </style.column>
                            <style.containerslide>
                                <style.title>Mon histoire</style.title>
                                <style.textStory>
                                    {this.state.currentUser.history}
                                </style.textStory>
                                <style.containerBottom>
                                    <Button
                                        onPress={() =>
                                            this.navigateToChatList()
                                        }
                                        text="Envoyer un message"
                                    />
                                </style.containerBottom>
                            </style.containerslide>
                            {/* <Swiper
							ref={'swiper'}
							removeClippedSubviews={false}
							activeDotColor={'#8A49F8'}
							activeDotStyle={{ height: 15, width: 15, borderRadius: 100 }}
						>
							<style.containerslide>
								<style.title>Mes badges</style.title>
								<style.containerBadges>
									<style.contentBadges>
										<style.imagebadge source={require('../../assets/images/round.png')} />
										<style.namebadge>Test 12</style.namebadge>
									</style.contentBadges>
									<style.contentBadges>
										<style.imagebadge source={require('../../assets/images/round.png')} />
										<style.namebadge>Test 12</style.namebadge>
									</style.contentBadges>
									<style.contentBadges>
										<style.imagebadge source={require('../../assets/images/round.png')} />
										<style.namebadge>Test 12</style.namebadge>
									</style.contentBadges>
									<style.contentBadges>
										<style.imagebadge source={require('../../assets/images/round.png')} />
										<style.namebadge>Test 12</style.namebadge>
									</style.contentBadges>
									<style.contentBadges>
										<style.imagebadge source={require('../../assets/images/round.png')} />
										<style.namebadge>Test 12</style.namebadge>
									</style.contentBadges>
									<style.contentBadges>
										<style.imagebadge source={require('../../assets/images/round.png')} />
										<style.namebadge>Test 12</style.namebadge>
									</style.contentBadges>
									<style.contentBadges>
										<style.imagebadge source={require('../../assets/images/round.png')} />
										<style.namebadge>Test 12</style.namebadge>
									</style.contentBadges>
								</style.containerBadges>
								<style.containerBottom>
									<Button text="Envoyer un message" />
									<style.littleText>23 personnes sont intéressés</style.littleText>
								</style.containerBottom>
							</style.containerslide>
						</Swiper> */}
                        </style.scroll>
                    </Animated.View>
                ) : null}

                {/* POPUP POUR LES EVENTS */}
                {this.state.currentEvent ? (
                    <Animated.View
                        style={[
                            this.getCardStyle(),
                            {
                                transform: [{ translateY: togglePopupEvent }],
                            },
                        ]}
                    >
                        <style.scrollColumn>
                            <style.buttonClose
                                onPress={() =>
                                    this.setOpenPositionEvent(0, null)
                                }
                            >
                                <style.close
                                    source={require('../../assets/images/close.png')}
                                />
                            </style.buttonClose>
                            <style.column assoc>
                                <style.name>
                                    {this.state.currentEvent.title}
                                </style.name>
                                <style.contentAdress>
                                    <Image
                                        style={{
                                            height: 20,
                                            width: 18,
                                            marginRight: 10,
                                        }}
                                        source={require('../../assets/images/location.png')}
                                    />
                                    <style.adress>
                                        {this.state.currentEvent.address}
                                    </style.adress>
                                </style.contentAdress>
                                <style.contentBoxEvent>
                                    <View>
                                        <style.title bigMTop>Date</style.title>
                                        <style.bgColor noPad color="#FFF797">
                                            <Image
                                                style={{
                                                    height: 20,
                                                    width: 18,
                                                    marginRight: 10,
                                                }}
                                                source={require('../../assets/images/calendar.png')}
                                            />
                                            <style.textInfo>
                                                {this.state.currentEvent.startDate.trim()}
                                            </style.textInfo>
                                        </style.bgColor>
                                    </View>
                                    {/* <View> Hidden heure
                                        <style.title bigMTop>Heure</style.title>
                                        <style.bgColor noPad color="#6EDB8E">
                                            <Image
                                                style={{
                                                    height: 20,
                                                    width: 18,
                                                    marginRight: 10,
                                                }}
                                                source={require('../../assets/images/clock.png')}
                                            />
                                            <style.textInfo>
                                                {
                                                    this.state.currentEvent
                                                        .startTime
                                                }
                                            </style.textInfo>
                                        </style.bgColor>
                                    </View> */}
                                </style.contentBoxEvent>
                            </style.column>
                            <style.flexStart>
                                <style.title bigMTop>Organisateur</style.title>
                                <style.bgColor noPad color="#E7E7E7">
                                    <Image
                                        style={{
                                            height: 20,
                                            width: 18,
                                            marginRight: 10,
                                        }}
                                        source={require('../../assets/images/clock.png')}
                                    />
                                    <style.textInfo>
                                        {' '}
                                        {this.state.currentEvent.user.name}
                                    </style.textInfo>
                                </style.bgColor>
                            </style.flexStart>
                            <style.scrollText>
                                <style.title bigMTop>
                                    Event description dd
                                </style.title>
                                <style.textStory>
                                    {this.state.currentEvent.description}
                                </style.textStory>
                            </style.scrollText>
                            <style.containerBottom>
                                <Button
                                    onPress={() =>
                                        this.navigateToChatList(true)
                                    }
                                    text="Envoyer un message"
                                />
                            </style.containerBottom>
                        </style.scrollColumn>
                    </Animated.View>
                ) : null}
            </style.container>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    events: state.evenement,
    users: state.users,
});

export default connect(mapStateToProps, {
    getAllEvents,
    getAllUsers,
    updateUser,
})(withNavigation(FormMap));
