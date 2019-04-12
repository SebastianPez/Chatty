import React, {Component} from 'react';

class ChatBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.user.name,
            content: '',
            oldUserName: ''
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
        if (event.keyCode === 13) {
            this.setState((prevState) => {
                return { oldUserName: prevState.username}
            });
            this.setState({ username: event.target.value}, () => {
                this.props.onNewUser({ username: this.state.username, oldUserName: this.state.oldUserName });
            });
            this.messageInput.current.focus();
        }
    }
    onMessage(event) {
        if (!this.state.username.length) {
            this.setState({ username: "Anonymous"});
        }
        if (event.keyCode === 13) {
            if (!this.state.content) {
                alert('Cannot send an empty message');
                return;
            } else {
                const state = {
                    error: ''
                };
                this.props.onNewMessage({ 
                type: "postMessage",
                content: this.state.content, 
                username: this.state.username});
                state.content = '';
                this.setState(state);
            }
        }
    }
    render() {
        
        return (
                <footer className="chatbar">
                    <input 
                        className="chatbar-username"
                        type="text" 
                        defaultValue={this.state.username ? this.state.username : "Anonymous"}
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