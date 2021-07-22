import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Image,
    ScrollView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    LogBox ,
    View,
    RefreshControl
} from 'react-native';
import axios from 'axios';
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux';
import auth from '../../reducers/auth';
import { withNavigation } from 'react-navigation';
import setAuthToken from '../../utils/setAuthToken';
import Header from '../Header';
import { BASE_URL } from '../../actions/types';


LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications



// const conversations = [
//   {
//     _id: "5cefe0a06e8b3a0017939afd",
//     messages: [],
//     userOneId: "5ced046ad377c200173f80cc",
//     userTwoId: "5ced070dd377c200173f80cf"
//   }
//];

class Conversation extends React.Component {
    constructor(props) {
        super(props);

        console.log(props.auth);
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: 'black',
            headerBackTitle: null,
        };
    };

    state = {
        user: null,
        conversations: null,
        lastMessages: null,
        componentMounted: false,
        refreshing: false,
    };

    getOldMessages = async (token, conversationId, friendId) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/api/users/user/${friendId}/select`
            );
            friendPicture = response.data.picture;
        } catch (e) {
            console.log(e);
            alert(
                'ChatListScreen : ( getOldMessage ) axios request user ' +
                    e.message
            );
        }
        try {
            const response = await axios.get(
                `${BASE_URL}/api/conversations/messages/${conversationId}`,
                {
                    headers: { authorization: 'Bearer ' + token },
                }
            );
            if (response.data !== 'Conversation not found') {
                if (response.data.messages.length > 0) {
                    const oldMessages = response.data.messages.map(
                        (message) => {
                            //alert(message.senderId + "===" + friendId);
                            const formated = {
                                _id: message._id,
                                text: message.text,
                                createdAt: message.createdAt,
                                user: {
                                    _id: message.senderId,
                                    avatar:
                                        message.senderId === friendId &&
                                        (friendPicture[0]
                                            ? friendPicture[0].secure_url
                                            : require('../../assets/images/avatar-profile.png')),
                                },
                            };
                            return formated;
                        }
                    );
                    return oldMessages;
                }
            } else alert('Hmm ... conversation not found ...');
        } catch (e) {
            alert(
                'ChatListScreen : axios getOldMessages request : ' + e.message
            );
            console.log({ error: e.message });
        }
    };

    updateLastMessages = (message, conversationId) => {
        console.log('updateLastMessages ' + conversationId);
        let lastMessages = this.state.lastMessages;
        lastMessages[conversationId] = message;
        this.setState({ lastMessages });
    };

    lastMessageDateTimeInfo = (dbDate) => {
        const date = new Date(dbDate);
        const now = new Date();
        const msec = now - date;
        const sec = Math.ceil(msec / 1000);
        const mins = Math.floor(sec / 60);
        const hrs = Math.floor(mins / 60);
        const days = Math.floor(hrs / 24);
        const yrs = Math.floor(days / 365);

        if (mins < 1) {
            return 'Il y a ' + sec + ' seconde' + (sec <= 1 ? '' : 's');
        } else if (hrs < 1) {
            return 'Il y a ' + mins + ' minute' + (mins <= 1 ? '' : 's');
        } else if (hrs < 24) {
            return 'Il y a ' + hrs + ' heure' + (hrs <= 1 ? '' : 's');
        } else if (days < 365) {
            return 'Il y a ' + days + ' jour' + (days <= 1 ? '' : 's');
        } else {
            return 'Il y a ' + yrs + ' an' + (yrs <= 1 ? '' : 's');
        }
        return 'date error';
    };

    navigateToChat = (conversation, index) => {
        console.log('NAVIGATE TO CHAT');
        console.log(conversation, this.state.user);
        this.props.navigation.navigate('Message', {
            user: this.state.user,
            conversation: conversation,
            getOldMessages: this.getOldMessages,
            updateLastMessages: this.updateLastMessages,
            index: index,
        });
    };

    alertChatList = () => {
        alert('[ Chat List Screen ]');
    };

    // global.socket.on("message", message => {
    //   if (!global.isChatScreen) {
    //     alert(
    //       "Vous avez un Nouveau Message ! " +
    //       message.text +
    //       " isChatScreen=" +
    //       global.isChatScreen
    //     );
    //     global.newMessages = true;
    //   }
    //   if (global.isChatListScreen) {
    //     this.alertChatList();
    //   }

    componentDidMount = async () => {
        // user "cookie" : id, token, name, surname, picture
        console.log('[ ChatListScreen ] componentDidMount');

        await this.fetchConversations();

        console.log('[ ChatListScreen ] : componentDidMount end');
    };

    _onRefresh() {
        this.setState({refreshing: true});
        this.setState({conversations: null});
        this.fetchConversations();
        this.setState({refreshing: false});
    
      }
    


    fetchConversations = async () => {
        // Get current app user
        const user = this.props.auth.user;

        // Fetch all conversations for this user
        console.log('id', user._id);
        try {
            const valueAuth = await AsyncStorage.getItem('token');

            if (AsyncStorage.getItem('token')) {
                await setAuthToken(valueAuth);
            }
            const response = await axios.get(
                `${BASE_URL}/api/conversations/${user._id}`
            );
            let conversations = [];
            //const lastMessages = [];
            const lastMessages = {};
            if (response.data.length > 0) {
                conversations = response.data.filter(
                    (conversation) => conversation.activated === 'true'
                );

                // Get the last message and fetch datas about the friend of each conversation
                for (let i = 0; i < conversations.length; i++) {
                    try {
                        const oldMessages = await this.getOldMessages(
                            user.token,
                            conversations[i].id,
                            conversations[i].friendId
                        );
                        lastMessages[conversations[i].id] = oldMessages
                            ? oldMessages[0]
                            : null;
                    } catch (e) {
                        alert(
                            '[ ChatListScreen ] : Get the last message : ' +
                                e.message
                        );
                    }
                    try {
                        const response = await axios.get(
                            `${BASE_URL}/api/users/user/${conversations[i].friendId}/select`
                        );
                        conversations[i].name = response.data.name;
                        conversations[i].surname = response.data.surname;
                        conversations[i].picture = response.data.picture;
                    } catch (e) {
                        alert(
                            'ChatListScreen :gfdsxwvfdcx axios user request error : ' +
                                e.message
                        );
                        console.log({ error: e.message });
                    }
                }
            }

            if (this.state.conversations === null) {
                this.setState({
                    user,
                    conversations,
                    lastMessages,
                    componentMounted: true,
                });
            } else {
                // There is already one conversation in the state : a new conversation just created and not yet stated, so we state it
                this.setState({
                    user,
                    conversations: [...this.state.conversations, conversations],
                    lastMessages,
                    componentMounted: true,
                });
            }
        } catch (e) {
            alert(
                'ChatListScreen : axios get conversations request error : ' +
                    e.message
            );
            console.log({ error: e.message });
        }
    };

    render() {
        console.log('[ Chat List Screen ] > render');
        global.isChatScreen = false;
        // global.isChatListScreen = true;
        // if (global.newMessages) {
        //   global.newMessages = false;
        //   this.fetchConversations();
        //   alert("[ChatListScreen] fetch data");
        // }

        if (this.state.conversations === null) {
            return (
                <ActivityIndicator
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                />
            );
        }

        if (global.fromStory && this.state.componentMounted) {
            global.fromStory = false;

            // Problème : Si on passe par là après avoir crée une conversation :
            // - la conversation a déjà été chargée dans le state "conversations" par le componentDidMount lors du premier passage : OK
            // - la conversation n'a pas été chargée dans le state "conversations" ( on va la chercher, pas la trouver et passer "null" passer à ChatScreen )
            // - si on passe la conversation crée depuis Story, on peut la stocker dans le state "conversations" ( SI C'EST LE PREMIER PASSAGE DANS CE RENDER, componentDidMount n'a pas encore récupéré les conversations )
            // - si on ne passe pas de conversation crée depuis Story, on la cherche !

            const friendId = this.props.navigation.getParam('friendId');
            let conversation = this.props.navigation.getParam('conversation');
            let index = null;
            //if (conversation) {
            // conversation has just been created in database, so we store it in the conversations state if its not already in it
            index = 0;
            let flagged = false;
            for (let i = 0; i < this.state.conversations.length; i++) {
                if (this.state.conversations[i].friendId === friendId) {
                    flagged = true;
                    index = i;
                }
            }
            if (!flagged) {
                this.setState({
                    conversations: [...this.state.conversations, conversation],
                });
                index = this.state.conversations.length - 1;
            }
            this.navigateToChat(conversation, index);
        }

        if (this.state.conversations.length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text>
                        Vous n’avez pour l’instant aucune conversation !
                    </Text>
                </View>
            );
        }

        const convForScreen = [...this.state.conversations];

        // adding lastMessage to each conversation
        // convForScreen.map(conv => {
        //   if (this.state.lastMessages[conv.id])
        //     conv.lastUpdateAt = this.state.lastMessages[conv.id].createdAt;
        //   else conv.lastUpdateAt = "0";
        // });

        // convForScreen.sort((a, b) => {
        //   if (a.lastUpdateAt < b.lastUpdateAt) return -1;
        //   if (a.lastUpdateAt > b.lastUpdateAt) return 1;
        //   return 0;
        // });

        // TODO : sort conversations by last message date/time
        // for now, just a reverse to get the last dicussion created first
        convForScreen.reverse();

        return (
            <>
                <ScrollView
                    contentContainerStyle={{
                        flex: 1,
                        alignItems: 'center',
                        paddingTop: Platform.OS === 'ios' ? 0 : '8%',
                        marginTop: 30,
                    }}
                    refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh.bind(this)}
                        />
                      }
                >
                    <Header title="Conversation" />
                    {convForScreen.map((conversation, index) => {
                        const swipeoutBtns = [
                            {
                                text: 'Supprimer',
                                backgroundColor: 'red',
                                onPress: async () => {
                                    try {
                                        alert(
                                            'Attention cette action supprime la conversation pour les deux utilisateurs'
                                        );
                                        await axios.post(
                                            `${BASE_URL}/api/conversations/deactivate`,
                                            { id: conversation.id },
                                            {
                                                headers: {
                                                    authorization:
                                                        'Bearer ' +
                                                        this.state.user.token,
                                                },
                                            }
                                        );
                                        for (
                                            let i = 0;
                                            i < this.state.conversations.length;
                                            i++
                                        ) {
                                            console.log(
                                                this.state.conversations[i].id
                                            );
                                            if (
                                                this.state.conversations[i]
                                                    .id === conversation.id
                                            ) {
                                                const newConvs = [
                                                    ...this.state.conversations,
                                                ];
                                                newConvs.splice(i, 1);
                                                this.setState({
                                                    conversations: newConvs,
                                                });
                                            }
                                        }
                                    } catch (error) {
                                        alert(
                                            'Server error : please try again ... ' +
                                                error.message
                                        );
                                    }
                                },
                            },
                        ];

                        return (
                            <Swipeout
                                key={index}
                                right={swipeoutBtns}
                                autoClose={true}
                                backgroundColor="transparent"
                                style={{
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    height: 50,
                                    width: '100%',
                                    marginBottom: 10,
                                }}
                            >
                                <TouchableOpacity
                                    style={styles.convBlock}
                                    onPress={() => {
                                        console.log(
                                            '[ ChatListScreen ] -- navigate to ChatScreen'
                                        );
                                        this.navigateToChat(
                                            conversation,
                                            index
                                        );
                                    }}
                                >
                                    <Image
                                        style={styles.convImage}
                                        source={{
                                            uri: conversation.picture
                                                ? conversation.picture[0]
                                                    ? conversation.picture[0]
                                                          .secure_url
                                                    : 'no_picture'
                                                : 'no_picture',
                                        }}
                                    />
                                    <View style={styles.convDetailsContainer}>
                                        <View style={styles.convDetails}>
                                            <Text style={styles.convName}>
                                                {conversation.name}{' '}
                                                {conversation.surname}
                                            </Text>
                                            <Text style={styles.dateTimeInfo}>
                                                {this.state.lastMessages[
                                                    conversation.id
                                                ]
                                                    ? this.lastMessageDateTimeInfo(
                                                          this.state
                                                              .lastMessages[
                                                              conversation.id
                                                          ].createdAt
                                                      )
                                                    : ''}
                                            </Text>
                                        </View>
                                        <Text>
                                            {this.state.lastMessages[
                                                conversation.id
                                            ]
                                                ? this.state.lastMessages[
                                                      conversation.id
                                                  ].text
                                                : ''}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </Swipeout>
                        );
                    })}
                </ScrollView>
            </>
        );
    }

    

    
}

const styles = StyleSheet.create({
    convBlock: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    convImage: {
        backgroundColor: '#8A49F8',
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    convDetailsContainer: { flex: 1 },
    convDetails: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 0,
    },
    convName: { fontWeight: 'bold' },
    dateTimeInfo: { fontSize: 12 },
});

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, null)(withNavigation(Conversation));
