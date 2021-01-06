import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import firebase from 'firebase';

import Message from './Components/Message/message.component';
import db from './firebase.util';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

import './App.css';

function App() {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([]);
	const [userName, setUserName] = useState('');

	//tp update username
	useEffect(() => {
		setUserName(prompt('Please enter your user name'));
	}, []);

	useEffect(() => {
		db
			.collection('messages')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) => {
				setMessages(
					snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
				); //references to firestore documents and returns the data back as an object
			});
	}, []);

	//to update messages
	const sendMessage = (event) => {
		event.preventDefault();

		db.collection('messages').add({
			message: input,
			username: userName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		setInput('');
	};

	return (
		<div className="App">
			<img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" />
			<h1>Hello People!!!</h1>
			<h2>Welcome {userName}</h2>

			<form className="app-form">
				<FormControl className="app-formControl">
					<Input
						className="app-input"
						placeholder="Enter a message..."
						value={input}
						onChange={(event) => setInput(event.target.value)}
					/>
					<IconButton
						className="app-iconButton"
						disabled={!input}
						variant="contained"
						color="primary"
						type="submit"
						onClick={sendMessage}
					>
						<SendIcon />
					</IconButton>
				</FormControl>
			</form>

			{/*to create a small animation in messages*/}
			<FlipMove>
				{messages.map(({ message, id }) => (
					<Message key={id} username={userName} message={message} />
				))}
			</FlipMove>
		</div>
	);
}

export default App;
