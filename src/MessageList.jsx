import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    render() {
        const allMessages = this.props.messages.map(message => {
            return <Message key={message.id} username={message.username} content={message.content} type={message.type} />
        });

       
        return(
            <main className="messages">
                {allMessages}
                {/* <div className="message system">
                Anonymous1 changed their name to nomnom.
                </div> */}
            </main>
        ) 
    }
}

export default MessageList;