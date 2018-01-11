import React, { Component } from 'react';
import io from 'socket.io-client';
import styles from './App.css';
import UsersList from './UsersList.js';
import UserForm from './UserForm';
import MessageList from './MessageList.js';
import MessageForm from './MessageForm.js';

const socket = io('http://localhost:3000/');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            messages: [],
            text: '',
            name: ''
        };
    }

    componentDidMount() {
        socket.on('message', message => this.messageReceive(message));
        socket.on('update', ({users}) => this.chatUpdate(users));
    }

    messageReceive(message) {
        const messages = [...this.state.messages, message];
        this.setState({messages});
    }

    chatUpdate(users) {
        this.setState({users});
    }

    handleMessageSubmit(message) {
        const messages = [...this.state.messages, message];
        this.setState({messages});
        socket.emit('message', message);
    }

    handleUserSubmit(name) {
        this.setState({name});
        socket.emit('join', name);
    }

    removeMessage(id) {
        const remainder = this.state.messages.filter(message => message.id !== id);
        this.setState({messages: remainder});
    }

    renderLayout() {
        return (
            <div className={styles.App}>
                <div className={styles.AppHeader}>
                    <div className={styles.AppTitle}>
                        ChatApp
                    </div>
                    <div className={styles.AppRoom}>
                        App room
                    </div>
                </div>
                <div className={styles.AppBody}>
                    <UsersList users={this.state.users}/>
                    <div className={styles.MessageWrapper}>
                        <MessageList messages={this.state.messages} name={this.state.name} removeMessage={id => this.removeMessage(id)}/>
                        <MessageForm onMessageSubmit={message => this.handleMessageSubmit(message)} name={this.state.name}/>
                    </div>
                </div>
            </div>
        );
    }

    renderUserForm() {
        return (<UserForm onUserSubmit={name => this.handleUserSubmit(name)} />)
    }

    render() {
        return this.state.name !== '' ? this.renderLayout() : this.renderUserForm();
    }
};
  
export default App;