import React, {Component} from 'react';
import uuid from 'uuid';
import styles from './MessageForm.css';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }
  
    handleSubmit(e) {
        e.preventDefault();
        const message = {
            id : uuid.v4(),
            from : this.props.name,
            text : this.state.text,
            date : new Date().toLocaleTimeString()
        };
        this.props.onMessageSubmit(message);
        this.setState({ text: '' });
    }
  
    changeHandler(e) {
        this.setState({ text : e.target.value });
    }
  
    render() {
        return(
            <form className={styles.MessageForm} onSubmit={e => this.handleSubmit(e)}>
                <input
                    className={styles.MessageInput}
                    onChange={e => this.changeHandler(e)}
                    value={this.state.text}
                    placeholder='Message'
                />
            </form>
        );
    }
}
  
export default MessageForm;