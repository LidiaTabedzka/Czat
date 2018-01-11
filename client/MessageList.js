import React, {Component} from 'react';
import styles from './MessageList.css';

const Message = props => (
    <div>
        <div className={styles.Message}>
            <span className={styles.date}>{props.date}</span>
            <strong>{props.from} :</strong>
            <span className={styles.text}>{props.text}</span>
            {
                props.from == props.userName ? <button className={styles.button} onClick={() => props.removeMessage(props.id)}>X</button> : null
            }
        </div>
    </div>
);

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
                    />
                );
            })
        }
    </div>
);

export default MessageList;