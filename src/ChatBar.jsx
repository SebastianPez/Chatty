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
            content: '',
        }
        this.onContent = this.onContent.bind(this);
        this.onMessage = this.onMessage.bind(this);
    }
    onContent(event) {
        this.setState({
            content: event.target.value
        });
    }
    onNameChange(event) {
        this.setState({
            username: event.target.value
        });
    }
    onMessage(event) {
        if (event.keyCode === 13) {
            // const length = this.state.content.length;
            const state = {
                error: ''
            };
            // if (length === 0) {
                // state.error = `You cannot post an empty message.`;
            // } else {
                this.props.onNewMessage({content: this.state.content, username: this.state.username});
                state.content = '';
            // }
            this.setState(state);
        }
    }
    render() {
        
        return (
                <footer className="chatbar">
                    <input className="chatbar-username" type="text" defaultValue={this.state.username} onChange={this.onNameChange} placeholder="Your Name (Optional)" />
                    <input value={this.state.content} onChange={this.onContent} onKeyDown={this.onMessage} className="chatbar-message" type="text" placeholder="Type a message and hit ENTER" />
                </footer>
        )
    }
}

export default ChatBar;