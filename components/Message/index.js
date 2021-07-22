import React from 'react';
import { KeyboardAvoidingView, Keyboard } from 'react-native';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import axios from 'axios';
import { BASE_URL } from '../../actions/types';
import { getUserPushToken, sendNotificationTo } from '../../actions/users';
//import config from "../../config";
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import SocketIOClient from 'socket.io-client';
import { Platform, View } from 'react-native';
import Header from '../Header';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import style from './style';

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            receiver: null,
        };

        this.socket = SocketIOClient('ws://server.sunapp.fr:7000', {transports: ['websocket']});

        this.socket.emit('init', {
            senderId: this.props.auth.user._id,
        });
        this.socket.on('message', (message) => {
            alert('Nouveau Message ! ' + message.text);
            console.log(' ---> Nouveau message !!!! <---');
        });

        this.socket.on('message', (message) => {
            console.log(this.state.friendPicture);
            const newMessage = {
                createdAt: message.createdAt,
                text: message.text,
                //userId: message.senderId,
                user: {
                    _id: message.senderId,
                    avatar: this.state.friendPicture[0]
                        ? this.state.friendPicture[0].secure_url
                        : require('../../assets/images/avatar-map.png'),
                },
                _id: message.msgId,
            };
            this.setState({
                messages: GiftedChat.append(this.state.messages, newMessage),
            });
            // Update lastMessages of ChatListScreen
            this.props.navigation.state.params.updateLastMessages(
                newMessage,
                this.props.navigation.state.params.conversation.id
            );
        });

        this.state = {
            userInited: false,
            messages: [],
            friendPicture: '',
            hasKeyboard: false,
        };
    }

    componentWillUnmount() {
        this.keyboardShowListener.remove();
        this.keyboardHideListener.remove();
    }

    componentDidMount = async () => {
        this.keyboardShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                this.setState({ hasKeyboard: true });
            }
        );

        this.keyboardHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                this.setState({ hasKeyboard: false });
            }
        );

        console.log('===---> [ ChatScreen ] componentDidMount ');

        const conversationId = this.props.navigation.state.params.conversation
            .id;
        const friendId = this.props.navigation.state.params.conversation
            .friendId;
        const token = this.props.navigation.state.params.user.token;
        //fetch messages data
        const messages = await this.props.navigation.state.params.getOldMessages(
            token,
            conversationId,
            friendId
        );
        // fetch friend picture
        let friendPicture = '';
        try {
            const response = await axios.get(
                `${BASE_URL}/api/users/user/${friendId}/select`,
                {
                    headers: { authorization: 'Bearer ' + token },
                }
            );
            friendPicture = response.data.picture;
            console.log('responsedata', response.data);
            this.setState({ receiver: response.data });
        } catch (e) {
            console.log(e);
            alert(
                'ChatListScreen : ( getOldMessage ) axios request user ' +
                    e.message
            );
        }

        this.setState({ messages, friendPicture });
    };

    onSend = (messages) => {
        this.socket.emit('message', {
            conversationId: this.props.navigation.state.params.conversation.id,
            text: messages[0].text,
            senderId: this.props.auth.user._id,
            receiverId: this.props.navigation.state.params.conversation
                .friendId,
            createdAt: new Date(),
            msgId: messages[0]._id,
        });

        getUserPushToken(
            this.props.navigation.state.params.conversation.friendId
        ).then((token) =>
            sendNotificationTo({
                to: token,
                title: `${this.props.navigation.state.params.user.name} ${this.props.navigation.state.params.user.surname}`,
                body:
                    messages[0].text.length > 140
                        ? messages[0].text.substring(0, 137) + '...'
                        : messages[0].text,
            })
        );

        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
        // Update lastMessages of ChatListScreen
        // this.props.navigation.state.params.updateLastMessages(
        // 	messages[0],
        // 	this.props.navigation.state.params.conversation.id
        // );
    };

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                textStyle={{
                    left: {
                        color: '#000',
                        fontSize: 16,
                    },
                    right: {
                        color: 'white',
                        fontSize: 16,
                    },
                }}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#F0F0F0',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                    },
                    right: {
                        backgroundColor: '#8A49F8',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                    },
                }}
            />
        );
    }

    render() {
        console.log('===---> [ Message ] render');
        return (
            <View
                style={{
                    marginTop: Platform.OS === 'ios' ? 30 : 0,
                    paddingTop: Platform.OS === 'ios' ? 0 : 0,
                }}
            >
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderColor: '#ccc',
                        height: hp('10%'),
                        justifyContent: 'center',
                    }}
                >
                    <Header
                        style={{
                            marginLeft: 30,
                            marginRight: 30,
                        }}
                        prevRoute="Conversation"
                        title="Messages"
                        signal
                        receiver={this.state.receiver}
                    />
                </View>
                <View style={{ height: hp('85%') }}>
                    <GiftedChat
                        user={{
                            _id: this.props.auth.user._id,
                        }}
                        placeholder="Écrivez un message"
                        locale="fr"
                        //showUserAvatar={true}
                        messages={this.state.messages}
                        onSend={(messages) => this.onSend(messages)}
                        renderBubble={this.renderBubble}
                        renderSend={(props) => {
                            return (
                                <Send
                                    {...props}
                                    style={{ height: '100%', width: '100%' }}
                                >
                                    <style.send>
                                        <style.sendText>Envoyer</style.sendText>
                                    </style.send>
                                </Send>
                            );
                        }}
                        isKeyboardInternallyHandled={false}
                    />
                    {Platform.OS === 'android' ? (
                        <KeyboardAvoidingView
                            behavior="padding"
                            keyboardVerticalOffset={hp('15%')}
                        />
                    ) : (
                        <KeyboardAvoidingView
                            behavior="padding"
                            keyboardVerticalOffset={hp('15%')}
                        />
                    )}
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    messages: state.messages,
    auth: state.auth,
    //receiver: navigation.navigate.state.params.receivingUser
});

export default connect(mapStateToProps, null)(withNavigation(Message));
