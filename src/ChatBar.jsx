import React, {Component} from 'react';

const handleSendMessage = (event) => {
    // event.preventDefault();
    // const form = event.target;
    // const usernameInput = form.username;
    // const messageInput = form.message;
    // const newMessage = {
    //     username: usernameInput.value,
    //     message: messageInput.value
    // }
    // this.props.addNewMessage(newMessage);

    // usernameInput.value = messageInput.value = '';
}
class ChatBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.user.name,
            content: ''
        }
        this.messageInput = React.createRef();
        this.onContent = this.onContent.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.onNewUsername = this.onNewUsername.bind(this);
    }
    onContent(event) {
        this.setState({
            content: event.target.value
        });
    }
    onNewUsername(event) {
        this.setState({
            username: event.target.value
        });
            if (event.keyCode === 13) {
            this.messageInput.current.focus();
        }
    }
    onMessage(event) {
        if (event.keyCode === 13) {
            // const length = this.state.content.length;
            this.state.count = this.state.count + 1;
            const state = {
                error: ''
            };
            // if (length === 0) {
                // state.error = `You cannot post an empty message.`;
            // } else {
                this.props.onNewMessage({ 
                    content: this.state.content, 
                    username: this.state.username});
                state.content = '';
            // }
            this.setState(state);
        }
    }
    render() {
        
        return (
                <footer className="chatbar">
                    <input 
                        className="chatbar-username"
                        type="text" 
                        defaultValue={this.state.username}
                        onChange={this.onNewUsername}
                        onKeyDown={this.onNewUsername} 
                        placeholder="Your Name (Optional)" 
                     />
                    <input 
                        ref={this.messageInput} 
                        value={this.state.content} 
                        onChange={this.onContent} 
                        onKeyDown={this.onMessage} 
                        className="chatbar-message" 
                        type="text" 
                        placeholder="Type a message and hit ENTER" 
                    />
                </footer>
        )
    }
}

export default ChatBar;