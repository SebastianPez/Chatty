import React, {Component} from 'react';
import Message from './Message.jsx';
import SystemMessage from './SystemMessage.jsx';

class MessageList extends Component {
    render() {
        const allMessages = this.props.messages.map(message => {
            if (message.type === "postMessage") {
                return <Message type={message.type} key={message.id} username={message.username} content={message.content} />
            } else if (message.type === "postNotification") {
                return <SystemMessage type={message.type} key={message.id} username={message.username} oldUserName={message.oldUserName} content={message.content} />
            }
        });

        return(
            <main className="messages">
                {allMessages}
            </main>
        ) 
    }
}

export default MessageList;