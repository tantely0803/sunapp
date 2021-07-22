import { combineReducers, createStore } from 'redux';
import alert from './alert';
import auth from './auth';
import evenement from './evenement';
import users from './users';
import messages, { gotMessages, gotNewMessage } from './messages';
import socket from './socket';

let navigate;

const reducers = combineReducers({
	alert,
	auth,
	evenement,
	users,
	messages
});

const store = createStore(reducers);

socket.on('priorMessages', (messages) => {
	store.dispatch(gotMessages(messages));
});

socket.on('connect', (message) => {
	store.dispatch(gotNewMessage(message));
});

export const openChat = (users) => {
	socket.emit('chat', users);
};

export const sendMessage = (text, sender, receiver) => {
	socket.emit('message', { text, sender, receiver });
};

export default combineReducers({
	alert,
	auth,
	evenement,
	users,
	messages
});
export * from './messages';
