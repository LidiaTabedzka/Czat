import React, {Component} from 'react';
import styles from './MessageList.css';


class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateText: false,
            newText: this.props.text
        };
    }

    updateMsgText() {
        this.setState({updateText: true});   
    }

    changeHandler(e) {
        this.setState({ newText : e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.newText != "") {
            this.props.updateMsgText(this.props.id, this.state.newText);
        } else {
            this.setState({ 
                newText: this.props.text     
            });
        }
        this.setState({ 
            updateText: false      
        });
    }

    render() {
        return (
            <div>
                <div className={styles.Message}>
                    <span className={styles.date}>{this.props.date}</span>
                    <strong>{this.props.from} :</strong>
                    <span className={styles.text}>{this.props.text}</span>
                    {
                        this.props.from == this.props.userName ? 
                            <div>
                                <button className={styles.button} onClick={() => this.props.removeMessage(this.props.id)}><i className="fa fa-times" aria-hidden="true"></i></button>
                                <button className={styles.button} onClick={() => this.updateMsgText()}><i className="fa fa-pencil" aria-hidden="true"></i></button>
                            </div> : null
                    }
                </div>
                <div>
                    {
                        this.state.updateText ? 
                            <form onSubmit={e => this.handleSubmit(e)}>
                                <input 
                                    className={styles.msgTextInput}
                                    ref={input => input && input.focus()}
                                    value={this.state.newText} 
                                    onChange={e => this.changeHandler(e)}
                                /> 
                            </form> : null
                    }
                </div>
            </div>
        );
    }
};

const MessageList = props => (
    <div className={styles.MessageList}>
        {
            props.messages.map((message, i) => {
                return (
                    <Message
                        key={i}
                        id={message.id}
                        userName={props.name}
                        date={message.date}
                        from={message.from}
                        text={message.text}
                        removeMessage={props.removeMessage}
                        updateMsgText={props.updateMsgText}
                    />
                );
            })
        }
    </div>
);

export default MessageList;